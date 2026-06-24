import * as React from "react"
import { useNavigate } from "react-router-dom"
import { 
  ArrowLeft, 
  CheckCircle2, 
  DollarSign, 
  Package, 
  AlertCircle, 
  Bell,
  Truck
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  icon: React.ReactNode
  title: string
  dealName: string
  time: string
  actionText: string
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    icon: <DollarSign className="w-5 h-5 text-blue-600" />,
    title: "Buyer funded your deal.",
    dealName: "Charizard Holo 1999",
    time: "10 mins ago",
    actionText: "Add tracking information"
  },
  {
    id: "n2",
    icon: <Truck className="w-5 h-5 text-blue-600" />,
    title: "Seller uploaded tracking.",
    dealName: "Vintage Leica M6",
    time: "2 hours ago",
    actionText: "Track package"
  },
  {
    id: "n3",
    icon: <Package className="w-5 h-5 text-blue-600" />,
    title: "Package delivered.",
    dealName: "MacBook Pro M3",
    time: "5 hours ago",
    actionText: "Review item"
  },
  {
    id: "n4",
    icon: <AlertCircle className="w-5 h-5 text-blue-600" />,
    title: "Dispute updated.",
    dealName: "Pokemon Collection",
    time: "1 day ago",
    actionText: "View response"
  },
  {
    id: "n5",
    icon: <DollarSign className="w-5 h-5 text-blue-600" />,
    title: "Funds released.",
    dealName: "Vintage Rolex",
    time: "2 days ago",
    actionText: "View transaction"
  },
  {
    id: "n6",
    icon: <CheckCircle2 className="w-5 h-5 text-blue-600" />,
    title: "Transaction completed.",
    dealName: "Charizard Holo 1999 Base Set",
    time: "3 days ago",
    actionText: "View receipt"
  }
]

export default function Notifications() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 shadow-sm border-b border-gray-100 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-full border border-gray-200 shadow-sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Button>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-[24px] font-extrabold text-foreground leading-tight">Notifications</h1>
            <p className="text-[13px] text-muted-foreground font-medium mt-1">Stay updated on your active deals and transactions.</p>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 p-5 pb-24 overflow-y-auto">
        <AnimatePresence>
          {mockNotifications.length > 0 ? (
            <div className="space-y-4">
              {mockNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white p-4 rounded-[20px] shadow-sm border border-gray-100 flex gap-4 items-start"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                    {notification.icon}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <h3 className="text-[15px] font-bold text-foreground leading-tight">
                        {notification.title}
                      </h3>
                      <span className="text-[11px] font-bold text-gray-400 shrink-0 mt-0.5">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-[13px] text-gray-500 font-semibold mb-3">
                      {notification.dealName}
                    </p>
                    <Button 
                      size="sm" 
                      className="h-8 px-4 text-[12px] font-bold rounded-lg bg-gray-50 text-gray-800 border border-gray-200 hover:bg-gray-100 shadow-none w-full sm:w-auto"
                    >
                      {notification.actionText}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center pt-16 pb-8 px-4 text-center"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
                <Bell className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-[18px] font-extrabold text-foreground mb-2">You're All Caught Up</h3>
              <p className="text-[14px] text-muted-foreground font-medium max-w-[240px] leading-relaxed">
                No new notifications right now.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
