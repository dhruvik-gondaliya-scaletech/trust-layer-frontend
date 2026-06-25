import * as React from "react"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  Plus,
  ChevronRight,
  ChevronDown,
  Bell,
  ShieldCheck,
  Upload,
  AlertCircle,
  X,
  Store,
  ShoppingCart,
  CheckCircle2,
  Info,
  Clock,
  AlertTriangle
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AccountHub } from "@/components/AccountHub"

export default function Dashboard() {
  const navigate = useNavigate()
  const [isAccountHubOpen, setIsAccountHubOpen] = useState(false)
  const location = useLocation()
  const initialMode = new URLSearchParams(location.search).get('mode') as "seller" | "buyer" || "seller"
  const [userMode, setUserMode] = useState<"seller" | "buyer">(initialMode)

  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening"

  const actionRequired = [
    {
      id: 1,
      type: 'orange',
      title: 'Upload Tracking',
      dealId: 'TRUST-1024',
      description: 'Buyer funded your deal.',
      time: 'Just now',
      cta: 'Add Tracking',
      Icon: Clock,
    },
    {
      id: 2,
      type: 'red',
      title: 'Verify your email',
      description: 'Required to start transacting.',
      time: '2 hours ago',
      cta: 'Verify Now',
      Icon: AlertCircle,
    }
  ]

  const recentUpdates = [
    {
      id: 3,
      type: 'green',
      title: 'Item delivered',
      dealId: 'TRUST-0992',
      description: 'Buyer has received the item.',
      time: 'Yesterday',
      Icon: CheckCircle2,
    },
    {
      id: 4,
      type: 'blue',
      title: 'Funds released',
      dealId: 'TRUST-0845',
      description: 'Payout is on the way to your bank.',
      time: '2 days ago',
      Icon: Info,
    }
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
              <h1 className="text-[19px] font-extrabold text-foreground tracking-tight leading-none mb-3">{greeting}, Alex</h1>
              
              {/* Workspace Toggle */}
              <div className="flex bg-gray-100 p-1 rounded-xl w-full max-w-[240px] relative">
                {/* Animated Background */}
                <motion.div
                  layoutId="workspace-active-bg"
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg ${userMode === 'seller' ? 'bg-[#2563EB] left-1' : 'bg-[#10B981] left-[calc(50%+2px)]'}`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
                
                <button
                  onClick={() => setUserMode('seller')}
                  className={`flex-1 py-1.5 text-[12px] font-bold rounded-lg transition-colors relative z-10 flex items-center justify-center gap-1.5 ${userMode === 'seller' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Store className="w-3.5 h-3.5" /> SELLER
                </button>
                <button
                  onClick={() => setUserMode('buyer')}
                  className={`flex-1 py-1.5 text-[12px] font-bold rounded-lg transition-colors relative z-10 flex items-center justify-center gap-1.5 ${userMode === 'buyer' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> BUYER
                </button>
              </div>

            </motion.div>
          </div>

          <div className="relative shrink-0">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2, type: "spring" }}
              className="cursor-pointer"
              onClick={() => navigate('/notifications')}
            >
              <div className="h-11 w-11 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm text-foreground hover:bg-gray-50 transition-colors">
                <Bell className="h-5 w-5 text-gray-800" />
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">
                  {actionRequired.length}
                </div>
              </div>
            </motion.div>
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
          <Button onClick={() => navigate("/transactions")} variant="link" className={`px-0 text-[14px] h-auto font-semibold ${userMode === 'buyer' ? 'text-[#10B981]' : 'text-[#2563EB]'}`}>View All</Button>
        </div>

        <Card className={`border shadow-sm overflow-hidden ${userMode === 'buyer' ? 'bg-[#F2FCF7] border-[#10B981]' : 'bg-[#F5F9FF] border-[#2563EB]'}`}>
          <div className="flex flex-col divide-y divide-gray-100">
            {/* Item 1 */}
            <div onClick={() => navigate("/deal-details/TRUST-1024")} className={`cursor-pointer transition-colors p-3.5 flex items-center justify-between group ${userMode === 'buyer' ? 'hover:bg-[#E6F8EE]' : 'hover:bg-[#EBF3FF]'}`}>
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
            <div onClick={() => navigate("/deal-details/TRUST-1025")} className={`cursor-pointer transition-colors p-3.5 flex items-center justify-between group ${userMode === 'buyer' ? 'hover:bg-[#E6F8EE]' : 'hover:bg-[#EBF3FF]'}`}>
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
            <div onClick={() => navigate("/deal-details/TRUST-1026")} className={`cursor-pointer transition-colors p-3.5 flex items-center justify-between group ${userMode === 'buyer' ? 'hover:bg-[#E6F8EE]' : 'hover:bg-[#EBF3FF]'}`}>
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
