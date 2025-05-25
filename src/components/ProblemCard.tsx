
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, MapPin, EyeOff } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Problem } from "@/types";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

interface ProblemCardProps {
  problem: Problem;
  showOwnerControls?: boolean;
}

const ProblemCard = ({ problem, showOwnerControls }: ProblemCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id, title, description, tags, userNickname, location, createdAt, commentCount, isAnonymous, userProfilePicture } = problem;

  const formattedTime = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const isOwner = user && user.id === problem.userId;
  
  const handleViewProblem = () => {
    navigate(`/problem/${id}`);
  };

  return (
    <Card className={`w-full border-support-light hover:border-support-primary transition-all duration-200 animate-fade-in shadow-sm hover:shadow-md ${showOwnerControls && isAnonymous ? 'border-l-4 border-l-support-secondary' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {!isAnonymous && userProfilePicture ? (
              <Avatar className="h-8 w-8 border border-support-light">
                <AvatarImage src={userProfilePicture} alt={userNickname} />
                <AvatarFallback>{userNickname.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            ) : null}
            <div>
              <h3 className="font-medium text-lg">{title}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Posted by {userNickname}</span>
                {isAnonymous && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex">
                        <EyeOff size={12} className="text-support-secondary" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isOwner ? "You posted this anonymously" : "Posted anonymously"}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                <span>• {formattedTime}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm line-clamp-3 mb-3">{description}</p>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-support-light text-support-secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0 text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin size={14} />
          <span>{location.name || "Nearby location"}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1 text-support-primary hover:text-support-dark hover:bg-support-light"
          onClick={handleViewProblem}
        >
          <MessageCircle size={16} />
          <span>{commentCount} {commentCount === 1 ? "reply" : "replies"}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProblemCard;
