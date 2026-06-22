import React from "react";
import { cn } from "@/lib/utils";

interface ProgressStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep: number;
  totalSteps: number;
  label?: string;
}

export function ProgressStepper({
  currentStep,
  totalSteps,
  label,
  className,
  ...props
}: ProgressStepperProps) {
  return (
    <div className={cn("flex flex-col space-y-3", className)} {...props}>
      {/* Bars */}
      <div className="flex gap-1.5 w-full">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index < currentStep;
          return (
            <div
              key={index}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                isActive ? "bg-primary" : "bg-gray-200"
              )}
            />
          );
        })}
      </div>

      {/* Label */}
      <div className="flex flex-col space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
          STEP {currentStep} OF {totalSteps}
        </span>
        {label && <h2 className="text-2xl font-bold text-foreground">{label}</h2>}
      </div>
    </div>
  );
}
