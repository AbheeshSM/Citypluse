import { useState } from "react";
import { Search, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

const trackingData: Record<string, {
  id: string;
  category: string;
  area: string;
  status: "pending" | "active" | "resolved" | "urgent" | "closed";
  description: string;
  date: string;
  timeline: { date: string; event: string; status: string }[];
}> = {
  "CMP-101": {
    id: "CMP-101",
    category: "Roads",
    area: "Sector 12",
    status: "active",
    description: "Pothole on Main Street near school",
    date: "2025-02-04",
    timeline: [
      { date: "2025-02-04", event: "Complaint submitted", status: "Received" },
      { date: "2025-02-04", event: "Assigned to Public Works Department", status: "Assigned" },
      { date: "2025-02-05", event: "Site inspection scheduled", status: "In Progress" },
    ],
  },
  "CMP-098": {
    id: "CMP-098",
    category: "Water",
    area: "Zone A",
    status: "active",
    description: "Low water pressure in morning hours",
    date: "2025-02-02",
    timeline: [
      { date: "2025-02-02", event: "Complaint submitted", status: "Received" },
      { date: "2025-02-03", event: "Forwarded to Water Supply department", status: "Assigned" },
      { date: "2025-02-04", event: "Technician dispatched", status: "In Progress" },
    ],
  },
  "CMP-085": {
    id: "CMP-085",
    category: "Electricity",
    area: "Block 5",
    status: "resolved",
    description: "Street light not working",
    date: "2025-01-28",
    timeline: [
      { date: "2025-01-28", event: "Complaint submitted", status: "Received" },
      { date: "2025-01-28", event: "Assigned to Electrical department", status: "Assigned" },
      { date: "2025-01-29", event: "Repair crew dispatched", status: "In Progress" },
      { date: "2025-01-30", event: "Light replaced and tested", status: "Resolved" },
    ],
  },
};

export default function TrackComplaint() {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState<typeof trackingData[string] | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = trackingData[trackingId.toUpperCase()];
    if (found) {
      setResult(found);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Track Complaint</h1>
        <p className="text-muted-foreground">Enter your complaint ID to see its current status</p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="glass-card p-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Enter Complaint ID (e.g., CMP-101)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="w-full input-glass pl-12"
            />
          </div>
          <button type="submit" className="btn-primary flex items-center gap-2 text-sm">
            <ArrowRight className="w-4 h-4" />
            Track
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Try: CMP-101, CMP-098, or CMP-085
        </p>
      </form>

      {/* Not Found */}
      {notFound && (
        <div className="glass-card p-8 text-center animate-fade-in">
          <AlertCircle className="w-12 h-12 text-warning mx-auto mb-3" />
          <h3 className="font-semibold text-lg mb-1">Complaint Not Found</h3>
          <p className="text-muted-foreground text-sm">
            No complaint found with ID "{trackingId}". Please check and try again.
          </p>
        </div>
      )}

      {/* Tracking Result */}
      {result && (
        <div className="space-y-4 animate-slide-up">
          {/* Complaint Info */}
          <div className="glass-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-lg text-primary font-bold">{result.id}</span>
                  <StatusBadge status={result.status} />
                </div>
                <p className="font-medium">{result.description}</p>
                <p className="text-sm text-muted-foreground mt-1">{result.category} · {result.area} · Filed on {result.date}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6">Progress Timeline</h3>
            <div className="relative">
              {result.timeline.map((item, index) => {
                const isLast = index === result.timeline.length - 1;
                const isResolved = item.status === "Resolved";
                return (
                  <div key={index} className="flex gap-4 mb-6 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        isResolved
                          ? "bg-success/20 text-success"
                          : isLast
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {isResolved ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                      {!isLast && (
                        <div className="w-0.5 h-full bg-border mt-2 min-h-[20px]" />
                      )}
                    </div>
                    <div className="pt-2">
                      <p className="font-medium text-sm">{item.event}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.date} · {item.status}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
