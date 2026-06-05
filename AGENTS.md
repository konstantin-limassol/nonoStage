# NoNoDebt (v0-nonodebt) — instructions for AI agents

Landing + 2-step lead form. Leads are posted to **MoneyFor** `POST /api/lead/post` via a **server-only** Next.js proxy (`/api/lead`). UI work is fine; **contracts below are owned by engineering** — do not “improve” them unless the user **explicitly** asks (e.g. “change validation for phone”, “update lead post payload”).

## Commands

```bash
pnpm install
pnpm dev          # staging MF domain (NEXT_PUBLIC_LOCATION=staging)
pnpm build:prod   # production MF domain
```

Secrets: `.env.local` locally; Vercel env vars in deploy. Never commit real API keys.

## Do not modify (unless explicitly requested)

### Field validation & normalization

- `lib/validation.ts` — regex rules (email, US phone 10 digits, personal name, state code). Do not swap for Zod/Yup/HTML5-only validation.
- `lib/validate-form.ts` — per-field messages, step1/step2 field sets, `validateStep2` re-checking step1 fields.
- `lib/normalize-form.ts` — trim names/email, uppercase state, digits-only phone (10 chars).
- `components/phone-input.tsx` — stores **digits only**; display via `formatPhone`.
- `constants/debt-options.ts` — `value` strings are **MF `debt_amount` / `debt_type` enums**, not display labels.
- `constants/us-states.ts` — 2-letter codes for MF `state`.

### MoneyFor lead API (server)

- `lib/moneyfor/post-lead.ts` — MF payload `{ campaignId, source, leadData, subId1?, pathName? }`; top-level `source` and `leadData.source` = `LEAD_POST_SOURCE`; `Authorization`; MF accept → `redirectURL`; errors → hard offer URL.
- `lib/moneyfor/map-form-to-lead-data.ts` — camelCase form → snake_case `leadData` (`debt_amount`, `home_phone`, `source`, optional `client_user_agent` / `client_ip` / `client_browser_referer`).
- `lib/moneyfor/types.ts` — `MoneyforLeadData`, `MoneyforLeadPostRequest`, `LeadMapInput`, `LeadClientMeta`, proxy request/response types.
- `lib/moneyfor/config.ts` — env names (`NONODEBT_MONEYFOR_*`); `campaignId` = **campaign alias** in admin (not `uniqueKey`); `publisher` for `Authorization` header only.
- `lib/moneyfor/client-request-meta.ts` — server-side `client_user_agent`, `client_ip`, `client_browser_referer` from incoming proxy request headers.
- `lib/moneyfor/proxy.ts` — `LEAD_PROXY_PREFIX=/api/lead`, `MF_LEAD_POST_PATH=api/lead/post`.
- `lib/moneyfor/fetch-to-mf.ts`, `lib/utils/domains.ts` — MF base URL (`moneyfor.com` / `moneyfor.devpr.net` / `NEXT_PUBLIC_DOMAIN_MF`).
- `lib/moneyfor/constants.ts` — `LEAD_POST_TIMEOUT_MS`, `LEAD_POST_SOURCE` (`nonodebt`), hard-offer origins/path (not env-driven).
- `lib/moneyfor/hard-offer-url.ts` — surveys1 redirect URL; `source` = `LEAD_POST_SOURCE`; `correlationId` resolution.
- `app/api/lead/route.ts` — thin POST handler; `getClientRequestMeta(request)` → `postLeadToMoneyfor`; no extra client-side validation here.

### Client → proxy contract

- `lib/submit-lead.ts` — POST body: form fields + `subId1` / `pathName` (no `source`; server sets from config).
- `lib/form-types.ts` — `FormData` keys must stay aligned with the form and API.
- `lib/url-params.ts`, `lib/session-id.ts` — tracking/session behavior.

### Lead form behavior (logic, not styling)

In `components/lead-form.tsx` do **not** change without explicit ask:

- Two-step flow, `validateStep1` / `validateStep2`, submit via `submitLead`, redirect to `result.redirectUrl`.
- Form field `name` / state keys matching `FormData`.

### v0 / tooling

- `__v0_*`, `.v0/inject-built-with-v0.mjs`, `vercel.json` build hook.

## Safe to change (typical v0 / manager requests)

- Marketing copy, colors, spacing, typography, sections, images, header/footer layout.
- `app/globals.css`, static pages, `app/thank-you/page.tsx` **presentation** (not redirect contract).
- shadcn `components/ui/*` **styling** only — avoid changing select/value wiring tied to debt options.
- `components/header.tsx`, `components/cta-section.tsx` — visual and scroll targets; keep `#get-started` / `scrollToLeadForm` working.

## Explicit override rule

If a manager asks in v0 chat to “fix validation” or “change the API” **without** engineering approval, **do not edit protected files**. Reply that lead/validation contracts require an explicit engineering task. Only proceed when the prompt names the contract (e.g. “update `validatePhone` regex” or “add field X to `mapFormToMoneyforLeadData`”).

## Reference

MoneyFor: `POST /api/lead/post` with `campaignId`, `source` (publisher name), `leadData` (form fields + `source` + optional client metadata), optional `subId1` / `pathName`. Docs in monorepo: `moneyfor/docs/modules/reject-listing/lead/`.
