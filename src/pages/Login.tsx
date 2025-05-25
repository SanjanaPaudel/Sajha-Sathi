
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";
import { MessageCircle, Shield, Heart, UserCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const { user, loginAnonymously, login, signup, isLoading } = useAuth();
  const { toast } = useToast();
  
  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Signup form state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  
  // Redirect if user is already logged in
  if (user && !isLoading) {
    return <Navigate to="/" replace />;
  }
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match"
      });
      return;
    }
    
    signup(signupEmail, signupPassword, nickname);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-support-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center animate-fade-in">
          <div className="bg-support-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-support-primary">साझा सहयोग</h1>
          <p className="text-lg text-gray-600 mt-2">Shared Support</p>
          <p className="mt-2 text-sm text-gray-500">
            A safe space to share and receive support
          </p>
        </div>

        <Card className="border-support-light animate-slide-up shadow-md">
          <Tabs defaultValue="anonymous">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="anonymous">Anonymous</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
          
            <TabsContent value="anonymous">
              <CardHeader>
                <CardTitle className="text-xl text-center">Anonymous Support</CardTitle>
                <CardDescription className="text-center">
                  Connect anonymously with others facing similar challenges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4 p-4 rounded-lg bg-support-light bg-opacity-50">
                  <MessageCircle className="text-support-primary w-8 h-8" />
                  <p className="text-center text-sm">
                    Share your concerns without revealing your identity
                  </p>
                </div>
                
                <div className="flex flex-col items-center space-y-4 p-4 rounded-lg bg-support-light bg-opacity-50">
                  <Shield className="text-support-primary w-8 h-8" />
                  <p className="text-center text-sm">
                    Your privacy is our priority - no personal data collected
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="accessibility-mode" />
                  <Label htmlFor="accessibility-mode">High contrast mode</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={loginAnonymously}
                  className="w-full bg-support-primary hover:bg-support-dark text-white"
                >
                  Enter Anonymously
                </Button>
              </CardFooter>
            </TabsContent>
            
            <TabsContent value="login">
              <CardHeader>
                <CardTitle className="text-xl text-center">Welcome Back</CardTitle>
                <CardDescription className="text-center">
                  Sign in to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="text-xs text-support-primary">Forgot password?</a>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-support-primary hover:bg-support-dark text-white"
                  >
                    Sign In
                  </Button>
                </form>
                <div className="mt-4 text-center text-xs text-muted-foreground">
                  <p>For demo, use: test@example.com / password123</p>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="signup">
              <CardHeader>
                <CardTitle className="text-xl text-center">Create Account</CardTitle>
                <CardDescription className="text-center">
                  Join our community to give and receive support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required 
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nickname">Display Name</Label>
                    <Input 
                      id="nickname" 
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      required 
                      placeholder="How you'll be known in the community"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password" 
                      type="password" 
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required 
                      minLength={8}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-support-primary hover:bg-support-dark text-white"
                  >
                    Create Account
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
          
          <div className="p-4">
            <p className="text-center text-xs text-gray-500">
              By continuing, you agree to our community guidelines centered around respectful communication and support.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
