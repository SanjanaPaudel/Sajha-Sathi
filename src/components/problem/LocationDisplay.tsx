
import { MapPin } from "lucide-react";

interface Location {
  latitude: number;
  longitude: number;
  name: string;
}

interface LocationDisplayProps {
  location: Location;
}

const LocationDisplay = ({ location }: LocationDisplayProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center p-3 rounded-md border bg-muted/50">
        <MapPin size={16} className="mr-2 text-support-primary" />
        <span className="text-sm">{location.name || "Current location"}</span>
        <span className="ml-auto text-xs text-muted-foreground">Using approximate location</span>
      </div>
      <p className="text-xs text-muted-foreground">
        Only your general area will be shared for safety (not your exact location)
      </p>
    </div>
  );
};

export default LocationDisplay;
