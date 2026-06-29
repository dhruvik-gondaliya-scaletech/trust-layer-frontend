import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ChevronLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"
import { Card, CardContent } from "@/components/ui/card"
import { TransactionProgress } from "@/components/ui/transaction-progress"

export default function ReviewFeedback() {
  const navigate = useNavigate()
  const { id } = useParams()
  
  const [reason, setReason] = useState("")
  const [message, setMessage] = useState("")
  
  useEffect(() => {
    setReason(localStorage.getItem("declineReason") || "Other")
    setMessage(localStorage.getItem("declineMessage") || "")
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-[160px] font-sans">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-40 shadow-sm border-b border-gray-100">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-1 -ml-1 rounded-full text-foreground hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[16px]">Review Feedback</span>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6 animate-in fade-in duration-500">
        
        <TransactionProgress state="Deal Declined" userRole="seller" />
        {/* Deal Info */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-[60px] h-[60px] rounded-xl overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
            <img src="/pokemon-main.jpg" alt="Deal" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] text-muted-foreground font-medium">{id}</span>
            <span className="text-[16px] font-bold text-foreground">Charizard Holo 1999</span>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="space-y-4">
          <h2 className="text-[18px] font-bold text-foreground flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Buyer requested changes
          </h2>
          
          <Card className="border-red-100 shadow-none overflow-hidden bg-red-50/30">
            <CardContent className="p-5 space-y-4">
              <div>
                <p className="text-[13px] text-red-600/80 font-bold uppercase tracking-wider mb-1">Reason</p>
                <p className="text-[16px] font-bold text-gray-900">{reason}</p>
              </div>
              
              {message && (
                <div>
                  <p className="text-[13px] text-red-600/80 font-bold uppercase tracking-wider mb-1">Additional Comments</p>
                  <div className="bg-white p-4 rounded-xl border border-red-100 text-[15px] text-gray-800 leading-relaxed italic">
                    "{message}"
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>

      <BottomActionBar>
        <div className="flex flex-col gap-3 w-full">
          <Button 
            className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white"
            onClick={() => navigate(`/create-deal?mode=edit&dealId=${id}`)}
          >
            Update Deal
          </Button>
          <Button 
            variant="ghost" 
            className="w-full h-[48px] text-[15px] font-bold rounded-2xl text-muted-foreground"
            onClick={() => navigate("/dashboard")}
          >
            Close
          </Button>
        </div>
      </BottomActionBar>
    </div>
  )
}
