import { useEffect, useRef, useState } from 'react';
import { getGeneralSchedulerUrl } from '../scheduling/schedulerConfig';

const email = 'shivam939a8@gmail.com';
export default function Contact() {
  const [copyStatus, setCopyStatus] = useState('');
  const timer = useRef(null);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setCopyStatus('Copied'); }
    catch { setCopyStatus('Copy unavailable'); }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopyStatus(''), 2200);
  }
  const scheduler = getGeneralSchedulerUrl();
  return <div className="editorial-page contact-page">
    <header className="page-lead"><h1>Contact</h1></header>
    <div className="contact-email"><a href={'mailto:' + email}>{email}</a><button type="button" onClick={copyEmail} aria-label="Copy email address">Copy</button><span role="status">{copyStatus}</span></div>
    <div className="contact-links">
      <a href="https://www.linkedin.com/in/shivam-garg-iitd/" target="_blank" rel="noreferrer"><span>LinkedIn</span><span>shivam-garg-iitd ↗</span></a>
      <a href="https://github.com/shivamg3" target="_blank" rel="noreferrer"><span>GitHub</span><span>shivamg3 ↗</span></a>
      {scheduler && <a href={scheduler} target="_blank" rel="noreferrer"><span>Calendar</span><span>20 minutes ↗</span></a>}
      <a href="/tap/shivam-garg.vcf" download="Shivam-Garg.vcf"><span>Contact card</span><span>Download ↓</span></a>
    </div>
    <p className="contact-location">Urbana, Illinois</p>
  </div>;
}
