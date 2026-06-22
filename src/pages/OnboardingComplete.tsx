import React from "react";
import { useNavigate } from "react-router-dom";
import { Shield, CheckCircle2, UserCheck, MailCheck, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function OnboardingComplete() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background pb-8 relative overflow-hidden">
      <div className="flex items-center justify-center p-6 bg-background">
        <div className="flex items-center gap-2 text-primary font-bold text-lg">
          <Shield className="h-6 w-6" />
          <span>TrustLayer</span>
        </div>
      </div>

      <div className="flex-1 px-5 pt-10 max-w-sm mx-auto w-full flex flex-col items-center text-center">
        
        {/* Animated Background Confetti/Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-success/20 rounded-full blur-[80px] -z-10" />

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
          className="w-28 h-28 bg-success/10 rounded-full flex items-center justify-center mb-8 relative"
        >
          <CheckCircle2 className="w-16 h-16 text-success" />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[28px] font-extrabold mb-4 text-foreground leading-tight tracking-tight"
        >
          Your account is ready.
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[15px] text-muted-foreground mb-10"
        >
          You can now create your first trusted transaction.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full space-y-3 mb-auto text-left max-w-[280px]"
        >
          <div className="flex items-center gap-4 bg-white border border-border p-4 rounded-2xl shadow-sm">
            <MailCheck className="w-5 h-5 text-success shrink-0" />
            <span className="font-semibold text-[15px]">Email Verified</span>
          </div>
          <div className="flex items-center gap-4 bg-white border border-border p-4 rounded-2xl shadow-sm">
            <PhoneCall className="w-5 h-5 text-success shrink-0" />
            <span className="font-semibold text-[15px]">Phone Verified</span>
          </div>
          <div className="flex items-center gap-4 bg-white border border-border p-4 rounded-2xl shadow-sm">
            <UserCheck className="w-5 h-5 text-success shrink-0" />
            <span className="font-semibold text-[15px]">Profile Created</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full mt-10 space-y-3"
        >
          <Button 
            className="w-full h-14 text-[16px]"
            onClick={() => navigate("/dashboard")}
          >
            Go To Dashboard
          </Button>
          <Button 
            variant="outline"
            className="w-full h-14 border-border text-foreground hover:bg-gray-50 text-[16px]"
            onClick={() => navigate("/create-deal")}
          >
            Create First Deal
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
