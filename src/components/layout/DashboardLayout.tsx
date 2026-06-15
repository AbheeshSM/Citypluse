import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { TopNavbar } from "./TopNavbar";
import { SidebarProvider, useSidebarState } from "@/hooks/use-sidebar-state";
import { cn } from "@/lib/utils";

function DashboardContent() {
  const { collapsed } = useSidebarState();

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className={cn("transition-all duration-300", collapsed ? "ml-20" : "ml-64")}>
        <TopNavbar />
        <main className="p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
}
