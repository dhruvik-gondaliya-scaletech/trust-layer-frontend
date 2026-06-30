import React from "react"
import { Check, Activity } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type TransactionState = 
  | 'Buyer Reviewing Deal'
  | 'Buyer Approved Deal'
  | 'Payment Completed'
  | 'Seller Preparing Shipment'
  | 'Tracking Uploaded'
  | 'Buyer Receives Package'
  | 'Buyer Confirmed Delivery'
  | 'Review Phase'
  | 'Transaction Completed'
  | 'Deal Declined';

interface TransactionProgressProps {
  state: TransactionState;
  userRole?: 'buyer' | 'seller';
  theme?: {
    text: string;
    bg: string;
  };
}

export function TransactionProgress({ state, userRole = 'buyer', theme = { text: "text-primary", bg: "bg-primary" } }: TransactionProgressProps) {
  let labels: string[] = []
  let filledCount = 0

  switch (state) {
    case 'Buyer Reviewing Deal':
      labels = ['Deal Published', 'Buyer Reviews', 'Buyer Approves', 'Payment', 'Seller Ships']
      filledCount = 1
      break;
    case 'Buyer Approved Deal':
      labels = ['Deal Published', 'Buyer Reviews', 'Buyer Approves', 'Payment', 'Seller Ships']
      filledCount = 2
      break;
    case 'Payment Completed':
      labels = ['Deal Published', 'Buyer Reviews', 'Payment Completed', 'Seller Ships', 'Tracking Added']
      filledCount = 3
      break;
    case 'Seller Preparing Shipment':
      labels = ['Payment Completed', 'Preparing Shipment', 'Tracking Added', 'Confirm Delivery', 'Funds Released']
      filledCount = 2
      break;
    case 'Tracking Uploaded':
      labels = ['Payment Received', 'Tracking Added', 'Buyer Tracks', 'Confirm Delivery', 'Funds Released']
      filledCount = 3
      break;
    case 'Buyer Receives Package':
      labels = ['Tracking Added', 'Buyer Tracks', 'Confirm Delivery', 'Review', 'Funds Released']
      filledCount = 3
      break;
    case 'Buyer Confirmed Delivery':
      labels = ['Tracking Added', 'Buyer Tracks', 'Confirm Delivery', 'Funds Released', 'Completed']
      filledCount = 3
      break;
    case 'Review Phase':
      labels = ['Tracking Added', 'Confirm Delivery', 'Buyer Review', 'Seller Review', 'Funds Released']
      filledCount = userRole === 'seller' ? 4 : 3
      break;
    case 'Transaction Completed':
      labels = ['Tracking Added', 'Confirm Delivery', 'Funds Released', 'Transaction', 'Completed']
      filledCount = 5
      break;
    case 'Deal Declined':
      labels = ['Deal Published', 'Buyer Reviewed', 'Declined', 'Seller Updates', 'Republished']
      filledCount = 3
      break;
    default:
      labels = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']
      filledCount = 0
  }

  const widthMap: Record<number, string> = {
    1: '0%',
    2: '25%',
    3: '50%',
    4: '75%',
    5: '100%',
  }

  return (
    <Card className="p-5 border-gray-100 shadow-sm rounded-2xl w-full">
      <h3 className="font-bold text-[16px] mb-5 text-gray-900 flex items-center gap-2">
        <Activity className={cn("w-4 h-4", theme.text)} /> Progress
      </h3>
      
      <div className="flex justify-between items-start relative">
        {/* Connecting line */}
        <div className="absolute left-[10%] right-[10%] top-4 -translate-y-1/2 h-[2px] bg-gray-100 z-0">
          <div 
            className={cn("h-full transition-all duration-500", theme.bg)}
            style={{ width: widthMap[filledCount] || '0%' }}
          />
        </div>
        
        {labels.map((label, index) => {
          const completed = index < filledCount;
          return (
            <div key={index} className="relative z-10 flex flex-col items-center gap-2 group" style={{ width: '20%' }}>
              <div className={cn(
                "w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-[12px] font-bold leading-none transition-colors shadow-sm",
                completed 
                  ? cn("border-2 border-white text-white", theme.bg) 
                  : "bg-gray-100 text-gray-400 border-2 border-white"
              )}>
                {completed ? <Check className="w-4 h-4" strokeWidth={2.5} /> : <span>{index + 1}</span>}
              </div>
              <div className="text-center w-full px-0.5">
                <p className={cn("text-[10px] font-bold leading-tight mx-auto", completed ? "text-gray-900" : "text-gray-400")}>
                  {label}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
