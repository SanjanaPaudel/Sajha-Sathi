
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, UserCheck, BellRing, LogOut } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const Settings = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  
  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen pb-16">
      <header className="p-4 bg-white border-b">
        <h1 className="text-xl font-medium text-center">Settings</h1>
      </header>
      
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-4 space-y-6">
          <section>
            <h2 className="text-lg font-medium mb-4">Your Account</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium">{user.isAnonymous ? "Anonymous User" : user.nickname}</p>
                  <p className="text-sm text-muted-foreground">{user.email || user.nickname}</p>
                </div>
                <Badge variant="outline" className="bg-support-light text-support-primary">
                  {user.isAnonymous ? "Anonymous" : "Registered"}
                </Badge>
              </div>
              
              {user.isAnonymous ? (
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-support-primary text-support-primary hover:bg-support-light"
                    onClick={() => navigate("/login")}
                  >
                    <UserCheck size={16} className="mr-2" />
                    Create Account
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Create an account to save your posts and get notifications
                  </p>
                  <Separator />
                  <Button 
                    onClick={handleLogout}
                    variant="destructive" 
                    className="w-full"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Signing out will end your anonymous session. Your posts will remain visible.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-support-primary text-support-primary hover:bg-support-light"
                    onClick={() => navigate("/profile")}
                  >
                    <UserCheck size={16} className="mr-2" />
                    View Profile
                  </Button>
                  <Separator />
                  <Button 
                    onClick={handleLogout}
                    variant="destructive" 
                    className="w-full"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-lg font-medium mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <BellRing size={16} className="text-support-primary" />
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Get notified when someone responds to your posts
                  </p>
                </div>
                <Switch id="push-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for important activity
                  </p>
                </div>
                <Switch id="email-notifications" />
              </div>
            </div>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-lg font-medium mb-4">Appearance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast">High Contrast Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Increase contrast for better readability
                  </p>
                </div>
                <Switch id="high-contrast" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="large-text">Larger Text</Label>
                  <p className="text-sm text-muted-foreground">
                    Increase text size throughout the app
                  </p>
                </div>
                <Switch id="large-text" />
              </div>
            </div>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-lg font-medium mb-4">Privacy</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1">
                    <Label htmlFor="location-services">Location Services</Label>
                    <MapPin size={14} className="text-support-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Allow the app to access your location
                  </p>
                </div>
                <Switch id="location-services" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics">Usage Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Help improve the app by sharing anonymous usage data
                  </p>
                </div>
                <Switch id="analytics" defaultChecked />
              </div>
            </div>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-lg font-medium mb-4">Language</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full border-support-primary text-support-primary">
                  English
                </Button>
                <Button variant="outline" className="w-full">
                  नेपाली
                </Button>
              </div>
            </div>
          </section>
          
          <section className="pt-4">
            <p className="text-xs text-center text-muted-foreground">
              Version 1.0.0
            </p>
          </section>
        </div>
      </ScrollArea>
      
      <BottomNav />
    </div>
  );
};

export default Settings;
