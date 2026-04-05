import { useAuthStore } from '@/store'
import { FarmDashboard, ManagerDashboard, EmployeeDashboard } from '@/components/dashboard'
import { FarmManagementLayout } from '@/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

export function DashboardPage() {
  const { user } = useAuthStore()

  if (!user) {
    return (
      <FarmManagementLayout>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Lỗi</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Không thể tải thông tin người dùng. Vui lòng đăng nhập lại.</p>
          </CardContent>
        </Card>
      </FarmManagementLayout>
    )
  }

  // Render dashboard based on role
  const renderDashboard = () => {
    switch (user.role) {
      case 'owner':
        return <FarmDashboard user={user} />
      case 'manager':
        return <ManagerDashboard user={user} />
      case 'employee':
        return <EmployeeDashboard user={user} />
      default:
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Lỗi</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Vai trò không được nhận diện. Vui lòng liên hệ quản trị viên.</p>
            </CardContent>
          </Card>
        )
    }
  }

  return <FarmManagementLayout>{renderDashboard()}</FarmManagementLayout>
}

export default DashboardPage
