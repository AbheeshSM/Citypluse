 import { cn } from "@/lib/utils";
 
 type StatusType = "resolved" | "pending" | "urgent" | "active" | "closed";
 
 interface StatusBadgeProps {
   status: StatusType;
   label?: string;
 }
 
 const statusConfig: Record<StatusType, { label: string; className: string }> = {
   resolved: { label: "Resolved", className: "status-resolved" },
   pending: { label: "Pending", className: "status-pending" },
   urgent: { label: "Urgent", className: "status-urgent" },
   active: { label: "Active", className: "status-active" },
   closed: { label: "Closed", className: "bg-muted text-muted-foreground border-muted" },
 };
 
 export function StatusBadge({ status, label }: StatusBadgeProps) {
   const config = statusConfig[status];
   return (
     <span className={cn("badge", config.className)}>
       {label || config.label}
     </span>
   );
 }