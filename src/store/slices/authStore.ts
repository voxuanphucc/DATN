import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '../../types/auth';

// ─── State & Actions ────────────────────────────────────────────────────────

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  /** Đăng nhập: lưu user + token, tự động persist vào localStorage */
  login: (user: User, token: string) => void;
  /** Đăng xuất: xóa toàn bộ auth state */
  logout: () => void;
  /** Cập nhật thông tin user (dùng khi refresh profile) */
  setUser: (user: User | null) => void;
  /** Cập nhật token (dùng khi refresh token) */
  setToken: (token: string | null) => void;
  /** Bật / tắt loading (dùng khi đang gọi auth API) */
  setLoading: (loading: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;

// ─── Initial state ───────────────────────────────────────────────────────────

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

// ─── Store ───────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      setUser: (user) =>
        set((state) => ({
          user,
          isAuthenticated: state.isAuthenticated && user !== null,
        })),

      setToken: (token) =>
        set({
          token,
          isAuthenticated: token !== null,
        }),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'datn-auth-storage', // key trong localStorage
      storage: createJSONStorage(() => localStorage),
      // Chỉ persist những field cần thiết, không persist isLoading
      partialize: (state) => ({
        user: state.user,
        token: state.token,
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

/** Lấy token hiện tại */
export const selectToken = (state: AuthStore) => state.token;

/** Kiểm tra trạng thái loading của auth */
export const selectAuthLoading = (state: AuthStore) => state.isLoading;
