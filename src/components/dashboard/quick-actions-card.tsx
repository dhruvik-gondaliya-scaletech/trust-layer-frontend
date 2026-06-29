import * as React from "react"
import { useNavigate } from "react-router-dom"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export type DealStatus = 'draft' | 'open' | 'funded' | 'shipped' | 'delivered' | 'disputed' | 'return_approved' | 'return_shipped' | 'return_delivered' | 'return_completed' | 'cancelled' | 'completed' | 'declined';

export interface QuickActionDeal {
  id: string;
  name: string;
  status: DealStatus;
  imageUrl?: string;
}

interface QuickActionsCardProps {
  userMode: 'buyer' | 'seller';
  deals: QuickActionDeal[];
}

interface QuickActionContent {
  statusLabel: string;
  title?: string;
  ctaText: string;
  ctaRoute: string;
}

function getQuickActionContent(status: DealStatus, userMode: 'buyer' | 'seller', id: string): QuickActionContent {
  if (userMode === 'seller') {
    switch (status) {
      case 'declined': return { statusLabel: 'ACTION REQUIRED', title: 'Buyer requested changes', ctaText: 'Review Feedback', ctaRoute: `/review-feedback/${id}` };
      case 'draft': return { statusLabel: 'DRAFT', title: 'Complete Setup', ctaText: 'Continue Setup', ctaRoute: '/create-deal' };
      case 'open': return { statusLabel: 'WAITING FOR BUYER', title: 'Deal Ready', ctaText: 'Share Deal', ctaRoute: `/deal-details/${id}` };
      case 'funded': return { statusLabel: 'PAYMENT RECEIVED', title: 'Upload Tracking Details', ctaText: 'Add Tracking', ctaRoute: `/add-tracking/${id}` };
      case 'shipped': return { statusLabel: 'SHIPPED', title: 'Package In Transit', ctaText: 'View Shipment', ctaRoute: `/deal-details/${id}` };
      case 'delivered': return { statusLabel: 'DELIVERED', title: 'Waiting for Buyer Inspection', ctaText: 'View Deal', ctaRoute: `/deal-details/${id}` };
      case 'disputed': return { statusLabel: 'DISPUTED', title: 'Action Needed', ctaText: 'View Dispute', ctaRoute: `/deal-details/${id}` };
      case 'return_approved': return { statusLabel: 'RETURN APPROVED', title: 'Return Processed', ctaText: 'View Details', ctaRoute: `/deal-details/${id}` };
      case 'return_shipped': return { statusLabel: 'RETURN SHIPPED', title: 'Return Shipped', ctaText: 'Track Return', ctaRoute: `/deal-details/${id}` };
      case 'return_delivered': return { statusLabel: 'RETURN DELIVERED', title: 'Confirm Return', ctaText: 'Confirm Return', ctaRoute: `/deal-details/${id}` };
      case 'return_completed': return { statusLabel: 'REFUND COMPLETED', title: 'Refund Issued', ctaText: 'View Details', ctaRoute: `/deal-details/${id}` };
      case 'cancelled': return { statusLabel: 'CANCELLED', title: 'Deal Cancelled', ctaText: 'View Details', ctaRoute: `/deal-details/${id}` };
      case 'completed': return { statusLabel: 'COMPLETED', title: 'Leave Review', ctaText: 'Leave Review', ctaRoute: `/review-buyer/${id}` };
      default: return { statusLabel: '', ctaText: '', ctaRoute: '' };
    }
  } else {
    // buyer
    switch (status) {
      case 'open': return { statusLabel: 'WAITING FOR PAYMENT', title: 'Review Deal', ctaText: 'Review Deal', ctaRoute: `/buyer-view/${id}` };
      case 'funded': return { statusLabel: 'PAYMENT RECEIVED', title: 'Waiting for Seller Shipment', ctaText: 'View Deal', ctaRoute: `/timeline/${id}` };
      case 'shipped': return { statusLabel: 'SHIPPED', title: 'Tracking Available', ctaText: 'View Shipment', ctaRoute: `/timeline/${id}` };
      case 'delivered': return { statusLabel: 'DELIVERED', title: 'Review Required', ctaText: 'Review Item', ctaRoute: `/timeline/${id}` };
      case 'disputed': return { statusLabel: 'DISPUTED', title: 'Issue Reported', ctaText: 'View Deal', ctaRoute: `/timeline/${id}` };
      case 'return_approved': return { statusLabel: 'RETURN APPROVED', title: 'Return Approved', ctaText: 'Add Return Tracking', ctaRoute: `/timeline/${id}` };
      case 'return_shipped': return { statusLabel: 'RETURN SHIPPED', title: 'Return In Transit', ctaText: 'Track Return', ctaRoute: `/timeline/${id}` };
      case 'return_delivered': return { statusLabel: 'RETURN DELIVERED', title: 'Seller Reviewing Return', ctaText: 'View Details', ctaRoute: `/timeline/${id}` };
      case 'return_completed': return { statusLabel: 'REFUND COMPLETED', title: 'Refund Completed', ctaText: 'View Wallet', ctaRoute: `/wallet` };
      case 'cancelled': return { statusLabel: 'CANCELLED', title: 'Cancelled', ctaText: 'View Details', ctaRoute: `/timeline/${id}` };
      case 'completed': return { statusLabel: 'COMPLETED', title: 'Leave Review', ctaText: 'Leave Review', ctaRoute: `/review-seller/${id}` };
      default: return { statusLabel: '', ctaText: '', ctaRoute: '' };
    }
  }
}

