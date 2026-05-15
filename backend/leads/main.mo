import Time "mo:base/Time";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Principal "mo:base/Principal";

persistent actor Leads {

  type Lead = {
    name          : Text;
    phone         : Text;
    email         : Text;
    address       : Text;
    estimatedPrice : ?Nat;
    message       : ?Text;
    submittedAt   : Int;
  };

  private let owner : Principal = Principal.fromActor(Leads);
  private var leads : [Lead] = [];

  public shared func submitLead(
    name          : Text,
    phone         : Text,
    email         : Text,
    address       : Text,
    estimatedPrice : ?Nat,
    message       : ?Text
  ) : async Result.Result<(), Text> {
    if (Text.size(name)    == 0) return #err("name is required");
    if (Text.size(phone)   == 0) return #err("phone is required");
    if (Text.size(email)   == 0) return #err("email is required");
    if (Text.size(address) == 0) return #err("address is required");
    if (Text.size(name)    > 200) return #err("name too long");
    if (Text.size(phone)   > 30)  return #err("phone too long");
    if (Text.size(email)   > 200) return #err("email too long");
    if (Text.size(address) > 500) return #err("address too long");

    let lead : Lead = {
      name;
      phone;
      email;
      address;
      estimatedPrice;
      message;
      submittedAt = Time.now();
    };
    leads := Array.append(leads, [lead]);
    #ok(())
  };

  public shared query(msg) func getLeads() : async Result.Result<[Lead], Text> {
    if (msg.caller != owner) return #err("unauthorized");
    #ok(leads)
  };

  public shared query func leadCount() : async Nat {
    leads.size()
  };
}
