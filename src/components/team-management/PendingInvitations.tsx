import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
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
import { Invitation, MemberRole, InvitationStatus } from '../../types/team'
import { MailX, Send, Clock } from 'lucide-react'
import { toast } from 'sonner'

interface PendingInvitationsProps {
  invitations: Invitation[]
  onCancelInvitation: (id: string) => void
  onResendInvitation: (id: string) => void
}

export function PendingInvitations({
  invitations,
  onCancelInvitation,
  onResendInvitation,
}: PendingInvitationsProps) {
  const [cancelId, setCancelId] = useState<string | null>(null)

  const getRoleLabel = (role: MemberRole) => {
    switch (role) {
      case 'manager':
        return 'Quản lý'
      case 'employee':
        return 'Nhân viên'
      default:
        return role
    }
  }

  const getStatusBadge = (status: InvitationStatus) => {
    switch (status) {
      case 'pending':
        return (
          <Badge
            variant="outline"
            className="border-amber-500 text-amber-600 dark:text-amber-400"
          >
            Chờ chấp nhận
          </Badge>
        )
      case 'expired':
        return (
          <Badge
            variant="outline"
            className="border-red-500 text-red-600 dark:text-red-400"
          >
            Đã hết hạn
          </Badge>
        )
      case 'cancelled':
        return (
          <Badge
            variant="outline"
            className="border-slate-500 text-slate-600 dark:text-slate-400"
          >
            Đã hủy
          </Badge>
        )
      case 'accepted':
        return (
          <Badge
            variant="outline"
            className="border-green-500 text-green-600 dark:text-green-400"
          >
            Đã chấp nhận
          </Badge>
        )
    }
  }

  const handleCancelConfirm = () => {
    if (cancelId) {
      onCancelInvitation(cancelId)
      toast.success('Đã hủy lời mời')
      setCancelId(null)
    }
  }

  const handleResend = (id: string) => {
    onResendInvitation(id)
    toast.success('Đã gửi lại lời mời mới')
  }

  if (invitations.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">Không có lời mời nào đang chờ.</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Ngày mời</TableHead>
              <TableHead>Thời hạn</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invitations.map((inv) => {
              const isExpired =
                new Date(inv.expiresAt) < new Date() || inv.status === 'expired'
              const isPending = inv.status === 'pending' && !isExpired
              return (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.email}</TableCell>
                  <TableCell>{getRoleLabel(inv.role)}</TableCell>
                  <TableCell>
                    {new Date(inv.invitedAt).toLocaleDateString('vi-VN')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className={isExpired ? 'text-destructive' : ''}>
                        {new Date(inv.expiresAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(
                      isExpired && inv.status === 'pending'
                        ? 'expired'
                        : inv.status,
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {isPending && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => setCancelId(inv.id)}
                        >
                          <MailX className="h-4 w-4 mr-1" />
                          Hủy
                        </Button>
                      )}
                      {(isExpired || inv.status === 'cancelled') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleResend(inv.id)}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Gửi lại
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!cancelId}
        onOpenChange={(open) => !open && setCancelId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hủy lời mời</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn hủy lời mời này? Liên kết mời sẽ không còn
              hiệu lực.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Đóng</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Xác nhận hủy
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
