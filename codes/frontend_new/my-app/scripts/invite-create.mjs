import crypto from 'node:crypto';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { validateInvitationPayload } from '../lib/invitation-schema.mjs';
import { base64UrlJson, parseArgs, privateKeyPath, readJson, requireArg } from './invite-utils.mjs';

function expirationTimestamp(value) {
  const isoValue = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T23:59:59Z` : value;
  const timestamp = Date.parse(isoValue);
  if (!Number.isFinite(timestamp)) throw new Error('--expires must be an ISO date or timestamp.');
  return Math.floor(timestamp / 1000);
}

function copyToClipboard(value) {
  const command = process.platform === 'darwin' ? ['pbcopy'] : process.platform === 'win32' ? ['clip'] : ['xclip', '-selection', 'clipboard'];
  const result = spawnSync(command[0], command.slice(1), { input: value, encoding: 'utf8', stdio: ['pipe', 'ignore', 'ignore'] });
  return result.status === 0;
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(`Create a signed personalized invitation.

Required:
  --name <name> --title <title> --description <text>
  --event <event-key> --duration <minutes> --expires <ISO date>

Optional:
  --first-name <name> --email <email> --company <company>
  --not-before <ISO date> --kid <key-id> --private-key <path>
  --messages --no-copy`);
    process.exit(0);
  }
  const policy = readJson('config/invitation-policy.json');
  const keySet = readJson('src/config/invitation-public-keys.json');
  const privatePath = privateKeyPath(args);
  if (!fs.existsSync(privatePath)) throw new Error(`Private key not found at ${privatePath}. Run npm run invite:keygen first.`);
  const kid = args.kid || keySet.keys.at(-1)?.kid;
  if (!kid || !keySet.keys.some((key) => key.kid === kid)) throw new Error('No matching public key ID is configured.');

  const now = Math.floor(Date.now() / 1000);
  const name = requireArg(args, 'name').trim();
  const payload = {
    v: policy.version,
    iss: policy.issuer,
    aud: policy.audience,
    jti: crypto.randomUUID(),
    name,
    firstName: (args['first-name'] || name.split(/\s+/u)[0]).trim(),
    ...(args.email ? { email: args.email.trim() } : {}),
    ...(args.company ? { company: args.company.trim() } : {}),
    title: requireArg(args, 'title').trim(),
    description: requireArg(args, 'description').trim(),
    eventKey: requireArg(args, 'event'),
    duration: Number(requireArg(args, 'duration')),
    iat: now,
    nbf: args['not-before'] ? expirationTimestamp(args['not-before']) : now,
    exp: expirationTimestamp(requireArg(args, 'expires')),
  };
  validateInvitationPayload(payload, { policy, now });

  const header = { alg: 'ES256', typ: 'JWT', kid };
  const signingInput = `${base64UrlJson(header)}.${base64UrlJson(payload)}`;
  const signature = crypto.sign('sha256', Buffer.from(signingInput), {
    key: fs.readFileSync(privatePath, 'utf8'),
    dsaEncoding: 'ieee-p1363',
  }).toString('base64url');
  const token = `${signingInput}.${signature}`;
  const siteUrl = (process.env.INVITE_SITE_URL || policy.audience).replace(/\/$/, '');
  const invitationUrl = `${siteUrl}/#meet=${token}`;

  console.log(`Invitation expires: ${new Date(payload.exp * 1000).toISOString()}`);
  console.log(`Invitation URL:\n${invitationUrl}`);
  if (!args['no-copy']) console.log(copyToClipboard(invitationUrl) ? 'Copied invitation URL to the clipboard.' : 'Clipboard unavailable; copy the URL above.');
  if (args.messages) {
    console.log(`\nEmail:\nHi ${payload.firstName}, I created a personal invitation for our conversation: ${invitationUrl}`);
    console.log(`\nLinkedIn / WhatsApp:\nHi ${payload.firstName} — here’s the personal scheduling link I made for us: ${invitationUrl}`);
  }
} catch (error) {
  console.error(`Invitation creation failed: ${error.message}`);
  process.exitCode = 1;
}
