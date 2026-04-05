import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/slices/authStore'
import type { UserProfileDto } from '@/types/get-profile'
import { Map, Droplets, LogOut, ArrowRight, Users, Eye } from 'lucide-react'

interface ManagerDashboardProps {
  user: UserProfileDto
}

/**
 * ManagerDashboard — Dành cho role 'manager' (Quản lý)
 * Spec US02/PB02: Quản lý → bảng điều khiển quản lý
 * Chức năng được phép:
 *   - Xem bản đồ lô đất (read-only)
 *   - Xem hồ sơ phân tích đất (read-only, không tạo/sửa/xóa)
 *   - Xem danh sách thành viên (không mời/xóa)
 * Không có quyền:
 *   - Quản lý lô đất (tạo/sửa/xóa)
 *   - Tạo hồ sơ phân tích
 *   - Mời/xóa thành viên
 */
export function ManagerDashboard({ user }: ManagerDashboardProps) {
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
          <h1 className="text-3xl font-bold">Bảng điều khiển quản lý</h1>
          <p className="text-muted-foreground mt-1">
            Chào {user.fullName}! Bạn đang đăng nhập với vai trò Quản lý.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="default" className="text-sm py-1.5 px-3 bg-blue-600">
            👔 Quản lý
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

      {/* Thông tin chờ API */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="py-4">
          <p className="text-sm text-blue-800 text-center">
            📊 Dữ liệu thống kê sẽ được tải từ hệ thống sau khi kết nối API.
          </p>
        </CardContent>
      </Card>

      {/* Truy cập nhanh — chỉ các chức năng được phép cho manager */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Xem bản đồ lô đất — US07/PB07: manager có thể xem */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/map')}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Map className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <CardTitle className="text-base">Bản đồ lô đất</CardTitle>
                <CardDescription className="text-xs mt-0.5">Xem ranh giới các lô đất</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => navigate('/map')}>
              <Eye className="h-3 w-3" /> Xem bản đồ <ArrowRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        {/* Xem hồ sơ phân tích đất — US08/PB08: manager chỉ xem */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/soil-analysis')}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Droplets className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <CardTitle className="text-base">Hồ sơ phân tích đất</CardTitle>
                <CardDescription className="text-xs mt-0.5">Xem dữ liệu phân tích (chỉ đọc)</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => navigate('/soil-analysis')}>
              <Eye className="h-3 w-3" /> Xem hồ sơ <ArrowRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        {/* Xem danh sách thành viên */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/team-management')}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-700" />
              </div>
              <div>
                <CardTitle className="text-base">Thành viên trang trại</CardTitle>
                <CardDescription className="text-xs mt-0.5">Xem danh sách thành viên</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => navigate('/team-management')}>
              <Eye className="h-3 w-3" /> Xem thành viên <ArrowRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quyền hạn của quản lý */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-green-700">✅ Được phép</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-xs">
            <div className="flex items-center gap-2"><span className="text-green-600">✓</span><span>Xem bản đồ lô đất</span></div>
            <div className="flex items-center gap-2"><span className="text-green-600">✓</span><span>Xem hồ sơ phân tích đất</span></div>
            <div className="flex items-center gap-2"><span className="text-green-600">✓</span><span>Xem danh sách thành viên</span></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-red-700">🚫 Không có quyền</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-xs">
            <div className="flex items-center gap-2"><span className="text-red-400">✗</span><span>Tạo/sửa/xóa lô đất</span></div>
            <div className="flex items-center gap-2"><span className="text-red-400">✗</span><span>Tạo/sửa/xóa hồ sơ phân tích</span></div>
            <div className="flex items-center gap-2"><span className="text-red-400">✗</span><span>Mời hoặc xóa thành viên</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
