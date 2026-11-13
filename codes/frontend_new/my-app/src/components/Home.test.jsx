import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Home from './Home';
import { createKineticScene } from './kinetic-scene';

vi.mock('./kinetic-scene', () => ({ createKineticScene: vi.fn() }));
afterEach(() => { vi.resetAllMocks(); vi.unstubAllGlobals(); });

function controller() {
  return { setExploded: vi.fn(), setPaused: vi.fn(), rotate: vi.fn(), dispose: vi.fn() };
}

describe('Kinetic homepage', () => {
  it('supports keyboard exploration and releases the renderer when leaving', async () => {
    const scene = controller();
    createKineticScene.mockReturnValue(scene);
    const { unmount } = render(<MemoryRouter><Home /></MemoryRouter>);
    const explode = await screen.findByRole('button', { name: 'Pull it apart' });
    await waitFor(() => expect(explode).toBeEnabled());
    const sculpture = screen.getByRole('img', { name: /interactive orange/i });
    fireEvent.keyDown(sculpture, { key: 'ArrowRight' });
    expect(scene.rotate).toHaveBeenCalledWith(0.2, 0);
    fireEvent.keyDown(sculpture, { key: 'Enter' });
    expect(screen.getByRole('button', { name: 'Bring it together' })).toHaveAttribute('aria-pressed', 'true');
    expect(scene.setExploded).toHaveBeenLastCalledWith(true);
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
    expect(await screen.findByRole('status')).toHaveTextContent('Explore the work');
    expect(screen.getByRole('button', { name: 'Pull it apart' })).toBeDisabled();
    expect(screen.getByRole('link', { name: 'Explore my work' })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('img')).toHaveAccessibleName(/interaction is unavailable/i);
  });
});
