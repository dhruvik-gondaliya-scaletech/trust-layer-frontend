import * as React from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { 
  ChevronLeft, CheckCircle2, Download, Headphones, 
  Package, MapPin, Truck, Check, ShieldCheck, 
  Copy, ArrowRight, FileText, User, Upload, MessageSquare,
  Clock, CreditCard, Activity, Star, ChevronDown, ChevronUp, AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function DealDetails() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  
  // Local state for expandable sections
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  
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
  
  const milestones = orderType === "In-Person Transaction" ? [
    { id: 'created', label: 'Deal Created', date: 'Jun 18, 10:00 AM', completed: true },
    { id: 'funded', label: 'Buyer Payment Completed', date: 'Jun 18, 11:30 AM', completed: true },
    { id: 'scheduled', label: 'Meeting Scheduled', date: 'Jun 19, 09:15 AM', completed: status === "Item Exchanged" || status === "Completed" },
    { id: 'exchanged', label: 'Item Exchanged', date: 'Jun 20, 02:45 PM', completed: status === "Completed" },
    { id: 'confirmed', label: 'Buyer Confirmed Receipt', date: 'Jun 20, 05:00 PM', completed: status === "Completed" },
    { id: 'released', label: 'Funds Released', date: 'Jun 20, 05:05 PM', completed: status === "Completed" },
  ] : [
    { id: 'created', label: 'Deal Created', date: 'Jun 18, 10:00 AM', completed: true },
    { id: 'funded', label: 'Payment Received', date: 'Jun 18, 11:30 AM', completed: true },
    { id: 'shipped', label: 'Package Shipped', date: 'Jun 19, 09:15 AM', completed: status !== "Awaiting Shipment" },
    { id: 'delivered', label: 'Package Delivered', date: 'Jun 20, 02:45 PM', completed: status === "Completed" || status === "Awaiting Buyer Confirmation" },
    { id: 'released', label: 'Funds Released', date: 'Jun 20, 05:05 PM', completed: status === "Completed" },
  ]

  const activityLog = [
    { id: 1, action: "Funds released to seller", time: "Jun 20, 5:05 PM", icon: CreditCard },
    { id: 2, action: "Buyer confirmed delivery", time: "Jun 20, 5:00 PM", icon: CheckCircle2 },
    { id: 3, action: "Package delivered", time: "Jun 20, 2:45 PM", icon: Package },
    { id: 4, action: "Tracking added (USPS)", time: "Jun 19, 9:15 AM", icon: Truck },
    { id: 5, action: "Buyer completed payment", time: "Jun 18, 11:30 AM", icon: ShieldCheck },
  ]

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
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

        {/* 3. Progress Journey (5 visual milestones) */}
        <Card className="p-5 border-gray-100 shadow-sm rounded-2xl">
          <h3 className="font-bold text-[16px] mb-5 text-gray-900 flex items-center gap-2">
            <Activity className={cn("w-4 h-4", theme.text)} /> Progress
          </h3>
          
          <div className="flex justify-between items-center relative">
            {/* Connecting line */}
            <div className="absolute left-[10%] right-[10%] top-4 h-[2px] bg-gray-100 z-0">
              <div 
                className={cn("h-full transition-all duration-500", theme.bg)}
                style={{ 
                  width: orderType === "In-Person Transaction" 
                    ? (status === "Completed" ? "100%" : status === "Item Exchanged" ? "60%" : status === "Meeting Scheduled" ? "40%" : "20%")
                    : (status === "Completed" ? "100%" : status === "Awaiting Buyer Confirmation" ? "75%" : status === "In Transit" ? "50%" : status === "Awaiting Shipment" ? "25%" : "0%") 
                }}
              />
            </div>
            
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative z-10 flex flex-col items-center gap-2 group" style={{ width: `${100/milestones.length}%` }}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold transition-colors shadow-sm",
                  milestone.completed ? cn("border-2 border-white", theme.bg) : "bg-gray-100 text-gray-400 border-2 border-white"
                )}>
                  {milestone.completed ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <div className="text-center">
                  <p className={cn("text-[10px] font-bold leading-tight max-w-[60px]", milestone.completed ? "text-gray-900" : "text-gray-400")}>
                    {milestone.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

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
                <h3 className="font-bold text-[15px] text-gray-900">USPS Priority</h3>
              </div>
              
              {status !== "Awaiting Shipment" && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleCopy("9400123456789012345678")}>
                  <span className="text-[12px] font-bold text-gray-600 tracking-wide">940012345...</span>
                  <Copy className="w-3 h-3 text-gray-400" />
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
              <Button variant="outline" className="w-full text-[13px] font-bold border-gray-200">
                Track Package <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </Card>
        )}

        {/* 7. More Details (Expandable Sections) */}
        <div className="space-y-2 mt-6">
          <h3 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider px-2 mb-3">More Details</h3>
          
          {/* Documents */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
            <button 
              onClick={() => toggleSection('documents')}
              className="w-full p-4 flex justify-between items-center font-bold text-[15px] text-gray-900"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" /> Documents
              </div>
              {expandedSection === 'documents' ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            <AnimatePresence>
              {expandedSection === 'documents' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 pb-4"
                >
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button variant="outline" className="h-12 flex flex-col justify-center items-center gap-1 border-gray-200 bg-gray-50 hover:bg-gray-100">
                      <span className="text-[11px] uppercase font-bold text-gray-600">Invoice</span>
                    </Button>
                    <Button variant="outline" className="h-12 flex flex-col justify-center items-center gap-1 border-gray-200 bg-gray-50 hover:bg-gray-100">
                      <span className="text-[11px] uppercase font-bold text-gray-600">Shipping Label</span>
                    </Button>
                    <Button variant="outline" className="h-12 flex flex-col justify-center items-center gap-1 border-gray-200 bg-gray-50 hover:bg-gray-100" disabled={status !== "Completed"}>
                      <span className="text-[11px] uppercase font-bold text-gray-600">Receipt</span>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Activity History */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
            <button 
              onClick={() => toggleSection('activity')}
              className="w-full p-4 flex justify-between items-center font-bold text-[15px] text-gray-900"
            >
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" /> Activity History
              </div>
              {expandedSection === 'activity' ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            <AnimatePresence>
              {expandedSection === 'activity' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 pb-4"
                >
                  <div className="space-y-4 pt-2">
                    {activityLog.map((log) => (
                      <div key={log.id} className="flex gap-3 items-start">
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 border mt-0.5", theme.bgLight, theme.borderLight)}>
                          <log.icon className={cn("w-4 h-4", theme.text)} />
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-gray-900">{log.action}</p>
                          <p className="text-[12px] font-semibold text-gray-400">{log.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Support */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
             <button className="w-full p-4 flex justify-between items-center font-bold text-[15px] text-gray-900 hover:bg-gray-50 transition-colors">
               <div className="flex items-center gap-3">
                 <Headphones className="w-5 h-5 text-gray-400" /> Support
               </div>
               <ArrowRight className="w-5 h-5 text-gray-300" />
             </button>
          </div>
          
        </div>
      </div>

      {/* 8. Primary Action */}
      <BottomActionBar>
        <div className="w-full">
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

          {status === "In Transit" && orderType !== "In-Person Transaction" && (
            <Button className={cn("w-full h-14 text-[16px] font-bold shadow-md text-white rounded-xl", theme.bg, theme.bgHover)}>
              <Truck className="mr-2 h-5 w-5" /> Track Package
            </Button>
          )}

          {(status === "Awaiting Buyer Confirmation" || status === "Item Exchanged") && !isSeller && (
            <Button className={cn("w-full h-14 text-[16px] font-bold shadow-md text-white rounded-xl", theme.bg, theme.bgHover)}>
              <CheckCircle2 className="mr-2 h-5 w-5" /> Confirm Delivery
            </Button>
          )}
        </div>
      </BottomActionBar>
    </div>
  )
}
