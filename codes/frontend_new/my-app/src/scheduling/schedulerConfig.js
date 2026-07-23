import policy from '../../config/invitation-policy.json';

const eventDefinitions = {
  'short-conversation': { envName: 'VITE_CAL_EVENT_SHORT_CONVERSATION', defaultCalLink: 'shivamg3/conversation-scheduling' },
  'extended-conversation': { envName: 'VITE_CAL_EVENT_EXTENDED_CONVERSATION', defaultCalLink: 'shivamg3/conversation-scheduling' },
};

const SAFE_CAL_LINK = /^[A-Za-z0-9][A-Za-z0-9._-]*(?:\/[A-Za-z0-9][A-Za-z0-9._-]*)*$/;

export function getSchedulerConfig(eventKey, env = import.meta.env) {
  const definition = eventDefinitions[eventKey];
  if (!policy.events[eventKey] || !definition) throw new Error('unknown-event');
  const calLink = env[definition.envName]?.trim() || definition.defaultCalLink;
  const origin = (env.VITE_CAL_ORIGIN || 'https://cal.com').replace(/\/$/, '');
  if (!calLink || !SAFE_CAL_LINK.test(calLink) || !['https://cal.com', 'https://app.cal.com'].includes(origin)) {
    throw new Error('scheduler-not-configured');
  }
  return {
    calLink,
    origin,
    embedJsUrl: 'https://app.cal.com/embed/embed.js',
    namespace: 'personal-invitation',
  };
}

export function getGeneralSchedulerUrl(env = import.meta.env) {
  const calLink = env.VITE_CAL_GENERAL_LINK?.trim() || 'shivamg3/conversation-scheduling';
  const origin = (env.VITE_CAL_ORIGIN || 'https://cal.com').replace(/\/$/, '');
  if (!calLink || !SAFE_CAL_LINK.test(calLink) || !['https://cal.com', 'https://app.cal.com'].includes(origin)) return null;
  return `${origin}/${calLink}`;
}

export function buildFallbackSchedulerUrl(invitation, env = import.meta.env) {
  const config = getSchedulerConfig(invitation.eventKey, env);
  const url = new URL(config.calLink, `${config.origin}/`);
  url.searchParams.set('name', invitation.name);
  if (invitation.email) url.searchParams.set('email', invitation.email);
  url.searchParams.set('duration', String(invitation.duration));
  return url.toString();
}
