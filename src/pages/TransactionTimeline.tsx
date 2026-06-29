import * as React from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, Shield, CheckCircle2, Clock, Truck, ShieldCheck, MapPin, Package, AlertCircle, RefreshCcw, Handshake, ExternalLink, Star, Copy, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TransactionProgress, type TransactionState } from "@/components/ui/transaction-progress"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"

type DealStatus = 'Funded' | 'Shipped' | 'Delivered' | 'Closed' | 'Declined' | 'Republished';

export default function TransactionTimeline() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [showConfirmModal, setShowConfirmModal] = React.useState(false)
  const [isCopied, setIsCopied] = React.useState(false)

  const handleCopyTracking = () => {
    navigator.clipboard.writeText("940010920556801844")
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }
  const isDealDeclined = localStorage.getItem("dealDeclined") === "true"
  const isDealRepublished = localStorage.getItem("dealRepublished") === "true"

  // Dynamic status handling for the demo
  let status: DealStatus = 'Funded'
  if (id === 'TRUST-0992') status = 'Shipped'
  else if (id === 'TRUST-0845') status = 'Delivered'
  else if (id === 'TRUST-0000') status = 'Closed'
  else if (isDealDeclined) status = 'Declined'
  else if (isDealRepublished) status = 'Republished'

  const getTransactionState = (): TransactionState => {
    switch (status) {
      case 'Funded':
        return 'Payment Completed'
      case 'Shipped':
        return 'Tracking Uploaded'
      case 'Delivered':
        return 'Review Phase'
      case 'Closed':
        return 'Transaction Completed'
      case 'Declined':
      case 'Republished':
        return 'Deal Declined'
      default:
        return 'Payment Completed'
    }
  }

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

        {/* State A - Waiting for Shipment */}
        {(status === 'Funded' || status === 'Declined' || status === 'Republished') && (
          <>
            <div className="text-center space-y-4 mt-6 mb-6">
              <div className="inline-flex items-center px-3 py-1 bg-orange-50/80 text-orange-600 rounded-full text-[12px] font-bold uppercase tracking-wider">
                {status === 'Declined' ? 'Changes Requested' : status === 'Republished' ? 'Ready for Review' : 'Waiting for Shipment'}
              </div>
              <p className="text-[#64748B] text-[14px] px-2 leading-relaxed">
                {status === 'Declined'
                  ? "The buyer requested updates before proceeding. The seller is currently updating the listing."
                  : status === 'Republished'
                    ? "The seller has updated the listing. The buyer will review it again."
                    : "The seller is preparing your package.\nTracking information will appear here once the item has\nbeen shipped.\nWe'll notify you as soon as shipping details are available."
                }
              </p>
            </div>
            <Card>
              <CardContent className="p-5 space-y-4">
                <h2 className="font-bold text-[16px]">What's happening next?</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-[5px] h-[5px] rounded-full bg-gray-400 mt-[8px] shrink-0" />
                    <span className="text-[14px] text-[#64748B]">Seller prepares your package.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-[5px] h-[5px] rounded-full bg-gray-400 mt-[8px] shrink-0" />
                    <span className="text-[14px] text-[#64748B]">Seller ships the item.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-[5px] h-[5px] rounded-full bg-gray-400 mt-[8px] shrink-0" />
                    <span className="text-[14px] text-[#64748B]">Tracking information appears automatically.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-[5px] h-[5px] rounded-full bg-gray-400 mt-[8px] shrink-0" />
                    <span className="text-[14px] text-[#64748B]">You'll be able to track your package here.</span>
                  </li>
                </ul>

                <div className="bg-[#F8FAFC] border-none p-5 rounded-[16px] mt-6">
                  <p className="text-[14px] font-medium text-[#0F172A] text-center">No tracking information available yet.</p>
                  <p className="text-[13px] text-[#64748B] text-center mt-1 leading-relaxed">
                    This section will automatically update after the seller<br />ships the item.
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* State B & C & D - Tracking Info */}
        {status !== 'Funded' && status !== 'Declined' && status !== 'Republished' && status !== 'Closed' && (
          <>
            <div className="text-center space-y-3 mt-4 mb-2">
              <div className="h-16 w-16 mx-auto bg-primary/10 flex items-center justify-center rounded-full">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">Tracking Added</h1>
              <p className="text-muted-foreground text-[14px] px-2 leading-relaxed">
                Tracking information has been provided by the seller. Track shipment progress directly with the carrier.
              </p>
            </div>
            <Card>
              <CardContent className="p-5 space-y-4">
                <h2 className="font-semibold text-[18px]">Tracking Information</h2>
                <div className="space-y-3">

                  <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                    <span className="text-muted-foreground text-[14px]">Estimated Delivery</span>
                    <span className="font-bold text-[14px]">Jul 02, 2026</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                    <span className="text-muted-foreground text-[14px]">Carrier</span>
                    <span className="font-bold text-[14px]">USPS</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-[14px]">Tracking Number</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[14px]">940010920556801844</span>
                      <button 
                        onClick={handleCopyTracking}
                        className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-500 hover:text-gray-900"
                        title="Copy tracking number"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
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
          </>
        )}

        {/* State D - Closed */}
        {status === 'Closed' && (
          <>
            <div className="text-center space-y-3 mt-4 mb-2">
              <div className="h-16 w-16 mx-auto bg-success/10 flex items-center justify-center rounded-full">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <h1 className="text-2xl font-bold">Transaction Completed</h1>
              <p className="text-muted-foreground text-[14px] px-2 leading-relaxed">
                This transaction has been completed successfully. Thank you for using TrustLayer.
              </p>
            </div>
            <Card>
              <CardContent className="p-5 space-y-4">
                <h2 className="font-semibold text-[18px]">Transaction Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                    <span className="text-muted-foreground text-[14px]">Deal ID</span>
                    <span className="font-bold text-[14px]">TRUST-1024</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                    <span className="text-muted-foreground text-[14px]">Date Completed</span>
                    <span className="font-bold text-[14px]">Oct 16, 2026</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                    <span className="text-muted-foreground text-[14px]">Payment Method</span>
                    <span className="font-bold text-[14px]">Credit Card</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-[14px]">Total Paid</span>
                    <span className="font-bold text-[14px]">$4,300.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Timeline */}
        <TransactionProgress state={getTransactionState()} />

        {/* State C - Delivered (Review Period) */}
        {status === 'Delivered' && (
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
        )}
      </div>

      <BottomActionBar>
        <div className="grid grid-cols-2 gap-3 w-full px-1">
          {(status === 'Funded' || status === 'Shipped') && (
            <>
              <Button variant="outline" className="w-full h-14 text-[14px] font-bold text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 px-2 leading-tight whitespace-normal" onClick={() => navigate(`/dispute-flow/${id || 'TRUST-1024'}`)}>
                Report an Issue
              </Button>
              <Button disabled variant="outline" className="w-full h-14 flex-col justify-center gap-0 border-gray-200 bg-gray-50 px-2 overflow-hidden">
                <span className="text-[14px] font-bold text-gray-400">Confirm Delivery</span>
                <span className="text-[9.5px] font-normal text-gray-400 mt-0.5 whitespace-normal text-center leading-tight max-w-[140px]">Available after the estimated delivery date.</span>
              </Button>
            </>
          )}

          {status === 'Delivered' && (
            <>
              <Button variant="outline" className="w-full h-14 text-[14px] font-bold text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 px-2 leading-tight whitespace-normal" onClick={() => navigate(`/dispute-flow/${id || 'TRUST-1024'}`)}>
                Report an Issue
              </Button>
              <Button className="w-full h-14 text-[14px] font-bold bg-success hover:bg-success/90 text-white px-2 leading-tight whitespace-normal" onClick={() => setShowConfirmModal(true)}>
                Confirm Delivery
              </Button>
            </>
          )}

          {status === 'Closed' && (
            <Button className="col-span-2 w-full h-14 text-[16px] font-bold shadow-sm bg-primary hover:bg-primary/90 text-white" onClick={() => navigate("/review-seller/TRUST-1024")}>
              <Star className="w-5 h-5 mr-2" /> Leave Review
            </Button>
          )}
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
              <h3 className="text-[20px] font-extrabold text-center text-gray-900 mb-2">Confirm Delivery?</h3>
              <p className="text-[14px] text-gray-500 text-center font-medium mb-6 leading-relaxed">
                By confirming delivery, you acknowledge that you have received the item and it matches the agreed condition. This action will begin the payment release process and cannot be undone.
              </p>

              <div className="flex flex-col gap-2.5">
                <Button
                  className="w-full bg-success hover:bg-success/90 text-white font-bold h-12 rounded-xl text-[15px] shadow-sm"
                  onClick={() => {
                    setShowConfirmModal(false)
                    navigate(`/review-seller/${id || 'TRUST-1024'}`)
                  }}
                >
                  Yes, Confirm Delivery
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
