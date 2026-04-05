import { Leaf, Droplets, Users, Map, LogOut, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/slices/authStore'
import type { UserProfileDto } from '@/types/get-profile'

interface FarmDashboardProps {
  user: UserProfileDto
}

/**
 * FarmDashboard — Dành cho role 'owner' (Nông dân/Chủ trang trại)
 * Spec US02/PB02: Nông dân → trang quản lý trang trại
 * Chức năng: quản lý lô đất, hồ sơ phân tích đất, quản lý thành viên
 */
export function FarmDashboard({ user }: FarmDashboardProps) {
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
            Trang trại: {user.farmName || 'Chưa cập nhật tên trang trại'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="default" className="text-sm py-1.5 px-3 bg-emerald-700">
            👨‍🌾 Chủ trang trại
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
      <Card className="border-emerald-200 bg-emerald-50">
        <CardContent className="py-4">
          <p className="text-sm text-emerald-800 text-center">
            📊 Dữ liệu thống kê sẽ được tải từ hệ thống sau khi kết nối API.
          </p>
        </CardContent>
      </Card>

      {/* Truy cập nhanh theo chức năng spec */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Quản lý lô đất — US06/PB06 */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/plots')}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Leaf className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <CardTitle className="text-base">Quản lý lô đất</CardTitle>
                <CardDescription className="text-xs mt-0.5">Tạo, chỉnh sửa, xóa lô đất</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => navigate('/plots')}>
              Vào quản lý <ArrowRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        {/* Bản đồ lô đất — US07/PB07 */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/map')}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Map className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <CardTitle className="text-base">Bản đồ ranh giới</CardTitle>
                <CardDescription className="text-xs mt-0.5">Vẽ và chỉnh sửa ranh giới lô đất</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => navigate('/map')}>
              Xem bản đồ <ArrowRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        {/* Phân tích đất — US08/US09/PB08/PB09 */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/soil-analysis')}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Droplets className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <CardTitle className="text-base">Phân tích đất</CardTitle>
                <CardDescription className="text-xs mt-0.5">Hồ sơ đất & gợi ý cây trồng AI</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => navigate('/soil-analysis')}>
              Xem hồ sơ <ArrowRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        {/* Quản lý thành viên — US04/US05/PB04/PB05 */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/team-management')}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-700" />
              </div>
              <div>
                <CardTitle className="text-base">Quản lý thành viên</CardTitle>
                <CardDescription className="text-xs mt-0.5">Mời, thay đổi vai trò, xóa thành viên</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => navigate('/team-management')}>
              Quản lý đội <ArrowRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        {/* Upload AI phân tích — US09/PB09 */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/soil-ai-analysis')}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <span className="text-cyan-700 font-bold text-sm">AI</span>
              </div>
              <div>
                <CardTitle className="text-base">Phân tích AI</CardTitle>
                <CardDescription className="text-xs mt-0.5">Upload kết quả lab, nhận gợi ý cây trồng</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => navigate('/soil-ai-analysis')}>
              Phân tích AI <ArrowRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quyền hạn */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Quyền hạn của bạn</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2"><span className="text-green-600">✓</span><span>Tạo, sửa, xóa lô đất</span></div>
          <div className="flex items-center gap-2"><span className="text-green-600">✓</span><span>Vẽ ranh giới trên bản đồ</span></div>
          <div className="flex items-center gap-2"><span className="text-green-600">✓</span><span>Tạo hồ sơ phân tích đất</span></div>
          <div className="flex items-center gap-2"><span className="text-green-600">✓</span><span>Upload file & phân tích AI</span></div>
          <div className="flex items-center gap-2"><span className="text-green-600">✓</span><span>Mời và quản lý thành viên</span></div>
          <div className="flex items-center gap-2"><span className="text-green-600">✓</span><span>Xem toàn bộ dữ liệu trang trại</span></div>
        </CardContent>
      </Card>
    </div>
  )
}
