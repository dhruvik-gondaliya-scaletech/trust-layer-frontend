import * as React from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, MapPin, Package, CheckCircle2, CircleDashed, ChevronLeft, ExternalLink, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"

export default function TransactionTimeline() {
  const navigate = useNavigate()
  const [showConfirmModal, setShowConfirmModal] = React.useState(false)
  
  const steps = [
    { label: "Deal Created", status: "completed", date: "Oct 12, 10:00 AM" },
    { label: "Buyer Funded", status: "completed", date: "Oct 12, 11:30 AM" },
    { label: "Tracking Added", status: "current", date: "Oct 13, 09:15 AM" },
    { label: "Buyer Confirmed Delivery", status: "upcoming" },
    { label: "Funds Released", status: "upcoming" }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-[140px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 -ml-1 rounded-full text-foreground hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-bold text-[15px]">TrustLayer</span>
          </div>
        </div>
        <div className="text-[12px] text-muted-foreground flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> Secured by TrustLayer
        </div>
      </div>

      <div className="flex-1 px-5 pt-4 animate-in fade-in duration-500 space-y-6">
        {/* Status Header */}
        <div className="text-center space-y-2 mt-4">
          <div className="h-16 w-16 mx-auto bg-primary/10 flex items-center justify-center rounded-full">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Tracking Added</h1>
          <p className="text-muted-foreground text-[14px] px-2 leading-relaxed">
            Tracking information has been provided by the seller. Track shipment progress directly with the carrier.
          </p>
        </div>

        {/* Tracking Information Card */}
        <Card>
          <CardContent className="p-5 space-y-4">
            <h2 className="font-semibold text-[18px]">Tracking Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-muted-foreground text-[14px]">Carrier</span>
                <span className="font-bold text-[14px]">USPS</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="text-muted-foreground text-[14px]">Tracking Number</span>
                <span className="font-bold text-[14px]">940010920556801844</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-[14px]">Date Added</span>
                <span className="font-bold text-[14px]">Oct 13, 2026</span>
              </div>
            </div>
            
            <div className="bg-blue-50 text-blue-800 p-3.5 rounded-xl text-[13px] font-medium leading-relaxed">
              Shipment updates are provided by the carrier. Track your package directly using the carrier link below.
            </div>

            <Button className="w-full font-bold h-12" variant="outline" onClick={() => window.open('https://usps.com', '_blank')}>
              Track Package <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>


        {/* Timeline */}
        <Card>
          <CardContent className="p-5">
            <h2 className="font-semibold text-[18px] mb-6">Transaction Timeline</h2>

            <div className="space-y-6">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  {idx !== steps.length - 1 && (
                    <div className={`absolute left-[11px] top-[28px] bottom-[-28px] w-0.5 ${step.status === 'completed' ? 'bg-success' : 'bg-muted'}`} />
                  )}

                  <div className="relative z-10 flex-shrink-0 pt-1">
                    {step.status === 'completed' && <CheckCircle2 className="h-6 w-6 text-success bg-background rounded-full" />}
                    {step.status === 'current' && (
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="h-3 w-3 bg-primary rounded-full" />
                      </div>
                    )}
                    {step.status === 'upcoming' && <CircleDashed className="h-6 w-6 text-muted-foreground bg-background rounded-full" />}
                  </div>

                  <div className={`flex-1 pt-1 ${step.status === 'upcoming' ? 'opacity-50' : ''}`}>
                    <h4 className={`font-semibold text-[15px] ${step.status === 'current' ? 'text-primary' : ''}`}>
                      {step.label}
                    </h4>
                    {step.date && <p className="text-[13px] text-muted-foreground mt-0.5">{step.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Review Period Active Card */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <h2 className="font-semibold text-[18px] text-blue-900">Review Period Active</h2>
            </div>
            <p className="text-[14px] text-blue-800 leading-relaxed font-medium">
              You have 14 days to inspect your item and report any issues.
            </p>
            <p className="text-[13px] text-blue-700 leading-relaxed">
              If no action is taken within 14 days, TrustLayer will automatically confirm delivery and release funds to the seller.
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomActionBar>
        <div className="flex gap-3 w-full">
          <Button variant="outline" className="flex-1 h-14 text-[14px] font-bold text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700" onClick={() => navigate("/dispute-flow/TRUST-1024")}>
            Report & Issue
          </Button>
          <Button className="flex-1 h-14 text-[14px] font-bold bg-success hover:bg-success/90" onClick={() => setShowConfirmModal(true)}>
            Confirm Delivery
          </Button>
        </div>
      </BottomActionBar>

      {/* Confirm Delivery Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-5 pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowConfirmModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-[340px] rounded-3xl p-6 relative z-10 shadow-2xl"
            >
              <h3 className="text-[20px] font-extrabold text-center text-gray-900 mb-2">Confirm Delivery</h3>
              <p className="text-[14px] text-gray-500 text-center font-medium mb-6">
                By confirming delivery, funds will be released to the seller and the transaction will be completed.
              </p>
              
              <div className="flex flex-col gap-2.5">
                <Button 
                  className="w-full bg-success hover:bg-success/90 text-white font-bold h-12 rounded-xl text-[15px] shadow-sm"
                  onClick={() => {
                    setShowConfirmModal(false)
                    navigate("/review-seller/TRUST-1024")
                  }}
                >
                  Confirm Delivery
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-600 font-bold h-12 rounded-xl text-[15px] hover:bg-gray-100"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
