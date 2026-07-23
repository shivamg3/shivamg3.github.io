export function consumeInvitationToken(location = window.location, history = window.history) {
  const hash = location.hash || '';
  const prefix = hash.startsWith('#m=') ? '#m=' : hash.startsWith('#meet=') ? '#meet=' : null;
  if (!prefix) return null;
  const token = hash.slice(prefix.length);
  history.replaceState(history.state, '', `${location.pathname}${location.search}`);
  return token;
}
