import * as React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, Check, Lock, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomSelect } from "@/components/ui/custom-select"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"
import { validateAddressForm, type ValidationErrors, formatPhoneInput, cleanZip, cleanCity, cleanState, cleanName } from "@/lib/validation"

const COUNTRIES = [
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Australia", label: "Australia" },
];

const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "DC", label: "District of Columbia" },
  { value: "PR", label: "Puerto Rico" }
];

type AddressForm = {
  name: string
  street: string
  apt?: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
  alternatePhone?: string
  isDefault: boolean
  type: string
}

// Simple mock for ZIP code lookup
const mockZipDb: Record<string, { city: string, state: string }> = {
  "78701": { city: "Austin", state: "TX" },
  "10001": { city: "New York", state: "NY" },
  "90210": { city: "Beverly Hills", state: "CA" },
  "33101": { city: "Miami", state: "FL" },
}

export default function AddShippingAddress() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const dealId = searchParams.get("dealId")

  const [customLabel, setCustomLabel] = React.useState("")
  const [addressForm, setAddressForm] = React.useState<AddressForm>({
    name: "", country: "United States", phone: "+1 (555) 123-4567", type: "Home", isDefault: true,
    street: "", city: "", state: "", zip: "", alternatePhone: ""
  })
  const [errors, setErrors] = React.useState<ValidationErrors>({})
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})
  const [isSaving, setIsSaving] = React.useState(false)
  const [showToast, setShowToast] = React.useState("")

  // Re-validate whenever form or custom label changes
  React.useEffect(() => {
    setErrors(validateAddressForm(addressForm, customLabel))
  }, [addressForm, customLabel])

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const handlePhoneChange = (val: string) => {
    setAddressForm(prev => ({ ...prev, alternatePhone: formatPhoneInput(val) }))
  }

  const handleZipChange = (zip: string) => {
    const cleaned = cleanZip(zip);
    setAddressForm(prev => ({ ...prev, zip: cleaned }))
    
    // Auto-fill city and state for valid mock zips
    if (mockZipDb[cleaned]) {
      setAddressForm(prev => ({
        ...prev,
        zip: cleaned,
        city: mockZipDb[cleaned].city,
        state: mockZipDb[cleaned].state
      }));
    }
  }

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validateAddressForm(addressForm, customLabel)
    // Touch all fields to show errors if they try to save with empty required fields
    const allTouched: Record<string, boolean> = {
      name: true, street: true, apt: true, zip: true, city: true, state: true, country: true, alternatePhone: true, customLabel: true
    }
    setTouched(allTouched)
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setIsSaving(true)
    setShowToast("Shipping address saved successfully.")
    
    setTimeout(() => {
      if (dealId) {
        navigate(`/fund-escrow/${dealId}`)
      } else {
        navigate("/account/shipping-addresses")
      }
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-[120px]">
      <div className="flex items-center justify-center p-4 bg-background sticky top-0 z-20 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="font-bold text-[16px]">Add New Address</span>
      </div>
      
      <div className="px-5 pt-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Shipping Address</h1>
          <p className="text-[14px] text-muted-foreground">
            Where should we send your item?
          </p>
        </div>

        <form id="add-address-form" onSubmit={handleSaveAddress} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[13px] font-bold ml-1">Location Label</label>
            <div className="flex gap-2">
              {["Home", "Office", "Other"].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAddressForm({ ...addressForm, type })}
                  className={`flex-1 py-2.5 rounded-xl border-2 text-[13px] font-bold transition-colors ${addressForm.type === type ? 'border-primary bg-blue-50/50 text-primary' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
                >
                  {type}
                </button>
              ))}
            </div>
            {addressForm.type === "Other" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-2">
                <Input value={customLabel} onChange={e => setCustomLabel(e.target.value)} onBlur={() => handleBlur('customLabel')} placeholder="e.g. Vacation Home" className={`h-12 bg-gray-50/50 ${touched.customLabel && errors.customLabel ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
                {touched.customLabel && errors.customLabel && <p className="text-red-500 text-[12px] font-medium mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.customLabel}</p>}
              </motion.div>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-[13px] font-bold ml-1">Contact Name</label>
            <Input value={addressForm.name || ""} onChange={e => setAddressForm({...addressForm, name: cleanName(e.target.value)})} onBlur={() => handleBlur('name')} placeholder="Alex Johnson" className={`h-12 bg-gray-50/50 ${touched.name && errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
            {touched.name && errors.name && <p className="text-red-500 text-[12px] font-medium mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold ml-1">Street Address</label>
            <Input value={addressForm.street || ""} onChange={e => setAddressForm({...addressForm, street: e.target.value})} onBlur={() => handleBlur('street')} placeholder="123 Main Street" className={`h-12 bg-gray-50/50 ${touched.street && errors.street ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
            {touched.street && errors.street && <p className="text-red-500 text-[12px] font-medium mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.street}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold ml-1">Apt, Suite, etc. (Optional)</label>
            <Input value={addressForm.apt || ""} onChange={e => setAddressForm({...addressForm, apt: e.target.value})} onBlur={() => handleBlur('apt')} placeholder="Apt 4B" className={`h-12 bg-gray-50/50 ${touched.apt && errors.apt ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
            {touched.apt && errors.apt && <p className="text-red-500 text-[12px] font-medium mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.apt}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[13px] font-bold ml-1">ZIP Code</label>
              <Input value={addressForm.zip || ""} onChange={e => handleZipChange(e.target.value)} onBlur={() => handleBlur('zip')} placeholder="78701" className={`h-12 bg-gray-50/50 ${touched.zip && errors.zip ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
              {touched.zip && errors.zip && <p className="text-red-500 text-[12px] font-medium mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.zip}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-bold ml-1">City</label>
              <Input value={addressForm.city || ""} onChange={e => setAddressForm({...addressForm, city: cleanCity(e.target.value)})} onBlur={() => handleBlur('city')} placeholder="Austin" className={`h-12 bg-gray-50/50 ${touched.city && errors.city ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
              {touched.city && errors.city && <p className="text-red-500 text-[12px] font-medium mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.city}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[13px] font-bold ml-1">State</label>
              <div onBlur={() => handleBlur('state')}>
                <CustomSelect 
                  value={addressForm.state} 
                  onChange={(val) => setAddressForm({...addressForm, state: val})} 
                  options={US_STATES} 
                  placeholder="Select State"
                  className={touched.state && errors.state ? 'border-red-500' : ''} 
                />
              </div>
              {touched.state && errors.state && <p className="text-red-500 text-[12px] font-medium mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.state}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-bold ml-1">Country</label>
              <div onBlur={() => handleBlur('country')}>
                <CustomSelect 
                  value={addressForm.country} 
                  onChange={(val) => setAddressForm({...addressForm, country: val})} 
                  options={COUNTRIES} 
                  className={touched.country && errors.country ? 'border-red-500' : ''} 
                />
              </div>
              {touched.country && errors.country && <p className="text-red-500 text-[12px] font-medium mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.country}</p>}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-[13px] font-bold ml-1">Verified Phone Number (Read Only)</label>
              <div className="relative">
                <Input value={addressForm.phone || "+1 (555) 123-4567"} readOnly className="h-12 bg-gray-100 border-gray-200 text-gray-600 pl-10 cursor-not-allowed" />
                <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-[12px] text-muted-foreground ml-1">This is your verified TrustLayer account phone number.</p>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold ml-1">Alternate Phone Number (Optional)</label>
              <Input value={addressForm.alternatePhone || ""} onChange={e => handlePhoneChange(e.target.value)} onBlur={() => handleBlur('alternatePhone')} type="tel" placeholder="Enter an alternate contact number" className={`h-12 bg-gray-50/50 ${touched.alternatePhone && errors.alternatePhone ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
              {touched.alternatePhone && errors.alternatePhone ? (
                <p className="text-red-500 text-[12px] font-medium mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.alternatePhone}</p>
              ) : (
                <p className="text-[12px] text-muted-foreground ml-1 leading-relaxed">Use this if someone else will receive the package or if the courier should contact a different number.</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 pb-6 cursor-pointer" onClick={() => setAddressForm({...addressForm, isDefault: !addressForm.isDefault})}>
            <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 border-2 transition-colors ${addressForm.isDefault ? 'bg-primary border-primary' : 'border-gray-300'}`}>
              {addressForm.isDefault && <Check className="w-4 h-4 text-white" />}
            </div>
            <span className="font-bold text-[14px]">Set as default shipping address</span>
          </div>
        </form>
      </div>
      
      <BottomActionBar>
        <Button 
          disabled={Object.keys(errors).length > 0 || isSaving} 
          type="submit" 
          form="add-address-form" 
          className={`w-full h-14 text-[16px] font-bold ${Object.keys(errors).length > 0 ? 'bg-blue-300 text-white opacity-100' : 'bg-primary'}`}
        >
          {isSaving ? "Saving..." : "Save & Continue"}
        </Button>
      </BottomActionBar>

      {/* Toast Overlay */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-24 left-4 right-4 z-50 flex justify-center"
          >
            <div className="bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 w-full max-w-sm mx-auto">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              <span className="text-[14px] font-bold">{showToast}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
