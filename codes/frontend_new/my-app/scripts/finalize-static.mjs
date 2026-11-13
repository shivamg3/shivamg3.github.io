import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/data/projects.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const template = (await readFile(resolve(dist, 'index.html'), 'utf8')).replaceAll('\r', '');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const routes = [
  ['', 'Shivam Garg', 'Shivam Garg.'],
  ['about', 'About — Shivam Garg', 'Shivam Garg. UIUC. IIT Delhi.'],
  ['projects', 'Work — Shivam Garg', projects.map(project => project.title).join(', ') + '.'],
  ['education', 'Education — Shivam Garg', 'UIUC. IIT Delhi.'],
  ['writing', 'Writing — Shivam Garg', 'Writing by Shivam Garg.'],
  ['contact', 'Contact — Shivam Garg', 'Email, LinkedIn, GitHub and calendar.'],
  ['story', 'IIT Delhi — Shivam Garg', 'IIT Delhi, 2019–2023. Formula Racing, Infinity Hyperloop and teaching.'],
  ['articles/india-electronics-manufacturing', 'Where Does India’s Electronics Manufacturing Chain Actually Get Stuck? — Shivam Garg', 'By Shivam Garg. August 20, 2026.'],
  ...projects.map(project => ['projects/' + project.slug, project.title + ' — Shivam Garg', project.topics.join(', ') + '.']),
];
function page(title, description, path) {
  const url = 'https://shivamg3.github.io/' + (path ? path + '/' : '');
  return template.replace(/<title>.*?<\/title>/, '<title>' + escape(title) + '</title>')
    .replace(/(<meta name="description" content=")[^"]*(")/, '$1' + escape(description) + '$2')
    .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*(")/g, '$1' + escape(title) + '$2')
    .replace(/(<meta (?:property="og:description"|name="twitter:description") content=")[^"]*(")/g, '$1' + escape(description) + '$2')
    .replace(/(<meta property="og:url" content=")[^"]*(")/, '$1' + url + '$2')
    .replace(/(<link rel="canonical" href=")[^"]*(")/, '$1' + url + '$2');
}
for (const [path, title, description] of routes) {
  const directory = resolve(dist, path);
  await mkdir(directory, { recursive:true });
  await writeFile(resolve(directory, 'index.html'), page(title, description, path));
}
await writeFile(resolve(dist, '404.html'), page('404 — Shivam Garg', 'Page not found.', ''));
const tapPath = resolve(dist, 'tap/index.html');
await writeFile(tapPath, (await readFile(tapPath, 'utf8')).replaceAll('\r', ''));
const urls = [...routes.map(([path]) => 'https://shivamg3.github.io/' + (path ? path + '/' : '')), 'https://shivamg3.github.io/tap/'];
await writeFile(resolve(dist, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map(url => '  <url><loc>' + url + '</loc></url>').join('\n') + '\n</urlset>\n');
await writeFile(resolve(dist, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://shivamg3.github.io/sitemap.xml\n');
console.log('Prepared ' + routes.length + ' static routes, 404, sitemap and robots.txt.');
