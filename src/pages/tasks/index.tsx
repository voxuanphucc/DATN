import { useAuthStore, selectUser } from '@/store';
import { ClipboardList } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

/**
 * TasksPage — Danh sách công việc được gán cho nhân viên (Spec US02/PB02)
 * Chỉ employee role có thể truy cập (được bảo vệ bởi PrivateRoute)
 * Dữ liệu sẽ được fetch từ API khi backend sẵn sàng
 */
export function TasksPage() {
  const user = useAuthStore(selectUser);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Công Việc Của Tôi</h1>
        <p className="text-gray-600 mt-2">
          Danh sách các công việc được gán cho {user?.fullName || user?.email}
        </p>
      </div>

      {/* Empty state — chờ kết nối API */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ClipboardList className="w-5 h-5 text-green-600" />
            Danh sách công việc
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ClipboardList className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Chưa có công việc nào
            </h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Quản lý chưa gán công việc cho bạn. Vui lòng kiểm tra lại sau hoặc liên hệ chủ trang trại.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Hướng dẫn */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="py-4">
          <p className="text-sm text-blue-800 text-center">
            📋 Danh sách công việc sẽ được hiển thị khi hệ thống kết nối với API backend.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default TasksPage;
