import { useState } from 'react';

const intro = "Hi Shivam! I came across your website and enjoyed learning about your work. I'd love to connect and explore how we might work together.";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyIntro = async () => {
    try {
      await navigator.clipboard.writeText(intro);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = intro;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="contact-card glass-card">
      <div className="contact-copy">
        <p className="eyebrow">Start a conversation</p>
        <h1>Let’s build something meaningful.</h1>
        <p>I’m always glad to meet people working in manufacturing, deep tech, research, and ambitious new ventures.</p>
        <div className="contact-links">
          <a href="mailto:shivam939a8@gmail.com?subject=Hello%20from%20your%20website">Email me <span>↗</span></a>
          <a href="https://github.com/shivamg3" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
        </div>
      </div>

      <div className="linkedin-card">
        <div className="linkedin-icon">in</div>
        <p className="eyebrow">LinkedIn</p>
        <h2>Say hello with a warm introduction</h2>
        <p className="intro-message">“{intro}”</p>
        <div className="linkedin-actions">
          <button className="button secondary" onClick={copyIntro}>{copied ? 'Copied!' : 'Copy message'}</button>
          <a className="button primary" href="https://www.linkedin.com/in/shivam-garg-iitd/" target="_blank" rel="noreferrer">Open LinkedIn ↗</a>
        </div>
        <small>LinkedIn doesn’t allow websites to pre-fill private messages, so copy this note and paste it after opening my profile.</small>
      </div>
    </section>
  );
}
