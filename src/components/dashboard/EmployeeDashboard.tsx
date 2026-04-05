import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/slices/authStore'
import type { UserProfileDto } from '@/types/get-profile'
import { ClipboardList, LogOut, ArrowRight } from 'lucide-react'

interface EmployeeDashboardProps {
  user: UserProfileDto
}

/**
 * EmployeeDashboard — Dành cho role 'employee' (Nhân viên)
 * Spec US02/PB02: Nhân viên → danh sách công việc
 * Chức năng:
 *   - Xem danh sách công việc được gán
 * Không có quyền:
 *   - Quản lý lô đất, phân tích đất, thành viên
 */
export function EmployeeDashboard({ user }: EmployeeDashboardProps) {
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Xin chào, {user.fullName}!</h1>
          <p className="text-muted-foreground mt-1">
            Bạn đang đăng nhập với vai trò Nhân viên.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-sm py-1.5 px-3">
            👷 Nhân viên
          </Badge>
          <Button
            onClick={handleLogout}
            variant="destructive"
            size="sm"
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </Button>
        </div>
      </div>

      {/* Truy cập nhanh — chỉ công việc */}
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/tasks')}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <ClipboardList className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <CardTitle className="text-base">Danh sách công việc của tôi</CardTitle>
              <CardDescription className="text-xs mt-0.5">Xem các công việc được gán cho bạn</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button variant="default" size="sm" className="w-full gap-2 bg-green-600 hover:bg-green-700" onClick={() => navigate('/tasks')}>
            Xem công việc <ArrowRight className="h-3 w-3" />
          </Button>
        </CardContent>
      </Card>

      {/* Thông tin quyền hạn */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-blue-800">ℹ️ Quyền hạn của bạn</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-blue-700 space-y-1">
          <div className="flex items-center gap-2"><span className="text-green-600">✓</span><span>Xem và nhận công việc được gán</span></div>
          <div className="flex items-center gap-2"><span className="text-red-400">✗</span><span>Không thể quản lý lô đất</span></div>
          <div className="flex items-center gap-2"><span className="text-red-400">✗</span><span>Không thể tạo/sửa hồ sơ phân tích</span></div>
          <div className="flex items-center gap-2"><span className="text-red-400">✗</span><span>Không thể quản lý thành viên</span></div>
        </CardContent>
      </Card>

      {/* Liên hệ hỗ trợ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Hỗ trợ</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          <p>Nếu bạn cần quyền truy cập thêm hoặc có câu hỏi, vui lòng liên hệ chủ trang trại hoặc quản lý.</p>
        </CardContent>
      </Card>
    </div>
  )
}
