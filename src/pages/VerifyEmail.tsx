import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ChevronLeft, Mail, Check, ShieldCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomActionBar } from "@/components/ui/bottom-action-bar";
import { motion, AnimatePresence } from "framer-motion";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [animationStep, setAnimationStep] = useState<"idle" | "loading" | "complete">("idle");
  const [resendCountdown, setResendCountdown] = useState(0);
  const userEmail = "alex@email.com";
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleResend = () => {
    if (resendCountdown === 0) {
      setResendCountdown(30);
    }
  };

  const handleInput = (index: number, value: string) => {
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setAnimationStep("loading");
    setTimeout(() => {
      setAnimationStep("complete");
    }, 1200); // simulate network request and jump to complete screen
  };

  if (animationStep === "complete") {
    return (
      <div className="flex flex-col min-h-screen bg-background pb-[140px]">
        {/* Header */}
        <div className="flex items-center justify-center p-4 relative bg-background border-b border-gray-100">
          <h1 className="text-[16px] font-semibold text-foreground">Secure Account Setup</h1>
        </div>

        <div className="flex-1 px-5 pt-10 max-w-sm mx-auto w-full flex flex-col items-center">
          
          {/* Success Icon */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex items-center justify-center mb-6 w-24 h-24"
          >
            {/* Pulse effect */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 bg-green-200 rounded-full"
            />
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center relative z-10 border-4 border-white shadow-sm">
              <ShieldCheck className="w-10 h-10 text-green-600" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-center w-full"
          >
            <h1 className="text-[28px] font-extrabold text-foreground tracking-tight mb-2">
              Email Verified
            </h1>
            <a href={`mailto:${userEmail}`} className="text-[16px] text-primary font-bold block mb-4 hover:underline">
              {userEmail}
            </a>
            <p className="text-[15px] text-muted-foreground leading-relaxed px-2 mb-6">
              Your email has been successfully verified and secured for TrustLayer transactions.
            </p>



            {/* Progress Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 text-left w-full mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <h3 className="text-[12px] font-bold text-muted-foreground mb-5 uppercase tracking-wider">Account Setup Progress</h3>
              <div className="flex flex-col gap-4 relative">
                <div className="absolute left-3 top-3 bottom-6 w-px bg-gray-200 z-0" />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 border-2 border-white">
                    <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
                  </div>
                  <span className="text-[15px] font-bold text-foreground">Email Verified</span>
                </div>
                
                {/* Highlighted next step */}
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0 bg-white">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <span className="text-[15px] font-bold text-primary">Phone Verification</span>
                </div>
                
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-200 bg-white shrink-0" />
                  <span className="text-[15px] font-medium text-gray-400">Profile Setup</span>
                </div>
              </div>
            </div>

            {/* Information Card */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-left w-full mb-8">
              <h3 className="text-[14px] font-bold text-foreground mb-3">Why verify your email?</h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-[13px] text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0" />
                  <span className="leading-snug">Receive transaction updates</span>
                </li>
                <li className="flex items-start gap-2 text-[13px] text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0" />
                  <span className="leading-snug">Receive deal updates</span>
                </li>
                <li className="flex items-start gap-2 text-[13px] text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0" />
                  <span className="leading-snug">Protect your account from unauthorized access</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <BottomActionBar>
          <div className="space-y-3 w-full">
            <Button onClick={() => navigate("/verify-phone")} className="w-full h-14 text-[16px] font-bold shadow-lg shadow-primary/20">
              Continue to Phone Verification
            </Button>
            <Button onClick={() => navigate("/login")} variant="ghost" className="w-full h-14 text-[15px] font-medium text-muted-foreground hover:bg-gray-100">
              Back to Sign In
            </Button>
          </div>
        </BottomActionBar>
      </div>
    );
  }

  // Initial Form View
  return (
    <div className="flex flex-col min-h-screen bg-background pb-[140px]">
      {/* Top Header */}
      <div className="flex items-center justify-center p-4 relative bg-background">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-[16px] font-semibold">Step 1 of 3</h1>
      </div>

      <div className="flex-1 px-5 pt-2 max-w-sm mx-auto w-full">
        {/* Progress Tracker */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-[13px] font-bold border border-blue-100">
             <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" /> Email
          </div>
          <div className="h-px w-4 bg-gray-200" />
          <div className="flex items-center gap-2 text-gray-400 px-4 py-2 rounded-full text-[13px] font-bold border border-gray-200">
            Phone
          </div>
          <div className="h-px w-4 bg-gray-200" />
          <div className="flex items-center gap-2 text-gray-400 px-4 py-2 rounded-full text-[13px] font-bold border border-gray-200">
            Profile
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-full flex items-center justify-center border-4 border-white shadow-sm relative">
            <div className="absolute inset-0 rounded-full border border-blue-100/50" />
            <Mail className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-[28px] font-extrabold mb-2 text-foreground leading-tight tracking-tight">
            Verify Your Email
          </h1>
          <p className="text-[15px] text-muted-foreground font-medium">
            We sent a secure code to your inbox
          </p>
        </div>

        {/* Premium Card Container */}
        <div className="bg-white rounded-[24px] p-5 shadow-xl shadow-blue-900/5 border border-gray-100">
          <form id="verify-form" onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[13px] font-bold text-foreground ml-1">6-Digit Code</label>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <Input 
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    required 
                    maxLength={1}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="h-14 text-center text-lg font-bold p-0 bg-gray-50/50 border-gray-200 focus-visible:ring-primary/20" 
                    placeholder="0"
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      e.target.value = val;
                      handleInput(i, val);
                    }}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                  />
                ))}
              </div>
            </div>

            <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-4 flex gap-3.5">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-[13px] font-bold text-blue-900">Why verify your email?</p>
                <p className="text-[12px] text-blue-800/70 leading-relaxed font-medium">
                  We need to confirm your email so we can send important transaction and shipping updates securely.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {animationStep === "loading" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground font-medium animate-pulse">Verifying code...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomActionBar>
        <div className="space-y-3 w-full">
          <Button form="verify-form" type="submit" className="w-full h-14 text-[16px]">
            Continue
          </Button>
          <Button 
            variant="outline" 
            className="w-full h-14 border-border text-foreground hover:bg-gray-50 text-[16px]"
            onClick={handleResend}
            disabled={resendCountdown > 0}
          >
            {resendCountdown > 0 ? `Code sent! (${resendCountdown}s)` : "Resend Code"}
          </Button>
        </div>
      </BottomActionBar>
    </div>
  );
}
