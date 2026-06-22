import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  className?: string;
  name?: string;
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required,
  className,
  name
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(value || "");
  const containerRef = useRef<HTMLDivElement>(null);

  const currentValue = value !== undefined ? value : internalValue;

  const handleSelect = (val: string) => {
    setInternalValue(val);
    onChange?.(val);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === currentValue);

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      {/* Hidden input for native forms and required validation */}
      <select 
        name={name}
        required={required} 
        className="hidden" 
        value={currentValue}
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <div 
        className={cn(
          "flex h-14 w-full cursor-pointer items-center justify-between rounded-xl border border-input bg-card px-4 py-2 text-[16px] shadow-sm focus:outline-none focus:ring-1 focus:ring-ring transition-colors",
          isOpen && "ring-1 ring-ring border-ring"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={cn("truncate", !currentValue && "text-muted-foreground")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-input bg-card shadow-lg"
          >
            <div className="max-h-60 overflow-auto p-1">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "cursor-pointer select-none rounded-lg px-4 py-3 text-[15px] hover:bg-secondary hover:text-secondary-foreground transition-colors",
                    currentValue === option.value && "bg-primary/10 text-primary font-medium"
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
