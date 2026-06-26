import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"

export default function TermsConditions() {
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
        <span className="font-bold text-[17px]">Terms & Conditions</span>
      </div>

      <div className="flex-1 p-5 animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            Last updated: October 24, 2023
          </p>
          <div className="space-y-4 text-[14px] text-foreground leading-relaxed">
            <h3 className="font-bold text-[16px]">1. Introduction</h3>
            <p>Welcome to TrustLayer. By accessing or using our platform, you agree to be bound by these Terms and Conditions.</p>
            
            <h3 className="font-bold text-[16px]">2. User Accounts</h3>
            <p>You must register an account to use certain features. You are responsible for maintaining the confidentiality of your account credentials.</p>
            
            <h3 className="font-bold text-[16px]">3. Marketplace Rules</h3>
            <p>Users must comply with all local laws and regulations. Fraudulent activity, misrepresentation, and prohibited items are strictly forbidden.</p>

            <h3 className="font-bold text-[16px]">4. Payments and Funds on Hold</h3>
            <p>TrustLayer holds funds securely on hold until both parties confirm the transaction is complete to the agreed specifications.</p>
            
            <h3 className="font-bold text-[16px]">5. Liability</h3>
            <p>TrustLayer acts as a facilitator and is not liable for disputes arising outside the scope of our secure hold protection policies.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
