import { describe, expect, it } from 'vitest';
import { getGeneralSchedulerUrl, getSchedulerConfig } from './schedulerConfig';

describe('schedulerConfig', () => {
  it('uses the configured public Cal.com event links by default', () => {
    expect(getSchedulerConfig('short-conversation', {})).toMatchObject({ calLink: 'shivamg3/20min', origin: 'https://cal.com' });
    expect(getSchedulerConfig('extended-conversation', {})).toMatchObject({ calLink: 'shivamg3/30min', origin: 'https://cal.com' });
    expect(getGeneralSchedulerUrl({})).toBe('https://cal.com/shivamg3/20min');
  });

  it('never accepts an arbitrary event key', () => {
    expect(() => getSchedulerConfig('https://attacker.example', {})).toThrow('unknown-event');
  });
});
