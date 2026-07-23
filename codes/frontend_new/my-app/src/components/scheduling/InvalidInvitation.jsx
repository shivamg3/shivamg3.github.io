import { useEffect, useRef } from 'react';
import { getGeneralSchedulerUrl } from '../../scheduling/schedulerConfig';

export default function InvalidInvitation({ onContinue }) {
  const generalUrl = getGeneralSchedulerUrl();
  const dialogRef = useRef(null);
  const continueRef = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    continueRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onContinue();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll('a[href], button:not([disabled])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = oldOverflow;
      previous?.focus?.();
    };
  }, [onContinue]);
  return <div className="invitation-notice-backdrop">
    <section ref={dialogRef} className="invitation-notice" role="alertdialog" aria-modal="true" aria-labelledby="invalid-invitation-title">
      <p className="meeting-overline">Personal invitation</p>
      <h2 id="invalid-invitation-title">This invitation is no longer available.</h2>
      <p>It may have expired or the link may be incomplete. You can still explore the website.</p>
      <div><button ref={continueRef} type="button" onClick={onContinue}>Continue to website</button>{generalUrl && <a href={generalUrl} target="_blank" rel="noreferrer">Request another time ↗</a>}</div>
    </section>
  </div>;
}
