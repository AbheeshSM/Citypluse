 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { MapPin, FileText, AlertCircle, Send, CheckCircle2 } from "lucide-react";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 
 export default function AddComplaint() {
   const navigate = useNavigate();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);
   const [formData, setFormData] = useState({
     type: "",
     priority: "",
     location: "",
     description: "",
   });
   const [errors, setErrors] = useState<Record<string, string>>({});
 
   const validate = () => {
     const newErrors: Record<string, string> = {};
     if (!formData.type) newErrors.type = "Please select a complaint type";
     if (!formData.priority) newErrors.priority = "Please select a priority";
     if (!formData.location) newErrors.location = "Location is required";
     if (!formData.description) newErrors.description = "Description is required";
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!validate()) return;
     
     setIsSubmitting(true);
     // Simulate API call
     setTimeout(() => {
       setIsSubmitting(false);
       setIsSuccess(true);
       setTimeout(() => {
         navigate("/complaints");
       }, 2000);
     }, 1500);
   };
 
   if (isSuccess) {
     return (
       <div className="flex items-center justify-center min-h-[60vh]">
         <div className="glass-card p-12 text-center animate-slide-up">
           <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
             <CheckCircle2 className="w-10 h-10 text-success" />
           </div>
           <h2 className="text-2xl font-bold mb-2">Complaint Submitted!</h2>
           <p className="text-muted-foreground">Your complaint has been registered successfully.</p>
           <p className="text-sm text-muted-foreground mt-2">Redirecting to complaints list...</p>
         </div>
       </div>
     );
   }
 
   return (
     <div className="max-w-2xl mx-auto space-y-6">
       <div>
         <h1 className="text-2xl font-bold">Add New Complaint</h1>
         <p className="text-muted-foreground">Register a new citizen complaint</p>
       </div>
 
       <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
         {/* Complaint Type */}
         <div className="space-y-2">
           <label className="text-sm font-medium flex items-center gap-2">
             <FileText className="w-4 h-4 text-primary" />
             Complaint Type
           </label>
           <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select complaint type" />
              </SelectTrigger>
              <SelectContent>
               <SelectItem value="roads">Roads & Infrastructure</SelectItem>
               <SelectItem value="water">Water Supply</SelectItem>
               <SelectItem value="electricity">Electricity</SelectItem>
               <SelectItem value="waste">Waste Management</SelectItem>
               <SelectItem value="traffic">Traffic Issues</SelectItem>
               <SelectItem value="parks">Parks & Recreation</SelectItem>
               <SelectItem value="other">Other</SelectItem>
             </SelectContent>
           </Select>
           {errors.type && (
             <p className="text-sm text-destructive flex items-center gap-1">
               <AlertCircle className="w-4 h-4" />
               {errors.type}
             </p>
           )}
         </div>
 
         {/* Priority */}
         <div className="space-y-2">
           <label className="text-sm font-medium flex items-center gap-2">
             <AlertCircle className="w-4 h-4 text-primary" />
             Priority Level
           </label>
           <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
               <SelectItem value="low">Low - General Issue</SelectItem>
               <SelectItem value="medium">Medium - Needs Attention</SelectItem>
               <SelectItem value="high">High - Urgent</SelectItem>
               <SelectItem value="critical">Critical - Emergency</SelectItem>
             </SelectContent>
           </Select>
           {errors.priority && (
             <p className="text-sm text-destructive flex items-center gap-1">
               <AlertCircle className="w-4 h-4" />
               {errors.priority}
             </p>
           )}
         </div>
 
         {/* Location */}
         <div className="space-y-2">
           <label className="text-sm font-medium flex items-center gap-2">
             <MapPin className="w-4 h-4 text-primary" />
             Location
           </label>
           <input
             type="text"
             placeholder="Enter address or area name"
             value={formData.location}
             onChange={(e) => setFormData({ ...formData, location: e.target.value })}
             className="w-full input-glass"
           />
           {errors.location && (
             <p className="text-sm text-destructive flex items-center gap-1">
               <AlertCircle className="w-4 h-4" />
               {errors.location}
             </p>
           )}
         </div>
 
         {/* Description */}
         <div className="space-y-2">
           <label className="text-sm font-medium">Description</label>
           <textarea
             rows={4}
             placeholder="Describe the issue in detail..."
             value={formData.description}
             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
             className="w-full input-glass resize-none"
           />
           {errors.description && (
             <p className="text-sm text-destructive flex items-center gap-1">
               <AlertCircle className="w-4 h-4" />
               {errors.description}
             </p>
           )}
         </div>
 
         {/* Submit Button */}
         <button
           type="submit"
           disabled={isSubmitting}
           className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
         >
           {isSubmitting ? (
             <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
           ) : (
             <>
               <Send className="w-5 h-5" />
               Submit Complaint
             </>
           )}
         </button>
       </form>
     </div>
   );
 }