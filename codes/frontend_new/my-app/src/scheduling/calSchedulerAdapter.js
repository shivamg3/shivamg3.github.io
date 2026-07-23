export function createCalSchedulerAdapter() {
  let active = false;
  let api = null;
  const listeners = { ready: new Set(), success: new Set(), error: new Set() };

  function emit(type, value) {
    if (!active) return;
    listeners[type].forEach((listener) => listener(value));
  }

  function subscribe(type, callback) {
    listeners[type].add(callback);
    return () => listeners[type].delete(callback);
  }

  return {
    async initializeScheduler({ namespace, embedJsUrl }) {
      const module = await import('@calcom/embed-react');
      api = await module.getCalApi({ namespace, embedJsUrl });
      active = true;
      api('on', { action: 'linkReady', callback: () => emit('ready') });
      api('on', { action: 'linkFailed', callback: () => emit('error', new Error('scheduler-unavailable')) });
      api('on', { action: 'bookingSuccessfulV2', callback: (event) => emit('success', event?.detail?.data || {}) });
      return { CalComponent: module.default };
    },
    openScheduler() {
      if (!active || !api) throw new Error('scheduler-not-initialized');
    },
    onSchedulerReady(callback) { return subscribe('ready', callback); },
    onBookingSuccessful(callback) { return subscribe('success', callback); },
    onSchedulerError(callback) { return subscribe('error', callback); },
    destroyScheduler() {
      active = false;
      api = null;
      Object.values(listeners).forEach((set) => set.clear());
    },
  };
}
