
import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const NotificationPopover = () => {
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useAuth();
  const navigate = useNavigate();
  
  const handleNotificationClick = (notificationId: string, problemId?: string) => {
    markNotificationRead(notificationId);
    if (problemId) {
      navigate(`/problem/${problemId}`);
    }
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-support-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-medium">Notifications</h4>
          {notifications.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-support-primary"
              onClick={markAllNotificationsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 cursor-pointer hover:bg-muted transition-colors ${
                    !notification.read ? "bg-support-light bg-opacity-20" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification.id, notification.problemId)}
                >
                  <div className="flex justify-between items-start">
                    <h5 className={`font-medium text-sm ${!notification.read ? "text-support-primary" : ""}`}>
                      {notification.title}
                    </h5>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{notification.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
