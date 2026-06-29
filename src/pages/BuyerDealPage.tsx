import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Shield, Check, X, Star, ChevronLeft, ShieldCheck, Trophy, Lock, MessageCircle, FileText, Image as ImageIcon, Video, CheckCircle2, ChevronRight, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrustProfileCard } from "@/components/trust-profile-card"
import { motion, AnimatePresence } from "framer-motion"

export default function BuyerDealPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const isLoggedIn = new URLSearchParams(location.search).get("isLoggedIn") === "true"
  
  // Animation state for WOW moment
  const [displayScore, setDisplayScore] = useState(0)
  const [isMaxed, setIsMaxed] = useState(false)
  const [showBurst, setShowBurst] = useState(false)

  // Carousel State
  const [activeSlide, setActiveSlide] = useState(0)
  const slides = [
    { type: 'image', url: '/pokemon-main.jpg' }, // Main
    { type: 'image', url: '/pokemon-front.jpg' }, // Front
    { type: 'image', url: '/pokemon-back.jpg' }, // Back
    { type: 'image', url: '/pokemon-side.jpg' }, // Side
    { type: 'image', url: '/pokemon-detail.jpg' }, // Detail
    { type: 'video', url: '/pokemon-main.jpg' }, // Video thumbnail
    { type: 'certification', url: '/pokemon-cert.jpg' }
  ]

  // Decline Modal State
  const [showDeclineModal, setShowDeclineModal] = useState(false)
  const [showFeedbackSuccess, setShowFeedbackSuccess] = useState(false)
  const [declineReason, setDeclineReason] = useState("")
  const [declineMessage, setDeclineMessage] = useState("")

  const handleDeclineSubmit = () => {
    setShowDeclineModal(false)
    setShowFeedbackSuccess(true)
  }

  const feeOption = Number(localStorage.getItem('feeOption')) || 1
  const itemPrice = 8450
  const shippingCost = 35
  const totalPlatformFee = 245
  
  let buyerFeeShare = 0
  if (feeOption === 1) buyerFeeShare = totalPlatformFee
  else if (feeOption === 0) buyerFeeShare = totalPlatformFee / 2
  else buyerFeeShare = 0

  const totalDue = itemPrice + shippingCost + buyerFeeShare

  useEffect(() => {
    // Animate score 0 -> 100 over 1.5 seconds
    const duration = 1500
    const endScore = 100
    const incrementTime = 30
    const steps = duration / incrementTime
    const increment = endScore / steps
    
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= endScore) {
        setDisplayScore(endScore)
        setIsMaxed(true)
        setShowBurst(true)
        clearInterval(timer)
        setTimeout(() => setShowBurst(false), 2000) // Hide burst text after 2 seconds
      } else {
        setDisplayScore(Math.floor(current))
      }
    }, incrementTime)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-[220px] font-sans">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-40 shadow-sm border-b border-gray-100">
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
      </div>

      <div className="p-4 space-y-5">
        
        {/* SECTION 1: VERIFIED PRODUCT GALLERY (HERO) */}
        <div>
          <div className="relative w-full aspect-square bg-gradient-to-br from-orange-400 to-red-600 rounded-3xl overflow-hidden shadow-md flex items-center justify-center mb-3">
            {/* Carousel Images - Normally we'd map and translate based on activeSlide */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {slides[activeSlide].type === 'image' && (
                  <img src={slides[activeSlide].url} alt="Product view" className="absolute inset-0 w-full h-full object-cover" />
                )}
                {slides[activeSlide].type === 'video' && (
                  <>
                    <img src={slides[activeSlide].url} alt="Video thumbnail" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
                    <div className="text-center text-white relative z-0 flex flex-col items-center">
                      <PlayCircle className="w-16 h-16 mb-2 opacity-90 drop-shadow-lg" strokeWidth={1.5} />
                      <h2 className="text-xl font-bold tracking-tight drop-shadow-md">Verification Video</h2>
                    </div>
                  </>
                )}
                {slides[activeSlide].type === 'certification' && (
                  <img src={slides[activeSlide].url} alt="PSA Certification" className="absolute inset-0 w-full h-full object-contain bg-black/90 p-4" />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Top overlays */}
            <div className="absolute top-4 left-4 right-4 flex justify-end items-start z-10 pointer-events-none">
              <div className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl bg-gray-900/90 backdrop-blur-md shadow-lg border border-[#F5C542]/30 transition-all duration-1000 ${isMaxed ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                 <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-[-2px]">PSA 10</span>
                 <div className="bg-[#F5C542] text-gray-900 text-[10px] font-bold px-1.5 rounded-sm mt-1">TRUST {displayScore}</div>
              </div>
            </div>
            
            <AnimatePresence>
              {showBurst && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center rounded-3xl"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                     <ShieldCheck className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-green-700">Verified Listing</h3>
                  <p className="text-sm font-bold text-amber-500 mt-1">Maximum Buyer Confidence</p>
                  {/* Sparkle effects */}
                  <div className="absolute top-10 left-10 text-2xl animate-ping">✨</div>
                  <div className="absolute bottom-20 right-10 text-xl animate-pulse">✨</div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Carousel Controls */}
            <button 
              onClick={() => setActiveSlide(s => s === 0 ? slides.length - 1 : s - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white z-20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveSlide(s => s === slides.length - 1 ? 0 : s + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white z-20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Pagination indicators */}
            <div className="absolute bottom-4 left-0 w-full flex justify-center gap-1.5 z-10">
              {slides.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full shadow-sm transition-all duration-300 ${idx === activeSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> 5 Photos</span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5" /> 1 Video</span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> 1 Cert</span>
          </div>
        </div>

        {/* SECTION 2: PRODUCT DETAILS */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-1">
            <p className="text-[12px] font-bold text-primary uppercase tracking-wider">
              Trading Cards • Mint (PSA 10)
            </p>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider bg-gray-100 px-1.5 py-0.5 rounded">TRUST-1024</span>
          </div>
          <h1 className="text-[18px] font-extrabold leading-tight mb-2 text-foreground">
            Charizard Holo 1999 — PSA 10 Gem Mint
          </h1>
          <div className="text-[28px] font-black text-foreground mb-4">
            ${itemPrice.toLocaleString('en-US', {minimumFractionDigits: 0})}
          </div>
          
          <div className="space-y-4">
            <div className="pt-2 flex flex-col gap-2">
               <div className="flex justify-between items-center py-2 border-b border-gray-50">
                 <div className="text-[12px] text-muted-foreground font-medium">Condition</div>
                 <div className="text-[13px] font-bold text-foreground">Mint (PSA 10)</div>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-gray-50">
                 <div className="text-[12px] text-muted-foreground font-medium">Certification Authority</div>
                 <div className="text-[13px] font-bold text-foreground">PSA</div>
               </div>
               <div className="flex justify-between items-center py-2">
                 <div className="text-[12px] text-muted-foreground font-medium">Certification Number</div>
                 <div className="text-[13px] font-bold text-primary">#48920199</div>
               </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: TRUST SNAPSHOT */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <h3 className="font-bold text-[15px] text-blue-950 flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                Protected by TrustLayer
              </h3>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-blue-900/60 uppercase font-bold tracking-widest mb-0.5">Trust Score</span>
              <span className="text-[22px] font-black text-blue-600 leading-none">{isMaxed ? '100 / 100' : '0 / 100'}</span>
            </div>
          </div>
          
          <div className="space-y-2 relative z-10">
            {[
              "Seller Verified",
              "Product Verified",
              "Video Verified",
              "Certification Verified",
              "TrustLayer Protected"
            ].map((req, idx) => (
               <div key={idx} className="flex items-center gap-2.5">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                  <span className="text-[13px] font-medium text-blue-900">{req}</span>
               </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-blue-200/50 flex justify-between items-center">
            <span className="text-[12px] font-bold text-blue-900">Maximum Buyer Confidence</span>
          </div>
        </div>

        {/* SECTION 4: SELLER TRUST PROFILE */}
        <div className="mb-6">
          <TrustProfileCard 
            variant="medium" 
            user={{
              username: "@vintage_vault",
              avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
              trustScore: 96,
              rating: 4.9,
              reviewCount: 184,
              successfulDeals: 184,
              memberSince: 2022,
              isTrustedMember: true
            }} 
          />
        </div>

        {/* SECTION 5: TRUSTLAYER PROTECTION TIMELINE */}
        <div className="bg-blue-50/50 rounded-3xl p-5 shadow-sm border border-blue-100">
          <div className="relative">
            {/* Horizontal Timeline Line */}
            <div className="absolute top-3 left-[10%] right-[10%] h-[1.5px] bg-blue-200" />
            
            <div className="flex justify-between relative z-10">
              {[
                { title: "Funds Protected" },
                { title: "Seller Ships" },
                { title: "Buyer Inspects" },
                { title: "Buyer Approves" },
                { title: "Funds Released" },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 w-[20%]">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 bg-white transition-all ${idx === 0 ? 'border-primary text-primary shadow-[0_0_10px_rgba(37,99,235,0.2)]' : 'border-blue-200'}`}>
                    {idx === 0 ? <div className="w-1.5 h-1.5 bg-primary rounded-full" /> : null}
                  </div>
                  <div className={`text-[9px] font-bold text-center leading-tight ${idx === 0 ? 'text-blue-950' : 'text-blue-900/50'}`}>
                    {step.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 6: FEE RESPONSIBILITY & PAYMENT SUMMARY */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-[16px] font-bold text-foreground">Fee Responsibility</h3>
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">Selected by Seller</span>
            </div>
            <p className="text-[14px] font-semibold text-foreground mt-2">
              {feeOption === 0 ? "Platform Fee Shared 50/50" : feeOption === 1 ? "Buyer Pays 100% of Platform Fee" : "Seller Pays 100% of Platform Fee"}
            </p>
            <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">
              {feeOption === 0 ? "The seller has chosen to split the TrustLayer platform fee equally." : feeOption === 1 ? "The seller has chosen for the buyer to pay the full TrustLayer platform fee." : "The seller has chosen to cover the full TrustLayer platform fee."}
            </p>
          </div>

          <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 space-y-3 text-[13px]">
            <div className="flex justify-between text-muted-foreground">
              <span>Item Price</span>
              <span className="font-medium text-foreground">${itemPrice.toLocaleString('en-US', {minimumFractionDigits: 0})}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping Cost</span>
              <span className="font-medium text-foreground">${shippingCost.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>
                {feeOption === 0 ? "Your Fee Share (non-refundable)" : "Platform Fee (non-refundable)"}
              </span>
              <span className="font-medium text-foreground">
                {feeOption === 2 ? "$0" : `$${buyerFeeShare.toFixed(0)}`}
              </span>
            </div>
            
            <div className="my-3 border-t border-dashed border-gray-200" />
            
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-foreground text-[14px]">Total Due</span>
              <span className="text-[24px] font-black text-primary tracking-tight">
                ${totalDue.toLocaleString('en-US', {maximumFractionDigits: 0})}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM CTA (Sticky Footer) */}
      <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] p-4 pb-6 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-3">
          <Button
            className="w-full h-[56px] text-[16px] font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white"
            onClick={() => {
              if (isLoggedIn) {
                navigate("/fund-escrow/TRUST-1024")
              } else {
                navigate("/register?redirect=buyer&dealId=TRUST-1024")
              }
            }}
          >
            <Check className="w-5 h-5" /> {isLoggedIn ? "Continue to Payment" : "Approve Deal"} • ${totalDue.toLocaleString('en-US', {maximumFractionDigits: 0})}
          </Button>
          <Button
            variant="outline"
            className="w-full h-[48px] text-[14px] font-bold rounded-2xl flex items-center justify-center border-red-100 text-red-600 bg-white hover:bg-red-50 hover:text-red-700"
            onClick={() => setShowDeclineModal(true)}
          >
            Decline Deal
          </Button>
        </div>
      </div>

      {/* DECLINE MODAL */}
      <AnimatePresence>
        {showDeclineModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-2">Why are you declining?</h2>
                <p className="text-[13px] text-muted-foreground mb-5 leading-relaxed">
                  Tell the seller what needs to be improved.
                </p>

                <div className="space-y-2 mb-5">
                  {[
                    "Need additional photos",
                    "Need clearer video",
                    "Certification concern",
                    "Price concern",
                    "Other"
                  ].map((reason) => (
                    <label key={reason} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${declineReason === reason ? 'border-primary bg-blue-50/50' : 'border-gray-100 bg-gray-50/50 hover:bg-gray-100'}`}>
                      <input 
                        type="radio" 
                        name="declineReason" 
                        value={reason}
                        checked={declineReason === reason}
                        onChange={(e) => setDeclineReason(e.target.value)}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span className="text-[14px] font-medium text-foreground">{reason}</span>
                    </label>
                  ))}
                </div>

                <div className="mb-6">
                  <textarea 
                    className="w-full border border-gray-200 rounded-xl p-3 text-[14px] resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                    placeholder="Provide feedback to seller"
                    value={declineMessage}
                    onChange={(e) => setDeclineMessage(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Button 
                    className="w-full h-[52px] text-[15px] font-bold rounded-xl bg-primary text-white"
                    onClick={handleDeclineSubmit}
                    disabled={!declineReason}
                  >
                    Send Feedback
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full h-[52px] text-[15px] font-bold rounded-xl text-muted-foreground hover:bg-gray-100"
                    onClick={() => setShowDeclineModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FEEDBACK SUCCESS MODAL */}
      <AnimatePresence>
        {showFeedbackSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl relative"
            >
              <div className="relative p-0 flex flex-col items-center">
                {/* Top Header Area with Gradient */}
                <div className="w-full bg-gradient-to-b from-green-50 via-white to-white pt-12 pb-4 px-8 flex flex-col items-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_60%)]"></div>
                  
                  {/* Premium animated checkmark */}
                  <div className="relative mb-6">
                    <motion.div 
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
                      className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(34,197,94,0.4)] relative z-10"
                    >
                      <Check className="w-12 h-12 text-white stroke-[3] drop-shadow-md" />
                    </motion.div>
                    
                    {/* Pulsing rings */}
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute -inset-6 border border-green-500/20 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
                    <div className="absolute -inset-12 border border-green-500/10 rounded-full animate-pulse delay-75" style={{ animationDuration: '2.5s' }}></div>
                  </div>
                  
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-2 relative z-10 tracking-tight">Feedback Sent</h2>
                  <p className="text-[12px] font-bold text-green-600 uppercase tracking-widest relative z-10 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    Listing Improvement Requested
                  </p>
                </div>
                
                {/* Body Content */}
                <div className="px-8 pb-8 pt-4 w-full text-center relative z-10">
                  <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
                    We've securely forwarded your notes to the seller. They can review your feedback and update the listing before republishing it.
                  </p>

                  <div className="w-full space-y-3">
                    <Button 
                      className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/20 transition-all"
                      onClick={() => navigate("/dashboard")}
                    >
                      Return to Dashboard
                    </Button>
                    <Button 
                      variant="ghost"
                      className="w-full h-[48px] text-[14px] font-bold rounded-2xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowFeedbackSuccess(false)}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
