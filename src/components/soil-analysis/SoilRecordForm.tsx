import React, { useEffect, useState } from 'react'
import { Plot, SoilRecord, checkThresholds } from '@/data/soil-records'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

interface SoilRecordFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plots: Plot[]
  initialData?: SoilRecord | null
  onSave: (data: Partial<SoilRecord>) => void
}

export function SoilRecordForm({
  open,
  onOpenChange,
  plots,
  initialData,
  onSave,
}: SoilRecordFormProps) {
  const [formData, setFormData] = useState<Partial<SoilRecord>>({
    plotId: '',
    sampleDate: new Date().toISOString().split('T')[0],
    pH: undefined,
    nitrogen: undefined,
    phosphorus: undefined,
    potassium: undefined,
    moisture: undefined,
    notes: '',
  })
  const [warnings, setWarnings] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (initialData && initialData.id) {
      setFormData({
        ...initialData,
        sampleDate: initialData.sampleDate.split('T')[0],
      })
    } else {
      setFormData({
        plotId: '',
        sampleDate: new Date().toISOString().split('T')[0],
        pH: undefined,
        nitrogen: undefined,
        phosphorus: undefined,
        potassium: undefined,
        moisture: undefined,
        notes: '',
      })
    }
  }, [initialData, open])

  useEffect(() => {
    setWarnings(checkThresholds(formData))
  }, [formData])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.plotId) newErrors.plotId = 'Vui lòng chọn lô đất'
    if (!formData.sampleDate) newErrors.sampleDate = 'Vui lòng chọn ngày lấy mẫu'
    if (formData.pH === undefined || formData.pH < 0 || formData.pH > 14)
      newErrors.pH = 'pH phải từ 0-14'
    if (
      formData.nitrogen === undefined ||
      formData.nitrogen < 0 ||
      formData.nitrogen > 500
    )
      newErrors.nitrogen = 'Đạm phải từ 0-500'
    if (
      formData.phosphorus === undefined ||
      formData.phosphorus < 0 ||
      formData.phosphorus > 500
    )
      newErrors.phosphorus = 'Lân phải từ 0-500'
    if (
      formData.potassium === undefined ||
      formData.potassium < 0 ||
      formData.potassium > 1000
    )
      newErrors.potassium = 'Kali phải từ 0-1000'
    if (
      formData.moisture === undefined ||
      formData.moisture < 0 ||
      formData.moisture > 100
    )
      newErrors.moisture = 'Độ ẩm phải từ 0-100'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSave(formData)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData?.id
              ? 'Chỉnh sửa hồ sơ phân tích đất'
              : 'Tạo hồ sơ phân tích đất mới'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="plotId">
                Lô đất <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.plotId || ''}
                onValueChange={(val) =>
                  setFormData({
                    ...formData,
                    plotId: val,
                  })
                }
              >
                <SelectTrigger
                  className={errors.plotId ? 'border-red-500' : ''}
                >
                  <SelectValue placeholder="Chọn lô đất" />
                </SelectTrigger>
                <SelectContent>
                  {plots.map((plot) => (
                    <SelectItem key={plot.id} value={plot.id}>
                      {plot.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.plotId && (
                <p className="text-xs text-red-500">{errors.plotId}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sampleDate">
                Ngày lấy mẫu <span className="text-red-500">*</span>
              </Label>
              <Input
                id="sampleDate"
                type="date"
                value={formData.sampleDate || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sampleDate: e.target.value,
                  })
                }
                className={errors.sampleDate ? 'border-red-500' : ''}
              />
              {errors.sampleDate && (
                <p className="text-xs text-red-500">{errors.sampleDate}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pH">
                pH (0-14) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="pH"
                type="number"
                step="0.1"
                value={formData.pH ?? ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pH: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className={errors.pH ? 'border-red-500' : ''}
              />
              {errors.pH && <p className="text-xs text-red-500">{errors.pH}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="moisture">
                Độ ẩm (%) (0-100) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="moisture"
                type="number"
                value={formData.moisture ?? ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    moisture: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                className={errors.moisture ? 'border-red-500' : ''}
              />
              {errors.moisture && (
                <p className="text-xs text-red-500">{errors.moisture}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nitrogen">
                N - Đạm (mg/kg) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nitrogen"
                type="number"
                value={formData.nitrogen ?? ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nitrogen: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                className={errors.nitrogen ? 'border-red-500' : ''}
              />
              {errors.nitrogen && (
                <p className="text-xs text-red-500">{errors.nitrogen}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phosphorus">
                P - Lân (mg/kg) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phosphorus"
                type="number"
                value={formData.phosphorus ?? ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phosphorus: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                className={errors.phosphorus ? 'border-red-500' : ''}
              />
              {errors.phosphorus && (
                <p className="text-xs text-red-500">{errors.phosphorus}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="potassium">
                K - Kali (mg/kg) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="potassium"
                type="number"
                value={formData.potassium ?? ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    potassium: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                className={errors.potassium ? 'border-red-500' : ''}
              />
              {errors.potassium && (
                <p className="text-xs text-red-500">{errors.potassium}</p>
              )}
            </div>
          </div>

          {warnings.length > 0 && (
            <Alert
              variant="destructive"
              className="bg-amber-50 text-amber-800 border-amber-200"
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc pl-4 text-sm mt-1">
                  {warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Ghi chú (Tùy chọn)</Label>
            <Textarea
              id="notes"
              value={formData.notes ?? ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notes: e.target.value,
                })
              }
              placeholder="Nhập ghi chú hoặc đặc điểm phân biệt nếu có nhiều mẫu trong ngày..."
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit">Lưu hồ sơ</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
