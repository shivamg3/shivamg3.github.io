import { useState } from 'react';
const intro = "Hi Shivam! I came across your website and enjoyed learning about your work. I'd love to connect and explore how we might work together.";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copyIntro = async () => { try { await navigator.clipboard.writeText(intro); } catch { /* LinkedIn remains available without clipboard access. */ } setCopied(true); window.setTimeout(() => setCopied(false), 2000); };
  return <div className="editorial-page contact-page"><header className="page-lead"><p className="kicker">Let’s talk</p><h1>Good things start<br />with a conversation.</h1><p>If you’re thinking about manufacturing, deep tech, research, or a hard problem worth solving, I’d like to hear from you.</p></header><section className="contact-options"><a href="mailto:shivam939a8@gmail.com?subject=Hello%20from%20your%20website"><span>Email</span><strong>shivam939a8@gmail.com</strong><b>↗</b></a><a href="https://www.linkedin.com/in/shivam-garg-iitd/" target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>Connect with me</strong><b>↗</b></a><a href="https://github.com/shivamg3" target="_blank" rel="noreferrer"><span>GitHub</span><strong>See what I’m making</strong><b>↗</b></a></section><section className="warm-intro"><div><p className="kicker">Need an opening line?</p><p>“{intro}”</p></div><button onClick={copyIntro}>{copied ? 'Copied' : 'Copy note'}</button></section></div>;
}
