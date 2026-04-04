import { useLocation, useNavigate } from 'react-router-dom'
import { LayoutGrid, Map } from 'lucide-react'

const NAV_ITEMS = [
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
]

export function FarmManagementSidebarNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="flex-1 p-4">
      <div className="space-y-1">
        {NAV_ITEMS.map((item) => (
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
