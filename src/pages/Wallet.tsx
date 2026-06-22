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
    { id: 1, type: "deposit", amount: 8500, date: "Oct 16, 2023", desc: "Funds Released: Rolex Submariner" },
    { id: 2, type: "withdrawal", amount: -4200, date: "Oct 10, 2023", desc: "Withdrawal to Chase ***1234" },
    { id: 3, type: "deposit", amount: 1250, date: "Oct 05, 2023", desc: "Funds Released: Omega Speedmaster" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-[140px]">
      {/* Header */}
      <div className="flex items-center justify-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)} 
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
        <Card className="bg-primary text-primary-foreground border-none relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <WalletIcon className="h-24 w-24" />
          </div>
          <CardContent className="p-6 relative z-10 space-y-6">
            <div>
              <p className="text-primary-foreground/80 text-sm font-medium">Available Balance</p>
              <h2 className="text-4xl font-bold mt-1">$1,250.00</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t border-primary-foreground/20 pt-4">
              <div>
                <p className="text-primary-foreground/80 text-xs">Pending Escrow</p>
                <p className="font-semibold mt-0.5">$8,500.00</p>
              </div>
              <div>
                <p className="text-primary-foreground/80 text-xs">Withdrawable</p>
                <p className="font-semibold mt-0.5">$1,250.00</p>
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
                <div key={tx.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                      tx.type === 'deposit' ? 'bg-success/10 text-success' : 'bg-gray-100 text-primary'
                    }`}>
                      {tx.type === 'deposit' ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-medium text-[15px]">{tx.desc}</p>
                      <p className="text-[13px] text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <div className={`font-semibold text-[15px] ${tx.type === 'deposit' ? 'text-success' : ''}`}>
                    {tx.type === 'deposit' ? '+' : ''}{tx.amount < 0 ? `-$${Math.abs(tx.amount).toLocaleString()}` : `$${tx.amount.toLocaleString()}`}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomActionBar>
        <Button onClick={() => setIsWithdrawOpen(true)} className="w-full h-14 text-[16px]">
          Withdraw Funds
        </Button>
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
