# Williamson Real Estate

Single-page website for Williamson Real Estate — a flat-fee brokerage serving Volusia County, FL (Daytona Beach · Pelican Bay).

## Stack

- **Frontend**: Plain HTML/CSS/JS (no build step) served by an ICP asset canister
- **Backend**: Single Motoko canister (`leads`) storing contact form submissions on-chain

## Local preview

Open `frontend/index.html` directly in a browser — no server needed for previewing.

## Deploy to ICP

```bash
# 1. Install dfx (if not already)
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

# 2. Start local replica and deploy
dfx start --background
dfx deploy

# 3. Deploy to mainnet
dfx deploy --network ic
```

After mainnet deploy, note the `assets` and `leads` canister IDs from `canister_ids.json`, then set `LEADS_CANISTER_ID` in `frontend/app.js`.

## Fee schedule

| Sale Price | Flat Fee |
|---|---|
| $200k – $299,999 | $6,000 |
| $300k – $399,999 | $8,000 |
| $400k – $499,999 | $10,000 |
| $500k – $599,999 | $12,000 |
| $600k+ | $14,000 |
