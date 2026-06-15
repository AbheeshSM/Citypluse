import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquareWarning,
  Plus,
  Trash2,
  Car,
  Droplets,
  Siren,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarState } from "@/hooks/use-sidebar-state";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Complaints", url: "/complaints", icon: MessageSquareWarning },
  { title: "Add Complaint", url: "/add-complaint", icon: Plus },
  { title: "Waste Management", url: "/waste", icon: Trash2 },
  { title: "Traffic & Transport", url: "/traffic", icon: Car },
  { title: "Water & Electricity", url: "/utilities", icon: Droplets },
  { title: "Emergency Services", url: "/emergency", icon: Siren },
  { title: "Reports & Analytics", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
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
          <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center shrink-0 shadow-lg shadow-sidebar-primary/20">
            <Building2 className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-bold text-lg text-sidebar-primary">CityOS</h1>
              <p className="text-xs text-sidebar-foreground/60">Smart City Platform</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className={cn("flex-1 py-4 space-y-1 overflow-hidden", collapsed ? "px-2" : "px-3")}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <NavLink
                key={item.url}
                to={item.url}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary/20 text-sidebar-primary font-medium border-l-2 border-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? item.title : undefined}
              >
                <item.icon className={cn("w-[18px] h-[18px] shrink-0", isActive && "text-sidebar-primary")} />
                {!collapsed && <span className="truncate">{item.title}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={toggle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
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
