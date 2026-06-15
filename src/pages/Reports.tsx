import { useState } from "react";
import { Download, Calendar, FileText, BarChart3, PieChart, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useThemeChartStyles } from "@/hooks/use-chart-styles";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";
 
 const monthlyData = [
   { month: "Jul", complaints: 180, resolved: 165, pending: 15 },
   { month: "Aug", complaints: 220, resolved: 200, pending: 20 },
   { month: "Sep", complaints: 195, resolved: 185, pending: 10 },
   { month: "Oct", complaints: 240, resolved: 220, pending: 20 },
   { month: "Nov", complaints: 210, resolved: 195, pending: 15 },
   { month: "Dec", complaints: 190, resolved: 180, pending: 10 },
   { month: "Jan", complaints: 175, resolved: 165, pending: 10 },
 ];
 
 const departmentData = [
   { name: "Public Works", value: 35, color: "hsl(174, 72%, 46%)" },
   { name: "Water Dept", value: 25, color: "hsl(199, 89%, 48%)" },
   { name: "Power Grid", value: 18, color: "hsl(38, 92%, 50%)" },
   { name: "Sanitation", value: 15, color: "hsl(142, 76%, 36%)" },
   { name: "Traffic", value: 7, color: "hsl(0, 72%, 51%)" },
 ];
 
 const reports = [
   { name: "Monthly Performance Report", type: "PDF", size: "2.4 MB", date: "Feb 1, 2025" },
   { name: "Citizen Satisfaction Survey", type: "PDF", size: "1.8 MB", date: "Jan 28, 2025" },
   { name: "Infrastructure Audit", type: "XLSX", size: "3.2 MB", date: "Jan 25, 2025" },
   { name: "Budget Allocation Report", type: "PDF", size: "856 KB", date: "Jan 20, 2025" },
   { name: "Emergency Response Stats", type: "PDF", size: "1.1 MB", date: "Jan 15, 2025" },
 ];
 
export default function Reports() {
    const [dateRange, setDateRange] = useState("last-6-months");
    const chartStyles = useThemeChartStyles();
 
   return (
     <div className="space-y-6">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
         <div>
           <h1 className="text-2xl font-bold">Reports & Analytics</h1>
           <p className="text-muted-foreground">Comprehensive insights and downloadable reports</p>
         </div>
         <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-48">
                <Calendar className="w-4 h-4 text-muted-foreground mr-2" />
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
           <button className="btn-primary flex items-center gap-2 py-2">
             <Download className="w-4 h-4" />
             Export All
           </button>
         </div>
       </div>
 
       {/* Summary Cards */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-3 rounded-xl bg-primary/10">
               <FileText className="w-6 h-6 text-primary" />
             </div>
             <div>
               <p className="text-2xl font-bold">1,410</p>
               <p className="text-sm text-muted-foreground">Total Complaints</p>
             </div>
           </div>
         </div>
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-3 rounded-xl bg-success/10">
               <TrendingUp className="w-6 h-6 text-success" />
             </div>
             <div>
               <p className="text-2xl font-bold">94.3%</p>
               <p className="text-sm text-muted-foreground">Resolution Rate</p>
             </div>
           </div>
         </div>
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-3 rounded-xl bg-info/10">
               <BarChart3 className="w-6 h-6 text-info" />
             </div>
             <div>
               <p className="text-2xl font-bold">4.2 days</p>
               <p className="text-sm text-muted-foreground">Avg Resolution Time</p>
             </div>
           </div>
         </div>
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-3 rounded-xl bg-warning/10">
               <PieChart className="w-6 h-6 text-warning" />
             </div>
             <div>
               <p className="text-2xl font-bold">87%</p>
               <p className="text-sm text-muted-foreground">Citizen Satisfaction</p>
             </div>
           </div>
         </div>
       </div>
 
       {/* Charts */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Trend Chart */}
         <div className="lg:col-span-2 glass-card p-6">
           <h3 className="text-lg font-semibold mb-4">Complaint Trends</h3>
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={monthlyData}>
                 <defs>
                   <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="hsl(174, 72%, 46%)" stopOpacity={0.3} />
                     <stop offset="95%" stopColor="hsl(174, 72%, 46%)" stopOpacity={0} />
                   </linearGradient>
                   <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3} />
                     <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
                   </linearGradient>
                 </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.grid} />
                  <XAxis dataKey="month" stroke={chartStyles.text} fontSize={12} />
                  <YAxis stroke={chartStyles.text} fontSize={12} />
                  <Tooltip contentStyle={chartStyles.tooltip} />
                 <Area type="monotone" dataKey="complaints" stroke="hsl(174, 72%, 46%)" fillOpacity={1} fill="url(#colorTotal)" strokeWidth={2} />
                 <Area type="monotone" dataKey="resolved" stroke="hsl(142, 76%, 36%)" fillOpacity={1} fill="url(#colorRes)" strokeWidth={2} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
         </div>
 
         {/* Department Distribution */}
         <div className="glass-card p-6">
           <h3 className="text-lg font-semibold mb-4">By Department</h3>
           <div className="h-48">
             <ResponsiveContainer width="100%" height="100%">
               <RechartsPieChart>
                 <Pie
                   data={departmentData}
                   cx="50%"
                   cy="50%"
                   innerRadius={40}
                   outerRadius={70}
                   paddingAngle={3}
                   dataKey="value"
                 >
                   {departmentData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                  <Tooltip contentStyle={chartStyles.tooltip} />
               </RechartsPieChart>
             </ResponsiveContainer>
           </div>
           <div className="space-y-2 mt-4">
             {departmentData.map((dept) => (
               <div key={dept.name} className="flex items-center justify-between text-sm">
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                   <span className="text-muted-foreground">{dept.name}</span>
                 </div>
                 <span className="font-medium">{dept.value}%</span>
               </div>
             ))}
           </div>
         </div>
       </div>
 
       {/* Downloadable Reports */}
       <div className="glass-card p-6">
         <h3 className="text-lg font-semibold mb-4">Available Reports</h3>
         <div className="space-y-3">
           {reports.map((report) => (
             <div
               key={report.name}
               className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/50 transition-colors"
             >
               <div className="flex items-center gap-4">
                 <div className="p-2 rounded-lg bg-primary/10">
                   <FileText className="w-5 h-5 text-primary" />
                 </div>
                 <div>
                   <p className="font-medium">{report.name}</p>
                   <p className="text-sm text-muted-foreground">
                     {report.type} • {report.size} • {report.date}
                   </p>
                 </div>
               </div>
               <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                 <Download className="w-5 h-5 text-primary" />
               </button>
             </div>
           ))}
         </div>
       </div>
     </div>
   );
 }