import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"

export default function CookiePolicy() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <div className="flex items-center justify-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="font-bold text-[17px]">Cookie Policy</span>
      </div>

      <div className="flex-1 p-5 animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            Last updated: February 14, 2026
          </p>
          <div className="space-y-6 text-[14px] text-foreground leading-relaxed">
            <div>
              <h3 className="font-bold text-[16px] mb-2">1. What Are Cookies?</h3>
              <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the site owners.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-[16px] mb-2">2. How We Use Cookies</h3>
              <p className="mb-2">We use cookies for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li><strong>Essential Cookies:</strong> Required for the platform to function (e.g., maintaining your logged-in state).</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our platform by collecting anonymous data.</li>
                <li><strong>Functional Cookies:</strong> Allow the platform to remember choices you make (e.g., your notification preferences).</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-[16px] mb-2">3. Managing Cookies</h3>
              <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit TrustLayer and some services and functionalities may not work.</p>
            </div>

            <div>
              <h3 className="font-bold text-[16px] mb-2">4. Third-Party Cookies</h3>
              <p>In some special cases, we also use cookies provided by trusted third parties, such as our secure payment processors, to ensure compliance and security during transactions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
