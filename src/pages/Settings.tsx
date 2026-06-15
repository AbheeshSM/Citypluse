import { useState } from "react";
import { User, Lock, Bell, Palette, Save, Camera, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme, ACCENT_COLORS } from "@/hooks/use-theme";
 
export default function Settings() {
    const { theme, setTheme, accentColor, setAccentColor } = useTheme();
    const [activeTab, setActiveTab] = useState("profile");
   const [saved, setSaved] = useState(false);
   const [profile, setProfile] = useState({
     name: "Admin User",
     email: "admin@cityos.gov",
     phone: "+1 234 567 8900",
     department: "City Administration",
     role: "System Administrator",
   });
   const [notifications, setNotifications] = useState({
     email: true,
     push: true,
     sms: false,
     emergencyAlerts: true,
     dailyDigest: true,
   });
 
   const handleSave = () => {
     setSaved(true);
     setTimeout(() => setSaved(false), 2000);
   };
 
   const tabs = [
     { id: "profile", label: "Profile", icon: User },
     { id: "security", label: "Security", icon: Lock },
     { id: "notifications", label: "Notifications", icon: Bell },
     { id: "appearance", label: "Appearance", icon: Palette },
   ];
 
   return (
     <div className="space-y-6">
       <div>
         <h1 className="text-2xl font-bold">Settings</h1>
         <p className="text-muted-foreground">Manage your account and preferences</p>
       </div>
 
       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* Sidebar */}
         <div className="glass-card p-4">
           <nav className="space-y-1">
             {tabs.map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                   activeTab === tab.id
                     ? "bg-primary/10 text-primary"
                     : "text-muted-foreground hover:bg-muted hover:text-foreground"
                 }`}
               >
                 <tab.icon className="w-5 h-5" />
                 {tab.label}
               </button>
             ))}
           </nav>
         </div>
 
         {/* Content */}
         <div className="lg:col-span-3 glass-card p-6">
           {/* Profile Tab */}
           {activeTab === "profile" && (
             <div className="space-y-6">
               <h2 className="text-lg font-semibold">Profile Settings</h2>
               
               {/* Avatar */}
               <div className="flex items-center gap-6">
                 <div className="relative">
                   <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-3xl font-bold text-primary-foreground">
                     AU
                   </div>
                   <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground">
                     <Camera className="w-4 h-4" />
                   </button>
                 </div>
                 <div>
                   <p className="font-semibold text-lg">{profile.name}</p>
                   <p className="text-muted-foreground">{profile.role}</p>
                 </div>
               </div>
 
               {/* Form */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Full Name</label>
                   <input
                     type="text"
                     value={profile.name}
                     onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                     className="w-full input-glass"
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Email Address</label>
                   <input
                     type="email"
                     value={profile.email}
                     onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                     className="w-full input-glass"
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Phone Number</label>
                   <input
                     type="tel"
                     value={profile.phone}
                     onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                     className="w-full input-glass"
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Department</label>
                   <input
                     type="text"
                     value={profile.department}
                     onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                     className="w-full input-glass"
                   />
                 </div>
               </div>
 
               <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                 {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                 {saved ? "Saved!" : "Save Changes"}
               </button>
             </div>
           )}
 
           {/* Security Tab */}
           {activeTab === "security" && (
             <div className="space-y-6">
               <h2 className="text-lg font-semibold">Security Settings</h2>
 
               <div className="space-y-4">
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Current Password</label>
                   <input type="password" placeholder="••••••••" className="w-full input-glass max-w-md" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">New Password</label>
                   <input type="password" placeholder="••••••••" className="w-full input-glass max-w-md" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Confirm New Password</label>
                   <input type="password" placeholder="••••••••" className="w-full input-glass max-w-md" />
                 </div>
               </div>
 
               <div className="pt-4 border-t border-border">
                 <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                 <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 max-w-md">
                   <div>
                     <p className="font-medium">Enable 2FA</p>
                     <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                   </div>
                   <Switch />
                 </div>
               </div>
 
               <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                 {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                 {saved ? "Saved!" : "Update Password"}
               </button>
             </div>
           )}
 
           {/* Notifications Tab */}
           {activeTab === "notifications" && (
             <div className="space-y-6">
               <h2 className="text-lg font-semibold">Notification Preferences</h2>
 
               <div className="space-y-4 max-w-md">
                 <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                   <div>
                     <p className="font-medium">Email Notifications</p>
                     <p className="text-sm text-muted-foreground">Receive updates via email</p>
                   </div>
                   <Switch
                     checked={notifications.email}
                     onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                   />
                 </div>
                 <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                   <div>
                     <p className="font-medium">Push Notifications</p>
                     <p className="text-sm text-muted-foreground">Get real-time browser alerts</p>
                   </div>
                   <Switch
                     checked={notifications.push}
                     onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                   />
                 </div>
                 <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                   <div>
                     <p className="font-medium">SMS Alerts</p>
                     <p className="text-sm text-muted-foreground">Critical alerts via SMS</p>
                   </div>
                   <Switch
                     checked={notifications.sms}
                     onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                   />
                 </div>
                 <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                   <div>
                     <p className="font-medium">Emergency Alerts</p>
                     <p className="text-sm text-muted-foreground">High-priority emergency notifications</p>
                   </div>
                   <Switch
                     checked={notifications.emergencyAlerts}
                     onCheckedChange={(checked) => setNotifications({ ...notifications, emergencyAlerts: checked })}
                   />
                 </div>
                 <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                   <div>
                     <p className="font-medium">Daily Digest</p>
                     <p className="text-sm text-muted-foreground">Summary of daily activities</p>
                   </div>
                   <Switch
                     checked={notifications.dailyDigest}
                     onCheckedChange={(checked) => setNotifications({ ...notifications, dailyDigest: checked })}
                   />
                 </div>
               </div>
 
               <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                 {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                 {saved ? "Saved!" : "Save Preferences"}
               </button>
             </div>
           )}
 
           {/* Appearance Tab */}
           {activeTab === "appearance" && (
             <div className="space-y-6">
               <h2 className="text-lg font-semibold">Appearance Settings</h2>
 
               <div className="space-y-4">
                 <div>
                    <h3 className="font-medium mb-3">Theme</h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setTheme("light")}
                        className={`p-4 rounded-xl border-2 transition-colors ${theme === "light" ? "border-primary bg-muted/50" : "border-border bg-muted/30 opacity-60 hover:opacity-80"}`}
                      >
                        <div className="w-20 h-12 rounded-lg bg-[linear-gradient(135deg,hsl(var(--background)),hsl(var(--secondary)),hsl(var(--card)))] mb-2 border border-border" />
                        <p className="text-sm font-medium">Light</p>
                      </button>
                      <button
                        onClick={() => setTheme("dark")}
                        className={`p-4 rounded-xl border-2 transition-colors ${theme === "dark" ? "border-primary bg-muted/50" : "border-border bg-muted/30 opacity-60 hover:opacity-80"}`}
                      >
                        <div className="w-20 h-12 rounded-lg bg-[linear-gradient(135deg,hsl(224_36%_6%),hsl(222_30%_12%),hsl(168_72%_28%))] mb-2 border border-border" />
                        <p className="text-sm font-medium">Dark</p>
                      </button>
                    </div>
                 </div>
 
                  <div>
                    <h3 className="font-medium mb-3">Accent Color</h3>
                    <div className="flex gap-3">
                      {(Object.keys(ACCENT_COLORS) as Array<keyof typeof ACCENT_COLORS>).map((key) => (
                        <button
                          key={key}
                          onClick={() => setAccentColor(key)}
                          className={`w-10 h-10 rounded-full ${ACCENT_COLORS[key].preview} transition-all ${
                            accentColor === key
                              ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                              : "opacity-60 hover:opacity-100 hover:scale-105"
                          }`}
                          title={ACCENT_COLORS[key].label}
                        />
                      ))}
                    </div>
                  </div>
               </div>
             </div>
           )}
         </div>
       </div>
     </div>
   );
 }
