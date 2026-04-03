import { useState } from 'react'
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

interface InviteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInvite: (email: string, role: MemberRole) => void
  existingMembers: Member[]
}

const CURRENT_USER_EMAIL = 'an.nguyen@example.com'

export function InviteDialog({
  open,
  onOpenChange,
  onInvite,
  existingMembers,
}: InviteDialogProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<MemberRole | ''>('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Vui lòng nhập email')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Email không hợp lệ')
      return
    }

    if (email.toLowerCase() === CURRENT_USER_EMAIL.toLowerCase()) {
      setError('Không thể tự mời chính mình')
      return
    }

    const isExisting = existingMembers.some(
      (m) => m.email.toLowerCase() === email.toLowerCase(),
    )
    if (isExisting) {
      setError('Email này đã là thành viên của trang trại')
      return
    }

    if (!role) {
      setError('Vui lòng chọn vai trò')
      return
    }

    onInvite(email, role as MemberRole)
    toast.success('Đã gửi lời mời thành công')

    // Reset form
    setEmail('')
    setRole('')
    setError('')
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setEmail('')
          setRole('')
          setError('')
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
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Địa chỉ Email</Label>
            <input
              id="email"
              type="email"
              placeholder="nhanvien@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                error && error.includes('Email') ? 'border-destructive' : ''
              }`}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Vai trò</Label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as MemberRole)}
            >
              <SelectTrigger
                id="role"
                className={
                  error && error.includes('Vai trò') ? 'border-destructive' : ''
                }
              >
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manager">Quản lý</SelectItem>
                <SelectItem value="employee">Nhân viên</SelectItem>
                <SelectItem value="accountant">Kế toán</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && (
            <p className="text-sm text-destructive font-medium">{error}</p>
          )}
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit">Gửi lời mời</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
