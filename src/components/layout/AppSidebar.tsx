"use client"

import * as React from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import {
  LayoutDashboard, Users, Building2, Phone, MessageSquare, Mail,
  Megaphone, GitMerge, CheckSquare, BarChart2, Calendar, Handshake,
  Settings, ChevronLeft, ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const topNavItems = [
  { label: "Dashboard",  href: "/dashboard",   icon: LayoutDashboard },
  { label: "CRM",        href: "/crm",         icon: Users },
  { label: "Properties", href: "/properties",  icon: Building2 },
  { label: "Dialer",     href: "/dialer",      icon: Phone },
  { label: "SMS",        href: "/sms",         icon: MessageSquare },
  { label: "Emails",     href: "/emails",      icon: Mail },
  { label: "Campaigns",  href: "/campaigns",   icon: Megaphone },
  { label: "Automation", href: "/automation",  icon: GitMerge },
  { label: "Tasks",      href: "/tasks",       icon: CheckSquare },
  { label: "Analytics",  href: "/analytics",   icon: BarChart2 },
  { label: "Calendar",   href: "/calendar",    icon: Calendar },
  { label: "Deals",      href: "/deals",       icon: Handshake },
]

const bottomNavItems = [
  { label: "Settings", href: "/settings", icon: Settings },
]

// ─── Component ────────────────────────────────────────────────────────────────

interface AppSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

function NavItem({
  item,
  collapsed,
  isActive,
}: {
  item: { label: string; href: string; icon: React.ElementType }
  collapsed: boolean
  isActive: boolean
}) {
  const Icon = item.icon
  const isAI = item.label === "AI Assistant"

  const itemContent = (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActive
          ? "bg-foreground/10 text-foreground"
          : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
        collapsed && "justify-center px-2",
        isAI && !isActive && "hover:text-ai"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon
        className={cn(
          "h-[18px] w-[18px] flex-shrink-0 transition-colors",
          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
          isAI && !isActive && "text-ai/70"
        )}
      />
      {!collapsed && (
        <span className="truncate">{item.label}</span>
      )}
    </Link>
  )

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger className="w-full">
          {itemContent}
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{item.label}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return itemContent
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border-subtle bg-background",
        "transition-[width] duration-200 ease-in-out",
        collapsed ? "w-[60px]" : "w-[220px]",
        "relative shrink-0"
      )}
      aria-label="Primary navigation"
    >
      {/* Logo */}
      <div
        className={cn(
          "flex h-[57px] items-center border-b border-border-subtle",
          collapsed ? "justify-center px-2" : "px-4 gap-2.5"
        )}
      >
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-foreground">
          <Building2 className="h-4 w-4 text-background" />
        </div>
        {!collapsed && (
          <span className="font-semibold text-sm tracking-tight text-foreground">
            PropFlow
          </span>
        )}
      </div>

      {/* Primary Navigation */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2 py-3" aria-label="Main navigation">
        {topNavItems.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            collapsed={collapsed}
            isActive={isActive(item.href)}
          />
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="flex flex-col gap-0.5 border-t border-border-subtle p-2 py-3">
        {bottomNavItems.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            collapsed={collapsed}
            isActive={isActive(item.href)}
          />
        ))}

        {/* Collapse toggle button */}
        <button
          onClick={onToggle}
          className={cn(
            "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium",
            "text-muted-foreground transition-all duration-150",
            "hover:bg-foreground/5 hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            collapsed && "justify-center px-2"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-[18px] w-[18px] flex-shrink-0" />
          ) : (
            <>
              <ChevronLeft className="h-[18px] w-[18px] flex-shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
