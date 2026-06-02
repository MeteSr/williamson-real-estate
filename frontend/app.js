/* ── Config ──────────────────────────────────────────────────────────────── */
const LEADS_CANISTER_ID = ""; // set after `dfx deploy --network ic`

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

const contactForm    = document.getElementById("contact-form");
const contactSuccess = document.getElementById("contact-success");
const contactBtn     = document.getElementById("contact-submit-btn");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors("cerr-", ["name", "phone", "email"]);

  const name    = document.getElementById("c-name").value.trim();
  const phone   = document.getElementById("c-phone").value.trim();
  const email   = document.getElementById("c-email").value.trim();
  const message = document.getElementById("c-message").value.trim() || null;

  let valid = true;
  if (!name)                    { showError("cerr-", "name",  "Name is required");              valid = false; }
  if (!phone)                   { showError("cerr-", "phone", "Phone is required");             valid = false; }
  if (!email)                   { showError("cerr-", "email", "Email is required");             valid = false; }
  else if (!isValidEmail(email)){ showError("cerr-", "email", "Enter a valid email address");   valid = false; }
  if (!valid) return;

  contactBtn.disabled    = true;
  contactBtn.textContent = "Sending…";

  try {
    await submitLead({
      name, phone, email, address: "", message,
      source: "contact",
      utmSource: UTM.source, utmMedium: UTM.medium, utmCampaign: UTM.campaign,
    });
    contactForm.hidden    = true;
    contactSuccess.hidden = false;
  } catch (err) {
    console.error("Contact form submission failed:", err);
    contactBtn.disabled    = false;
    contactBtn.textContent = "Contact Us Today";
    showError("cerr-", "name", "Something went wrong — please try again or call us directly.");
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

/* ── Savings Calculator ──────────────────────────────────────────────────── */

const calcSlider      = document.getElementById("calc-slider");
const calcBubble      = document.getElementById("calc-bubble");
const calcTraditional = document.getElementById("calc-traditional");
const calcWilliamson  = document.getElementById("calc-williamson");
const calcSavings     = document.getElementById("calc-savings");

if (calcSlider) {
  const TRADITIONAL_RATE = 0.03;
  const WILLIAMSON_RATE  = 0.0125;
  const THUMB_HALF       = 11; // half of 22px thumb

  function updateSliderFill() {
    const min = parseInt(calcSlider.min, 10);
    const max = parseInt(calcSlider.max, 10);
    const val = parseInt(calcSlider.value, 10);
    const pct = (val - min) / (max - min) * 100;
    calcSlider.style.setProperty("--fill-pct", pct.toFixed(2) + "%");
    return { min, max, val, pct };
  }

  function positionBubble(pct) {
    const track = calcSlider.offsetWidth;
    const left  = (pct / 100) * (track - THUMB_HALF * 2) + THUMB_HALF;
    calcBubble.style.left = left + "px";
  }

  function updateCalc() {
    const { val, pct } = updateSliderFill();
    const traditional = Math.round(val * TRADITIONAL_RATE);
    const williamson  = Math.round(val * WILLIAMSON_RATE);
    const savings     = traditional - williamson;

    calcBubble.textContent      = "$" + val.toLocaleString();
    calcTraditional.textContent = "$" + traditional.toLocaleString();
    calcWilliamson.textContent  = "$" + williamson.toLocaleString();
    calcSavings.textContent     = "$" + savings.toLocaleString();
    positionBubble(pct);
  }

  calcSlider.addEventListener("input", updateCalc);
  window.addEventListener("resize", () => {
    const pct = (parseInt(calcSlider.value, 10) - parseInt(calcSlider.min, 10))
              / (parseInt(calcSlider.max, 10) - parseInt(calcSlider.min, 10)) * 100;
    positionBubble(pct);
  });
  updateCalc();
}

/* ── ICP Canister stub ──────────────────────────────────────────────────────
   Replace with @dfinity/agent + Candid IDL once LEADS_CANISTER_ID is set.
────────────────────────────────────────────────────────────────────────── */
async function callLeadsCanister(_payload) {
  throw new Error("LEADS_CANISTER_ID not configured");
}
