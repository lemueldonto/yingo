# Yingo — Decision log

Decisions taken on 2026-09-27 that refine or override the PRD (docs/prd.md).
When this file and the PRD disagree, this file wins. Each entry is final unless
superseded by a later entry.

---

## D-001 — Plan and action engines: hybrid architecture

**Context.** The PRD mentions a module shared between app and backend; the
architecture mentions a "Monday plan" Edge Function. The weekly plan must be
stable across devices, and the Monday notification is the main retention lever.

**Decision.**
- Both engines live in one pure TypeScript package (`packages/engine`), with no
  dependency on React, Expo, Supabase or Deno APIs. It runs in the app and in
  Edge Functions.
- **App**: the plan engine recomputes live and offline (freedom date, leeway,
  survival mode, "can I afford it?"). PLN-05 holds.
- **Server**: a scheduled job generates each user's weekly plan on Monday morning
  in the user's local time zone, stores it, then sends a personalized push
  notification.
- **Single writer**: weekly plans are written only by the server (like
  `subscriptions`). If the app opens before the job ran (new user, early Monday),
  it calls the same Edge Function, which creates the plan idempotently.
- Uniqueness: one weekly plan per user per ISO week (unique constraint).
- Every stored plan records the engine version that produced it.

**Consequences.** Needs push tokens, a stored user time zone, one Edge Function
and one scheduled job. Prepares the Go migration step for the Monday worker.
The engine package must be importable from Deno (no Node-only APIs).

---

## D-002 — Offline: read-only

**Decision.** Debts, plan, letters and call scripts are readable offline from a
local cache of the last synced data. Writes (declare a payment, add a debt,
complete an action) require the network and show a clear, friendly message when
offline. Plan recomputation stays local (D-001). No write queue, no conflict
resolution in the MVP.

---

## D-003 — Protection features stay free after expiry

**Context.** SUB-04 makes the app read-only when the subscription expires. The
users most likely to cancel for lack of money are the most at risk.

**Decision.** After expiry, the following remain fully available:
- Survival mode (PRO-01): recommended payment order and spreading-request
  letters and scripts.
- Referral alert (PRO-02): guidance to a Point Conseil Budget and the Banque de
  France procedure.
Everything else becomes read-only as per SUB-04.

**PRD update.** SUB-04 is amended accordingly.

---

## D-004 — When an action can be proposed again

**Decision.** Depends on the action status:

| Status | Proposed again |
| --- | --- |
| Postponed (`postponed`) | The following week |
| Not possible (`not_possible`) | After 4 weeks |
| Done (`done`), one-off action (e.g. quick audit) | Never |
| Done (`done`), recurring action (e.g. renegotiate, sell an item) | After 4 weeks |

Each catalog action therefore declares whether it is `oneOff` or `recurring`.

---

## D-005 — Mockups are drafts; concrete rewards arrive in V2

**Mockups.** The screens in the visual identity board are drafts. The Mountain
screen in particular is not the final design. Use the board for palette, fonts,
Cabri and tone of voice only, not for layouts.

**Concrete rewards.**
- **MVP**: badges and celebrations only. The data model already allows attaching
  a reward to a milestone (nullable `reward_id` on milestones/achievements, a
  `rewards` table can be added later without migration pain).
- **V2**: concrete rewards, of three kinds:
  - discounts or vouchers on essential spending (groceries, energy, transport),
    preferred because they free money for repayment;
  - gift cards;
  - partner offers.
- **Earned only on verifiable milestones**: subscription tenure (RevenueCat),
  streaks of active weeks, camps reached. Never on self-declared quests alone,
  never tied to an amount repaid.
- **Rules that still apply**: rewards are known in advance and identical for
  everyone, no randomness (no loot box), no credit or debt consolidation offer
  from any partner.
- **To validate with the lawyer before V2**: partner offers on regulated products
  (insurance, mobile plans) versus the "no named product recommendation" rule.

---

## D-006 — Security and data export are P0

New PRD requirements:

| ID | Requirement | Priority |
| --- | --- | --- |
| SEC-01 | App lock with Face ID / fingerprint or a PIN code, offered at account creation, can be turned off in settings. | P0 |
| SEC-02 | Export of all personal data as a JSON file from the settings (GDPR right to data portability). | P0 |

SEC-01 fits in `account-and-gdpr`; SEC-02 too.
