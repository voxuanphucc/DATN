import { FarmManagementSidebarHeader } from './FarmManagementSidebarHeader'
import { FarmManagementSidebarNav } from './FarmManagementSidebarNav'
import { FarmManagementSidebarFooter } from './FarmManagementSidebarFooter'

export function FarmManagementSidebar() {
  return (
    <aside className="w-64 border-r bg-card flex flex-col">
      <FarmManagementSidebarHeader />
      <FarmManagementSidebarNav />
      <FarmManagementSidebarFooter />
    </aside>
  )
}
