import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"

export default function PrivacyPolicy() {
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <div className="flex items-center justify-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button 
          onClick={handleBack} 
          className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="font-bold text-[17px]">Privacy Policy</span>
      </div>

      <div className="flex-1 p-5 animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            Last updated: October 24, 2023
          </p>
          <div className="space-y-4 text-[14px] text-foreground leading-relaxed">
            <h3 className="font-bold text-[16px]">1. Information We Collect</h3>
            <p>We collect personal information such as name, email, and payment details when you register and use the marketplace.</p>
            
            <h3 className="font-bold text-[16px]">2. How We Use Information</h3>
            <p>We use your information to facilitate secure transactions, verify identity, and improve the overall platform experience.</p>
            
            <h3 className="font-bold text-[16px]">3. Data Sharing</h3>
            <p>We do not sell your personal data. We may share necessary details with payment processors and identity verification partners to fulfill services.</p>

            <h3 className="font-bold text-[16px]">4. Security</h3>
            <p>We implement industry-standard security measures to protect your data, but no method of transmission over the internet is 100% secure.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
