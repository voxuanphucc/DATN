import { FarmManagementSidebarHeader } from './FarmManagementSidebarHeader'
import { FarmManagementSidebarNav } from './FarmManagementSidebarNav'
import { FarmManagementSidebarFooter } from './FarmManagementSidebarFooter'

export function FarmManagementSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <FarmManagementSidebarHeader />
      <FarmManagementSidebarNav />
      <FarmManagementSidebarFooter />
    </aside>
  )
}
