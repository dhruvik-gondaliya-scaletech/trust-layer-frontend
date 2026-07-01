import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import Landing from "@/pages/Landing"
import Register from "@/pages/Register"
import VerifyEmail from "@/pages/VerifyEmail"
import VerifyPhone from "@/pages/VerifyPhone"
import ProfileSetup from "@/pages/ProfileSetup"
import AddShippingAddress from "@/pages/AddShippingAddress"
import OnboardingComplete from "@/pages/OnboardingComplete"
import Login from "@/pages/Login"
import ForgotPassword from "@/pages/ForgotPassword"
import ResetPassword from "@/pages/ResetPassword"
import Dashboard from "@/pages/Dashboard"
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
import AllTransactions from "@/pages/AllTransactions"
import DealDetails from "@/pages/DealDetails"
import SelectShippingAddress from "@/pages/SelectShippingAddress"
import ReviewFeedback from "@/pages/ReviewFeedback"

import MyProfile from "@/pages/account/MyProfile"
import VerificationCenter from "@/pages/account/VerificationCenter"
import PaymentMethods from "@/pages/account/PaymentMethods"
import ShippingAddresses from "@/pages/account/ShippingAddresses"
import Reviews from "@/pages/account/Reviews"
import HelpCenter from "@/pages/account/HelpCenter"
import ContactSupport from "@/pages/account/ContactSupport"
import TermsConditions from "@/pages/account/TermsConditions"
import PrivacyPolicy from "@/pages/account/PrivacyPolicy"
import CookiePolicy from "@/pages/account/CookiePolicy"
import RefundPolicy from "@/pages/account/RefundPolicy"
import AboutTrustLayer from "@/pages/account/AboutTrustLayer"
import ContactUs from "@/pages/account/ContactUs"
import PublicProfilePreview from "@/pages/account/profile/PublicProfilePreview"
import { PageSkeleton } from "@/components/ui/page-skeleton"
import React, { useState, useEffect } from "react"
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

function WithSkeleton({ children, title }: { children: React.ReactNode, title: string }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // Artificial delay to show off the skeleton loader
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])
  
  if (loading) return <PageSkeleton title={title} />
  return <>{children}</>
}

