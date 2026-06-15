import { MessageSquareWarning, CheckCircle2, Clock, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { KPICard } from "@/components/dashboard/KPICard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

const recentComplaints = [
  { id: "CMP-101", category: "Roads", area: "Sector 12", status: "pending" as const, date: "2025-02-04", description: "Pothole on Main Street near school" },
  { id: "CMP-098", category: "Water", area: "Zone A", status: "active" as const, date: "2025-02-02", description: "Low water pressure in morning hours" },
  { id: "CMP-085", category: "Electricity", area: "Block 5", status: "resolved" as const, date: "2025-01-28", description: "Street light not working" },
];

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome Back!</h1>
          <p className="text-muted-foreground">Track and manage your complaints</p>
        </div>
        <button
          onClick={() => navigate("/user/add-complaint")}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          New Complaint
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Complaints"
          value="12"
          change="3 this month"
          changeType="neutral"
          icon={MessageSquareWarning}
        />
        <KPICard
          title="Resolved"
          value="8"
          change="67% resolution rate"
          changeType="positive"
          icon={CheckCircle2}
          iconColor="bg-success/10 text-success"
        />
        <KPICard
          title="Pending"
          value="4"
          change="2 under review"
          changeType="negative"
          icon={Clock}
          iconColor="bg-warning/10 text-warning"
        />
      </div>

      {/* Recent Complaints */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Complaints</h3>
          <button
            onClick={() => navigate("/user/complaints")}
            className="text-sm text-primary hover:underline"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {recentComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => navigate("/user/track")}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm text-primary font-medium">{complaint.id}</span>
                <div>
                  <p className="text-sm font-medium">{complaint.description}</p>
                  <p className="text-xs text-muted-foreground">{complaint.category} · {complaint.area} · {complaint.date}</p>
                </div>
              </div>
              <StatusBadge status={complaint.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
