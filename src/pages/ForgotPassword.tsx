import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, CheckCircle2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomActionBar } from "@/components/ui/bottom-action-bar";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      navigate("/reset-password");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-[140px]">
      <div className="flex items-center justify-center p-4 relative bg-background">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-2 text-primary font-bold text-lg">
          <Shield className="h-6 w-6" />
          <span>TrustLayer</span>
        </div>
      </div>

      <div className="flex-1 px-5 pt-10 max-w-sm mx-auto w-full">
        {!isSubmitted ? (
          <>
            <h1 className="text-[28px] font-extrabold mb-2 text-foreground leading-tight tracking-tight">
              Forgot Password?
            </h1>
            <p className="text-[15px] text-muted-foreground mb-8">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form id="forgot-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[13px] font-medium text-foreground">Email</label>
                <Input required type="email" placeholder="john@example.com" />
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center pt-10 animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle2 className="w-16 h-16 text-success mb-6" />
            <h1 className="text-[24px] font-extrabold mb-2 text-foreground leading-tight">
              Reset Link Sent
            </h1>
            <p className="text-[15px] text-muted-foreground">
              We've sent password reset instructions to your email.
            </p>
          </div>
        )}
      </div>

      {!isSubmitted && (
        <BottomActionBar>
          <Button form="forgot-form" type="submit" className="w-full h-14 text-[16px]">
            Send Reset Link
          </Button>
        </BottomActionBar>
      )}
    </div>
  );
}
