import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Upload, CheckCircle2, Info, Camera, Plus, Video, FileBadge, Trash2, Edit2, ChevronDown, Check, ChevronUp, Zap, Image as ImageIcon, Rocket, Trophy, ShieldCheck, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"
import { ProgressStepper } from "@/components/ui/progress-stepper"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { CustomSelect } from "@/components/ui/custom-select"
import { motion, animate, AnimatePresence } from "framer-motion"

const PremiumParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-slate-900/60 mix-blend-overlay backdrop-blur-sm"
      />
      {Array.from({ length: 100 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 100;
        const radius = 50 + Math.random() * 500;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const colors = ['bg-amber-400', 'bg-blue-500', 'bg-emerald-400', 'bg-amber-300', 'bg-white'];
        const color = colors[i % colors.length];
        const isSquare = i % 3 === 0;
        
        return (
          <motion.div
            key={i}
            initial={{ opacity: 1, x: 0, y: -50, scale: 0, rotate: 0 }}
            animate={{ 
              opacity: [1, 1, 0], 
              x: x, 
              y: y + Math.random() * 200, 
              scale: Math.random() * 1.5 + 0.5,
              rotate: Math.random() * 360 
            }}
            transition={{ duration: 2.5 + Math.random() * 1.5, ease: "easeOut" }}
            className={`absolute w-3 h-3 ${isSquare ? 'rounded-sm' : 'rounded-full'} ${color} shadow-sm z-10`}
          />
        )
      })}
      
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 50 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1, 0], y: [-50, -150, -150, -200] }}
        transition={{ duration: 3.5, times: [0, 0.15, 0.85, 1], ease: "easeInOut" }}
        className="absolute z-20 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-amber-400/50 blur-[50px] rounded-full animate-pulse" />
          <div className="w-36 h-36 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(251,191,36,0.8)] border-4 border-white mb-6 relative z-10">
            <Trophy className="w-16 h-16 text-white drop-shadow-lg" />
          </div>
        </div>
        <div className="bg-white px-8 py-3 rounded-full shadow-2xl border border-amber-200">
          <span className="font-extrabold text-amber-600 tracking-widest text-[18px] uppercase drop-shadow-sm">Maximum Trust Achieved</span>
        </div>
      </motion.div>
    </div>
  )
}

