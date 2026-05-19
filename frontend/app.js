/* ── Config ──────────────────────────────────────────────────────────────── */
const LEADS_CANISTER_ID = ""; // set after `dfx deploy --network ic`
const TRADITIONAL_RATE  = 0.05;

/* ── UTM Tracking ────────────────────────────────────────────────────────── */
// Reads ?utm_source=facebook&utm_medium=social&utm_campaign=pelican-bay from
// the landing URL so every lead submission carries its traffic source.
//
// Example URLs per channel:
//   Facebook/Instagram : ?utm_source=facebook&utm_medium=social&utm_campaign=pelican-bay-valuation
//   Google Ads         : ?utm_source=google&utm_medium=cpc&utm_campaign=flat-fee-daytona
//   Nextdoor           : ?utm_source=nextdoor&utm_medium=social&utm_campaign=pelican-bay-neighbors
//   Direct Mail (EDDM) : ?utm_source=eddm&utm_medium=direct_mail&utm_campaign=pelican-bay-q1-2025

const _utmParams = new URLSearchParams(window.location.search);
const UTM = {
  source:   _utmParams.get("utm_source")   || null,
  medium:   _utmParams.get("utm_medium")   || null,
  campaign: _utmParams.get("utm_campaign") || null,
};

/* ── Savings Calculator ─────────────────────────────────────────────────── */

function flatFee(price) {
  if (price < 300000) return 6000;
  if (price < 400000) return 8000;
  if (price < 500000) return 10000;
  if (price < 600000) return 12000;
  return 14000;
}

function fmtDollars(n) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function fmtInput(raw) {
  const digits = raw.replace(/\D/g, "");
  return digits ? Number(digits).toLocaleString("en-US") : "";
}

function updateCalc(price) {
  const our   = flatFee(price);
  const their = price * TRADITIONAL_RATE;
  const saved = their - our;
  const pct   = Math.round((saved / their) * 100);

  document.getElementById("our-fee").textContent      = fmtDollars(our);
  document.getElementById("typical-fee").textContent  = fmtDollars(their);
  document.getElementById("savings-amount").textContent = fmtDollars(saved);
  document.getElementById("savings-pct").textContent    = `— ${pct}% less in fees`;
}

const priceInput  = document.getElementById("price-input");
const priceSlider = document.getElementById("price-slider");

priceInput.addEventListener("input", () => {
  const raw = priceInput.value;
  const num = parseInt(raw.replace(/\D/g, ""), 10) || 0;
  priceInput.value = fmtInput(raw);
  if (num >= 100000 && num <= 1000000) priceSlider.value = num;
  if (num > 0) updateCalc(num);
});

priceSlider.addEventListener("input", () => {
  const num = parseInt(priceSlider.value, 10);
  priceInput.value = num.toLocaleString("en-US");
  updateCalc(num);
});

updateCalc(350000);

/* ── Form helpers ────────────────────────────────────────────────────────── */

function showError(prefix, id, msg) {
  const el = document.getElementById(prefix + id);
  if (el) el.textContent = msg;
}
function clearErrors(prefix, fields) {
  fields.forEach(id => showError(prefix, id, ""));
}
function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

async function submitLead(payload) {
  if (LEADS_CANISTER_ID) {
    // Replace with @dfinity/agent call once canister ID is known
    await callLeadsCanister(payload);
  } else {
    // Mailto fallback — opens mail client with lead data pre-filled
    const lines = [
      `Name: ${payload.name}`,
      `Phone: ${payload.phone}`,
      `Email: ${payload.email}`,
      `Address: ${payload.address}`,
      payload.estimatedPrice ? `Estimated Price: $${payload.estimatedPrice.toLocaleString()}` : null,
      payload.timeline       ? `Timeline: ${payload.timeline}` : null,
      payload.message        ? `Message: ${payload.message}` : null,
      payload.source         ? `Source: ${payload.source}` : null,
      payload.utmSource      ? `UTM Source: ${payload.utmSource}` : null,
      payload.utmMedium      ? `UTM Medium: ${payload.utmMedium}` : null,
      payload.utmCampaign    ? `UTM Campaign: ${payload.utmCampaign}` : null,
    ].filter(Boolean).join("\n");

    const subject = encodeURIComponent(`New Lead — ${payload.name}`);
    const body    = encodeURIComponent(lines);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }
}

/* ── Contact Form ────────────────────────────────────────────────────────── */

