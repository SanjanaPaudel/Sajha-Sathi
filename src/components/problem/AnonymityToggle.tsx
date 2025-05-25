
import { EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface AnonymityToggleProps {
  postAnonymously: boolean;
  setPostAnonymously: (value: boolean) => void;
  isAlreadyAnonymous: boolean;
}

const AnonymityToggle = ({ 
  postAnonymously, 
  setPostAnonymously,
  isAlreadyAnonymous
}: AnonymityToggleProps) => {
  return (
    <div className="border p-4 rounded-md bg-muted/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <EyeOff size={16} className="text-support-primary" />
          <div>
            <Label htmlFor="post-anonymously">Post anonymously</Label>
            <p className="text-xs text-muted-foreground">
              {!isAlreadyAnonymous ? (
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
          disabled={isAlreadyAnonymous}
        />
      </div>
    </div>
  );
};

export default AnonymityToggle;
