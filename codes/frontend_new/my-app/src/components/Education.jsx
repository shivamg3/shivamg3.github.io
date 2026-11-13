import { Link } from 'react-router-dom';

const education = [
  { logo:'uiuc_logo.png', years:'2024 — 2026', school:'University of Illinois Urbana-Champaign', degree:'M.S. Mechanical Engineering' },
  { logo:'iitd_logo.png', years:'2019 — 2023', school:'Indian Institute of Technology Delhi', degree:'B.Tech Production & Industrial Engineering', archive:true },
  { logo:'bhavan_logo.png', years:'2017 — 2019', school:'Bhavan Vidyalaya', degree:'High school' },
  { logo:'dav_logo.png', years:'2013 — 2017', school:'DAV Public School', degree:'Middle school' },
  { logo:'new_india_logo.png', years:'Until 2013', school:'New India Senior Secondary School', degree:'Early schooling' },
];

export default function Education() {
  return <div className="editorial-page education-page"><header className="page-lead"><h1>Education</h1></header><div className="education-list">{education.map(item => <article key={item.school}><time>{item.years}</time><img src={'/logos/' + item.logo} alt="" /><div><h2>{item.school}</h2><p>{item.degree}</p>{item.archive && <Link className="text-link" to="/story">IIT Delhi archive <span>→</span></Link>}</div></article>)}</div></div>;
}
