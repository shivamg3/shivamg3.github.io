import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import PersonalizedMeetingExperience from './PersonalizedMeetingExperience';

vi.mock('../../scheduling/SchedulerEmbed', () => ({
  default: ({ onBookingSuccessful }) => <button data-testid="mock-booking" onClick={() => onBookingSuccessful({ startTime: '2027-01-15T18:00:00Z' })}>Mock booking</button>,
}));

const invitation = {
  firstName: 'Alex', name: 'Alex Rivera', company: 'Acme', title: 'Alex × Shivam', description: 'A conversation about the partnership.', duration: 20, eventKey: 'short-conversation',
};

afterEach(() => vi.useRealTimers());

describe('PersonalizedMeetingExperience', () => {
  it('opens a personalized accessible dialog', async () => {
    render(<PersonalizedMeetingExperience invitation={invitation} />);
    expect(await screen.findByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText(/Alex, I created this invitation/)).toBeInTheDocument();
  });

  it('closes, restores the homepage, and reopens from the session chip', async () => {
    render(<PersonalizedMeetingExperience invitation={invitation} />);
    fireEvent.click(screen.getByRole('button', { name: 'Close scheduling invitation' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Schedule our call/ }));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('shows booking success and dismisses without a reopen chip', async () => {
    render(<PersonalizedMeetingExperience invitation={invitation} />);
    fireEvent.click(await screen.findByTestId('mock-booking'));
    expect(screen.getByText('You’re booked.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Continue to website' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Schedule our call/ })).not.toBeInTheDocument();
  });

  it('automatically dismisses the success state after two seconds', async () => {
    render(<PersonalizedMeetingExperience invitation={invitation} />);
    const bookingButton = await screen.findByTestId('mock-booking');
    vi.useFakeTimers();
    fireEvent.click(bookingButton);
    act(() => vi.advanceTimersByTime(2100));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders script-like invitation text without executing HTML', async () => {
    render(<PersonalizedMeetingExperience invitation={{ ...invitation, firstName: '<img src=x onerror=alert(1)>' }} />);
    expect(await screen.findByText(/<img src=x onerror=alert\(1\)>/)).toBeInTheDocument();
    expect(document.querySelector('img[src="x"]')).toBeNull();
  });
});