const priorityMap: Record<DealStatus, number> = {
  declined: 0,
  delivered: 1,
  return_delivered: 2,
  shipped: 3,
  funded: 4,
  disputed: 5,
  return_approved: 6,
  return_shipped: 7,
  open: 8,
  draft: 9,
  return_completed: 11,
  cancelled: 12,
  completed: 13
};

export function QuickActionsCard({ userMode, deals }: QuickActionsCardProps) {
  const navigate = useNavigate();

  if (!deals || deals.length === 0) return null;

  const activeDeals = deals.filter(d => d.status !== 'completed' && d.status !== 'cancelled' && d.status !== 'return_completed');
  const sortedDeals = activeDeals.sort((a, b) => priorityMap[b.status] - priorityMap[a.status]); // Sort reversed for this specific demo order (funded -> shipped -> delivered is inverse priority numbers) wait...
  const displayDeals = activeDeals; // We'll just display them in the order provided to match the exact demo requirement
  const hasMore = false;

  if (displayDeals.length === 0) return null;

  const isBuyer = userMode === 'buyer';
  const themeColor = isBuyer ? '#10B981' : '#2563EB';
  const themeBgColor = isBuyer ? 'bg-[#10B981]' : 'bg-[#2563EB]';
  const themeHoverBgColor = isBuyer ? 'hover:bg-[#059669]' : 'hover:bg-blue-700';
  const themeLightBgColor = isBuyer ? 'bg-[#10B981]/10' : 'bg-[#2563EB]/10';
  const themeBorderColor = isBuyer ? 'border-[#10B981]/20' : 'border-[#2563EB]/20';

  const defaultImage = "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=200&h=200&fit=crop";

  return (
    <div className="space-y-3 mt-4">
      <h2 className="text-[16px] font-bold text-foreground px-1 flex items-center gap-1.5">
        <AlertCircle className="w-4 h-4" style={{ color: themeColor }} /> Quick Actions Required
      </h2>

      <div className="space-y-3">
        {displayDeals.map((deal) => {
          const content = getQuickActionContent(deal.status, userMode, deal.id);
          if (!content.statusLabel) return null;

          return (
            <Card key={deal.id} className="border border-border bg-white shadow-sm overflow-hidden">
              <div className="py-3.5 px-4 flex flex-col gap-3.5">
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`w-[48px] h-[48px] rounded-xl flex items-center justify-center shrink-0 border overflow-hidden bg-gray-100 ${themeBorderColor}`}>
                    <img src={deal.imageUrl || defaultImage} alt={deal.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="font-bold text-[18px] text-foreground leading-tight truncate">{deal.name}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <p className="text-[13px] font-medium text-muted-foreground">{deal.id}</p>
                      <span className="text-muted-foreground text-[10px]">•</span>
                      <div 
                        className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide shrink-0 ${themeLightBgColor}`}
                        style={{ color: themeColor }}
                      >
                        {content.statusLabel}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 mt-0.5">
                  {content.title && (
                    <p className="font-semibold text-[15px] leading-[22px] text-foreground truncate">{content.title}</p>
                  )}
                  <Button 
                    className={`w-[120px] shrink-0 text-white font-medium text-[14px] h-[36px] rounded-[10px] ${themeBgColor} ${themeHoverBgColor}`} 
                    onClick={() => navigate(content.ctaRoute)}
                  >
                    {content.ctaText}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {hasMore && (
        <div className="text-center mt-2">
          <Button variant="link" className="text-[14px] font-bold text-gray-500 hover:text-gray-800" onClick={() => navigate('/deals')}>
            View All Active Deals ({activeDeals.length})
          </Button>
        </div>
      )}
    </div>
  );
}
