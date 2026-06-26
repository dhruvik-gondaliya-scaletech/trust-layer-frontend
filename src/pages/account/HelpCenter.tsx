import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Search, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"

function Topic({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 cursor-pointer active:bg-gray-50">
      <span className="font-semibold text-[15px]">{title}</span>
      <ChevronRight className="w-5 h-5 opacity-30" />
    </div>
  )
}

export default function HelpCenter() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <div className="flex items-center justify-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="font-bold text-[17px]">Help Center</span>
      </div>

      <div className="flex-1 px-5 pt-6 animate-in fade-in duration-300 space-y-8 pb-10">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-muted-foreground" />
          <Input placeholder="How can we help?" className="h-12 pl-12 bg-white border-gray-200 rounded-xl shadow-sm text-[15px]" />
        </div>

        <div className="space-y-3">
          <h2 className="text-[14px] font-bold text-muted-foreground uppercase tracking-wider">Categories</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4">
            <Topic title="Creating a Deal" />
            <Topic title="Payments" />
            <Topic title="Shipping" />
            <Topic title="Verification" />
            <Topic title="Disputes" />
            <Topic title="Reviews" />
            <Topic title="Wallet" />
          </div>
        </div>
      </div>
    </div>
  )
}
