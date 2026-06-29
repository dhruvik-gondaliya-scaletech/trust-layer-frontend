import React from "react"
import { useNavigate } from "react-router-dom"
import { Check, Copy, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function DealPublished() {
  const navigate = useNavigate()
  const isEdit = localStorage.getItem("dealRepublished") === "true"

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-transparent">
        <div className="flex items-center gap-2">
          <div className="text-primary font-bold">TrustLayer</div>
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <Check className="w-4 h-4" /> Secured by TrustLayer
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-6 max-w-sm mx-auto w-full">
        
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 shadow-sm">
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </div>

        <h1 className="text-2xl font-bold mb-2">{isEdit ? "Deal Updated Successfully" : "Deal published"}</h1>
        <p className="text-muted-foreground text-center text-[15px] mb-8 leading-relaxed">
          Send this link to your buyer. It's the only place they can fund this deal.
        </p>

        <Card className="w-full mb-8 shadow-sm">
          <CardContent className="p-4 pt-4">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
              Shareable link
            </p>
            
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-[#F1F5F9] rounded-xl px-4 py-3 flex items-center overflow-hidden">
                <span className="text-[14px] text-foreground truncate font-mono">
                  trustlayer.com/deal/TRUST-1024
                </span>
              </div>
              <button className="w-12 h-12 shrink-0 bg-primary rounded-xl flex items-center justify-center text-white hover:bg-primary/90 transition-colors">
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="text-[13px] text-muted-foreground text-center mb-6">
          Tip: this prototype simulates the buyer opening the link.
        </p>

        <div className="w-full space-y-3">
          <Button 
            className="w-full h-14 text-[16px]"
            onClick={() => navigate("/buyer-view/TRUST-1024")}
          >
            Open deal as buyer &rarr;
          </Button>
          <Button 
            variant="outline" 
            className="w-full h-14 text-[16px] bg-transparent"
            onClick={() => navigate("/dashboard")}
          >
            Back to dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
