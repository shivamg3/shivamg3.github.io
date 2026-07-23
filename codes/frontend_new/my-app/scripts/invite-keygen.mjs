import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs, privateKeyPath, projectRoot } from './invite-utils.mjs';

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(`Generate an ES256 invitation-signing key pair.

Options:
  --kid <key-id> --private-key <path> --force`);
    process.exit(0);
  }
  const kid = args.kid || `invite-key-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}`;
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{2,63}$/.test(kid)) throw new Error('Key ID must be 3–64 safe characters.');
  const privatePath = privateKeyPath(args);
  const publicPath = path.join(projectRoot, 'src/config/invitation-public-keys.json');
  if (fs.existsSync(privatePath) && !args.force) throw new Error(`Private key already exists at ${privatePath}. Use --force only if rotation is intentional.`);

  const keySet = fs.existsSync(publicPath) ? JSON.parse(fs.readFileSync(publicPath, 'utf8')) : { keys: [] };
  const existingIndex = keySet.keys.findIndex((key) => key.kid === kid);
  if (existingIndex >= 0 && !args.force) throw new Error(`Public key ID ${kid} already exists. Choose a new --kid for rotation.`);

  const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
  const privatePem = privateKey.export({ format: 'pem', type: 'pkcs8' });
  const publicJwk = publicKey.export({ format: 'jwk' });
  const safePublicKey = { kid, kty: 'EC', crv: 'P-256', alg: 'ES256', use: 'sig', x: publicJwk.x, y: publicJwk.y };

  fs.writeFileSync(privatePath, privatePem, { mode: 0o600, flag: args.force ? 'w' : 'wx' });
  if (existingIndex >= 0) keySet.keys[existingIndex] = safePublicKey;
  else keySet.keys.push(safePublicKey);
  fs.writeFileSync(publicPath, `${JSON.stringify(keySet, null, 2)}\n`);

  console.log(`Created ES256 key pair with ID: ${kid}`);
  console.log(`Private key (never commit): ${privatePath}`);
  console.log(`Public verification config: ${publicPath}`);
  console.log('Back up the private key in a password manager or encrypted vault. Keep old public keys during rotation until their invitations expire.');
} catch (error) {
  console.error(`Invitation key generation failed: ${error.message}`);
  process.exitCode = 1;
}
