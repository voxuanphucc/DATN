import { addDays, subDays, subMonths } from 'date-fns'

export type Role = 'farmer' | 'manager'

export interface User {
  id: string
  name: string
  role: Role
}

export interface Plot {
  id: string
  name: string
  area: number
  location: string
}

export interface SoilRecord {
  id: string
  plotId: string
  sampleDate: string
  pH: number
  nitrogen: number
  phosphorus: number
  potassium: number
  moisture: number
  notes?: string
  createdBy: string
  createdAt: string
  isDeleted: boolean
}

export interface AICropSuggestion {
  id: string
  name: string
  compatibility: number
  explanation: string
  details: string
}

export const currentUser: User = {
  id: 'u1',
  name: 'Nguyễn Văn An',
  role: 'farmer',
}

export const plots: Plot[] = [
  { id: 'p1', name: 'Lô A1 - Lúa nước', area: 5000, location: 'Khu Bắc' },
  { id: 'p2', name: 'Lô B2 - Rau màu', area: 2000, location: 'Khu Nam' },
  { id: 'p3', name: 'Lô C3 - Cây ăn quả', area: 10000, location: 'Khu Đông' },
  { id: 'p4', name: 'Lô D4 - Hoa màu', area: 3000, location: 'Khu Tây' },
  {
    id: 'p5',
    name: 'Lô E5 - Cây công nghiệp',
    area: 15000,
    location: 'Khu Trung tâm',
  },
]

const now = new Date()

export const initialSoilRecords: SoilRecord[] = [
  {
    id: 'r1',
    plotId: 'p1',
    sampleDate: now.toISOString().split('T')[0],
    pH: 6.5,
    nitrogen: 150,
    phosphorus: 45,
    potassium: 200,
    moisture: 60,
    notes: 'Đất tơi xốp, độ ẩm tốt',
    createdBy: 'Nguyễn Văn An',
    createdAt: now.toISOString(),
    isDeleted: false,
  },
  {
    id: 'r2',
    plotId: 'p2',
    sampleDate: now.toISOString().split('T')[0],
    pH: 5.0,
    nitrogen: 180,
    phosphorus: 60,
    potassium: 250,
    moisture: 45,
    notes: 'Cần bón thêm vôi',
    createdBy: 'Nguyễn Văn An',
    createdAt: subDays(now, 0.5).toISOString(),
    isDeleted: false,
  },
  {
    id: 'r3',
    plotId: 'p1',
    sampleDate: subMonths(now, 1).toISOString().split('T')[0],
    pH: 6.2,
    nitrogen: 120,
    phosphorus: 40,
    potassium: 180,
    moisture: 55,
    createdBy: 'Nguyễn Văn An',
    createdAt: subMonths(now, 1).toISOString(),
    isDeleted: false,
  },
  {
    id: 'r4',
    plotId: 'p1',
    sampleDate: subMonths(now, 2).toISOString().split('T')[0],
    pH: 6.0,
    nitrogen: 100,
    phosphorus: 35,
    potassium: 160,
    moisture: 50,
    createdBy: 'Nguyễn Văn An',
    createdAt: subMonths(now, 2).toISOString(),
    isDeleted: false,
  },
  {
    id: 'r5',
    plotId: 'p3',
    sampleDate: subMonths(now, 1).toISOString().split('T')[0],
    pH: 7.8,
    nitrogen: 80,
    phosphorus: 20,
    potassium: 120,
    moisture: 40,
    notes: 'Đất hơi kiềm',
    createdBy: 'Nguyễn Văn An',
    createdAt: subMonths(now, 1).toISOString(),
    isDeleted: false,
  },
  {
    id: 'r6',
    plotId: 'p4',
    sampleDate: subMonths(now, 3).toISOString().split('T')[0],
    pH: 6.8,
    nitrogen: 250,
    phosphorus: 80,
    potassium: 300,
    moisture: 65,
    createdBy: 'Nguyễn Văn An',
    createdAt: subMonths(now, 3).toISOString(),
    isDeleted: false,
  },
]

