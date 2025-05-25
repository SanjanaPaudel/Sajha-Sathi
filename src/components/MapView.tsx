
import React, { useRef, useEffect, useState } from "react";
import { Problem } from "@/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, Map as MapIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

// Mock map implementation since we can't use actual Google Maps without API key
const MapView = ({ problems, onToggleView }: { problems: Problem[], onToggleView: () => void }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  // Simulate map initialization
  useEffect(() => {
    if (!mapRef.current) return;
    
    const mapElement = mapRef.current;
    
    // Create points representing problems
    problems.forEach(problem => {
      const marker = document.createElement("div");
      marker.className = "w-4 h-4 bg-support-primary rounded-full absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform";
      
      // Position marker on "map" using percentage (in a real implementation, would use proper geo mapping)
      const left = ((problem.location.longitude - 85.3) * 100) + 50; // Mock conversion
      const top = ((27.7 - problem.location.latitude) * 100) + 50; // Mock conversion
      
      marker.style.left = `${Math.min(Math.max(left, 5), 95)}%`;
      marker.style.top = `${Math.min(Math.max(top, 5), 95)}%`;
      
      marker.addEventListener("click", () => {
        setSelectedProblem(problem);
      });
      
      mapElement.appendChild(marker);
    });
    
    return () => {
      // Clean up markers when component unmounts
      while (mapElement.firstChild) {
        mapElement.removeChild(mapElement.firstChild);
      }
    };
  }, [problems]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex justify-between items-center bg-white shadow-sm">
        <h2 className="font-medium">Support Map</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={onToggleView}
        >
          <List size={16} />
          <span>List View</span>
        </Button>
      </div>
      
      <div className="flex-1 relative overflow-hidden">
        <div 
          ref={mapRef} 
          className="h-full w-full bg-support-light relative"
        >
          {/* This would be a real map in production */}
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground opacity-10 text-xl font-bold">
            Map of Nepal
          </div>
          
          {/* Simple visual elements to make it look map-like */}
          <div className="absolute inset-0 bg-support-light opacity-50" />
          <div className="absolute h-[70%] w-[40%] left-[30%] top-[15%] bg-white opacity-20 rounded-full" />
          <div className="absolute h-[40%] w-[20%] left-[20%] top-[30%] bg-white opacity-10 rounded-full" />
          <div className="absolute h-[30%] w-[25%] left-[55%] top-[40%] bg-white opacity-10 rounded-full" />
          
          {/* Grid lines */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute h-px w-full bg-gray-200 opacity-30" style={{ top: `${20 + i * 15}%` }} />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute w-px h-full bg-gray-200 opacity-30" style={{ left: `${20 + i * 15}%` }} />
          ))}
        </div>
        
        {selectedProblem && (
          <Card className="absolute bottom-4 left-4 right-4 p-4 bg-white shadow-lg animate-slide-up">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{selectedProblem.title}</h3>
                <p className="text-xs text-muted-foreground">Posted by {selectedProblem.userNickname}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedProblem(null)}
              >
                Close
              </Button>
            </div>
            <p className="text-sm mt-2 line-clamp-2">{selectedProblem.description}</p>
            <div className="mt-2 flex justify-end">
              <Button 
                size="sm" 
                variant="outline" 
                className="text-support-primary"
                onClick={() => window.location.href = `/problem/${selectedProblem.id}`}
              >
                View Details
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MapView;
