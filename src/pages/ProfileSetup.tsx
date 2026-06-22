import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Camera, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomActionBar } from "@/components/ui/bottom-action-bar";

export default function ProfileSetup() {
  const navigate = useNavigate();

  const handleSetup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding-complete");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-[140px]">
      {/* Top Header */}
      <div className="flex items-center justify-center p-4 relative bg-background border-b border-gray-100">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-[16px] font-semibold">Step 3 of 3</h1>
      </div>

      <div className="flex-1 px-6 pt-6 max-w-sm mx-auto w-full">
        <h1 className="text-[28px] font-extrabold mb-2 text-foreground leading-tight tracking-tight">
          Set up your profile
        </h1>
        <p className="text-[15px] text-muted-foreground mb-8">
          Help buyers and sellers learn more about who they are transacting with.
        </p>

        <form id="profile-form" onSubmit={handleSetup} className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center border-2 border-dashed border-gray-300 mb-3 cursor-pointer hover:bg-gray-100 transition-colors">
              <Camera className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-[14px] font-medium text-foreground mb-1">Profile Photo (Optional)</p>
            <p className="text-[12px] text-muted-foreground text-center">Add a profile picture to help build trust.</p>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-medium text-foreground">Username *</label>
            <Input required placeholder="@username" />
            <p className="text-[12px] text-muted-foreground">Choose a unique username visible to buyers and sellers.</p>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-medium text-foreground">About Me</label>
            <textarea 
              minLength={20}
              className="flex w-full rounded-2xl border border-input bg-card px-4 py-3 text-[16px] shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[100px]"
              placeholder="Tell buyers and sellers a little about yourself."
            />
          </div>

        </form>
      </div>

      <BottomActionBar>
        <Button form="profile-form" type="submit" className="w-full h-14 text-[16px]">
          Finish Account Setup
        </Button>
      </BottomActionBar>
    </div>
  );
}