export const aiSuggestions: AICropSuggestion[] = [
  {
    id: 's1',
    name: 'Lúa nước',
    compatibility: 92,
    explanation:
      'Độ pH và độ ẩm rất phù hợp. Lượng đạm dồi dào giúp lúa phát triển tốt.',
    details:
      'Lúa nước yêu cầu đất có độ pH từ 5.5 - 6.5, độ ẩm cao. Đất hiện tại đáp ứng rất tốt các điều kiện này. Cần chú ý duy trì mực nước ổn định trong giai đoạn đẻ nhánh.',
  },
  {
    id: 's2',
    name: 'Ngô',
    compatibility: 85,
    explanation: 'Hàm lượng Lân và Kali phù hợp cho sự phát triển của bắp.',
    details:
      'Ngô thích hợp với đất tơi xốp, thoát nước tốt. Độ pH hiện tại hơi thấp so với mức tối ưu (6.0 - 7.0) nhưng vẫn nằm trong ngưỡng chịu đựng. Có thể bón lót thêm phân hữu cơ.',
  },
  {
    id: 's3',
    name: 'Đậu tương',
    compatibility: 78,
    explanation: 'Đất có độ tơi xốp tốt, tuy nhiên cần bổ sung thêm Lân.',
    details:
      'Đậu tương cần nhiều Lân và Kali để phát triển nốt sần và tạo hạt. Đất hiện tại hơi thiếu Lân. Cần bón lót phân lân trước khi gieo hạt.',
  },
  {
    id: 's4',
    name: 'Khoai lang',
    compatibility: 72,
    explanation:
      'Độ ẩm phù hợp, nhưng lượng Đạm hơi cao có thể làm giảm chất lượng củ.',
    details:
      'Khoai lang cần đất tơi xốp, giàu Kali. Lượng đạm cao sẽ khiến cây phát triển thân lá nhiều mà ít tạo củ. Cần hạn chế bón phân đạm.',
  },
  {
    id: 's5',
    name: 'Rau muống',
    compatibility: 68,
    explanation: 'Độ ẩm tốt nhưng cần cải thiện độ pH để rau xanh tốt hơn.',
    details:
      'Rau muống ưa ẩm, phát triển tốt ở pH 5.3 - 6.0. Đất hiện tại có thể trồng được nhưng cần bón thêm phân hữu cơ để giữ ẩm và cung cấp dinh dưỡng từ từ.',
  },
]

export const thresholds = {
  pH: { min: 5.5, max: 7.5 },
  nitrogen: { min: 20, max: 200 },
  phosphorus: { min: 10, max: 100 },
  potassium: { min: 100, max: 400 },
  moisture: { min: 30, max: 70 },
}

export const checkThresholds = (record: Partial<SoilRecord>) => {
  const warnings: string[] = []
  if (
    record.pH !== undefined &&
    (record.pH < thresholds.pH.min || record.pH > thresholds.pH.max)
  ) {
    warnings.push(
      `pH (${record.pH}) ngoài ngưỡng bình thường (${thresholds.pH.min}-${thresholds.pH.max})`
    )
  }
  if (
    record.nitrogen !== undefined &&
    (record.nitrogen < thresholds.nitrogen.min ||
      record.nitrogen > thresholds.nitrogen.max)
  ) {
    warnings.push(
      `Đạm (${record.nitrogen}) ngoài ngưỡng bình thường (${thresholds.nitrogen.min}-${thresholds.nitrogen.max})`
    )
  }
  if (
    record.phosphorus !== undefined &&
    (record.phosphorus < thresholds.phosphorus.min ||
      record.phosphorus > thresholds.phosphorus.max)
  ) {
    warnings.push(
      `Lân (${record.phosphorus}) ngoài ngưỡng bình thường (${thresholds.phosphorus.min}-${thresholds.phosphorus.max})`
    )
  }
  if (
    record.potassium !== undefined &&
    (record.potassium < thresholds.potassium.min ||
      record.potassium > thresholds.potassium.max)
  ) {
    warnings.push(
      `Kali (${record.potassium}) ngoài ngưỡng bình thường (${thresholds.potassium.min}-${thresholds.potassium.max})`
    )
  }
  if (
    record.moisture !== undefined &&
    (record.moisture < thresholds.moisture.min ||
      record.moisture > thresholds.moisture.max)
  ) {
    warnings.push(
      `Độ ẩm (${record.moisture}) ngoài ngưỡng bình thường (${thresholds.moisture.min}-${thresholds.moisture.max})`
    )
  }
  return warnings
}