const contactForm    = document.getElementById("lead-form");
const contactSuccess = document.getElementById("form-success");
const contactBtn     = document.getElementById("submit-btn");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors("err-", ["name", "phone", "email", "address"]);

  const name    = contactForm.querySelector("#f-name").value.trim();
  const phone   = contactForm.querySelector("#f-phone").value.trim();
  const email   = contactForm.querySelector("#f-email").value.trim();
  const address = contactForm.querySelector("#f-address").value.trim();
  const priceRaw= contactForm.querySelector("#f-price").value.replace(/\D/g, "");
  const price   = priceRaw ? parseInt(priceRaw, 10) : null;
  const message = contactForm.querySelector("#f-message").value.trim() || null;

  let valid = true;
  if (!name)               { showError("err-", "name",    "Name is required");                    valid = false; }
  if (!phone)              { showError("err-", "phone",   "Phone is required");                   valid = false; }
  if (!email)              { showError("err-", "email",   "Email is required");                   valid = false; }
  else if (!isValidEmail(email)) { showError("err-", "email", "Enter a valid email address");     valid = false; }
  if (!address)            { showError("err-", "address", "Property address is required");        valid = false; }
  if (!valid) return;

  contactBtn.disabled    = true;
  contactBtn.textContent = "Sending…";

  try {
    await submitLead({
      name, phone, email, address, estimatedPrice: price, message,
      source: "contact",
      utmSource: UTM.source, utmMedium: UTM.medium, utmCampaign: UTM.campaign,
    });
    contactForm.hidden    = true;
    contactSuccess.hidden = false;
  } catch (err) {
    console.error("Contact form submission failed:", err);
    contactBtn.disabled    = false;
    contactBtn.textContent = "Send My Info";
    showError("err-", "name", "Something went wrong — please try again or call us directly.");
  }
});

/* ── Valuation Form ──────────────────────────────────────────────────────── */

const valuationForm    = document.getElementById("valuation-form");
const valuationSuccess = document.getElementById("valuation-success");
const valuationBtn     = document.getElementById("val-submit-btn");

valuationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors("verr-", ["address", "name", "phone", "email"]);

  const address  = valuationForm.querySelector("#v-address").value.trim();
  const name     = valuationForm.querySelector("#v-name").value.trim();
  const phone    = valuationForm.querySelector("#v-phone").value.trim();
  const email    = valuationForm.querySelector("#v-email").value.trim();
  const timeline = valuationForm.querySelector("#v-timeline").value || null;

  let valid = true;
  if (!address)            { showError("verr-", "address", "Property address is required");       valid = false; }
  if (!name)               { showError("verr-", "name",    "Name is required");                   valid = false; }
  if (!phone)              { showError("verr-", "phone",   "Phone is required");                  valid = false; }
  if (!email)              { showError("verr-", "email",   "Email is required");                  valid = false; }
  else if (!isValidEmail(email)) { showError("verr-", "email", "Enter a valid email address");    valid = false; }
  if (!valid) return;

  valuationBtn.disabled    = true;
  valuationBtn.textContent = "Sending…";

  try {
    await submitLead({
      name, phone, email, address, timeline,
      source: "valuation",
      utmSource: UTM.source, utmMedium: UTM.medium, utmCampaign: UTM.campaign,
    });
    valuationForm.hidden    = true;
    valuationSuccess.hidden = false;
  } catch (err) {
    console.error("Valuation form submission failed:", err);
    valuationBtn.disabled    = false;
    valuationBtn.textContent = "Get My Free Valuation";
    showError("verr-", "name", "Something went wrong — please try again.");
  }
});

/* ── Mobile nav toggle ───────────────────────────────────────────────────── */
const navBurger  = document.getElementById("nav-burger");
const navLinksEl = document.querySelector(".nav-links");
if (navBurger && navLinksEl) {
  navBurger.addEventListener("click", () => navLinksEl.classList.toggle("open"));
  navLinksEl.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => navLinksEl.classList.remove("open"))
  );
}

/* ── Smooth scroll ───────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
  });
});

/* ── ICP Canister stub ──────────────────────────────────────────────────────
   Replace with @dfinity/agent + Candid IDL once LEADS_CANISTER_ID is set.
────────────────────────────────────────────────────────────────────────── */
async function callLeadsCanister(_payload) {
  throw new Error("LEADS_CANISTER_ID not configured");
}
