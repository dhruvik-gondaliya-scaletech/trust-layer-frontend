import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Star, MapPin, ShieldCheck, Mail, Phone } from "lucide-react"
import { TrustProfileCard } from "@/components/trust-profile-card"

export default function PublicProfilePreview() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <div className="flex items-center justify-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="font-bold text-[17px]">Public Profile</span>
      </div>

      <div className="flex-1 pb-10">
        <div className="bg-white border-b border-gray-100 pb-8 pt-8 px-5 flex justify-center">
          <TrustProfileCard 
            variant="large"
            className="border-0 shadow-none bg-transparent p-0"
            user={{
              username: "@vintage_vault",
              avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
              trustScore: 96,
              rating: 4.9,
              reviewCount: 184,
              successfulDeals: 184,
              memberSince: 2022,
              isTrustedMember: true
            }}
          />
        </div>

        <div className="px-5 pt-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-[16px] font-extrabold text-gray-900">About Me</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <p className="text-[15px] leading-relaxed text-gray-700">
                Vintage trading card collector. Buying and selling authenticated collectibles. 50+ successful transactions.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[16px] font-extrabold text-gray-900">Verifications</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900">Email Address</h4>
                  <p className="text-[13px] text-emerald-600 font-semibold">Verified</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900">Phone Number</h4>
                  <p className="text-[13px] text-emerald-600 font-semibold">Verified</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
