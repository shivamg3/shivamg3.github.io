const education = [
  { logo:'/logos/uiuc_logo.png', years:'2024 — 2026', school:'University of Illinois Urbana-Champaign', degree:'M.S. Mechanical Engineering', note:'Researching a new generation of numerical control technology.' },
  { logo:'/logos/iitd_logo.png', years:'2019 — 2023', school:'Indian Institute of Technology Delhi', degree:'B.Tech Production & Industrial Engineering', note:'Where manufacturing became more than a discipline—it became my direction.' },
  { logo:'/logos/bhavan_logo.png', years:'2017 — 2019', school:'Bhavan Vidyalaya', degree:'High school', note:'The chapter where ambition started taking a more definite shape.' },
  { logo:'/logos/dav_logo.png', years:'2013 — 2017', school:'DAV Public School', degree:'Middle school', note:'Early experiments, useful mistakes, and plenty of curiosity.' },
  { logo:'/logos/new_india_logo.png', years:'Until 2013', school:'New India Senior Secondary School', degree:'Early schooling', note:'Where the story began.' },
];

export default function Education() {
  return <div className="editorial-page journey-page"><header className="page-lead"><p className="kicker">The journey</p><h1>Every place left<br />something with me.</h1><p>Degrees are milestones. The real education is the collection of questions, people, experiments, and mistakes between them.</p></header><div className="journey-list">{education.map((item, i) => <article key={item.school}><div className="journey-index">0{i+1}</div><img src={item.logo} alt="" /><div><time>{item.years}</time><h2>{item.school}</h2><h3>{item.degree}</h3><p>{item.note}</p></div></article>)}</div></div>;
}
