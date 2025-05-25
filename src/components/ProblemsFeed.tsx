
import { useState } from "react";
import { Problem } from "@/types";
import ProblemCard from "./ProblemCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, MapPin, Map } from "lucide-react";

interface ProblemsFeedProps {
  problems: Problem[];
  onToggleView: () => void;
}

const ProblemsFeed = ({ problems, onToggleView }: ProblemsFeedProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredProblems = problems.filter(problem => {
    const query = searchQuery.toLowerCase();
    return (
      problem.title.toLowerCase().includes(query) ||
      problem.description.toLowerCase().includes(query) ||
      problem.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-support-background p-4 shadow-sm">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search problems or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-white"
            />
          </div>
          <Button 
            variant="outline" 
            size="icon"
            className="flex items-center justify-center bg-white"
            onClick={onToggleView}
          >
            <Map size={18} className="text-support-primary" />
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-support-primary" />
            <span className="text-xs text-gray-500">Showing nearby issues</span>
          </div>
          <Button variant="ghost" size="sm" className="text-xs text-support-primary">
            Filter
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))
          ) : (
            <div className="text-center p-8">
              <p className="text-gray-500">No problems match your search</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProblemsFeed;
