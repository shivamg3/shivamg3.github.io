import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App scheduling behavior', () => {
  it('shows the normal homepage and no scheduling UI without a token', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /open, intelligent future/ })).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText(/Loading Shivam’s availability/)).not.toBeInTheDocument();
  });

  it('presents the IIT Delhi archive as one chapter, not the complete story', () => {
    render(<MemoryRouter initialEntries={['/story']}><App /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /years that made engineering personal/i })).toBeInTheDocument();
    expect(screen.getByText(/not my complete story/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explore current work/i })).toHaveAttribute('href', '/projects');
  });

  it('renders the electronics manufacturing article and its three layers', () => {
    render(<MemoryRouter initialEntries={['/articles/india-electronics-manufacturing']}><App /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /where does india’s electronics manufacturing chain actually get stuck/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /three-layer electronics manufacturing chain/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /turning a design into silicon is harder/i })).toBeInTheDocument();
  });
});
