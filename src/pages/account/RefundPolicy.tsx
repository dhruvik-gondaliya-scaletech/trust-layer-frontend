import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"

export default function RefundPolicy() {
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
      <div className="flex items-center justify-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
        <button 
          onClick={handleBack} 
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
              <p>When a buyer makes a payment, the funds are held securely by TrustLayer. The seller is notified to fulfill the order. Funds are not released to the seller until the buyer confirms they have received the item as described, or the transaction is automatically completed if no action is taken within 14 days of the confirmed delivery date.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-[16px] mb-2">3. Return Process</h3>
              <p>If a buyer receives an item that does not match the description, they have 14 days to open a dispute. If the dispute is approved for a return, the buyer must ship the item back to the seller using a trackable shipping method through the TrustLayer Return Process.</p>
            </div>

            <div>
              <h3 className="font-bold text-[16px] mb-2">4. Refund Process</h3>
              <p>Refunds are issued directly to your TrustLayer Wallet. The refund process is initiated immediately after the seller confirms receipt of the returned item. Once the refund has been issued, you may withdraw your funds or use your wallet balance for future purchases on TrustLayer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
