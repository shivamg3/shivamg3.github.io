import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const entry = argv[index];
    if (!entry.startsWith('--')) throw new Error(`Unexpected argument: ${entry}`);
    const key = entry.slice(2);
    if (key === 'force' || key === 'messages' || key === 'no-copy' || key === 'help') {
      args[key] = true;
      continue;
    }
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) throw new Error(`Missing value for --${key}`);
    args[key] = value;
    index += 1;
  }
  return args;
}

export function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(projectRoot, relativePath), 'utf8'));
}

export function base64UrlJson(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

export function requireArg(args, name) {
  if (!args[name]) throw new Error(`--${name} is required`);
  return args[name];
}

export function privateKeyPath(args) {
  return path.resolve(args['private-key'] || process.env.INVITE_PRIVATE_KEY_PATH || path.join(projectRoot, '.invite-private-key.pem'));
}
