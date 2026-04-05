/**
 * Soil Records Types & Utilities
 * Chuẩn hóa theo spec US08/PB08
 */

export interface SoilRecord {
  id: string
  plotId: string
  sampleDate: string        // Ngày lấy mẫu (bắt buộc)
  pH?: number               // 0–14
  nitrogen?: number         // N – Đạm, 0–500 mg/kg
  phosphorus?: number       // P – Lân, 0–500 mg/kg
  potassium?: number        // K – Kali, 0–1000 mg/kg
  moisture?: number         // Độ ẩm, 0–100%
  notes?: string            // Ghi chú (tùy chọn)
  createdBy: string         // Người tạo (tên/email)
  createdAt: string         // ISO string
  updatedAt?: string
  isDeleted: boolean        // Soft delete
}

export interface Plot {
  id: string
  name: string
  area: number
  status: 'active' | 'resting'
  description?: string
  isDeleted?: boolean
}

/**
 * User dùng trong soil-analysis context
 * role phải đồng nhất với UserProfileDto:
 *   'owner' = Nông dân/Chủ trang trại
 *   'manager' = Quản lý
 *   'employee' = Nhân viên
 */
export interface User {
  id: string
  fullName: string
  email: string
  role: 'owner' | 'manager' | 'employee'
}

// Ngưỡng cảnh báo theo spec PB08
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const THRESHOLDS = {
  pH: { min: 4.0, max: 8.5 },
  nitrogen: { min: 0, max: 500 },
  phosphorus: { min: 0, max: 500 },
  potassium: { min: 0, max: 1000 },
  moisture: { min: 0, max: 100 },
}

/**
 * Kiểm tra giá trị vượt ngưỡng bình thường
 * Spec PB08: "Hệ thống kiểm tra hợp lệ và cảnh báo nếu vượt ngưỡng bình thường"
 */
export function checkThresholds(record: Partial<SoilRecord>): string[] {
  const warnings: string[] = []

  if (record.pH !== undefined && record.pH !== null) {
    if (record.pH < 4.0 || record.pH > 8.5) {
      warnings.push(`pH (${record.pH}) nằm ngoài ngưỡng bình thường (4.0–8.5)`)
    }
  }
  if (record.nitrogen !== undefined && record.nitrogen !== null) {
    if (record.nitrogen < 0 || record.nitrogen > 500) {
      warnings.push(`Đạm N (${record.nitrogen} mg/kg) nằm ngoài ngưỡng cho phép (0–500)`)
    }
  }
  if (record.phosphorus !== undefined && record.phosphorus !== null) {
    if (record.phosphorus < 0 || record.phosphorus > 500) {
      warnings.push(`Lân P (${record.phosphorus} mg/kg) nằm ngoài ngưỡng cho phép (0–500)`)
    }
  }
  if (record.potassium !== undefined && record.potassium !== null) {
    if (record.potassium < 0 || record.potassium > 1000) {
      warnings.push(`Kali K (${record.potassium} mg/kg) nằm ngoài ngưỡng cho phép (0–1000)`)
    }
  }
  if (record.moisture !== undefined && record.moisture !== null) {
    if (record.moisture < 0 || record.moisture > 100) {
      warnings.push(`Độ ẩm (${record.moisture}%) nằm ngoài ngưỡng cho phép (0–100%)`)
    }
  }

  return warnings
}
