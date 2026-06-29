import * as React from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Check, ArrowRight, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TrackingSuccess() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  
  const state = location.state || {
    carrier: "USPS",
    trackingNumber: "9400123456789012345678",
    isInsured: true,
    shippingDate: "06/25/2026"
  }

  const formatEstimatedDelivery = (dateStr: string) => {
    if (!dateStr) return "N/A"
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      const date = new Date(Number(parts[2]), Number(parts[0]) - 1, Number(parts[1]))
      return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    }
    return dateStr
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 relative"
        >
          <div className="absolute inset-0 bg-emerald-500 rounded-full opacity-20 animate-ping" />
          <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg relative z-10">
            <Check className="w-7 h-7 stroke-[3]" />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-extrabold text-foreground mb-3"
        >
          Tracking information uploaded successfully.
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground w-full max-w-[320px] mx-auto space-y-4"
        >
          <p className="text-[14px] px-2">
            The buyer has been notified and can now track the shipment.
          </p>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-left space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-50">
              <span className="text-muted-foreground text-[14px]">Carrier</span>
              <span className="font-bold text-[14px]">{state.carrier}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-50">
              <span className="text-muted-foreground text-[14px]">Tracking Number</span>
              <span className="font-bold text-[14px]">{state.trackingNumber}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-50">
              <span className="text-muted-foreground text-[14px]">Insurance</span>
              <span className="font-bold text-[14px]">{state.isInsured ? "Insured" : "Not Insured"}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-[14px]">Estimated Delivery</span>
              <span className="font-bold text-[14px]">{formatEstimatedDelivery(state.shippingDate)}</span>
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
          onClick={() => navigate(`/deal-details/${id || 'TRUST-1024'}`)} 
          className="w-full h-14 text-[16px] font-bold shadow-sm"
        >
          View Deal <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </motion.div>
    </div>
  )
}
