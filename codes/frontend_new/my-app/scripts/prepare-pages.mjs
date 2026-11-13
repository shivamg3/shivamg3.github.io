import { access, cp } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repository = resolve(project, '../../..');
await access(resolve(repository, '.git'));
await access(resolve(project, 'dist/index.html'));
for (const path of ['index.html', '404.html', 'assets', 'about', 'projects', 'education', 'writing', 'contact', 'story', 'articles/india-electronics-manufacturing', 'tap', 'sitemap.xml', 'robots.txt']) {
  const source = resolve(project, 'dist', path);
  const target = resolve(repository, path);
  if (!target.startsWith(repository + '/') && !target.startsWith(repository + '\\')) throw new Error('Invalid release path');
  await cp(source, target, { recursive:true });
}
console.log('Prepared tracked GitHub Pages release files. No deployment was triggered.');
