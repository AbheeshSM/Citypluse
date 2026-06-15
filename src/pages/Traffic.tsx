import { Car, AlertTriangle, MapPin, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { useThemeChartStyles } from "@/hooks/use-chart-styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
 
 const congestionData = [
   { zone: "Downtown", level: 85, change: "+12%" },
   { zone: "Highway 5", level: 72, change: "+5%" },
   { zone: "Sector 12", level: 45, change: "-8%" },
   { zone: "Industrial", level: 30, change: "-15%" },
   { zone: "Suburbs", level: 25, change: "-3%" },
 ];
 
 const hourlyData = [
   { hour: "6AM", traffic: 30 },
   { hour: "8AM", traffic: 85 },
   { hour: "10AM", traffic: 60 },
   { hour: "12PM", traffic: 55 },
   { hour: "2PM", traffic: 50 },
   { hour: "4PM", traffic: 70 },
   { hour: "6PM", traffic: 90 },
   { hour: "8PM", traffic: 45 },
 ];
 
 const incidents = [
   { id: 1, type: "Accident", location: "Highway 5, KM 23", time: "10 min ago", status: "urgent" as const, responders: "Police, Ambulance" },
   { id: 2, type: "Road Work", location: "Main Street", time: "2 hours ago", status: "active" as const, responders: "Traffic Control" },
   { id: 3, type: "Vehicle Breakdown", location: "Ring Road Exit 4", time: "25 min ago", status: "pending" as const, responders: "Tow Truck" },
   { id: 4, type: "Signal Malfunction", location: "Downtown Crossing", time: "1 hour ago", status: "resolved" as const, responders: "Maintenance" },
 ];
 
 const roadStatus = [
   { road: "Highway 5", status: "Heavy Traffic", delay: "15 min" },
   { road: "Ring Road", status: "Moderate", delay: "5 min" },
   { road: "Main Street", status: "Road Work", delay: "10 min" },
   { road: "Downtown Area", status: "Congested", delay: "20 min" },
   { road: "Industrial Road", status: "Clear", delay: "0 min" },
 ];
 
export default function Traffic() {
    const chartStyles = useThemeChartStyles();
    const getCongestionColor = (level: number) => {
     if (level >= 70) return "bg-destructive";
     if (level >= 40) return "bg-warning";
     return "bg-success";
   };
 
   return (
     <div className="space-y-6">
       <div>
         <h1 className="text-2xl font-bold">Traffic & Transport</h1>
         <p className="text-muted-foreground">Real-time traffic monitoring and incident management</p>
       </div>
 
       {/* Stats */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-3 rounded-xl bg-primary/10">
               <Car className="w-6 h-6 text-primary" />
             </div>
             <div>
               <p className="text-2xl font-bold">52%</p>
               <p className="text-sm text-muted-foreground">Avg. Congestion</p>
             </div>
           </div>
         </div>
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-3 rounded-xl bg-destructive/10">
               <AlertTriangle className="w-6 h-6 text-destructive" />
             </div>
             <div>
               <p className="text-2xl font-bold">4</p>
               <p className="text-sm text-muted-foreground">Active Incidents</p>
             </div>
           </div>
         </div>
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-3 rounded-xl bg-info/10">
               <MapPin className="w-6 h-6 text-info" />
             </div>
             <div>
               <p className="text-2xl font-bold">156</p>
               <p className="text-sm text-muted-foreground">Traffic Signals</p>
             </div>
           </div>
         </div>
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-3 rounded-xl bg-success/10">
               <Clock className="w-6 h-6 text-success" />
             </div>
             <div>
               <p className="text-2xl font-bold">12 min</p>
               <p className="text-sm text-muted-foreground">Avg. Response Time</p>
             </div>
           </div>
         </div>
       </div>
 
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Congestion by Zone */}
         <div className="glass-card p-6">
           <h3 className="text-lg font-semibold mb-4">Congestion by Zone</h3>
           <div className="space-y-4">
             {congestionData.map((zone) => (
               <div key={zone.zone} className="space-y-2">
                 <div className="flex items-center justify-between">
                   <span className="font-medium">{zone.zone}</span>
                   <div className="flex items-center gap-2">
                     <span className="text-sm font-medium">{zone.level}%</span>
                     <span className={`text-xs flex items-center gap-1 ${zone.change.startsWith("+") ? "text-destructive" : "text-success"}`}>
                       {zone.change.startsWith("+") ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                       {zone.change}
                     </span>
                   </div>
                 </div>
                 <div className="h-2 rounded-full bg-muted overflow-hidden">
                   <div
                     className={`h-full rounded-full transition-all ${getCongestionColor(zone.level)}`}
                     style={{ width: `${zone.level}%` }}
                   />
                 </div>
               </div>
             ))}
           </div>
         </div>
 
         {/* Hourly Traffic */}
         <div className="glass-card p-6">
           <h3 className="text-lg font-semibold mb-4">Today's Traffic Pattern</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.grid} />
                  <XAxis dataKey="hour" stroke={chartStyles.text} fontSize={12} />
                  <YAxis stroke={chartStyles.text} fontSize={12} />
                  <Tooltip contentStyle={chartStyles.tooltip} />
                 <Bar
                   dataKey="traffic"
                   fill="hsl(174, 72%, 46%)"
                   radius={[4, 4, 0, 0]}
                 />
               </BarChart>
             </ResponsiveContainer>
           </div>
         </div>
       </div>
 
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Incidents */}
         <div className="glass-card p-6">
           <h3 className="text-lg font-semibold mb-4">Active Incidents</h3>
           <div className="space-y-3">
             {incidents.map((incident) => (
               <div key={incident.id} className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/50 transition-colors">
                 <div className="flex items-start justify-between mb-2">
                   <div className="flex items-center gap-2">
                     <AlertTriangle className="w-4 h-4 text-warning" />
                     <span className="font-medium">{incident.type}</span>
                   </div>
                   <StatusBadge status={incident.status} />
                 </div>
                 <p className="text-sm text-muted-foreground mb-1">{incident.location}</p>
                 <div className="flex items-center justify-between text-xs">
                   <span className="text-muted-foreground">{incident.time}</span>
                   <span className="text-primary">{incident.responders}</span>
                 </div>
               </div>
             ))}
           </div>
         </div>
 
         {/* Road Status */}
         <div className="glass-card p-6">
           <h3 className="text-lg font-semibold mb-4">Road Status</h3>
           <div className="overflow-x-auto">
             <table className="w-full">
               <thead>
                 <tr className="border-b border-border">
                   <th className="text-left py-3 text-sm font-semibold">Road</th>
                   <th className="text-left py-3 text-sm font-semibold">Status</th>
                   <th className="text-right py-3 text-sm font-semibold">Delay</th>
                 </tr>
               </thead>
               <tbody>
                 {roadStatus.map((road) => (
                   <tr key={road.road} className="border-b border-border/50">
                     <td className="py-3">{road.road}</td>
                     <td className="py-3">
                       <span className={`text-sm ${road.status === "Clear" ? "text-success" : road.status === "Moderate" ? "text-warning" : "text-destructive"}`}>
                         {road.status}
                       </span>
                     </td>
                     <td className="py-3 text-right text-muted-foreground">{road.delay}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
       </div>
     </div>
   );
 }