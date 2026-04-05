/**
 * ════════════════════════════════════════════════════════════════════════════
 * Auth Service - Base Configuration
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Định nghĩa các kiểu Response chung cho tất cả auth endpoints
 */

import axiosInstance from '@/config/axios';

/**
 * Base API Response cho tất cả endpoints
 */
export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
  timestamp: string;
}

/**
 * Export axiosInstance để sử dụng trong các service files
 */
export { axiosInstance };
