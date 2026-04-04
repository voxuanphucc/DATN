import React from 'react'
import { Toaster } from '@/components/ui'
import { FarmManagementSidebar } from './FarmManagementSidebar'

interface FarmManagementLayoutProps {
  children: React.ReactNode
}

export function FarmManagementLayout({ children }: FarmManagementLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-background">
      <Toaster position="top-right" />
      <FarmManagementSidebar />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
