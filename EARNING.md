# NayaBill — how you actually make $30–40/day

## Honest math

| Path | Math to ~$35/day |
| --- | --- |
| Pro lifetime ($19) | **2 sales/day** |
| Pro + occasional $9 tip pack | 1–2 sales/day |
| Free users only | $0 — free is the funnel |

This is not passive on day one. The app is the product. Traffic + checkout = money.

## Accounts you must create (send me the secrets after)

1. **Gumroad** (easiest for Pakistan + Payoneer) or **Lemon Squeezy**
   - Product name: `NayaBill Pro Lifetime`
   - Price: **$19**
   - Content delivery: a text file / email with unlock codes
2. **Payoneer** (or Gumroad payout method that works in PK)
3. **Netlify** (repo already has `netlify.toml`) — connect this GitHub repo
4. Optional: custom domain (`nayabill.com` / `.app`)

## Env vars to paste in Netlify

```
VITE_CHECKOUT_URL=https://YOUR_GUMROAD_OR_LEMON_CHECKOUT_URL
VITE_PRO_CODES=NAYA-A7K2,NAYA-B9M4,NAYA-C3Q8,...
```

Generate ~50 unique codes. Put the same list in Gumroad’s “send license key” / product content. After a buyer pays, they paste the code in the app.

## Distribution that can hit 2 sales/day (do these in parallel)

1. **Pakistani freelancers** — post in Facebook groups: Freelancers Pakistan, Upwork Pakistan, Graphic Designers PK (value post + link, not spam).
2. **Reddit** — r/freelance, r/forhire adjacent tips, r/Pakistan (careful with promo rules).
3. **TikTok / Reels** — 20–30s screen recordings: “Invoice bhejo WhatsApp pe 30 sec mein”.
4. **Product Hunt / Peerlist** — launch once Netlify + Gumroad are live.
5. **Fiverr gig upsell** — if you already freelance, send NayaBill link after delivery.

## What I already built

- Live invoice builder (JazzCash, Easypaisa, bank, Payoneer)
- WhatsApp message + PDF/print
- Free limit (3/month) → Pro unlock
- Demo unlock code for testing: `NAYA-DEMO-2026`

## What blocks real money right now

Without your **checkout URL + payout account**, the Buy button cannot receive cash.  
Reply with Gumroad/Lemon link (or ask me to walk you through creating it) and I will wire `VITE_CHECKOUT_URL`, redeploy instructions, and marketing copy packs next.
