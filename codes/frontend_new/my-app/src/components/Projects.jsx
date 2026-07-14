const projects = [
  { number:'01', title:'Cloud-Direct NC', label:'Research · Published', text:'A new architecture for numerical control that brings cloud, client, and embedded intelligence into one connected system.', link:'https://www.sciencedirect.com/science/article/pii/S0278612526001056?via%3Dihub' },
  { number:'02', title:'ToolBit', label:'Venture · Building', text:'An open platform that helps manufacturers add AI and intelligent capabilities to the CNC machines they already own.', link:'https://landuyt.illinois.edu/news/82922' },
  { number:'03', title:'CNC Motion Controller', label:'Engineering · In progress', text:'A multi-axis motion-control stack built from the ground up, from trajectory generation to real-time hardware integration.' },
  { number:'04', title:'Electric Skateboard', label:'Personal · In progress', text:'A hands-on build spanning battery systems, motor control, mechanical design, and custom-fabricated enclosures.' },
  { number:'05', title:'Microfluidic Mixer', label:'Fabrication · Completed', text:'Design and clean-room fabrication of a passive microfluidic mixer and a piezoresistive pressure sensor.' },
  { number:'06', title:'FSAE CFRP Bodywork', label:'Team leadership · Completed', text:'Led the design and manufacturing of carbon-fiber bodywork for an IIT Delhi Formula SAE race car.' },
];

export default function Projects() {
  return <div className="editorial-page"><header className="page-lead"><p className="kicker">Selected work</p><h1>Ideas are better<br />when they move.</h1><p>Research, products, and personal builds united by one instinct: understand the system, then make it better.</p></header><div className="work-list">{projects.map(project => <article key={project.title}><span className="work-number">{project.number}</span><div><p className="kicker">{project.label}</p><h2>{project.title}</h2><p>{project.text}</p></div>{project.link ? <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>↗</a> : <span className="work-mark">—</span>}</article>)}</div></div>;
}
