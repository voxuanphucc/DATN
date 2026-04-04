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
import { AlertCircle, Loader2 } from 'lucide-react'
import { useInviteMember } from '../../hooks/team-management/useInviteMember'
import { Input } from '../ui/Input'
import { toast } from 'sonner'

interface InviteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInvite: (email: string, role: MemberRole) => void
  existingMembers: Member[]
}

export function InviteDialog({
  open,
  onOpenChange,
  onInvite,
  existingMembers,
}: InviteDialogProps) {
  const { form, serverError, onSubmit } = useInviteMember({
    existingMembers,
    onInviteSuccess: (email, role) => {
      onInvite(email, role)
      toast.success('Đã gửi lời mời thành công')
      onOpenChange(false)
    },
  })

  const {
    register,
    formState: { errors, isSubmitting },
    watch,
  } = form

  const roleValue = watch('role')

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          form.reset()
        }
        onOpenChange(isOpen)
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mời thành viên mới</DialogTitle>
          <DialogDescription>
            Gửi lời mời tham gia trang trại qua email và phân quyền vai trò.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 py-4">
          {serverError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Địa chỉ Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nhanvien@example.com"
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Vai trò</Label>
            <Select
              value={roleValue || ''}
              onValueChange={(value) => form.setValue('role', value as any)}
              disabled={isSubmitting}
            >
              <SelectTrigger
                id="role"
                aria-invalid={!!errors.role}
              >
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manager">Quản lý</SelectItem>
                <SelectItem value="employee">Nhân viên</SelectItem>
                <SelectItem value="accountant">Kế toán</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-xs text-destructive">{errors.role.message}</p>
            )}
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Gửi lời mời
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
