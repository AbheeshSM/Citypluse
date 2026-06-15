import { useState } from "react";
import { Droplets, Zap, AlertTriangle, TrendingUp, TrendingDown, Gauge } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { useThemeChartStyles } from "@/hooks/use-chart-styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
 
 const waterData = [
   { time: "00:00", usage: 45 },
   { time: "04:00", usage: 30 },
   { time: "08:00", usage: 85 },
   { time: "12:00", usage: 70 },
   { time: "16:00", usage: 60 },
   { time: "20:00", usage: 75 },
 ];
 
 const electricityData = [
   { time: "00:00", usage: 35 },
   { time: "04:00", usage: 25 },
   { time: "08:00", usage: 65 },
   { time: "12:00", usage: 80 },
   { time: "16:00", usage: 85 },
   { time: "20:00", usage: 70 },
 ];
 
 const areaStats = [
   { area: "Sector 1-5", waterUsage: "125K L", electricityUsage: "450 MWh", status: "Normal" },
   { area: "Sector 6-10", waterUsage: "98K L", electricityUsage: "380 MWh", status: "Normal" },
   { area: "Downtown", waterUsage: "210K L", electricityUsage: "720 MWh", status: "High Demand" },
   { area: "Industrial", waterUsage: "450K L", electricityUsage: "1.2 GWh", status: "Normal" },
   { area: "Suburbs", waterUsage: "180K L", electricityUsage: "520 MWh", status: "Low Supply" },
 ];
 
 const alerts = [
   { id: 1, type: "Water", message: "Low pressure detected in Sector 8", status: "urgent" as const, time: "15 min ago" },
   { id: 2, type: "Electricity", message: "Scheduled maintenance in Block 5", status: "pending" as const, time: "2 hours ago" },
   { id: 3, type: "Water", message: "Pipe repair completed in Zone A", status: "resolved" as const, time: "1 hour ago" },
   { id: 4, type: "Electricity", message: "Peak load warning - Downtown", status: "active" as const, time: "30 min ago" },
 ];
 
export default function Utilities() {
    const [activeTab, setActiveTab] = useState<"water" | "electricity">("water");
    const chartStyles = useThemeChartStyles();
 
   return (
     <div className="space-y-6">
       <div>
         <h1 className="text-2xl font-bold">Water & Electricity</h1>
         <p className="text-muted-foreground">Monitor utility usage and manage supply</p>
       </div>
 
       {/* Toggle */}
       <div className="glass-card p-1 inline-flex">
         <button
           onClick={() => setActiveTab("water")}
           className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
             activeTab === "water"
               ? "gradient-primary text-primary-foreground"
               : "text-muted-foreground hover:text-foreground"
           }`}
         >
           <Droplets className="w-5 h-5" />
           Water Supply
         </button>
         <button
           onClick={() => setActiveTab("electricity")}
           className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
             activeTab === "electricity"
               ? "gradient-primary text-primary-foreground"
               : "text-muted-foreground hover:text-foreground"
           }`}
         >
           <Zap className="w-5 h-5" />
           Electricity
         </button>
       </div>
 
       {/* Stats */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className={`p-3 rounded-xl ${activeTab === "water" ? "bg-info/10" : "bg-warning/10"}`}>
               {activeTab === "water" ? (
                 <Droplets className="w-6 h-6 text-info" />
               ) : (
                 <Zap className="w-6 h-6 text-warning" />
               )}
             </div>
             <div>
               <p className="text-2xl font-bold">{activeTab === "water" ? "1.2M L" : "3.5 GWh"}</p>
               <p className="text-sm text-muted-foreground">Today's Usage</p>
             </div>
           </div>
         </div>
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-3 rounded-xl bg-success/10">
               <TrendingDown className="w-6 h-6 text-success" />
             </div>
             <div>
               <p className="text-2xl font-bold">-8%</p>
               <p className="text-sm text-muted-foreground">vs. Yesterday</p>
             </div>
           </div>
         </div>
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-3 rounded-xl bg-primary/10">
               <Gauge className="w-6 h-6 text-primary" />
             </div>
             <div>
               <p className="text-2xl font-bold">92%</p>
               <p className="text-sm text-muted-foreground">Supply Capacity</p>
             </div>
           </div>
         </div>
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-3 rounded-xl bg-destructive/10">
               <AlertTriangle className="w-6 h-6 text-destructive" />
             </div>
             <div>
               <p className="text-2xl font-bold">2</p>
               <p className="text-sm text-muted-foreground">Active Alerts</p>
             </div>
           </div>
         </div>
       </div>
 
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Usage Chart */}
         <div className="lg:col-span-2 glass-card p-6">
           <h3 className="text-lg font-semibold mb-4">
             {activeTab === "water" ? "Water Usage Today" : "Electricity Usage Today"}
           </h3>
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeTab === "water" ? waterData : electricityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.grid} />
                  <XAxis dataKey="time" stroke={chartStyles.text} fontSize={12} />
                  <YAxis stroke={chartStyles.text} fontSize={12} />
                  <Tooltip contentStyle={chartStyles.tooltip} />
                 <Line
                   type="monotone"
                   dataKey="usage"
                   stroke={activeTab === "water" ? "hsl(199, 89%, 48%)" : "hsl(38, 92%, 50%)"}
                   strokeWidth={3}
                   dot={{ fill: activeTab === "water" ? "hsl(199, 89%, 48%)" : "hsl(38, 92%, 50%)", strokeWidth: 0 }}
                 />
               </LineChart>
             </ResponsiveContainer>
           </div>
         </div>
 
         {/* Alerts */}
         <div className="glass-card p-6">
           <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
           <div className="space-y-3">
             {alerts
               .filter((a) => activeTab === "water" ? a.type === "Water" : a.type === "Electricity")
               .map((alert) => (
                 <div key={alert.id} className="p-3 rounded-lg bg-muted/30 border border-border">
                   <div className="flex items-center justify-between mb-1">
                     <span className="font-medium text-sm">{alert.type}</span>
                     <StatusBadge status={alert.status} />
                   </div>
                   <p className="text-sm text-muted-foreground">{alert.message}</p>
                   <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                 </div>
               ))}
           </div>
         </div>
       </div>
 
       {/* Area Statistics */}
       <div className="glass-card p-6">
         <h3 className="text-lg font-semibold mb-4">Area-wise Statistics</h3>
         <div className="overflow-x-auto">
           <table className="w-full">
             <thead>
               <tr className="border-b border-border bg-muted/30">
                 <th className="text-left py-4 px-6 font-semibold text-sm">Area</th>
                 <th className="text-left py-4 px-6 font-semibold text-sm">Water Usage</th>
                 <th className="text-left py-4 px-6 font-semibold text-sm">Electricity Usage</th>
                 <th className="text-left py-4 px-6 font-semibold text-sm">Status</th>
               </tr>
             </thead>
             <tbody>
               {areaStats.map((stat) => (
                 <tr key={stat.area} className="table-row">
                   <td className="py-4 px-6 font-medium">{stat.area}</td>
                   <td className="py-4 px-6 text-info">{stat.waterUsage}</td>
                   <td className="py-4 px-6 text-warning">{stat.electricityUsage}</td>
                   <td className="py-4 px-6">
                     <span className={`text-sm ${stat.status === "Normal" ? "text-success" : stat.status === "High Demand" ? "text-warning" : "text-destructive"}`}>
                       {stat.status}
                     </span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
     </div>
   );
 }