# Personalized scheduling

## Architecture

The site accepts invitation URLs in this form:

```text
https://shivamg3.github.io/#meet=<signed-token>
```

The fragment is consumed before React renders and is immediately removed with `history.replaceState`. It is not sent in the initial HTTP request, added to the document title, logged, persisted, or forwarded to analytics. The token is verified in the browser with Web Crypto and a committed public ECDSA P-256 key. Only the local private key can create a valid ES256 signature. Previously generated compact `#m=` links remain accepted for compatibility.

After verification, React keeps the normalized invitation in memory for that page session. A lazy-loaded overlay imports the official Cal.com embed only for a valid invitation. Cal.com handles availability, timezone conversion, conflicts, event creation, notifications, reminders, rescheduling, cancellation, and meeting locations. The site listens to `linkReady`, `linkFailed`, and `bookingSuccessfulV2`; the deprecated `bookingSuccessful` event is not used.

Important modules:

- `scripts/invite-keygen.mjs` — local ES256 key creation
- `scripts/invite-create.mjs` — local signed-invitation generator
- `config/invitation-policy.json` — issuer, audience, event/duration allowlist, and field limits
- `src/config/invitation-public-keys.json` — safe public verification keys
- `src/invitations/` — fragment consumption and verification
- `src/scheduling/` — public scheduler configuration and Cal.com adapter
- `src/components/scheduling/` — accessible invitation, error, reopen, and success UI

No private key, Cal.com API key, OAuth secret, webhook secret, recipient list, or invitation record belongs in this repository.

## Cal.com account setup

Repository code cannot configure a private calendar account. Complete these steps in Cal.com:

1. Confirm the `20min` and `30min` event types remain active.
2. Connect the Google or Outlook calendar used for conflict checking.
3. Set the availability schedule and timezone.
4. Configure buffers, minimum notice, booking horizon, and daily limits.
5. Confirm `20min` is a 20-minute event and `30min` is a 30-minute event.
6. Select the destination calendar where bookings should be created.
7. Configure the same link-based Google Meet URL as the location on both event types.
8. Configure confirmation emails, reminders, rescheduling, and cancellation behavior.
9. Make a real test booking and confirm both organizer and attendee notifications.
10. Copy the public `username/event-slug` values into the Vite environment configuration below.

