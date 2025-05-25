
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Save, Upload, Eye, EyeOff } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { mockProblems } from "@/data/mockData";
import ProblemCard from "@/components/ProblemCard";
import { Problem } from "@/types";

const Profile = () => {
  const { user, isLoading, updateProfile } = useAuth();
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(user?.bio || "");
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [userProblems, setUserProblems] = useState<Problem[]>([]);
  const [visibilityFilter, setVisibilityFilter] = useState<"all" | "public" | "anonymous">("all");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (user) {
      // Get user's problems from mock data - filter by userId to show all posts created by this user
      const filteredProblems = mockProblems.filter(problem => problem.userId === user.id);
      console.log("User ID:", user.id);
      console.log("Found problems:", filteredProblems);
      setUserProblems(filteredProblems);
      
      // Update local states
      setBio(user.bio || "");
      setNickname(user.nickname || "");
    }
  }, [user]);
  
  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If user is anonymous, redirect to settings where they can create an account
  if (user.isAnonymous) {
    return <Navigate to="/settings" replace />;
  }
  
  const handleSaveProfile = () => {
    // In a real app, this would be an API call to update the user's profile
    updateProfile({
      nickname,
      bio
    });
    setEditMode(false);
  };
  
  const handleProfilePictureClick = () => {
    // Trigger the hidden file input
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image file."
      });
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload an image smaller than 5MB."
      });
      return;
    }
    
    // In a real app, we'd upload this to Firebase Storage or similar
    // For now, we'll use URL.createObjectURL as a stand-in
    const imageUrl = URL.createObjectURL(file);
    
    updateProfile({
      profilePicture: imageUrl
    });
    
    toast({
      title: "Profile picture updated",
      description: "Your profile picture has been updated successfully."
    });
  };
  
  const getInitials = () => {
    return user.nickname.substring(0, 2).toUpperCase();
  };
  
  const filteredProblems = userProblems.filter(problem => {
    if (visibilityFilter === "all") return true;
    if (visibilityFilter === "public") return !problem.isAnonymous;
    if (visibilityFilter === "anonymous") return problem.isAnonymous;
    return true;
  });
  
  const anonymousCount = userProblems.filter(p => p.isAnonymous).length;
  const publicCount = userProblems.filter(p => !p.isAnonymous).length;
  
  return (
    <div className="min-h-screen pb-16">
      <header className="p-4 bg-white border-b">
        <h1 className="text-xl font-medium text-center">My Profile</h1>
      </header>
      
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <Avatar 
              className="h-24 w-24 border-2 border-support-primary cursor-pointer"
              onClick={handleProfilePictureClick}
            >
              {user.profilePicture ? (
                <AvatarImage src={user.profilePicture} alt={user.nickname} />
              ) : null}
              <AvatarFallback className="bg-support-light text-support-primary text-xl">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div 
              className="absolute bottom-0 right-0 bg-support-primary text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
              onClick={handleProfilePictureClick}
            >
              <Upload size={16} />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.nickname}</h2>
            <p className="text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        
        <Card className="mb-6 p-4">
          {editMode ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="display-name">Display Name</Label>
                <Input 
                  id="display-name"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="bio">About Me</Label>
                <Textarea 
                  id="bio"
                  placeholder="Share a little about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => setEditMode(false)}
                  variant="outline"
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveProfile}
                  className="bg-support-primary hover:bg-support-dark"
                >
                  <Save size={16} className="mr-1" /> Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">About Me</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setEditMode(true)}
                  className="text-support-primary"
                >
                  <Edit size={16} />
                </Button>
              </div>
              <p className="text-sm">
                {user.bio || "No bio yet. Click edit to add some information about yourself."}
              </p>
            </div>
          )}
        </Card>
        
        <Tabs defaultValue="myposts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="myposts">My Posts</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          <TabsContent value="myposts">
            <div className="pb-4 pt-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">
                  {visibilityFilter === "all" 
                    ? `All posts (${userProblems.length})` 
                    : visibilityFilter === "public" 
                      ? `Public posts (${publicCount})` 
                      : `Anonymous posts (${anonymousCount})`}
                </h3>
                <div className="flex border rounded-md bg-white">
                  <Button
                    variant={visibilityFilter === "all" ? "default" : "ghost"}
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => setVisibilityFilter("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={visibilityFilter === "public" ? "default" : "ghost"}
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => setVisibilityFilter("public")}
                  >
                    <Eye size={14} className="mr-1" /> Public
                  </Button>
                  <Button
                    variant={visibilityFilter === "anonymous" ? "default" : "ghost"}
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => setVisibilityFilter("anonymous")}
                  >
                    <EyeOff size={14} className="mr-1" /> Anonymous
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredProblems.length > 0 ? (
                  filteredProblems.map(problem => (
                    <ProblemCard 
                      key={problem.id} 
                      problem={problem} 
                      showOwnerControls={true} 
                    />
                  ))
                ) : (
                  <div className="text-center p-8">
                    <p className="text-gray-500">
                      {visibilityFilter === "all" 
                        ? "You haven't created any posts yet" 
                        : `You don't have any ${visibilityFilter} posts`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="saved">
            <div className="text-center p-8">
              <p className="text-gray-500">You don't have any saved posts</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Profile;
