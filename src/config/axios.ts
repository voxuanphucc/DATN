import axios, { AxiosInstance, AxiosError } from 'axios';
import { useAuthStore } from '../store/slices/authStore';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Tạo axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Thêm token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ Zustand store (không từ localStorage)
    const state = useAuthStore.getState();
    const token = state.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Xử lý refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và không phải refresh token request
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.url?.includes('/refresh-token')
    ) {
      try {
        // Lấy refresh token từ Zustand store
        const state = useAuthStore.getState();
        const refreshToken = state.refreshToken;
        
        if (!refreshToken) {
          // Không có refresh token, logout
          useAuthStore.getState().logout();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Gọi refresh token API
        const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const newToken = response.data.data.token;
        // Cập nhật token vào Zustand store (localStorage sẽ tự sync)
        useAuthStore.getState().setAccessToken(newToken);

        // Retry request ban đầu
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token thất bại, logout
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
