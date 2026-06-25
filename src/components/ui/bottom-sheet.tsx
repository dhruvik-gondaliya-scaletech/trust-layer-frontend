import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  className?: string
}

export function BottomSheet({ isOpen, onClose, children, title, className }: BottomSheetProps) {
  // Prevent scrolling on body when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250, duration: 0.25 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                onClose()
              }
            }}
            className={cn(
              "fixed inset-x-0 bottom-0 z-[100] mt-24 flex flex-col rounded-t-[28px] bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.12)] max-h-[90vh]",
              "md:mx-auto md:max-w-[480px]", // Constraint for desktop view
              className
            )}
          >
            <div className="w-full flex justify-center pt-3 pb-2 shrink-0">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>
            
            {(title) && (
              <div className="flex items-center justify-between px-6 pb-4 pt-2">
                <h2 className="text-[20px] font-extrabold text-gray-900">{title}</h2>
              </div>
            )}
            
            <div className="flex-1 overflow-y-auto px-6 pb-8 pt-2">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
