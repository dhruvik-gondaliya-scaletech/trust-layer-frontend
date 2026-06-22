import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Shield, MapPin, Package, CheckCircle2, CircleDashed, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"

export default function TransactionTimeline() {
  const navigate = useNavigate()
  const steps = [
    { label: "Deal Created", status: "completed", date: "Oct 12, 10:00 AM" },
    { label: "Buyer Funded", status: "completed", date: "Oct 12, 11:30 AM" },
    { label: "Tracking Uploaded", status: "completed", date: "Oct 13, 09:15 AM" },
    { label: "In Transit", status: "current", date: "Oct 14, Est. Delivery: Oct 16" },
    { label: "Delivered", status: "upcoming" },
    { label: "Buyer Confirmation", status: "upcoming" },
    { label: "Review", status: "upcoming" },
    { label: "Funds Released", status: "upcoming" }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-[140px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 -ml-1 rounded-full text-foreground hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-bold text-[15px]">TrustLayer</span>
          </div>
        </div>
        <div className="text-[12px] text-muted-foreground flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> Secured by TrustLayer
        </div>
      </div>

      <div className="flex-1 px-5 pt-4 animate-in fade-in duration-500 space-y-6">
        {/* Status Header */}
        <div className="text-center space-y-2 mt-4">
          <div className="h-16 w-16 mx-auto bg-primary/10 flex items-center justify-center rounded-full">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">In Transit</h1>
          <p className="text-muted-foreground text-sm">Funds secured in TrustLayer Escrow</p>
        </div>

        {/* Action Needed Card */}
        <Card className="border-warning bg-warning/5">
          <CardContent className="p-4 flex items-start gap-3">
            <MapPin className="h-5 w-5 text-warning mt-0.5" />
            <div>
              <h3 className="font-semibold">Next Action: Await Delivery</h3>
              <p className="text-[14px] text-muted-foreground mt-1">
                The package is currently in transit. The buyer has 3 days to verify the item upon delivery.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardContent className="p-5">
            <h2 className="font-semibold text-[18px] mb-6">Transaction Timeline</h2>

            <div className="space-y-6">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  {idx !== steps.length - 1 && (
                    <div className={`absolute left-[11px] top-6 bottom-[-24px] w-0.5 ${step.status === 'completed' ? 'bg-success' : 'bg-muted'}`} />
                  )}

                  <div className="relative z-10 flex-shrink-0 bg-background pt-1">
                    {step.status === 'completed' && <CheckCircle2 className="h-6 w-6 text-success bg-background rounded-full" />}
                    {step.status === 'current' && (
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="h-3 w-3 bg-primary rounded-full" />
                      </div>
                    )}
                    {step.status === 'upcoming' && <CircleDashed className="h-6 w-6 text-muted-foreground bg-background rounded-full" />}
                  </div>

                  <div className={`flex-1 pt-1 ${step.status === 'upcoming' ? 'opacity-50' : ''}`}>
                    <h4 className={`font-semibold text-[15px] ${step.status === 'current' ? 'text-primary' : ''}`}>
                      {step.label}
                    </h4>
                    {step.date && <p className="text-[13px] text-muted-foreground mt-0.5">{step.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Funds Status</span>
            </div>
            <span className="font-semibold text-success">Secured in Escrow</span>
          </CardContent>
        </Card>
      </div>

      <BottomActionBar>
        <Button className="w-full h-14 text-[16px]">
          Upload New Tracking
        </Button>
      </BottomActionBar>
    </div>
  )
}
