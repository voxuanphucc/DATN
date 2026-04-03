/**
 * Token Management Utilities
 * Xử lý lưu trữ, lấy, xóa tokens từ localStorage
 */

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'currentUser';

export const tokenUtils = {
  /**
   * Lưu access token
   */
  setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  /**
   * Lấy access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  /**
   * Lưu refresh token
   */
  setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  /**
   * Lấy refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Lưu cả access và refresh tokens
   */
  setTokens(accessToken: string, refreshToken: string): void {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  },

  /**
   * Xóa cả 2 tokens (logout)
   */
  clearTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Check xem user đã login chưa
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },

  /**
   * Lưu user info
   */
  setUser(user: unknown): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  /**
   * Lấy user info
   */
  getUser(): unknown | null {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  /**
   * Xóa user info
   */
  clearUser(): void {
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Full logout: xóa tokens + user
   */
  logout(): void {
    this.clearTokens();
    this.clearUser();
  },
};
