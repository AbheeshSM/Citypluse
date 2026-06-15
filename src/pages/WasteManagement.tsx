 import { MapPin, Trash2, Clock, TrendingUp } from "lucide-react";
 import { StatusBadge } from "@/components/dashboard/StatusBadge";
 
 const wasteBins = [
   { id: 1, area: "Sector 12", fillLevel: 85, status: "urgent" as const, lastCollection: "2 days ago", nextCollection: "Today 2:00 PM" },
   { id: 2, area: "Zone A - Market", fillLevel: 45, status: "active" as const, lastCollection: "1 day ago", nextCollection: "Tomorrow 8:00 AM" },
   { id: 3, area: "Block 5 Residential", fillLevel: 20, status: "resolved" as const, lastCollection: "Today 6:00 AM", nextCollection: "In 2 days" },
   { id: 4, area: "Downtown Central", fillLevel: 92, status: "urgent" as const, lastCollection: "3 days ago", nextCollection: "Today 10:00 AM" },
   { id: 5, area: "Industrial Area", fillLevel: 60, status: "pending" as const, lastCollection: "1 day ago", nextCollection: "Today 4:00 PM" },
   { id: 6, area: "Highway Rest Stop", fillLevel: 30, status: "resolved" as const, lastCollection: "Today 7:00 AM", nextCollection: "In 2 days" },
 ];
 
 const schedule = [
   { route: "Route A", areas: "Sectors 1-5", time: "6:00 AM", status: "Completed" },
   { route: "Route B", areas: "Sectors 6-10", time: "8:00 AM", status: "In Progress" },
   { route: "Route C", areas: "Sectors 11-15", time: "10:00 AM", status: "Scheduled" },
   { route: "Route D", areas: "Commercial Zone", time: "2:00 PM", status: "Scheduled" },
   { route: "Route E", areas: "Industrial Area", time: "4:00 PM", status: "Scheduled" },
 ];
 
 export default function WasteManagement() {
   const getFillLevelColor = (level: number) => {
     if (level >= 80) return "bg-destructive";
     if (level >= 50) return "bg-warning";
     return "bg-success";
   };
 
   return (
     <div className="space-y-6">
       <div>
         <h1 className="text-2xl font-bold">Waste Management</h1>
         <p className="text-muted-foreground">Monitor waste bins and collection schedules</p>
       </div>
 
       {/* Stats */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-3 rounded-xl bg-primary/10">
               <Trash2 className="w-6 h-6 text-primary" />
             </div>
             <div>
               <p className="text-2xl font-bold">248</p>
               <p className="text-sm text-muted-foreground">Total Bins</p>
             </div>
           </div>
         </div>
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-3 rounded-xl bg-warning/10">
               <TrendingUp className="w-6 h-6 text-warning" />
             </div>
             <div>
               <p className="text-2xl font-bold">32</p>
               <p className="text-sm text-muted-foreground">Needs Collection</p>
             </div>
           </div>
         </div>
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-3 rounded-xl bg-success/10">
               <Clock className="w-6 h-6 text-success" />
             </div>
             <div>
               <p className="text-2xl font-bold">5</p>
               <p className="text-sm text-muted-foreground">Routes Active</p>
             </div>
           </div>
         </div>
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-3 rounded-xl bg-info/10">
               <MapPin className="w-6 h-6 text-info" />
             </div>
             <div>
               <p className="text-2xl font-bold">12</p>
               <p className="text-sm text-muted-foreground">Zones Covered</p>
             </div>
           </div>
         </div>
       </div>
 
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Map Placeholder */}
         <div className="lg:col-span-2 glass-card p-6">
           <h3 className="text-lg font-semibold mb-4">Collection Map</h3>
           <div className="aspect-video rounded-lg bg-muted/50 border border-border flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNMjAgMjBtLTIgMGEyIDIgMCAxIDAgNCAwYTIgMiAwIDEgMCAtNCAwIiBmaWxsPSIjMjA5OTkwIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvZz48L3N2Zz4=')] opacity-30" />
             <div className="text-center z-10">
               <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
               <p className="text-muted-foreground">Interactive Map View</p>
               <p className="text-sm text-muted-foreground">Real-time bin locations & routes</p>
             </div>
             {/* Floating markers */}
             <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-success animate-pulse" />
             <div className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-warning animate-pulse" />
             <div className="absolute bottom-1/4 right-1/4 w-4 h-4 rounded-full bg-destructive animate-pulse" />
           </div>
         </div>
 
         {/* Schedule */}
         <div className="glass-card p-6">
           <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
           <div className="space-y-3">
             {schedule.map((item) => (
               <div key={item.route} className="p-3 rounded-lg bg-muted/30 border border-border">
                 <div className="flex items-center justify-between mb-1">
                   <span className="font-medium text-primary">{item.route}</span>
                   <span className="text-xs text-muted-foreground">{item.time}</span>
                 </div>
                 <p className="text-sm text-muted-foreground">{item.areas}</p>
                 <span className={`text-xs ${item.status === "Completed" ? "text-success" : item.status === "In Progress" ? "text-info" : "text-muted-foreground"}`}>
                   {item.status}
                 </span>
               </div>
             ))}
           </div>
         </div>
       </div>
 
       {/* Bin Cards */}
       <div>
         <h3 className="text-lg font-semibold mb-4">Waste Bin Status</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {wasteBins.map((bin) => (
             <div key={bin.id} className="glass-card p-5 hover:border-primary/50 transition-all">
               <div className="flex items-start justify-between mb-4">
                 <div>
                   <h4 className="font-semibold">{bin.area}</h4>
                   <p className="text-sm text-muted-foreground">Bin #{bin.id}</p>
                 </div>
                 <StatusBadge status={bin.status} />
               </div>
               <div className="space-y-3">
                 <div>
                   <div className="flex items-center justify-between text-sm mb-1">
                     <span className="text-muted-foreground">Fill Level</span>
                     <span className="font-medium">{bin.fillLevel}%</span>
                   </div>
                   <div className="h-2 rounded-full bg-muted overflow-hidden">
                     <div
                       className={`h-full rounded-full transition-all ${getFillLevelColor(bin.fillLevel)}`}
                       style={{ width: `${bin.fillLevel}%` }}
                     />
                   </div>
                 </div>
                 <div className="flex items-center justify-between text-sm">
                   <span className="text-muted-foreground">Last Collection</span>
                   <span>{bin.lastCollection}</span>
                 </div>
                 <div className="flex items-center justify-between text-sm">
                   <span className="text-muted-foreground">Next Collection</span>
                   <span className="text-primary">{bin.nextCollection}</span>
                 </div>
               </div>
             </div>
           ))}
         </div>
       </div>
     </div>
   );
 }