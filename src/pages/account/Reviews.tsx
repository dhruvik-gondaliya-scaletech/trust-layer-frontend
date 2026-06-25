import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function Reviews() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = React.useState("received")

  const receivedReviews = [
    { id: 1, name: "SarahJenkins", avatar: "https://i.pravatar.cc/150?u=sarah", rating: 5, date: "Oct 24, 2023", dealId: "TRUST-1024", text: "Incredible communication and fast shipping! Item was exactly as described." },
    { id: 2, name: "MikeT", avatar: "https://i.pravatar.cc/150?u=mike", rating: 5, date: "Sep 15, 2023", dealId: "TRUST-0891", text: "Great buyer. Paid immediately and was a pleasure to do business with." },
  ]

  const givenReviews: any[] = [] // empty state example

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <div className="flex items-center justify-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="font-bold text-[17px]">Reviews</span>
      </div>

      <div className="bg-white px-5 py-6 border-b border-gray-100 flex flex-col items-center justify-center">
        <h2 className="text-[14px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Average Rating</h2>
        <h1 className="text-[42px] font-bold text-foreground leading-none">4.9</h1>
        <div className="flex items-center gap-1 mt-2 text-yellow-400">
          <Star className="w-5 h-5 fill-current" />
          <Star className="w-5 h-5 fill-current" />
          <Star className="w-5 h-5 fill-current" />
          <Star className="w-5 h-5 fill-current" />
          <Star className="w-5 h-5 fill-current text-yellow-400/50" />
        </div>
      </div>

      <div className="flex-1 px-5 pt-6 animate-in fade-in duration-300">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full h-12 bg-gray-200/50 p-1 rounded-xl mb-6">
            <TabsTrigger value="received" className="flex-1 rounded-lg font-bold text-[14px]">Received</TabsTrigger>
            <TabsTrigger value="given" className="flex-1 rounded-lg font-bold text-[14px]">Given</TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="space-y-4 outline-none pb-10">
            {receivedReviews.length > 0 ? (
              receivedReviews.map(review => (
                <Card key={review.id} className="rounded-2xl border-gray-100 shadow-sm overflow-hidden bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full bg-gray-100 object-cover" />
                        <div>
                          <p className="font-bold text-[15px]">{review.name}</p>
                          <p className="text-[12px] text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-yellow-400 gap-0.5">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                      </div>
                    </div>
                    <p className="text-[14px] text-foreground leading-relaxed">"{review.text}"</p>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[12px] text-muted-foreground">Deal ID: <span className="font-bold">{review.dealId}</span></span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="font-bold text-[16px]">No Reviews Yet</h3>
                <p className="text-[14px] text-muted-foreground mt-1">When you complete transactions, reviews will appear here.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="given" className="space-y-4 outline-none pb-10">
            {givenReviews.length > 0 ? (
              givenReviews.map(review => (
                <Card key={review.id} className="rounded-2xl border-gray-100 shadow-sm overflow-hidden bg-white">
                  <CardContent className="p-4">
                    {/* Same card structure if we had given reviews */}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="font-bold text-[16px]">No Reviews Given</h3>
                <p className="text-[14px] text-muted-foreground mt-1">You haven't left any reviews yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
