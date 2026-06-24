import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomActionBar } from "@/components/ui/bottom-action-bar";

export default function Register() {
  const navigate = useNavigate();
  const [hasConsent, setHasConsent] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConsent) {
      setShowError(true);
      return;
    }
    navigate("/verify-email");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-[240px]">
      {/* Top Header */}
      <div className="flex items-center justify-center p-6 bg-background">
        <div className="flex items-center gap-2 text-primary font-bold text-lg">
          <Shield className="h-6 w-6" />
          <span>TrustLayer</span>
        </div>
      </div>

      <div className="flex-1 px-5 pt-2 max-w-sm mx-auto w-full">
        <h1 className="text-[28px] font-extrabold mb-2 text-foreground leading-tight tracking-tight">
          Create Account
        </h1>
        <p className="text-[15px] text-muted-foreground mb-8">
          Create your account to start trusted transactions.
        </p>

        <form id="register-form" onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-foreground">First Name</label>
              <Input required placeholder="John" />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-foreground">Last Name</label>
              <Input required placeholder="Smith" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-medium text-foreground">Email</label>
            <Input required type="email" placeholder="john@example.com" />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-medium text-foreground">Password</label>
            <Input required type="password" placeholder="••••••••" />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-medium text-foreground">Confirm Password</label>
            <Input required type="password" placeholder="••••••••" />
          </div>
        </form>

        <p className="text-center text-[14px] text-muted-foreground mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>

      <BottomActionBar>
        <div className="mb-3 flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <input 
              type="checkbox" 
              id="consent"
              checked={hasConsent}
              onChange={(e) => {
                setHasConsent(e.target.checked);
                if (e.target.checked) setShowError(false);
              }}
              className="mt-0.5 flex-shrink-0 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
            />
            <label htmlFor="consent" className="text-[13px] leading-tight text-slate-500">
              I agree to the <Link to="#" className="text-primary hover:underline">Terms</Link>, <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>, and <Link to="#" className="text-primary hover:underline">Platform Terms</Link>.
            </label>
          </div>
          {showError && (
            <p className="text-red-500 text-[12px] font-medium">Please accept the Terms and Policies to continue.</p>
          )}
          <div className="text-center mt-1">
            <p className="text-[12px] text-slate-400 font-medium flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Built for secure buyer and seller transactions.
            </p>
          </div>
        </div>
        <Button form="register-form" type="submit" className="w-full h-14 text-[16px]">
          Continue
        </Button>
      </BottomActionBar>
    </div>
  );
}
