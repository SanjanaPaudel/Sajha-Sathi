
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Home, PlusCircle, Map, Settings, UserRound, Bell } from "lucide-react";
import NotificationPopover from "./NotificationPopover";

const BottomNav = () => {
  const { user, unreadCount } = useAuth();
  
  if (!user) return null;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 z-10">
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center py-1 px-4 ${
            isActive ? "text-support-primary" : "text-gray-500"
          }`
        }
      >
        <Home size={20} />
        <span className="text-xs mt-1">Home</span>
      </NavLink>
      
      <NavLink 
        to="/map" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center py-1 px-4 ${
            isActive ? "text-support-primary" : "text-gray-500"
          }`
        }
      >
        <Map size={20} />
        <span className="text-xs mt-1">Map</span>
      </NavLink>
      
      <NavLink 
        to="/new" 
        className={({ isActive }) => 
          `flex flex-col items-center justify-center py-1 px-4 ${
            isActive ? "text-support-primary" : "text-gray-500"
          }`
        }
      >
        <PlusCircle size={20} />
        <span className="text-xs mt-1">New</span>
      </NavLink>
      
      <div className="flex flex-col items-center justify-center py-1 px-4 relative">
        <NotificationPopover />
        <span className="text-xs mt-1">
          {unreadCount > 0 ? (
            <span className="text-support-primary font-medium">Alerts</span>
          ) : (
            "Alerts"
          )}
        </span>
      </div>
      
      {!user.isAnonymous ? (
        <NavLink 
          to="/profile" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center py-1 px-4 ${
              isActive ? "text-support-primary" : "text-gray-500"
            }`
          }
        >
          <UserRound size={20} />
          <span className="text-xs mt-1">Profile</span>
        </NavLink>
      ) : (
        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center py-1 px-4 ${
              isActive ? "text-support-primary" : "text-gray-500"
            }`
          }
        >
          <Settings size={20} />
          <span className="text-xs mt-1">Settings</span>
        </NavLink>
      )}
    </nav>
  );
};

export default BottomNav;
