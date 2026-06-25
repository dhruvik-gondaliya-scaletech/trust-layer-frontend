import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

function ToggleRow({ title, description, active, onClick }: { title: string, description: string, active: boolean, onClick: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-3">
      <div className="flex-1 pr-4">
        <h4 className="text-[15px] font-bold text-gray-900">{title}</h4>
        <p className="text-[13px] text-gray-500 font-medium leading-relaxed mt-0.5">{description}</p>
      </div>
      <div 
        onClick={onClick}
        className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${active ? 'bg-blue-600' : 'bg-gray-300'}`}
      >
        <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${active ? 'translate-x-6' : 'translate-x-1 shadow-sm'}`} />
      </div>
    </div>
  )
}

export default function NotificationPreferences() {
  const navigate = useNavigate()
  const [push, setPush] = React.useState(true)
  const [email, setEmail] = React.useState(true)
  const [sms, setSms] = React.useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <div className="flex items-center justify-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="font-bold text-[17px]">Notification Preferences</span>
      </div>

      <div className="flex-1 px-5 pt-6 pb-10 space-y-4">
        <ToggleRow 
          title="Push Notifications" 
          description="Receive alerts on your device for messages and updates."
          active={push}
          onClick={() => setPush(!push)}
        />
        <ToggleRow 
          title="Email Notifications" 
          description="Get transaction receipts and important account updates."
          active={email}
          onClick={() => setEmail(!email)}
        />
        <ToggleRow 
          title="SMS Alerts" 
          description="Get text messages for critical security alerts."
          active={sms}
          onClick={() => setSms(!sms)}
        />
      </div>

      <div className="p-5 border-t border-gray-100 bg-white sticky bottom-0">
        <Button className="w-full h-14 text-[16px] font-bold rounded-xl bg-blue-600 text-white" onClick={() => navigate('/dashboard')}>
          Save Changes
        </Button>
      </div>
    </div>
  )
}
