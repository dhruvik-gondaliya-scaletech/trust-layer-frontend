import * as React from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronLeft, ShieldCheck, Check, CheckCircle2, 
  CreditCard, Wallet, Lock, Shield, ArrowRight, Smartphone, Mail, X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function FundEscrowFlow() {
  const navigate = useNavigate()
  const [step, setStep] = React.useState<number>(1)
  
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
  const [isVerifyingEmail, setIsVerifyingEmail] = React.useState(false)

  // Step 2.5: Phone Verification
  const [phoneStep, setPhoneStep] = React.useState<"phone" | "otp">("phone")
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [phoneOtp, setPhoneOtp] = React.useState(["", "", "", "", "", ""])
  const [isPhoneVerified, setIsPhoneVerified] = React.useState(false)
  const [isVerifyingPhone, setIsVerifyingPhone] = React.useState(false)
  
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
  const [feeAck, setFeeAck] = React.useState(false)

  const feeOption = Number(localStorage.getItem('feeOption')) || 1;
  const itemPriceNum = 8450;
  const shippingCostNum = 35;
  const platformFee = 245;
  const buyerFeeShare = feeOption === 1 ? platformFee : feeOption === 0 ? platformFee / 2 : 0;
  const totalDueNum = itemPriceNum + shippingCostNum + buyerFeeShare;

  const walletBalance = 12450;
  const remainingBalance = walletBalance - totalDueNum;
  const isSufficient = remainingBalance >= 0;

  // Step 5: Fund
  const [paymentMethod, setPaymentMethod] = React.useState<"card" | "wallet">("card")
  const [cardNumber, setCardNumber] = React.useState("")
  const [expiry, setExpiry] = React.useState("")
  const [cvc, setCvc] = React.useState("")
  const [cardZip, setCardZip] = React.useState("")
  
  // Step 7: Processing
  const [processingStatus, setProcessingStatus] = React.useState("Verifying payment...")
  
  // Safe Exit Modal
  const [showExitModal, setShowExitModal] = React.useState(false)
  
  // Handlers
  const nextStep = () => setStep(s => {
    if (s === 2) return 2.5
    if (s === 2.5) return 3
    return s + 1
  })
  const prevStep = () => {
    if (step === 1) navigate("/buyer-view/TRUST-1024")
    else setStep(s => {
      if (s === 3) return 2.5
      if (s === 2.5) return 2
      return s - 1
    })
  }

  const handleOtpChange = (index: number, value: string) => {
    // Handle pasting a full code
    if (value.length > 1) {
      // Only process if the pasted value contains numbers
      const numbersOnly = value.replace(/\D/g, "");
      if (!numbersOnly) return;
      
      const pastedCode = numbersOnly.slice(0, 6).split("");
      const newOtp = [...otp];
      for (let i = 0; i < pastedCode.length; i++) {
        newOtp[i] = pastedCode[i];
      }
      setOtp(newOtp);
      return;
    }

    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    // Auto focus next
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleVerifyEmailSubmit = () => {
    if (otp.every(v => v !== "" && /^\d$/.test(v))) {
      setIsVerifyingEmail(true);
      setTimeout(() => {
        setIsVerifyingEmail(false);
        setIsVerified(true);
      }, 1500);
    }
  }

  const handlePhoneOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const numbersOnly = value.replace(/\D/g, "");
      if (!numbersOnly) return;
      const pastedCode = numbersOnly.slice(0, 6).split("");
      const newOtp = [...phoneOtp];
      for (let i = 0; i < pastedCode.length; i++) newOtp[i] = pastedCode[i];
      setPhoneOtp(newOtp);
      return;
    }
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...phoneOtp]
    newOtp[index] = value
    setPhoneOtp(newOtp)
    if (value && index < 5) {
      const nextInput = document.getElementById(`phone-otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleVerifyPhoneSubmit = () => {
    if (phoneOtp.every(v => v !== "" && /^\d$/.test(v))) {
      setIsVerifyingPhone(true);
      setTimeout(() => {
        setIsVerifyingPhone(false);
        setIsPhoneVerified(true);
      }, 1500);
    }
  }

  const handleProcessEscrow = () => {
    setStep(7) // Go to Step 7 (Processing)
    
    setTimeout(() => {
      setStep(8) // Go to Step 8 (Success)
    }, 2500)
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
          {step === 4 ? (
            <button onClick={() => setShowExitModal(true)} className="p-2 -mr-2 rounded-full text-foreground hover:bg-gray-100 transition-colors">
              <X className="h-6 w-6" />
            </button>
          ) : (
            <div className="w-10"></div>
          )}
        </div>
      )}

      <div className={`flex-1 ${step < 7 ? 'px-6 pb-[240px]' : ''}`}>
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
                     Create your TrustLayer account to fund this protected transaction. We verify your email so the seller knows you are a legitimate buyer.
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
                              autoComplete="one-time-code"
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
                            We need to confirm your email so we can send important transaction and shipping updates securely.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center w-full"
                >
                  {/* Success Icon */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative flex items-center justify-center mb-6 w-24 h-24"
                  >
                    {/* Pulse effect */}
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="absolute inset-0 bg-green-200 rounded-full"
                    />
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center relative z-10 border-4 border-white shadow-sm">
                      <Mail className="w-10 h-10 text-green-600" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-green-600 rounded-full p-1 border-4 border-white shadow-sm z-20">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  </motion.div>

                  <h2 className="text-[28px] font-extrabold text-foreground tracking-tight mb-2">
                    Email Verified
                  </h2>
                  <a href={`mailto:${email || "john@email.com"}`} className="text-[16px] text-primary font-bold block mb-4 hover:underline">
                    {email || "john@email.com"}
                  </a>
                  <p className="text-[15px] text-muted-foreground leading-relaxed text-center px-2 mb-6">
                    Your email has been successfully verified and secured for TrustLayer transactions.
                  </p>

                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-8 flex items-start gap-3 text-left w-full">
                    <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-[13px] text-blue-900 font-medium leading-relaxed">
                      Your account is now protected and ready for secure transactions.
                    </p>
                  </div>



                  {/* Information Card */}
                  <div className="bg-[#EEF4FF] border border-blue-100 rounded-2xl p-5 text-left w-full mb-8">
                    <h3 className="text-[14px] font-bold text-blue-950 mb-4 flex items-center gap-2">
                       Why verify your email?
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2.5 text-[13px] text-blue-900/80">
                        <Check className="w-4 h-4 text-blue-600 shrink-0" strokeWidth={3} />
                        <span className="leading-snug">Receive transaction updates</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-[13px] text-blue-900/80">
                        <Check className="w-4 h-4 text-blue-600 shrink-0" strokeWidth={3} />
                        <span className="leading-snug">Get shipping notifications</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-[13px] text-blue-900/80">
                        <Check className="w-4 h-4 text-blue-600 shrink-0" strokeWidth={3} />
                        <span className="leading-snug">Protect your account from unauthorized access</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 2.5: PHONE VERIFICATION */}
          {step === 2.5 && (
            <motion.div key="step2-5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 pt-6">
              {!isPhoneVerified ? (
                phoneStep === "phone" ? (
                  <>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Smartphone className="w-8 h-8 text-primary" />
                      </div>
                      <h1 className="text-2xl font-bold tracking-tight mb-3">Verify Your Phone</h1>
                      <p className="text-[14px] text-muted-foreground">
                        Add your number to secure your account
                      </p>
                    </div>

                    <div className="bg-white rounded-[24px] p-5 shadow-xl shadow-blue-900/5 border border-gray-100 mt-8">
                      <form id="phone-form" onSubmit={(e) => { e.preventDefault(); setPhoneStep("otp"); }} className="space-y-6">
                        <div className="space-y-3">
                          <label className="text-[13px] font-bold text-foreground ml-1">Phone Number</label>
                          <div className="flex gap-2">
                            <div className="flex items-center justify-center w-16 h-14 rounded-xl border border-gray-200 bg-gray-50/50 text-[16px] font-bold text-foreground">
                              +1
                            </div>
                            <Input required type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="h-14 flex-1 text-[16px] font-bold bg-gray-50/50 border-gray-200 focus-visible:ring-primary/20" placeholder="(555) 000-0000" />
                          </div>
                        </div>
                      </form>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Smartphone className="w-8 h-8 text-primary" />
                      </div>
                      <h1 className="text-2xl font-bold tracking-tight mb-3">Enter Phone Code</h1>
                      <p className="text-[14px] text-muted-foreground">
                        Enter the 6-digit verification code sent via SMS to:<br/>
                        <strong className="text-foreground">+1 {phoneNumber || "(555) 000-0000"}</strong>
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
                              id={`phone-otp-${i}`}
                              type="text"
                              inputMode="numeric"
                              autoComplete="one-time-code"
                              maxLength={1}
                              value={phoneOtp[i]}
                              onChange={(e) => handlePhoneOtpChange(i, e.target.value)}
                              className="h-14 text-center text-lg font-bold p-0 bg-gray-50/50 border-gray-200 focus-visible:ring-primary/20"
                              placeholder="0"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-4 flex gap-3.5">
                        <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div className="space-y-1 text-left">
                          <p className="text-[13px] font-bold text-blue-900">Why verify your phone?</p>
                          <p className="text-[12px] text-blue-800/70 leading-relaxed font-medium">
                            We use your phone number for secure transaction alerts and faster recovery if you lose access to your account.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
                )
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center w-full"
                >
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative flex items-center justify-center mb-6 w-24 h-24"
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="absolute inset-0 bg-green-200 rounded-full"
                    />
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center relative z-10 border-4 border-white shadow-sm">
                      <Smartphone className="w-10 h-10 text-green-600" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-green-600 rounded-full p-1 border-4 border-white shadow-sm z-20">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  </motion.div>

                  <h2 className="text-[28px] font-extrabold text-foreground tracking-tight mb-2">
                    Phone Verified
                  </h2>
                  <p className="text-[16px] text-primary font-bold block mb-4">
                    +1 (555) 123-4567
                  </p>
                  <p className="text-[15px] text-muted-foreground leading-relaxed text-center px-2 mb-6">
                    Your phone number has been successfully verified for transaction updates.
                  </p>
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
                  Only the seller and shipping carrier can view this address.
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
                  { id: 'shipping', title: 'Shipping', desc: 'Shipping Cost', value: '$35' },
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

                {/* Fees & Total Dynamic Card */}
                <Card 
                  className={`p-4 border-2 transition-all cursor-pointer ${termsChecked.fees ? 'border-primary bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'}`}
                  onClick={() => setTermsChecked(prev => ({...prev, fees: !prev.fees}))}
                >
                  <div className="flex gap-4">
                    <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${termsChecked.fees ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                      {termsChecked.fees && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div className="flex-1 space-y-4">
                      <h3 className="font-bold text-[15px]">Fees & Total</h3>
                      
                      <div className="space-y-2 text-[13px] bg-white border border-gray-100 p-3 rounded-xl">
                        <div className="flex justify-between items-center px-2 pt-2 text-muted-foreground">
                          <span>Item Price</span>
                          <span className="font-medium text-foreground">${itemPriceNum.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center px-2 text-muted-foreground">
                          <span>Shipping</span>
                          <span className="font-medium text-foreground">${shippingCostNum}</span>
                        </div>
                        <div className="flex justify-between items-center px-2 text-muted-foreground">
                          <span>{feeOption === 0 ? "Your Platform Fee Share" : "Platform Fee"}</span>
                          <span className="font-medium text-foreground">{feeOption === 2 ? "Paid By Seller" : `$${buyerFeeShare.toLocaleString(undefined, {minimumFractionDigits: feeOption === 0 ? 2 : 0})}`}</span>
                        </div>
                        <div className="h-px bg-gray-100 my-2" />
                        <div className="flex justify-between items-center px-2 font-bold text-[15px]">
                          <span>Total You Pay</span>
                          <span className="text-primary">${totalDueNum.toLocaleString(undefined, {minimumFractionDigits: feeOption === 0 ? 2 : 0})}</span>
                        </div>
                      </div>

                      <p className="text-[12px] text-muted-foreground italic leading-relaxed whitespace-pre-line">
                        {feeOption === 0 && "The Platform Fee is shared equally between buyer and seller."}
                        {feeOption === 1 && "You are responsible for the Platform Fee."}
                        {feeOption === 2 && "The seller is paying the Platform Fee. You only pay for the item and shipping."}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-100 rounded-2xl cursor-pointer mt-4" onClick={() => setFeeAck(!feeAck)}>
                <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors ${feeAck ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}`}>
                  {feeAck && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <div>
                  <p className="text-[13px] font-medium leading-tight mb-1">
                    I understand that the Platform Fee is non-refundable.
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    The Platform Fee helps cover transaction processing and dispute support services.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: FUND ESCROW */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 pt-2">
              <h1 className="text-2xl font-bold tracking-tight">Fund Deal</h1>
              
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full mb-4">
                     <ShieldCheck className="w-4 h-4" />
                     <span className="text-[12px] font-bold tracking-wide">Secure Transaction</span>
                  </div>
                  <div className="text-[13px] text-blue-100 font-medium uppercase tracking-widest mb-1">Total Due Today</div>
                  <div className="text-[42px] font-black tracking-tight leading-none">${totalDueNum.toLocaleString()}</div>
                </div>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center gap-3">
                 <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                 <p className="text-[13px] font-medium text-blue-900">Payment is released only when you confirm delivery or when the delivery confirmation window expires.</p>
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
                  <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-muted-foreground">Wallet Balance</span>
                      <span className="font-bold text-foreground">${walletBalance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-muted-foreground">Amount Required</span>
                      <span className="font-bold text-foreground">${totalDueNum.toLocaleString(undefined, {minimumFractionDigits: feeOption === 0 ? 2 : 0})}</span>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-muted-foreground">Remaining Balance After Payment</span>
                      <span className="font-bold text-foreground">${remainingBalance.toLocaleString(undefined, {minimumFractionDigits: feeOption === 0 ? 2 : 0})}</span>
                    </div>
                    
                    {isSufficient ? (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg text-[13px] font-medium">
                        <Check className="w-4 h-4" /> Available for payment
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-[13px] font-medium">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> 
                        <div>Insufficient wallet balance.<br/>Please add funds or pay by card.</div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2 justify-center text-[12px] text-muted-foreground pt-4 pb-2">
                   <Lock className="w-3.5 h-3.5" />
                   <span>Payments are processed securely through our payment provider.</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 6 REMOVED */}

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
               
               <p className="text-blue-100 font-medium text-[15px] text-center px-6">
                 TrustLayer is securely processing your payment.
               </p>
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
                   Deal Funded
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
                   The seller has been notified and can begin preparing shipment. You will receive shipping updates once tracking information is uploaded.
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
                   onClick={() => navigate("/dashboard/buyer")}
                 >
                   Go to Dashboard <ArrowRight className="w-5 h-5" />
                 </Button>
               </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* FOOTER CTA (Hidden on Step 2 Verification, Step 7 Processing, Step 8 Success) */}
      {step !== 2 && step !== 2.5 && step < 7 && (
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
                disabled={!Object.values(termsChecked).every(v => v) || !feeAck}
              >
                Continue
              </Button>
            )}

            {step === 5 && (
              <Button 
                className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={handleProcessEscrow}
                disabled={paymentMethod === 'wallet' && !isSufficient}
              >
                {paymentMethod === 'wallet' ? "Pay With Wallet" : "Continue"}
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* Verify Email Footer (Step 2 uses separate footer style) */}
      {step === 2 && !isVerified && (
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] p-4 pb-6 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-40">
          <div className="flex flex-col gap-3">
             <Button 
               className={`w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white ${!otp.every(v => v !== "" && /^\d$/.test(v)) ? 'opacity-50 cursor-not-allowed' : ''}`}
               disabled={!otp.every(v => v !== "" && /^\d$/.test(v)) || isVerifyingEmail}
               onClick={handleVerifyEmailSubmit}
             >
               {isVerifyingEmail ? 'Verifying...' : 'Verify Email'}
             </Button>
             <Button variant="ghost" className="w-full h-[48px] text-[14px] font-bold rounded-2xl text-muted-foreground hover:bg-gray-100">
               Resend Code
             </Button>
          </div>
        </div>
      )}

      {/* Verified Email Footer */}
      {step === 2 && isVerified && (
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] p-4 pb-6 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-40">
          <div className="flex flex-col gap-3">
             <Button onClick={nextStep} className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
               Continue to Phone Verification
             </Button>
          </div>
        </div>
      )}

      {/* Verify Phone Footer */}
      {step === 2.5 && !isPhoneVerified && (
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] p-4 pb-6 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-40">
          <div className="flex flex-col gap-3">
             {phoneStep === "phone" ? (
               <Button 
                 form="phone-form" type="submit"
                 className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white"
                 disabled={!phoneNumber}
               >
                 Send Code
               </Button>
             ) : (
               <>
                 <Button 
                   className={`w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white ${!phoneOtp.every(v => v !== "" && /^\d$/.test(v)) ? 'opacity-50 cursor-not-allowed' : ''}`}
                   disabled={!phoneOtp.every(v => v !== "" && /^\d$/.test(v)) || isVerifyingPhone}
                   onClick={handleVerifyPhoneSubmit}
                 >
                   {isVerifyingPhone ? 'Verifying...' : 'Verify Phone'}
                 </Button>
                 <Button variant="ghost" onClick={() => setPhoneStep("phone")} className="w-full h-[48px] text-[14px] font-bold rounded-2xl text-muted-foreground hover:bg-gray-100">
                   Back to Phone Number
                 </Button>
               </>
             )}
          </div>
        </div>
      )}

      {/* Verified Phone Footer */}
      {step === 2.5 && isPhoneVerified && (
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] p-4 pb-6 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-40">
          <div className="flex flex-col gap-3">
             <Button onClick={nextStep} className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
               Continue to Shipping Address
             </Button>
          </div>
        </div>
      )}

      {/* Leave Checkout Modal */}
      <AnimatePresence>
        {showExitModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-5 pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowExitModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-[340px] rounded-3xl p-6 relative z-10 shadow-2xl"
            >
              <h3 className="text-[20px] font-extrabold text-center text-gray-900 mb-2">Leave Checkout?</h3>
              <p className="text-[14px] text-gray-500 text-center font-medium mb-6">
                You haven't completed your purchase yet.<br/><br/>
                Your deal will remain pending and no funds will be charged.
              </p>
              
              <div className="flex flex-col gap-2.5">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl text-[15px] shadow-sm"
                  onClick={() => setShowExitModal(false)}
                >
                  Continue Checkout
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full text-rose-600 font-bold h-12 rounded-xl text-[15px] hover:bg-rose-50"
                  onClick={() => {
                    setShowExitModal(false)
                    navigate("/buyer-view/TRUST-1024")
                  }}
                >
                  Leave
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
