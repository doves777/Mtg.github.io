# Competitive Review

Roadmap [step 6](./13-roadmap-and-next-steps.md#6-build-a-competitive-review): map the landscape so our differentiation is concrete.

> **Evidence basis:** the scores and notes below are a **first pass from public sources** (vendor sites, help docs, pricing pages) captured **2026-07-25** — see the [research log](#research-log). They still need confirmation via hands-on trials, demos, and vendor interviews. Treat scores as *provisional*; anything genuinely unknown is left as `?`.

| | |
| --- | --- |
| **Status** | In progress (first-pass desk research) |
| **Last updated** | 2026-07-25 |
| **Owner** | _TBD_ |

## How to use

1. Confirm the [competitor shortlist](#competitor-shortlist) — add/remove as you learn who vendors actually use (feed from customer discovery, roadmap [step 1](./13-roadmap-and-next-steps.md#1-start-with-customer-discovery)).
2. Trial or demo each; capture facts in its [deep-dive](#per-competitor-deep-dive).
3. Score each area with the [rubric](#scoring-rubric) in the [comparison matrix](#comparison-matrix).
4. Translate gaps into our **opportunity/whitespace**, then reflect decisions in the [MVP scope](./10-mvp-scope.md).

## Scoring rubric

Score each capability per competitor:

| Score | Meaning |
| --- | --- |
| `0` | Absent / not offered |
| `1` | Basic / clunky / heavy workaround |
| `2` | Solid / works well |
| `3` | Best-in-class / clear strength |
| `?` | Not yet verified |

> Keep scores evidence-based. If you haven't seen it work, it's `?` — not a guess. A trailing `*` means "inferred from absence of any public mention — confirm by trial."

## Competitor shortlist

Two of these (**Square**, **Shopify**) are *generic* commerce tools a vendor might adapt; the rest are *card-specific*. Note: **BinderPOS was acquired by TCGplayer** and is now the TCGplayer POS offering, and **BinderPOS / Storepass are Shopify-based** (they add TCG features on top of a Shopify store).

| Competitor | Type | Card-specific? | Primary focus | Pricing model | URL | Status |
| --- | --- | --- | --- | --- | --- | --- |
| BinderPOS | POS + inventory (Shopify-based) | Yes | Brick-and-mortar TCG store POS + multichannel | Subscription (not public); + Shopify | [binderpos.com](https://binderpos.com/) / [seller.tcgplayer.com/point-of-sale](https://seller.tcgplayer.com/point-of-sale) | Researched (desk) |
| Storepass | POS + buylist + catalog (Shopify-based) | Yes | TCG store software (POS, buylist, catalog, preorders) | Subscription, scales with volume | [storepass.co](https://storepass.co/) | Researched (desk) |
| Crystal Commerce | Ecommerce + inventory + POS | Yes | Multichannel TCG selling + web-based POS | $99/mo + 2.5% online sales (POS/buylist 0%) | [crystalcommerce.com](https://www.crystalcommerce.com/) | Researched (desk) |
| TCGplayer | Marketplace + seller tools | Yes | Online marketplace; owns BinderPOS (POS) | Marketplace commission + fees | [tcgplayer.com](https://www.tcgplayer.com/) | Researched (desk) |
| Square | POS / payments | No (generic) | General retail POS with strong offline payments | 2.6% + 10¢ card-present (free app) | [squareup.com](https://squareup.com/) | Researched (desk) |
| Shopify (+ card apps) | Ecommerce + POS | No (generic) | General commerce; TCG via apps | Subscription + payments | [shopify.com](https://www.shopify.com/) | Researched (desk) |

> Add any tool that shows up repeatedly in customer discovery interviews (roadmap [step 1](./13-roadmap-and-next-steps.md#1-start-with-customer-discovery)) — that list is more reliable than assumptions. Candidates to consider adding: TCG Sync, Card Trader, Mana Pool.

## Comparison matrix

Rows map to our [requirement areas](./README.md#requirement-ids) so gaps translate directly into product decisions. Scores use the [rubric](#scoring-rubric); the **Our Opportunity** column is the one-line takeaway.

| Area | BinderPOS | Storepass | Crystal Commerce | TCGplayer | Square | Shopify+apps | Our Opportunity |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Inventory mgmt (`INV`) | 3 | 3 | 3 | 2 | 1 | 2 | Match table stakes; add show/booth/location model |
| Fast price lookup (`PRC`) | 2 | 3 | 2 | 3 | 0 | 1 | Must be best-in-class + offline |
| Dynamic pricing (`PRC`) | 1 | 1 | 1 | 2 | 0 | 0 | **Demand/velocity-based recs are whitespace** |
| Order building (`ORD`) | 2 | 3 | 2 | 1 | 3 | 3 | Table stakes; win on speed |
| POS / checkout (`POS`) | 2 | 3 | 2 | 1 | 3 | 3 | Table stakes |
| **Offline mode** (`POS`/`PRC`) | 0 | 0* | 0 | 0 | 2 | 1 | **Hypothesized wedge — no card tool does offline lookup+orders** |
| **Show pickup / preorder** (`ORD`/`CX`/`EVT`) | 1 | 2 | 1 | 1 | 0 | 2 | **Booth-pickup-at-show workflow is largely open** |
| Event/show mode (`EVT`) | 2 | 2 | 2 | 0 | 1 | 1 | Show-day-first design is differentiated |
| Buylist pricing (`BUY`) | 3 | 3 | 2 | 2 | 0 | 0 | Table stakes among card tools |
| Trade-in intake (`BUY`) | 3 | 3 | 2 | 1 | 0 | 0 | Table stakes among card tools |
| AI features | 1 | 1 | 0 | 1 | 1 | 1 | **Broadly weak — differentiation opportunity** |
| Ease of use | ? | ? | 1? | ? | 3 | 2 | Modern, show-fast UX opportunity |
| Modern UX | ? | ? | 1? | ? | 3 | 3 | Card tools often feel dated |
| Mobile/tablet fit | 2 | 3 | 2 | 2 | 3 | 3 | Must be excellent on tablet/phone |
| Onboarding / migration | ? | 2 | ? | ? | 2 | 2 | Low-friction import from BinderPOS/Crystal |
| Pricing / total cost | ? | ? | 2 | ? | 2 | 2 | Avoid stacked Shopify+app subscriptions |

> `?` = not verified. `0*` = no offline capability advertised (Storepass is Shopify-based/web) — confirm by trial. `1?` = weak based on reputation/competitor comparisons — confirm independently.

## Per-competitor deep-dive

> First-pass, source-cited. Confirm the `?`/`*` items with a hands-on trial and update.

### BinderPOS
- **Type / focus:** Cloud POS + inventory for brick-and-mortar TCG/hobby stores; **acquired by and integrated into TCGplayer**.
- **Strengths (public docs):** Strong **buylist** at POS and online with a custom rule generator (cash/credit), bulk buylist updates via CSV; CSV bulk import/export; singles + sealed databases; multichannel sync (own Shopify site, TCGplayer, eBay); **event module**; analytics/reporting; kiosk mode; store-credit system; auto price updates (~every 12h); reserve quantities; multi-currency/language.
- **Gaps:** POS is **cloud-based and requires an internet connection** (no offline). No native mobile apps (per third-party comparison). Pricing is market-based auto-update, not demand/velocity recommendations. Requires Shopify.
- **Offline behavior:** None advertised — explicitly "accessed from anywhere with an internet connection."
- **Show pickup / preorder:** Event module + Shopify-based preorders; booth-pickup-at-show not a first-class flow.
- **Buylist / trade-in:** Best-in-class among peers.
- **Sources:** binderpos.com; seller.tcgplayer.com/point-of-sale; tcgplayer buylist blog; binderpos freshdesk (2026-07-25).

### Storepass
- **Type / focus:** TCG/hobby store software (POS, buylist, catalog, preorders), **Shopify-integrated**; markets 100+ stores, 800k+ POS transactions.
- **Strengths:** Fast POS on desktop/laptop/tablet; **multiple tills**, split tender (cash/card/store credit), Stripe terminals, receipt printers, cash drawers; customer-facing **buylist** with staff review → Shopify store credit → inventory intake; **catalog automation** with day-one new-set support and **preorders**; search built for large card catalogs (game/set/rarity/finish/condition/location); kiosk; "run registers in store, **at events**, or across locations."
- **Gaps:** No **offline** capability advertised (Shopify-based/web). Pricing not public (scales with volume). Dynamic/demand pricing not evident (automated pricing = market-based).
- **Offline behavior:** Not mentioned — assume limited; confirm.
- **Show pickup / preorder:** Preorders on release day + event registers; strongest of the card tools here, but still not an explicit "reserve show inventory → pick up at booth" flow.
- **Buylist / trade-in:** Best-in-class; in-person trade-in built in.
- **Sources:** storepass.co and /features/{point-of-sale,buylist,product-catalog} (2026-07-25).

### Crystal Commerce
- **Type / focus:** Multichannel ecommerce + inventory + **web-based POS** for game/hobby stores.
- **Strengths:** 1M+ product catalog; batch price/qty updates; **buylist mode**; TCGplayer market price data; multichannel sync (Amazon, eBay, TCGplayer, CardTrader); web POS for "in-store and **event** sales"; reporting/sales dashboard; store-credit tracking.
- **Gaps:** **No card scanning**; POS is web-based (no offline advertised); UX widely regarded as dated (per competitor comparisons — verify independently).
- **Offline behavior:** None advertised.
- **Pricing:** **$99/mo + 2.5%** on webstore/marketplace sales; **0% on POS and buylist** transactions.
- **Buylist / trade-in:** Present; less emphasized than BinderPOS/Storepass.
- **Sources:** crystalcommerce.com /pricing, /retailers, /services, /local-game-stores (2026-07-25).

### TCGplayer
- **Type / focus:** Dominant **online marketplace** for cards + seller tools; **owns BinderPOS** (its POS story).
- **Strengths:** Best-in-class **market pricing data**; huge buyer demand; seller/pro tooling; POS via BinderPOS.
- **Gaps:** Marketplace-first, not a show-day POS by itself; commission/fees; offline N/A.
- **Show pickup / preorder:** Not a booth-pickup solution.
- **Sources:** tcgplayer.com; seller.tcgplayer.com (2026-07-25).

### Square (generic)
- **Type / focus:** General retail POS + payments; not card-specific.
- **Strengths:** **Excellent offline payments** — accept card + cash with no connection, transactions stored on-device and auto-synced on reconnect (24–72h window; ~90% of hardware supported); fast, mobile/tablet-first checkout; integrated payments; easy onboarding.
- **Gaps:** No TCG catalog, no condition/set/variant attributes, no card **price lookup** by market value, no **buylist/trade-in**, no show pickup. Vendors would bolt card logic on manually.
- **Offline behavior:** Strong for *payments/checkout*, but there's no card inventory/pricing to look up offline.
- **Sources:** squareup.com offline-payments guide + press (2026-07-25).

### Shopify (+ card apps)
- **Type / focus:** General ecommerce + POS; gains TCG features via apps (BinderPOS/Storepass are built on it).
- **Strengths:** Best-in-class storefront/ecommerce; solid POS; large app ecosystem; strong mobile/tablet.
- **Gaps / offline limits:** Offline supports cash + manual; **card capture deferred** until reconnect; **cannot** create products, refund, add customers, validate discount codes, or update inventory in real time offline (**oversell risk**). Generic without card apps; stacking Shopify + a card app = multiple subscriptions.
- **Show pickup / preorder:** BOPIS exists online (not offline); generic, not show-oriented.
- **Sources:** help.shopify.com POS offline features; firstpier/gochyu/connectpos analyses (2026-07-25).

### Template — copy for a new competitor
- **Type / focus:**
- **Strengths (verified):**
- **Weaknesses / gaps (verified):**
- **Offline behavior:**
- **Show pickup / preorder support:**
- **Buylist / trade-in support:**
- **What vendors say about it:** _(from customer discovery interviews)_
- **Sources:** _(links, dates, "trialed on YYYY-MM-DD")_

## Opportunity & whitespace

Synthesis of the first-pass matrix (confirm with trials + [discovery](./13-roadmap-and-next-steps.md#1-start-with-customer-discovery)):

- **Clear whitespace (few/no strong options):**
  - **True offline for card ops.** Card-specific tools (BinderPOS, Crystal, Storepass, TCGplayer) are cloud/web and don't offer offline **price lookup + order building**. The generic tools that *do* offline (Square, Shopify) have **no card catalog/pricing** to look up offline. This is the strongest wedge and aligns with our [offline requirements](./features/04-point-of-sale-checkout.md).
  - **Demand/velocity-based dynamic pricing & buy recommendations.** Peers do *market-price* auto-updates, not recommendations driven by the vendor's own sales velocity/inventory/event demand → aligns with `PRC-11`–`PRC-15` and `BUY-15`–`BUY-20`.
  - **AI features** are broadly weak across the field.
  - **Booth-pickup-at-show** as a first-class buyer flow (reserve *this show's* inventory → pick up at the booth) is only partially served by preorders.
- **Table stakes (must match, won't win on):** inventory management, buylist/trade-in intake, basic POS/order building, market pricing data, multichannel sync.
- **Crowded / hard to win:** online marketplace demand (TCGplayer) and general storefront/ecommerce (Shopify) — integrate with these rather than compete head-on.
- **Our sharpest wedge:** an **offline-first, show-day, mobile/tablet POS** with fast card lookup and **online booth pickup**, layering demand-based pricing/buylist recs later.
- **Positioning implication:** refine the [partner brief](./13-roadmap-and-next-steps.md#7-one-page-partner-brief) around "run your booth even with bad Wi-Fi" + "let customers preorder from your show inventory" — the two capabilities incumbents don't combine.

## Research log

| Date | Competitor | Method | Key finding | Source |
| --- | --- | --- | --- | --- |
| 2026-07-25 | BinderPOS | Public docs | Cloud POS (no offline); strong buylist + rules; event module; owned by TCGplayer | binderpos.com; seller.tcgplayer.com/point-of-sale |
| 2026-07-25 | Storepass | Public docs | Shopify-based POS/buylist/catalog; preorders + event registers; no offline advertised | storepass.co/features/* |
| 2026-07-25 | Crystal Commerce | Public docs | $99/mo + 2.5% online; buylist + multichannel; web POS, no card scanning | crystalcommerce.com/pricing, /retailers |
| 2026-07-25 | TCGplayer | Public docs | Marketplace leader for pricing/demand; owns BinderPOS for POS | tcgplayer.com; seller.tcgplayer.com |
| 2026-07-25 | Square | Public docs | Strong offline **payments** (auto-sync), but not card-specific | squareup.com offline-payments guide/press |
| 2026-07-25 | Shopify | Public docs | Offline cash/manual; card capture deferred; oversell risk; no offline product/refund | help.shopify.com POS offline features |
