import * as React from "react"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function PageSkeleton({ title }: { title: string }) {
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
        <span className="font-bold text-[17px]">{title}</span>
      </div>

      <div className="flex-1 px-5 pt-6 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
          <div className="h-4 bg-gray-100 rounded-md animate-pulse w-3/4"></div>
          <div className="h-12 bg-gray-50 rounded-xl animate-pulse"></div>
          
          <div className="h-4 bg-gray-100 rounded-md animate-pulse w-1/2 mt-6"></div>
          <div className="h-12 bg-gray-50 rounded-xl animate-pulse"></div>
          
          <div className="h-4 bg-gray-100 rounded-md animate-pulse w-2/3 mt-6"></div>
          <div className="h-12 bg-gray-50 rounded-xl animate-pulse"></div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4 mt-6">
          <div className="h-4 bg-gray-100 rounded-md animate-pulse w-1/3"></div>
          <div className="h-12 bg-gray-50 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
