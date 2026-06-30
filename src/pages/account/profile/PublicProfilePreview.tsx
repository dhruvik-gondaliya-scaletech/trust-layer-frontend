import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Star, ShieldCheck, Mail, Phone, UserCheck } from "lucide-react"

export default function PublicProfilePreview() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <div className="flex items-center justify-center p-4 border-b border-gray-100 bg-white sticky top-0 z-20">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="font-bold text-[17px]">Public Profile</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Premium Profile Header (Compressed) */}
        <div className="flex flex-col items-center pt-6 pb-10 px-5 bg-white relative">
          <div className="relative mb-3">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" 
              alt="@vintage_vault" 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-md border-[2px] border-white ring-1 ring-gray-100"
            />
          </div>
          
          <h2 className="text-[22px] sm:text-[24px] font-black text-foreground mb-2 tracking-tight">@vintage_vault</h2>
          
          <div className="flex flex-col items-center gap-2.5 mb-4 w-full">
            <span className="bg-blue-600 text-white text-[10px] sm:text-[11px] uppercase font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-white" /> TRUSTED MEMBER
            </span>
            <div className="flex items-center justify-center gap-2 sm:gap-3 w-full flex-nowrap whitespace-nowrap overflow-hidden px-1">
              <span className="bg-emerald-50 text-emerald-700 text-[9.5px] sm:text-[11px] uppercase font-bold px-2 sm:px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-100/50 shrink-0">
                 <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-600 shrink-0" /> Email Verified
              </span>
              <span className="bg-emerald-50 text-emerald-700 text-[9.5px] sm:text-[11px] uppercase font-bold px-2 sm:px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-100/50 shrink-0">
                 <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-600 shrink-0" /> Phone Verified
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-[14px]">
            <div className="flex items-center gap-0.5 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-extrabold text-gray-900 ml-1">4.9</span>
            <span className="text-gray-400 mx-1.5">•</span>
            <span className="font-bold text-gray-600 hover:text-gray-900 underline decoration-gray-300 underline-offset-4 cursor-pointer transition-colors">184 Reviews</span>
          </div>
        </div>

        {/* User Trust Score Premium Card (Compact) */}
        <div className="px-5 -mt-6 z-10 relative max-w-[600px] mx-auto w-full">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[24px] p-6 shadow-xl text-white text-center border border-blue-400/30">
            <p className="text-[11px] font-bold tracking-[0.15em] text-blue-100/90 uppercase mb-2">User Trust Score</p>
            <div className="text-[48px] font-black leading-none mb-3 tracking-tighter">96</div>
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
              <div className="flex items-center text-amber-400 mr-0.5">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-[13px] font-extrabold text-white tracking-wide">Excellent Reputation</span>
            </div>
          </div>
        </div>

        <div className="max-w-[600px] mx-auto w-full pb-10">
          
          {/* About Card */}
          <div className="px-5 pt-5">
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-4">
              <h3 className="text-[15px] font-bold text-gray-900 mb-1 px-1">About</h3>
              <p className="text-[14px] leading-relaxed text-gray-700 font-medium px-1 text-left">
                Vintage Pokémon and sports card collector specializing in authenticated graded collectibles with hundreds of successful transactions.
              </p>
            </div>
          </div>

          {/* Statistics (Compact) */}
          <div className="px-5 pt-4 grid grid-cols-2 gap-3">
            <div className="bg-white rounded-[20px] py-3 px-4 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] mb-1">Successful Deals</span>
              <span className="text-[24px] font-black text-foreground leading-none">184</span>
            </div>
            <div className="bg-white rounded-[20px] py-3 px-4 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] mb-1">Member Since</span>
              <span className="text-[24px] font-black text-foreground leading-none">2022</span>
            </div>
          </div>

          {/* Public Reviews */}
          <div className="px-5 pt-5 space-y-3">
            <div className="flex justify-between items-end px-1 mb-1">
              <h3 className="text-[18px] font-black text-gray-900">Public Reviews</h3>
              <span className="text-[14px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer transition-colors">View All</span>
            </div>
            
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[15px] text-gray-900">@poke_master_99</span>
                    <span className="bg-blue-50 text-blue-700 text-[10px] px-2.5 py-0.5 rounded-md font-bold uppercase tracking-[0.05em]">Buyer</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
                <p className="text-[14px] text-gray-700 leading-relaxed font-medium">
                  "Fast shipping and item arrived exactly as described. The graded Charizard was packaged perfectly."
                </p>
                <div className="flex justify-between items-center pt-1.5">
                  <p className="text-[11px] text-gray-400 font-bold tracking-wide uppercase">Oct 12, 2025</p>
                  <p className="text-[11px] text-gray-600 font-bold bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">Charizard Holo 1999</p>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[15px] text-gray-900">@card_collector_tx</span>
                    <span className="bg-purple-50 text-purple-700 text-[10px] px-2.5 py-0.5 rounded-md font-bold uppercase tracking-[0.05em]">Seller</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
                <p className="text-[14px] text-gray-700 leading-relaxed font-medium">
                  "Smooth transaction. Funded escrow immediately. Highly recommend doing business with him."
                </p>
                <div className="flex justify-between items-center pt-1.5">
                  <p className="text-[11px] text-gray-400 font-bold tracking-wide uppercase">Sep 28, 2025</p>
                  <p className="text-[11px] text-gray-600 font-bold bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 truncate max-w-[180px]">Shadowless Mewtwo PSA 10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
