export default function ProjectArtwork({ project }) {
  if (project.image) return <img src={project.image} alt={project.title} loading="lazy" />;
  return <svg className={'project-art project-art--' + project.artwork} viewBox="0 0 600 380" role="img" aria-label={project.title + ' — schematic'}>
    <g className="art-grid" stroke="currentColor" opacity=".1"><path d="M0 95h600M0 190h600M0 285h600M100 0v380M200 0v380M300 0v380M400 0v380M500 0v380" fill="none" /></g>
    {project.artwork === 'cloud' && <>
      <path className="art-signal" d="M140 215h110v-60h100v60h110" fill="none" stroke="#9a7357" strokeWidth="2" strokeDasharray="4 7" />
      {[110,270,430].map((x,i) => <g key={x} transform={'translate(' + x + ' ' + (i===1?95:155) + ')'}><path d="m0 15 42-24 42 24-42 24Z" fill="#c7d2d6" stroke="#526873" /><path d="m0 15 42 24v64L0 79Z" fill="#8297a1" stroke="#526873" /><path d="m42 39 42-24v64l-42 24Z" fill="#345366" stroke="#526873" /><path d="m9 42 23 13M9 54l23 13" stroke="#dae2e0" /><circle cx="64" cy="70" r="3" fill="#d6b38c" /></g>)}
      <g fill="#3b5360" fontFamily="Georgia, serif" fontSize="16"><text x="155" y="296" textAnchor="middle">Cloud</text><text x="315" y="236" textAnchor="middle">Client</text><text x="475" y="296" textAnchor="middle">CNC</text></g>
    </>}
    {project.artwork === 'chip' && <g className="art-chip" transform="translate(300 190) rotate(-12)"><path d="m-100-56 100-58 100 58L0 2Z" fill="#bdcbd0" stroke="#4d6976" /><path d="M-100-56 0 2v112l-100-58Z" fill="#708b98" stroke="#4d6976" /><path d="M0 2 100-56V56L0 114Z" fill="#25495c" stroke="#4d6976" /><path d="m-68-55 68-39 68 39L0-16Z" fill="#2d5367" stroke="#4d6976" /><path d="M-88-13-20 27M-88 9l68 40M14 30l66-38M14 52l66-38M14 74l66-38" stroke="#c2d0d4" strokeWidth="2" /><circle cx="52" cy="-55" r="7" fill="#be9671" /></g>}
    {project.artwork === 'motion' && <>
      <g stroke="#b6c3c7" fill="none"><path d="M75 85v210h460M75 190h460M190 85v210M305 85v210M420 85v210" /><path d="M75 140h460M75 242h460" strokeDasharray="3 7" /></g>
      <path className="art-wave" d="M75 242c50 0 40-104 100-104s45 104 100 104 45-104 100-104 45 104 100 104h60" stroke="#234d63" strokeWidth="3" fill="none" />
      <g fill="#b68a60"><circle cx="175" cy="138" r="5" /><circle cx="375" cy="138" r="5" /></g>
    </>}
    {project.artwork === 'board' && <g transform="translate(80 205) rotate(-16)">
      <ellipse cx="206" cy="92" rx="189" ry="18" fill="#263b44" opacity=".05" />
      <path d="M25-6C-9-12-9 30 25 37h357c32-7 32-49 0-43Z" fill="#78919e" stroke="#294959" strokeWidth="2" /><path d="M25-12C-9-18-9 20 25 27h357c32-7 32-49 0-39Z" fill="#cbd4d2" stroke="#294959" strokeWidth="2" />
      <path d="M87 34v28m237-28v28M68 60h39m198 0h39" stroke="#314e5d" strokeWidth="8" />
      <ellipse cx="82" cy="66" rx="17" ry="24" fill="#2f3d43" /><ellipse cx="320" cy="66" rx="17" ry="24" fill="#2f3d43" /><ellipse cx="87" cy="66" rx="6" ry="12" fill="#a7b7bc" /><ellipse cx="325" cy="66" rx="6" ry="12" fill="#a7b7bc" />
      <path d="M143 29h110v27H143Z" fill="#3d5e6d" stroke="#294959" /><path d="M156 36h83M156 43h83" stroke="#9bb0b8" />
    </g>}
  </svg>;
}
