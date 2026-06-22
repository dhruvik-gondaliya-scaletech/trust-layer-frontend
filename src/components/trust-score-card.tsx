import * as React from "react"
import { motion } from "framer-motion"
import { Shield, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { Button } from "@/components/ui/button"

interface TrustScoreCardProps {
  score: number
  previousScore?: number
  label?: string
  onClick?: () => void
}

export function TrustScoreCard({ score, previousScore = 0, label = "Trust Score", onClick }: TrustScoreCardProps) {
  const [displayScore, setDisplayScore] = React.useState(previousScore)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  React.useEffect(() => {
    // Simple count-up animation
    let start = previousScore
    const end = score
    if (start === end) return

    const duration = 1500 // 1.5 seconds
    const incrementTime = 30
    const step = (end - start) / (duration / incrementTime)

    const timer = setInterval(() => {
      start += step
      if ((step > 0 && start >= end) || (step < 0 && start <= end)) {
        start = end
        clearInterval(timer)
      }
      setDisplayScore(Math.round(start))
    }, incrementTime)

    return () => clearInterval(timer)
  }, [score, previousScore])

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      setIsModalOpen(true)
    }
  }

  // Determine color based on score (e.g. > 80 green, > 50 amber, else red)
  // But requirements say "Trust Score highlights" are Primary (Trust Blue)
  return (
    <>
      <Card onClick={handleClick} className="cursor-pointer hover:shadow-md transition-shadow">
        <CardContent className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[14px] text-muted-foreground">{label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-[24px] font-bold text-primary">{displayScore}</span>
                <span className="text-[14px] font-medium text-muted-foreground">/ 100</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[12px] text-primary font-medium bg-secondary px-2 py-1 rounded-full mb-1">
              Excellent
            </span>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      <BottomSheet
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Why This Score?"
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex h-20 w-20 rounded-full bg-secondary items-center justify-center text-primary mb-4">
              <span className="text-4xl font-bold">{score}</span>
            </div>
            <p className="text-muted-foreground text-[14px]">
              TrustLayer scores are calculated based on verified information and successful transactions.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-[16px]">Score Breakdown</h4>
            
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-[14px]">Email Verified</span>
              <span className="text-success font-semibold">+20</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-[14px]">Phone Verified</span>
              <span className="text-success font-semibold">+20</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-[14px]">Video Uploaded</span>
              <span className="text-success font-semibold">+15</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-[14px]">Certification Uploaded</span>
              <span className="text-success font-semibold">+15</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-[14px]">Completed Transactions</span>
              <span className="text-success font-semibold">+15</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-[14px]">Positive Reviews</span>
              <span className="text-success font-semibold">+11</span>
            </div>
          </div>

          <Button className="mt-4" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </div>
      </BottomSheet>
    </>
  )
}
