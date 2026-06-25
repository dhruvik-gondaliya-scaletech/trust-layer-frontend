import * as React from "react"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { Button } from "@/components/ui/button"

function ToggleRow({ title, description, active, onClick }: { title: string, description: string, active: boolean, onClick: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-3">
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

export function NotificationsSheet({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [push, setPush] = React.useState(true)
  const [email, setEmail] = React.useState(true)
  const [sms, setSms] = React.useState(false)

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Notifications">
      <div className="pb-6">
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
      <Button className="w-full h-14 text-[16px] font-bold rounded-xl bg-blue-600 text-white" onClick={onClose}>
        Save Changes
      </Button>
    </BottomSheet>
  )
}
