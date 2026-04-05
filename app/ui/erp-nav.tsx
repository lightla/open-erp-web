'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutGrid, ReceiptText, Users, Package, Warehouse,
  Mail, MessageSquare,
  GitBranch, CalendarClock,
  UserCog, ScrollText, Settings,
  LogOut, Building2, ChevronLeft, ChevronRight,
} from 'lucide-react'
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupContent, SidebarGroupLabel, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from '@/components/ui/sidebar'

const navGroups = [
  {
    label: 'Workspace',
    items: [
      { href: '/home', label: 'Home', icon: LayoutGrid },
    ],
  },
  {
    label: 'Sales',
    items: [
      { href: '/orders', label: 'Orders', icon: ReceiptText },
      { href: '/customers', label: 'Customers', icon: Users },
      { href: '/products', label: 'Products', icon: Package },
      { href: '/inventory', label: 'Inventory', icon: Warehouse },
    ],
  },
  {
    label: 'Communication',
    items: [
      { href: '/email', label: 'Email', icon: Mail },
      { href: '/sms', label: 'SMS', icon: MessageSquare },
    ],
  },
  {
    label: 'Automation',
    items: [
      { href: '/workflow', label: 'Workflow', icon: GitBranch },
      { href: '/schedule', label: 'Schedule', icon: CalendarClock },
    ],
  },
  {
    label: 'System',
    items: [
      { href: '/users', label: 'Users', icon: UserCog },
      { href: '/logs', label: 'Logs', icon: ScrollText },
      { href: '/settings', label: 'Settings', icon: Settings },
    ],
  },
]

function SidebarToggleButton() {
  const { toggleSidebar, state } = useSidebar()
  const collapsed = state === 'collapsed'
  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className="absolute right-0 top-1/2 z-50 flex h-[22px] w-[22px] -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.1)] hover:border-slate-300 hover:shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-shadow"
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      {collapsed
        ? <ChevronRight size={11} strokeWidth={2.5} className="text-slate-400" />
        : <ChevronLeft size={11} strokeWidth={2.5} className="text-slate-400" />
      }
    </button>
  )
}

export function ErpSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">

      <SidebarHeader className="relative border-b border-border px-4 py-4 group-data-[collapsible=icon]:px-0">
        <SidebarToggleButton />
        <div className="flex items-center gap-2.5 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 text-white">
            <Building2 className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-semibold leading-none">Open ERP</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">Core Workspace</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group, i) => (
          <div key={group.label}>
            {/* Divider between groups — only visible when collapsed */}
            {i > 0 && (
              <div className="hidden group-data-[collapsible=icon]:block mx-3 border-t border-slate-300 my-2" />
            )}
            <SidebarGroup>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    const Icon = item.icon
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.label}
                          className="group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center data-[active=true]:bg-blue-50 data-[active=true]:text-blue-600 hover:bg-blue-50/60"
                        >
                          <Link href={item.href}>
                            <Icon
                              strokeWidth={1.5}
                              className="shrink-0 group-data-[collapsible=icon]:!h-5 group-data-[collapsible=icon]:!w-5"
                            />
                            <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign out"
              className="text-muted-foreground hover:text-rose-500 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center"
            >
              <LogOut
                strokeWidth={1.5}
                className="shrink-0 group-data-[collapsible=icon]:!h-5 group-data-[collapsible=icon]:!w-5"
              />
              <span className="group-data-[collapsible=icon]:hidden">Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
