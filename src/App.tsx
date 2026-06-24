import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Landing from "@/pages/Landing"
import Register from "@/pages/Register"
import VerifyEmail from "@/pages/VerifyEmail"
import VerifyPhone from "@/pages/VerifyPhone"
import ProfileSetup from "@/pages/ProfileSetup"
import OnboardingComplete from "@/pages/OnboardingComplete"
import Login from "@/pages/Login"
import ForgotPassword from "@/pages/ForgotPassword"
import ResetPassword from "@/pages/ResetPassword"
import Dashboard from "@/pages/Dashboard"
import SellerDashboard from "@/pages/SellerDashboard"
import BuyerDashboard from "@/pages/BuyerDashboard"
import CreateDeal from "@/pages/CreateDeal"
import DealPublished from "@/pages/DealPublished"
import BuyerDealPage from "@/pages/BuyerDealPage"
import TransactionTimeline from "@/pages/TransactionTimeline"
import Wallet from "@/pages/Wallet"
import FundEscrowFlow from "@/pages/FundEscrowFlow"
import Notifications from "@/pages/Notifications"
import AddTracking from "@/pages/AddTracking"
import TrackingSuccess from "@/pages/TrackingSuccess"
import DisputeFlow from "@/pages/DisputeFlow"
import ReviewSeller from "@/pages/ReviewSeller"
import TransactionComplete from "@/pages/TransactionComplete"


// Simplified MobileLayout - it just ensures the child fills the space, 
// because the true mobile-constraint is now applied globally to the App container.
function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {children}
    </div>
  )
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="p-6 text-center space-y-4 flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC]">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground">This screen is under construction.</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      {/* 
        This single wrapper ensures the entire app runs within a centered 
        430px wide column on desktop, simulating a mobile device. 
      */}
      <div className="mobile-constraint">
        <Routes>
          <Route path="/" element={<MobileLayout><Landing /></MobileLayout>} />
          
          {/* Auth & Onboarding Routes */}
          <Route path="/register" element={<MobileLayout><Register /></MobileLayout>} />
          <Route path="/verify-email" element={<MobileLayout><VerifyEmail /></MobileLayout>} />
          <Route path="/verify-phone" element={<MobileLayout><VerifyPhone /></MobileLayout>} />
          <Route path="/profile-setup" element={<MobileLayout><ProfileSetup /></MobileLayout>} />
          <Route path="/onboarding-complete" element={<MobileLayout><OnboardingComplete /></MobileLayout>} />
          <Route path="/login" element={<MobileLayout><Login /></MobileLayout>} />
          <Route path="/forgot-password" element={<MobileLayout><ForgotPassword /></MobileLayout>} />
          <Route path="/reset-password" element={<MobileLayout><ResetPassword /></MobileLayout>} />

          {/* Seller Routes */}
          <Route path="/dashboard" element={<MobileLayout><Dashboard /></MobileLayout>} />
          <Route path="/dashboard/seller" element={<MobileLayout><SellerDashboard /></MobileLayout>} />
          <Route path="/dashboard/buyer" element={<MobileLayout><BuyerDashboard /></MobileLayout>} />
          <Route path="/create-deal" element={<MobileLayout><CreateDeal /></MobileLayout>} />
          <Route path="/deal-published" element={<MobileLayout><DealPublished /></MobileLayout>} />
          <Route path="/notifications" element={<MobileLayout><Notifications /></MobileLayout>} />
          <Route path="/add-tracking/:id" element={<MobileLayout><AddTracking /></MobileLayout>} />
          <Route path="/tracking-success/:id" element={<MobileLayout><TrackingSuccess /></MobileLayout>} />

          {/* Buyer Routes */}
          <Route path="/buyer-view/:id" element={<MobileLayout><BuyerDealPage /></MobileLayout>} />
          <Route path="/fund-escrow/:id" element={<MobileLayout><FundEscrowFlow /></MobileLayout>} />
          <Route path="/timeline/:id" element={<MobileLayout><TransactionTimeline /></MobileLayout>} />
          <Route path="/dispute-flow/:id" element={<MobileLayout><DisputeFlow /></MobileLayout>} />
          <Route path="/review-seller/:id" element={<MobileLayout><ReviewSeller /></MobileLayout>} />
          <Route path="/transaction-complete/:id" element={<MobileLayout><TransactionComplete /></MobileLayout>} />

          {/* Shared Routes */}
          <Route path="/wallet" element={<MobileLayout><Wallet /></MobileLayout>} />

          <Route path="*" element={<MobileLayout><PlaceholderPage title="404 Not Found" /></MobileLayout>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
