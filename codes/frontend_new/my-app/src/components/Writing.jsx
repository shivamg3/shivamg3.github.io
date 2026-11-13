import { Link } from 'react-router-dom';

export default function Writing() {
  return <div className="editorial-page writing-page">
    <header className="page-lead"><h1>Writing</h1></header>
    <Link className="writing-entry" to="/articles/india-electronics-manufacturing"><time dateTime="2026-08-20">20 August 2026</time><div><h2>Where Does India’s Electronics Manufacturing Chain Actually Get Stuck?</h2><span>8 min read</span></div><span aria-hidden="true">↗</span></Link>
    <a className="writing-entry writing-entry--external" href="https://studyandsave.blogspot.com/" target="_blank" rel="noreferrer"><span>Elsewhere</span><h2>Study and Save</h2><span aria-hidden="true">↗</span></a>
  </div>;
}
