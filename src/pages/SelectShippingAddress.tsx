import * as React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { ChevronLeft, Home, Building2, MapPin, Check, Edit2, Trash2, Plus, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"

type Address = {
  id: string
  name: string
  street: string
  apt?: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
  alternatePhone?: string
  isDefault?: boolean
  type: string
}

const mockAddresses: Address[] = [
  {
    id: "1",
    name: "Alex Johnson",
    street: "123 Main Street",
    city: "Austin",
    state: "TX",
    zip: "78701",
    country: "United States",
    phone: "+1 (555) 123-4567",
    isDefault: true,
    type: "Home"
  }
]

export default function SelectShippingAddress() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const dealId = searchParams.get("dealId")
  const isOnboarding = searchParams.get("onboarding") === "true"

  const [addresses, setAddresses] = React.useState<Address[]>(isOnboarding ? [] : mockAddresses)
  const [selectedAddressId, setSelectedAddressId] = React.useState<string>("1")
  
  // Address Sheet State
  const [isAddressSheetOpen, setIsAddressSheetOpen] = React.useState(false)
  const [editingAddressId, setEditingAddressId] = React.useState<string | null>(null)
  const [customLabel, setCustomLabel] = React.useState("")
  const [addressToDelete, setAddressToDelete] = React.useState<string | null>(null)
  const [addressForm, setAddressForm] = React.useState<Partial<Address>>({
    name: "Alex Johnson", country: "United States", phone: "+1 (555) 123-4567", type: "Home", isDefault: false
  })

  // If no addresses, force add mode
  React.useEffect(() => {
    if (addresses.length === 0 && !isAddressSheetOpen) {
      openAddAddress()
    }
  }, [addresses.length])

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
    
    // Automatically redirect new buyers after they save their first address
    if (isOnboarding && dealId) {
      navigate(`/fund-escrow/${dealId}`)
    }
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
    const newAddresses = addresses.filter(a => a.id !== id);
    if (addresses.find(a => a.id === id)?.isDefault && newAddresses.length > 0) {
      newAddresses[0].isDefault = true;
    }
    setAddresses(newAddresses);
    setAddressToDelete(null);
    if (selectedAddressId === id && newAddresses.length > 0) {
      setSelectedAddressId(newAddresses[0].id);
    }
  }

  const handleZipChange = (zip: string) => {
    setAddressForm({ ...addressForm, zip });
    
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

  const handleContinue = () => {
    if (addresses.length === 0) return;
    
    if (dealId) {
      navigate(`/fund-escrow/${dealId}`)
    } else {
      navigate("/dashboard")
    }
  }

  const sortedAddresses = [...addresses].sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0))

  if (isAddressSheetOpen) {
    return (
      <div className="flex flex-col min-h-screen bg-background pb-[120px]">
        <div className="flex items-center justify-center p-4 bg-background sticky top-0 z-20">
          {addresses.length > 0 && (
            <button onClick={() => setIsAddressSheetOpen(false)} className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors">
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          <span className="font-bold text-[16px]">{editingAddressId ? "Edit Address" : "Add New Address"}</span>
        </div>
        
        <div className="px-5 pt-4 space-y-4">
          <form id="address-form" onSubmit={handleSaveAddress} className="space-y-4">
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
                  <Input value={customLabel} onChange={e => setCustomLabel(e.target.value)} placeholder="e.g. Vacation Home" required className="h-12 bg-gray-50/50" />
                </motion.div>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-[13px] font-bold ml-1">Contact Name</label>
              <Input value={addressForm.name || ""} onChange={e => setAddressForm({...addressForm, name: e.target.value})} placeholder="Alex Johnson" required className="h-12 bg-gray-50/50" />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold ml-1">Street Address</label>
              <Input value={addressForm.street || ""} onChange={e => setAddressForm({...addressForm, street: e.target.value})} placeholder="123 Main Street" required className="h-12 bg-gray-50/50" />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold ml-1">Apt, Suite, etc. (Optional)</label>
              <Input value={addressForm.apt || ""} onChange={e => setAddressForm({...addressForm, apt: e.target.value})} placeholder="Apt 4B" className="h-12 bg-gray-50/50" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[13px] font-bold ml-1">ZIP Code</label>
                <Input value={addressForm.zip || ""} onChange={e => handleZipChange(e.target.value)} placeholder="78701" required className="h-12 bg-gray-50/50" />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold ml-1">City</label>
                <Input value={addressForm.city || ""} onChange={e => setAddressForm({...addressForm, city: e.target.value})} placeholder="Austin" required className="h-12 bg-gray-50/50" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[13px] font-bold ml-1">State</label>
                <Input value={addressForm.state || ""} onChange={e => setAddressForm({...addressForm, state: e.target.value})} placeholder="TX" required className="h-12 bg-gray-50/50" />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold ml-1">Country</label>
                <Input value={addressForm.country || ""} onChange={e => setAddressForm({...addressForm, country: e.target.value})} placeholder="United States" required className="h-12 bg-gray-50/50" />
              </div>
            </div>

            <div className="space-y-4">
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
                <Input value={addressForm.alternatePhone || ""} onChange={e => setAddressForm({...addressForm, alternatePhone: e.target.value})} type="tel" placeholder="Enter an alternate contact number" className="h-12 bg-gray-50/50" />
                <p className="text-[12px] text-muted-foreground ml-1 leading-relaxed">Use this if someone else will receive the package or if the courier should contact a different number.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 pb-2 cursor-pointer" onClick={() => setAddressForm({...addressForm, isDefault: !addressForm.isDefault})}>
              <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 border-2 transition-colors ${addressForm.isDefault ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                {addressForm.isDefault && <Check className="w-4 h-4 text-white" />}
              </div>
              <span className="font-bold text-[14px]">Set as default shipping address</span>
            </div>
          </form>
        </div>
        
        <BottomActionBar>
          <Button type="submit" form="address-form" className="w-full h-14 text-[16px]">
            Save Address
          </Button>
        </BottomActionBar>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-[120px]">
      <div className="flex items-center justify-between p-4 bg-background sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="px-6 pt-2 space-y-6">
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
      </div>
      
      <BottomActionBar>
        <Button onClick={handleContinue} className="w-full h-14 text-[16px] font-bold">
          Continue
        </Button>
      </BottomActionBar>

      <BottomSheet
        isOpen={addressToDelete !== null}
        onClose={() => setAddressToDelete(null)}
        title="Delete Address?"
      >
        <div className="space-y-6">
          <p className="text-[15px] text-muted-foreground text-center px-4">
            Are you sure you want to delete this shipping address? This cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-14 font-bold" onClick={() => setAddressToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" className="flex-1 h-14 font-bold" onClick={() => addressToDelete && handleDeleteAddress(addressToDelete)}>
              Delete Address
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
