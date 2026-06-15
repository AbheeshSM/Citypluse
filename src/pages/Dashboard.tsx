import { MessageSquareWarning, CheckCircle2, Cog, AlertTriangle } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { useThemeChartStyles } from "@/hooks/use-chart-styles";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const monthlyData = [
  { month: "Jan", complaints: 120, resolved: 100 },
  { month: "Feb", complaints: 150, resolved: 130 },
  { month: "Mar", complaints: 180, resolved: 165 },
  { month: "Apr", complaints: 140, resolved: 135 },
  { month: "May", complaints: 200, resolved: 180 },
  { month: "Jun", complaints: 175, resolved: 170 },
];

const categoryData = [
  { name: "Roads & Infrastructure", value: 35, color: "hsl(228, 43%, 37%)" },
  { name: "Water Supply", value: 25, color: "hsl(207, 58%, 78%)" },
  { name: "Waste Management", value: 20, color: "hsl(0, 90%, 70%)" },
  { name: "Electricity", value: 12, color: "hsl(47, 88%, 80%)" },
  { name: "Others", value: 8, color: "hsl(228, 44%, 25%)" },
];

export default function Dashboard() {
  const chartStyles = useThemeChartStyles();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Administrator</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Complaints"
          value="1,284"
          change="+12% from last month"
          changeType="negative"
          icon={MessageSquareWarning}
        />
        <KPICard
          title="Resolved Issues"
          value="1,052"
          change="+8% from last month"
          changeType="positive"
          icon={CheckCircle2}
          iconColor="bg-success/10 text-success"
        />
        <KPICard
          title="Active Services"
          value="48"
          change="3 new this week"
          changeType="neutral"
          icon={Cog}
          iconColor="bg-info/10 text-info"
        />
        <KPICard
          title="Emergency Requests"
          value="23"
          change="5 pending response"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="bg-warning/10 text-warning"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(228, 43%, 37%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(228, 43%, 37%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0, 90%, 70%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(0, 90%, 70%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.grid} />
                <XAxis dataKey="month" stroke={chartStyles.text} fontSize={12} />
                <YAxis stroke={chartStyles.text} fontSize={12} />
                <Tooltip contentStyle={chartStyles.tooltip} />
                <Area
                  type="monotone"
                  dataKey="complaints"
                  stroke="hsl(228, 43%, 37%)"
                  fillOpacity={1}
                  fill="url(#colorComplaints)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stroke="hsl(0, 90%, 70%)"
                  fillOpacity={1}
                  fill="url(#colorResolved)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(228, 43%, 37%)" }} />
              <span className="text-sm text-muted-foreground">Complaints</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(0, 90%, 70%)" }} />
              <span className="text-sm text-muted-foreground">Resolved</span>
            </div>
          </div>
        </div>

        {/* Complaints by Category */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Complaints by Category</h3>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={chartStyles.tooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}
