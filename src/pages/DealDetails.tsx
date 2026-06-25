import * as React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { 
  ChevronLeft, CheckCircle2, Download, Headphones, 
  Package, MapPin, Truck, Check, ShieldCheck, 
  Copy, ArrowRight, FileText, User, Upload, MessageSquare,
  Clock, CreditCard, Activity, Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"
import { cn } from "@/lib/utils"

export default function DealDetails() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  
  // Mock data for the specific deal
  const dealId = id || "TRUST-1024"
  
  // Dynamic status handling (can be "Completed", "Awaiting Shipment", "In Transit", "Awaiting Buyer Confirmation")
  const status: string = "Completed" // Try changing this to test different states
  
  // Basic Info
  const productName = "Charizard Holo 1999"
  const productCondition = "Mint Condition - PSA 9"
  const amount = 4300
  const itemPrice = 4250
  const shipping = 30
  const platformFee = 20
  const feePaidBy: string = "buyer" // or "seller"
  
  const timelineSteps = [
    { id: 'created', label: 'Deal Created', date: 'Jun 18, 2026, 10:00 AM', completed: true },
    { id: 'approved', label: 'Buyer Approved', date: 'Jun 18, 2026, 10:30 AM', completed: true },
    { id: 'funded', label: 'Buyer Funded Escrow', date: 'Jun 18, 2026, 11:30 AM', completed: true },
    { id: 'shipped', label: 'Seller Shipped', date: 'Jun 19, 2026, 09:15 AM', completed: status !== "Awaiting Shipment" },
    { id: 'received', label: 'Buyer Received', date: 'Jun 20, 2026, 02:45 PM', completed: status === "Completed" || status === "Awaiting Buyer Confirmation" },
    { id: 'confirmed', label: 'Buyer Confirmed', date: 'Jun 20, 2026, 05:00 PM', completed: status === "Completed" },
    { id: 'released', label: 'Funds Released', date: 'Jun 20, 2026, 05:05 PM', completed: status === "Completed" },
    { id: 'deal_completed', label: 'Deal Completed', date: 'Jun 20, 2026, 05:05 PM', completed: status === "Completed" },
  ]

  const activityLog = [
    { id: 1, action: "Funds released to seller", time: "Jun 20, 5:05 PM", icon: CreditCard },
    { id: 2, action: "Buyer confirmed delivery", time: "Jun 20, 5:00 PM", icon: CheckCircle2 },
    { id: 3, action: "Package delivered", time: "Jun 20, 2:45 PM", icon: Package },
    { id: 4, action: "Tracking added (USPS)", time: "Jun 19, 9:15 AM", icon: Truck },
    { id: 5, action: "Escrow funded by buyer", time: "Jun 18, 11:30 AM", icon: ShieldCheck },
  ]

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-[140px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1.5 -ml-1.5 rounded-full text-foreground hover:bg-gray-100 transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex flex-col">
            <h1 className="font-bold text-[16px] leading-tight">Deal Details</h1>
            <span className="text-[12px] text-muted-foreground">{dealId}</span>
          </div>
        </div>
        <div className={cn(
          "px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider",
          status === "Completed" ? "bg-green-100 text-green-700" :
          status === "In Transit" ? "bg-blue-100 text-blue-700" :
          "bg-orange-100 text-orange-700"
        )}>
          {status}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Product Summary */}
        <Card className="overflow-hidden border-gray-100 shadow-sm">
          <div className="h-48 w-full bg-gray-100 relative">
            <img src="/pokemon-main.jpg" alt={productName} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h2 className="text-[22px] font-extrabold tracking-tight leading-tight mb-1">{productName}</h2>
              <div className="flex justify-between items-end">
                <span className="text-[13px] font-medium text-white/90">{productCondition}</span>
                <span className="text-[24px] font-black">${amount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Status Card (if Completed) */}
        {status === "Completed" && (
          <div className="bg-[#10B981] rounded-2xl p-5 text-white shadow-lg shadow-[#10B981]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0 border border-white/20">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold leading-tight">Transaction Completed</h3>
                  <p className="text-[13px] text-white/90 font-medium">Funds successfully released.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transaction Timeline */}
        <Card className="p-5 border-gray-100 shadow-sm">
          <h3 className="font-bold text-[16px] mb-5 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" /> Timeline
          </h3>
          <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-200 before:via-gray-200 before:to-transparent">
            {timelineSteps.map((step, index) => (
              <div key={step.id} className={cn("relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group pb-5 last:pb-0", step.completed ? "is-active" : "opacity-50 grayscale")}>
                <div className={cn("flex items-center justify-center w-6 h-6 rounded-full border-2 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10", step.completed ? "bg-[#10B981] text-white" : "bg-gray-200 text-transparent")}>
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </div>
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] pl-3 md:pl-0 md:group-even:pl-4 md:group-odd:pr-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-[13px] text-foreground">{step.label}</span>
                    <span className="text-[11px] text-muted-foreground">{step.completed ? step.date : 'Pending'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Participants */}
        <Card className="p-5 border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-[16px] flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Participants
          </h3>
          <div className="flex flex-col gap-4">
            {/* Seller */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">PM</div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[14px] text-foreground">PokeMaster99</span>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold uppercase">Seller</span>
                </div>
                <div className="flex items-center gap-1 text-[12px] text-muted-foreground mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> ID Verified • <Star className="w-3.5 h-3.5 text-yellow-500 ml-1" /> 4.9 (120)
                </div>
              </div>
            </div>
            
            {/* Buyer */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold shrink-0">AJ</div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[14px] text-foreground">Alex Johnson (You)</span>
                  <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold uppercase">Buyer</span>
                </div>
                <div className="flex items-center gap-1 text-[12px] text-muted-foreground mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> ID Verified • New Member
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Shipping Information */}
        <Card className="p-5 border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-[16px] flex items-center gap-2">
            <Truck className="w-4 h-4 text-primary" /> Shipping Info
          </h3>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Carrier</p>
                <p className="text-[14px] font-bold text-foreground">USPS Priority</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Tracking Number</p>
                <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleCopy("9400123456789012345678")}>
                  <p className="text-[14px] font-bold text-primary">9400123456789...</p>
                  <Copy className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>
            </div>
            
            <div className="h-px bg-gray-200 my-1" />
            
            <div className="flex gap-2 text-[13px] text-muted-foreground leading-relaxed">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />
              <div>
                <p className="font-semibold text-foreground">Delivery Address</p>
                <p>123 Main Street, Apt 4B</p>
                <p>Austin, TX 78701</p>
              </div>
            </div>

            <Button variant="outline" className="w-full text-[13px] font-bold border-gray-200 mt-1">
              Track Package <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

        {/* Payment Summary */}
        <Card className="p-5 border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-[16px] flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-primary" /> Payment Summary
          </h3>
          
          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Item Price</span>
              <span className="font-medium text-foreground">${itemPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Shipping</span>
              <span className="font-medium text-foreground">${shipping}</span>
            </div>
            
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Platform Fee</span>
              {feePaidBy === "buyer" ? (
                <span className="font-medium text-foreground">${platformFee.toLocaleString()} (Buyer Pays)</span>
              ) : (
                <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">Included by Seller</span>
              )}
            </div>
            
            <div className="h-px bg-gray-100 my-3" />
            
            <div className="flex justify-between items-center font-bold text-[16px]">
              <span>Total Paid (Buyer)</span>
              <span className="text-foreground">${amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-[14px] text-gray-500 mt-1">
              <span>Total Received (Seller)</span>
              <span>${(itemPrice + shipping - (feePaidBy === "seller" ? platformFee : 0)).toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* Documents */}
        <Card className="p-5 border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-[16px] flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" /> Documents
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 flex flex-col justify-center items-center gap-1 border-gray-200">
              <Download className="w-4 h-4 text-gray-500" />
              <span className="text-[10px] uppercase font-bold text-gray-500">Invoice</span>
            </Button>
            <Button variant="outline" className="h-12 flex flex-col justify-center items-center gap-1 border-gray-200">
              <Download className="w-4 h-4 text-gray-500" />
              <span className="text-[10px] uppercase font-bold text-gray-500">Shipping Label</span>
            </Button>
            <Button variant="outline" className="h-12 flex flex-col justify-center items-center gap-1 border-gray-200">
              <Download className="w-4 h-4 text-gray-500" />
              <span className="text-[10px] uppercase font-bold text-gray-500">Receipt</span>
            </Button>
            <Button variant="outline" className="h-12 flex flex-col justify-center items-center gap-1 border-gray-200" disabled={status !== "Completed"}>
              <Download className="w-4 h-4 text-gray-500" />
              <span className="text-[10px] uppercase font-bold text-gray-500">Proof of Delivery</span>
            </Button>
          </div>
        </Card>

        {/* Activity Log */}
        <Card className="p-5 border-gray-100 shadow-sm">
          <h3 className="font-bold text-[16px] mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" /> Activity Log
          </h3>
          <div className="space-y-4">
            {activityLog.map((log) => (
              <div key={log.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                  <log.icon className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-foreground">{log.action}</p>
                  <p className="text-[11px] text-muted-foreground">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>

      {/* Dynamic Bottom Actions */}
      <BottomActionBar>
        <div className="flex flex-col gap-2 w-full">
          {status === "Completed" && (
            <>
              <Button className="w-full h-14 text-[16px] font-bold shadow-sm" onClick={() => navigate(`/review-seller/${id}`)}>
                <Star className="mr-2 h-5 w-5" /> Leave Review
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 h-14 text-[14px] font-bold border-gray-200 text-gray-700 bg-white hover:bg-gray-50">
                  <Download className="mr-2 h-4 w-4" /> Receipt
                </Button>
                <Button variant="outline" className="flex-1 h-14 text-[14px] font-bold border-gray-200 text-gray-700 bg-white hover:bg-gray-50">
                  <Headphones className="mr-2 h-4 w-4" /> Help
                </Button>
              </div>
            </>
          )}

          {status === "Awaiting Shipment" && (
            <Button className="w-full h-14 text-[16px] font-bold shadow-sm">
              <Upload className="mr-2 h-5 w-5" /> Upload Tracking
            </Button>
          )}

          {status === "In Transit" && (
            <Button className="w-full h-14 text-[16px] font-bold shadow-sm">
              <Truck className="mr-2 h-5 w-5" /> Track Package
            </Button>
          )}

          {status === "Awaiting Buyer Confirmation" && (
            <Button className="w-full h-14 text-[16px] font-bold shadow-sm bg-[#10B981] hover:bg-[#059669]">
              <CheckCircle2 className="mr-2 h-5 w-5" /> Confirm Delivery
            </Button>
          )}
        </div>
      </BottomActionBar>
    </div>
  )
}
