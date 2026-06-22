import * as React from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronLeft, ShieldCheck, Check, CheckCircle2, 
  CreditCard, Wallet, Lock, Shield, ArrowRight, Smartphone
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function FundEscrowFlow() {
  const navigate = useNavigate()
  const [step, setStep] = React.useState(1)
  
  // Step 1: Account
  const [isLoginView, setIsLoginView] = React.useState(false)
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  
  // Step 2: Verification
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""])
  const [isVerified, setIsVerified] = React.useState(false)
  
  // Step 3: Address
  const [street, setStreet] = React.useState("")
  const [apt, setApt] = React.useState("")
  const [city, setCity] = React.useState("")
  const [state, setState] = React.useState("")
  const [zip, setZip] = React.useState("")

  // Step 4: Terms
  const [termsChecked, setTermsChecked] = React.useState({
    item: false,
    shipping: false,
    fees: false
  })

  // Step 5: Fund
  const [paymentMethod, setPaymentMethod] = React.useState<"card" | "wallet">("card")
  const [cardNumber, setCardNumber] = React.useState("")
  const [expiry, setExpiry] = React.useState("")
  const [cvc, setCvc] = React.useState("")
  const [cardZip, setCardZip] = React.useState("")
  
  // Step 7: Processing
  const [processingStatus, setProcessingStatus] = React.useState("Verifying payment...")
  
  // Handlers
  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => {
    if (step === 1) navigate("/buyer-view/TRUST-1024")
    else setStep(s => s - 1)
  }

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    // Auto focus next
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
    
    // Check if complete
    if (index === 5 && value && newOtp.slice(0, 5).every(v => v !== "")) {
      setTimeout(() => {
        setIsVerified(true)
        setTimeout(() => nextStep(), 2000)
      }, 500)
    }
  }

  const handleProcessEscrow = () => {
    nextStep() // Go to Step 7 (Processing)
    
    setTimeout(() => setProcessingStatus("Creating escrow account..."), 1000)
    setTimeout(() => setProcessingStatus("Notifying seller..."), 2000)
    setTimeout(() => setProcessingStatus("Activating protection..."), 3000)
    
    setTimeout(() => {
      nextStep() // Go to Step 8 (Success)
    }, 4000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      {/* Header (Hidden on Processing and Success screens) */}
      {step < 7 && (
        <div className="flex items-center justify-between p-4 bg-background sticky top-0 z-20">
          <button onClick={prevStep} className="p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-1.5 text-primary bg-primary/10 px-3 py-1 rounded-full">
             <Shield className="w-3.5 h-3.5 fill-primary text-primary" />
             <span className="text-[12px] font-bold">Secure Checkout</span>
          </div>
        </div>
      )}

      <div className={`flex-1 ${step < 7 ? 'px-6 pb-32' : ''}`}>
        <AnimatePresence mode="wait">
          
          {/* STEP 1: CREATE ACCOUNT */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6 pt-2">
              <div>
                <h1 className="text-2xl font-bold tracking-tight mb-2">
                  {isLoginView ? "Sign In" : "Create Account"}
                </h1>
                <div className="flex items-start gap-2 bg-blue-50/50 border border-blue-100 p-3 rounded-xl mt-4">
                   <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                   <p className="text-[13px] text-blue-900 leading-relaxed">
                     Required to fund this deal safely. We'll verify your email so the seller knows you're a legitimate buyer.
                   </p>
                </div>
              </div>

              {!isLoginView ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium">First Name</label>
                      <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="John" className="h-12 bg-gray-50/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium">Last Name</label>
                      <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Doe" className="h-12 bg-gray-50/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium">Email Address</label>
                    <Input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="john@email.com" className="h-12 bg-gray-50/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium">Password</label>
                    <Input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" className="h-12 bg-gray-50/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium">Confirm Password</label>
                    <Input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="••••••••" className="h-12 bg-gray-50/50" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium">Email Address</label>
                    <Input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="john@email.com" className="h-12 bg-gray-50/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium">Password</label>
                    <Input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" className="h-12 bg-gray-50/50" />
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 2: EMAIL VERIFICATION */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 pt-6">
              {!isVerified ? (
                <>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight mb-3">Verify Your Email</h1>
                    <p className="text-[14px] text-muted-foreground">
                      Enter the 6-digit verification code sent to:<br/>
                      <strong className="text-foreground">{email || "john@email.com"}</strong>
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-[24px] p-5 shadow-xl shadow-blue-900/5 border border-gray-100 mt-8">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[13px] font-bold text-foreground ml-1">6-Digit Code</label>
                        <div className="flex gap-2">
                          {[0, 1, 2, 3, 4, 5].map((i) => (
                            <Input
                              key={i}
                              id={`otp-${i}`}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={otp[i]}
                              onChange={(e) => handleOtpChange(i, e.target.value)}
                              className="h-14 text-center text-lg font-bold p-0 bg-gray-50/50 border-gray-200 focus-visible:ring-primary/20"
                              placeholder="0"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-4 flex gap-3.5">
                        <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div className="space-y-1 text-left">
                          <p className="text-[13px] font-bold text-blue-900">Why verify your email?</p>
                          <p className="text-[12px] text-blue-800/70 leading-relaxed font-medium">
                            We need to confirm your email so we can send important escrow and shipping updates securely.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  className="flex flex-col items-center justify-center py-10"
                >
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                    <ShieldCheck className="w-12 h-12 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-700">Email Verified</h2>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 3: SHIPPING ADDRESS */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 pt-2">
              <div>
                <h1 className="text-2xl font-bold tracking-tight mb-2">Where should we ship?</h1>
                <p className="text-[14px] text-muted-foreground">
                  Only the seller and shipping carrier can see this address.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-medium">Street Address</label>
                  <Input value={street} onChange={e => setStreet(e.target.value)} placeholder="123 Main St" className="h-12 bg-gray-50/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-medium">Address Line 2 (Apt, Suite, etc.)</label>
                  <Input value={apt} onChange={e => setApt(e.target.value)} placeholder="Apt 4B" className="h-12 bg-gray-50/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-medium">City</label>
                  <Input value={city} onChange={e => setCity(e.target.value)} placeholder="New York" className="h-12 bg-gray-50/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium">State</label>
                    <Input value={state} onChange={e => setState(e.target.value)} placeholder="NY" className="h-12 bg-gray-50/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium">ZIP Code</label>
                    <Input value={zip} onChange={e => setZip(e.target.value)} placeholder="10001" className="h-12 bg-gray-50/50" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: CONFIRM TERMS */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 pt-2">
              <div>
                <h1 className="text-2xl font-bold tracking-tight mb-2">Confirm what you're agreeing to</h1>
                <p className="text-[14px] text-muted-foreground">
                  Tap each item to confirm.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'item', title: 'Item', desc: 'Charizard Holo 1999\nPSA 10 Gem Mint', value: '$8,450' },
                  { id: 'shipping', title: 'Shipping', desc: '1 Business Day via USPS Priority', value: '$35' },
                  { id: 'fees', title: 'Fees & Total', desc: 'TrustLayer Fee: $245\nTotal You Pay: $8,730', value: '$8,730' }
                ].map((term) => (
                  <Card 
                    key={term.id} 
                    className={`p-4 border-2 transition-all cursor-pointer ${termsChecked[term.id as keyof typeof termsChecked] ? 'border-primary bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'}`}
                    onClick={() => setTermsChecked(prev => ({...prev, [term.id]: !prev[term.id as keyof typeof prev]}))}
                  >
                    <div className="flex gap-4">
                      <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${termsChecked[term.id as keyof typeof termsChecked] ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                        {termsChecked[term.id as keyof typeof termsChecked] && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                           <h3 className="font-bold text-[15px]">{term.title}</h3>
                           {term.id !== 'fees' && <span className="font-semibold text-[14px]">{term.value}</span>}
                        </div>
                        <p className="text-[13px] text-muted-foreground whitespace-pre-line leading-relaxed">{term.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 5: FUND ESCROW */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 pt-2">
              <h1 className="text-2xl font-bold tracking-tight">Fund Escrow</h1>
              
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full mb-4">
                     <ShieldCheck className="w-4 h-4" />
                     <span className="text-[12px] font-bold tracking-wide">Protected by TrustLayer</span>
                  </div>
                  <div className="text-[13px] text-blue-100 font-medium uppercase tracking-widest mb-1">Amount To Fund</div>
                  <div className="text-[42px] font-black tracking-tight leading-none">$8,730</div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3">
                 <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                 <div>
                   <p className="text-[13px] font-bold text-amber-900 mb-2">Funds are released only when:</p>
                   <ul className="text-[13px] text-amber-800 space-y-1.5 ml-4 list-disc">
                     <li>You approve delivery</li>
                     <li className="list-none -ml-4 font-bold text-[11px] text-amber-600/70 my-1">OR</li>
                     <li>The inspection period expires</li>
                   </ul>
                 </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  <button 
                    onClick={() => setPaymentMethod("card")}
                    className={`flex-1 py-2.5 text-[14px] font-bold rounded-lg transition-colors flex items-center justify-center gap-2 ${paymentMethod === "card" ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <CreditCard className="w-4 h-4" /> Card
                  </button>
                  <button 
                    onClick={() => setPaymentMethod("wallet")}
                    className={`flex-1 py-2.5 text-[14px] font-bold rounded-lg transition-colors flex items-center justify-center gap-2 ${paymentMethod === "wallet" ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <Wallet className="w-4 h-4" /> Wallet
                  </button>
                </div>

                {paymentMethod === "card" ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium">Card Number</label>
                      <div className="relative">
                        <Input placeholder="0000 0000 0000 0000" className="h-12 pl-10 bg-gray-50/50" />
                        <CreditCard className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[13px] font-medium">Expiry</label>
                        <Input placeholder="MM/YY" className="h-12 bg-gray-50/50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-medium">CVC</label>
                        <Input placeholder="123" className="h-12 bg-gray-50/50" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium">ZIP Code</label>
                      <Input placeholder="10001" className="h-12 bg-gray-50/50" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                    <Button className="w-full h-14 bg-black hover:bg-gray-900 text-white rounded-xl text-lg font-semibold flex items-center justify-center gap-2">
                      <Smartphone className="w-5 h-5" /> Apple Pay
                    </Button>
                    <Button variant="outline" className="w-full h-14 bg-white border-2 border-gray-200 text-gray-800 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-50">
                      Google Pay
                    </Button>
                    <div className="relative py-4 text-center">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                      <span className="relative bg-background px-3 text-[12px] text-muted-foreground font-medium uppercase">Or use</span>
                    </div>
                    <Button className="w-full h-14 bg-[#1A1A1A] hover:bg-black text-white rounded-xl text-lg font-bold flex items-center justify-center gap-2">
                      <Shield className="w-5 h-5 fill-white text-white" /> TrustLayer Wallet
                    </Button>
                  </div>
                )}

                <div className="flex items-center gap-2 justify-center text-[12px] text-muted-foreground pt-4 pb-2">
                   <Lock className="w-3.5 h-3.5" />
                   <span>Encrypted end-to-end. TrustLayer never stores your full card details.</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 6: REVIEW FUNDING */}
          {step === 6 && (
            <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 pt-2">
              <h1 className="text-2xl font-bold tracking-tight">Review Funding</h1>
              
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                 <div className="p-5 border-b border-gray-100">
                    <div className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Item</div>
                    <div className="font-bold text-[16px] text-foreground">Charizard Holo 1999</div>
                    <div className="text-[13px] text-muted-foreground">PSA 10 Gem Mint</div>
                 </div>
                 
                 <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                      <div className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Seller</div>
                      <div className="font-bold text-[14px]">@vintage_vault</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Trust Score</div>
                      <div className="font-bold text-[14px] text-green-600">96</div>
                    </div>
                 </div>

                 <div className="p-5 border-b border-gray-100 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Protection</div>
                      <div className="font-bold text-[14px] text-primary flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Enabled</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Shipping</div>
                      <div className="font-bold text-[14px]">USPS Priority</div>
                    </div>
                 </div>

                 <div className="p-6 bg-blue-50/50">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[15px] text-foreground">Total Due</span>
                      <span className="text-[28px] font-black text-primary tracking-tight">$8,730</span>
                    </div>
                 </div>
              </div>

              <div className="flex items-center justify-center text-center px-4 pt-2">
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  TrustLayer will securely hold your funds until you approve delivery.
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 7: PROCESSING ESCROW */}
          {step === 7 && (
            <motion.div key="step7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary text-white">
               <motion.div
                 animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                 className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(255,255,255,0.2)]"
               >
                 <div className="absolute inset-0 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                 <Shield className="w-12 h-12 fill-white text-white drop-shadow-md" />
               </motion.div>
               
               <h2 className="text-2xl font-bold mb-4 tracking-tight drop-shadow-sm">Securing Your Funds...</h2>
               
               <AnimatePresence mode="wait">
                 <motion.p
                   key={processingStatus}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="text-blue-100 font-medium text-[15px]"
                 >
                   {processingStatus}
                 </motion.p>
               </AnimatePresence>
            </motion.div>
          )}

          {/* STEP 8: SUCCESS */}
          {step === 8 && (
            <motion.div key="step8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-background flex flex-col pt-16 px-6 pb-8 overflow-y-auto w-full max-w-[430px] mx-auto">
               <div className="flex-1 flex flex-col items-center">
                 <motion.div
                   initial={{ scale: 0, rotate: -45 }}
                   animate={{ scale: 1, rotate: 0 }}
                   transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                   className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)] relative"
                 >
                   <div className="absolute inset-0 rounded-full border-4 border-green-500 opacity-20 animate-pulse" />
                   <ShieldCheck className="w-12 h-12 text-green-600" />
                 </motion.div>
                 
                 <motion.h1 
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                   className="text-[28px] font-extrabold tracking-tight text-foreground mb-2"
                 >
                   Escrow Funded
                 </motion.h1>
                 
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                   className="text-[32px] font-black text-primary tracking-tight mb-6"
                 >
                   $8,730 <span className="text-[18px] text-blue-400 font-bold tracking-normal uppercase">Protected</span>
                 </motion.div>

                 <motion.p 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                   className="text-center text-[14px] text-muted-foreground leading-relaxed mb-8 max-w-[300px]"
                 >
                   Your funds are now securely held by TrustLayer.<br/><br/>
                   The seller has been notified and can begin preparing shipment. Funds will only be released after you approve delivery.
                 </motion.p>

                 <motion.div 
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                   className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5"
                 >
                   <div className="flex justify-between items-center mb-3">
                     <span className="text-[12px] text-muted-foreground font-bold uppercase tracking-wider">Deal ID</span>
                     <span className="font-bold text-[14px]">TRUST-1024</span>
                   </div>
                   <div className="flex justify-between items-center mb-3">
                     <span className="text-[12px] text-muted-foreground font-bold uppercase tracking-wider">Seller</span>
                     <span className="font-bold text-[14px]">@vintage_vault</span>
                   </div>
                   <div className="flex justify-between items-center mb-3">
                     <span className="text-[12px] text-muted-foreground font-bold uppercase tracking-wider">Amount Protected</span>
                     <span className="font-bold text-[14px]">$8,730</span>
                   </div>
                   <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                     <span className="text-[12px] text-muted-foreground font-bold uppercase tracking-wider">Status</span>
                     <div className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[12px] font-bold">
                       Awaiting Shipment
                     </div>
                   </div>
                 </motion.div>
               </div>
               
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="w-full mt-8">
                 <Button 
                   className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white shadow-lg flex items-center justify-center gap-2"
                   onClick={() => navigate("/timeline/TRUST-1024")}
                 >
                   Track Deal Progress <ArrowRight className="w-5 h-5" />
                 </Button>
               </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* FOOTER CTA (Hidden on Step 2 Verification, Step 7 Processing, Step 8 Success) */}
      {step !== 2 && step < 7 && (
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] p-4 pb-6 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-40">
          <div className="flex flex-col gap-3">
            {step === 1 && (
              <>
                <Button 
                  className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white" 
                  onClick={nextStep}
                >
                  Continue
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full h-[48px] text-[14px] font-bold rounded-2xl text-muted-foreground"
                  onClick={() => setIsLoginView(!isLoginView)}
                >
                  {isLoginView ? "Need an account? Sign Up" : "Already have an account? Sign In"}
                </Button>
              </>
            )}
            
            {step === 2 && (
              <>
                <Button className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white" disabled={!isVerified} onClick={nextStep}>
                  Verify Email
                </Button>
                <Button variant="ghost" className="w-full h-[48px] text-[14px] font-bold rounded-2xl text-muted-foreground">
                  Resend Code
                </Button>
              </>
            )}

            {step === 3 && (
              <Button className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white" onClick={nextStep}>
                Continue
              </Button>
            )}

            {step === 4 && (
              <Button 
                className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white" 
                onClick={nextStep}
                disabled={!Object.values(termsChecked).every(v => v)}
              >
                Continue
              </Button>
            )}

            {step === 5 && (
              <Button className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white" onClick={nextStep}>
                Continue
              </Button>
            )}

            {step === 6 && (
              <Button 
                className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
                onClick={handleProcessEscrow}
              >
                <ShieldCheck className="w-5 h-5" /> Fund Escrow Now
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* Verify Email Footer (Step 2 uses separate footer style) */}
      {step === 2 && !isVerified && (
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] p-4 pb-6 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-40">
          <div className="flex flex-col gap-3">
             <Button className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white opacity-50 cursor-not-allowed">
               Verify Email
             </Button>
             <Button variant="ghost" className="w-full h-[48px] text-[14px] font-bold rounded-2xl text-muted-foreground hover:bg-gray-100">
               Resend Code
             </Button>
          </div>
        </div>
      )}

    </div>
  )
}
