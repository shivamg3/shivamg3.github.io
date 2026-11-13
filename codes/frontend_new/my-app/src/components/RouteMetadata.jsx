import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { projects } from '../data/projects';

const pages = {
  '/':['Shivam Garg', 'Shivam Garg.'],
  '/about':['About — Shivam Garg', 'Shivam Garg. UIUC. IIT Delhi.'],
  '/projects':['Work — Shivam Garg', 'Cloud-Direct NC, ToolBit, CNC Motion Controller, Electric Skateboard, Microfluidic Mixer, FSAE CFRP Bodywork.'],
  '/education':['Education — Shivam Garg', 'UIUC. IIT Delhi. Bhavan Vidyalaya. DAV Public School. New India Senior Secondary School.'],
  '/writing':['Writing — Shivam Garg', 'Writing by Shivam Garg.'],
  '/contact':['Contact — Shivam Garg', 'Shivam Garg. Email, LinkedIn, GitHub and calendar.'],
  '/story':['IIT Delhi — Shivam Garg', 'IIT Delhi, 2019–2023. Formula Racing, Infinity Hyperloop and teaching.'],
  '/articles/india-electronics-manufacturing':['Where Does India’s Electronics Manufacturing Chain Actually Get Stuck? — Shivam Garg', 'By Shivam Garg. August 20, 2026.'],
};

export default function RouteMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/';
    const project = projects.find(item => '/projects/' + item.slug === path);
    const [title, description] = project ? [project.title + ' — Shivam Garg', project.topics.join(', ') + '.'] : pages[path] || ['404 — Shivam Garg', 'Page not found.'];
    const canonical = 'https://shivamg3.github.io' + (path === '/' ? '/' : path + '/');
    document.title = title;
    for (const [selector, value] of [
      ['meta[name="description"]', description], ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description], ['meta[property="og:url"]', canonical],
      ['meta[name="twitter:title"]', title], ['meta[name="twitter:description"]', description],
    ]) { const element = document.querySelector(selector); if (element) element.content = value; }
    const link = document.querySelector('link[rel="canonical"]');
    if (link) link.href = canonical;
  }, [pathname]);
  return null;
}
