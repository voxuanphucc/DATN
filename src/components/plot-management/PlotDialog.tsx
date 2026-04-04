import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui'
import { Button } from '@/components/ui'
import { Input } from '@/components/ui'
import { Label } from '@/components/ui'
import { Textarea } from '@/components/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { Plot } from '@/types/plot-management'
import { AlertTriangle } from 'lucide-react'

interface PlotDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plot: Plot | null
  onSave: (
    plotData: Omit<
      Plot,
      'id' | 'createdAt' | 'isDeleted' | 'relatedPlans' | 'farmId' | 'color'
    >,
  ) => void
}

export function PlotDialog({
  open,
  onOpenChange,
  plot,
  onSave,
}: PlotDialogProps) {
  const [name, setName] = useState('')
  const [area, setArea] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'active' | 'resting'>('active')
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (plot) {
      setName(plot.name)
      setArea(plot.area.toString())
      setDescription(plot.description)
      setStatus(plot.status)
    } else {
      setName('')
      setArea('')
      setDescription('')
      setStatus('active')
    }
    setErrors({})
    setShowDuplicateWarning(false)
  }, [plot, open])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = 'Tên lô là bắt buộc'
    } else if (name.length > 100) {
      newErrors.name = 'Tên lô không được vượt quá 100 ký tự'
    }

    if (!area.trim()) {
      newErrors.area = 'Diện tích là bắt buộc'
    } else {
      const areaNum = parseFloat(area)
      if (isNaN(areaNum) || areaNum <= 0) {
        newErrors.area = 'Diện tích phải là số dương lớn hơn 0'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    onSave({
      name: name.trim(),
      area: parseFloat(area),
      description: description.trim(),
      status,
      boundary: plot?.boundary || null,
    })
  }

  const handleNameChange = (value: string) => {
    setName(value)
    setShowDuplicateWarning(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {plot ? 'Chỉnh sửa lô đất' : 'Thêm lô đất mới'}
            </DialogTitle>
            <DialogDescription>
              {plot
                ? 'Cập nhật thông tin lô đất. Lưu ý: không thể chỉnh sửa ranh giới từ đây.'
                : 'Nhập thông tin lô đất mới. Bạn có thể vẽ ranh giới sau ở trang Bản đồ.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Tên lô <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ví dụ: Lô Lúa Đông"
                maxLength={100}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
              {showDuplicateWarning && (
                <div className="flex items-start gap-2 text-sm text-amber-600 bg-amber-50 p-2 rounded">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    Đã có lô đất khác cùng tên. Bạn vẫn có thể tiếp tục tạo.
                  </span>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                {name.length}/100 ký tự
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">
                Diện tích (ha) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="area"
                type="number"
                step="0.1"
                min="0.1"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Ví dụ: 2.5"
                className={errors.area ? 'border-destructive' : ''}
              />
              {errors.area && (
                <p className="text-sm text-destructive">{errors.area}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as 'active' | 'resting')}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Đang canh tác</SelectItem>
                  <SelectItem value="resting">Đang nghỉ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả về lô đất, loại cây trồng, đặc điểm đất..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit">{plot ? 'Cập nhật' : 'Thêm lô đất'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
