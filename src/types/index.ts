
export interface Location {
  latitude: number;
  longitude: number;
  name?: string;
}

export interface Problem {
  id: string;
  userId: string;
  userNickname: string;
  title: string;
  description: string;
  tags: string[];
  location: Location;
  createdAt: string;
  commentCount: number;
  status: 'active' | 'resolved' | 'hidden';
  isAnonymous?: boolean;
  userProfilePicture?: string; // Added for user's profile picture
}

export interface Comment {
  id: string;
  problemId: string;
  userId: string;
  userNickname: string;
  content: string;
  createdAt: string;
  upvotes: number;
  hasUserUpvoted?: boolean;
  isAnonymous?: boolean;
  userProfilePicture?: string; // Added for user's profile picture
}
