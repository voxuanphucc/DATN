import { create } from 'zustand';

// ─── State & Actions ────────────────────────────────────────────────────────

interface UiState {
  /** Loading overlay toàn trang (dùng khi chuyển route, fetch data lớn) */
  isPageLoading: boolean;
  /** Trạng thái đóng/mở sidebar */
  sidebarOpen: boolean;
}

interface UiActions {
  /** Bật/tắt loading overlay toàn trang */
  setPageLoading: (loading: boolean) => void;
  /** Toggle sidebar mở/đóng */
  toggleSidebar: () => void;
  /** Set sidebar open/close trực tiếp */
  setSidebarOpen: (open: boolean) => void;
}

export type UiStore = UiState & UiActions;

// ─── Store ───────────────────────────────────────────────────────────────────

export const useUiStore = create<UiStore>()((set) => ({
  // ── Initial state ──────────────────────────────────────────────────────────
  isPageLoading: false,
  sidebarOpen: false,

  // ── Actions ────────────────────────────────────────────────────────────────
  setPageLoading: (loading) => set({ isPageLoading: loading }),

  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));

// ─── Selectors ───────────────────────────────────────────────────────────────

/** Kiểm tra đang loading toàn trang không */
export const selectIsPageLoading = (state: UiStore) => state.isPageLoading;

/** Lấy trạng thái sidebar */
export const selectSidebarOpen = (state: UiStore) => state.sidebarOpen;
