import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronDown } from "lucide-react"

function Accordion({ title }: { title: string }) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between py-4 text-left focus:outline-none"
      >
        <span className="font-semibold text-[15px] text-foreground">{title}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-4 pt-1">
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            This is a placeholder description for {title.toLowerCase()}. It explains the policies and procedures in detail.
          </p>
        </div>
      )}
    </div>
  )
}

export default function TransactionProtection() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <div className="flex items-center justify-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="font-bold text-[17px]">Transaction Protection</span>
      </div>

      <div className="flex-1 px-5 pt-6 animate-in fade-in duration-300 pb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4">
          <Accordion title="How Buyer Protection Works" />
          <Accordion title="How Seller Protection Works" />
          <Accordion title="Platform Fees" />
          <Accordion title="Funds On Hold" />
          <Accordion title="Dispute Resolution" />
          <Accordion title="Delivery Confirmation" />
        </div>
      </div>
    </div>
  )
}
