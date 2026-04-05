import { useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  LayoutGrid,
  Map,
  Droplets,
  Users,
  ClipboardList,
  BrainCircuit,
} from 'lucide-react'
import { useAuthStore } from '@/store/slices/authStore'

/**
 * Navigation items theo role — đúng spec:
 *
 * owner (Nông dân/Chủ trang trại):
 *   US06/PB06: Quản lý lô đất → /plots
 *   US07/PB07: Bản đồ lô đất → /map
 *   US08/PB08: Phân tích đất → /soil-analysis
 *   US09/PB09: AI Phân tích → /soil-ai-analysis
 *   US04/US05/PB04/PB05: Quản lý đội → /team-management
 *
 * manager (Quản lý):
 *   US07/PB07: Bản đồ lô đất → /map (xem, không sửa)
 *   US08/PB08: Phân tích đất → /soil-analysis (chỉ xem)
 *
 * employee (Nhân viên):
 *   /tasks (Danh sách công việc)
 */
const NAV_ITEMS_BY_ROLE: Record<string, { label: string; path: string; icon: React.ReactNode }[]> =
  {
    owner: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: <LayoutDashboard className="w-4 h-4" />,
      },
      {
        label: 'Quản lý lô đất',
        path: '/plots',
        icon: <LayoutGrid className="w-4 h-4" />,
      },
      {
        label: 'Bản đồ lô đất',
        path: '/map',
        icon: <Map className="w-4 h-4" />,
      },
      {
        label: 'Phân tích đất',
        path: '/soil-analysis',
        icon: <Droplets className="w-4 h-4" />,
      },
      {
        label: 'AI Phân tích',
        path: '/soil-ai-analysis',
        icon: <BrainCircuit className="w-4 h-4" />,
      },
      {
        label: 'Quản lý đội',
        path: '/team-management',
        icon: <Users className="w-4 h-4" />,
      },
    ],
    manager: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: <LayoutDashboard className="w-4 h-4" />,
      },
      {
        label: 'Bản đồ lô đất',
        path: '/map',
        icon: <Map className="w-4 h-4" />,
      },
      {
        label: 'Phân tích đất',
        path: '/soil-analysis',
        icon: <Droplets className="w-4 h-4" />,
      },
    ],
    employee: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: <LayoutDashboard className="w-4 h-4" />,
      },
      {
        label: 'Công việc của tôi',
        path: '/tasks',
        icon: <ClipboardList className="w-4 h-4" />,
      },
    ],
  }

export function FarmManagementSidebarNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const userRole = user?.role ?? 'employee'
  const navItems = NAV_ITEMS_BY_ROLE[userRole] ?? NAV_ITEMS_BY_ROLE.employee

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="flex-1 p-4">
      <div className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive(item.path)
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
