import { MessageSquare, Trash2, Car, Droplets, Siren } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";
 
 const activities = [
   {
     id: 1,
     type: "complaint",
     icon: MessageSquare,
     title: "New complaint registered",
     description: "Pothole on Main Street reported by citizen",
     time: "2 minutes ago",
     status: "pending" as const,
   },
   {
     id: 2,
     type: "waste",
     icon: Trash2,
     title: "Waste collection completed",
     description: "Zone A collection route finished",
     time: "15 minutes ago",
     status: "resolved" as const,
   },
   {
     id: 3,
     type: "traffic",
     icon: Car,
     title: "Traffic incident reported",
     description: "Accident on Highway 5, emergency services dispatched",
     time: "32 minutes ago",
     status: "urgent" as const,
   },
   {
     id: 4,
     type: "utilities",
     icon: Droplets,
     title: "Water supply restored",
     description: "Sector 12 water supply back online",
     time: "1 hour ago",
     status: "resolved" as const,
   },
   {
     id: 5,
     type: "emergency",
     icon: Siren,
     title: "Emergency response completed",
     description: "Fire brigade returned from Zone B",
     time: "2 hours ago",
     status: "resolved" as const,
   },
 ];
 
 export function RecentActivity() {
   return (
     <div className="glass-card p-6">
       <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
       <div className="space-y-4">
          {activities.map((activity, index) => {
            const iconColors = [
              "bg-primary/15 text-primary",
              "bg-success/15 text-success",
              "bg-accent/15 text-accent",
              "bg-info/15 text-info",
              "bg-warning/15 text-warning",
            ];
            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <div className={cn("p-2 rounded-lg", iconColors[index % iconColors.length])}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium truncate">{activity.title}</p>
                    <StatusBadge status={activity.status} />
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })}
       </div>
     </div>
   );
 }