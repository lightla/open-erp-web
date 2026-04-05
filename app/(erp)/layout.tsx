import type { ReactNode } from 'react'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ErpSidebar } from '@/app/ui/erp-nav'

export default function ErpLayout({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider
        defaultOpen={false}
        style={{ '--sidebar-width-icon': '4.5rem' } as React.CSSProperties}
      >
        <ErpSidebar />
        <SidebarInset className="min-w-0 overflow-hidden">
          <main className="flex flex-1 flex-col overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