Cal.com’s official embed documentation covers [inline embedding](https://cal.com/help/embedding/adding-embed), [prefilling name and email](https://cal.com/help/embedding/prefill-booking-form-embed), and [embed events](https://cal.com/help/embedding/embed-events).

## Public configuration

The current public Cal.com values are compiled into the safe scheduler configuration. Copy `.env.example` to an untracked `.env.local` only when you need to override them:

```bash
cp .env.example .env.local
```

```dotenv
VITE_CAL_ORIGIN=https://cal.com
VITE_CAL_EVENT_SHORT_CONVERSATION=shivamg3/20min
VITE_CAL_EVENT_EXTENDED_CONVERSATION=shivamg3/30min
VITE_CAL_GENERAL_LINK=shivamg3/20min
VITE_SITE_URL=https://shivamg3.github.io
```

These values are public and contain no credentials. `VITE_CAL_GENERAL_LINK` is optional; when omitted, invalid invitations offer only “Continue to website.” The event keys and allowed durations live in `config/invitation-policy.json`; a signed token cannot select an arbitrary URL.

The Content Security Policy allowlists the exact Cal.com/app.cal.com origins needed by the embed, plus the existing travel map’s jsDelivr data origin and placehold.co image origin. If any provider changes its documented hosts, update the policy narrowly after verification.

## Generate and protect a signing key

From `codes/frontend_new/my-app`:

```bash
npm run invite:keygen -- --kid invite-key-1
```

The default private-key path is `.invite-private-key.pem`. It is gitignored and written with owner-only permissions. The command refuses to overwrite an existing private key or public key ID unless `--force` is explicitly supplied. For long-term storage, move the private key to an encrypted vault and set:

```bash
export INVITE_PRIVATE_KEY_PATH=/secure/path/invite-key-1.pem
```

Never paste the private key into GitHub Actions, frontend environment variables, Cal.com settings, issue comments, or chat.

### Rotation

Generate the new private key at a different path and use a new key ID:

```bash
npm run invite:keygen -- --kid invite-key-2 --private-key /secure/path/invite-key-2.pem
```

New invitations should use `--kid invite-key-2`. Keep the old public key in `src/config/invitation-public-keys.json` until every old invitation expires. Removing an old public key immediately invalidates all links signed by it. Delete old private keys securely after the migration window.

To invalidate every existing link immediately, generate a fresh key ID, replace the `keys` array with only its public key, rebuild the site, and stop using or delete every older private key. This is intentionally disruptive: old links will fail as `unknown-key` as soon as the new build is live.

## Create an invitation

```bash
npm run invite:create -- \
  --name "Jane Smith" \
  --first-name "Jane" \
  --email "jane@example.com" \
  --company "Acme" \
  --title "Jane × Shivam — short conversation" \
  --description "A quick conversation about the partnership idea we discussed." \
  --event "short-conversation" \
  --duration 20 \
  --expires "2026-08-31" \
  --messages
```

The command validates the invitation, generates a random UUID, signs it, prints the full URL and UTC expiration, and copies the URL when the operating system clipboard is available. `--messages` prints optional email and messaging copy. It never writes recipient data to a tracked file.

New invitations include the personalized conversation title and description so each recipient sees the context Shivam wrote for them.

- required: `name`, `title`, `description`, `event`, `duration`, `expires`
- optional: `first-name`, `email`, `company`, `not-before`, `kid`
- operational: `private-key`, `messages`, `no-copy`

Expiration accepts `YYYY-MM-DD` (ending at 23:59:59 UTC) or a full ISO timestamp. Event keys and durations must match the allowlist.

## Privacy

Signed tokens provide integrity, not encryption. Anyone holding a link can decode its claims. Email is therefore optional: omit `--email` to prefill only the name and let Cal.com collect the address during booking. Do not put sensitive discussions, confidential data, or secrets in the description.

Recipient content is rendered by React as text, never as HTML. It is not stored in `localStorage`, cookies, generated files, or a service worker. Closing the overlay retains it only in JavaScript memory so the invitation can be reopened during the current page session.

## Static-hosting limitation

GitHub Pages cannot provide true global single-use links. A signature proves who created the invitation and expiration limits its lifetime, but the static site cannot reliably record that it has been booked. Browser storage would not solve this across devices and is intentionally not used.

For future single-use enforcement, add one serverless service using the project’s chosen infrastructure. It should store only opaque invitation IDs, verify/issue invitations server-side, receive a verified Cal.com webhook, mark an ID booked, and reject later uses. Private keys and webhook secrets must stay server-side. Moving the whole site away from GitHub Pages is not required.

## Local and production testing

```bash
npm ci --legacy-peer-deps
npm run lint
npm test
npm run build
npm run dev
```

Open a freshly generated invitation URL against the local origin only if its `aud` claim matches the policy used by that build. For production, deploy the public key and environment values, then generate a production-audience invitation and make one real booking. Confirm:

- the token disappears from the address bar;
- the personalized overlay opens;
- name/email prefilling works;
- timezone and real availability are correct;
- booking creates the calendar event and sends both confirmations;
- the success state appears and returns to the homepage;
- close/Escape and the reopen chip work before booking.

Automated tests mock Cal.com and never create real bookings.

## Troubleshooting

- **Invitation unavailable:** confirm the token was copied completely, has not expired, uses the expected audience/issuer, and its `kid` remains in the public key set.
- **Calendar unavailable:** confirm the Vite event variable is set to a public `username/event-slug`, the event is active, and Cal.com is reachable.
- **No available times:** check connected-calendar credentials, availability, buffers, notice, date overrides, and event limits in Cal.com.
- **Prefill missing:** confirm the invitation was generated with the field and the event’s booking fields still use Cal.com’s standard name/email fields.
- **CSP error:** do not add broad wildcards. Verify the current official Cal.com host and add only the specific required origin.
- **Wrong custom domain:** update the policy audience, canonical/site configuration, regenerate invitations, and rebuild. Existing tokens for the former audience will intentionally fail.
