import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui'
import { Badge } from '@/components/ui'
import { Plot } from '@/types/plot-management'
import { AlertTriangle } from 'lucide-react'

interface DeletePlotDialogProps {
  plot: Plot | null
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeletePlotDialog({
  plot,
  onOpenChange,
  onConfirm,
}: DeletePlotDialogProps) {
  if (!plot) return null

  const hasActivePlans = plot.relatedPlans.some((p) => p.status === 'active')
  const activePlans = plot.relatedPlans.filter((p) => p.status === 'active')

  return (
    <AlertDialog open={!!plot} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {hasActivePlans ? 'Không thể xóa lô đất' : 'Xác nhận xóa lô đất'}
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3">
              {hasActivePlans ? (
                <>
                  <div className="flex items-start gap-2 text-amber-600 bg-amber-50 p-3 rounded">
                    <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">
                        Lô đất này có kế hoạch đang hoạt động
                      </p>
                      <p className="text-sm mt-1">
                        Bạn cần hoàn thành hoặc hủy các kế hoạch sau trước khi
                        xóa:
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {activePlans.map((plan) => (
                      <div
                        key={plan.id}
                        className="flex items-center justify-between p-2 bg-muted rounded"
                      >
                        <span className="text-sm">{plan.name}</span>
                        <Badge variant="default">Đang hoạt động</Badge>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p>
                    Bạn có chắc chắn muốn xóa lô đất{' '}
                    <strong>{plot.name}</strong> không?
                  </p>
                  {plot.relatedPlans.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        Các kế hoạch liên quan (đã hoàn thành/hủy):
                      </p>
                      {plot.relatedPlans.map((plan) => (
                        <div
                          key={plan.id}
                          className="flex items-center justify-between p-2 bg-muted rounded text-sm"
                        >
                          <span>{plan.name}</span>
                          <Badge variant="secondary">
                            {plan.status === 'completed'
                              ? 'Đã hoàn thành'
                              : 'Đã hủy'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Thao tác này sẽ xóa mềm lô đất và có thể khôi phục sau nếu
                    cần.
                  </p>
                </>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {hasActivePlans ? 'Đóng' : 'Hủy'}
          </AlertDialogCancel>
          {!hasActivePlans && (
            <AlertDialogAction
              onClick={onConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Xóa lô đất
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