export default function CreateDeal() {
  const navigate = useNavigate()
  const [step, setStep] = React.useState(1)
  const totalSteps = 5
  
  const [showOrderTypeInfo, setShowOrderTypeInfo] = React.useState(false)

  // Step 1 State
  const [title, setTitle] = React.useState("Charizard Holo 1999 Base Set")
  const [price, setPrice] = React.useState("4300")
  const [description, setDescription] = React.useState("Mint condition. Kept in sleeve.")
  const [condition, setCondition] = React.useState("Mint")
  const [productType, setProductType] = React.useState("Trading Cards")
  const [isGraded, setIsGraded] = React.useState(false)
  const [serialNumber, setSerialNumber] = React.useState("")
  const [orderType, setOrderType] = React.useState("Online Transaction")

  // Step 2 State
  const [mainPhoto, setMainPhoto] = React.useState<string | null>(null)
  const [frontPhoto, setFrontPhoto] = React.useState<string | null>(null)
  const [backPhoto, setBackPhoto] = React.useState<string | null>(null)
  const [sidePhoto, setSidePhoto] = React.useState<string | null>(null)
  const [detailPhoto, setDetailPhoto] = React.useState<string | null>(null)
  const [hasVideo, setHasVideo] = React.useState(false)
  const [hasCert, setHasCert] = React.useState(false)

  const [activeCamera, setActiveCamera] = React.useState<string | null>(null)
  const [cameraState, setCameraState] = React.useState<"guiding" | "recording" | "preview">("guiding")
  const [recordingTime, setRecordingTime] = React.useState(0)
  const [guidanceMessage, setGuidanceMessage] = React.useState("")
  
  const [expandedSection, setExpandedSection] = React.useState<string | null>("main")
  const [instructionModal, setInstructionModal] = React.useState<string | null>(null)
  const [showScoreBreakdown, setShowScoreBreakdown] = React.useState(false)
  const [scorePulsing, setScorePulsing] = React.useState(false)

  // Trust Score Logic
  const verifiedProfileScore = isGraded ? 0 : 20
  const itemDetailsScore = 20
  const mainPhotoScore = mainPhoto ? 15 : 0
  const fScore = frontPhoto ? 3.75 : 0
  const bScore = backPhoto ? 3.75 : 0
  const sScore = sidePhoto ? 3.75 : 0
  const dScore = detailPhoto ? 3.75 : 0
  const videoScore = hasVideo ? 30 : 0
  const certScore = hasCert && isGraded ? 20 : 0
  const currentScore = Math.min(100, verifiedProfileScore + itemDetailsScore + mainPhotoScore + fScore + bScore + sScore + dScore + videoScore + certScore)

  const [displayScore, setDisplayScore] = React.useState(currentScore)
  const [celebrationPhase, setCelebrationPhase] = React.useState<'idle' | 'bursting' | 'finished'>('idle')
  const isScoreMaxed = celebrationPhase === 'finished'
  const hasTriggeredMax = React.useRef(false)
  const [randomCompletionMessage, setRandomCompletionMessage] = React.useState("This deal is now optimized for buyer trust.")

  // Step 3 State
  const [handlingTime, setHandlingTime] = React.useState("Ship within 1–2 business days")
  const [carrier, setCarrier] = React.useState("USPS")
  const [customCarrier, setCustomCarrier] = React.useState("")
  const [customTrackingUrl, setCustomTrackingUrl] = React.useState("")
  const [shippingType, setShippingType] = React.useState("Standard")
  const [isInsured, setIsInsured] = React.useState(false)
  const [shippingCost, setShippingCost] = React.useState("0")

  // Meeting Details State
  const [meetingLocation, setMeetingLocation] = React.useState("")
  const [meetingDate, setMeetingDate] = React.useState("")
  const [meetingTime, setMeetingTime] = React.useState("")
  const [meetingNotes, setMeetingNotes] = React.useState("")

  // Step 4 State
  const [feeOption, setFeeOption] = React.useState(() => {
    return Number(localStorage.getItem('feeOption')) || 1
  })
  React.useEffect(() => {
    localStorage.setItem('feeOption', feeOption.toString())
  }, [feeOption])
  const [showFeeBreakdown, setShowFeeBreakdown] = React.useState(false)

  // Toast state
  const [toasts, setToasts] = React.useState<{ id: number, message: string, subtext?: string, duration?: number }[]>([])
  const addToast = (message: string, subtext?: string, duration: number = 2500) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, subtext, duration }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }

  // Effect to animate trust score
  React.useEffect(() => {
    if (currentScore > displayScore) {
      setScorePulsing(true)
      setTimeout(() => setScorePulsing(false), 1000)
    }
    
    const isMax = currentScore === 100

    const controls = animate(displayScore, currentScore, {
      duration: isMax ? 1.5 : 1,
      ease: "easeOut",
      onUpdate: (value) => {
        const rounded = Math.round(value)
        setDisplayScore(rounded)
        if (isMax && rounded === 100 && !hasTriggeredMax.current) {
          hasTriggeredMax.current = true
          setCelebrationPhase('bursting')
          setTimeout(() => setCelebrationPhase('finished'), 4000)
          
          const msgs = [
            "🔥 Amazing!",
            "🚀 Listing Fully Verified",
            "🏆 Maximum Trust Unlocked",
            "⭐ Buyers Will Love This",
            "💎 Professional Seller Status",
            "🛡 Trusted Transaction Ready"
          ]
          setRandomCompletionMessage(msgs[Math.floor(Math.random() * msgs.length)])

          setTimeout(() => {
            addToast("🎉 Verification Package Complete!", "Trust Score: 100/100 • Buyer Confidence: MAXIMUM TRUST", 3000)
          }, 4000)
        }
      },
    })
    return controls.stop
  }, [currentScore])

  // Camera Guidance & Timer Effects
  React.useEffect(() => {
    let timeout1: ReturnType<typeof setTimeout>
    let timeout2: ReturnType<typeof setTimeout>
    
    if (activeCamera && activeCamera !== "video" && cameraState === "guiding") {
      setGuidanceMessage("📷 Position item inside frame")
      timeout1 = setTimeout(() => setGuidanceMessage("📷 Get a bit closer"), 2500)
      timeout2 = setTimeout(() => setGuidanceMessage("📷 Perfect. Ready to capture."), 5000)
    }
    
    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
    }
  }, [activeCamera, cameraState])

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (activeCamera === "video" && cameraState === "recording") {
      interval = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 60) {
            setCameraState("preview")
            return prev
          }
          if (prev === 5) setGuidanceMessage("Capture all sides of the item")
          if (prev === 15) setGuidanceMessage("Keep item visible at all times")
          if (prev === 25) setGuidanceMessage("Move back if product is cropped")
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeCamera, cameraState])

  const nextStep = () => {
    if (step === 2 && orderType === "In-Person Transaction") {
      setStep(4)
    } else if (step < totalSteps) {
      setStep(step + 1)
    } else {
      const mode = new URLSearchParams(window.location.search).get("mode")
      if (mode === "edit") {
        localStorage.removeItem("dealDeclined")
        localStorage.setItem("dealRepublished", "true")
      }
      navigate("/deal-published")
    }
  }

  const prevStep = () => {
    if (step === 4 && orderType === "In-Person Transaction") {
      setStep(2)
    } else if (step > 1) {
      setStep(step - 1)
    } else {
      navigate("/dashboard")
    }
  }

  const startCamera = async (type: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach(track => track.stop())
      setActiveCamera(type)
      setCameraState("guiding")
      setRecordingTime(0)
      
      if (type === "video") {
        setGuidanceMessage("Center the item to begin")
      }
    } catch (err) {
      console.error("Camera access denied", err)
      addToast("Camera Permission Required", "Please allow camera access in your browser to continue.", 4000)
    }
  }

  const completeUpload = (type: string) => {
    const images: Record<string, string> = {
      main: "/pokemon-main.jpg",
      front: "/pokemon-front.jpg",
      back: "/pokemon-back.jpg",
      side: "/pokemon-side.jpg",
      detail: "/pokemon-detail.jpg",
    }
    const dummyImage = images[type] || "/pokemon-main.jpg"
    
    let newMain = mainPhoto, newFront = frontPhoto, newBack = backPhoto, newSide = sidePhoto, newDetail = detailPhoto, newVideo = hasVideo, newCert = hasCert
    
    const randomMsgs = [
      "🎉 Nice start! +20 Trust Points",
      "🚀 Great job! Buyers trust detailed listings",
      "📸 Looking good! +5 Trust Points earned",
      "🔥 Your listing just became more trustworthy",
      "💎 Buyers love seeing multiple product angles",
      "🛡 Trust level increased"
    ]
    const getRandomMsg = () => randomMsgs[Math.floor(Math.random() * randomMsgs.length)]
    
    if (type === "main") { setMainPhoto(dummyImage); newMain = dummyImage; addToast(getRandomMsg()); setExpandedSection("product"); }
    if (type === "front") { setFrontPhoto(dummyImage); newFront = dummyImage; addToast(getRandomMsg()); }
    if (type === "back") { setBackPhoto(dummyImage); newBack = dummyImage; addToast(getRandomMsg()); }
    if (type === "side") { setSidePhoto(dummyImage); newSide = dummyImage; addToast(getRandomMsg()); }
    if (type === "detail") { setDetailPhoto(dummyImage); newDetail = dummyImage; addToast(getRandomMsg()); }
    if (type === "video") { setHasVideo(true); newVideo = true; addToast("🎥 Excellent! Video verification added"); setExpandedSection("cert"); }
    if (type === "cert") { setHasCert(true); newCert = true; addToast("🏆 Verification boosted!"); setExpandedSection(null); }
    
    const newScore = Math.min(100, verifiedProfileScore + itemDetailsScore + (newMain ? 20 : 0) + (newFront ? 5 : 0) + (newBack ? 5 : 0) + (newSide ? 5 : 0) + (newDetail ? 5 : 0) + (newVideo ? 20 : 0) + ((newCert && isGraded) ? 20 : 0))
    
    if (currentScore < 80 && newScore >= 80) {
      setTimeout(() => addToast(`⭐ Almost there! Just a few more steps`, `Trust Score: ${newScore}/100`), 1500)
    }
    
    setActiveCamera(null)
  }

  // Fees Logic
  const itemPriceNum = parseFloat(price) || 0
  const shipCostNum = orderType === "In-Person Transaction" ? 0 : (parseFloat(shippingCost) || 0)
  const platformFee = (itemPriceNum + shipCostNum) * 0.035 + 0.30

  // Fee option mapping: 0 = Split, 1 = Buyer Pays, 2 = Seller Pays
  const sellerFee = feeOption === 2 ? platformFee : feeOption === 0 ? platformFee / 2 : 0
  const sellerEarnings = itemPriceNum - sellerFee

  return (
    <div className="flex flex-col min-h-screen bg-background pb-[180px]">
      <div className="flex items-center justify-center p-4 relative bg-background">
        <button
          onClick={prevStep}
          className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-[16px] font-semibold">New deal</h1>
      </div>

      <div className="px-6 pt-4 pb-8 flex-1">
        {/* Step 1 Trust Score Hero */}
        {step === 1 && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 shadow-lg mb-6">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex-1">
                <h2 className="text-[20px] font-bold mb-1">Trust Score</h2>
                <p className="text-[14px] text-blue-100 font-medium">Getting Started</p>
                <p className="text-[13px] text-blue-200 mt-1">Upload proof to increase buyer trust.</p>
              </div>
              <div className="text-right pl-4">
                <span className="text-[40px] font-extrabold leading-none tracking-tight">0</span>
                <span className="text-blue-200 font-semibold text-[16px] ml-1">/100</span>
              </div>
            </div>
            <div className="h-4 w-full bg-blue-900/40 rounded-full overflow-hidden relative z-10 shadow-inner">
               <div className="h-full bg-white w-[5%]" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl" />
          </div>
        )}

        {/* Step 2 Sticky Trust Score Command Center */}
        {step === 2 && (
          <div className="sticky top-0 z-40 pt-4 pb-4 bg-background border-b border-border mb-6 -mx-6 px-6">
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white p-5 transition-all duration-300 z-10 ${isScoreMaxed ? 'shadow-[0_0_20px_rgba(245,197,66,0.35)] ring-1 ring-amber-400/50 scale-[1.02]' : 'shadow-lg'} ${scorePulsing ? 'scale-[1.02] ring-4 ring-green-400 ring-opacity-50' : ''}`}>
              {celebrationPhase === 'bursting' && <PremiumParticles />}
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex-1">
                  <h2 className="text-[20px] font-bold mb-1 flex items-center gap-2">
                    Trust Score
                    {isScoreMaxed && <Trophy className="w-5 h-5 text-[#F5C542] drop-shadow-sm" />}
                    {isScoreMaxed && <span className="animate-pulse absolute -top-1 -right-1 text-lg">✨</span>}
                    {scorePulsing && !isScoreMaxed && <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />}
                  </h2>
                  <div className="flex items-center gap-2 mt-1 relative">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 transition-colors duration-500 overflow-hidden ${displayScore < 60 ? 'bg-red-500/20 text-red-100 border-red-500/30' : displayScore < 80 ? 'bg-yellow-500/20 text-yellow-100 border-yellow-500/30' : displayScore < 100 ? 'bg-green-500/20 text-green-100 border-green-500/30' : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 border-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.5)]'}`}>
                      {displayScore === 100 && (
                        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring" }}>
                          <ShieldCheck className="w-3 h-3 text-amber-950" />
                        </motion.div>
                      )}
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={displayScore < 60 ? 'LOW' : displayScore < 80 ? 'MEDIUM' : displayScore < 100 ? 'HIGH' : 'MAXIMUM TRUST'}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {displayScore < 60 ? 'LOW' : displayScore < 80 ? 'MEDIUM' : displayScore < 100 ? 'HIGH' : 'MAXIMUM TRUST'}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </div>
                </div>
                <div className="text-right pl-4">
                  <span className="text-[40px] font-extrabold leading-none tracking-tight">{displayScore}</span>
                  <span className="text-blue-200 font-semibold text-[16px] ml-1">/100</span>
                </div>
              </div>

              <div className="h-3 w-full bg-blue-900/40 rounded-full overflow-hidden relative z-10 shadow-inner mb-3">
                <motion.div
                  className={`h-full ${isScoreMaxed ? 'bg-[#F5C542] shadow-[0_0_10px_#F5C542]' : 'bg-white'}`}
                  initial={{ width: `${displayScore}%` }}
                  animate={{ width: `${displayScore}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="text-[13px] font-medium text-blue-100">
                  Next: {!mainPhoto ? "Take Main Photo" : (!frontPhoto || !backPhoto || !sidePhoto || !detailPhoto) ? "Add Additional Photos" : !hasVideo ? "Add Product Video" : "Complete Verification"}
                </div>
                <button onClick={() => setShowScoreBreakdown(!showScoreBreakdown)} className="text-[12px] font-bold text-white flex items-center gap-1 hover:text-blue-200 transition-colors">
                  {showScoreBreakdown ? 'Hide Breakdown' : 'View Breakdown'} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showScoreBreakdown ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <AnimatePresence>
                {showScoreBreakdown && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-4 pt-4 border-t border-blue-500/30 text-[13px] space-y-2 relative z-10 overflow-hidden">
                    <div className="flex justify-between"><span className="text-blue-200">Item Details</span><span className="text-white font-bold">20/20 Complete</span></div>
                    <div className="flex justify-between"><span className="text-blue-200">Main Photo</span><span className={mainPhoto ? 'text-white font-bold' : 'text-blue-300'}>{mainPhoto ? '15/15 Complete' : '0/15'}</span></div>
                    <div className="flex justify-between"><span className="text-blue-200">Additional Photos</span><span className={(fScore+bScore+sScore+dScore) === 15 ? 'text-white font-bold' : 'text-blue-300'}>{fScore+bScore+sScore+dScore}/15 {fScore+bScore+sScore+dScore === 15 ? 'Complete' : ''}</span></div>
                    <div className="flex justify-between"><span className="text-blue-200">Product Video</span><span className={hasVideo ? 'text-white font-bold' : 'text-blue-300'}>{hasVideo ? '30/30 Complete' : '0/30'}</span></div>
                    {!isGraded ? (
                      <div className="flex justify-between"><span className="text-blue-200">TrustLayer Verified Profile</span><span className="text-white font-bold">20/20 Complete</span></div>
                    ) : (
                      <div className="flex justify-between"><span className="text-blue-200">Certification Verification</span><span className={hasCert ? 'text-white font-bold' : 'text-blue-300'}>{hasCert ? '20/20 Complete' : '0/20'}</span></div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl" />
            </div>
          </div>
        )}

        <ProgressStepper
          currentStep={step}
          totalSteps={totalSteps}
          label={
            step === 1 ? "Item details" :
              step === 2 ? "Proof & Verification" :
                step === 3 ? (orderType === "In-Person Transaction" ? "Meeting Details" : "Shipping") :
                  step === 4 ? "Fees" : "Review deal"
          }
          className="mb-8"
        />

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[13px] font-medium text-foreground">Title</label>
                <Input placeholder="e.g. Charizard Holo 1999" value={title} onChange={e => setTitle(e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-medium text-foreground">Price (USD)</label>
                <Input type="number" placeholder="0" value={price} onChange={e => setPrice(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-foreground">Product Type</label>
                  <CustomSelect
                    placeholder="Select product type"
                    value={productType}
                    onChange={setProductType}
                    options={[
                      { value: "Trading Cards", label: "Trading Cards" },
                      { value: "Sports Cards", label: "Sports Cards" },
                      { value: "Toys", label: "Toys" },
                      { value: "Plush", label: "Plush" },
                      { value: "Figures", label: "Figures" },
                      { value: "Other", label: "Other" }
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-foreground">Condition</label>
                  <Input placeholder="e.g. Mint" value={condition} onChange={e => setCondition(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2 relative">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-medium text-foreground">Order Type</label>
                  <button 
                    type="button" 
                    onClick={() => setShowOrderTypeInfo(true)}
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
                <CustomSelect
                  placeholder="Select order type"
                  value={orderType}
                  onChange={setOrderType}
                  options={[
                    { value: "Online Transaction", label: "Online Transaction" },
                    { value: "In-Person Transaction", label: "In-Person Transaction" }
                  ]}
                />

                <AnimatePresence>
                  {showOrderTypeInfo && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowOrderTypeInfo(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-6 z-50 w-full max-w-[280px] bg-white rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 p-4"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-bold text-[14px] text-foreground">Order Types</h4>
                          <button onClick={() => setShowOrderTypeInfo(false)} className="text-gray-400 hover:text-gray-600">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-base">📦</span>
                              <h5 className="font-bold text-[13px] text-foreground">Online Transaction</h5>
                            </div>
                            <ul className="text-[12px] text-muted-foreground space-y-1">
                              <li>• For items that will be shipped to the buyer.</li>
                              <li>• The seller will upload tracking details after shipping.</li>
                              <li>• The buyer can track the shipment and confirm delivery.</li>
                            </ul>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-base">🤝</span>
                              <h5 className="font-bold text-[13px] text-foreground">In-Person Transaction</h5>
                            </div>
                            <ul className="text-[12px] text-muted-foreground space-y-1">
                              <li>• For local, face-to-face exchanges.</li>
                              <li>• No shipping or tracking information is required.</li>
                              <li>• After the item is handed over, the buyer confirms delivery to complete the transaction.</li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-2 mt-4 p-4 border rounded-2xl cursor-pointer hover:bg-gray-50" onClick={() => setIsGraded(!isGraded)}>
                <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${isGraded ? 'bg-primary border-primary text-white' : 'border-input'}`}>
                  {isGraded && <Check className="w-3.5 h-3.5" />}
                </div>
                <span className="font-semibold text-[14px]">Graded Product</span>
              </div>

              {isGraded && (
                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                  <label className="text-[13px] font-medium text-foreground">Serial Number</label>
                  <Input placeholder="Enter serial number..." value={serialNumber} onChange={e => setSerialNumber(e.target.value)} />
                </div>
              )}

              <div className="space-y-2 mt-2">
                <label className="text-[13px] font-medium text-foreground">Description</label>
                <textarea
                  className="flex w-full rounded-2xl border border-input bg-card px-4 py-3 text-[16px] shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[120px]"
                  placeholder="Describe the item condition..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-10">
            <h3 className="font-bold text-[18px] text-foreground mb-1">Verification Journey</h3>
            <p className="text-[14px] text-muted-foreground mb-4">Complete these steps to build your Trust Score.</p>

            {/* Main Photo Accordion */}
            <Card className="overflow-hidden border-border shadow-sm">
              <div className="p-4 flex items-center justify-between cursor-pointer bg-white hover:bg-gray-50" onClick={() => setExpandedSection(expandedSection === 'main' ? null : 'main')}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${mainPhoto ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                    {mainPhoto ? <CheckCircle2 className="w-5 h-5" /> : <Camera className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-[15px]">1. Main Photo</h4>
                    <p className="text-[12px] text-muted-foreground">{mainPhoto ? 'Completed (+15)' : '+15 Trust Score'}</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'main' ? 'rotate-180' : ''}`} />
              </div>
              <AnimatePresence>
                {expandedSection === 'main' && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-gray-50/50 border-t border-border">
                    <div className="p-4">
                      {!mainPhoto ? (
                        <div className="space-y-3">
                           <p className="text-[13px] text-muted-foreground">The primary photo buyers see in search results. Make it count.</p>
                           <Button className="w-full font-bold" onClick={() => setInstructionModal("main")}>Take Main Photo</Button>
                        </div>
                      ) : (
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-border shadow-sm group">
                          <img src={mainPhoto} alt="Main" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="secondary" size="icon" className="rounded-full h-12 w-12 bg-red-500 hover:bg-red-600 text-white border-none" onClick={() => setMainPhoto(null)}>
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Additional Photos Accordion */}
            <Card className="overflow-hidden border-border shadow-sm">
              <div className="p-4 flex items-center justify-between cursor-pointer bg-white hover:bg-gray-50" onClick={() => setExpandedSection(expandedSection === 'product' ? null : 'product')}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${(frontPhoto && backPhoto && sidePhoto && detailPhoto) ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                    {(frontPhoto && backPhoto && sidePhoto && detailPhoto) ? <CheckCircle2 className="w-5 h-5" /> : <ImageIcon className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-[15px]">2. Additional Photos</h4>
                    <p className="text-[12px] text-muted-foreground">{(frontPhoto && backPhoto && sidePhoto && detailPhoto) ? 'Completed (+15)' : `+15 Trust Score • ${[frontPhoto, backPhoto, sidePhoto, detailPhoto].filter(Boolean).length}/4 Completed`}</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'product' ? 'rotate-180' : ''}`} />
              </div>
              <AnimatePresence>
                {expandedSection === 'product' && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-gray-50/50 border-t border-border">
                    <div className="p-4 space-y-4">
                      <p className="text-[13px] text-muted-foreground">Capture multiple angles to build maximum buyer confidence.</p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: "front", state: frontPhoto, setState: setFrontPhoto },
                          { id: "back", state: backPhoto, setState: setBackPhoto },
                          { id: "side", state: sidePhoto, setState: setSidePhoto },
                          { id: "detail", state: detailPhoto, setState: setDetailPhoto }
                        ].map((cam) => (
                          cam.state ? (
                            <div key={cam.id} className="relative aspect-square rounded-xl overflow-hidden border border-border group shadow-sm">
                              <img src={cam.state} alt="Photo" className="w-full h-full object-cover" />
                              <button
                                onClick={() => cam.setState(null)}
                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity w-full h-full"
                              >
                                <Trash2 className="h-5 w-5 text-white" />
                              </button>
                            </div>
                          ) : (
                            <button
                              key={cam.id}
                              onClick={() => setInstructionModal(`product-${cam.id}`)}
                              className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-muted-foreground hover:bg-gray-100 transition-colors bg-white shadow-sm"
                            >
                              <Camera className="h-6 w-6 text-primary/60" />
                            </button>
                          )
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Product Video Accordion */}
            <Card className="overflow-hidden border-border shadow-sm">
              <div className="p-4 flex items-center justify-between cursor-pointer bg-white hover:bg-gray-50" onClick={() => setExpandedSection(expandedSection === 'video' ? null : 'video')}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${hasVideo ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                    {hasVideo ? <CheckCircle2 className="w-5 h-5" /> : <Video className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-[15px]">3. Product Video</h4>
                    <p className="text-[12px] text-muted-foreground">{hasVideo ? 'Completed (+30)' : '+30 Trust Score'}</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'video' ? 'rotate-180' : ''}`} />
              </div>
              <AnimatePresence>
                {expandedSection === 'video' && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-gray-50/50 border-t border-border">
                    <div className="p-4">
                      {!hasVideo ? (
                        <div className="space-y-3">
                           <p className="text-[13px] text-muted-foreground">A 360-degree video proves authenticity and physical possession.</p>
                           <Button className="w-full font-bold" onClick={() => setInstructionModal("video")}>Record Video</Button>
                        </div>
                      ) : (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                          <div>
                            <p className="font-bold text-[14px] text-green-800">Video Verified</p>
                            <p className="text-[12px] text-green-600">Video uploaded successfully.</p>
                          </div>
                          <Button variant="ghost" size="icon" className="ml-auto text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => setHasVideo(false)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Certification Accordion */}
            {isGraded && (
              <Card className="overflow-hidden border-border shadow-sm animate-in slide-in-from-top-2">
                <div className="p-4 flex items-center justify-between cursor-pointer bg-white hover:bg-gray-50" onClick={() => setExpandedSection(expandedSection === 'cert' ? null : 'cert')}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${hasCert ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                      {hasCert ? <CheckCircle2 className="w-5 h-5" /> : <FileBadge className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-[15px]">4. Certification</h4>
                      <p className="text-[12px] text-muted-foreground">{hasCert ? 'Completed (+10)' : '+10 Trust Score'}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'cert' ? 'rotate-180' : ''}`} />
                </div>
                <AnimatePresence>
                  {expandedSection === 'cert' && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-gray-50/50 border-t border-border">
                      <div className="p-4">
                        {!hasCert ? (
                          <div className="space-y-3">
                             <p className="text-[13px] text-muted-foreground">Upload PSA, receipts, or authenticity documents.</p>
                             <Button className="w-full font-bold" onClick={() => startCamera("cert")}>Upload Certificate</Button>
                          </div>
                        ) : (
                          <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                            <div>
                              <p className="font-bold text-[14px] text-green-800">Certificate Verified</p>
                              <p className="text-[12px] text-green-600">Document uploaded successfully.</p>
                            </div>
                            <Button variant="ghost" size="icon" className="ml-auto text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => setHasCert(false)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            )}

            {isScoreMaxed && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mt-8 relative"
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-300 rounded-2xl p-8 shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-green-400/20 rounded-full blur-3xl"></div>
                  
                  <div className="flex flex-col items-center text-center relative z-10 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg mb-4 border-4 border-white">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-[22px] font-extrabold text-green-900 leading-tight">Maximum Trust Achieved</h3>
                    <p className="text-[15px] text-green-800 mt-1">Your verification package is now complete.</p>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 mb-6 shadow-inner border border-white/50">
                    <div className="flex justify-between items-center mb-4 border-b border-green-200/50 pb-3">
                      <span className="font-bold text-green-900">Trust Score</span>
                      <span className="font-extrabold text-[18px] text-green-700">100 / 100</span>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-[14px] font-bold text-green-900"><CheckCircle2 className="w-5 h-5 text-green-600" /> Main Photo Verified</li>
                      <li className="flex items-center gap-3 text-[14px] font-bold text-green-900"><CheckCircle2 className="w-5 h-5 text-green-600" /> Additional Photos Verified</li>
                      <li className="flex items-center gap-3 text-[14px] font-bold text-green-900"><CheckCircle2 className="w-5 h-5 text-green-600" /> Product Video Complete</li>
                      {isGraded && <li className="flex items-center gap-3 text-[14px] font-bold text-green-900"><CheckCircle2 className="w-5 h-5 text-green-600" /> Certification Verified</li>}
                    </ul>
                  </div>
                  
                  <div className="text-center relative z-10">
                    <p className="text-[12px] font-bold text-green-800/70 uppercase tracking-widest mb-1">Buyer Confidence</p>
                    <p className="text-[20px] font-extrabold text-green-600 tracking-tight flex items-center justify-center gap-2">
                      <ShieldCheck className="w-6 h-6" /> MAXIMUM TRUST
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-center animate-in fade-in duration-500 delay-300">
                  <p className="text-[13px] text-muted-foreground font-medium leading-relaxed px-4">
                    Your listing now provides the highest level of buyer confidence available on TrustLayer.
                    <br className="hidden sm:block" /> This can help buyers feel more comfortable completing high-value transactions.
                  </p>
                </div>
              </motion.div>
            )}

          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {orderType === "In-Person Transaction" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-foreground">Meeting Location (Required)</label>
                  <Input placeholder="e.g. Starbucks, 123 Main St" value={meetingLocation} onChange={e => setMeetingLocation(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-foreground">Meeting Date (Required)</label>
                    <Input type="date" value={meetingDate} onChange={e => setMeetingDate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-foreground">Meeting Time</label>
                    <Input type="time" value={meetingTime} onChange={e => setMeetingTime(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <label className="text-[13px] font-medium text-foreground">Notes (Optional)</label>
                  <textarea
                    className="flex w-full rounded-2xl border border-input bg-card px-4 py-3 text-[16px] shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[100px]"
                    placeholder="Any specific details about the meetup..."
                    value={meetingNotes}
                    onChange={e => setMeetingNotes(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-foreground">Handling Time</label>
                  <CustomSelect
                    placeholder="Select handling time"
                    value={handlingTime}
                    onChange={setHandlingTime}
                    options={[
                      { value: "Ship within 1–2 business days", label: "Ship within 1–2 business days" },
                      { value: "Ship within 3–5 business days", label: "Ship within 3–5 business days" }
                    ]}
                  />
                  <p className="text-[12px] text-amber-600 font-medium flex items-center gap-1 mt-1">
                    <Info className="w-3.5 h-3.5 shrink-0" /> If you do not ship within the selected handling time, the transaction may be automatically cancelled.
                  </p>
                </div>

                <div className="space-y-2 mt-4">
                  <label className="text-[13px] font-medium text-foreground">Shipping Cost (USD)</label>
                  <Input type="number" placeholder="0" value={shippingCost} onChange={e => setShippingCost(e.target.value)} />
                </div>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="space-y-3">
              {[
                { title: "Split 50/50", desc: "You pay 50%, Buyer pays 50%" },
                { title: "Buyer Pays", desc: "Buyer pays full platform fee" },
                { title: "Seller Pays", desc: "You pay full platform fee" },
              ].map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => setFeeOption(idx)}
                  className={`border rounded-2xl p-4 flex items-center gap-4 cursor-pointer ${idx === feeOption ? 'border-primary bg-primary/5' : 'border-input bg-card'}`}
                >
                  <div className={`h-5 w-5 rounded-full border flex flex-shrink-0 items-center justify-center ${idx === feeOption ? 'border-primary' : 'border-input'}`}>
                    {idx === feeOption && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                  </div>
                  <div>
                    <p className="font-semibold text-[15px]">{option.title}</p>
                    <p className="text-[13px] text-muted-foreground">{option.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 text-[13px] text-muted-foreground p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p>Shipping charges are paid separately by the buyer and do not affect your estimated payout.</p>
            </div>

            <div className="mt-8 border rounded-2xl overflow-hidden">
              <div
                className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setShowFeeBreakdown(!showFeeBreakdown)}
              >
                <div>
                  <h3 className="font-bold text-[15px]">Estimated Earnings</h3>
                  <p className="text-[13px] text-muted-foreground flex items-center gap-1">Tap for breakdown <ChevronDown className="w-3.5 h-3.5" /></p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-[20px] text-primary">${sellerEarnings.toFixed(2)}</p>
                </div>
              </div>

              <AnimatePresence>
                {showFeeBreakdown && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-white border-t border-border px-4 py-4 space-y-2 overflow-hidden"
                  >
                    <div className="flex justify-between text-[14px]">
                      <span className="text-muted-foreground">Item Price</span>
                      <span className="font-medium">${itemPriceNum.toFixed(2)}</span>
                    </div>
                    {orderType !== "In-Person Transaction" && (
                      <div className="flex justify-between text-[14px]">
                        <span className="text-muted-foreground">Shipping Charge</span>
                        <span className="font-medium text-blue-600">Paid by Buyer</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[14px]">
                      <span className="text-muted-foreground">Platform Fee (3.5% + $0.30) <span className="opacity-80 text-[11px]">(non-refundable)</span></span>
                      <span className="font-medium">${platformFee.toFixed(2)}</span>
                    </div>
                    <div className="w-full h-px bg-gray-100 my-2" />
                    <div className="flex justify-between text-[14px]">
                      <span className="text-muted-foreground">Your Fee Responsibility</span>
                      <span className="font-medium text-destructive">-${sellerFee.toFixed(2)}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Step 5 Premium Trust Score Banner */}
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 transition-all duration-300 ${displayScore === 100 ? 'shadow-[0_0_20px_rgba(245,197,66,0.35)] ring-1 ring-amber-400/50 scale-[1.02]' : 'shadow-lg'}`}>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex-1">
                  <h2 className="text-[20px] font-bold mb-1 flex items-center gap-2">
                    Trust Score
                    {displayScore === 100 && <Trophy className="w-5 h-5 text-[#F5C542] drop-shadow-sm" />}
                    {displayScore === 100 && <span className="animate-pulse absolute -top-1 -right-1 text-lg">✨</span>}
                  </h2>
                  <div className="flex items-center gap-2 mt-1 relative">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 transition-colors duration-500 ${displayScore < 40 ? 'bg-red-500/20 text-red-100 border-red-500/30' : displayScore < 100 ? 'bg-yellow-500/20 text-yellow-100 border-yellow-500/30' : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 border-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.5)]'}`}>
                      {displayScore === 100 && (
                        <ShieldCheck className="w-3 h-3 text-amber-950" />
                      )}
                      {displayScore < 40 ? 'LOW' : displayScore < 80 ? 'MEDIUM' : displayScore < 100 ? 'HIGH' : 'MAXIMUM TRUST'}
                    </span>
                  </div>
                </div>
                <div className="text-right pl-4">
                  <span className="text-[40px] font-extrabold leading-none tracking-tight">{displayScore}</span>
                  <span className="text-blue-200 font-semibold text-[16px] ml-1">/100</span>
                </div>
              </div>
              <div className="h-4 w-full bg-blue-900/40 rounded-full overflow-hidden relative z-10 shadow-inner">
                 <div className={`h-full transition-all duration-1000 ${displayScore === 100 ? 'bg-[#F5C542] shadow-[0_0_10px_#F5C542]' : 'bg-white'}`} style={{ width: `${displayScore}%` }} />
              </div>
              {displayScore === 100 && (
                <p className="mt-4 text-[13px] text-blue-100 font-medium relative z-10 text-center animate-pulse">
                  This deal is fully verified and optimized for buyer trust!
                </p>
              )}
              
              <div className="flex items-center justify-center relative z-10 mt-4 border-t border-blue-500/30 pt-3">
                <button onClick={() => setShowScoreBreakdown(!showScoreBreakdown)} className="text-[12px] font-bold text-white flex items-center gap-1 hover:text-blue-200 transition-colors">
                  {showScoreBreakdown ? 'Hide Breakdown' : 'View Breakdown'} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showScoreBreakdown ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <AnimatePresence>
                {showScoreBreakdown && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-2 text-[13px] space-y-2 relative z-10 overflow-hidden">
                    <div className="flex justify-between"><span className="text-blue-200">Item Details</span><span className="text-white font-bold">20/20 Complete</span></div>
                    <div className="flex justify-between"><span className="text-blue-200">Main Photo</span><span className={mainPhoto ? 'text-white font-bold' : 'text-blue-300'}>{mainPhoto ? '15/15 Complete' : '0/15'}</span></div>
                    <div className="flex justify-between"><span className="text-blue-200">Additional Photos</span><span className={(fScore+bScore+sScore+dScore) === 15 ? 'text-white font-bold' : 'text-blue-300'}>{fScore+bScore+sScore+dScore}/15 {fScore+bScore+sScore+dScore === 15 ? 'Complete' : ''}</span></div>
                    <div className="flex justify-between"><span className="text-blue-200">Product Video</span><span className={hasVideo ? 'text-white font-bold' : 'text-blue-300'}>{hasVideo ? '30/30 Complete' : '0/30'}</span></div>
                    {!isGraded ? (
                      <div className="flex justify-between"><span className="text-blue-200">TrustLayer Verified Profile</span><span className="text-white font-bold">20/20 Complete</span></div>
                    ) : (
                      <div className="flex justify-between"><span className="text-blue-200">Certification Verification</span><span className={hasCert ? 'text-white font-bold' : 'text-blue-300'}>{hasCert ? '20/20 Complete' : '0/20'}</span></div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl" />
            </div>

            <Card className="overflow-hidden border-border shadow-sm">
              <div className="relative w-full aspect-[4/3] bg-gray-100 flex items-center justify-center border-b border-border">
                {mainPhoto ? (
                  <img src={mainPhoto} alt="Main" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Camera className="w-8 h-8 opacity-50" />
                    <span className="font-medium text-sm">No photo uploaded</span>
                  </div>
                )}
                <Button variant="secondary" size="sm" className="absolute top-4 right-4 rounded-full shadow-sm" onClick={() => setStep(1)}>
                  <Edit2 className="w-4 h-4 mr-1.5" /> Edit Deal
                </Button>
              </div>

              <CardContent className="p-0">
                <div className="p-5 border-b border-border">
                  <h2 className="text-[20px] font-bold text-foreground leading-tight mb-1">{title || 'Untitled Item'}</h2>
                  <p className="text-[24px] font-extrabold text-primary">${price || '0'}</p>
                </div>

                <div className="p-5 bg-gray-50/50 space-y-4">
                  <h3 className="font-bold text-[13px] text-muted-foreground tracking-wider uppercase mb-2">Item Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[13px] text-muted-foreground mb-0.5">Product Type</p>
                      <p className="font-medium text-[15px]">{productType || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-[13px] text-muted-foreground mb-0.5">Condition</p>
                      <p className="font-medium text-[15px]">{condition || 'Not specified'}</p>
                    </div>
                    {isGraded && (
                      <div className="col-span-2">
                        <p className="text-[13px] text-muted-foreground mb-0.5">Graded Serial Number</p>
                        <p className="font-medium text-[15px]">{serialNumber || 'Not specified'}</p>
                      </div>
                    )}
                    <div className="col-span-2">
                      <p className="text-[13px] text-muted-foreground mb-0.5">Description</p>
                      <p className="font-medium text-[14px] leading-relaxed whitespace-pre-wrap">{description || 'No description provided.'}</p>
                    </div>
                  </div>

                  <div className="w-full h-px bg-border my-4" />

                  <h3 className="font-bold text-[13px] text-muted-foreground tracking-wider uppercase mb-2">Transaction</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[15px]">
                      <span className="text-muted-foreground">Order Type</span>
                      <span className="font-medium text-right">{orderType}</span>
                    </div>

                    {orderType !== "In-Person Transaction" && (
                      <>
                        <div className="flex justify-between items-center text-[15px]">
                          <span className="text-muted-foreground">Shipping</span>
                          <span className="font-medium text-right">{carrier === "Other" ? customCarrier : carrier} ({shippingType})</span>
                        </div>
                        <div className="flex justify-between items-center text-[15px]">
                          <span className="text-muted-foreground">Handling Time</span>
                          <span className="font-medium text-right">{handlingTime}</span>
                        </div>
                        <div className="flex justify-between items-center text-[15px]">
                          <span className="text-muted-foreground">Shipping Cost</span>
                          <span className="font-medium text-right">{shipCostNum === 0 ? "FREE" : `$${shipCostNum}`}</span>
                        </div>
                        <div className="flex justify-between items-center text-[15px]">
                          <span className="text-muted-foreground">Insurance</span>
                          <span className="font-medium text-right">{isInsured ? "Yes" : "No"}</span>
                        </div>
                      </>
                    )}
                    {orderType === "In-Person Transaction" && (
                      <>
                        <div className="flex justify-between items-center text-[15px]">
                          <span className="text-muted-foreground">Location</span>
                          <span className="font-medium text-right">{meetingLocation || "Not specified"}</span>
                        </div>
                        <div className="flex justify-between items-center text-[15px]">
                          <span className="text-muted-foreground">Date / Time</span>
                          <span className="font-medium text-right">{meetingDate ? `${meetingDate} ${meetingTime}` : "Not specified"}</span>
                        </div>
                      </>
                    )}

                    <div className="flex justify-between items-center text-[15px]">
                      <span className="text-muted-foreground">Fee Structure</span>
                      <span className="font-medium text-right">
                        {feeOption === 0 ? 'Split 50/50' : feeOption === 1 ? 'Buyer Pays' : 'Seller Pays'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <div className="fixed bottom-24 left-0 right-0 z-50 flex flex-col items-center pointer-events-none space-y-2 px-4">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-green-600 text-white px-5 py-3.5 rounded-2xl shadow-xl font-bold text-[15px] pointer-events-auto max-w-sm w-full"
            >
              <div className="flex flex-col">
                <span className="flex items-center gap-2">
                  {!toast.message.includes('🎉') && !toast.message.includes('📸') && !toast.message.includes('👏') && !toast.message.includes('✨') && !toast.message.includes('🔥') && !toast.message.includes('🔍') && !toast.message.includes('🎥') && !toast.message.includes('🏆') && (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  )}
                  {toast.message}
                </span>
                {toast.subtext && (
                  <span className="text-green-100 text-[13px] font-medium mt-1 ml-6">{toast.subtext}</span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Camera Modal */}
      <AnimatePresence>
        {activeCamera && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
          >
            <div className="relative w-full h-full max-w-md mx-auto flex flex-col">
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/50 to-transparent">
                <button className="text-white hover:text-gray-300 transition-colors" onClick={() => setActiveCamera(null)}>
                  Cancel
                </button>
                {activeCamera === "video" && cameraState === "recording" && (
                  <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-white font-mono text-sm">00:{recordingTime.toString().padStart(2, '0')}</span>
                  </div>
                )}
              </div>

              {/* Viewfinder Area */}
              <div className="flex-1 relative flex items-center justify-center p-6 overflow-hidden">
                {/* Simulated live feed or preview image */}
                {cameraState === "preview" && (
                  <img 
                    src={activeCamera === 'main' ? '/pokemon-main.jpg' : 
                         activeCamera === 'front' ? '/pokemon-front.jpg' : 
                         activeCamera === 'back' ? '/pokemon-back.jpg' : 
                         activeCamera === 'side' ? '/pokemon-side.jpg' : 
                         activeCamera === 'detail' ? '/pokemon-detail.jpg' : '/pokemon-main.jpg'} 
                    alt="Preview" 
                    className="absolute inset-0 w-full h-full object-cover opacity-90 scale-105" 
                  />
                )}
                
                {/* Corner Framing Guides */}
                {cameraState !== "preview" && (
                  <>
                    <div className="absolute inset-8 border border-white/20 rounded-xl" />
                    <div className="absolute top-8 left-8 w-10 h-10 border-t-4 border-l-4 border-white rounded-tl-xl" />
                    <div className="absolute top-8 right-8 w-10 h-10 border-t-4 border-r-4 border-white rounded-tr-xl" />
                    <div className="absolute bottom-8 left-8 w-10 h-10 border-b-4 border-l-4 border-white rounded-bl-xl" />
                    <div className="absolute bottom-8 right-8 w-10 h-10 border-b-4 border-r-4 border-white rounded-br-xl" />
                  </>
                )}

                {/* Guidance Overlay */}
                {cameraState !== "preview" && (
                  <div className="absolute bottom-16 left-0 right-0 text-center px-8">
                    <motion.div 
                      key={guidanceMessage}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-black/60 backdrop-blur-sm inline-block px-4 py-2 rounded-lg border border-white/10"
                    >
                      <p className="text-white font-medium text-[15px] tracking-wide">{guidanceMessage}</p>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Controls Footer */}
              <div className="bg-black p-8 pb-12 flex flex-col items-center justify-center z-10 space-y-6">
                {cameraState === "preview" ? (
                  <div className="w-full flex items-center gap-4">
                    <Button variant="outline" className="flex-1 bg-transparent border-white text-white hover:bg-white/10 h-14 font-bold" onClick={() => startCamera(activeCamera)}>
                      Retake {activeCamera === "video" ? "Video" : "Photo"}
                    </Button>
                    <Button className="flex-1 h-14 font-bold bg-white text-black hover:bg-gray-200" onClick={() => completeUpload(activeCamera)}>
                      Submit {activeCamera === "video" ? "Video" : "Photo"}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    {activeCamera === "video" && cameraState === "recording" ? (
                      <button 
                        onClick={() => setCameraState("preview")}
                        className="w-20 h-20 rounded-full bg-red-500 border-[6px] border-white flex items-center justify-center hover:scale-105 transition-transform"
                      >
                        <div className="w-6 h-6 bg-white rounded-sm" />
                      </button>
                    ) : activeCamera === "video" && cameraState === "guiding" ? (
                      <button 
                        onClick={() => {
                          setCameraState("recording")
                          setRecordingTime(0)
                          setGuidanceMessage("Move closer if details are difficult to see")
                        }}
                        className="w-20 h-20 rounded-full bg-red-500 border-[6px] border-white flex items-center justify-center hover:scale-105 transition-transform"
                      />
                    ) : (
                      <button 
                        onClick={() => setCameraState("preview")}
                        className="w-20 h-20 rounded-full bg-white border-[6px] border-gray-300 flex items-center justify-center hover:scale-105 transition-transform"
                      />
                    )}
                    
                    {activeCamera !== "video" && (
                      <p className="text-white/60 text-[13px] mt-6 text-center font-medium">Position item inside frame<br/>Ensure good lighting • Capture the entire product</p>
                    )}
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instruction Modals */}
      <BottomSheet isOpen={instructionModal !== null} onClose={() => setInstructionModal(null)} title={instructionModal === 'video' ? 'Product Video Instructions' : 'Instruction Guidelines'}>
        <div className="p-5 pb-8 space-y-6">
          {instructionModal === 'main' && (
            <>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-[18px] font-bold">Main Photo Guidelines</h3>
                <p className="text-[14px] text-muted-foreground mt-2">This is the first photo buyers will see. Make sure it's clear, well-lit, and shows the entire item.</p>
              </div>
              <ul className="space-y-3 bg-gray-50 p-4 rounded-xl text-[14px]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Use natural lighting if possible</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Avoid shadows on the item</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Place on a clean, solid background</li>
              </ul>
              <p className="text-[12px] text-muted-foreground text-center mt-4">TrustLayer requires access to your camera.</p>
              <Button className="w-full h-14 font-bold text-[16px]" onClick={() => { setInstructionModal(null); startCamera("main"); }}>Continue to Camera</Button>
            </>
          )}
          {instructionModal?.startsWith('product') && (
            <>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ImageIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-[18px] font-bold">Additional Photo Guidelines</h3>
                <p className="text-[14px] text-muted-foreground mt-2">Buyers want to see all angles. Be honest about condition to build trust.</p>
              </div>
              <ul className="space-y-3 bg-gray-50 p-4 rounded-xl text-[14px]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Capture Front, Back, Side, and Details</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Keep the camera steady</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Ensure details (like corners) are in focus</li>
              </ul>
              <p className="text-[12px] text-muted-foreground text-center mt-4">TrustLayer requires access to your camera.</p>
              <Button className="w-full h-14 font-bold text-[16px]" onClick={() => { 
                const camId = instructionModal.split('-')[1];
                setInstructionModal(null); 
                startCamera(camId);
              }}>Close and Take Photo</Button>
            </>
          )}
          {instructionModal === 'video' && (
            <>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Video className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <ul className="space-y-3 bg-gray-50 p-4 rounded-xl text-[14px]">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> Record a full 360° view of the product</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> Slowly rotate around the item</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> Show front, back, sides, and important details</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> Highlight any markings, certifications, or imperfections</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> Ensure good lighting throughout</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> Keep the product centered in frame</li>
              </ul>
              
              <div className="flex items-center justify-between px-2">
                <div>
                  <p className="text-[12px] font-bold text-foreground">Maximum recording length</p>
                  <p className="text-[12px] text-muted-foreground">60 seconds</p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] font-bold text-foreground">Recommended length</p>
                  <p className="text-[12px] text-muted-foreground">30–60 seconds</p>
                </div>
              </div>

              <p className="text-[12px] text-muted-foreground text-center pt-2">TrustLayer requires access to your camera.</p>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 h-14 font-bold" onClick={() => setInstructionModal(null)}>Cancel</Button>
                <Button className="flex-1 h-14 font-bold text-[16px]" onClick={() => { setInstructionModal(null); startCamera("video"); }}>Start Recording</Button>
              </div>
            </>
          )}
        </div>
      </BottomSheet>

      <BottomActionBar>
        <Button onClick={nextStep} className="w-full h-14 text-[16px] font-semibold rounded-2xl bg-blue-600 hover:bg-blue-700 text-white">
          {step === 5 ? "Publish Deal" : "Continue"}
        </Button>
      </BottomActionBar>
    </div>
  )
}
