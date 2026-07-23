import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import BookingSuccess from './BookingSuccess';

const SchedulerEmbed = lazy(() => import('../../scheduling/SchedulerEmbed'));

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

export default function PersonalizedMeetingOverlay({ invitation, onClose, onBooked }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const bookingRef = useRef(null);
  const [booking, setBooking] = useState(null);
  const complete = useCallback(() => onBooked(), [onBooked]);
  const handleBooking = useCallback((nextBooking) => {
    bookingRef.current = nextBooking;
    setBooking(nextBooking);
  }, []);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !bookingRef.current) {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll(FOCUSABLE)].filter((element) => !element.hidden);
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
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return <div className="meeting-backdrop">
    <section ref={dialogRef} className="meeting-dialog" role="dialog" aria-modal="true" aria-labelledby="meeting-title" aria-describedby="meeting-description">
      {!booking && <button ref={closeRef} type="button" className="meeting-close" onClick={onClose} aria-label="Close scheduling invitation">×</button>}
      {booking ? <BookingSuccess booking={booking} onContinue={complete} /> : <>
        <aside className="invitation-details">
          <div className="meeting-host"><img src={`${import.meta.env.BASE_URL}me.jpg`} alt="Shivam Garg" /><span>Invitation from Shivam</span></div>
          <p className="meeting-overline">Personal invitation</p>
          <h2 id="meeting-title">{invitation.firstName}, I created this invitation for our conversation.</h2>
          <div className="meeting-topic"><h3>{invitation.title}</h3><p id="meeting-description">{invitation.description}</p></div>
          <div className="meeting-meta"><span>{invitation.duration} minutes</span>{invitation.company && <span>{invitation.company}</span>}</div>
          <p className="meeting-reassurance">Choose any time that works for you. The calendar will adjust to your timezone.</p>
        </aside>
        <div className="scheduler-panel">
          <Suspense fallback={<div className="scheduler-loading" role="status"><span /><span /><span /><p>Preparing your invitation…</p></div>}>
            <SchedulerEmbed invitation={invitation} onBookingSuccessful={handleBooking} />
          </Suspense>
        </div>
      </>}
    </section>
  </div>;
}
