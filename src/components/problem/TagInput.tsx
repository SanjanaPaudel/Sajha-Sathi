
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagInput = ({ tags, setTags }: TagInputProps) => {
  const [tagInput, setTagInput] = useState("");
  
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
  
  return (
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
  );
};

export default TagInput;
