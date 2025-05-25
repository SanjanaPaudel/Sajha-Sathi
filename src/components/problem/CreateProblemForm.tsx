
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { mockProblems } from "@/data/mockData";
import { Problem } from "@/types";
import TagInput from "./TagInput";
import LocationDisplay from "./LocationDisplay";
import AnonymityToggle from "./AnonymityToggle";

const CreateProblemForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [postAnonymously, setPostAnonymously] = useState(true);
  const [location] = useState({
    latitude: 27.7172,
    longitude: 85.324,
    name: "Kathmandu"
  });
  
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
        
        <TagInput tags={tags} setTags={setTags} />
        
        <Label>Location</Label>
        <LocationDisplay location={location} />
        
        <AnonymityToggle 
          postAnonymously={postAnonymously}
          setPostAnonymously={setPostAnonymously}
          isAlreadyAnonymous={user?.isAnonymous || false}
        />
        
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
