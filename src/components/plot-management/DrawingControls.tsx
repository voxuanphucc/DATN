import { Edit2, Save, X } from 'lucide-react'
import { Button } from '@/components/ui'

interface DrawingControlsProps {
  isDrawing: boolean
  onStartDrawing: () => void
  onCancelDrawing: () => void
  onSaveDrawing: () => void
  canSave: boolean
}

export function DrawingControls({
  isDrawing,
  onStartDrawing,
  onCancelDrawing,
  onSaveDrawing,
  canSave,
}: DrawingControlsProps) {
  return (
    <div className="absolute top-4 left-4 z-[1000] flex gap-2">
      {!isDrawing ? (
        <Button onClick={onStartDrawing} size="sm">
          <Edit2 className="w-4 h-4 mr-2" />
          Vẽ ranh giới
        </Button>
      ) : (
        <>
          <Button onClick={onSaveDrawing} size="sm" disabled={!canSave}>
            <Save className="w-4 h-4 mr-2" />
            Lưu
          </Button>
          <Button onClick={onCancelDrawing} variant="outline" size="sm">
            <X className="w-4 h-4 mr-2" />
            Hủy
          </Button>
        </>
      )}
    </div>
  )
}
