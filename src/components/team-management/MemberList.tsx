import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Badge } from '../ui/badge'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../ui/avatar'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Member, MemberRole, MemberStatus } from '../../types/team'
import { MoreHorizontal, Shield, UserCog, UserMinus } from 'lucide-react'

interface MemberListProps {
  members: Member[]
  onChangeRoleClick: (member: Member) => void
  onRemoveClick: (member: Member) => void
}

export function MemberList({
  members,
  onChangeRoleClick,
  onRemoveClick,
}: MemberListProps) {
  const getRoleBadge = (role: MemberRole) => {
    switch (role) {
      case 'owner':
        return (
          <Badge variant="default" className="bg-slate-800 hover:bg-slate-800">
            Chủ trang trại
          </Badge>
        )
      case 'manager':
        return (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
          >
            Quản lý
          </Badge>
        )
      case 'employee':
        return (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300"
          >
            Nhân viên
          </Badge>
        )
      case 'accountant':
        return (
          <Badge
            variant="secondary"
            className="bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-300"
          >
            Kế toán
          </Badge>
        )
    }
  }

  const getStatusBadge = (status: MemberStatus, expiresAt?: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge
            variant="outline"
            className="border-green-500 text-green-600 dark:text-green-400"
          >
            Đang hoạt động
          </Badge>
        )
      case 'pending':
        return (
          <div className="flex flex-col items-start gap-1">
            <Badge
              variant="outline"
              className="border-amber-500 text-amber-600 dark:text-amber-400"
            >
              Chờ chấp nhận
            </Badge>
            {expiresAt && (
              <span className="text-xs text-muted-foreground">
                Hết hạn: {new Date(expiresAt).toLocaleDateString('vi-VN')}
              </span>
            )}
          </div>
        )
      case 'rejected':
        return (
          <Badge
            variant="outline"
            className="border-red-500 text-red-600 dark:text-red-400"
          >
            Đã từ chối
          </Badge>
        )
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">
          Chưa có thành viên nào trong trang trại.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thành viên</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày tham gia</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {member.name || 'Người dùng mới'}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {member.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{getRoleBadge(member.role)}</TableCell>
              <TableCell>
                {getStatusBadge(member.status, member.expiresAt)}
              </TableCell>
              <TableCell>
                {new Date(member.joinedAt).toLocaleDateString('vi-VN')}
              </TableCell>
              <TableCell className="text-right">
                {member.role === 'owner' ? (
                  <div className="flex items-center justify-end text-sm text-muted-foreground gap-1">
                    <Shield className="h-4 w-4" />
                    <span>Chủ sở hữu</span>
                  </div>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Mở menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onChangeRoleClick(member)}
                      >
                        <UserCog className="mr-2 h-4 w-4" />
                        <span>Thay đổi vai trò</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onRemoveClick(member)}
                        className="text-destructive focus:text-destructive"
                      >
                        <UserMinus className="mr-2 h-4 w-4" />
                        <span>Xóa khỏi trang trại</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
