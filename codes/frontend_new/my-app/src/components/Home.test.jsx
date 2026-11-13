import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Home from './Home';
import { createKineticScene } from './kinetic-scene';

vi.mock('./kinetic-scene', () => ({ createKineticScene: vi.fn() }));
afterEach(() => { vi.resetAllMocks(); vi.unstubAllGlobals(); });

function controller() {
  return { setPaused: vi.fn(), rotate: vi.fn(), dispose: vi.fn() };
}

describe('Kinetic homepage', () => {
  it('supports keyboard exploration and releases the renderer when leaving', async () => {
    const scene = controller();
    createKineticScene.mockReturnValue(scene);
    const { unmount } = render(<MemoryRouter><Home /></MemoryRouter>);
    const pause = await screen.findByRole('button', { name: 'Pause sculpture animation' });
    await waitFor(() => expect(pause).toBeEnabled());
    const sculpture = screen.getByRole('img', { name: /interactive kinetic/i });
    fireEvent.keyDown(sculpture, { key: 'ArrowRight' });
    expect(scene.rotate).toHaveBeenCalledWith(0.2, 0);
    expect(screen.queryByRole('button', { name: /explode|assemble/i })).not.toBeInTheDocument();
    unmount();
    expect(scene.dispose).toHaveBeenCalledTimes(1);
  });

  it('starts paused for reduced motion and allows an explicit choice to play', async () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
    const scene = controller();
    createKineticScene.mockReturnValue(scene);
    render(<MemoryRouter><Home /></MemoryRouter>);
    const play = screen.getByRole('button', { name: 'Play sculpture animation' });
    await waitFor(() => expect(play).toBeEnabled());
    expect(scene.setPaused).toHaveBeenLastCalledWith(true);
    fireEvent.click(play);
    expect(scene.setPaused).toHaveBeenLastCalledWith(false);
    expect(screen.getByRole('button', { name: 'Pause sculpture animation' })).toBeEnabled();
  });

  it('keeps the work accessible when 3D cannot initialize', async () => {
    createKineticScene.mockImplementation(() => { throw new Error('WebGL unavailable'); });
    render(<MemoryRouter><Home /></MemoryRouter>);
    expect(await screen.findByRole('status')).toHaveTextContent('3D unavailable');
    expect(screen.getByRole('button', { name: 'Pause sculpture animation' })).toBeDisabled();
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('img')).toHaveAccessibleName(/interaction is unavailable/i);
  });
});
