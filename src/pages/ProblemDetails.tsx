
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { mockProblems, mockComments } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowLeft } from "lucide-react";
import CommentList from "@/components/CommentList";
import BottomNav from "@/components/BottomNav";
import { Problem, Comment } from "@/types";

const ProblemDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  const [problem, setProblem] = useState<Problem | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      // Here we're just simulating fetching from our mock data
      const foundProblem = mockProblems.find(p => p.id === id) || null;
      const problemComments = mockComments[id || ""] || [];
      
      setProblem(foundProblem);
      setComments(problemComments);
    }
    
    setLoading(false);
  }, [id]);
  
  const handleAddComment = (content: string) => {
    if (!user || !problem) return;
    
    const newComment: Comment = {
      id: `c${Date.now()}`,
      problemId: problem.id,
      userId: user.id,
      userNickname: user.nickname,
      content,
      createdAt: new Date().toISOString(),
      upvotes: 0
    };
    
    setComments([...comments, newComment]);
    
    // In a real app, we would update the problem's comment count via API
    setProblem({
      ...problem,
      commentCount: problem.commentCount + 1
    });
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!problem) {
    return (
      <div className="min-h-screen p-8 flex flex-col items-center justify-center">
        <h2 className="text-xl font-medium mb-4">Problem not found</h2>
        <p className="text-muted-foreground mb-6">The problem you're looking for might have been removed or is no longer available.</p>
        <Link to="/">
          <Button>Return to Feed</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 z-10 bg-white p-4 border-b flex items-center">
        <Link to="/" className="mr-2">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-medium flex-1 text-center pr-6">Problem Details</h1>
      </header>

      <div className="p-4">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="mb-2">
              <h2 className="text-xl font-medium">{problem.title}</h2>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                <span>Posted by {problem.userNickname}</span>
                <span>
                  {formatDistanceToNow(new Date(problem.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
            
            <p className="my-4 text-gray-700">{problem.description}</p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {problem.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-support-light text-support-secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="text-xs flex items-center text-muted-foreground">
              <MapPin size={14} className="mr-1" />
              <span>{problem.location.name || "Nearby location"}</span>
            </div>
          </CardContent>
        </Card>
        
        <CommentList comments={comments} onAddComment={handleAddComment} />
      </div>

      <BottomNav />
    </div>
  );
};

export default ProblemDetails;
