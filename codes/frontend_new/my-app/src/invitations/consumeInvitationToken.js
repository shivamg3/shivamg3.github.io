export function consumeInvitationToken(location = window.location, history = window.history) {
  const hash = location.hash || '';
  if (!hash.startsWith('#meet=')) return null;
  const token = hash.slice('#meet='.length);
  history.replaceState(history.state, '', `${location.pathname}${location.search}`);
  return token;
}
