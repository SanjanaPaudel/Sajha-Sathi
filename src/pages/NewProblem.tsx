
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import CreateProblemForm from "@/components/CreateProblemForm";
import BottomNav from "@/components/BottomNav";

const NewProblem = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen pb-16">
      <header className="p-4 bg-white border-b">
        <h1 className="text-xl font-medium text-center">Share Your Concern</h1>
      </header>
      <div className="p-4">
        <CreateProblemForm />
      </div>
      <BottomNav />
    </div>
  );
};

export default NewProblem;
