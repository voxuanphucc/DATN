import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/slices/authStore";
import { Button } from "@/components/ui/button";
import { getRoleFromToken } from "@/utils/jwt";
import { toast } from "sonner";

export function FarmManagementHeader() {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuthStore();

  const handleLogout = () => {
    // Clear auth state
    logout();
    
    // Show success message
    toast.success("Đã đăng xuất thành công");
    
    // Redirect to login page
    navigate("/login", { replace: true });
  };

  // Get role from JWT token
  const role = getRoleFromToken(accessToken);

  // Map role to Vietnamese
  const roleDisplayMap: Record<string, string> = {
    owner: "Chủ Trang Trại",
    manager: "Quản Lý",
    employee: "Nhân Viên",
  };

  const roleDisplay = role ? roleDisplayMap[role] || role : "Người dùng";

  if (!accessToken) return null;

  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-end px-6 gap-3">
      <div className="flex items-center gap-2 h-12 px-4 rounded-xl border border-gray-300 bg-gray-50">
        <span className="font-roboto text-[14px] font-semibold leading-tight text-gray-800">
          {roleDisplay}
        </span>
      </div>
      <Button
        onClick={handleLogout}
        variant="outline-dark"
        size="md"
        className="rounded-xl"
      >
        Đăng xuất
      </Button>
    </header>
  );
}
