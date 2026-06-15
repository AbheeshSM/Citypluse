import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider, useAuth, type Role } from "@/hooks/use-auth";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Complaints from "./pages/Complaints";
import AddComplaint from "./pages/AddComplaint";
import WasteManagement from "./pages/WasteManagement";
import Traffic from "./pages/Traffic";
import Utilities from "./pages/Utilities";
import Emergency from "./pages/Emergency";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import UserDashboard from "./pages/user/UserDashboard";
import UserComplaints from "./pages/user/UserComplaints";
import UserAddComplaint from "./pages/user/UserAddComplaint";
import TrackComplaint from "./pages/user/TrackComplaint";

const queryClient = new QueryClient();

function RequireAuth({ children, allowedRoles }: { children: JSX.Element; allowedRoles?: Role[] }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === "admin" ? "/dashboard" : "/user/dashboard"} replace />;
  }

  return children;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Admin Routes */}
              <Route element={<RequireAuth allowedRoles={["admin"]}><DashboardLayout /></RequireAuth>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/complaints" element={<Complaints />} />
                <Route path="/add-complaint" element={<AddComplaint />} />
                <Route path="/waste" element={<WasteManagement />} />
                <Route path="/traffic" element={<Traffic />} />
                <Route path="/utilities" element={<Utilities />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              {/* User Routes */}
              <Route element={<RequireAuth allowedRoles={["user"]}><UserDashboardLayout /></RequireAuth>}>
                <Route path="/user/dashboard" element={<UserDashboard />} />
                <Route path="/user/complaints" element={<UserComplaints />} />
                <Route path="/user/add-complaint" element={<UserAddComplaint />} />
                <Route path="/user/track" element={<TrackComplaint />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
