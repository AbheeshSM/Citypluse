 import { useState } from "react";
 import { Search, Filter, Eye, UserCheck, CheckCircle, X } from "lucide-react";
 import { StatusBadge } from "@/components/dashboard/StatusBadge";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from "@/components/ui/dialog";
 
 const complaints = [
   { id: "CMP-001", category: "Roads", area: "Sector 12", status: "pending" as const, department: "Public Works", date: "2025-02-04", description: "Large pothole causing traffic issues on Main Street" },
   { id: "CMP-002", category: "Water", area: "Zone A", status: "resolved" as const, department: "Water Dept", date: "2025-02-03", description: "Low water pressure in residential area" },
   { id: "CMP-003", category: "Electricity", area: "Block 5", status: "urgent" as const, department: "Power Grid", date: "2025-02-04", description: "Complete power outage affecting 200+ homes" },
   { id: "CMP-004", category: "Waste", area: "Market Area", status: "active" as const, department: "Sanitation", date: "2025-02-02", description: "Garbage not collected for 3 days" },
   { id: "CMP-005", category: "Roads", area: "Highway 5", status: "resolved" as const, department: "Traffic Dept", date: "2025-02-01", description: "Broken street lights near intersection" },
   { id: "CMP-006", category: "Water", area: "Sector 8", status: "pending" as const, department: "Water Dept", date: "2025-02-04", description: "Sewage overflow in residential street" },
   { id: "CMP-007", category: "Parks", area: "Central Park", status: "closed" as const, department: "Parks & Rec", date: "2025-01-28", description: "Damaged playground equipment" },
   { id: "CMP-008", category: "Traffic", area: "Downtown", status: "active" as const, department: "Traffic Dept", date: "2025-02-03", description: "Traffic signal malfunction at busy intersection" },
 ];
 
 export default function Complaints() {
   const [searchQuery, setSearchQuery] = useState("");
   const [statusFilter, setStatusFilter] = useState("all");
   const [selectedComplaint, setSelectedComplaint] = useState<typeof complaints[0] | null>(null);
 
   const filteredComplaints = complaints.filter((c) => {
     const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
       c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
       c.area.toLowerCase().includes(searchQuery.toLowerCase());
     const matchesStatus = statusFilter === "all" || c.status === statusFilter;
     return matchesSearch && matchesStatus;
   });
 
   return (
     <div className="space-y-6">
       <div>
         <h1 className="text-2xl font-bold">Citizen Complaints</h1>
         <p className="text-muted-foreground">Manage and track all citizen complaints</p>
       </div>
 
       {/* Filters */}
       <div className="flex flex-col sm:flex-row gap-4">
         <div className="relative flex-1">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
           <input
             type="text"
             placeholder="Search by ID, category, or area..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full input-glass pl-12"
           />
         </div>
         <div className="flex items-center gap-2">
           <Filter className="w-5 h-5 text-muted-foreground" />
           <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
               <SelectItem value="all">All Status</SelectItem>
               <SelectItem value="pending">Pending</SelectItem>
               <SelectItem value="active">Active</SelectItem>
               <SelectItem value="resolved">Resolved</SelectItem>
               <SelectItem value="urgent">Urgent</SelectItem>
               <SelectItem value="closed">Closed</SelectItem>
             </SelectContent>
           </Select>
         </div>
       </div>
 
       {/* Table */}
       <div className="glass-card overflow-hidden">
         <div className="overflow-x-auto">
           <table className="w-full">
             <thead>
               <tr className="border-b border-border bg-muted/30">
                 <th className="text-left py-4 px-6 font-semibold text-sm">ID</th>
                 <th className="text-left py-4 px-6 font-semibold text-sm">Category</th>
                 <th className="text-left py-4 px-6 font-semibold text-sm">Area</th>
                 <th className="text-left py-4 px-6 font-semibold text-sm">Status</th>
                 <th className="text-left py-4 px-6 font-semibold text-sm">Department</th>
                 <th className="text-left py-4 px-6 font-semibold text-sm">Date</th>
                 <th className="text-left py-4 px-6 font-semibold text-sm">Actions</th>
               </tr>
             </thead>
             <tbody>
               {filteredComplaints.map((complaint) => (
                 <tr
                   key={complaint.id}
                   className="table-row cursor-pointer"
                   onClick={() => setSelectedComplaint(complaint)}
                 >
                   <td className="py-4 px-6 font-mono text-sm text-primary">{complaint.id}</td>
                   <td className="py-4 px-6">{complaint.category}</td>
                   <td className="py-4 px-6 text-muted-foreground">{complaint.area}</td>
                   <td className="py-4 px-6">
                     <StatusBadge status={complaint.status} />
                   </td>
                   <td className="py-4 px-6 text-muted-foreground">{complaint.department}</td>
                   <td className="py-4 px-6 text-muted-foreground">{complaint.date}</td>
                   <td className="py-4 px-6">
                     <div className="flex items-center gap-2">
                       <button className="p-2 rounded-lg hover:bg-muted transition-colors" title="View">
                         <Eye className="w-4 h-4 text-muted-foreground" />
                       </button>
                       <button className="p-2 rounded-lg hover:bg-muted transition-colors" title="Assign">
                         <UserCheck className="w-4 h-4 text-info" />
                       </button>
                       <button className="p-2 rounded-lg hover:bg-muted transition-colors" title="Resolve">
                         <CheckCircle className="w-4 h-4 text-success" />
                       </button>
                     </div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
 
       {/* Detail Dialog */}
       <Dialog open={!!selectedComplaint} onOpenChange={() => setSelectedComplaint(null)}>
         <DialogContent className="glass-card border-glass-border max-w-lg">
           <DialogHeader>
             <DialogTitle className="flex items-center justify-between">
               <span>Complaint {selectedComplaint?.id}</span>
               <StatusBadge status={selectedComplaint?.status || "pending"} />
             </DialogTitle>
           </DialogHeader>
           {selectedComplaint && (
             <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <p className="text-sm text-muted-foreground">Category</p>
                   <p className="font-medium">{selectedComplaint.category}</p>
                 </div>
                 <div>
                   <p className="text-sm text-muted-foreground">Area</p>
                   <p className="font-medium">{selectedComplaint.area}</p>
                 </div>
                 <div>
                   <p className="text-sm text-muted-foreground">Department</p>
                   <p className="font-medium">{selectedComplaint.department}</p>
                 </div>
                 <div>
                   <p className="text-sm text-muted-foreground">Date</p>
                   <p className="font-medium">{selectedComplaint.date}</p>
                 </div>
               </div>
               <div>
                 <p className="text-sm text-muted-foreground">Description</p>
                 <p className="font-medium">{selectedComplaint.description}</p>
               </div>
               <div className="flex gap-3 pt-4">
                 <button className="flex-1 btn-primary text-sm py-2">Assign Officer</button>
                 <button className="flex-1 btn-ghost text-sm py-2">Mark Resolved</button>
               </div>
             </div>
           )}
         </DialogContent>
       </Dialog>
     </div>
   );
 }