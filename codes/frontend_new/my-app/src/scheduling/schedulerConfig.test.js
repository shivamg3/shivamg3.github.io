import { describe, expect, it } from 'vitest';
import { getGeneralSchedulerUrl, getSchedulerConfig } from './schedulerConfig';

describe('schedulerConfig', () => {
  it('uses the configured public Cal.com event links by default', () => {
    expect(getSchedulerConfig('short-conversation', {})).toMatchObject({ calLink: 'shivamg3/conversation-scheduling', origin: 'https://cal.com' });
    expect(getSchedulerConfig('extended-conversation', {})).toMatchObject({ calLink: 'shivamg3/conversation-scheduling', origin: 'https://cal.com' });
    expect(getGeneralSchedulerUrl({})).toBe('https://cal.com/shivamg3/conversation-scheduling');
  });

  it('never accepts an arbitrary event key', () => {
    expect(() => getSchedulerConfig('https://attacker.example', {})).toThrow('unknown-event');
  });
});
