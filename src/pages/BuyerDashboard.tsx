import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Plus,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  Bell,
  CheckCircle2,
  AlertCircle,
  Upload,
  ShieldCheck,
  X
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AccountHub } from "@/components/AccountHub"

export default function BuyerDashboard() {
  const navigate = useNavigate()
  const [isAccountHubOpen, setIsAccountHubOpen] = useState(false)
  const [showBanner, setShowBanner] = useState(true)

  return (
    <div className="flex flex-col gap-6 px-5 py-4 pb-[140px] bg-gray-50/50 min-h-screen">
      <AccountHub isOpen={isAccountHubOpen} onClose={() => setIsAccountHubOpen(false)} />
      
      {/* Header section */}
      <div className="flex flex-col pt-2 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.5 }}
              onClick={() => setIsAccountHubOpen(true)}
              className="h-[60px] w-[60px] bg-secondary rounded-full flex items-center justify-center text-primary font-bold overflow-hidden border-2 border-white shadow-md shrink-0 cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" alt="Profile" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col justify-center"
            >
              <h1 className="text-[19px] font-extrabold text-foreground tracking-tight leading-none mb-1.5">Good Morning, Alex</h1>
              <p className="text-[13px] text-muted-foreground leading-none font-medium">Welcome back to TrustLayer 👋</p>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 0.3, delay: 0.2, type: "spring" }}
            className="relative shrink-0 cursor-pointer"
            onClick={() => navigate("/notifications")}
          >
            <div className="h-11 w-11 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm text-foreground hover:bg-gray-50 transition-colors">
              <Bell className="h-5 w-5 text-gray-800" />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-pink-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">
                4
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-2 mt-4"
        >
          <Badge variant="secondary" className="text-[10px] h-6 px-2.5 font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-50 flex items-center gap-1.5 border border-emerald-100 rounded-lg shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500 text-white" /> Email Verified
          </Badge>
          <Badge variant="secondary" className="text-[10px] h-6 px-2.5 font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-50 flex items-center gap-1.5 border border-emerald-100 rounded-lg shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500 text-white" /> Phone Verified
          </Badge>
        </motion.div>
      </div>

      <AnimatePresence>
        {showBanner && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-green-50 border border-green-200 rounded-xl p-4 relative"
          >
            <button 
              onClick={() => setShowBanner(false)}
              className="absolute top-3 right-3 text-green-700/50 hover:text-green-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-[14px] font-bold text-green-900 leading-none mb-1.5">Transaction Completed</h3>
                <p className="text-[13px] text-green-800/80 font-medium leading-snug">
                  Thank you for using TrustLayer.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions Required */}
      <div className="space-y-3">
        <h2 className="text-[16px] font-bold text-foreground px-1 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-amber-500" /> Quick Actions Required
        </h2>
        
        <Card className="border border-border bg-white shadow-sm overflow-hidden">
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 shrink-0 border border-amber-100">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[14px] text-foreground leading-tight">Charizard Holo 1999</p>
                <p className="text-[12px] text-muted-foreground font-medium mt-0.5">Upload tracking information</p>
              </div>
            </div>
            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white font-bold h-8 px-3" onClick={() => navigate("/add-tracking/deal-123")}>
              Action
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Deals (Banking Style) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1 mb-1">
          <h2 className="text-[18px] font-bold text-foreground">Recent Deals</h2>
          <Button variant="link" className="px-0 text-[14px] h-auto text-primary font-semibold">View All</Button>
        </div>

        <Card className="border border-border bg-white shadow-sm overflow-hidden">
          <div className="flex flex-col divide-y divide-gray-100">
            {/* Item 1 */}
            <div onClick={() => navigate("/timeline/deal-123")} className="cursor-pointer hover:bg-gray-50 transition-colors p-3.5 flex items-center justify-between group">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200">
                  <img src="/pokemon-main.jpg" alt="Charizard" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-bold text-[15px] text-foreground leading-tight mb-0.5">Charizard Holo 1999</span>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider">Buying</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Deal ID: TRUST-1024</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] font-bold text-gray-500 flex items-center gap-0.5"><ShieldCheck className="w-3 h-3"/> 96</span>
                  </div>
                  <span className="text-[12px] font-semibold text-emerald-600 leading-none">Completed</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <span className="font-extrabold text-[15px] text-foreground mb-1">$4,300</span>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
            </div>

            {/* Item 2 */}
            <div className="cursor-pointer hover:bg-gray-50 transition-colors p-3.5 flex items-center justify-between group">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200">
                  <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop" alt="Leica" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-bold text-[15px] text-foreground leading-tight mb-0.5">Vintage Leica M6</span>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider">Buying</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Deal ID: TRUST-1024</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] font-bold text-gray-500 flex items-center gap-0.5"><ShieldCheck className="w-3 h-3"/> 84</span>
                  </div>
                  <span className="text-[12px] font-semibold text-[#10B981] leading-none">In Review Period</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <span className="font-extrabold text-[15px] text-foreground mb-1">$2,400</span>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
            </div>
            
            {/* Item 3 */}
            <div className="cursor-pointer hover:bg-gray-50 transition-colors p-3.5 flex items-center justify-between group">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200">
                  <img src="https://images.unsplash.com/photo-1593815315105-091a92e10a72?q=80&w=200&auto=format&fit=crop" alt="Pokemon Collection" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-bold text-[15px] text-foreground leading-tight mb-0.5">Pokemon Collection</span>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider">Buying</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">TRUST-1024</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] font-bold text-gray-500 flex items-center gap-0.5"><ShieldCheck className="w-3 h-3"/> 99</span>
                  </div>
                  <span className="text-[12px] font-semibold text-amber-600 leading-none">Awaiting Tracking</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <span className="font-extrabold text-[15px] text-foreground mb-1">$12,500</span>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Insights */}
      <div className="space-y-3 mt-2">
        <h2 className="text-[16px] font-bold text-foreground px-1">Quick Insights</h2>
        <div className="grid grid-cols-2 gap-2">
          <Card className="shadow-sm border-border bg-white">
            <CardContent className="p-3">
              <p className="text-[20px] font-extrabold text-foreground leading-tight">3</p>
              <p className="text-[11px] text-muted-foreground font-bold mt-1 uppercase tracking-wider">Active Listings</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-border bg-white">
            <CardContent className="p-3">
              <p className="text-[20px] font-extrabold text-foreground leading-tight">1</p>
              <p className="text-[11px] text-muted-foreground font-bold mt-1 uppercase tracking-wider">Awaiting Funds</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-border bg-white">
            <CardContent className="p-3">
              <p className="text-[20px] font-extrabold text-foreground leading-tight">1</p>
              <p className="text-[11px] text-muted-foreground font-bold mt-1 uppercase tracking-wider">In Transit</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-border bg-white">
            <CardContent className="p-3">
              <p className="text-[20px] font-extrabold text-foreground leading-tight">16</p>
              <p className="text-[11px] text-muted-foreground font-bold mt-1 uppercase tracking-wider">Completed Deals</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Your Activity */}
      <div className="space-y-3 mt-2">
        <h2 className="text-[16px] font-bold text-foreground px-1">Your Activity</h2>
        <div className="grid grid-cols-2 gap-3">
          {/* Seller Activity */}
          <Card className="shadow-sm border-[#2563EB]/20 bg-[#2563EB]/5">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#2563EB] shrink-0 border border-[#2563EB]/10 shadow-sm">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-[#2563EB] font-bold uppercase tracking-wider mb-0.5">Selling</p>
                <p className="font-extrabold text-[15px] text-foreground leading-none">1 Active</p>
              </div>
            </CardContent>
          </Card>

          {/* Buyer Activity */}
          <Card className="shadow-sm border-[#10B981]/20 bg-[#10B981]/5">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#10B981] shrink-0 border border-[#10B981]/10 shadow-sm">
                <ArrowDownLeft className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-[#10B981] font-bold uppercase tracking-wider mb-0.5">Buying</p>
                <p className="font-extrabold text-[15px] text-foreground leading-none">1 Active</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Premium Fintech Wallet */}
      <div className="space-y-3 mt-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[16px] font-bold text-foreground">Wallet</h2>
        </div>
        
        <div className="rounded-[20px] p-5 bg-gradient-to-br from-[#2563EB] to-[#1e3a8a] text-white shadow-xl shadow-[#2563EB]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-24 h-24 rounded-full bg-white/10 blur-2xl"></div>
          
          <div className="relative z-10">
            <p className="text-[11px] text-blue-100/80 font-semibold tracking-wider uppercase mb-1">Available Balance</p>
            <p className="text-[32px] font-extrabold text-white leading-none tracking-tight mb-4">$1,250.00</p>
            
            <div className="flex items-center justify-between mb-4 bg-black/10 rounded-xl p-3 backdrop-blur-sm border border-white/5">
              <div className="flex-1">
                <p className="text-[10px] text-blue-100/70 font-bold tracking-wider uppercase mb-0.5">Secured Funds</p>
                <p className="text-[15px] font-bold text-white leading-none">$8,500.00</p>
              </div>
              <div className="w-px h-8 bg-white/10 mx-3"></div>
              <div className="flex-1">
                <p className="text-[10px] text-blue-100/70 font-bold tracking-wider uppercase mb-0.5">Ready To Withdraw</p>
                <p className="text-[15px] font-bold text-white leading-none">$1,250.00</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="flex-1 bg-white text-[#2563EB] hover:bg-blue-50 font-extrabold h-11 rounded-lg shadow-sm text-[14px] transition-transform active:scale-[0.98]">
                Withdraw
              </Button>
              <Button variant="ghost" className="flex-1 border border-white/20 bg-white/5 hover:bg-white/15 hover:text-white text-white font-bold h-11 rounded-lg text-[14px] transition-all">
                History
              </Button>
            </div>
          </div>
        </div>
      </div>

      <BottomActionBar>
        <Button onClick={() => navigate("/create-deal")} className="w-full h-14 text-[16px] shadow-sm">
          <Plus className="mr-2 h-5 w-5" /> Create New Deal
        </Button>
      </BottomActionBar>
    </div>
  )
}
