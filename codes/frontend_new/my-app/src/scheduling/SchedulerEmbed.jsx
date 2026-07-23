import { useEffect, useMemo, useState } from 'react';
import { createCalSchedulerAdapter } from './calSchedulerAdapter';
import { buildFallbackSchedulerUrl, getSchedulerConfig } from './schedulerConfig';

export default function SchedulerEmbed({ invitation, onBookingSuccessful }) {
  const adapter = useMemo(() => createCalSchedulerAdapter(), []);
  const [CalComponent, setCalComponent] = useState(null);
  const [status, setStatus] = useState('loading');
  const [fallbackUrl, setFallbackUrl] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let timeout;
    const cleanups = [
      adapter.onSchedulerReady(() => {
        window.clearTimeout(timeout);
        if (!cancelled) setStatus('ready');
      }),
      adapter.onSchedulerError(() => !cancelled && setStatus('error')),
      adapter.onBookingSuccessful((booking) => !cancelled && onBookingSuccessful(booking)),
    ];
    const failOffline = () => setStatus('error');
    window.addEventListener('offline', failOffline);

    try {
      const nextConfig = getSchedulerConfig(invitation.eventKey);
      setConfig(nextConfig);
      setFallbackUrl(buildFallbackSchedulerUrl(invitation));
      if (!navigator.onLine) setStatus('error');
      else {
        timeout = window.setTimeout(() => setStatus((current) => current === 'loading' ? 'error' : current), 15000);
        adapter.initializeScheduler(nextConfig).then(({ CalComponent: Component }) => {
          if (!cancelled) {
            adapter.openScheduler(invitation);
            setCalComponent(() => Component);
          }
        }).catch(() => !cancelled && setStatus('error'));
      }
    } catch {
      setStatus('error');
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      window.removeEventListener('offline', failOffline);
      cleanups.forEach((cleanup) => cleanup());
      adapter.destroyScheduler();
    };
  }, [adapter, invitation, onBookingSuccessful]);

  return <div className="scheduler-shell" aria-live="polite">
    {status === 'loading' && <div className="scheduler-loading" role="status"><span /><span /><span /><p>Loading Shivam’s availability…</p></div>}
    {status === 'error' && <div className="scheduler-error" role="alert"><div aria-hidden="true">○</div><h3>The calendar couldn’t load.</h3><p>Check your connection or open the secure scheduling page in a new tab.</p>{fallbackUrl && <a href={fallbackUrl} target="_blank" rel="noreferrer">Open scheduling page ↗</a>}</div>}
    {CalComponent && config && <CalComponent
      className={`cal-inline-frame${status === 'ready' ? ' is-ready' : ''}`}
      calLink={config.calLink}
      calOrigin={config.origin}
      embedJsUrl={config.embedJsUrl}
      namespace={config.namespace}
      config={{ name: invitation.name, ...(invitation.email ? { email: invitation.email } : {}), duration: String(invitation.duration), layout: 'month_view' }}
      style={{ width: '100%', height: '100%', overflow: 'auto' }}
    />}
  </div>;
}
