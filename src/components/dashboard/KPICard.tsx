 import { LucideIcon } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 interface KPICardProps {
   title: string;
   value: string | number;
   change?: string;
   changeType?: "positive" | "negative" | "neutral";
   icon: LucideIcon;
   iconColor?: string;
 }
 
 export function KPICard({ title, value, change, changeType = "neutral", icon: Icon, iconColor }: KPICardProps) {
   return (
     <div className="kpi-card group">
       <div className="flex items-start justify-between">
         <div className="space-y-2">
           <p className="text-sm text-muted-foreground">{title}</p>
           <p className="text-3xl font-bold tracking-tight">{value}</p>
           {change && (
             <p
               className={cn(
                 "text-sm font-medium",
                 changeType === "positive" && "text-success",
                 changeType === "negative" && "text-destructive",
                 changeType === "neutral" && "text-muted-foreground"
               )}
             >
               {change}
             </p>
           )}
         </div>
         <div
           className={cn(
             "p-3 rounded-xl transition-transform group-hover:scale-110",
             iconColor || "bg-primary/10"
           )}
         >
           <Icon className={cn("w-6 h-6", iconColor ? "text-current" : "text-primary")} />
         </div>
       </div>
     </div>
   );
 }