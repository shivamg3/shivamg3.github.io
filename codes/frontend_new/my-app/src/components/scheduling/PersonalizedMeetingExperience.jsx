import { useCallback, useState } from 'react';
import PersonalizedMeetingOverlay from './PersonalizedMeetingOverlay';

export default function PersonalizedMeetingExperience({ invitation }) {
  const [open, setOpen] = useState(true);
  const [booked, setBooked] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const complete = useCallback(() => { setBooked(true); setOpen(false); }, []);

  return <>
    {open && <PersonalizedMeetingOverlay invitation={invitation} onClose={close} onBooked={complete} />}
    {!open && !booked && <button type="button" className="meeting-reopen" onClick={() => setOpen(true)}><span aria-hidden="true">◷</span> Schedule our call</button>}
  </>;
}
