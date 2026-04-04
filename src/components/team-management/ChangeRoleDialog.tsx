import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { MemberRole, Member } from '../../types/team'
import { Alert, AlertDescription } from '../ui/alert'
import { AlertTriangle, Loader2, AlertCircle } from 'lucide-react'
import { useChangeRole } from '../../hooks/team-management/useChangeRole'
import { toast } from 'sonner'

interface ChangeRoleDialogProps {
  member: Member | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onChangeRole: (memberId: string, newRole: MemberRole) => void
}

export function ChangeRoleDialog({
  member,
  open,
  onOpenChange,
  onChangeRole,
}: ChangeRoleDialogProps) {
  const { form, serverError, onSubmit } = useChangeRole({
    member,
    onChangeRoleSuccess: (memberId, newRole) => {
      onChangeRole(memberId, newRole)
      toast.success(`Đã cập nhật vai trò cho ${member?.name}`)
      onOpenChange(false)
    },
  })

  const {
    formState: { errors, isSubmitting },
    watch,
  } = form

  const roleValue = watch('role')

  const isDowngradingManager =
    member?.role === 'manager' && roleValue === 'employee'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thay đổi vai trò</DialogTitle>
          <DialogDescription>
            Cập nhật vai trò cho thành viên {member?.name}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 py-4">
          {serverError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          {/* Member Info */}
          <div className="space-y-2">
            <Label>Thành viên</Label>
            <div className="p-2 bg-muted rounded-md text-sm font-medium">
              {member?.name} ({member?.email})
            </div>
          </div>

          {/* Role Select */}
          <div className="space-y-2">
            <Label htmlFor="new-role">Vai trò mới</Label>
            <Select
              value={roleValue || ''}
              onValueChange={(value) => form.setValue('role', value as any)}
              disabled={isSubmitting}
            >
              <SelectTrigger
                id="new-role"
                aria-invalid={!!errors.role}
              >
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manager">Quản lý</SelectItem>
                <SelectItem value="employee">Nhân viên</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-xs text-destructive">{errors.role.message}</p>
            )}
          </div>

          {/* Warning */}
          <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 rounded-md p-3 flex gap-3 text-amber-800 dark:text-amber-200 text-sm">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-1">
                Thay đổi vai trò sẽ có hiệu lực ngay lập tức.
              </p>
              {isDowngradingManager && (
                <p>
                  Thành viên này có thể sẽ được yêu cầu đăng nhập lại để áp dụng
                  quyền mới.
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={roleValue === member?.role || isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Xác nhận
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
