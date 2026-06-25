import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, CheckCircle2, Mail, Phone, UserSquare2, CreditCard, ShieldCheck, BellRing, Handshake, Lock, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"

export default function VerificationCenter() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-[140px]">
      <div className="flex items-center justify-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <span className="font-bold text-[17px]">Verification Center</span>
        </div>
      </div>

      <div className="flex-1 px-5 pt-6 animate-in fade-in duration-300 space-y-6">
        <div>
          <p className="text-[15px] text-muted-foreground leading-relaxed">
            Complete verification to increase trust and unlock all marketplace features.
          </p>
        </div>

        <div className="space-y-3">
          <Card className="rounded-2xl border-gray-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4 bg-white">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px] text-foreground">Email Verified</h3>
                    <p className="text-[13px] text-muted-foreground">alex.johnson@example.com</p>
                  </div>
                </div>
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-gray-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4 bg-white">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px] text-foreground">Phone Verified</h3>
                    <p className="text-[13px] text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-gray-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4 bg-white">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <UserSquare2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px] text-foreground">Identity Verified</h3>
                    <p className="text-[13px] text-muted-foreground">Government ID match</p>
                  </div>
                </div>
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-blue-200 bg-blue-50/50 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px] text-foreground">Payment Method</h3>
                    <p className="text-[13px] text-muted-foreground">Required for transactions</p>
                  </div>
                </div>
                <Button size="sm" onClick={() => navigate('/payment-methods')} className="font-bold">Add</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-2xl bg-white border-gray-200 shadow-sm mt-8">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-bold text-[16px]">Why Verification Matters</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <BellRing className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="text-[14px] text-muted-foreground font-medium">Receive transaction updates</span>
              </li>
              <li className="flex gap-3">
                <Handshake className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="text-[14px] text-muted-foreground font-medium">Improve buyer confidence</span>
              </li>
              <li className="flex gap-3">
                <Lock className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="text-[14px] text-muted-foreground font-medium">Increase account security</span>
              </li>
              <li className="flex gap-3">
                <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="text-[14px] text-muted-foreground font-medium">Reduce fraud on the marketplace</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <BottomActionBar>
        <Button className="w-full h-14 text-[16px] font-bold" onClick={() => navigate('/payment-methods')}>
          Complete Verification
        </Button>
      </BottomActionBar>
    </div>
  )
}
