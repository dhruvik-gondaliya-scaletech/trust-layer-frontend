import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Clock } from "lucide-react"

export default function ContactUs() {
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
        <span className="font-bold text-[17px]">Contact Us</span>
      </div>

      <div className="flex-1 p-5 animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl shadow-sm border border-border p-6 space-y-8">
          
          <div className="space-y-6">
            <h3 className="font-bold text-[18px]">Get in Touch</h3>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[15px] text-foreground">Support Response Time</p>
                <p className="text-[14px] text-muted-foreground">We respond to all support requests within 1 business day.</p>
              </div>
            </div>
          </div>

          <hr className="border-border" />

          <div className="space-y-4">
            <h3 className="font-bold text-[18px]">Send a Message</h3>
            <div className="space-y-3 opacity-60 pointer-events-none">
              <div>
                <label className="text-[13px] font-bold text-gray-700 block mb-1">Name</label>
                <input type="text" disabled className="w-full h-11 border border-border rounded-xl px-4 bg-gray-50" placeholder="John Doe" />
              </div>
              <div>
                <label className="text-[13px] font-bold text-gray-700 block mb-1">Email</label>
                <input type="email" disabled className="w-full h-11 border border-border rounded-xl px-4 bg-gray-50" placeholder="john@example.com" />
              </div>
              <div>
                <label className="text-[13px] font-bold text-gray-700 block mb-1">Message</label>
                <textarea disabled className="w-full h-24 border border-border rounded-xl px-4 py-3 bg-gray-50 resize-none" placeholder="How can we help?"></textarea>
              </div>
              <button disabled className="w-full h-11 bg-gray-300 text-white font-bold rounded-xl mt-2">Send Message</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
