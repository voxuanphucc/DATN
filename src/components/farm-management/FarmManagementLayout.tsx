import React from 'react'
import { Toaster } from '@/components/ui'
import { FarmManagementSidebar } from './FarmManagementSidebar'
import { FarmManagementHeader } from './FarmManagementHeader'

interface FarmManagementLayoutProps {
  children: React.ReactNode
}

export function FarmManagementLayout({ children }: FarmManagementLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <Toaster position="top-right" />
      <FarmManagementSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <FarmManagementHeader />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
