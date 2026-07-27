import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, GitBranch, MessageSquare, Phone, MessageCircle,
  Mail, CheckSquare, Calendar, Contact, Home, Megaphone, Zap, FileText,
  BarChart3, Plug, Settings, ChevronDown, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DealVantaLogo } from "@/components/crm/DealVantaLogo";
import { useSidebar } from "@/context/SidebarContext";

const nav = [
  { icon: LayoutDashboard, label: "Dashboard",      to: "/" as const },
  { icon: Users,           label: "Leads",           to: "/leads" as const },
  { icon: GitBranch,       label: "Pipeline",        to: "/pipeline" as const },
  { icon: MessageSquare,   label: "Communications",  to: "/communications" as const },
  { icon: Phone,           label: "Calls",           to: "/calls" as const },
  { icon: MessageCircle,   label: "SMS",             to: null },
  { icon: Mail,            label: "Email",           to: null },
  { icon: CheckSquare,     label: "Tasks",           to: null },
  { icon: Calendar,        label: "Calendar",        to: null },
  { icon: Contact,         label: "Contacts",        to: null },
  { icon: Home,            label: "Properties",      to: null },
  { icon: Megaphone,       label: "Campaigns",       to: null },
  { icon: Zap,             label: "Automations",     to: null },
  { icon: FileText,        label: "Documents",       to: null },
  { icon: BarChart3,       label: "Reports",         to: null },
  { icon: Plug,            label: "Integrations",    to: null },
];

export function Sidebar() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { isOpen, close } = useSidebar();

  const sidebarContent = (
    <aside className="flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-sidebar-border/30">
        <DealVantaLogo variant="sidebar" size="md" />
        {/* Mobile close button */}
        <button
          onClick={close}
          className="rounded-lg p-1.5 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
        {nav.map((item) => {
          const isActive = item.to !== null && pathname === item.to;
          const baseClass = cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            isActive
              ? "bg-gradient-to-r from-primary to-primary-glow text-white shadow-md"
              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-white",
          );

          if (item.to) {
            return (
              <Link
                key={item.label}
                to={item.to}
                className={baseClass}
                onClick={close}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          }

          return (
            <button key={item.label} className={baseClass} onClick={close}>
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div className="border-t border-sidebar-border p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-white">
          <Settings className="h-4 w-4" />
          Settings
        </button>
        <div className="mt-2 flex items-center gap-3 rounded-lg bg-sidebar-accent/50 p-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-xs font-semibold text-white">
            AC
          </div>
          <div className="flex-1 leading-tight min-w-0">
            <div className="text-sm font-semibold text-white truncate">Alex Carter</div>
            <div className="text-xs text-sidebar-foreground/70 truncate">Admin</div>
          </div>
          <ChevronDown className="h-4 w-4 text-sidebar-foreground/70 shrink-0" />
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-screen w-64 shrink-0 sticky top-0">
        {sidebarContent}
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={close}
          />
          {/* Sliding Sidebar */}
          <div className="relative z-10 h-full animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}