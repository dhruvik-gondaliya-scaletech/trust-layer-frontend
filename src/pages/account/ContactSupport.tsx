import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"

export default function ContactSupport() {
  const navigate = useNavigate()
  const [showToast, setShowToast] = React.useState(false)

  const handleSubmit = () => {
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
      navigate(-1)
    }, 2000)
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
        <span className="font-bold text-[17px]">Contact Support</span>
      </div>

      <div className="flex-1 px-5 pt-6 animate-in fade-in duration-300 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-gray-600">Subject</label>
            <div className="h-12 bg-gray-50/50 border border-input rounded-xl px-4 flex items-center justify-between text-[14px]">
              <span className="font-medium text-foreground">Select an option</span>
              <ChevronLeft className="w-4 h-4 opacity-50 rotate-[-90deg]" />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-gray-600">Message</label>
            <textarea 
              className="flex w-full rounded-xl border border-input bg-gray-50/50 px-3 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[150px]"
              placeholder="Describe how we can help you..."
            />
          </div>

          <Button variant="outline" className="w-full h-12 font-bold text-[14px] bg-gray-50/50 border-dashed">
            <Paperclip className="w-4 h-4 mr-2" /> Attach Screenshot
          </Button>
        </div>
      </div>

      <BottomActionBar>
        <Button onClick={handleSubmit} className="w-full h-14 text-[16px] font-bold">
          Submit Request
        </Button>
      </BottomActionBar>

      {showToast && (
        <div className="fixed bottom-[100px] left-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-center animate-in slide-in-from-bottom-5 z-50">
          <span className="font-semibold text-[15px]">Request Submitted Successfully</span>
        </div>
      )}
    </div>
  )
}
