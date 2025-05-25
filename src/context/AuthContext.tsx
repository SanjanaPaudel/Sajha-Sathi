
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

// Define the shape of our user object
interface User {
  id: string;
  nickname: string;
  isAnonymous: boolean;
  email?: string;
  bio?: string;
  profilePicture?: string; // New field for profile picture URL
  createdAt: string;
  hasAnonymousPosts?: boolean; // New field to track if user has anonymous posts
}

// Define the notification interface
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  problemId?: string;
  commentId?: string;
}

// Define the shape of our auth context
interface AuthContextType {
  user: User | null;
  login: (email?: string, password?: string) => void;
  loginAnonymously: () => void;
  signup: (email: string, password: string, nickname: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void; // New function to update profile
  isLoading: boolean;
  notifications: Notification[];
  unreadCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  loginAnonymously: () => {},
  signup: () => {},
  logout: () => {},
  updateProfile: () => {}, // Add default value
  isLoading: true,
  notifications: [],
  unreadCount: 0,
  markNotificationRead: () => {},
  markAllNotificationsRead: () => {}
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Generate a random string for user ID
const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 10);
};

// Animal adjectives for nickname generation
const adjectives = [
  "Brave", "Wise", "Kind", "Swift", "Gentle", 
  "Bold", "Calm", "Bright", "Strong", "Hopeful"
];

// Animal names for nickname generation
const animals = [
  "Tiger", "Panda", "Eagle", "Deer", "Dolphin", 
  "Wolf", "Butterfly", "Elephant", "Lion", "Dove"
];

// Generate a random nickname
const generateNickname = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  return `${adjective}${animal}`;
};

// Default profile pictures
const defaultProfilePictures = [
  "https://api.dicebear.com/7.x/initials/svg?seed=JD",
  "https://api.dicebear.com/7.x/initials/svg?seed=ML",
  "https://api.dicebear.com/7.x/initials/svg?seed=AK",
  "https://api.dicebear.com/7.x/initials/svg?seed=WP",
  "https://api.dicebear.com/7.x/initials/svg?seed=SG"
];

// Mock registered users for demo purposes
// In a real application, this would be stored in a database
const mockUsers = [
  {
    id: "user1",
    email: "test@example.com",
    password: "password123",
    nickname: "SupportiveFlower",
    isAnonymous: false,
    bio: "I'm here to support others and share experiences.",
    profilePicture: defaultProfilePictures[0],
    createdAt: "2023-01-15T10:30:00Z",
    hasAnonymousPosts: true
  }
];

// Auth Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          
          // Also load notifications
          const savedNotifications = localStorage.getItem(`notifications_${JSON.parse(savedUser).id}`);
          if (savedNotifications) {
            setNotifications(JSON.parse(savedNotifications));
          }
        }
      } catch (error) {
        console.error("Error restoring session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  // Save notifications whenever they change
  useEffect(() => {
    if (user && notifications.length > 0) {
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(notifications));
    }
  }, [notifications, user]);

  // Calculate unread notifications count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Update profile function
  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;

    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Unable to update profile. Please try again."
      });
    }
  };

  // Login anonymously function creates a new anonymous user
  const loginAnonymously = () => {
    try {
      // Generate a random avatar based on initials
      const nickname = generateNickname();
      const initials = nickname.substring(0, 2).toUpperCase();
      const profilePicture = `https://api.dicebear.com/7.x/initials/svg?seed=${initials}`;
      
      const newUser = {
        id: generateRandomId(),
        nickname,
        isAnonymous: true,
        profilePicture,
        createdAt: new Date().toISOString(),
        hasAnonymousPosts: false
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Anonymous login successful",
        description: `Welcome, ${newUser.nickname}!`,
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Unable to create anonymous session. Please try again.",
      });
    }
  };

  // Login with email and password
  const login = (email?: string, password?: string) => {
    if (!email || !password) {
      loginAnonymously();
      return;
    }

    try {
      // In a real app, this would be an API call to validate credentials
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error("Invalid credentials");
      }
      
      const userWithoutPassword = {
        id: foundUser.id,
        nickname: foundUser.nickname,
        isAnonymous: false,
        email: foundUser.email,
        bio: foundUser.bio,
        profilePicture: foundUser.profilePicture,
        createdAt: foundUser.createdAt,
        hasAnonymousPosts: foundUser.hasAnonymousPosts
      };
      
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      
      // Fetch notifications (in a real app, this would be from an API)
      const mockNotifications = [
        {
          id: "notif1",
          userId: foundUser.id,
          title: "New comment on your post",
          message: "Someone replied to your question about career advice",
          read: false,
          createdAt: new Date().toISOString(),
          problemId: "p1"
        },
        {
          id: "notif2",
          userId: foundUser.id,
          title: "Your post is getting attention",
          message: "Your post about mental health has 5 new views",
          read: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          problemId: "p2"
        }
      ];
      
      setNotifications(mockNotifications);
      localStorage.setItem(`notifications_${foundUser.id}`, JSON.stringify(mockNotifications));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.nickname}!`,
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
      });
    }
  };

  // Signup function
  const signup = (email: string, password: string, nickname: string) => {
    try {
      // Check if email already exists
      if (mockUsers.some(u => u.email === email)) {
        throw new Error("Email already in use");
      }
      
      // Generate a profile picture based on initials
      const initials = nickname.substring(0, 2).toUpperCase();
      const profilePicture = `https://api.dicebear.com/7.x/initials/svg?seed=${initials}`;
      
      // In a real app, this would be an API call to create a user
      const newUser = {
        id: generateRandomId(),
        nickname,
        isAnonymous: false,
        email,
        profilePicture,
        createdAt: new Date().toISOString(),
        hasAnonymousPosts: false
      };
      
      // For demo purposes only - in real app we wouldn't store in memory
      mockUsers.push({...newUser, password, bio: ""});
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Account created successfully",
        description: `Welcome, ${nickname}!`,
      });
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  // Logout function
  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem("user");
      // Clear notifications too
      setNotifications([]);
      
      toast({
        title: "Logged out successfully",
        description: "Your session has ended.",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Mark notification as read
  const markNotificationRead = (id: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  // Mark all notifications as read
  const markAllNotificationsRead = () => {
    const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
    setNotifications(updatedNotifications);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      loginAnonymously,
      signup, 
      logout,
      updateProfile, 
      isLoading,
      notifications,
      unreadCount,
      markNotificationRead,
      markAllNotificationsRead
    }}>
      {children}
    </AuthContext.Provider>
  );
};
