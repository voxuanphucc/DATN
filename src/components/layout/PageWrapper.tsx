import React from 'react'

interface PageWrapperProps {
  children: React.ReactNode
  variant?: 'default' | 'light-green' | 'light-amber' | 'minimal'
  className?: string
}

export function PageWrapper({
  children,
  variant = 'default',
  className = '',
}: PageWrapperProps) {
  const variants = {
    default: 'min-h-screen bg-white',
    'light-green': 'min-h-screen bg-white',
    'light-amber': 'min-h-screen bg-white',
    minimal: 'min-h-screen bg-white',
  }

  return (
    <div className={`w-full overflow-x-hidden ${variants[variant]} ${className}`}>
      <div>
        {children}
      </div>
    </div>
  )
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function PageHeader({
  title,
  subtitle,
  icon,
  action,
}: PageHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {icon && (
              <div className="p-3 bg-gray-100 rounded-lg">
                {icon}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                {title}
              </h1>
              {subtitle && (
                <p className="text-gray-600 text-sm mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {action && <div className="mt-1">{action}</div>}
        </div>
      </div>
    </div>
  )
}

interface PageContentProps {
  children: React.ReactNode
  className?: string
}

export function PageContent({ children, className = '' }: PageContentProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
      {children}
    </div>
  )
}
