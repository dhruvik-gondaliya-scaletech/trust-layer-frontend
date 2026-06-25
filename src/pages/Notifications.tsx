import * as React from "react"
import { useNavigate } from "react-router-dom"
import { 
  ChevronLeft, 
  CheckCircle2, 
  Info,
  AlertCircle, 
  Clock
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Notifications() {
  const navigate = useNavigate()
  const [filter, setFilter] = React.useState<'all' | 'selling' | 'buying'>('all')

  const actionRequiredData = [
    {
      id: 1,
      role: 'selling',
      type: 'orange',
      title: 'Upload Tracking',
      dealId: 'TRUST-1024',
      description: 'Buyer funded your deal.',
      time: 'Just now',
      cta: 'Add Tracking',
      Icon: Clock,
    },
    {
      id: 2,
      role: 'buying',
      type: 'red',
      title: 'Item Shipped',
      dealId: 'TRUST-1050',
      description: 'Seller has shipped your item.',
      time: '2 hours ago',
      cta: 'Track Package',
      Icon: AlertCircle,
    }
  ]

  const recentUpdatesData = [
    {
      id: 3,
      role: 'selling',
      type: 'green',
      title: 'Item delivered',
      dealId: 'TRUST-0992',
      description: 'Buyer has received the item.',
      time: 'Yesterday',
      Icon: CheckCircle2,
    },
    {
      id: 4,
      role: 'buying',
      type: 'blue',
      title: 'Funds released',
      dealId: 'TRUST-0845',
      description: 'Payout is on the way to your bank.',
      time: '2 days ago',
      Icon: Info,
    }
  ]

  const actionRequired = actionRequiredData.filter(item => filter === 'all' || item.role === filter)
  const recentUpdates = recentUpdatesData.filter(item => filter === 'all' || item.role === filter)

  const allCount = actionRequiredData.length + recentUpdatesData.length
  const sellingCount = [...actionRequiredData, ...recentUpdatesData].filter(i => i.role === 'selling').length
  const buyingCount = [...actionRequiredData, ...recentUpdatesData].filter(i => i.role === 'buying').length

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-center p-4 border-b border-gray-100 relative">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <span className="font-bold text-[17px]">Activity</span>
        </div>

        {/* Filter Segmented Control */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex bg-gray-100 p-1 rounded-xl w-full relative">
            <motion.div
              layoutId="activity-filter-bg"
              className={`absolute top-1 bottom-1 w-[calc(33.333%-4px)] rounded-lg bg-white shadow-sm
                ${filter === 'all' ? 'left-1' : filter === 'selling' ? 'left-[calc(33.333%+2px)]' : 'left-[calc(66.666%+2px)]'}
              `}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
            
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-colors relative z-10 ${filter === 'all' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              All ({allCount})
            </button>
            <button
              onClick={() => setFilter('selling')}
              className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-colors relative z-10 ${filter === 'selling' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Selling ({sellingCount})
            </button>
            <button
              onClick={() => setFilter('buying')}
              className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-colors relative z-10 ${filter === 'buying' ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Buying ({buyingCount})
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 pt-6 pb-[140px] animate-in fade-in duration-300">
        {actionRequired.length === 0 && recentUpdates.length === 0 ? (
          <div className="p-8 mt-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🎉</span>
            </div>
            <p className="font-extrabold text-[18px] text-gray-900 mb-2">You're all caught up</p>
            <p className="text-[14px] text-gray-500 font-medium leading-relaxed max-w-[250px]">
              No new updates in this view. We'll notify you when something needs your attention.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {actionRequired.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-[14px] font-extrabold text-gray-400 uppercase tracking-wider px-1">Action Required</h3>
                <div className="space-y-3">
                  {actionRequired.map((item) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.id} 
                      className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden"
                    >
                      <div className={`absolute top-0 left-0 w-1.5 h-full ${item.role === 'selling' ? 'bg-blue-600' : 'bg-green-600'}`}></div>
                      <div className="pl-2">
                        {/* Role Badge */}
                        <div className="flex items-center gap-1.5 mb-3">
                          <div className={`w-2 h-2 rounded-sm ${item.role === 'selling' ? 'bg-blue-600' : 'bg-green-600'}`}></div>
                          <span className={`text-[11px] font-extrabold uppercase tracking-wider ${item.role === 'selling' ? 'text-blue-600' : 'text-green-600'}`}>
                            {item.role}
                          </span>
                        </div>

                        <div className="flex gap-4">
                          <div className={`mt-0.5 shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            item.type === 'orange' ? 'bg-orange-50 text-orange-500' :
                            item.type === 'red' ? 'bg-rose-50 text-rose-500' :
                            item.type === 'green' ? 'bg-emerald-50 text-emerald-500' :
                            'bg-blue-50 text-blue-500'
                          }`}>
                            <item.Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-0.5">
                              <p className="text-[15px] text-gray-900 font-extrabold truncate pr-2">{item.title}</p>
                              <span className="text-[12px] text-gray-400 font-bold shrink-0">{item.time}</span>
                            </div>
                            {item.dealId && <p className="text-[12px] font-bold text-gray-400 mb-1">{item.dealId}</p>}
                            <p className="text-[14px] text-gray-500 font-medium mb-4">{item.description}</p>
                            <Button className="w-full h-10 text-[14px] font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                              {item.cta}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {recentUpdates.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-[14px] font-extrabold text-gray-400 uppercase tracking-wider px-1">Recent Updates</h3>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
                  {recentUpdates.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors flex gap-4 relative">
                      <div className={`absolute top-0 left-0 w-1 h-full ${item.role === 'selling' ? 'bg-blue-600' : 'bg-green-600'}`}></div>
                      <div className={`mt-1 shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-gray-100 bg-white shadow-sm ${
                        item.type === 'orange' ? 'text-orange-500' :
                        item.type === 'red' ? 'text-rose-500' :
                        item.type === 'green' ? 'text-emerald-500' :
                        'text-blue-500'
                      }`}>
                        <item.Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className={`text-[10px] font-extrabold uppercase tracking-wider ${item.role === 'selling' ? 'text-blue-600' : 'text-green-600'}`}>
                            {item.role}
                          </span>
                        </div>
                        <div className="flex justify-between items-start mb-0.5">
                          <p className="text-[14px] text-gray-900 font-bold truncate pr-2">{item.title}</p>
                          <span className="text-[12px] text-gray-400 font-bold shrink-0">{item.time}</span>
                        </div>
                        {item.dealId && <p className="text-[12px] font-bold text-gray-400 mb-0.5">{item.dealId}</p>}
                        <p className="text-[13px] text-gray-500 font-medium">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
