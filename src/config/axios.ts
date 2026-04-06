import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from '@/store/slices';
import { refreshTokenService } from '@/services/auth/refresh';



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ─── Response Interceptor ───────────────────────────────────────────────────
/**
 * Xử lý các lỗi response:
 * - 401: Token expired → refresh token → retry request
 * - 403: Forbidden → redirect to forbidden page
 * - 500: Server error
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized - Token expired hoặc invalid
    // LOẠI TRỪ: /login và /register không cần refresh token
    const isAuthEndpoint = originalRequest.url?.includes('/auth/login') || 
                           originalRequest.url?.includes('/auth/register') ||
                           originalRequest.url?.includes('/auth/verify');
    
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        const { refreshToken, setAccessToken, setRefreshToken, logout } = useAuthStore.getState();

        // Nếu không có refresh token → logout
        if (!refreshToken) {
          logout();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Nếu đã retry quá nhiều lần → logout
        const retryCount = originalRequest._retryCount || 0;
        if (retryCount >= 1) {
          logout();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Gọi API refresh token
        const response = await refreshTokenService.refresh({ refreshToken });

        if (response.data?.accessToken && response.data?.refreshToken) {
          // Cập nhật tokens trong store
          setAccessToken(response.data.accessToken);
          setRefreshToken(response.data.refreshToken);

          // Retry original request với token mới
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          originalRequest._retryCount = retryCount + 1;

          return axiosInstance(originalRequest);
        } else {
          // Response không có tokens → logout
          logout();
          window.location.href = '/login';
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // Refresh token failed → logout
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // 403 Forbidden - Access denied (chỉ redirect nếu user đã authenticate)
    if (error.response?.status === 403) {
      const { isAuthenticated } = useAuthStore.getState();
      if (isAuthenticated) {
        window.location.href = '/forbidden';
      }
      return Promise.reject(error);
    }

    // Để các error khác được handle bởi component
    return Promise.reject(error);
  }
);

export default axiosInstance;
