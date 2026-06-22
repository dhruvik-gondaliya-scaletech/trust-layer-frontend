import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomActionBar } from "@/components/ui/bottom-action-bar";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-[140px]">
      {/* Top Header */}
      <div className="flex items-center justify-center p-6 bg-background">
        <div className="flex items-center gap-2 text-primary font-bold text-lg">
          <Shield className="h-6 w-6" />
          <span>TrustLayer</span>
        </div>
      </div>
      <div className="flex-1 px-5 pt-16 max-w-sm mx-auto w-full">
        {!isSuccess ? (
          <>
            <h1 className="text-[28px] font-extrabold mb-2 text-foreground leading-tight tracking-tight">
              Create New Password
            </h1>
            <p className="text-[15px] text-muted-foreground mb-8">
              Your new password must be different from previous used passwords.
            </p>

            <form id="reset-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[13px] font-medium text-foreground">New Password</label>
                <Input required type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-medium text-foreground">Confirm Password</label>
                <Input required type="password" placeholder="••••••••" />
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center pt-10 animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle2 className="w-16 h-16 text-success mb-6" />
            <h1 className="text-[24px] font-extrabold mb-2 text-foreground leading-tight">
              Password Reset
            </h1>
            <p className="text-[15px] text-muted-foreground">
              Your password has been successfully reset.
            </p>
          </div>
        )}
      </div>

      <BottomActionBar>
        {!isSuccess ? (
          <Button form="reset-form" type="submit" className="w-full h-14 text-[16px]">
            Reset Password
          </Button>
        ) : (
          <Button onClick={() => navigate("/login")} className="w-full h-14 text-[16px]">
            Back To Sign In
          </Button>
        )}
      </BottomActionBar>
    </div>
  );
}
