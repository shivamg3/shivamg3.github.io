import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SchedulerEmbed from './SchedulerEmbed';

const controls = vi.hoisted(() => ({ ready: null, error: null, success: null }));

vi.mock('./calSchedulerAdapter', () => ({
  createCalSchedulerAdapter: () => ({
    initializeScheduler: async () => ({ CalComponent: (props) => <div data-testid="cal-component" className={props.className} /> }),
    openScheduler: vi.fn(),
    onSchedulerReady: (callback) => { controls.ready = callback; return () => {}; },
    onSchedulerError: (callback) => { controls.error = callback; return () => {}; },
    onBookingSuccessful: (callback) => { controls.success = callback; return () => {}; },
    destroyScheduler: vi.fn(),
  }),
}));

const invitation = { name: 'Alex Rivera', email: 'alex@example.com', eventKey: 'short-conversation', duration: 20 };

beforeEach(() => {
  controls.ready = null;
  controls.error = null;
  controls.success = null;
  vi.stubEnv('VITE_CAL_EVENT_SHORT_CONVERSATION', 'shivam/20min');
});

describe('SchedulerEmbed', () => {
  it('moves from loading to ready when Cal.com emits linkReady', async () => {
    render(<SchedulerEmbed invitation={invitation} onBookingSuccessful={() => {}} />);
    expect(screen.getByText('Loading Shivam’s availability…')).toBeInTheDocument();
    const component = await screen.findByTestId('cal-component');
    act(() => controls.ready());
    expect(component).toHaveClass('is-ready');
  });

  it('shows a safe fallback when Cal.com emits linkFailed', async () => {
    render(<SchedulerEmbed invitation={invitation} onBookingSuccessful={() => {}} />);
    await screen.findByTestId('cal-component');
    act(() => controls.error());
    expect(screen.getByRole('alert')).toHaveTextContent('calendar couldn’t load');
    expect(screen.getByRole('link', { name: /Open scheduling page/ })).toHaveAttribute('href', expect.stringContaining('cal.com/shivam/20min'));
  });

  it('forwards only the documented successful-booking event data', async () => {
    const onBookingSuccessful = vi.fn();
    render(<SchedulerEmbed invitation={invitation} onBookingSuccessful={onBookingSuccessful} />);
    await screen.findByTestId('cal-component');
    act(() => controls.success({ startTime: '2027-01-15T18:00:00Z' }));
    expect(onBookingSuccessful).toHaveBeenCalledWith({ startTime: '2027-01-15T18:00:00Z' });
  });
});
