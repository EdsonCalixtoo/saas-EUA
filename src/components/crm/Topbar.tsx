import { Search, Bell, HelpCircle, Calendar, ChevronDown } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex items-center gap-4 border-b border-border bg-background/60 px-8 py-4 backdrop-blur">
      <div className="relative flex-1 max-w-xl">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search anything..."
          className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-16 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:text-foreground">
        <Bell className="h-4 w-4" />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-white">3</span>
      </button>
      <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:text-foreground">
        <HelpCircle className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-2 py-1.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow text-xs font-semibold text-white">
          AI
        </div>
        <div className="leading-tight pr-2">
          <div className="text-sm font-semibold text-foreground">Acme Investments</div>
          <div className="text-xs text-muted-foreground">Pro Plan</div>
        </div>
      </div>

      <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        May 12 – May 18, 2024
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>
    </header>
  );
}