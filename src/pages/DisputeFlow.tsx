import * as React from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronLeft, ShieldCheck, CheckCircle2, 
  UploadCloud, FileText, Image as ImageIcon, Video, Camera, Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function DisputeFlow() {
  const navigate = useNavigate()
  const [step, setStep] = React.useState(1)
  const [reason, setReason] = React.useState("")
  const [notes, setNotes] = React.useState("")
  
  const [hasUnboxing, setHasUnboxing] = React.useState(false)
  const [hasPhotos, setHasPhotos] = React.useState(false)
  const [hasVideos, setHasVideos] = React.useState(false)
  const [hasDocs, setHasDocs] = React.useState(false)
  
  const reasons = [
    "Product Damaged",
    "Missing Items",
    "Wrong Item Received",
    "Order Has Not Arrived",
    "Other"
  ]

  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => {
    if (step === 1) navigate(-1)
    else setStep(s => s - 1)
  }

  const handleSendToSeller = () => {
    nextStep()
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      {step < 3 && (
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 sticky top-0 z-20">
          <button onClick={prevStep} className="p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
             <ShieldCheck className="w-3.5 h-3.5" />
             <span className="text-[12px] font-bold">Report & Issue</span>
          </div>
          <div className="w-10"></div>
        </div>
      )}

      <div className={`flex-1 ${step < 3 ? 'px-6 pb-[140px] pt-6' : ''}`}>
        <AnimatePresence mode="wait">
          
          {/* STEP 1: DISPUTE REASON */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight mb-2">What went wrong?</h1>
                <p className="text-[14px] text-muted-foreground">
                  Select the reason that best describes your issue.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {reasons.map((r) => (
                  <div 
                    key={r}
                    onClick={() => setReason(r)}
                    className={`p-4 border-2 rounded-xl transition-all cursor-pointer flex items-center justify-between ${reason === r ? 'border-primary bg-blue-50/50' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                  >
                    <span className={`font-semibold text-[15px] ${reason === r ? 'text-primary' : 'text-foreground'}`}>{r}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${reason === r ? 'border-primary' : 'border-gray-300'}`}>
                      {reason === r && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: UPLOAD EVIDENCE */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight mb-2">Provide Supporting Evidence</h1>
                <p className="text-[14px] text-muted-foreground">
                  Photos and videos help the seller resolve your issue faster.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Unboxing Video */}
                {hasUnboxing ? (
                  <div className="relative rounded-xl overflow-hidden border border-border group shadow-sm h-28">
                    <img src="/pokemon-front.jpg" alt="Unboxing Video" className="w-full h-full object-cover" />
                    <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm font-semibold">Unboxing Video</div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-md">
                         <div className="w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-white border-b-4 border-b-transparent ml-1" />
                       </div>
                    </div>
                    <button
                      onClick={() => setHasUnboxing(false)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity w-full h-full"
                    >
                      <Trash2 className="h-5 w-5 text-white" />
                    </button>
                  </div>
                ) : (
                  <div onClick={() => setHasUnboxing(true)} className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-center hover:border-primary/50 hover:bg-blue-50/30 cursor-pointer transition-colors h-28">
                    <Camera className="w-6 h-6 text-primary" />
                    <span className="text-[12px] font-bold text-gray-700">Unboxing Video</span>
                  </div>
                )}

                {/* Photos */}
                {hasPhotos ? (
                  <div className="relative rounded-xl overflow-hidden border border-border group shadow-sm h-28">
                    <img src="/pokemon-detail.jpg" alt="Photos" className="w-full h-full object-cover" />
                    <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm font-semibold">2 Photos</div>
                    <button
                      onClick={() => setHasPhotos(false)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity w-full h-full"
                    >
                      <Trash2 className="h-5 w-5 text-white" />
                    </button>
                  </div>
                ) : (
                  <div onClick={() => setHasPhotos(true)} className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-center hover:border-primary/50 hover:bg-blue-50/30 cursor-pointer transition-colors h-28">
                    <ImageIcon className="w-6 h-6 text-primary" />
                    <span className="text-[12px] font-bold text-gray-700">Photos</span>
                  </div>
                )}

                {/* Videos */}
                {hasVideos ? (
                  <div className="relative rounded-xl overflow-hidden border border-border group shadow-sm h-28">
                    <img src="/pokemon-side.jpg" alt="Videos" className="w-full h-full object-cover" />
                    <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm font-semibold">1 Video</div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-md">
                         <div className="w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-white border-b-4 border-b-transparent ml-1" />
                       </div>
                    </div>
                    <button
                      onClick={() => setHasVideos(false)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity w-full h-full"
                    >
                      <Trash2 className="h-5 w-5 text-white" />
                    </button>
                  </div>
                ) : (
                  <div onClick={() => setHasVideos(true)} className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-center hover:border-primary/50 hover:bg-blue-50/30 cursor-pointer transition-colors h-28">
                    <Video className="w-6 h-6 text-primary" />
                    <span className="text-[12px] font-bold text-gray-700">Videos</span>
                  </div>
                )}

                {/* Documents */}
                {hasDocs ? (
                  <div className="relative rounded-xl overflow-hidden border border-border group shadow-sm h-28">
                    <img src="/pokemon-cert.jpg" alt="Documents" className="w-full h-full object-cover" />
                    <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm font-semibold">Document</div>
                    <button
                      onClick={() => setHasDocs(false)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity w-full h-full"
                    >
                      <Trash2 className="h-5 w-5 text-white" />
                    </button>
                  </div>
                ) : (
                  <div onClick={() => setHasDocs(true)} className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-center hover:border-primary/50 hover:bg-blue-50/30 cursor-pointer transition-colors h-28">
                    <FileText className="w-6 h-6 text-primary" />
                    <span className="text-[12px] font-bold text-gray-700">Documents</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-4">
                <label className="text-[14px] font-bold text-gray-900">Describe the issue in detail</label>
                <Textarea 
                  placeholder="Please explain what is wrong with the item..." 
                  className="min-h-[120px] bg-white border-gray-200 text-[14px] rounded-xl resize-none"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </motion.div>
          )}

          {/* STEP 3: SUBMITTED */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-white flex flex-col pt-24 px-6 pb-8 overflow-y-auto w-full max-w-[430px] mx-auto">
               <div className="flex-1 flex flex-col items-center text-center">
                 <motion.div
                   initial={{ scale: 0, rotate: -45 }}
                   animate={{ scale: 1, rotate: 0 }}
                   transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                   className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(59,130,246,0.2)] relative"
                 >
                   <div className="absolute inset-0 rounded-full border-4 border-primary opacity-20 animate-pulse" />
                   <ShieldCheck className="w-12 h-12 text-primary" />
                 </motion.div>
                 
                 <motion.h1 
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                   className="text-[28px] font-extrabold tracking-tight text-foreground mb-4"
                 >
                   Dispute Submitted
                 </motion.h1>

                 <motion.p 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                   className="text-center text-[15px] text-muted-foreground leading-relaxed max-w-[300px]"
                 >
                   The seller has been notified and will review your claim. TrustLayer will hold the funds securely until a resolution is reached.
                 </motion.p>
               </div>
               
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="w-full mt-8">
                 <Button 
                   className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white shadow-lg"
                   onClick={() => navigate("/dashboard")}
                 >
                   View Dispute
                 </Button>
               </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* FOOTER CTA */}
      {step < 3 && (
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] p-4 pb-6 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-40">
          {step === 1 && (
            <Button 
              className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white" 
              onClick={nextStep}
              disabled={!reason}
            >
              Continue
            </Button>
          )}
          {step === 2 && (
            <Button 
              className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white" 
              onClick={handleSendToSeller}
              disabled={!notes}
            >
              Send To Seller
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
