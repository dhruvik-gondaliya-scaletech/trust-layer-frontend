import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import type { Variants } from "framer-motion"
import { 
  X, CheckCircle2, ShieldCheck, 
  MessageSquare, Wallet, Award, Settings, 
  MapPin, Bell, Shield, Globe, HelpCircle, 
  AlertTriangle, LogOut, Briefcase, ChevronRight, User, Key, Check,
  Star, MessageCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface AccountHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountHub({ isOpen, onClose }: AccountHubProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const navigate = useNavigate()

  // Drawer variants
  const drawerVariants: Variants = {
    closed: { x: "-100%", transition: { type: "spring", damping: 30, stiffness: 300 } },
    open: { x: "0%", transition: { type: "spring", damping: 30, stiffness: 300 } }
  }

  const backdropVariants: Variants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  }

  // Ring animation for trust score
  const ringVariants: Variants = {
    hidden: { strokeDasharray: "0, 100" },
    visible: { 
      strokeDasharray: "92, 100", 
      transition: { duration: 1.5, ease: "easeOut", delay: 0.3 } 
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[100] pointer-events-none overflow-hidden">
          {/* Glassmorphism Backdrop */}
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            className="absolute inset-0 bg-black/30 backdrop-blur-md pointer-events-auto"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            className="absolute top-0 left-0 bottom-0 w-[90%] max-w-[400px] bg-[#F4F7F9] flex flex-col overflow-hidden shadow-2xl pointer-events-auto"
          >
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto hide-scrollbar relative">
              
              {/* Header Actions */}
              <div className="absolute top-4 right-4 z-10">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 text-gray-700"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Top Hero Section */}
              <div className="pt-12 px-5 pb-6 bg-white relative overflow-hidden rounded-b-[32px] shadow-sm border-b border-gray-100">
                {/* Decorative background blur */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="w-[84px] h-[84px] rounded-full p-1 bg-gradient-to-br from-emerald-400 to-blue-500 shadow-lg mb-3"
                  >
                    <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-white">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" alt="Alex Johnson" className="w-full h-full object-cover" />
                    </div>
                  </motion.div>
                  
                  <h2 className="text-[22px] font-extrabold text-gray-900 tracking-tight leading-none mb-1">Alex Johnson</h2>
                </div>
              </div>

              <div className="px-5 py-6 space-y-6">
                

                {/* ACCOUNT MENU */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-[16px] font-extrabold text-gray-900 mb-3 px-1">Account</h3>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {[
                      { icon: <User />, label: "My Profile", route: "/profile" },
                      { icon: <Wallet />, label: "Payment Methods", route: "/payment-methods" },
                      { icon: <MapPin />, label: "Shipping Addresses", route: "/shipping-addresses" },
                      { icon: <Bell />, label: "Notification Preferences", route: "/notification-preferences" },
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        onClick={() => {
                          if (item.route) {
                            navigate(item.route);
                            onClose();
                          }
                        }}
                        className="flex items-center gap-3 p-4 hover:bg-gray-50 active:bg-gray-100 active:scale-[0.98] transition-all duration-150 cursor-pointer border-b border-gray-50 last:border-0 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                          {React.cloneElement(item.icon as any, { className: "w-4 h-4" })}
                        </div>
                        <span className="flex-1 text-[14px] font-bold text-gray-700">{item.label}</span>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-active:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* SUPPORT SECTION */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h3 className="text-[16px] font-extrabold text-gray-900 mb-3 px-1">Support</h3>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {[
                      { icon: <HelpCircle />, label: "Help Center", route: "/help-center" },
                      { icon: <MessageCircle />, label: "Contact Support", route: "/contact-support" },
                      { icon: <AlertTriangle />, label: "Report Issue", route: "/report-issue" },
                      { icon: <Shield />, label: "Transaction Protection", route: "/transaction-protection" },
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        onClick={() => {
                          if (item.route) {
                            navigate(item.route);
                            onClose();
                          }
                        }}
                        className="flex items-center gap-3 p-4 hover:bg-gray-50 active:bg-gray-100 active:scale-[0.98] transition-all duration-150 cursor-pointer border-b border-gray-50 last:border-0 group"
                      >
                        <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                          {React.cloneElement(item.icon as any, { className: "w-5 h-5" })}
                        </div>
                        <span className="flex-1 text-[14px] font-bold text-gray-700">{item.label}</span>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-active:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* LOGOUT */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="py-4"
                >
                  <div 
                    onClick={() => setShowLogoutConfirm(true)}
                    className="border-2 border-rose-100 bg-rose-50/50 hover:bg-rose-50 text-rose-600 rounded-2xl p-4 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-[15px] font-extrabold">Sign Out</span>
                  </div>
                </motion.div>

                {/* BOTTOM PREMIUM AREA */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-col items-center justify-center pt-2 pb-10"
                >
                  <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-2 border border-emerald-100">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-[13px] font-extrabold text-gray-700 uppercase tracking-widest mb-1">TrustLayer Protection</h4>
                  <p className="text-[12px] font-bold text-gray-400">Active Since Jan 2026</p>
                </motion.div>

              </div>
            </div>
          </motion.div>

          {/* LOGOUT CONFIRMATION MODAL */}
          <AnimatePresence>
            {showLogoutConfirm && (
              <div className="absolute inset-0 z-[60] flex items-center justify-center px-5 pointer-events-auto">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={() => setShowLogoutConfirm(false)}
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="bg-white w-full max-w-[340px] rounded-3xl p-6 relative z-10 shadow-2xl"
                >
                  <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mx-auto mb-4 border border-rose-100">
                    <LogOut className="w-6 h-6" />
                  </div>
                  <h2 className="text-[20px] font-extrabold text-gray-900 mb-2">Sign Out?</h2>
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
                    Are you sure you want to sign out of your TrustLayer account?
                  </p>
                  
                  <div className="flex gap-3 w-full">
                    <Button 
                      variant="outline" 
                      className="flex-1 h-12 text-[15px] font-bold rounded-xl"
                      onClick={() => setShowLogoutConfirm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 h-12 text-[15px] font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white"
                      onClick={() => {
                        setShowLogoutConfirm(false);
                        onClose();
                        navigate('/login');
                      }}
                    >
                      Sign Out
                    </Button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  )
}
