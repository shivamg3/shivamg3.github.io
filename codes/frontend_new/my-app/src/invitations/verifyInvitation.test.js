import { Buffer } from 'node:buffer';
import { beforeAll, describe, expect, it } from 'vitest';
import policy from '../../config/invitation-policy.json';
import { verifyInvitationToken } from './verifyInvitation';

let keyPair;
let publicJwk;
const now = 1_800_000_000;

function encode(value) {
  return Buffer.from(typeof value === 'string' ? value : JSON.stringify(value)).toString('base64url');
}

function validPayload(overrides = {}) {
  return {
    v: 1,
    iss: policy.issuer,
    aud: policy.audience,
    jti: '123e4567-e89b-42d3-a456-426614174000',
    name: 'Jane Smith',
    firstName: 'Jane',
    email: 'jane@example.com',
    company: 'Acme',
    title: 'Jane × Shivam — conversation',
    description: 'A quick conversation about manufacturing.',
    eventKey: 'short-conversation',
    duration: 20,
    iat: now,
    nbf: now,
    exp: now + 3600,
    ...overrides,
  };
}

function compactPayload(overrides = {}) {
  return {
    n: 'Jane Smith',
    d: 20,
    x: now + 3600,
    ...overrides,
  };
}

async function sign(payload = validPayload(), headerOverrides = {}) {
  const header = { alg: 'ES256', typ: 'JWT', kid: 'test-key', ...headerOverrides };
  const signingInput = `${encode(header)}.${encode(payload)}`;
  const signature = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, keyPair.privateKey, new TextEncoder().encode(signingInput));
  return `${signingInput}.${Buffer.from(signature).toString('base64url')}`;
}

function options(extra = {}) {
  return { now, policy, keySet: { keys: [{ ...publicJwk, kid: 'test-key', alg: 'ES256', use: 'sig' }] }, ...extra };
}

beforeAll(async () => {
  keyPair = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
  publicJwk = await crypto.subtle.exportKey('jwk', keyPair.publicKey);
});

describe('verifyInvitationToken', () => {
  it('accepts a valid signed invitation', async () => expect((await verifyInvitationToken(await sign(), options())).ok).toBe(true));

  it('accepts compact name-only invitations and supplies standard copy', async () => {
    const result = await verifyInvitationToken(await sign(compactPayload(), { typ: undefined }), options());
    expect(result.ok).toBe(true);
    expect(result.invitation).toMatchObject({
      name: 'Jane Smith',
      firstName: 'Jane',
      title: 'A conversation with Shivam',
      description: 'Choose a time that works for you, and we’ll take it from there.',
      eventKey: 'short-conversation',
      duration: 20,
    });
    expect(result.invitation).not.toHaveProperty('email');
    expect(result.invitation).not.toHaveProperty('company');
  });

  it('accepts the configured 30-minute extended conversation', async () => {
    const result = await verifyInvitationToken(await sign(validPayload({ eventKey: 'extended-conversation', duration: 30 })), options());
    expect(result.ok).toBe(true);
    expect(result.invitation).toMatchObject({ eventKey: 'extended-conversation', duration: 30 });
  });

  it('rejects a tampered payload', async () => {
    const token = await sign();
    const [header, payload, signature] = token.split('.');
    const changed = { ...JSON.parse(Buffer.from(payload, 'base64url').toString()), title: 'Changed' };
    expect((await verifyInvitationToken(`${header}.${encode(changed)}.${signature}`, options())).code).toBe('invalid-signature');
  });

  it('rejects a tampered signature', async () => {
    const parts = (await sign()).split('.');
    parts[2] = `${parts[2].slice(0, -2)}aa`;
    expect((await verifyInvitationToken(parts.join('.'), options())).code).toBe('invalid-signature');
  });

  it('rejects expired and not-yet-valid invitations', async () => {
    expect((await verifyInvitationToken(await sign(validPayload({ exp: now - 100 })), options())).code).toBe('expired');
    expect((await verifyInvitationToken(await sign(validPayload({ nbf: now + 3600, exp: now + 7200 })), options())).code).toBe('not-active');
  });

  it('rejects wrong audience and issuer', async () => {
    expect((await verifyInvitationToken(await sign(validPayload({ aud: 'https://wrong.example' })), options())).code).toBe('wrong-audience');
    expect((await verifyInvitationToken(await sign(validPayload({ iss: 'someone-else' })), options())).code).toBe('wrong-issuer');
  });

  it('rejects unsupported versions and durations', async () => {
    expect((await verifyInvitationToken(await sign(validPayload({ v: 2 })), options())).code).toBe('unsupported-version');
    expect((await verifyInvitationToken(await sign(validPayload({ duration: 45 })), options())).code).toBe('unsupported-duration');
  });

  it('rejects malformed compact tokens', async () => {
    expect((await verifyInvitationToken('not.a.valid.compact.token', options())).code).toBe('malformed-token');
  });

  it('rejects an unknown key ID and event key', async () => {
    expect((await verifyInvitationToken(await sign(validPayload(), { kid: 'missing' }), options())).code).toBe('unknown-key');
    expect((await verifyInvitationToken(await sign(validPayload({ eventKey: 'arbitrary-url' })), options())).code).toBe('unknown-event');
  });

  it('accepts missing email and Unicode names', async () => {
    const payload = validPayload({ name: '李 小龍', firstName: '小龍' });
    delete payload.email;
    const result = await verifyInvitationToken(await sign(payload), options());
    expect(result.ok).toBe(true);
    expect(result.invitation).toMatchObject({ name: '李 小龍', firstName: '小龍' });
    expect(result.invitation).not.toHaveProperty('email');
  });

  it('rejects overly long fields', async () => {
    const result = await verifyInvitationToken(await sign(validPayload({ title: 'x'.repeat(181) })), options());
    expect(result.code).toBe('invalid-title');
  });

  it('preserves script-like text as plain data', async () => {
    const text = '<script>alert("no")</script>';
    const result = await verifyInvitationToken(await sign(validPayload({ description: text })), options());
    expect(result.ok).toBe(true);
    expect(result.invitation.description).toBe(text);
  });
});
