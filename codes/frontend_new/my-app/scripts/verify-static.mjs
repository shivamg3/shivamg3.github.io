import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/data/projects.js';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = process.argv[2] ? resolve(process.argv[2]) : resolve(project, 'dist');
const routes = ['', 'about', 'projects', 'education', 'writing', 'contact', 'story', 'articles/india-electronics-manufacturing', ...projects.map(item => 'projects/' + item.slug)];
for (const route of routes) {
  const html = await readFile(resolve(output, route, 'index.html'), 'utf8');
  assert.match(html, /<title>[^<]+<\/title>/, route + ' has a title');
  assert.ok(html.includes('https://shivamg3.github.io/' + (route ? route + '/' : '')), route + ' has a canonical URL');
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) await access(resolve(output, '.' + asset));
}
for (const file of ['404.html', 'sitemap.xml', 'robots.txt', 'tap/index.html', 'tap/shivam-garg.vcf', 'me.jpg', 'images/micro_nano.jpg', 'images/carbon_fibre.JPG', 'articles/india-electronics-manufacturing-chain.png', 'story/graduation.jpg', 'story/hyperloop-team.jpg', 'story/glimpse-of-shivam-garg-2024.pdf']) await access(resolve(output, file));
console.log('Verified ' + routes.length + ' page routes, local bundles, contact card, archive and image assets.');
