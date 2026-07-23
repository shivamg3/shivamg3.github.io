export class InvitationValidationError extends Error {
  constructor(code) {
    super(code);
    this.name = 'InvitationValidationError';
    this.code = code;
  }
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export function validateInvitationPayload(payload, { policy, now = Math.floor(Date.now() / 1000), clockTolerance = 60 } = {}) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new InvitationValidationError('malformed-payload');
  if (payload.v !== policy.version) throw new InvitationValidationError('unsupported-version');
  if (payload.iss !== policy.issuer) throw new InvitationValidationError('wrong-issuer');
  if (payload.aud !== policy.audience) throw new InvitationValidationError('wrong-audience');
  if (typeof payload.jti !== 'string' || !UUID_PATTERN.test(payload.jti)) throw new InvitationValidationError('invalid-jti');

  const iat = expectTimestamp(payload.iat, 'iat');
  const nbf = expectTimestamp(payload.nbf, 'nbf');
  const exp = expectTimestamp(payload.exp, 'exp');
  if (iat > now + clockTolerance || nbf > now + clockTolerance) throw new InvitationValidationError('not-active');
  if (exp <= now - clockTolerance || exp <= nbf) throw new InvitationValidationError('expired');

  const name = expectString(payload.name, 'name', policy.limits.name);
  const firstName = expectString(payload.firstName, 'firstName', policy.limits.firstName);
  const email = expectString(payload.email, 'email', policy.limits.email, { optional: true });
  if (email && !EMAIL_PATTERN.test(email)) throw new InvitationValidationError('invalid-email');
  const company = expectString(payload.company, 'company', policy.limits.company, { optional: true });
  const title = expectString(payload.title, 'title', policy.limits.title);
  const description = expectString(payload.description, 'description', policy.limits.description);
  const event = policy.events[payload.eventKey];
  if (!event) throw new InvitationValidationError('unknown-event');
  if (!Number.isInteger(payload.duration) || !event.durations.includes(payload.duration)) throw new InvitationValidationError('unsupported-duration');

  return Object.freeze({
    v: payload.v,
    iss: payload.iss,
    aud: payload.aud,
    jti: payload.jti,
    name,
    firstName,
    ...(email ? { email } : {}),
    ...(company ? { company } : {}),
    title,
    description,
    eventKey: payload.eventKey,
    duration: payload.duration,
    iat,
    nbf,
    exp,
  });
}
