import * as React from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronLeft, ShieldCheck, Check, CheckCircle2, 
  CreditCard, Wallet, Lock, Shield, ArrowRight, Smartphone, Mail, X, AlertCircle, Home, Building2, Plus, MapPin, MoreVertical, Trash2, Edit2, Info
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
  
  // Step 3: Address Selection
  type Address = {
    id: string;
    type: string;
    name: string;
    street: string;
    apt?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    isDefault?: boolean;
  }

  const [addresses, setAddresses] = React.useState<Address[]>([
    {
      id: "1",
      type: "Home",
      name: "Alex Johnson",
      street: "123 Main Street",
      city: "Austin",
      state: "TX",
      zip: "78701",
      country: "United States",
      phone: "+1 (555) 123-4567",
      isDefault: true
    },
    {
      id: "2",
      type: "Office",
      name: "Alex Johnson",
      street: "500 Congress Ave",
      city: "Austin",
      state: "TX",
      zip: "78704",
      country: "United States",
      phone: "+1 (555) 987-6543"
    }
  ])
  const [selectedAddressId, setSelectedAddressId] = React.useState<string | null>("1")
  
  const [isAddressSheetOpen, setIsAddressSheetOpen] = React.useState(false)
  const [editingAddressId, setEditingAddressId] = React.useState<string | null>(null)
  const [customLabel, setCustomLabel] = React.useState("")
  const [addressForm, setAddressForm] = React.useState<Partial<Address>>({
    name: "Alex Johnson", country: "United States", phone: "+1 (555) 123-4567", type: "Home", isDefault: false
  })
  const [addressToDelete, setAddressToDelete] = React.useState<string | null>(null)

  const sortedAddresses = React.useMemo(() => {
    return [...addresses].sort((a, b) => {
      if (a.isDefault && !b.isDefault) return -1;
      if (!a.isDefault && b.isDefault) return 1;
      return 0;
    });
  }, [addresses])

  const selectedAddress = addresses.find(a => a.id === selectedAddressId)

  React.useEffect(() => {
    if (step === 3 && addresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(sortedAddresses[0].id)
    }
  }, [step, addresses.length, sortedAddresses])

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
    if (s === 1 && isLoginView) return 3
    if (s === 2) return 2.5
    if (s === 2.5) return 3
    return s + 1
  })
  const prevStep = () => {
    if (step === 1) navigate("/buyer-view/TRUST-1024")
    else setStep(s => {
      if (s === 3 && isLoginView) return 1
      if (s === 3) return 2.5
      if (s === 2.5) return 2
      return s - 1
    })
  }

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault()
    const isNewDefault = addressForm.isDefault || addresses.length === 0;
    
    const addrToSave: Address = {
      ...(addressForm as Address),
      type: addressForm.type === "Other" ? customLabel : (addressForm.type || "Home"),
      isDefault: isNewDefault,
      id: editingAddressId || Date.now().toString()
    }
    
    let newAddresses = [...addresses]
    
    if (isNewDefault) {
      newAddresses = newAddresses.map(a => ({ ...a, isDefault: false }))
    }
    
    if (editingAddressId) {
      newAddresses = newAddresses.map(a => a.id === editingAddressId ? addrToSave : a)
    } else {
      newAddresses.push(addrToSave)
    }
    
    setAddresses(newAddresses)
    setSelectedAddressId(addrToSave.id)
    setIsAddressSheetOpen(false)
    setEditingAddressId(null)
  }

  const handleEditAddress = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const addr = addresses.find(a => a.id === id)
    if (!addr) return
    
    let type = addr.type
    let cLabel = ""
    if (type !== "Home" && type !== "Office") {
      type = "Other"
      cLabel = addr.type
    }
    
    setAddressForm(addr)
    setCustomLabel(cLabel)
    setEditingAddressId(id)
    setIsAddressSheetOpen(true)
  }

  const handleSetDefault = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })))
    setSelectedAddressId(id)
  }

  const handleDeleteAddress = (id: string) => {
    if (addresses.length <= 1) return;
    
    const newAddresses = addresses.filter(a => a.id !== id);
    if (addresses.find(a => a.id === id)?.isDefault && newAddresses.length > 0) {
      newAddresses[0].isDefault = true;
    }
    setAddresses(newAddresses);
    setAddressToDelete(null);
    if (selectedAddressId === id) {
      setSelectedAddressId(newAddresses[0].id);
    }
  }

  const handleZipChange = (zip: string) => {
    setAddressForm({ ...addressForm, zip });
    
    // Mock auto-fill logic
    const mockZipDb: Record<string, { city: string, state: string }> = {
      "78701": { city: "Austin", state: "TX" },
      "78704": { city: "Austin", state: "TX" },
      "10001": { city: "New York", state: "NY" },
      "90210": { city: "Beverly Hills", state: "CA" },
      "60601": { city: "Chicago", state: "IL" },
      "33101": { city: "Miami", state: "FL" }
    };
    
    if (zip.length === 5 && mockZipDb[zip]) {
      setAddressForm(prev => ({
        ...prev,
        zip,
        city: mockZipDb[zip].city,
        state: mockZipDb[zip].state
      }));
    }
  }

  const openAddAddress = () => {
    setAddressForm({
      name: "Alex Johnson", country: "United States", phone: "+1 (555) 123-4567", type: "Home", isDefault: addresses.length === 0
    })
    setCustomLabel("")
    setEditingAddressId(null)
    setIsAddressSheetOpen(true)
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
                            <Input 
                              required 
                              type="tel" 
                              inputMode="numeric"
                              maxLength={14}
                              value={phoneNumber} 
                              onChange={(e) => {
                                const digits = e.target.value.replace(/\D/g, "");
                                let formatted = digits;
                                if (digits.length > 3 && digits.length <= 6) {
                                  formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
                                } else if (digits.length > 6) {
                                  formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
                                }
                                setPhoneNumber(formatted);
                              }} 
                              className="h-14 flex-1 text-[16px] font-bold bg-gray-50/50 border-gray-200 focus-visible:ring-primary/20" 
                              placeholder="(555) 000-0000" 
                            />
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
                  <h1 className="text-2xl font-bold tracking-tight mb-2">Select Shipping Address</h1>
                  <p className="text-[14px] text-muted-foreground">
                     Choose where you would like this item delivered.
                  </p>
               </div>
               <div className="space-y-4">
                  {sortedAddresses.map(addr => (
                     <Card 
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-5 cursor-pointer border-2 transition-all relative overflow-hidden ${selectedAddressId === addr.id ? 'border-primary bg-blue-50/50 shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}
                     >
                        <div className="flex gap-4">
                           <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${selectedAddressId === addr.id ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                              {selectedAddressId === addr.id && <Check className="w-3.5 h-3.5 text-white" />}
                           </div>
                           <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                 <div className="flex items-center gap-2">
                                    {addr.type === "Home" ? <Home className="w-4 h-4 text-muted-foreground" /> : addr.type === "Office" ? <Building2 className="w-4 h-4 text-muted-foreground" /> : <MapPin className="w-4 h-4 text-muted-foreground" />}
                                    <span className="font-bold text-[15px]">{addr.type}</span>
                                 </div>
                                 {addr.isDefault && (
                                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">DEFAULT ADDRESS</span>
                                 )}
                              </div>
                              <p className="text-[14px] font-semibold mb-1">{addr.name}</p>
                              <p className="text-[13px] text-muted-foreground leading-relaxed">
                                 {addr.street} {addr.apt && `, ${addr.apt}`} <br/>
                                 {addr.city}, {addr.state} {addr.zip}<br/>
                                 {addr.country}
                              </p>
                              <p className="text-[13px] text-muted-foreground mt-2">{addr.phone}</p>
                           </div>
                        </div>

                        {/* Inline Actions */}
                        <div className={`mt-4 pt-4 border-t flex items-center ${selectedAddressId === addr.id ? 'border-blue-100/50' : 'border-gray-100'}`}>
                          <div className="flex gap-4 w-full">
                            <button onClick={(e) => handleEditAddress(addr.id, e)} className="text-[13px] font-bold text-gray-500 hover:text-primary transition-colors flex items-center gap-1.5 p-1 -ml-1">
                              <Edit2 className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setAddressToDelete(addr.id); }} className="text-[13px] font-bold text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1.5 p-1">
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                            <div className="flex-1" />
                            {!addr.isDefault && (
                              <button onClick={(e) => handleSetDefault(addr.id, e)} className="text-[13px] font-bold text-primary hover:underline transition-colors flex items-center gap-1.5 p-1 -mr-1">
                                Set as Default
                              </button>
                            )}
                          </div>
                        </div>

                     </Card>
                  ))}
                  <Button variant="outline" className="w-full h-[56px] rounded-2xl border-2 border-dashed border-gray-200 text-gray-500 font-bold hover:bg-gray-50 hover:text-gray-900 transition-colors" onClick={openAddAddress}>
                     <Plus className="w-5 h-5 mr-2" /> Add New Address
                  </Button>
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
                {/* Shipping Address Summary */}
                {selectedAddress && (
                  <Card className="p-4 border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-[14px] text-gray-500 uppercase tracking-wider">Shipping Address</h3>
                      <button onClick={() => setStep(3)} className="text-[13px] text-primary font-bold hover:underline">
                        [ Change ]
                      </button>
                    </div>
                    <div className="flex flex-col gap-1 text-[14px]">
                      <span className="font-bold">{selectedAddress.name}</span>
                      <span className="text-muted-foreground">
                        {selectedAddress.street} {selectedAddress.apt && `, ${selectedAddress.apt}`}
                      </span>
                      <span className="text-muted-foreground">
                        {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zip}
                      </span>
                      <span className="text-muted-foreground">{selectedAddress.country}</span>
                      <span className="text-muted-foreground mt-1">{selectedAddress.phone}</span>
                    </div>
                  </Card>
                )}

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
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-[15px]">Fees & Total</h3>
                      </div>
                      
                      {/* Platform Fee Arrangement Section */}
                      <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[13px] font-bold text-foreground">Platform Fee</span>
                          {feeOption === 1 && (
                            <span className="bg-green-100 text-green-700 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                              Buyer Pays 100%
                            </span>
                          )}
                          {feeOption === 2 && (
                            <span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                              Seller Pays 100%
                            </span>
                          )}
                          {feeOption === 0 && (
                            <span className="bg-orange-100 text-orange-700 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                              Split 50 / 50
                            </span>
                          )}
                        </div>
                        
                        {feeOption === 0 && (
                          <div className="flex gap-4 text-[12px] pt-1">
                            <div className="flex-1 bg-white border border-gray-100 p-2 rounded-lg flex justify-between items-center">
                              <span className="text-muted-foreground">Your Share</span>
                              <span className="font-bold text-foreground">${buyerFeeShare.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                            </div>
                            <div className="flex-1 bg-white border border-gray-100 p-2 rounded-lg flex justify-between items-center">
                              <span className="text-muted-foreground">Seller Share</span>
                              <span className="font-medium text-foreground">${(platformFee - buyerFeeShare).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                            </div>
                          </div>
                        )}
                        
                        <p className="text-[12px] text-muted-foreground leading-relaxed">
                          {feeOption === 1 && "You are responsible for paying the Platform Fee for this transaction."}
                          {feeOption === 2 && "The seller is covering the Platform Fee. You only pay the item price and shipping."}
                          {feeOption === 0 && "The Platform Fee is shared equally between you and the seller."}
                        </p>
                      </div>
                      
                      <div className="space-y-2 text-[13px] bg-white border border-gray-100 p-3 rounded-xl">
                        <div className="flex justify-between items-center px-2 pt-2 text-muted-foreground">
                          <span>Item Price</span>
                          <span className="font-medium text-foreground">${itemPriceNum.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center px-2 text-muted-foreground">
                          <span>Shipping</span>
                          <span className="font-medium text-foreground">${shippingCostNum}</span>
                        </div>
                        
                        {feeOption === 1 && (
                          <div className="flex justify-between items-center px-2 text-muted-foreground">
                            <span>Platform Fee</span>
                            <span className="font-medium text-foreground">${platformFee.toLocaleString()}</span>
                          </div>
                        )}
                        {feeOption === 0 && (
                          <div className="flex justify-between items-center px-2 text-muted-foreground">
                            <span>Platform Fee (Your Share)</span>
                            <span className="font-medium text-foreground">${buyerFeeShare.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                          </div>
                        )}
                        {feeOption === 2 && (
                          <div className="flex justify-between items-center px-2 text-muted-foreground">
                            <span>Platform Fee</span>
                            <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">Included by Seller</span>
                          </div>
                        )}
                        
                        <div className="h-px bg-gray-100 my-2" />
                        <div className="flex justify-between items-center px-2 font-bold text-[15px]">
                          <span>Total You Pay</span>
                          <span className="text-primary">${totalDueNum.toLocaleString(undefined, {minimumFractionDigits: feeOption === 0 ? 2 : 0})}</span>
                        </div>
                      </div>

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

          {/* STEP 5: SECURE FUNDS */}
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

              {/* Shipping To Summary */}
              {selectedAddress && (
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">Shipping To</h3>
                    <p className="text-[14px] font-bold text-gray-900">{selectedAddress.name}</p>
                    <p className="text-[13px] text-gray-600 mt-0.5">
                      {selectedAddress.street} {selectedAddress.apt && `, ${selectedAddress.apt}`}
                    </p>
                    <p className="text-[13px] text-gray-600">
                      {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zip}
                    </p>
                  </div>
                  <button onClick={() => setStep(3)} className="text-[13px] text-primary font-bold hover:underline">
                    [ Change ]
                  </button>
                </div>
              )}

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

          {/* STEP 7: PROCESSING PAYMENT */}
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
                   className="text-[28px] font-extrabold tracking-tight text-foreground mb-0.5"
                 >
                   Deal Funded
                 </motion.h1>
                 <motion.div
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                   className="text-[12px] font-medium text-gray-500 mb-4"
                 >
                   TRUST-1024
                 </motion.div>
                 
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
                   <div className="flex justify-between items-start mb-3">
                     <span className="text-[12px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Item</span>
                     <div className="flex flex-col items-end text-right">
                       <span className="font-bold text-[14px]">Charizard Holo 1999</span>
                       <span className="text-[12px] text-muted-foreground mt-0.5">PSA 10 Gem Mint</span>
                     </div>
                   </div>
                   <div className="flex justify-between items-start mb-4">
                     <span className="text-[12px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Seller</span>
                     <div className="flex flex-col items-end">
                       <div className="flex items-center gap-1">
                         <span className="font-bold text-[14px]">@vintage_vault</span>
                         <ShieldCheck className="w-4 h-4 text-blue-600" />
                       </div>
                       <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium mt-1">
                         <span className="text-orange-500 font-bold flex items-center gap-0.5">★ 4.9</span>
                         <span>•</span>
                         <span>120 Deals</span>
                       </div>
                     </div>
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
                   onClick={() => navigate("/dashboard?mode=buyer")}
                 >
                   Go to Dashboard <ArrowRight className="w-5 h-5" />
                 </Button>
               </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* FOOTER CTA (Hidden on Step 2 Verification, Step 3 Address, Step 7 Processing, Step 8 Success) */}
      {step !== 2 && step !== 2.5 && step !== 3 && step < 7 && (
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

      {/* Shipping Address Footer */}
      {step === 3 && (
        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] p-4 pb-6 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-40">
          <div className="flex flex-col gap-3">
             <Button onClick={nextStep} className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
               Continue
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

      {/* DELETE ADDRESS CONFIRMATION */}
      <AnimatePresence>
        {addressToDelete && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setAddressToDelete(null)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl p-6 relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-red-50 border-[6px] border-red-50 flex items-center justify-center mb-6">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-[22px] font-extrabold text-gray-900 mb-2 tracking-tight">Delete Address?</h2>
              <p className="text-[15px] text-gray-500 mb-6 leading-relaxed">
                Are you sure you want to delete this address? This action cannot be undone.
              </p>
              
              {addresses.length === 1 && (
                <div className="p-4 bg-red-50 text-red-600 text-[14px] font-bold rounded-2xl mb-6 flex items-center gap-2">
                  <Info className="w-5 h-5 shrink-0" />
                  You cannot delete your only shipping address.
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="ghost" className="flex-1 h-14 rounded-2xl font-bold text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100" onClick={() => setAddressToDelete(null)}>Cancel</Button>
                <Button 
                  className="flex-1 h-14 rounded-2xl font-bold bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20" 
                  onClick={() => handleDeleteAddress(addressToDelete)}
                  disabled={addresses.length === 1}
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADDRESS BOTTOM SHEET */}
      <AnimatePresence>
        {isAddressSheetOpen && (
          <div className="fixed inset-0 z-[70] flex justify-center items-end sm:items-center">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsAddressSheetOpen(false)}
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-[430px] bg-white rounded-t-[2rem] sm:rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-6 pt-6 pb-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-[20px] font-extrabold tracking-tight">{editingAddressId ? "Edit Address" : "Add Address"}</h2>
                <button onClick={() => setIsAddressSheetOpen(false)} className="p-2 -mr-2 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <form onSubmit={handleSaveAddress} className="space-y-6">
                  
                  {/* Contact Section */}
                  <div className="space-y-4">
                    <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-1">Contact</h3>
                    <div className="space-y-3">
                      <Input required value={addressForm.name || ""} onChange={e => setAddressForm({...addressForm, name: e.target.value})} placeholder="Full Name" className="h-14 rounded-xl bg-gray-50/50 border-gray-200 text-[15px] font-medium focus-visible:ring-primary/20" />
                      <Input required type="tel" value={addressForm.phone || ""} onChange={e => setAddressForm({...addressForm, phone: e.target.value})} placeholder="Phone Number" className="h-14 rounded-xl bg-gray-50/50 border-gray-200 text-[15px] font-medium focus-visible:ring-primary/20" />
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="space-y-4">
                    <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-1">Address</h3>
                    <div className="space-y-3">
                      <Input required value={addressForm.street || ""} onChange={e => setAddressForm({...addressForm, street: e.target.value})} placeholder="Address Line 1" className="h-14 rounded-xl bg-gray-50/50 border-gray-200 text-[15px] font-medium focus-visible:ring-primary/20" />
                      <Input value={addressForm.apt || ""} onChange={e => setAddressForm({...addressForm, apt: e.target.value})} placeholder="Apartment, Suite, etc. (Optional)" className="h-14 rounded-xl bg-gray-50/50 border-gray-200 text-[15px] font-medium focus-visible:ring-primary/20" />
                    </div>
                  </div>

                  {/* Location Section */}
                  <div className="space-y-4">
                    <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-1">Location</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Input required value={addressForm.zip || ""} onChange={e => handleZipChange(e.target.value)} placeholder="ZIP Code" className="h-14 rounded-xl bg-gray-50/50 border-gray-200 text-[15px] font-medium focus-visible:ring-primary/20" />
                        <Input disabled value={addressForm.country || "United States"} className="h-14 rounded-xl bg-gray-50 text-gray-400 font-medium cursor-not-allowed border-gray-200" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input required value={addressForm.city || ""} onChange={e => setAddressForm({...addressForm, city: e.target.value})} placeholder="City" className="h-14 rounded-xl bg-gray-50/50 border-gray-200 text-[15px] font-medium focus-visible:ring-primary/20" />
                        <select 
                          required
                          value={addressForm.state || ""} 
                          onChange={e => setAddressForm({...addressForm, state: e.target.value})} 
                          className="flex h-14 w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-[15px] font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                        >
                          <option value="" disabled>State</option>
                          <option value="CA">California (CA)</option>
                          <option value="FL">Florida (FL)</option>
                          <option value="IL">Illinois (IL)</option>
                          <option value="NY">New York (NY)</option>
                          <option value="TX">Texas (TX)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Address Label */}
                  <div className="space-y-4">
                    <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-1">Address Label</h3>
                    <div className="flex gap-3">
                      {["Home", "Office", "Other"].map(label => {
                        const isSelected = addressForm.type === label || (label === "Other" && addressForm.type !== "Home" && addressForm.type !== "Office");
                        return (
                          <label key={label} className={`flex-1 flex justify-center items-center h-12 border-2 rounded-xl text-[14px] font-bold cursor-pointer transition-colors ${isSelected ? 'bg-primary/5 text-primary border-primary' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'}`}>
                            <input type="radio" name="addressLabel" className="hidden" checked={isSelected} onChange={() => setAddressForm({...addressForm, type: label})} />
                            {label}
                          </label>
                        )
                      })}
                    </div>
                    {(addressForm.type === "Other" || (addressForm.type !== "Home" && addressForm.type !== "Office")) && (
                      <Input value={customLabel} onChange={e => setCustomLabel(e.target.value)} placeholder="e.g. My Beach House" className="h-14 rounded-xl bg-gray-50/50 border-gray-200 text-[15px] font-medium focus-visible:ring-primary/20 mt-3" />
                    )}
                  </div>

                  <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer border border-gray-100 mt-6">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors border-2 ${addressForm.isDefault ? 'bg-primary border-primary' : 'bg-white border-gray-300'}`}>
                      {addressForm.isDefault && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                    </div>
                    <span className="text-[15px] font-bold text-gray-800">Make this my default shipping address</span>
                    <input type="checkbox" className="hidden" checked={addressForm.isDefault} onChange={(e) => setAddressForm({...addressForm, isDefault: e.target.checked})} />
                  </label>

                  <div className="pt-4 pb-2">
                    <Button type="submit" className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-gray-900 hover:bg-gray-800 text-white shadow-lg shadow-gray-900/20">
                      Save Address
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
