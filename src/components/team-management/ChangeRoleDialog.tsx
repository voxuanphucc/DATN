import { useEffect, useState } from 'react'
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
import { toast } from 'sonner'
import { AlertTriangle } from 'lucide-react'

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
  const [role, setRole] = useState<MemberRole | ''>('')

  useEffect(() => {
    if (member) {
      setRole(member.role)
    }
  }, [member])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!member || !role) return

    onChangeRole(member.id, role as MemberRole)
    toast.success(`Đã cập nhật vai trò cho ${member.name}`)
    onOpenChange(false)
  }

  const isDowngradingManager =
    member?.role === 'manager' && (role === 'employee' || role === 'accountant')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thay đổi vai trò</DialogTitle>
          <DialogDescription>
            Cập nhật vai trò cho thành viên {member?.name}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Thành viên</Label>
            <div className="p-2 bg-muted rounded-md text-sm font-medium">
              {member?.name} ({member?.email})
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-role">Vai trò mới</Label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as MemberRole)}
            >
              <SelectTrigger id="new-role">
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manager">Quản lý</SelectItem>
                <SelectItem value="employee">Nhân viên</SelectItem>
                <SelectItem value="accountant">Kế toán</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 rounded-md p-3 flex gap-3 text-amber-800 dark:text-amber-200 text-sm">
            <AlertTriangle className="h-5 w-5 shrink-0" />
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
            >
              Hủy
            </Button>
            <Button type="submit" disabled={role === member?.role}>
              Xác nhận
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
