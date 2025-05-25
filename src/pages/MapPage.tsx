
import { mockProblems } from "@/data/mockData";
import MapView from "@/components/MapView";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

const MapPage = () => {
  const navigate = useNavigate();
  
  const handleToggleView = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen pb-16">
      <div className="h-[calc(100vh-4rem)]">
        <MapView problems={mockProblems} onToggleView={handleToggleView} />
      </div>
      <BottomNav />
    </div>
  );
};

export default MapPage;
