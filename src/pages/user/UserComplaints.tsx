import { useState } from "react";
import { Search, Filter, Eye } from "lucide-react";
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

const myComplaints = [
  { id: "CMP-101", category: "Roads", area: "Sector 12", status: "pending" as const, date: "2025-02-04", description: "Pothole on Main Street near school", lastUpdate: "Under review by Public Works dept." },
  { id: "CMP-098", category: "Water", area: "Zone A", status: "active" as const, date: "2025-02-02", description: "Low water pressure in morning hours", lastUpdate: "Technician dispatched to area." },
  { id: "CMP-085", category: "Electricity", area: "Block 5", status: "resolved" as const, date: "2025-01-28", description: "Street light not working", lastUpdate: "Light replaced on 2025-01-30." },
  { id: "CMP-072", category: "Waste", area: "Market Area", status: "resolved" as const, date: "2025-01-20", description: "Garbage not collected for 2 days", lastUpdate: "Collection schedule restored." },
  { id: "CMP-065", category: "Traffic", area: "Downtown", status: "closed" as const, date: "2025-01-15", description: "Traffic signal malfunction at intersection", lastUpdate: "Signal repaired and tested." },
];

export default function UserComplaints() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState<typeof myComplaints[0] | null>(null);

  const filteredComplaints = myComplaints.filter((c) => {
    const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Complaints</h1>
        <p className="text-muted-foreground">View and track all your submitted complaints</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by ID, category, or description..."
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
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Complaint Cards */}
      <div className="space-y-3">
        {filteredComplaints.map((complaint) => (
          <div
            key={complaint.id}
            className="glass-card p-5 hover:border-primary/30 transition-all cursor-pointer"
            onClick={() => setSelectedComplaint(complaint)}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-primary font-medium">{complaint.id}</span>
                  <StatusBadge status={complaint.status} />
                </div>
                <p className="font-medium">{complaint.description}</p>
                <p className="text-sm text-muted-foreground">{complaint.category} · {complaint.area} · {complaint.date}</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors" title="View Details">
                <Eye className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Last Update: </span>
                {complaint.lastUpdate}
              </p>
            </div>
          </div>
        ))}
        {filteredComplaints.length === 0 && (
          <div className="glass-card p-12 text-center">
            <p className="text-muted-foreground">No complaints found matching your search.</p>
          </div>
        )}
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
                  <p className="text-sm text-muted-foreground">Date Filed</p>
                  <p className="font-medium">{selectedComplaint.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{selectedComplaint.status}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium">{selectedComplaint.description}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Latest Update</p>
                <p className="font-medium">{selectedComplaint.lastUpdate}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
