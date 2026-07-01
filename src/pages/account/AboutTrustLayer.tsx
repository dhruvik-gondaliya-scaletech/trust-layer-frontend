import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"

export default function AboutTrustLayer() {
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
        <span className="font-bold text-[17px]">About TrustLayer</span>
      </div>

      <div className="flex-1 p-5 animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl shadow-sm border border-border p-6 space-y-8">
          <div className="space-y-4 text-[15px] text-foreground leading-relaxed">
            <h3 className="font-bold text-[18px]">Company Overview</h3>
            <p className="text-muted-foreground">
              TrustLayer is a premier order protection software designed for 1v1 deals. We believe that buying and selling items should be entirely risk-free for both parties.
            </p>
            
            <h3 className="font-bold text-[18px]">Our Mission</h3>
            <p className="text-muted-foreground">
              Our mission is to eliminate fraud, scams, and uncertainty in online commerce by providing a completely secure, transparent, and user-friendly order protection solution.
            </p>
            
            <h3 className="font-bold text-[18px]">How TrustLayer Works</h3>
            <p className="text-muted-foreground">
              Instead of paying through an unsecured method. TrustLayer protects your deal through advance imaging, video verification, payment protection, shipment monitoring, and much more. Buying items on the internet will be the safest thing you can do through TrustLayer
            </p>

            <h3 className="font-bold text-[18px]">Why Buyers and Sellers Trust Us</h3>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li><strong>Zero Risk:</strong> Funds are never released until the transaction is successfully completed.</li>
              <li><strong>Fair Dispute Resolution:</strong> Our dedicated team reviews evidence objectively if any issues arise.</li>
              <li><strong>Privacy First:</strong> Your financial data is securely encrypted and never shared directly with the other party.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
