import { Outlet } from "react-router-dom";
import { UserSidebar } from "./UserSidebar";
import { UserTopNavbar } from "./UserTopNavbar";
import { SidebarProvider, useSidebarState } from "@/hooks/use-sidebar-state";
import { cn } from "@/lib/utils";

function UserDashboardContent() {
  const { collapsed } = useSidebarState();

  return (
    <div className="min-h-screen bg-background">
      <UserSidebar />
      <div className={cn("transition-all duration-300", collapsed ? "ml-20" : "ml-64")}>
        <UserTopNavbar />
        <main className="p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function UserDashboardLayout() {
  return (
    <SidebarProvider>
      <UserDashboardContent />
    </SidebarProvider>
  );
}
