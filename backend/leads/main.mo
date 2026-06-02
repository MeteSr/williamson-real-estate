import Array     "mo:base/Array";
import Blob      "mo:base/Blob";
import Debug     "mo:base/Debug";
import Int       "mo:base/Int";
import Nat64     "mo:base/Nat64";
import Option    "mo:base/Option";
import Principal "mo:base/Principal";
import Result    "mo:base/Result";
import Text      "mo:base/Text";
import Time      "mo:base/Time";

persistent actor Leads {

  // ── Types ──────────────────────────────────────────────────────────────────

  type Lead = {
    name           : Text;
    phone          : Text;
    email          : Text;
    address        : Text;
    estimatedPrice : ?Nat;
    message        : ?Text;
    source         : ?Text;
    utmSource      : ?Text;
    utmMedium      : ?Text;
    utmCampaign    : ?Text;
    submittedAt    : Int;
  };

  type HttpHeader   = { name : Text; value : Text };
  type HttpMethod   = { #get; #post; #head };
  type HttpResponse = { status : Nat; headers : [HttpHeader]; body : Blob };
  type TransformArgs = { response : HttpResponse; context : Blob };

  // ── IC Management Canister (HTTP outcalls) ─────────────────────────────────

  let ic : actor {
    http_request : shared ({
      url                : Text;
      max_response_bytes : ?Nat64;
      headers            : [HttpHeader];
      body               : ?Blob;
      method             : HttpMethod;
      transform          : ?{
        function : shared query (TransformArgs) -> async HttpResponse;
        context  : Blob;
      };
    }) -> async HttpResponse;
  } = actor "aaaaa-aa";

  // ── Stable state ───────────────────────────────────────────────────────────

  private var leads             : [Lead]      = [];
  private var adminList         : [Principal] = [];
  private var adminInitialized  : Bool        = false;
  private var resendApiKey      : Text        = "";
  private var notifyEmail       : Text        = "";
  private var fromAddress       : Text        = "Williamson Real Estate <leads@sellingpelicanbay.com>";

  // ── Helpers ────────────────────────────────────────────────────────────────

  private func isAdmin(p : Principal) : Bool {
    Option.isSome(Array.find<Principal>(adminList, func(a) { a == p }))
  };

  private func jsonStr(k : Text, v : Text) : Text { "\"" # k # "\":\"" # v # "\"" };

  // Strip non-deterministic headers so all subnet nodes agree on the response.
  public query func transformResponse(args : TransformArgs) : async HttpResponse {
    { status = args.response.status; headers = []; body = args.response.body }
  };

  // ── Email ──────────────────────────────────────────────────────────────────

  private func escapeHtml(t : Text) : Text {
    var s = Text.replace(t, #text "&",  "&amp;");
    s     := Text.replace(s, #text "<",  "&lt;");
    s     := Text.replace(s, #text ">",  "&gt;");
    s
  };

  private func sendLeadEmail(lead : Lead) : async () {
    if (Text.size(resendApiKey) == 0 or Text.size(notifyEmail) == 0) return;

    let msgRow = switch (lead.message) {
      case (?m) {
        "<tr><td style=\"padding:6px 0;color:#6B7280;width:36%;\">Message</td>" #
        "<td style=\"padding:6px 0;\">" # escapeHtml(m) # "</td></tr>"
      };
      case null { "" };
    };

    let utmRow = switch (lead.utmSource) {
      case (?src) {
        "<tr><td style=\"padding:6px 0;color:#6B7280;\">UTM Source</td>" #
        "<td style=\"padding:6px 0;\">" # escapeHtml(src) # "</td></tr>"
      };
      case null { "" };
    };

    let html =
      "<!DOCTYPE html><html><body style=\"font-family:Inter,Arial,sans-serif;background:#F9FAFB;margin:0;padding:2rem;\">" #
      "<div style=\"max-width:520px;margin:0 auto;background:#fff;border:1px solid #E5E7EB;border-radius:8px;padding:2rem;\">" #
      "<h2 style=\"margin:0 0 1.5rem;color:#111827;font-size:1.25rem;\">New Lead — Williamson Real Estate</h2>" #
      "<table style=\"width:100%;border-collapse:collapse;font-size:0.9rem;color:#111827;\">" #
      "<tr><td style=\"padding:6px 0;color:#6B7280;width:36%;\">Name</td>" #
        "<td style=\"padding:6px 0;\"><strong>" # escapeHtml(lead.name) # "</strong></td></tr>" #
      "<tr><td style=\"padding:6px 0;color:#6B7280;\">Phone</td>" #
        "<td style=\"padding:6px 0;\"><a href=\"tel:" # lead.phone # "\">" # escapeHtml(lead.phone) # "</a></td></tr>" #
      "<tr><td style=\"padding:6px 0;color:#6B7280;\">Email</td>" #
        "<td style=\"padding:6px 0;\"><a href=\"mailto:" # lead.email # "\">" # escapeHtml(lead.email) # "</a></td></tr>" #
      "<tr><td style=\"padding:6px 0;color:#6B7280;\">Address</td>" #
        "<td style=\"padding:6px 0;\">" # escapeHtml(lead.address) # "</td></tr>" #
      msgRow #
      utmRow #
      "</table>" #
      "<p style=\"margin:1.5rem 0 0;font-size:0.8rem;color:#9CA3AF;\">Submitted via sellingpelicanbay.com</p>" #
      "</div></body></html>";

    let textBody =
      "New lead from sellingpelicanbay.com\n\n" #
      "Name:    " # lead.name    # "\n" #
      "Phone:   " # lead.phone   # "\n" #
      "Email:   " # lead.email   # "\n" #
      "Address: " # lead.address # "\n" #
      (switch (lead.message) { case (?m) { "Message: " # m # "\n" }; case null { "" } });

    let reqBody = "{" #
      jsonStr("from",    fromAddress)  # "," #
      jsonStr("to",      notifyEmail)  # "," #
      jsonStr("reply_to", lead.email) # "," #
      jsonStr("subject", "New lead: " # lead.name) # "," #
      jsonStr("html",    html)        # "," #
      jsonStr("text",    textBody)    #
    "}";

    // Idempotency key: stable per submission — prevents duplicate sends on subnet retry.
    let idempotencyKey = Int.toText(lead.submittedAt) # "-" # lead.email;

    try {
      let response = await (with cycles = 2_000_000_000) ic.http_request({
        url                = "https://api.resend.com/emails";
        max_response_bytes = ?Nat64.fromNat(4096);
        headers            = [
          { name = "Content-Type";    value = "application/json" },
          { name = "Authorization";   value = "Bearer " # resendApiKey },
          { name = "Idempotency-Key"; value = idempotencyKey },
        ];
        body               = ?Text.encodeUtf8(reqBody);
        method             = #post;
        transform          = ?{ function = transformResponse; context = Blob.fromArray([]) };
      });
      if (response.status != 200 and response.status != 201) {
        Debug.print("leads.sendLeadEmail: Resend error " # Nat.toText(response.status));
      };
    } catch (_e) {
      Debug.print("leads.sendLeadEmail: HTTP outcall failed for " # lead.email);
    }
  };

  // ── Public: submit lead ────────────────────────────────────────────────────

  public shared func submitLead(
    name           : Text,
    phone          : Text,
    email          : Text,
    address        : Text,
    estimatedPrice : ?Nat,
    message        : ?Text,
    source         : ?Text,
    utmSource      : ?Text,
    utmMedium      : ?Text,
    utmCampaign    : ?Text,
  ) : async Result.Result<(), Text> {
    if (Text.size(name)    == 0) return #err("name is required");
    if (Text.size(phone)   == 0) return #err("phone is required");
    if (Text.size(email)   == 0) return #err("email is required");
    if (Text.size(name)    > 200) return #err("name too long");
    if (Text.size(phone)   > 30)  return #err("phone too long");
    if (Text.size(email)   > 200) return #err("email too long");
    if (Text.size(address) > 500) return #err("address too long");

    let lead : Lead = {
      name; phone; email; address;
      estimatedPrice; message; source;
      utmSource; utmMedium; utmCampaign;
      submittedAt = Time.now();
    };

    leads := Array.append(leads, [lead]);

    // Fire-and-forget — submission succeeds even if email delivery fails.
    ignore sendLeadEmail(lead);

    #ok(())
  };

  // ── Public: query leads (owner only) ──────────────────────────────────────

  public shared query(msg) func getLeads() : async Result.Result<[Lead], Text> {
    if (not isAdmin(msg.caller)) return #err("unauthorized");
    #ok(leads)
  };

  public shared query func leadCount() : async Nat {
    leads.size()
  };

  // ── Admin: configure ───────────────────────────────────────────────────────

  public shared(msg) func addAdmin(newAdmin : Principal) : async Result.Result<(), Text> {
    if (adminInitialized and not isAdmin(msg.caller)) return #err("unauthorized");
    if (not isAdmin(newAdmin)) {
      adminList := Array.append(adminList, [newAdmin]);
    };
    adminInitialized := true;
    #ok(())
  };

  public shared(msg) func setResendApiKey(key : Text) : async Result.Result<(), Text> {
    if (not isAdmin(msg.caller)) return #err("unauthorized");
    resendApiKey := key;
    #ok(())
  };

  public shared(msg) func setNotifyEmail(addr : Text) : async Result.Result<(), Text> {
    if (not isAdmin(msg.caller)) return #err("unauthorized");
    notifyEmail := addr;
    #ok(())
  };

  public shared(msg) func setFromAddress(addr : Text) : async Result.Result<(), Text> {
    if (not isAdmin(msg.caller)) return #err("unauthorized");
    fromAddress := addr;
    #ok(())
  };

  public query(msg) func getKeyStatus() : async { resendKeySet : Bool; notifyEmailSet : Bool } {
    ignore msg;
    { resendKeySet = Text.size(resendApiKey) > 0; notifyEmailSet = Text.size(notifyEmail) > 0 }
  };
}
