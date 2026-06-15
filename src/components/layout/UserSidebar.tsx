import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquareWarning,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarState } from "@/hooks/use-sidebar-state";

const userNavItems = [
  { title: "Dashboard", url: "/user/dashboard", icon: LayoutDashboard },
  { title: "My Complaints", url: "/user/complaints", icon: MessageSquareWarning },
  { title: "New Complaint", url: "/user/add-complaint", icon: Plus },
  { title: "Track Complaint", url: "/user/track", icon: Search },
];

export function UserSidebar() {
  const { collapsed, toggle } = useSidebarState();
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className={cn("flex items-center gap-3 py-5 border-b border-sidebar-border", collapsed ? "px-4 justify-center" : "px-5")}>
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center glow-primary shrink-0">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-bold text-lg text-primary">CityOS</h1>
              <p className="text-xs text-muted-foreground">Citizen Portal</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className={cn("flex-1 py-4 space-y-1 overflow-hidden", collapsed ? "px-2" : "px-3")}>
          {userNavItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <NavLink
                key={item.url}
                to={item.url}
                className={cn(
                  "nav-item text-sm py-2.5",
                  isActive && "nav-item-active",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? item.title : undefined}
              >
                <item.icon className={cn("w-[18px] h-[18px] shrink-0", isActive && "text-primary")} />
                {!collapsed && <span className="truncate">{item.title}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={toggle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
