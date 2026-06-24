import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Plus,
  ChevronRight,
  ChevronDown,
  Bell,
  ShieldCheck,
  Upload,
  AlertCircle,
  X
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AccountHub } from "@/components/AccountHub"

export default function Dashboard() {
  const navigate = useNavigate()
  const [isAccountHubOpen, setIsAccountHubOpen] = useState(false)
  const [userMode, setUserMode] = useState<"seller" | "buyer">("seller")
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [showModeDropdown, setShowModeDropdown] = useState(false)

  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening"

  const notifications = [
    "Buyer funded your deal",
    "Complete email verification before creating your first deal.",
    "Item shipped"
  ]

  return (
    <div className="flex flex-col gap-6 px-5 py-4 pb-[140px] bg-gray-50/50 min-h-screen">
      <AccountHub isOpen={isAccountHubOpen} onClose={() => setIsAccountHubOpen(false)} />

      {/* Header section */}
      <div className="flex flex-col pt-2 mb-4 relative z-50">
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
              <h1 className="text-[19px] font-extrabold text-foreground tracking-tight leading-none mb-1.5">{greeting}, Alex</h1>
              <div className="relative">
                <button
                  onClick={() => setShowModeDropdown(!showModeDropdown)}
                  className={`flex items-center gap-1 text-[12px] font-bold px-2 py-0.5 rounded tracking-wider mb-1 ${userMode === 'buyer' ? 'text-[#10B981] bg-[#10B981]/10' : 'text-[#2563EB] bg-[#2563EB]/10'}`}
                >
                  {userMode === 'buyer' ? 'Buyer Mode' : 'Seller Mode'} <ChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {showModeDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                      className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg w-32 py-1 z-50"
                    >
                      <button className="w-full text-left px-3 py-2 text-[13px] font-medium hover:bg-gray-50 text-foreground" onClick={() => { setUserMode('seller'); setShowModeDropdown(false); }}>Seller Mode</button>
                      <button className="w-full text-left px-3 py-2 text-[13px] font-medium hover:bg-gray-50 text-foreground" onClick={() => { setUserMode('buyer'); setShowModeDropdown(false); }}>Buyer Mode</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <div className="relative shrink-0">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2, type: "spring" }}
              className="cursor-pointer"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <div className="h-11 w-11 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm text-foreground hover:bg-gray-50 transition-colors">
                <Bell className="h-5 w-5 text-gray-800" />
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-pink-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">
                  3
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, transformOrigin: "top right" }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
                >
                  <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <span className="font-bold text-[14px]">Notifications</span>
                    <button onClick={() => setIsNotificationsOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((note, i) => (
                      <div key={i} className="p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3">
                        <div className="mt-0.5 shrink-0"><AlertCircle className="w-4 h-4 text-primary" /></div>
                        <p className="text-[13px] text-foreground font-medium leading-snug">{note}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Premium Fintech Wallet (Moved to Top) */}
      <div className="space-y-3 cursor-pointer" onClick={() => navigate("/wallet")}>
        <div className="rounded-[20px] p-5 bg-gradient-to-br from-[#2563EB] to-[#1e3a8a] text-white shadow-xl shadow-[#2563EB]/20 relative overflow-hidden">
          {/* Decorative background elements for premium feel */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-24 h-24 rounded-full bg-white/10 blur-2xl"></div>

          <div className="relative z-10 flex justify-between items-center">
            <div>
              <p className="text-[11px] text-blue-100/80 font-semibold tracking-wider uppercase mb-1">Available Balance</p>
              <p className="text-[32px] font-extrabold text-white leading-none tracking-tight mb-1">$1,250.00</p>
            </div>
          </div>
          <div className="relative z-10 mt-4 flex items-center gap-1.5 text-blue-100/90 text-[13px] font-medium">
            Tap to view wallet details <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Quick Actions Required */}
      {true && (
        <div className="space-y-3 mt-4">
          <h2 className="text-[16px] font-bold text-foreground px-1 flex items-center gap-1.5">
            <AlertCircle className={`w-4 h-4 ${userMode === 'buyer' ? 'text-[#10B981]' : 'text-[#2563EB]'}`} /> Quick Actions Required
          </h2>

          <Card className="border border-border bg-white shadow-sm overflow-hidden">
            <div className="p-3.5 flex items-center justify-between">
              {userMode === 'buyer' ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981] shrink-0 border border-[#10B981]/20">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-[14px] text-foreground leading-tight">Charizard Holo 1999</p>
                      <p className="text-[12px] font-medium text-gray-500 mb-1">TRUST-1024</p>
                      <p className="text-[12px] text-muted-foreground font-medium">Buyer is waiting to inspect the item.</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-[#10B981] hover:bg-[#059669] text-white font-bold h-8 px-3" onClick={() => navigate("/timeline/TRUST-1024")}>
                    Review Item
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2563EB]/10 rounded-full flex items-center justify-center text-[#2563EB] shrink-0 border border-[#2563EB]/20">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-[14px] text-foreground leading-tight">Charizard Holo 1999</p>
                      <p className="text-[12px] font-medium text-gray-500 mb-1">TRUST-1024</p>
                      <p className="text-[12px] text-muted-foreground font-medium">Buyer has funded the deal.</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold h-8 px-3" onClick={() => navigate("/add-tracking/deal-123")}>
                    Add Tracking
                  </Button>
                </>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Quick Insights */}
      <div className="space-y-3 mt-6">
        <h2 className="text-[16px] font-bold text-foreground px-1">Quick Insights</h2>
        <div className="grid grid-cols-2 gap-2">
          <Card className="shadow-sm border-border bg-white">
            <CardContent className="p-3">
              <p className={`text-[20px] font-extrabold leading-tight ${userMode === 'buyer' ? 'text-[#10B981]' : 'text-[#2563EB]'}`}>{userMode === 'seller' ? '3' : '1'}</p>
              <p className="text-[11px] text-muted-foreground font-bold mt-1 uppercase tracking-wider">{userMode === 'buyer' ? 'Active Purchases' : 'Active Deals'}</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-border bg-white">
            <CardContent className="p-3">
              <p className={`text-[20px] font-extrabold leading-tight ${userMode === 'buyer' ? 'text-[#10B981]' : 'text-[#2563EB]'}`}>1</p>
              <p className="text-[11px] text-muted-foreground font-bold mt-1 uppercase tracking-wider">{userMode === 'buyer' ? 'Awaiting Delivery' : 'Awaiting Funds'}</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-border bg-white">
            <CardContent className="p-3">
              <p className={`text-[20px] font-extrabold leading-tight ${userMode === 'buyer' ? 'text-[#10B981]' : 'text-[#2563EB]'}`}>{userMode === 'seller' ? '1' : '2'}</p>
              <p className="text-[11px] text-muted-foreground font-bold mt-1 uppercase tracking-wider">In Transit</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-border bg-white">
            <CardContent className="p-3">
              <p className={`text-[20px] font-extrabold leading-tight ${userMode === 'buyer' ? 'text-[#10B981]' : 'text-[#2563EB]'}`}>{userMode === 'seller' ? '16' : '4'}</p>
              <p className="text-[11px] text-muted-foreground font-bold mt-1 uppercase tracking-wider">{userMode === 'buyer' ? 'Completed Purchases' : 'Completed Deals'}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Deals (Completed Only) */}
      <div className="space-y-2 mt-6">
        <div className="flex items-center justify-between px-1 mb-1">
          <h2 className="text-[18px] font-bold text-foreground">Recent Deals</h2>
          <Button variant="link" className={`px-0 text-[14px] h-auto font-semibold ${userMode === 'buyer' ? 'text-[#10B981]' : 'text-[#2563EB]'}`}>View All</Button>
        </div>

        <Card className={`border shadow-sm overflow-hidden ${userMode === 'buyer' ? 'bg-[#F2FCF7] border-[#10B981]' : 'bg-[#F5F9FF] border-[#2563EB]'}`}>
          <div className="flex flex-col divide-y divide-gray-100">
            {/* Item 1 */}
            <div className={`cursor-pointer transition-colors p-3.5 flex items-center justify-between group ${userMode === 'buyer' ? 'hover:bg-[#E6F8EE]' : 'hover:bg-[#EBF3FF]'}`}>
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-200">
                  <img src="/pokemon-main.jpg" alt="Charizard" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-bold text-[15px] text-foreground leading-tight mb-0.5">Charizard Holo 1999</span>
                  <span className="text-[12px] font-medium text-gray-500 mb-0.5">TRUST-1024</span>
                  <span className={`text-[12px] font-semibold leading-none ${userMode === 'buyer' ? 'text-[#10B981]' : 'text-[#2563EB]'}`}>Completed</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <span className="font-extrabold text-[15px] text-foreground mb-1">$4,300</span>
                <ChevronRight className={`w-4 h-4 transition-colors ${userMode === 'buyer' ? 'text-[#10B981]/50 group-hover:text-[#10B981]' : 'text-[#2563EB]/50 group-hover:text-[#2563EB]'}`} />
              </div>
            </div>

            {/* Item 2 */}
            <div className={`cursor-pointer transition-colors p-3.5 flex items-center justify-between group ${userMode === 'buyer' ? 'hover:bg-[#E6F8EE]' : 'hover:bg-[#EBF3FF]'}`}>
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-200">
                  <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop" alt="Leica" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-bold text-[15px] text-foreground leading-tight mb-0.5">Vintage Leica M6</span>
                  <span className="text-[12px] font-medium text-gray-500 mb-0.5">TRUST-1025</span>
                  <span className={`text-[12px] font-semibold leading-none ${userMode === 'buyer' ? 'text-[#10B981]' : 'text-[#2563EB]'}`}>Completed</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <span className="font-extrabold text-[15px] text-foreground mb-1">$2,400</span>
                <ChevronRight className={`w-4 h-4 transition-colors ${userMode === 'buyer' ? 'text-[#10B981]/50 group-hover:text-[#10B981]' : 'text-[#2563EB]/50 group-hover:text-[#2563EB]'}`} />
              </div>
            </div>

            {/* Item 3 */}
            <div className={`cursor-pointer transition-colors p-3.5 flex items-center justify-between group ${userMode === 'buyer' ? 'hover:bg-[#E6F8EE]' : 'hover:bg-[#EBF3FF]'}`}>
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-200">
                  <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=200&auto=format&fit=crop" alt="MacBook" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-bold text-[15px] text-foreground leading-tight mb-0.5">MacBook Pro M3</span>
                  <span className="text-[12px] font-medium text-gray-500 mb-0.5">TRUST-1026</span>
                  <span className={`text-[12px] font-semibold leading-none ${userMode === 'buyer' ? 'text-[#10B981]' : 'text-[#2563EB]'}`}>Completed</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <span className="font-extrabold text-[15px] text-foreground mb-1">$1,850</span>
                <ChevronRight className={`w-4 h-4 transition-colors ${userMode === 'buyer' ? 'text-[#10B981]/50 group-hover:text-[#10B981]' : 'text-[#2563EB]/50 group-hover:text-[#2563EB]'}`} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <BottomActionBar>
        <Button onClick={() => navigate("/create-deal")} className="w-full h-14 text-[16px] shadow-sm">
          <Plus className="mr-2 h-5 w-5" /> Create New Deal
        </Button>
      </BottomActionBar>
    </div>
  )
}
