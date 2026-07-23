import policy from '../../config/invitation-policy.json';
import keySet from '../config/invitation-public-keys.json';
import { InvitationValidationError, validateInvitationPayload } from '../../lib/invitation-schema.mjs';
import { decodeBase64Url, decodeJsonSegment } from './base64url';

export async function verifyInvitationToken(token, options = {}) {
  try {
    if (typeof token !== 'string' || token.length > 6000) throw new InvitationValidationError('malformed-token');
    const parts = token.split('.');
    if (parts.length !== 3 || parts.some((part) => !part)) throw new InvitationValidationError('malformed-token');
    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const header = decodeJsonSegment(encodedHeader);
    if (!header || header.alg !== 'ES256' || header.typ !== 'JWT' || typeof header.kid !== 'string') {
      throw new InvitationValidationError('invalid-header');
    }
    const activeKeySet = options.keySet || keySet;
    const jwk = activeKeySet.keys.find((key) => key.kid === header.kid && key.kty === 'EC' && key.crv === 'P-256');
    if (!jwk) throw new InvitationValidationError('unknown-key');
    const cryptoKey = await crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
    const verified = await crypto.subtle.verify(
      { name: 'ECDSA', hash: 'SHA-256' },
      cryptoKey,
      decodeBase64Url(encodedSignature),
      new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`),
    );
    if (!verified) throw new InvitationValidationError('invalid-signature');
    return { ok: true, invitation: validateInvitationPayload(decodeJsonSegment(encodedPayload), { policy: options.policy || policy, now: options.now }) };
  } catch (error) {
    const code = error instanceof InvitationValidationError ? error.code : 'malformed-token';
    return { ok: false, code };
  }
}
