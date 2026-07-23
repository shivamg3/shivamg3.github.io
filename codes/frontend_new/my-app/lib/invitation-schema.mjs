export class InvitationValidationError extends Error {
  constructor(code) {
    super(code);
    this.name = 'InvitationValidationError';
    this.code = code;
  }
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const COMPACT_ID_PATTERN = /^[A-Za-z0-9_-]{16,64}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const DEFAULT_INVITATION_TITLE = 'A conversation with Shivam';
export const DEFAULT_INVITATION_DESCRIPTION = 'Choose a time that works for you, and we’ll take it from there.';

function expectString(value, field, max, { optional = false } = {}) {
  if (optional && (value === undefined || value === '')) return undefined;
  if (typeof value !== 'string' || value.trim().length === 0 || value.length > max) {
    throw new InvitationValidationError(`invalid-${field}`);
  }
  return value.trim();
}

function expectTimestamp(value, field) {
  if (!Number.isSafeInteger(value) || value < 0) throw new InvitationValidationError(`invalid-${field}`);
  return value;
}

function claim(payload, compactName, legacyName) {
  const compactValue = payload[compactName];
  const legacyValue = payload[legacyName];
  if (compactValue !== undefined && legacyValue !== undefined && compactValue !== legacyValue) {
    throw new InvitationValidationError('ambiguous-payload');
  }
  return compactValue ?? legacyValue;
}

function eventKeyForDuration(policy, duration) {
  const matches = Object.entries(policy.events)
    .filter(([, event]) => event.durations.includes(duration))
    .map(([eventKey]) => eventKey);
  if (matches.length !== 1) throw new InvitationValidationError('ambiguous-event');
  return matches[0];
}

export function validateInvitationPayload(payload, { policy, now = Math.floor(Date.now() / 1000), clockTolerance = 60 } = {}) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new InvitationValidationError('malformed-payload');
  const compact = payload.n !== undefined || payload.x !== undefined;
  const version = payload.v ?? (compact ? policy.version : undefined);
  const issuer = payload.iss ?? (compact ? policy.issuer : undefined);
  const audience = payload.aud ?? (compact ? policy.audience : undefined);
  if (version !== policy.version) throw new InvitationValidationError('unsupported-version');
  if (issuer !== policy.issuer) throw new InvitationValidationError('wrong-issuer');
  if (audience !== policy.audience) throw new InvitationValidationError('wrong-audience');
  if (payload.jti !== undefined && (typeof payload.jti !== 'string' || (!UUID_PATTERN.test(payload.jti) && !COMPACT_ID_PATTERN.test(payload.jti)))) {
    throw new InvitationValidationError('invalid-jti');
  }
  if (!compact && payload.jti === undefined) throw new InvitationValidationError('invalid-jti');

  const iat = payload.iat === undefined ? undefined : expectTimestamp(payload.iat, 'iat');
  const rawNotBefore = claim(payload, 'b', 'nbf');
  const nbf = rawNotBefore === undefined ? undefined : expectTimestamp(rawNotBefore, 'nbf');
  const exp = expectTimestamp(claim(payload, 'x', 'exp'), 'exp');
  if ((iat !== undefined && iat > now + clockTolerance) || (nbf !== undefined && nbf > now + clockTolerance)) {
    throw new InvitationValidationError('not-active');
  }
  if (exp <= now - clockTolerance || (nbf !== undefined && exp <= nbf)) throw new InvitationValidationError('expired');

  const name = expectString(claim(payload, 'n', 'name'), 'name', policy.limits.name);
  const firstName = expectString(payload.firstName, 'firstName', policy.limits.firstName, { optional: true }) || name.split(/\s+/u)[0];
  const email = expectString(payload.email, 'email', policy.limits.email, { optional: true });
  if (email && !EMAIL_PATTERN.test(email)) throw new InvitationValidationError('invalid-email');
  const company = expectString(payload.company, 'company', policy.limits.company, { optional: true });
  const title = expectString(payload.title, 'title', policy.limits.title, { optional: true }) || DEFAULT_INVITATION_TITLE;
  const description = expectString(payload.description, 'description', policy.limits.description, { optional: true }) || DEFAULT_INVITATION_DESCRIPTION;
  const duration = claim(payload, 'd', 'duration');
  const explicitEventKey = claim(payload, 'e', 'eventKey');
  const eventKey = explicitEventKey ?? eventKeyForDuration(policy, duration);
  const event = policy.events[eventKey];
  if (!event) throw new InvitationValidationError('unknown-event');
  if (!Number.isInteger(duration) || !event.durations.includes(duration)) throw new InvitationValidationError('unsupported-duration');

  return Object.freeze({
    v: version,
    iss: issuer,
    aud: audience,
    ...(payload.jti ? { jti: payload.jti } : {}),
    name,
    firstName,
    ...(email ? { email } : {}),
    ...(company ? { company } : {}),
    title,
    description,
    eventKey,
    duration,
    ...(iat !== undefined ? { iat } : {}),
    ...(nbf !== undefined ? { nbf } : {}),
    exp,
  });
}
