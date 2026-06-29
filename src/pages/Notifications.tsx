import * as React from "react"
import { useNavigate } from "react-router-dom"
import { 
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Notifications() {
  const navigate = useNavigate()
  const [filter, setFilter] = React.useState<'all' | 'selling' | 'buying'>('selling')
  const [toasts, setToasts] = React.useState<{ id: number, message: string }[]>([])

  type NotificationItem = {
    id: number;
    role: 'selling' | 'buying';
    title: string;
    productName: string;
    dealId: string;
    person?: { roleLabel: string; name: string };
    highlight?: { label: string; text: string };
    customMessage?: string;
    message: string;
    ctaText?: string;
    time: string;
    isRead: boolean;
  };

  const initialData: NotificationItem[] = [
    {
      id: 4,
      role: 'selling',
      title: 'Buyer confirmed delivery',
      productName: 'Charizard Holo 1999',
      dealId: 'TRUST-1024',
      person: { roleLabel: 'Buyer', name: 'Michael Smith' },
      message: 'The buyer confirmed the item was received successfully. Funds have now been released to your TrustLayer Wallet.',
      time: '6 days ago',
      isRead: true
    },
    {
      id: 3,
      role: 'selling',
      title: 'Payment received',
      productName: 'Charizard Holo 1999',
      dealId: 'TRUST-1024',
      person: { roleLabel: 'Buyer', name: 'Michael Smith' },
      message: 'Payment has been securely received. Prepare your item and upload tracking details.',
      time: '7 days ago',
      isRead: true
    },
    {
      id: 2,
      role: 'selling',
      title: 'Buyer requested listing updates',
      productName: 'Charizard Holo 1999',
      dealId: 'TRUST-1024',
      person: { roleLabel: 'Buyer', name: 'Michael Smith' },
      highlight: { label: 'Reason', text: 'Need additional photos' },
      message: 'The buyer paused the purchase until the requested updates are completed.',
      time: '8 days ago',
      isRead: true
    },
    {
      id: 1,
      role: 'selling',
      title: 'Deal published successfully',
      productName: 'Charizard Holo 1999',
      dealId: 'TRUST-1024',
      message: 'Your deal is now live and ready to share. Send the secure TrustLayer link to your buyer.',
      time: '8 days ago',
      isRead: true
    }
  ]

  const [notifications, setNotifications] = React.useState(initialData)

  const showToast = (message: string) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
    showToast("All notifications marked as read")
  }

  const handleNotificationClick = (notification: typeof initialData[0]) => {
    // If unread, mark it as read when tapped
    if (!notification.isRead) {
      setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n))
    }
    
    switch (notification.title) {
      case 'Deal published successfully':
      case 'Buyer confirmed delivery':
      case 'Review received':
      case 'Buyer approved deal':
        navigate(`/deal-details/${notification.dealId}`);
        break;
      case 'Buyer requested listing updates':
        navigate(`/review-feedback/${notification.dealId}`);
        break;
      case 'Payment received':
        navigate(`/add-tracking/${notification.dealId}`);
        break;
      case 'Shipment uploaded':
        navigate(`/timeline/${notification.dealId}`);
        break;
      default:
        navigate(`/deal-details/${notification.dealId}`);
    }
  }

  // Sort by reverse order based on ID for visual timeline effect
  const sortedData = [...notifications].sort((a, b) => b.id - a.id)
  
  const filteredData = sortedData.filter(item => filter === 'all' || item.role === filter)

  const unreadCount = notifications.filter(i => !i.isRead).length
  const allCount = notifications.length
  const sellingCount = notifications.filter(i => i.role === 'selling').length
  const buyingCount = notifications.filter(i => i.role === 'buying').length

  const getPeriod = (timeStr: string) => {
    const lower = timeStr.toLowerCase()
    if (lower.includes('just now') || lower.includes('min') || lower.includes('hour')) return 'Today'
    if (lower.includes('yesterday')) return 'Yesterday'
    if (lower.includes('day')) {
      const match = lower.match(/\d+/)
      if (match) {
        const days = parseInt(match[0], 10)
        if (days <= 7) return 'Last 7 Days'
      }
    }
    return 'Earlier'
  }

  const periodOrder = ['Today', 'Yesterday', 'Last 7 Days', 'Earlier']
  
  const groupedData = filteredData.reduce((acc, item) => {
    const period = getPeriod(item.time)
    if (!acc[period]) acc[period] = []
    acc[period].push(item)
    return acc
  }, {} as Record<string, typeof initialData>)

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 relative min-h-[64px]">
          <div className="flex-1 flex justify-start">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-[2] flex justify-center">
            <span className="font-bold text-[17px]">Notifications</span>
          </div>

          <div className="flex-1 flex justify-end">
            {/* Action removed from here */}
          </div>
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
              disabled
              className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-colors relative z-10 text-gray-400 opacity-40 cursor-not-allowed`}
            >
              All (0)
            </button>
            <button
              className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-colors relative z-10 text-blue-600`}
            >
              Selling ({sellingCount})
            </button>
            <button
              disabled
              className={`flex-1 py-2 text-[13px] font-bold rounded-lg transition-colors relative z-10 text-gray-400 opacity-40 cursor-not-allowed`}
            >
              Buying (0)
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 pt-2 pb-[140px] animate-in fade-in duration-300">
        {filteredData.length === 0 ? (
          <div className="p-8 mt-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🎉</span>
            </div>
            <p className="font-extrabold text-[18px] text-gray-900 mb-2">You're all caught up</p>
            <p className="text-[14px] text-gray-500 font-medium leading-relaxed max-w-[250px]">
              No new updates in this view. We'll notify you when something happens.
            </p>
          </div>
        ) : (
          <div className="space-y-6 pt-2">
            {periodOrder.map((period, periodIdx) => {
              const items = groupedData[period]
              if (!items || items.length === 0) return null
              
              // Only show the "Mark all read" button on the first rendered group header
              const isFirstGroup = periodOrder.findIndex(p => groupedData[p] && groupedData[p].length > 0) === periodIdx

              return (
                <div key={period} className="space-y-4">
                  {/* Group Header */}
                  <div className="flex items-center justify-between sticky top-[132px] z-10 bg-[#F8FAFC] pt-[28px] pb-[14px] -mx-4 px-4 shadow-[0_10px_10px_-10px_#F8FAFC]">
                    <h3 className="text-[20px] font-semibold text-gray-900">{period}</h3>
                    {isFirstGroup && unreadCount > 0 && (
                      <button 
                        onClick={handleMarkAllAsRead}
                        className="text-[14px] font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        Mark all as read
                      </button>
                    )}
                  </div>
                  
                  {/* Cards */}
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={item.id} 
                        onClick={() => item.title !== 'Deal published successfully' && handleNotificationClick(item)}
                        className={`p-[18px] pr-4 rounded-[18px] border relative overflow-hidden flex gap-3 items-center transition-all shadow-[0_2px_10px_rgba(15,23,42,0.05)]
                          ${item.isRead ? 'bg-[#FCFCFD] border-[#EEF2F7]' : 'bg-white border-[#E9EDF5]'}
                          ${item.title !== 'Deal published successfully' ? 'cursor-pointer active:scale-[0.98]' : ''}
                        `}
                      >

                        {/* Unread indicator dot */}
                        {!item.isRead && (
                          <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                        
                        <div className="flex-1 min-w-0 pr-3 pb-1">
                          <div className="flex justify-between items-start mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <div className={`w-2 h-2 rounded-sm ${item.role === 'selling' ? 'bg-[#2563EB]' : 'bg-[#16A34A]'}`}></div>
                              <span className={`text-[11px] font-extrabold uppercase tracking-wider ${item.role === 'selling' ? 'text-[#2563EB]' : 'text-[#16A34A]'}`}>
                                {item.role}
                              </span>
                            </div>
                            <span className={`text-[12px] pr-3 shrink-0 ${!item.isRead ? 'text-primary font-bold' : 'text-gray-400 font-medium'}`}>{item.time}</span>
                          </div>
                          
                          <div className={`mb-2 ${item.isRead ? 'opacity-90' : ''}`}>
                            <p className={`text-[15px] leading-snug pr-3 ${!item.isRead ? 'text-gray-900 font-bold' : 'text-gray-700 font-semibold'}`}>
                              {item.title}
                            </p>
                          </div>
                          
                          <div className={`flex items-center gap-2 mb-3 ${item.isRead ? 'opacity-70' : ''}`}>
                            <p className="text-[13px] font-bold text-gray-700 truncate max-w-[140px]">{item.productName}</p>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <p className="text-[12px] font-bold text-gray-400">{item.dealId}</p>
                          </div>
                          
                          {(item.person || item.highlight) && (
                            <div className="bg-gray-50 rounded-xl p-3 mb-3 border border-gray-100 relative pr-8">
                              {item.person && (
                                <div className={`flex justify-between items-center ${item.highlight ? 'mb-2' : ''}`}>
                                  <span className="text-[12px] text-gray-500 font-medium">{item.person.roleLabel}:</span>
                                  <span className="text-[12px] text-gray-900 font-bold">{item.person.name}</span>
                                </div>
                              )}
                              {item.highlight && (
                                <div className="flex justify-between items-start">
                                  <span className="text-[12px] text-gray-500 font-medium shrink-0 mr-2">{item.highlight.label}:</span>
                                  <span className="text-[12px] text-red-600 font-bold text-right">{item.highlight.text}</span>
                                </div>
                              )}
                              {item.customMessage && (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <div className="text-[13px] text-gray-600 italic border-l-2 border-gray-300 pl-3 py-0.5">
                                    "{item.customMessage}"
                                  </div>
                                </div>
                              )}
                              <ChevronRight className="absolute right-3 top-[13px] w-4 h-4 text-gray-300 stroke-[3]" />
                            </div>
                          )}
                          
                          <div className={item.person || item.highlight ? 'mb-1' : (item.isRead ? 'opacity-70 mb-1 relative pr-6' : 'mb-1 relative pr-6')}>
                            <p className={`text-[14px] leading-relaxed line-clamp-2 ${!item.isRead ? 'text-gray-700 font-medium' : 'text-gray-500 font-medium'}`}>
                              {item.message}
                            </p>
                            {(!item.person && !item.highlight && item.title !== 'Deal published successfully') && (
                              <ChevronRight className="absolute right-0 top-[2px] w-4 h-4 text-gray-300 stroke-[3]" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Toast Overlay */}
      <div className="fixed bottom-6 left-0 right-0 z-[100] flex flex-col items-center gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 w-max max-w-[380px]"
            >
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-[14px] font-bold">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  )
}
