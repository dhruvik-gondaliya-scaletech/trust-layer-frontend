import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Star, MapPin, ShieldCheck, Mail, Phone } from "lucide-react"

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
        <div className="bg-white border-b border-gray-100 pb-8 pt-8">
          <div className="px-5 flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-white overflow-hidden bg-white shadow-md">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" alt="Alex Johnson" className="w-full h-full object-cover" />
              </div>
            </div>
            
            <h1 className="text-[22px] font-extrabold mt-3">Alex Johnson</h1>
            <p className="text-gray-500 font-semibold text-[14px]">@alexj_collectibles</p>

            <div className="flex items-center gap-1 mt-2 mb-4 text-yellow-400 justify-center">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              <span className="text-gray-700 font-bold ml-1 text-[13px]">5.0 • <span className="text-gray-500 font-medium">50+ Completed Deals</span></span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-1">
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[13px] font-medium">TrustLayer Verified</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 text-gray-700 px-3 py-1.5 rounded-full border border-gray-200">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[13px] font-medium">Austin, TX</span>
              </div>
            </div>
          </div>
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
