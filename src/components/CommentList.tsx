
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Comment } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flag, MessageCircle, ThumbsUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CommentListProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

const CommentList = ({ comments, onAddComment }: CommentListProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  const [upvotedComments, setUpvotedComments] = useState<Record<string, boolean>>({});

  const handleUpvote = (commentId: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Login required",
        description: "Please log in to upvote comments."
      });
      return;
    }

    setUpvotedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));

    toast({
      title: upvotedComments[commentId] ? "Upvote removed" : "Comment upvoted",
      description: upvotedComments[commentId] 
        ? "You have removed your upvote from this comment"
        : "Thank you for recognizing helpful advice"
    });
  };

  const handleReport = (commentId: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Login required",
        description: "Please log in to report comments."
      });
      return;
    }

    toast({
      title: "Comment reported",
      description: "Thank you for helping keep this community safe. Our moderators will review this comment."
    });
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    onAddComment(newComment);
    setNewComment("");
    
    toast({
      title: "Comment posted",
      description: "Your response has been shared anonymously."
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium text-lg flex items-center gap-2">
        <MessageCircle size={18} className="text-support-primary" />
        <span>{comments.length} Responses</span>
      </h3>
      
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => {
            const isUpvoted = upvotedComments[comment.id];
            const upvoteCount = comment.upvotes + (isUpvoted ? 1 : 0);
            
            return (
              <Card key={comment.id} className="border-support-light">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium">{comment.userNickname}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleReport(comment.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Flag size={14} />
                    </Button>
                  </div>
                  
                  <p className="text-sm my-2">{comment.content}</p>
                  
                  <div className="flex justify-end">
                    <Button
                      variant={isUpvoted ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => handleUpvote(comment.id)}
                      className={`flex items-center gap-1 ${
                        isUpvoted ? "bg-support-light text-support-primary" : ""
                      }`}
                    >
                      <ThumbsUp size={14} />
                      <span>{upvoteCount}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-6">
          No responses yet. Be the first to share support!
        </p>
      )}
      
      {user && (
        <form onSubmit={handleSubmitComment} className="mt-6">
          <div className="space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your support or advice..."
              className="w-full p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-support-primary min-h-[100px]"
              required
            />
            <div className="flex justify-end">
              <Button 
                type="submit"
                className="bg-support-primary hover:bg-support-dark"
                disabled={!newComment.trim()}
              >
                Post Response
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentList;
