 import { Siren, Phone, Flame, Shield, Heart, Clock, MapPin, Users } from "lucide-react";
 import { StatusBadge } from "@/components/dashboard/StatusBadge";
 
 const emergencyRequests = [
   { id: "EMR-001", type: "Medical", icon: Heart, location: "Sector 12, Block A", time: "5 min ago", status: "urgent" as const, priority: "Critical", responder: "Ambulance Unit 3" },
   { id: "EMR-002", type: "Fire", icon: Flame, location: "Industrial Zone", time: "12 min ago", status: "active" as const, priority: "High", responder: "Fire Station 2" },
   { id: "EMR-003", type: "Police", icon: Shield, location: "Downtown Market", time: "20 min ago", status: "active" as const, priority: "Medium", responder: "Patrol Unit 7" },
   { id: "EMR-004", type: "Medical", icon: Heart, location: "Highway 5", time: "35 min ago", status: "resolved" as const, priority: "High", responder: "Ambulance Unit 1" },
   { id: "EMR-005", type: "Fire", icon: Flame, location: "Residential Block 8", time: "1 hour ago", status: "resolved" as const, priority: "Medium", responder: "Fire Station 1" },
   { id: "EMR-006", type: "Police", icon: Shield, location: "Central Park", time: "2 hours ago", status: "closed" as const, priority: "Low", responder: "Patrol Unit 3" },
 ];
 
 const services = [
   { name: "Ambulance", icon: Heart, color: "bg-destructive/10 text-destructive", available: 8, total: 12, activeNow: 4 },
   { name: "Fire Brigade", icon: Flame, color: "bg-warning/10 text-warning", available: 6, total: 8, activeNow: 2 },
   { name: "Police", icon: Shield, color: "bg-info/10 text-info", available: 24, total: 30, activeNow: 6 },
 ];
 
 export default function Emergency() {
   const getPriorityColor = (priority: string) => {
     switch (priority) {
       case "Critical": return "text-destructive";
       case "High": return "text-warning";
       case "Medium": return "text-info";
       default: return "text-muted-foreground";
     }
   };
 
   return (
     <div className="space-y-6">
       <div className="flex items-center justify-between">
         <div>
           <h1 className="text-2xl font-bold">Emergency Services</h1>
           <p className="text-muted-foreground">Manage emergency requests and dispatch services</p>
         </div>
         <button className="btn-primary flex items-center gap-2">
           <Phone className="w-5 h-5" />
           Emergency Dispatch
         </button>
       </div>
 
       {/* Service Stats */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {services.map((service) => (
           <div key={service.name} className="glass-card p-6">
             <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3">
                 <div className={`p-3 rounded-xl ${service.color}`}>
                   <service.icon className="w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="font-semibold">{service.name}</h3>
                   <p className="text-sm text-muted-foreground">Active: {service.activeNow}</p>
                 </div>
               </div>
               <div className="text-right">
                 <p className="text-2xl font-bold text-success">{service.available}</p>
                 <p className="text-xs text-muted-foreground">Available</p>
               </div>
             </div>
             <div className="space-y-2">
               <div className="flex justify-between text-sm">
                 <span className="text-muted-foreground">Fleet Status</span>
                 <span>{service.available}/{service.total} units</span>
               </div>
               <div className="h-2 rounded-full bg-muted overflow-hidden">
                 <div
                   className="h-full rounded-full bg-success transition-all"
                   style={{ width: `${(service.available / service.total) * 100}%` }}
                 />
               </div>
             </div>
           </div>
         ))}
       </div>
 
       {/* Quick Stats */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-2 rounded-lg bg-destructive/10">
               <Siren className="w-5 h-5 text-destructive" />
             </div>
             <div>
               <p className="text-xl font-bold">12</p>
               <p className="text-xs text-muted-foreground">Active Emergencies</p>
             </div>
           </div>
         </div>
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-2 rounded-lg bg-success/10">
               <Clock className="w-5 h-5 text-success" />
             </div>
             <div>
               <p className="text-xl font-bold">4 min</p>
               <p className="text-xs text-muted-foreground">Avg Response</p>
             </div>
           </div>
         </div>
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-2 rounded-lg bg-info/10">
               <MapPin className="w-5 h-5 text-info" />
             </div>
             <div>
               <p className="text-xl font-bold">8</p>
               <p className="text-xs text-muted-foreground">Stations</p>
             </div>
           </div>
         </div>
         <div className="kpi-card">
           <div className="flex items-center gap-3">
             <div className="p-2 rounded-lg bg-primary/10">
               <Users className="w-5 h-5 text-primary" />
             </div>
             <div>
               <p className="text-xl font-bold">156</p>
               <p className="text-xs text-muted-foreground">Personnel On Duty</p>
             </div>
           </div>
         </div>
       </div>
 
       {/* Emergency Requests */}
       <div className="glass-card p-6">
         <h3 className="text-lg font-semibold mb-4">Emergency Requests</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {emergencyRequests.map((request) => (
             <div
               key={request.id}
               className={`p-5 rounded-xl border transition-all hover:scale-[1.01] cursor-pointer ${
                 request.status === "urgent"
                   ? "bg-destructive/5 border-destructive/30"
                   : "bg-muted/30 border-border hover:border-primary/50"
               }`}
             >
               <div className="flex items-start justify-between mb-3">
                 <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-lg ${
                     request.type === "Medical" ? "bg-destructive/10" :
                     request.type === "Fire" ? "bg-warning/10" : "bg-info/10"
                   }`}>
                     <request.icon className={`w-5 h-5 ${
                       request.type === "Medical" ? "text-destructive" :
                       request.type === "Fire" ? "text-warning" : "text-info"
                     }`} />
                   </div>
                   <div>
                     <div className="flex items-center gap-2">
                       <span className="font-mono text-sm text-primary">{request.id}</span>
                       <span className={`text-xs font-medium ${getPriorityColor(request.priority)}`}>
                         {request.priority}
                       </span>
                     </div>
                     <p className="font-medium">{request.type} Emergency</p>
                   </div>
                 </div>
                 <StatusBadge status={request.status} />
               </div>
               <div className="space-y-2 text-sm">
                 <div className="flex items-center gap-2 text-muted-foreground">
                   <MapPin className="w-4 h-4" />
                   {request.location}
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-muted-foreground">{request.time}</span>
                   <span className="text-primary text-xs">{request.responder}</span>
                 </div>
               </div>
               <div className="flex gap-2 mt-4">
                 <button className="flex-1 py-2 text-sm rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                   Track
                 </button>
                 <button className="flex-1 py-2 text-sm rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                   Details
                 </button>
               </div>
             </div>
           ))}
         </div>
       </div>
     </div>
   );
 }