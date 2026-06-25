import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Package, Upload, Calendar, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomSelect } from "@/components/ui/custom-select"
import { CustomDatePicker } from "@/components/ui/custom-date-picker"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"

export default function AddTracking() {
  const navigate = useNavigate()
  const [carrier, setCarrier] = React.useState("")
  const [trackingNumber, setTrackingNumber] = React.useState("")
  const [deliveryDate, setDeliveryDate] = React.useState("")
  const [customCarrier, setCustomCarrier] = React.useState("")
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false)
  
  const [shippingProof, setShippingProof] = React.useState<File | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setShippingProof(e.target.files[0])
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShippingProof(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-[140px]">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-1 -ml-1 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="font-bold text-[17px] ml-2">Add Tracking Details</h1>
      </div>

      <div className="flex-1 px-5 pt-6 animate-in fade-in duration-500 space-y-6">
        <div className="text-center space-y-2 mb-8">
          <div className="h-16 w-16 mx-auto bg-blue-50 flex items-center justify-center rounded-full border border-blue-100 shadow-sm">
            <Package className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Shipment Details</h2>
          <p className="text-muted-foreground text-[14px]">Buyer has funded this transaction. Please provide shipment details.</p>
        </div>

        <div className="space-y-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-foreground">Shipping Carrier</label>
            <CustomSelect
              placeholder="Select carrier"
              value={carrier}
              onChange={setCarrier}
              options={[
                { value: "USPS", label: "USPS" },
                { value: "UPS", label: "UPS" },
                { value: "FedEx", label: "FedEx" },
                { value: "DHL", label: "DHL" },
                { value: "Other", label: "Other" }
              ]}
            />
          </div>

          {carrier === "Other" && (
            <div className="space-y-2 animate-in slide-in-from-top-2">
              <label className="text-[13px] font-medium text-foreground">Custom Carrier</label>
              <Input placeholder="Enter carrier name" value={customCarrier} onChange={e => setCustomCarrier(e.target.value)} />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[13px] font-medium text-foreground">Tracking Number</label>
            <Input 
              placeholder="e.g. 1Z999AA10123456784" 
              value={trackingNumber} 
              onChange={e => setTrackingNumber(e.target.value)} 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-medium text-foreground flex items-center gap-1">
              Estimated Delivery Date
            </label>
            <CustomDatePicker 
              value={deliveryDate} 
              onChange={setDeliveryDate} 
              placeholder="MM/DD/YYYY"
            />
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-[13px] font-medium text-foreground flex items-center gap-1">
              Shipping Proof <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
            />
            {!shippingProof ? (
              <div 
                onClick={handleUploadClick}
                className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm border border-gray-100">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <span className="text-[14px] font-bold text-blue-600">Upload receipt</span>
                  <p className="text-[12px] text-muted-foreground mt-0.5">JPG, PNG or PDF (Max 5MB)</p>
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-white shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-[14px] font-medium text-foreground truncate">
                      {shippingProof.name}
                    </span>
                    <span className="text-[12px] text-muted-foreground">
                      {(shippingProof.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
                <button 
                  onClick={handleRemoveFile}
                  className="p-2 shrink-0 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomActionBar>
        <Button 
          className="w-full h-14 text-[16px] font-bold shadow-sm"
          onClick={() => navigate("/tracking-success/deal-123")}
          disabled={!carrier || !trackingNumber || !deliveryDate || (carrier === "Other" && !customCarrier)}
        >
          Submit Tracking Information
        </Button>
      </BottomActionBar>
    </div>
  )
}
