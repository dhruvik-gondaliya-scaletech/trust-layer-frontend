import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"

export default function RefundPolicy() {
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
        <span className="font-bold text-[17px]">Refund Policy</span>
      </div>

      <div className="flex-1 p-5 animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            Last updated: March 1, 2026
          </p>
          <div className="space-y-6 text-[14px] text-foreground leading-relaxed">
            <div>
              <h3 className="font-bold text-[16px] mb-2">1. Deal Cancellation</h3>
              <p>A deal can be cancelled by either party at any time before funds are deposited into the TrustLayer vault. If a deal is cancelled after funds have been deposited but before the seller has shipped the item, the buyer will receive a full refund automatically.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-[16px] mb-2">2. Funds on Hold</h3>
              <p>When a buyer makes a payment, the funds are held securely in escrow by TrustLayer. The seller is notified to fulfill the order. Funds are not released to the seller until the buyer confirms they have received the item as described.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-[16px] mb-2">3. Return Process</h3>
              <p>If a buyer receives an item that does not match the description, they have 48 hours to open a dispute. If the dispute is approved for a return, the buyer must ship the item back to the seller using a trackable shipping method.</p>
            </div>

            <div>
              <h3 className="font-bold text-[16px] mb-2">4. Refund Process</h3>
              <p>Refunds are issued to the original payment method. The refund process is initiated immediately upon the seller confirming receipt of the returned item in its original condition. Depending on the payment provider, it may take 3-5 business days for the funds to reflect in the buyer's account.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
