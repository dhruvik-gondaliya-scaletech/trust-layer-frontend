import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownRight, Building2, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { Input } from "@/components/ui/input"

export default function Wallet() {
  const navigate = useNavigate()
  const [isWithdrawOpen, setIsWithdrawOpen] = React.useState(false)

  const transactions = [
    { id: 1, type: "deposit", amount: 8500, date: "Oct 16, 2023", desc: "Funds Released", status: "Completed" },
    { id: 2, type: "withdrawal", amount: -4200, date: "Oct 10, 2023", desc: "Withdrawal", status: "Processing" },
    { id: 3, type: "deposit", amount: 1250, date: "Oct 05, 2023", desc: "Deposit", status: "Completed" },
    { id: 4, type: "withdrawal", amount: -150, date: "Oct 01, 2023", desc: "Platform Fee", status: "Completed" },
    { id: 5, type: "deposit", amount: 450, date: "Sep 28, 2023", desc: "Refund", status: "Completed" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-[140px]">
      {/* Header */}
      <div className="flex items-center justify-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-2">
          <WalletIcon className="w-5 h-5 text-primary" />
          <span className="font-bold text-[15px]">Wallet</span>
        </div>
      </div>

      <div className="flex-1 px-5 pt-4 animate-in fade-in duration-500 space-y-6">

        {/* Main Balance Card */}
        <Card className="rounded-[20px] bg-gradient-to-br from-[#2563EB] to-[#1e3a8a] text-white shadow-xl shadow-[#2563EB]/20 border-none relative overflow-hidden">
          {/* Decorative background elements for premium feel */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-24 h-24 rounded-full bg-white/10 blur-2xl"></div>
          
          <div className="absolute top-0 right-0 p-6 opacity-10 z-0">
            <WalletIcon className="h-24 w-24" />
          </div>
          <CardContent className="p-6 relative z-10 space-y-6">
            <div>
              <p className="text-primary-foreground/80 text-sm font-medium">Available Balance</p>
              <h2 className="text-4xl font-bold mt-1">$1,250.00</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t border-primary-foreground/20 pt-4">
              <div>
                <p className="text-primary-foreground/80 text-xs font-medium">Funds On Hold</p>
                <p className="font-bold mt-1 text-[18px]">$8,500.00</p>
                <p className="text-[10px] text-primary-foreground/60 mt-1 leading-tight">Funds currently reserved for active transactions.</p>
              </div>
              <div>
                <p className="text-primary-foreground/80 text-xs font-medium">Ready to Withdraw</p>
                <p className="font-bold mt-1 text-[18px]">$1,250.00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-foreground">Recent Activity</h2>
            <Button variant="link" className="px-0 text-primary">See All</Button>
          </div>

          <Card>
            <CardContent className="p-0 divide-y">
              {transactions.map((tx) => (
                <div 
                  key={tx.id} 
                  onClick={() => navigate('/transactions')}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${
                      tx.type === 'deposit' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tx.type === 'deposit' ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-semibold text-[15px]">{tx.desc}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[12px] text-muted-foreground">{tx.date}</span>
                        <span className="text-[10px] text-muted-foreground">•</span>
                        <span className={`text-[12px] font-medium ${tx.status === 'Completed' ? 'text-green-600' : 'text-orange-500'}`}>{tx.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`font-bold text-[16px] ${tx.type === 'deposit' ? 'text-green-600' : 'text-foreground'}`}>
                    {tx.type === 'deposit' ? '+' : ''}{tx.amount < 0 ? `-$${Math.abs(tx.amount).toLocaleString()}` : `$${tx.amount.toLocaleString()}`}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h2 className="text-[18px] font-bold text-foreground">Payment Methods</h2>
          <Card>
            <CardContent className="p-0 divide-y">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-primary">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-[15px]">Chase Checking</p>
                    <p className="text-[13px] text-muted-foreground">****1234</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-primary font-semibold">Manage</Button>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-primary">
                    <WalletIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-[15px]">Visa Credit Card</p>
                    <p className="text-[13px] text-muted-foreground">****5678</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-primary font-semibold">Manage</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomActionBar>
        <div className="flex items-center gap-3 w-full">
          <Button variant="outline" onClick={() => navigate('/payment-methods')} className="flex-1 h-14 text-[15px] font-bold">
            Manage Bank Account
          </Button>
          <Button onClick={() => setIsWithdrawOpen(true)} className="flex-1 h-14 text-[15px] font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30">
            Withdraw Funds
          </Button>
        </div>
      </BottomActionBar>

      <BottomSheet
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        title="Withdraw Funds"
      >
        <div className="space-y-6">
          <div className="p-4 bg-muted/50 rounded-lg flex justify-between items-center">
            <span className="text-muted-foreground">Available to withdraw</span>
            <span className="font-bold text-[18px]">$1,250.00</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-muted-foreground">$</span>
                <Input className="pl-8 bg-card rounded-xl" type="number" placeholder="0.00" defaultValue="1250.00" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Transfer to</label>
              <div className="border rounded-2xl p-4 flex items-center gap-4 border-primary bg-primary/5">
                <div className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Chase Checking</p>
                  <p className="text-xs text-muted-foreground">****1234 • Typically 1-3 days</p>
                </div>
                <div className="h-5 w-5 rounded-full border border-primary flex items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full h-14 text-[16px] mt-4" onClick={() => setIsWithdrawOpen(false)}>
            Confirm Withdrawal
          </Button>
        </div>
      </BottomSheet>
    </div>
  )
}
