import * as React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { ShieldCheck, CheckCircle2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TransactionComplete() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const role = searchParams.get('role') || 'buyer'

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <div className="flex-1 flex flex-col items-center pt-20 px-6 pb-32 w-full max-w-[430px] mx-auto text-center">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)] relative"
        >
          <div className="absolute inset-0 rounded-full border-4 border-green-500 opacity-20" />
          <ShieldCheck className="w-12 h-12 text-green-600" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-[28px] font-extrabold tracking-tight text-foreground mb-3"
        >
          Transaction Complete
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-[15px] text-muted-foreground leading-relaxed max-w-[300px] mb-8"
        >
          Funds have been released and this transaction is now closed.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="w-full bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-left"
        >
          <div className="mb-4">
            <div className="font-bold text-[16px] text-foreground mb-0.5">Charizard Holo 1999</div>
            <div className="text-[12px] font-medium text-gray-500">TRUST-1024</div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-[12px] text-muted-foreground font-bold uppercase tracking-wider">Amount</span>
            <span className="font-bold text-[14px] text-green-600">$8,730</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <span className="text-[12px] text-muted-foreground font-bold uppercase tracking-wider">Feedback</span>
            <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full text-[12px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Review Submitted
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* FOOTER */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} 
        className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] p-4 pb-6 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-40 text-center"
      >
        <p className="text-[13px] font-medium text-muted-foreground mb-4">
          Thank you for letting TrustLayer protect your deal.
        </p>
        <Button 
          className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white"
          onClick={() => navigate(`/dashboard?mode=${role}`)}
        >
          Back To Dashboard
        </Button>
      </motion.div>
    </div>
  )
}
