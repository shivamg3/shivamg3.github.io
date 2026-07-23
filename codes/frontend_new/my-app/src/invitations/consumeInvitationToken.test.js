import { describe, expect, it, vi } from 'vitest';
import { consumeInvitationToken } from './consumeInvitationToken';

describe('consumeInvitationToken', () => {
  it('removes a meeting token from the address immediately', () => {
    const replaceState = vi.fn();
    const token = consumeInvitationToken({ hash: '#meet=abc.def.ghi', pathname: '/', search: '?ref=email' }, { state: null, replaceState });
    expect(token).toBe('abc.def.ghi');
    expect(replaceState).toHaveBeenCalledWith(null, '', '/?ref=email');
  });

  it('ignores unrelated hashes', () => {
    const replaceState = vi.fn();
    expect(consumeInvitationToken({ hash: '#projects' }, { replaceState })).toBeNull();
    expect(replaceState).not.toHaveBeenCalled();
  });

  it('removes malformed meeting fragments before validation', () => {
    const replaceState = vi.fn();
    expect(consumeInvitationToken({ hash: '#meet=broken%token', pathname: '/about', search: '' }, { state: {}, replaceState })).toBe('broken%token');
    expect(replaceState).toHaveBeenCalledWith({}, '', '/about');
  });
});