function AppContent() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <div className="mobile-constraint relative">
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<MobileLayout><Landing /></MobileLayout>} />
        
        {/* Auth & Onboarding Routes */}
        <Route path="/register" element={<MobileLayout><Register /></MobileLayout>} />
        <Route path="/verify-email" element={<MobileLayout><VerifyEmail /></MobileLayout>} />
        <Route path="/verify-phone" element={<MobileLayout><VerifyPhone /></MobileLayout>} />
        <Route path="/profile-setup" element={<MobileLayout><ProfileSetup /></MobileLayout>} />
        <Route path="/add-shipping" element={<MobileLayout><AddShippingAddress /></MobileLayout>} />
        <Route path="/select-shipping" element={<MobileLayout><SelectShippingAddress /></MobileLayout>} />
        <Route path="/onboarding-complete" element={<MobileLayout><OnboardingComplete /></MobileLayout>} />
        <Route path="/login" element={<MobileLayout><Login /></MobileLayout>} />
        <Route path="/forgot-password" element={<MobileLayout><ForgotPassword /></MobileLayout>} />
        <Route path="/reset-password" element={<MobileLayout><ResetPassword /></MobileLayout>} />

        {/* Seller Routes */}
        <Route path="/dashboard" element={<MobileLayout><Dashboard /></MobileLayout>} />
        <Route path="/dashboard/seller" element={<Navigate to="/dashboard?mode=seller" replace />} />
        <Route path="/dashboard/buyer" element={<Navigate to="/dashboard?mode=buyer" replace />} />
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
        <Route path="/transactions" element={<MobileLayout><AllTransactions /></MobileLayout>} />
        <Route path="/deal-details/:id" element={<MobileLayout><DealDetails /></MobileLayout>} />
        <Route path="/review-feedback/:id" element={<MobileLayout><ReviewFeedback /></MobileLayout>} />

        {/* Account Center Routes */}
        <Route path="/profile" element={<MobileLayout><WithSkeleton title="My Profile"><MyProfile /></WithSkeleton></MobileLayout>} />
        <Route path="/profile/preview" element={<MobileLayout><PublicProfilePreview /></MobileLayout>} />
        <Route path="/verification-center" element={<MobileLayout><WithSkeleton title="Verification Center"><VerificationCenter /></WithSkeleton></MobileLayout>} />
        <Route path="/payment-methods" element={<MobileLayout><WithSkeleton title="Payment Methods"><PaymentMethods /></WithSkeleton></MobileLayout>} />
        <Route path="/shipping-addresses" element={<MobileLayout><WithSkeleton title="Shipping Addresses"><ShippingAddresses /></WithSkeleton></MobileLayout>} />
        <Route path="/reviews" element={<MobileLayout><WithSkeleton title="Reviews"><Reviews /></WithSkeleton></MobileLayout>} />
        <Route path="/help-center" element={<MobileLayout><WithSkeleton title="Help Center"><HelpCenter /></WithSkeleton></MobileLayout>} />
        <Route path="/contact-support" element={<MobileLayout><WithSkeleton title="Contact Support"><ContactSupport /></WithSkeleton></MobileLayout>} />
        
        {/* Company Routes */}
        <Route path="/about" element={<MobileLayout><WithSkeleton title="About TrustLayer"><AboutTrustLayer /></WithSkeleton></MobileLayout>} />
        <Route path="/contact-us" element={<MobileLayout><WithSkeleton title="Contact Us"><ContactUs /></WithSkeleton></MobileLayout>} />

        {/* Legal Routes */}
        <Route path="/terms" element={<MobileLayout><WithSkeleton title="Terms & Conditions"><TermsConditions /></WithSkeleton></MobileLayout>} />
        <Route path="/privacy-policy" element={<MobileLayout><WithSkeleton title="Privacy Policy"><PrivacyPolicy /></WithSkeleton></MobileLayout>} />
        <Route path="/cookie-policy" element={<MobileLayout><WithSkeleton title="Cookie Policy"><CookiePolicy /></WithSkeleton></MobileLayout>} />
        <Route path="/refund-policy" element={<MobileLayout><WithSkeleton title="Refund Policy"><RefundPolicy /></WithSkeleton></MobileLayout>} />

        <Route path="*" element={<MobileLayout><PlaceholderPage title="404 Not Found" /></MobileLayout>} />
      </Routes>

      {/* OVERLAY ROUTES FOR DRAWER NAVIGATION */}
      {backgroundLocation && (
        <div className="absolute inset-0 z-[150] bg-white overflow-hidden pointer-events-auto">
          <Routes>
            <Route path="/profile" element={<MobileLayout><WithSkeleton title="My Profile"><MyProfile /></WithSkeleton></MobileLayout>} />
            <Route path="/profile/preview" element={<MobileLayout><PublicProfilePreview /></MobileLayout>} />
            <Route path="/verification-center" element={<MobileLayout><WithSkeleton title="Verification Center"><VerificationCenter /></WithSkeleton></MobileLayout>} />
            <Route path="/payment-methods" element={<MobileLayout><WithSkeleton title="Payment Methods"><PaymentMethods /></WithSkeleton></MobileLayout>} />
            <Route path="/shipping-addresses" element={<MobileLayout><WithSkeleton title="Shipping Addresses"><ShippingAddresses /></WithSkeleton></MobileLayout>} />
            <Route path="/reviews" element={<MobileLayout><WithSkeleton title="Reviews"><Reviews /></WithSkeleton></MobileLayout>} />
            <Route path="/help-center" element={<MobileLayout><WithSkeleton title="Help Center"><HelpCenter /></WithSkeleton></MobileLayout>} />
            <Route path="/contact-support" element={<MobileLayout><WithSkeleton title="Contact Support"><ContactSupport /></WithSkeleton></MobileLayout>} />
            
            <Route path="/about" element={<MobileLayout><WithSkeleton title="About TrustLayer"><AboutTrustLayer /></WithSkeleton></MobileLayout>} />
            <Route path="/contact-us" element={<MobileLayout><WithSkeleton title="Contact Us"><ContactUs /></WithSkeleton></MobileLayout>} />

            <Route path="/terms" element={<MobileLayout><WithSkeleton title="Terms & Conditions"><TermsConditions /></WithSkeleton></MobileLayout>} />
            <Route path="/privacy-policy" element={<MobileLayout><WithSkeleton title="Privacy Policy"><PrivacyPolicy /></WithSkeleton></MobileLayout>} />
            <Route path="/cookie-policy" element={<MobileLayout><WithSkeleton title="Cookie Policy"><CookiePolicy /></WithSkeleton></MobileLayout>} />
            <Route path="/refund-policy" element={<MobileLayout><WithSkeleton title="Refund Policy"><RefundPolicy /></WithSkeleton></MobileLayout>} />
            <Route path="/wallet" element={<MobileLayout><Wallet /></MobileLayout>} />
            <Route path="/notifications" element={<MobileLayout><Notifications /></MobileLayout>} />
          </Routes>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
