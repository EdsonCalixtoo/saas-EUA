import { Search, Bell, HelpCircle, Calendar, ChevronDown, Menu } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";

export function Topbar() {
  const { toggle } = useSidebar();

  return (
    <header className="flex items-center gap-3 sm:gap-4 border-b border-border bg-background/60 px-4 sm:px-6 lg:px-8 py-3.5 backdrop-blur sticky top-0 z-30">
      {/* Mobile Hamburger Menu button */}
      <button
        onClick={toggle}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:text-foreground lg:hidden"
        aria-label="Open Sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search Input */}
      <div className="relative flex-1 max-w-xl">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search leads, deals, properties..."
          className="h-10 sm:h-11 w-full rounded-xl border border-border bg-card pl-9 sm:pl-10 pr-12 text-xs sm:text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-destructive text-[9px] sm:text-[10px] font-semibold text-white">3</span>
        </button>

        <button className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:text-foreground">
          <HelpCircle className="h-4 w-4" />
        </button>

        {/* Organization Badge */}
        <div className="hidden md:flex items-center gap-2.5 rounded-xl border border-border bg-card px-2.5 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow text-xs font-semibold text-white">
            AI
          </div>
          <div className="leading-tight pr-1">
            <div className="text-xs font-semibold text-foreground">Acme Investments</div>
            <div className="text-[10px] text-muted-foreground">Pro Plan</div>
          </div>
        </div>

        {/* Date Filter */}
        <button className="hidden sm:flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs sm:text-sm font-medium text-foreground">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>May 12 – May 18</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}