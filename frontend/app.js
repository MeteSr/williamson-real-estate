/* ── Savings Calculator ─────────────────────────────────────────────────── */

const LEADS_CANISTER_ID = ""; // filled in after `dfx deploy --network ic`
const TRADITIONAL_RATE  = 0.05;

function flatFee(price) {
  if (price < 300000) return 6000;
  if (price < 400000) return 8000;
  if (price < 500000) return 10000;
  if (price < 600000) return 12000;
  return 14000;
}

function fmt(n) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function fmtInput(raw) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("en-US");
}

function updateCalc(price) {
  const our   = flatFee(price);
  const their = price * TRADITIONAL_RATE;
  const saved = their - our;
  const pct   = Math.round((saved / their) * 100);

  document.getElementById("our-fee").textContent     = fmt(our);
  document.getElementById("typical-fee").textContent = fmt(their);
  document.getElementById("savings-amount").textContent = fmt(saved);
  document.getElementById("savings-pct").textContent    = `(${pct}% less in fees)`;
}

const priceInput  = document.getElementById("price-input");
const priceSlider = document.getElementById("price-slider");

function getNumericPrice(raw) {
  return parseInt(raw.replace(/\D/g, ""), 10) || 0;
}

priceInput.addEventListener("input", () => {
  const raw  = priceInput.value;
  const num  = getNumericPrice(raw);
  priceInput.value = fmtInput(raw);
  if (num >= 100000 && num <= 1000000) priceSlider.value = num;
  if (num > 0) updateCalc(num);
});

priceSlider.addEventListener("input", () => {
  const num = parseInt(priceSlider.value, 10);
  priceInput.value = num.toLocaleString("en-US");
  updateCalc(num);
});

// Initialize at default value (350k)
updateCalc(350000);

/* ── Contact Form ───────────────────────────────────────────────────────── */

const form       = document.getElementById("lead-form");
const successBox = document.getElementById("form-success");
const submitBtn  = document.getElementById("submit-btn");

function showError(id, msg) {
  const el = document.getElementById("err-" + id);
  if (el) el.textContent = msg;
}
function clearErrors() {
  ["name", "phone", "email", "address"].forEach(id => showError(id, ""));
}

function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors();

  const name    = form.name.value.trim();
  const phone   = form.phone.value.trim();
  const email   = form.email.value.trim();
  const address = form.address.value.trim();
  const priceRaw= document.getElementById("f-price").value.replace(/\D/g, "");
  const price   = priceRaw ? parseInt(priceRaw, 10) : null;
  const message = document.getElementById("f-message").value.trim() || null;

  let valid = true;
  if (!name)            { showError("name",    "Name is required");              valid = false; }
  if (!phone)           { showError("phone",   "Phone is required");             valid = false; }
  if (!email)           { showError("email",   "Email is required");             valid = false; }
  else if (!validateEmail(email)) { showError("email", "Enter a valid email address"); valid = false; }
  if (!address)         { showError("address", "Property address is required");  valid = false; }
  if (!valid) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";

  try {
    if (LEADS_CANISTER_ID) {
      // ICP canister call — requires @dfinity/agent loaded from CDN or bundled
      await callLeadsCanister({ name, phone, email, address, estimatedPrice: price, message });
    } else {
      // Fallback: mailto (works without a deployed canister)
      const body = [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Address: ${address}`,
        price   ? `Estimated Price: $${price.toLocaleString()}` : null,
        message ? `Message: ${message}` : null,
      ].filter(Boolean).join("\n");
      window.location.href = `mailto:?subject=New%20Listing%20Lead%20-%20${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`;
    }

    form.hidden = true;
    successBox.hidden = false;
  } catch (err) {
    console.error("Lead submission failed:", err);
    submitBtn.disabled = false;
    submitBtn.textContent = "Send My Info";
    showError("name", "Something went wrong — please try again or call us directly.");
  }
});

/* ── ICP Canister Call ───────────────────────────────────────────────────
   Calls the `submitLead` method on the leads canister via the IC HTTP API.
   Only active when LEADS_CANISTER_ID is set after deployment.
────────────────────────────────────────────────────────────────────────── */
async function callLeadsCanister({ name, phone, email, address, estimatedPrice, message }) {
  // Encode arguments as Candid using the IC management API endpoint
  // For simplicity, use fetch against the IC replica's /api/v3/canister endpoint
  // A production deployment should import @dfinity/agent + candid IDL.
  // This is a placeholder that will be replaced once canister ID is known.
  const res = await fetch(
    `https://ic0.app/api/v3/canister/${LEADS_CANISTER_ID}/call`,
    {
      method: "POST",
      headers: { "Content-Type": "application/cbor" },
      body: encodeLead({ name, phone, email, address, estimatedPrice, message }),
    }
  );
  if (!res.ok) throw new Error(`Canister call failed: ${res.status}`);
}

// Stub — replaced by @dfinity/agent Candid encoding once canister ID is known
function encodeLead(_lead) {
  return new Uint8Array();
}

/* ── Smooth-scroll nav on mobile ─────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
