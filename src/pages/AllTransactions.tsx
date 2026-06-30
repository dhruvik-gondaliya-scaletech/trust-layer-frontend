import * as React from "react"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ChevronLeft, Search, Filter, ChevronDown, ChevronRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function AllTransactions() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const statusFilter = searchParams.get('status') || 'Completed'

  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")

  const allTransactions = [
    { id: 'TRUST-1024', name: 'Charizard Holo 1999', amount: 4300, date: 'Jun 20, 2026', type: 'buying', status: 'Completed', image: '/pokemon-main.jpg' },
    { id: 'TRUST-1025', name: 'Vintage Leica M6', amount: 2400, date: 'Jun 18, 2026', type: 'buying', status: 'Completed', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop' },
    { id: 'TRUST-1026', name: 'MacBook Pro M3', amount: 1850, date: 'Jun 15, 2026', type: 'selling', status: 'Completed', image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=200&auto=format&fit=crop' },
    { id: 'TRUST-1021', name: 'Rolex Submariner', amount: 9500, date: 'May 30, 2026', type: 'selling', status: 'Completed', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=200&auto=format&fit=crop' },
    { id: 'TRUST-1018', name: 'Sony A7IV Camera', amount: 2100, date: 'May 12, 2026', type: 'buying', status: 'Completed', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop' },
    
    // Active
    { id: 'TRUST-1030', name: 'PS5 Pro Console', amount: 650, date: 'Jun 28, 2026', type: 'selling', status: 'Active', image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=200&auto=format&fit=crop' },
    { id: 'TRUST-1031', name: 'Nike Air Max 97', amount: 180, date: 'Jun 29, 2026', type: 'buying', status: 'Active', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop' },
    { id: 'TRUST-1032', name: 'Apple Watch Ultra', amount: 750, date: 'Jun 29, 2026', type: 'selling', status: 'Active', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=200&auto=format&fit=crop' },
    
    // Awaiting Delivery
    { id: 'TRUST-1033', name: 'Herman Miller Chair', amount: 950, date: 'Jun 26, 2026', type: 'buying', status: 'Awaiting Delivery', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop' },
    
    // In Transit
    { id: 'TRUST-1034', name: 'Nintendo Switch OLED', amount: 320, date: 'Jun 25, 2026', type: 'selling', status: 'In Transit', image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=200&auto=format&fit=crop' },
    { id: 'TRUST-1035', name: 'DJI Mini 3 Pro', amount: 800, date: 'Jun 24, 2026', type: 'buying', status: 'In Transit', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop' },
  ]

  const transactions = allTransactions.filter(tx => tx.status === statusFilter)

  const filters = ["All", "Buying", "Selling"]

  const filteredTransactions = transactions.filter(tx => {
    // Filter logic
    if (activeFilter === "Buying" && tx.type !== "buying") return false
    if (activeFilter === "Selling" && tx.type !== "selling") return false

    // Search logic
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!tx.name.toLowerCase().includes(query) && !tx.id.toLowerCase().includes(query)) {
        return false
      }
    }
    return true
  })

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 rounded-full text-foreground hover:bg-gray-100 transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="font-bold text-[17px]">All Transactions</h1>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div>
          <h2 className="text-[22px] font-extrabold tracking-tight text-foreground">{statusFilter === 'Completed' ? 'Completed Deals' : `${statusFilter} Deals`}</h2>
          <p className="text-[14px] text-muted-foreground font-medium mt-0.5">{filteredTransactions.length} total {statusFilter.toLowerCase()} transactions</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-5 w-5 text-gray-400" />
          <Input 
            placeholder="Search by Product Name or Deal ID..." 
            className="pl-11 h-12 bg-white border-gray-200 rounded-xl font-medium shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-colors border ${
                activeFilter === filter 
                  ? 'bg-foreground text-white border-foreground' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex justify-between items-center">
          <span className="text-[14px] font-bold text-foreground">Results</span>
          <button className="flex items-center gap-1.5 text-[13px] font-bold text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            Newest First <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {filteredTransactions.map((tx) => (
            <Card 
              key={tx.id} 
              className="p-4 bg-white border border-gray-100 shadow-sm cursor-pointer hover:border-gray-300 transition-colors group"
              onClick={() => navigate(`/deal-details/${tx.id}`)}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200 shadow-inner">
                  <img src={tx.image} alt={tx.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-[15px] text-foreground truncate pr-2">{tx.name}</h3>
                    <span className="font-extrabold text-[15px]">${tx.amount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-medium text-gray-500 mb-2">{tx.id}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        tx.type === 'buying' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#2563EB]/10 text-[#2563EB]'
                      }`}>
                        {tx.type}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> {tx.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[12px] text-muted-foreground font-medium">
                      {tx.date}
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-foreground transition-colors ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12 text-gray-500 font-medium">
              No transactions found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
