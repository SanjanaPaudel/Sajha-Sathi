
import { useState } from "react";
import { mockProblems } from "@/data/mockData";
import ProblemsFeed from "@/components/ProblemsFeed";
import MapView from "@/components/MapView";
import BottomNav from "@/components/BottomNav";

const Home = () => {
  const [showMap, setShowMap] = useState(false);
  
  const toggleView = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="min-h-screen pb-16">
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {showMap ? (
          <MapView problems={mockProblems} onToggleView={toggleView} />
        ) : (
          <ProblemsFeed problems={mockProblems} onToggleView={toggleView} />
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
