import * as React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { ChevronLeft, Star, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function ReviewSeller() {
  const navigate = useNavigate()
  const location = useLocation()
  const [rating, setRating] = React.useState(0)
  const [hoveredRating, setHoveredRating] = React.useState(0)
  const [comment, setComment] = React.useState("")
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const userMode = new URLSearchParams(location.search).get('mode') === 'buyer' ? 'buyer' : 'seller'
  const isReviewingSeller = userMode === 'buyer'
  
  const headerText = isReviewingSeller ? 'Review Seller' : 'Review Buyer'
  const targetUsername = isReviewingSeller ? '@vintage_vault' : '@alex_johnson'
  const descriptionText = isReviewingSeller 
    ? 'Your transaction has been completed successfully.\nPlease rate your experience with this seller.' 
    : 'Your transaction has been completed successfully.\nPlease rate your experience with this buyer.'
  const placeholderText = isReviewingSeller ? 'Share your experience with this seller...' : 'Share your experience with this buyer...'

  const handleSubmit = () => {
    setIsSubmitted(true)
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
        <h2 className="text-[22px] font-bold mb-3">Review Submitted</h2>
        <p className="text-[15px] text-muted-foreground leading-relaxed max-w-[300px] mb-8">
          Thank you for sharing your feedback.<br/>
          Your review has been added successfully.
        </p>
        <Button 
          className="w-full max-w-[300px] h-[56px] text-[16px] font-bold rounded-2xl bg-primary text-white" 
          onClick={() => navigate(`/dashboard?mode=${userMode}`)}
        >
          Back to Dashboard
        </Button>
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
        <span className="text-[15px] font-bold">{headerText}</span>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 px-5 pt-8 animate-in fade-in duration-500">
        <div className="flex flex-col items-center text-center space-y-2 mb-8">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-2">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-[18px] font-bold text-gray-900">Transaction Completed</h2>
          <p className="text-[14px] text-gray-500 leading-relaxed max-w-[280px] whitespace-pre-line">
            {descriptionText}
          </p>
        </div>
        
        <div className="text-center space-y-2 mb-8">
          <div className="h-16 w-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3 overflow-hidden shadow-sm border-2 border-white ring-1 ring-gray-100">
            {isReviewingSeller ? (
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" alt="Seller" className="w-full h-full object-cover" />
            ) : (
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop" alt="Buyer" className="w-full h-full object-cover" />
            )}
          </div>
          <h1 className="text-[18px] font-extrabold tracking-tight mb-2">{targetUsername}</h1>
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
            placeholder={placeholderText} 
            className="min-h-[140px] bg-white border-gray-200 text-[14px] rounded-xl resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
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
