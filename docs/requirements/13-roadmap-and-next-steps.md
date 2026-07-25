# 13 · Roadmap & Next Steps

> How to kick off and sequence the work. High-level for now.

| | |
| --- | --- |
| **Status** | Draft |
| **Owner** | _TBD_ |

## Kick-Off Recommendations

### 1. Start with customer discovery
Before building, interview 10–20 vendors. A full interview kit — comprehensive question bank, screener, and notes template — lives in [`discovery/`](./discovery/README.md). Starter questions:

- How do you currently manage inventory at shows?
- How do employees look up prices?
- What slows checkout down?
- How often does Wi-Fi cause issues?
- Do you accept preorders or pickup orders today?
- Do you currently buy cards from customers at shows, online, or in-store?
- How do you set buylist prices today?
- Do employees have authority to make buy offers, or do owners approve them?
- What software do you currently use, and what do you dislike about it?
- How do you track what sold at a show?
- How do you decide what inventory to bring?
- Would you pay for a better solution, and what would make switching worth it?

### 2. Define the MVP around one core workflow
See [MVP Scope](./10-mvp-scope.md) for the recommended core and secondary workflows.

### 3. Treat online pickup as the differentiator
Positioning: *"Let customers shop your show inventory before the event and pick up at your booth."*

### 4. Be careful with dynamic pricing early
Frame it as **pricing recommendations**, not automatic pricing — vendors want control. The same applies to buylist pricing.

### 5. Validate offline mode early
Define exactly what "offline" means. For MVP, start with:

> Offline price lookup + offline draft orders + sync when reconnected.

### 6. Build a competitive review

Map the landscape so our differentiation is concrete. The full scaffold — competitor shortlist, scoring rubric, comparison matrix, per-competitor deep-dives, and whitespace analysis — lives in [`competitive-review.md`](./competitive-review.md). Starter matrix:

| Area | Binder POS | StorePass | Product Opportunity |
| --- | --- | --- | --- |
| Inventory | | | |
| POS | | | |
| Offline mode | | | |
| Show pickup | | | |
| Dynamic pricing | | | |
| Buylist pricing | | | |
| Trade-in intake | | | |
| AI features | | | |
| Ease of use | | | |
| Modern UX | | | |

### 7. One-page partner brief

> We are building a SaaS platform for medium-to-large card show vendors that modernizes inventory, pricing, order management, and show pickup workflows. The initial wedge is faster show operations: inventory lookup, order building, offline pricing, and pickup orders. Longer term, we can expand into AI pricing recommendations, demand forecasting, customer want-list matching, and event-based commerce.

## Open Decisions for the Next Conversation

1. **Which market first?** Sports cards · TCGs · all trading cards
2. **Which workflow is the wedge?** POS/order building · inventory tracking · online pickup · offline pricing
3. **What is the MVP promise?**
   - "Never manually total a customer order again."
   - "Run your card show booth even with bad Wi-Fi."
   - "Let customers preorder from your booth inventory."
   - "Know exactly what sold and what to bring next time."
4. **What does the first customer need to do successfully?** Upload inventory → bring it to a show → sell through the platform → track completed orders → review sales after the show.

**Recommendation:** Start with show-mode inventory + fast order building + offline pricing. Then add online pickup orders as the first major differentiator.

## Additional Details

_Add milestone dates, sequencing, and dependencies here._
