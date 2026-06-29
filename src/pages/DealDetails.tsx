import * as React from "react"
import { useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { ArrowUpRight, CheckCircle2, ChevronLeft, CreditCard, MessageCircle, Package, Shield, ShieldCheck, Truck, AlertCircle, Activity, Check, MapPin, Star, ArrowRight, Copy, FileText, ChevronUp, ChevronDown, Clock, Headphones, Upload } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, CheckCircle2 as CheckCircle2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { TransactionProgress, type TransactionState } from "@/components/ui/transaction-progress"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"

export default function DealDetails() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const role = searchParams.get('role') || 'buyer'
  
  // Local state for expandable sections
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [showDeliveryConfirmModal, setShowDeliveryConfirmModal] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  
  // Mock data for the specific deal
  const dealId = id || "TRUST-1024"
  
  // Dynamic status handling (can be "Completed", "Awaiting Shipment", "In Transit", "Awaiting Buyer Confirmation")
  const status: string = "Completed" // Try changing this to test different states
  
  // Basic Info
  const productName = "Charizard Holo 1999"
  const productCondition = "Mint Condition - PSA 9"
  const itemPrice = 4250
  const shipping = 30
  const platformFee = 20
  const feePaidBy: string = "buyer" // or "seller"
  const amount = itemPrice + shipping + (feePaidBy === "buyer" ? platformFee : 0)
  const sellerReceived = itemPrice - (feePaidBy === "seller" ? platformFee : 0)
  
  // Dynamic role and status handling
  const userRole: string = "seller" // Fixed to "seller" as per new routing architecture
  const isSeller = userRole === "seller"
  const orderType: string = "Online Transaction" // Defaulting to Online for tracking flow
  
  const trackingNumber: string | null = "9400123456789012345678"
  const carrier = "USPS Priority"

  
  const theme = {
    text: isSeller ? "text-blue-600" : "text-[#10B981]",
    bg: isSeller ? "bg-blue-600" : "bg-[#10B981]",
    bgHover: isSeller ? "hover:bg-blue-700" : "hover:bg-[#059669]",
    bgLight: isSeller ? "bg-blue-50" : "bg-[#10B981]/10",
    borderLight: isSeller ? "border-blue-100" : "border-[#10B981]/20",
    bgSoft: isSeller ? "bg-blue-100" : "bg-[#10B981]/20",
    gradient: isSeller ? "bg-gradient-to-br from-blue-500 to-blue-600" : "bg-gradient-to-br from-[#10B981] to-[#059669]",
  }

  const getStatusContent = () => {
    if (orderType === "In-Person Transaction") {
      if (isSeller) {
        switch (status) {
          case "Completed":
            return {
              title: "Payment Received",
              description: `$${sellerReceived.toLocaleString()} has been released to your wallet.\n\nBuyer confirmed delivery and the transaction is complete.`,
              icon: CheckCircle2,
            }
          case "Meeting Scheduled":
            return {
              title: "Arrange Meetup",
              description: "Buyer has completed payment. Funds are on hold.\n\nPlease arrange a meetup to exchange the item.",
              icon: MapPin,
            }
          case "Item Exchanged":
            return {
              title: "Item Exchanged",
              description: "Waiting for buyer to confirm they received the item.",
              icon: Check,
            }
          default:
            return { title: "", description: "", icon: CheckCircle2 }
        }
      } else {
        switch (status) {
          case "Completed":
            return {
              title: "Purchase Complete",
              description: "Your purchase has been completed successfully.\n\nThe seller has received the funds.",
              icon: CheckCircle2,
            }
          case "Meeting Scheduled":
            return {
              title: "Meeting Scheduled",
              description: "Payment successful. Funds are on hold.\n\nMeet with the seller to receive your item.",
              icon: MapPin,
            }
          case "Item Exchanged":
            return {
              title: "Confirm Receipt",
              description: "Did you receive the item?\n\nPlease confirm to release funds to the seller.",
              icon: Check,
            }
          default:
            return { title: "", description: "", icon: CheckCircle2 }
        }
      }
    } else {
      if (isSeller) {
        switch (status) {
          case "Completed":
            return {
              title: "Payment Received",
              description: `$${sellerReceived.toLocaleString()} has been released to your wallet.\n\nBuyer confirmed delivery and the transaction is complete.`,
              icon: CheckCircle2,
            }
          case "Awaiting Shipment":
            return {
              title: "Buyer Paid",
              description: "Buyer completed payment.\n\nFunds are currently on hold.\n\nNext Step:\nPrepare and ship the item.",
              icon: ShieldCheck,
            }
          case "In Transit":
            return {
              title: "Shipped",
              description: "Tracking shared with buyer.\n\nPackage is in transit.",
              icon: Truck,
            }
          case "Awaiting Buyer Confirmation":
            return {
              title: "Delivered",
              description: "Package delivered.\n\nWaiting for buyer confirmation.",
              icon: Package,
            }
          default:
            return { title: "", description: "", icon: CheckCircle2 }
        }
      } else {
        switch (status) {
          case "Completed":
            return {
              title: "Purchase Complete",
              description: "Your purchase has been completed successfully.\n\nThe seller has received the funds.",
              icon: CheckCircle2,
            }
          case "Awaiting Shipment":
            return {
              title: "Payment",
              description: "Payment successful.\n\nYour funds are currently on hold until delivery is confirmed.",
              icon: ShieldCheck,
            }
          case "In Transit":
            return {
              title: "Shipped",
              description: "Seller shipped your item.\n\nTracking information has been shared.",
              icon: Truck,
            }
          case "Awaiting Buyer Confirmation":
            return {
              title: "Delivered",
              description: "Package delivered.\n\nPlease confirm you received the correct item.",
              icon: Package,
            }
          default:
            return { title: "", description: "", icon: CheckCircle2 }
        }
      }
    }
  }

  const statusContent = getStatusContent()
  
  const getTransactionState = (): TransactionState => {
    if (status === "Completed") return "Transaction Completed"
    if (status === "Awaiting Buyer Confirmation") return "Buyer Receives Package"
    if (status === "In Transit") return "Tracking Uploaded"
    if (status === "Awaiting Shipment") return role === "seller" ? "Seller Preparing Shipment" : "Payment Completed"
    if (status === "Meeting Scheduled") return role === "seller" ? "Seller Preparing Shipment" : "Payment Completed"
    if (status === "Item Exchanged") return "Buyer Receives Package"
    return "Payment Completed"
  }

  const activityLog = [
    { id: 1, action: "Funds released to seller", time: "Jun 20, 5:05 PM", icon: CreditCard },
    { id: 2, action: "Buyer confirmed delivery", time: "Jun 20, 5:00 PM", icon: CheckCircle2 },
    { id: 3, action: "Package delivered", time: "Jun 20, 2:45 PM", icon: Package },
    { id: 4, action: "Tracking added (USPS)", time: "Jun 19, 9:15 AM", icon: Truck },
    { id: 5, action: "Buyer completed payment", time: "Jun 18, 11:30 AM", icon: ShieldCheck },
  ]

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  const handleTrackPackage = (carrierName: string, trackNum: string | null) => {
    if (!trackNum) return;
    let url = "";
    const lowerCarrier = carrierName.toLowerCase();
    if (lowerCarrier.includes("usps")) url = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackNum}`;
    else if (lowerCarrier.includes("ups")) url = `https://www.ups.com/track?tracknum=${trackNum}`;
    else if (lowerCarrier.includes("fedex")) url = `https://www.fedex.com/fedextrack/?trknbr=${trackNum}`;
    else if (lowerCarrier.includes("dhl")) url = `https://www.dhl.com/global-en/home/tracking.html?tracking-id=${trackNum}`;
    else url = `https://google.com/search?q=${trackNum}`;
    
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-[100px]">
      
      {/* 1. Hero Section */}
      <div className="relative h-[280px] w-full bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=800&auto=format&fit=crop" 
          alt={productName} 
          className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className={cn(
            "px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border",
            status === "Completed" ? "bg-green-500/20 text-green-300 border-green-500/30" :
            status === "In Transit" ? "bg-blue-500/20 text-blue-300 border-blue-500/30" :
            "bg-orange-500/20 text-orange-300 border-orange-500/30"
          )}>
            {status}
          </div>
        </div>

        <div className="absolute bottom-6 left-5 right-5 z-10">
          <p className="text-gray-300 font-bold text-[13px] mb-1">{dealId}</p>
          <h1 className="text-white text-[28px] font-extrabold leading-tight mb-2 tracking-tight">{productName}</h1>
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-[14px] font-medium">{productCondition}</span>
            <span className="text-white text-[28px] font-black">${amount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 relative z-20 space-y-4">
        
        {/* 2. Dynamic Transaction Status Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "rounded-2xl p-5 shadow-lg relative overflow-hidden text-white",
            theme.gradient
          )}
        >
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0 backdrop-blur-md mt-0.5">
                <statusContent.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-[18px] font-bold leading-tight mb-1.5">
                  {statusContent.title}
                </h2>
                <div className="text-[13px] text-white/90 font-medium whitespace-pre-wrap leading-relaxed">
                  {statusContent.description}
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md flex justify-between items-center mt-2">
              <span className="text-[12px] font-semibold text-white/90">Last Updated</span>
              <span className="text-[12px] font-bold text-white">Jun 20, 05:05 PM</span>
            </div>
          </div>
        </motion.div>

        {/* 3. Progress Journey */}
        <TransactionProgress state={getTransactionState()} userRole={role as 'buyer' | 'seller'} theme={theme} />

        {/* 4. Unified Transaction Summary */}
        <Card className="p-0 border-gray-100 shadow-sm rounded-2xl overflow-hidden">
          <div className="p-5 bg-white">
            <h3 className="font-bold text-[16px] text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className={cn("w-4 h-4", theme.text)} /> Payment Summary
            </h3>
            
            <div className="space-y-3 text-[14px]">
              <div className="flex justify-between items-center text-gray-600 font-medium">
                <span>Item Price</span>
                <span className="text-gray-900 font-bold">${itemPrice.toLocaleString()}</span>
              </div>
              {orderType !== "In-Person Transaction" && (
                <div className="flex justify-between items-center text-gray-600 font-medium">
                  <span>Shipping</span>
                  <span className="text-gray-900 font-bold">${shipping.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-gray-600 font-medium">
                <span>Platform Fee</span>
                <span className="text-gray-900 font-bold">${platformFee.toLocaleString()} ({feePaidBy === "buyer" ? "Buyer" : "Seller"})</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 border-t border-gray-100 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Buyer Paid</span>
              <span className="text-[18px] font-black text-gray-900">${amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Seller Received</span>
              <span className="text-[16px] font-bold text-green-600">${sellerReceived.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* 5. Trading With */}
        <Card className="p-4 border-gray-100 shadow-sm rounded-2xl flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0 text-[18px]", theme.bgSoft, theme.text)}>
              PM
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="font-bold text-[15px] text-gray-900">PokeMaster99</span>
                <ShieldCheck className={cn("w-3.5 h-3.5", theme.text)} />
              </div>
              <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-500">
                <span className="flex items-center gap-0.5 text-orange-500"><Star className="w-3 h-3 fill-current" /> 4.9</span>
                <span>•</span>
                <span>120 Deals</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" className={cn("h-9 w-9 p-0 rounded-full bg-gray-50 hover:bg-gray-100", theme.text)}>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Card>

        {/* 6. Compact Details Card (Shipping or Meeting) */}
        {orderType === "In-Person Transaction" ? (
          <Card className="p-4 border-gray-100 shadow-sm rounded-2xl bg-white space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="font-bold text-[15px] text-gray-900">Meeting Details</h3>
            </div>
            
            <div className="flex gap-2 text-[13px] text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="leading-tight space-y-2 w-full">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-700">Location</span>
                  <span>Starbucks, 123 Main St</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-gray-700">Date</span>
                  <span>June 20, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-gray-700">Time</span>
                  <span>02:30 PM</span>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-[13px]">
              <span className="font-bold text-gray-700 block mb-1">Notes</span>
              <span className="text-gray-600">I'll be wearing a red jacket. Meet inside.</span>
            </div>
          </Card>
        ) : (
          <Card className="p-4 border-gray-100 shadow-sm rounded-2xl bg-white space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-orange-600" />
                </div>
                <h3 className="font-bold text-[15px] text-gray-900">{carrier}</h3>
              </div>
              
              {status !== "Awaiting Shipment" && (
                <div 
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full border border-gray-100 transition-colors",
                    trackingNumber ? "cursor-pointer hover:bg-gray-100" : "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => trackingNumber && handleCopy(trackingNumber)}
                  title={!trackingNumber ? "Tracking information is not available yet." : "Copy tracking number"}
                >
                  <span className="text-[12px] font-bold text-gray-600 tracking-wide">
                    {trackingNumber ? `${trackingNumber.substring(0, 9)}...` : 'N/A'}
                  </span>
                  {isCopied ? <CheckCircle2 className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-gray-400" />}
                </div>
              )}
            </div>
            
            {status !== "Completed" && (
               <div className="flex gap-2 text-[12px] text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100">
                 <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gray-400" />
                 <div className="leading-tight">
                   <p className="font-bold text-gray-700 mb-0.5">Delivery Address</p>
                   <p>123 Main Street, Apt 4B, Austin, TX 78701</p>
                 </div>
               </div>
            )}
            
            {status !== "Awaiting Shipment" && (
              <Button 
                variant="outline" 
                className="w-full text-[13px] font-bold border-gray-200"
                onClick={() => trackingNumber && handleTrackPackage(carrier, trackingNumber)}
                disabled={!trackingNumber}
                title={!trackingNumber ? "Tracking information is not available yet." : undefined}
              >
                Track Package <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </Card>
        )}

      </div>

      {/* 8. Primary Action */}
      <BottomActionBar>
        <div className="w-full flex flex-col gap-2">
          {status === "Completed" && (
            <Button className={cn("w-full h-14 text-[16px] font-bold shadow-md text-white rounded-xl", theme.bg, theme.bgHover)} onClick={() => navigate(`/review-seller/${id}`)}>
              <Star className="mr-2 h-5 w-5 fill-current" /> Leave Review
            </Button>
          )}

          {status === "Awaiting Shipment" && orderType !== "In-Person Transaction" && (
            <Button className={cn("w-full h-14 text-[16px] font-bold shadow-md text-white rounded-xl", theme.bg, theme.bgHover)}>
              <Upload className="mr-2 h-5 w-5" /> Upload Tracking
            </Button>
          )}

          {status === "Meeting Scheduled" && orderType === "In-Person Transaction" && (
            <Button className={cn("w-full h-14 text-[16px] font-bold shadow-md text-white rounded-xl", theme.bg, theme.bgHover)}>
              <MapPin className="mr-2 h-5 w-5" /> View Directions
            </Button>
          )}

          {status === "In Transit" && orderType !== "In-Person Transaction" && !isSeller && (
            <>
              <Button className={cn("w-full h-14 text-[16px] font-bold shadow-md text-white rounded-xl", theme.bg, theme.bgHover)} onClick={() => window.open('https://tools.usps.com/go/TrackConfirmAction_input', '_blank')}>
                <ExternalLink className="mr-2 h-5 w-5" /> Track Package
              </Button>
              <Button variant="outline" className="w-full h-14 text-[16px] font-bold rounded-xl border-gray-200 text-gray-700 bg-white" onClick={() => setShowDeliveryConfirmModal(true)}>
                <CheckCircle2Icon className="mr-2 h-5 w-5" /> I've Received My Item
              </Button>
            </>
          )}
          
          {status === "In Transit" && orderType !== "In-Person Transaction" && isSeller && (
            <Button className={cn("w-full h-14 text-[16px] font-bold shadow-md text-white rounded-xl", theme.bg, theme.bgHover)}>
              <Truck className="mr-2 h-5 w-5" /> Track Package
            </Button>
          )}

          {(status === "Awaiting Buyer Confirmation" || status === "Item Exchanged") && !isSeller && (
            <>
              <Button className={cn("w-full h-14 text-[16px] font-bold shadow-md text-white rounded-xl", theme.bg, theme.bgHover)} onClick={() => navigate(`/review-seller/${id}`)}>
                <Star className="mr-2 h-5 w-5 fill-current" /> Leave Review
              </Button>
              <Button variant="outline" className="w-full h-14 text-[16px] font-bold rounded-xl border-gray-200 text-gray-700 bg-white" onClick={() => navigate(`/transaction-complete`)}>
                <FileText className="mr-2 h-5 w-5" /> View Transaction Summary
              </Button>
            </>
          )}
        </div>
      </BottomActionBar>

      {/* Delivery Confirmation Modal */}
      <AnimatePresence>
        {showDeliveryConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 w-full max-w-[340px] shadow-2xl relative overflow-hidden"
            >
              <div className="text-center mb-6 pt-2">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-sm">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Have you received and inspected your item?</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  Confirming delivery will start the fund release process. If there is an issue, please report it before confirming.
                </p>
              </div>
              
              <div className="flex flex-col gap-3 relative z-10">
                <Button 
                  variant="outline"
                  className="w-full h-12 text-[15px] font-bold rounded-xl text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700" 
                  onClick={() => setShowDeliveryConfirmModal(false)}
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Report an Issue
                </Button>
                <Button 
                  className={cn("w-full h-12 text-[15px] font-bold rounded-xl shadow-sm text-white", theme.bg, theme.bgHover)} 
                  onClick={() => {
                    setShowDeliveryConfirmModal(false);
                    // In a real app, this would trigger an API call and status update
                    navigate(`/deal-details/${id}?role=buyer`);
                  }}
                >
                  Confirm Delivery
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full h-10 text-[14px] font-bold rounded-xl text-gray-500" 
                  onClick={() => setShowDeliveryConfirmModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isCopied && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-[120px] left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-3 z-50 whitespace-nowrap"
          >
            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-green-400" />
            </div>
            <span className="text-[13px] font-medium tracking-wide">Tracking number copied</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
