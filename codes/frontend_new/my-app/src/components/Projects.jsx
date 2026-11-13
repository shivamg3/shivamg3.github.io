import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import ProjectArtwork from './ProjectArtwork';

const categories = ['All', 'Research', 'Venture', 'Engineering', 'Fabrication'];

export default function Projects() {
  const [category, setCategory] = useState('All');
  const visible = projects.filter(project => category === 'All' || project.category === category);
  return <div className="editorial-page projects-page">
    <header className="page-lead"><h1>Work</h1></header>
    <div className="project-filters" role="group" aria-label="Filter projects">{categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
    <div className="project-grid">{visible.map(project => <Link key={project.slug} className="project-card" to={'/projects/' + project.slug}>
      <figure className="project-image"><ProjectArtwork project={project} /></figure>
      <div className="project-card-meta"><span>{project.category}</span><span>{project.status}</span></div>
      <div className="project-card-title"><h2>{project.title}</h2><span aria-hidden="true">↗</span></div>
    </Link>)}</div>
  </div>;
}

export function ProjectDetail() {
  const { slug } = useParams();
  const index = projects.findIndex(project => project.slug === slug);
  const project = projects[index];
  if (!project) return <div className="editorial-page not-found"><h1>404</h1><p>Project not found</p><Link className="text-link" to="/projects">Work →</Link></div>;
  const next = projects[(index + 1) % projects.length];
  return <article className="editorial-page project-detail">
    <Link className="back-link" to="/projects">← Work</Link>
    <header className="page-lead"><p className="kicker">{project.category}</p><h1>{project.title}</h1></header>
    <div className="project-detail-grid">
      <figure className="project-detail-art"><ProjectArtwork project={project} />{!project.image && <figcaption>Schematic</figcaption>}</figure>
      <div className="project-specifications">
        <dl className="facts-list"><div><dt>Status</dt><dd>{project.status}</dd></div><div><dt>Topics</dt><dd><ul>{project.topics.map(topic => <li key={topic}>{topic}</li>)}</ul></dd></div>{project.publication && <div><dt>Publication</dt><dd>{project.publication}</dd></div>}</dl>
        {project.links.length > 0 && <nav className="project-sources" aria-label="Project links">{project.links.map(([label, url]) => <a className="text-link" href={url} target="_blank" rel="noreferrer" key={url}>{label} ↗</a>)}</nav>}
      </div>
    </div>
    <Link className="next-project" to={'/projects/' + next.slug}><span>Next</span><h2>{next.title}</h2><span aria-hidden="true">→</span></Link>
  </article>;
}
