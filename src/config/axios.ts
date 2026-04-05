import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from '@/store';

/**
 * Axios Instance Configuration
 * 
 * Base URL: API_BASE_URL từ environment hoặc default http://localhost:3001/api
 * 
 * Interceptors:
 * - Request: Tự động thêm Authorization header với token từ auth store
 * - Response: Xử lý error responses, refresh token nếu cần
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor ────────────────────────────────────────────────────

/**
 * Tự động thêm access token vào request headers
 * nếu user đã đăng nhập
 */
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
  },
);

// ─── Response Interceptor ───────────────────────────────────────────────────

/**
 * Xử lý các lỗi response:
 * - 401: Token expired → refresh hoặc logout
 * - 403: Forbidden → redirect to forbidden page
 * - 500: Server error → show error message
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = useAuthStore.getState();

        if (!refreshToken) {
          // Không có refresh token → logout
          useAuthStore.getState().logout();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Gọi refresh token API
        const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

        // Cập nhật tokens
        useAuthStore.getState().setAccessToken(newAccessToken);
        useAuthStore.getState().setRefreshToken(newRefreshToken);

        // Retry original request với token mới
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token failed → logout
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // 403 Forbidden - Access denied
    if (error.response?.status === 403) {
      window.location.href = '/forbidden';
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
