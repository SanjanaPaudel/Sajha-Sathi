
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, X, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { mockProblems } from "@/data/mockData";
import { Problem } from "@/types";

const CreateProblemForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [postAnonymously, setPostAnonymously] = useState(true);
  const [location] = useState({
    latitude: 27.7172,
    longitude: 85.324,
    name: "Kathmandu"
  });
  
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    
    // Don't add duplicate tags
    if (!tags.includes(tagInput.trim().toLowerCase())) {
      setTags([...tags, tagInput.trim().toLowerCase()]);
    }
    setTagInput("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide both a title and description."
      });
      return;
    }
    
    // Create the new problem
    const newProblem: Problem = {
      id: `p${mockProblems.length + 1}`,
      userId: user?.id || "anonymous",
      userNickname: postAnonymously ? (user?.isAnonymous ? user.nickname : "Anonymous") : user?.nickname || "Anonymous",
      title,
      description,
      tags: tags.length > 0 ? tags : ["general"],
      location,
      createdAt: new Date().toISOString(),
      commentCount: 0,
      status: "active" as const,
      isAnonymous: postAnonymously,
      userProfilePicture: postAnonymously ? undefined : user?.profilePicture
    };
    
    // Add the new problem to mockProblems array
    mockProblems.push(newProblem);
    
    console.log("New problem created:", newProblem);
    console.log("Updated mockProblems:", mockProblems);
    
    // In a real app, we would update the user's hasAnonymousPosts flag if this is an anonymous post
    if (postAnonymously && user && !user.isAnonymous) {
      // This would be part of the API call in a real app
      console.log("User now has anonymous posts");
    }
    
    toast({
      title: "Problem shared successfully",
      description: "Your post is now visible to others in your area."
    });
    
    // Redirect back to main feed
    navigate("/");
  };
  
  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your concern in a few words"
            maxLength={100}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share details about your situation (no personal identifiers needed)"
            className="min-h-[150px]"
            maxLength={1000}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (optional)</Label>
          <div className="flex">
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add tags and press Enter"
              className="flex-1"
            />
            <Button 
              type="button" 
              onClick={handleAddTag}
              variant="outline"
              className="ml-2"
            >
              Add
            </Button>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Location</Label>
          <div className="flex items-center p-3 rounded-md border bg-muted/50">
            <MapPin size={16} className="mr-2 text-support-primary" />
            <span className="text-sm">{location.name || "Current location"}</span>
            <span className="ml-auto text-xs text-muted-foreground">Using approximate location</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Only your general area will be shared for safety (not your exact location)
          </p>
        </div>
        
        <div className="border p-4 rounded-md bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <EyeOff size={16} className="text-support-primary" />
              <div>
                <Label htmlFor="post-anonymously">Post anonymously</Label>
                <p className="text-xs text-muted-foreground">
                  {!user?.isAnonymous ? (
                    postAnonymously ? 
                    "Your username and profile picture will be hidden from this post" : 
                    "Your username and profile picture will be visible with this post"
                  ) : "You're already posting anonymously"}
                </p>
              </div>
            </div>
            <Switch 
              id="post-anonymously" 
              checked={postAnonymously} 
              onCheckedChange={setPostAnonymously}
              disabled={user?.isAnonymous}
            />
          </div>
        </div>
        
        <div className="pt-4 flex justify-end gap-3">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-support-primary hover:bg-support-dark"
          >
            Share {postAnonymously ? "Anonymously" : "Publicly"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateProblemForm;
