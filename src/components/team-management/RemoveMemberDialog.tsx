import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { Member, Task } from '../../types/team'
import { toast } from 'sonner'
import { AlertTriangle } from 'lucide-react'

interface RemoveMemberDialogProps {
  member: Member | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onRemove: (memberId: string) => void
  tasks: Task[]
}

export function RemoveMemberDialog({
  member,
  open,
  onOpenChange,
  onRemove,
  tasks,
}: RemoveMemberDialogProps) {
  if (!member) return null

  const assignedTasks = tasks.filter(
    (t) => t.assigneeId === member.id && t.status === 'in_progress',
  )
  const hasTasks = assignedTasks.length > 0

  const handleConfirm = () => {
    onRemove(member.id)
    toast.success(`Đã xóa ${member.name} khỏi trang trại`)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa thành viên</AlertDialogTitle>
          <AlertDialogDescription className="text-base text-foreground mt-2">
            Bạn có chắc chắn muốn xóa{' '}
            <span className="font-semibold">{member.name}</span> khỏi trang
            trại?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-2 space-y-4">
          {hasTasks && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 flex gap-3 text-destructive text-sm">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <div>
                <p className="font-medium mb-1">
                  Cảnh báo: Công việc chưa hoàn thành
                </p>
                <p>
                  Thành viên này đang có {assignedTasks.length} công việc chưa
                  hoàn thành. Các công việc sẽ chuyển về trạng thái Chưa phân
                  công.
                </p>
              </div>
            </div>
          )}

          <p className="text-sm text-muted-foreground">
            Hành động này không thể hoàn tác. Thành viên sẽ không thể truy cập
            dữ liệu trang trại nữa.
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Xóa khỏi trang trại
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
