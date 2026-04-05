import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserProfileDto } from '../../types/get-profile';

// ─── State & Actions ────────────────────────────────────────────────────────

interface AuthState {
  user: UserProfileDto | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  /** Đăng nhập: lưu user + tokens, tự động persist vào localStorage */
  login: (user: UserProfileDto, accessToken: string, refreshToken: string) => void;
  /** Đăng xuất: xóa toàn bộ auth state */
  logout: () => void;
  /** Cập nhật cả hai tokens (access + refresh) */
  setTokens: (accessToken: string, refreshToken: string) => void;
  /** Cập nhật thông tin user (dùng khi refresh profile) */
  setUser: (user: UserProfileDto | null) => void;
  /** Cập nhật access token (dùng khi refresh token) */
  setAccessToken: (token: string | null) => void;
  /** Cập nhật refresh token */
  setRefreshToken: (token: string | null) => void;
  /** Bật / tắt loading (dùng khi đang gọi auth API) */
  setLoading: (loading: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;

// ─── Initial state ───────────────────────────────────────────────────────────

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
};

// ─── Store ───────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      login: (user: UserProfileDto, accessToken: string, refreshToken: string) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        }),

      setTokens: (accessToken: string, refreshToken: string) =>
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      setUser: (user) =>
        set((state) => ({
          user,
          isAuthenticated: state.isAuthenticated && user !== null,
        })),

      setAccessToken: (accessToken) =>
        set({
          accessToken,
          isAuthenticated: accessToken !== null,
        }),

      setRefreshToken: (refreshToken) =>
        set({
          refreshToken,
        }),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'datn-auth-storage', // key trong localStorage
      storage: createJSONStorage(() => localStorage),
      // Chỉ persist những field cần thiết, không persist isLoading
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

// ─── Selectors (giảm re-render không cần thiết) ──────────────────────────────

/** Lấy user hiện tại */
export const selectUser = (state: AuthStore) => state.user;

/** Kiểm tra đã đăng nhập chưa */
export const selectIsAuthenticated = (state: AuthStore) => state.isAuthenticated;

/** Lấy access token hiện tại */
export const selectAccessToken = (state: AuthStore) => state.accessToken;

/** Lấy refresh token hiện tại */
export const selectRefreshToken = (state: AuthStore) => state.refreshToken;

/** Kiểm tra trạng thái loading của auth */
export const selectAuthLoading = (state: AuthStore) => state.isLoading;
