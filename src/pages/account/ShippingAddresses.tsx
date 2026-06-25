import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Home, Building, Edit2, Plus, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { Trash2, MapPin } from "lucide-react"
import { useProfileDemo } from "@/hooks/useProfileDemo"

export default function ShippingAddresses() {
  const navigate = useNavigate()
  const { state, updateState } = useProfileDemo()
  const [isAddingMode, setIsAddingMode] = React.useState(false)
  const [showToast, setShowToast] = React.useState("")
  const [deleteModal, setDeleteModal] = React.useState<string | null>(null)

  const handleSave = () => {
    updateState({ hasShipping: true })
    navigate('/profile', { state: { toast: "Shipping Address added successfully" } })
  }

  const handleDelete = () => {
    setDeleteModal(null)
    setShowToast("Address Deleted Successfully")
    setTimeout(() => setShowToast(""), 3000)
  }

  if (isAddingMode) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-[140px]">
        <div className="flex items-center justify-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <button 
            onClick={() => setIsAddingMode(false)} 
            className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <span className="font-bold text-[17px]">Add New Address</span>
        </div>

        <div className="flex-1 px-5 pt-6 animate-in fade-in duration-300 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-gray-600">Full Name</label>
              <Input placeholder="John Doe" className="h-12 bg-gray-50/50" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-gray-600">Street Address</label>
              <Input placeholder="123 Main Street" className="h-12 bg-gray-50/50" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-gray-600">Apartment, suite, etc. (Optional)</label>
              <Input placeholder="Apt 4B" className="h-12 bg-gray-50/50" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-600">City</label>
                <Input placeholder="Austin" className="h-12 bg-gray-50/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-600">State</label>
                <Input placeholder="TX" className="h-12 bg-gray-50/50" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-600">ZIP Code</label>
                <Input placeholder="78701" className="h-12 bg-gray-50/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-gray-600">Country</label>
                <Input defaultValue="United States" className="h-12 bg-gray-50/50" />
              </div>
            </div>
            <div className="space-y-1.5 border-b border-gray-100 pb-4">
              <label className="text-[13px] font-semibold text-gray-600">Phone Number</label>
              <Input type="tel" placeholder="(555) 123-4567" className="h-12 bg-gray-50/50" />
            </div>
            <div className="flex items-center gap-3 pt-2 cursor-pointer">
              <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-[14px]">Set as default shipping address</span>
            </div>
          </div>
        </div>

        <BottomActionBar>
          <Button onClick={handleSave} className="w-full h-14 text-[16px] font-bold">
            Save Address
          </Button>
        </BottomActionBar>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-[140px]">
      <div className="flex items-center justify-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="font-bold text-[17px]">Shipping Addresses</span>
      </div>

      <div className="flex-1 px-5 pt-6 animate-in fade-in duration-300 space-y-6">
        <div>
          <p className="text-[15px] text-muted-foreground leading-relaxed">
            Manage your saved delivery locations.
          </p>
        </div>

        {state.hasShipping ? (
          <div className="space-y-4">
            <Card className="rounded-2xl border-blue-200 shadow-sm overflow-hidden bg-blue-50/30">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <Home className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-[15px] text-foreground uppercase tracking-wider">Home</h3>
                    <span className="ml-2 text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md uppercase tracking-wider">Default</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-blue-100/50 h-8 w-8 p-0">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setDeleteModal('Home Address')} className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="ml-10 space-y-1">
                  <p className="font-semibold text-[15px]">Alex Johnson</p>
                  <p className="text-[14px] text-muted-foreground">123 Main Street</p>
                  <p className="text-[14px] text-muted-foreground">Austin, TX 78701</p>
                  <p className="text-[14px] text-muted-foreground">United States</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-gray-200 shadow-sm overflow-hidden bg-white">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                      <Building className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-[15px] text-foreground uppercase tracking-wider">Office</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-gray-100 h-8 w-8 p-0">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setDeleteModal('Office Address')} className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="ml-10 space-y-1">
                  <p className="font-semibold text-[15px]">Alex Johnson</p>
                  <p className="text-[14px] text-muted-foreground">500 Congress Ave</p>
                  <p className="text-[14px] text-muted-foreground">Austin, TX 78701</p>
                  <p className="text-[14px] text-muted-foreground">United States</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-[17px] font-bold text-gray-900 mb-2">No addresses added</h3>
            <p className="text-[14px] text-gray-500 max-w-[250px]">
              Add a shipping address to speed up your checkout process.
            </p>
          </div>
        )}
      </div>

      <BottomActionBar>
        <Button onClick={() => setIsAddingMode(true)} className="w-full h-14 text-[16px] font-bold bg-white text-primary border border-gray-200 shadow-sm hover:bg-gray-50">
          <Plus className="w-5 h-5 mr-2" /> Add New Address
        </Button>
      </BottomActionBar>
      <BottomSheet
        isOpen={deleteModal !== null}
        onClose={() => setDeleteModal(null)}
        title="Remove Address?"
      >
        <div className="space-y-6">
          <p className="text-[15px] text-muted-foreground text-center">
            Are you sure you want to remove <span className="font-bold text-foreground">{deleteModal}</span>?
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-14 text-[16px] font-bold" onClick={() => setDeleteModal(null)}>
              Cancel
            </Button>
            <Button variant="destructive" className="flex-1 h-14 text-[16px] font-bold" onClick={handleDelete}>
              Remove
            </Button>
          </div>
        </div>
      </BottomSheet>

      {showToast && (
        <div className="fixed bottom-32 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[calc(480px-32px)] bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-center animate-in slide-in-from-bottom-5 z-50">
          <span className="font-semibold text-[15px]">{showToast}</span>
        </div>
      )}
    </div>
  )
}
