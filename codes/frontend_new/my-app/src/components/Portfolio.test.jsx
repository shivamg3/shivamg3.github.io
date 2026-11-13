import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from '../App';

afterEach(() => vi.unstubAllGlobals());

describe('Portfolio navigation', () => {
  it('filters the work index and restores all projects', () => {
    render(<MemoryRouter initialEntries={['/projects']}><App /></MemoryRouter>);
    expect(screen.getAllByRole('heading', { level:2 })).toHaveLength(6);
    fireEvent.click(screen.getByRole('button', { name:'Research', exact:true }));
    expect(screen.getAllByRole('heading', { level:2 })).toHaveLength(1);
    expect(screen.getByRole('heading', { name:'Cloud-Direct NC' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name:'All', exact:true }));
    expect(screen.getAllByRole('heading', { level:2 })).toHaveLength(6);
  });

  it('opens a project detail and follows the next project', () => {
    render(<MemoryRouter initialEntries={['/projects/microfluidic-mixer/']}><App /></MemoryRouter>);
    expect(screen.getByRole('heading', { name:'Microfluidic Mixer', level:1 })).toBeInTheDocument();
    expect(screen.getByText('Clean-room fabrication')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name:/Next FSAE CFRP Bodywork/ }));
    expect(screen.getByRole('heading', { name:'FSAE CFRP Bodywork', level:1 })).toBeInTheDocument();
  });

  it('opens the original article from the writing index', () => {
    render(<MemoryRouter initialEntries={['/writing']}><App /></MemoryRouter>);
    fireEvent.click(screen.getByRole('link', { name:/20 August 2026 Where Does India/ }));
    expect(screen.getByRole('heading', { name:/Where Does India’s Electronics Manufacturing Chain Actually Get Stuck/, level:1 })).toBeInTheDocument();
    expect(screen.getByText('By Shivam Garg')).toBeInTheDocument();
    expect(screen.getByRole('link', { name:'← Writing' })).toHaveAttribute('href','/writing');
  });

  it('reports a clipboard failure accurately', async () => {
    vi.stubGlobal('navigator', { clipboard: { writeText:vi.fn().mockRejectedValue(new Error('denied')) } });
    render(<MemoryRouter initialEntries={['/contact']}><App /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name:'Copy email address' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Copy unavailable');
    expect(screen.getByRole('link', { name:'shivam939a8@gmail.com' })).toHaveAttribute('href','mailto:shivam939a8@gmail.com');
  });
});
