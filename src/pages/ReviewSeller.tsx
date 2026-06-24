import * as React from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ChevronLeft, Star, ShieldCheck, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function ReviewSeller() {
  const navigate = useNavigate()
  const [rating, setRating] = React.useState(0)
  const [hoveredRating, setHoveredRating] = React.useState(0)
  const [comment, setComment] = React.useState("")
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = () => {
    setIsSubmitted(true)
    setTimeout(() => {
      navigate("/transaction-complete/TRUST-1024")
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen bg-white items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-4">Review Submitted</h2>
        <p className="text-muted-foreground leading-relaxed max-w-[300px]">
          Your review has been saved.<br/><br/>
          Reviews become visible once both parties have submitted feedback or after the review window closes.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="text-[15px] font-bold">Review Seller</span>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 px-6 pt-8 pb-32">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4 text-2xl font-bold text-gray-400">
            @
          </div>
          <h1 className="text-[22px] font-extrabold tracking-tight mb-2">Rate @vintage_vault</h1>
          <p className="text-[14px] text-muted-foreground">
            How was your experience with this seller?
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-10">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star 
                className={`w-10 h-10 ${
                  (hoveredRating || rating) >= star 
                    ? "fill-amber-400 text-amber-400" 
                    : "text-gray-300"
                } transition-colors duration-200`} 
              />
            </button>
          ))}
        </div>

        <div className="space-y-3 mb-8">
          <label className="text-[14px] font-bold text-gray-900">Leave a Comment (Optional)</label>
          <Textarea 
            placeholder="What went well? What could be improved?" 
            className="min-h-[140px] bg-white border-gray-200 text-[14px] rounded-xl resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-[13px] font-bold text-blue-900 mb-1">Anti-Retaliation Rules</p>
            <p className="text-[12px] text-blue-800/80 leading-relaxed font-medium">
              Your review remains hidden. Reviews become visible only when both parties submit reviews OR the 3-day review window expires.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] p-4 pb-6 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-40">
        <Button 
          className="w-full h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white" 
          onClick={handleSubmit}
          disabled={rating === 0}
        >
          Submit Review
        </Button>
      </div>
    </div>
  )
}
