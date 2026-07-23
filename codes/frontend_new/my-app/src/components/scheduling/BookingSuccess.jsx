import { useEffect, useRef } from 'react';

function formatBooking(booking) {
  if (!booking?.startTime) return null;
  const date = new Date(booking.startTime);
  if (Number.isNaN(date.getTime())) return null;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return {
    dateTime: new Intl.DateTimeFormat(undefined, { dateStyle: 'full', timeStyle: 'short', timeZone: timezone }).format(date),
    timezone,
  };
}

export default function BookingSuccess({ booking, onContinue }) {
  const formatted = formatBooking(booking);
  const headingRef = useRef(null);
  useEffect(() => {
    headingRef.current?.focus();
    const timeout = window.setTimeout(onContinue, 2000);
    return () => window.clearTimeout(timeout);
  }, [onContinue]);

  return <div className="booking-success" role="status" aria-live="assertive">
    <div className="booking-success-mark" aria-hidden="true">✓</div>
    <p className="meeting-overline">Confirmed</p>
    <h2 ref={headingRef} id="meeting-title" tabIndex="-1">You’re booked.</h2>
    {formatted && <p><strong>{formatted.dateTime}</strong><br /><span>{formatted.timezone}</span></p>}
    <p id="meeting-description">A calendar invitation is on its way to you.</p>
    <button type="button" onClick={onContinue}>Continue to website</button>
  </div>;
}
