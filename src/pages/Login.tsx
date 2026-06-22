import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomActionBar } from "@/components/ui/bottom-action-bar";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-[140px]">
      <div className="flex items-center justify-center p-6 bg-background">
        <div className="flex items-center gap-2 text-primary font-bold text-lg">
          <Shield className="h-6 w-6" />
          <span>TrustLayer</span>
        </div>
      </div>

      <div className="flex-1 px-5 pt-10 max-w-sm mx-auto w-full">
        <h1 className="text-[28px] font-extrabold mb-8 text-foreground leading-tight tracking-tight">
          Sign In
        </h1>

        <form id="login-form" onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-foreground">Email</label>
            <Input required type="email" placeholder="john@example.com" />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-medium text-foreground">Password</label>
            <Input required type="password" placeholder="••••••••" />
          </div>
          
          <div className="flex justify-end pt-1">
            <button 
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-[14px] font-bold text-primary hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        </form>

        <p className="text-center text-[14px] text-muted-foreground mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Create Account
          </Link>
        </p>
      </div>

      <BottomActionBar>
        <Button form="login-form" type="submit" className="w-full h-14 text-[16px]">
          Sign In
        </Button>
      </BottomActionBar>
    </div>
  );
}
