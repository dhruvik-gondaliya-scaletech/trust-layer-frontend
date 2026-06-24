import * as React from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Check, ArrowRight, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TrackingSuccess() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8 relative"
        >
          <div className="absolute inset-0 bg-emerald-500 rounded-full opacity-20 animate-ping" />
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg relative z-10">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-extrabold text-foreground mb-3"
        >
          Tracking Information Added
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-[15px] max-w-[280px] mx-auto space-y-4"
        >
          <p>
            Shipment details have been shared with the buyer.
          </p>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0 border border-blue-100 text-blue-600">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[14px] text-foreground">In Transit</p>
                <p className="text-[12px] text-gray-500">Status updated successfully</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-5 pb-8 space-y-3 bg-white border-t border-gray-100"
      >
        <Button 
          onClick={() => navigate("/timeline/deal-123")} 
          className="w-full h-14 text-[16px] font-bold shadow-sm"
        >
          Return To Deal <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </motion.div>
    </div>
  )
}
