import * as React from "react"
import { useNavigate } from "react-router-dom"
import { 
  User, Wallet, ShieldCheck, CreditCard, MapPin, Star, 
  Bell, Lock, Globe, HelpCircle, MessageSquare, AlertTriangle, 
  Shield, FileText, LogOut, ChevronRight, CheckCircle2, ChevronLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { LanguageSheet } from "@/pages/account/sheets/LanguageSheet"
import { CurrencySheet } from "@/pages/account/sheets/CurrencySheet"
import { NotificationsSheet } from "@/pages/account/sheets/NotificationsSheet"

function MenuRow({ icon: Icon, title, onClick, value, textClass = "text-foreground" }: { icon: any, title: string, onClick: () => void, value?: string, textClass?: string }) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-white cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100 last:border-0"
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${textClass === 'text-red-600' ? 'text-red-600' : 'text-gray-400'}`} />
        <span className={`font-semibold text-[15px] ${textClass}`}>{title}</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        {value && <span className="text-[14px]">{value}</span>}
        <ChevronRight className="w-5 h-5 opacity-40" />
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="px-4 mb-2 text-[13px] font-bold text-muted-foreground uppercase tracking-wider">{title}</h3>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mx-4">
        {children}
      </div>
    </div>
  )
}

export default function AccountCenter() {
  const navigate = useNavigate()
  const [isSignOutOpen, setIsSignOutOpen] = React.useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = React.useState(false)
  const [isCurrencyOpen, setIsCurrencyOpen] = React.useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-10">
      {/* Header */}
      <div className="bg-white pt-6 pb-8 px-4 shadow-sm border-b border-gray-100 relative">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="absolute left-4 top-6 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors z-10"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="flex flex-col items-center mt-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
              <img src="https://i.pravatar.cc/150?u=alex" alt="Alex Johnson" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 border-2 border-white">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground">Alex Johnson</h1>
          <p className="text-[14px] text-muted-foreground font-medium mt-1">TrustLayer Verified</p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full mt-3">
            <span className="text-[12px] font-semibold text-gray-600">Member Since 2024</span>
          </div>
        </div>

        {/* Wallet Preview Card */}
        <div 
          onClick={() => navigate('/wallet')}
          className="mt-6 mx-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-5 text-white shadow-lg shadow-blue-600/20 relative overflow-hidden cursor-pointer hover:scale-[1.01] transition-transform active:scale-[0.98]"
        >
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-[13px] font-medium mb-1">Wallet Balance</p>
              <p className="text-[28px] font-bold">$1,250.00</p>
            </div>
            <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Wallet className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="relative z-10 text-blue-200 text-[12px] font-medium mt-3 flex items-center gap-1">
            Tap to view wallet <ChevronRight className="w-3 h-3" />
          </p>
        </div>
      </div>

      <div className="pt-6">
        <Section title="Account">
          <MenuRow icon={User} title="My Profile" onClick={() => navigate('/profile')} />
          <MenuRow icon={Wallet} title="Wallet" onClick={() => navigate('/wallet')} />
          <MenuRow icon={ShieldCheck} title="Verification Center" onClick={() => navigate('/verification-center')} />
          <MenuRow icon={CreditCard} title="Payment Methods" onClick={() => navigate('/payment-methods')} />
          <MenuRow icon={MapPin} title="Shipping Addresses" onClick={() => navigate('/shipping-addresses')} />
          <MenuRow icon={Star} title="Reviews" onClick={() => navigate('/reviews')} />
          <MenuRow icon={Bell} title="Notification Preferences" onClick={() => setIsNotificationsOpen(true)} />
          <MenuRow icon={Lock} title="Privacy & Security" onClick={() => navigate('/privacy-security')} />
          <MenuRow icon={Globe} title="Language" onClick={() => setIsLanguageOpen(true)} value="English" />
          <MenuRow icon={Globe} title="Currency" onClick={() => setIsCurrencyOpen(true)} value="USD" />
        </Section>

        <Section title="Support">
          <MenuRow icon={HelpCircle} title="Help Center" onClick={() => navigate('/help-center')} />
          <MenuRow icon={MessageSquare} title="Contact Support" onClick={() => navigate('/contact-support')} />
          <MenuRow icon={AlertTriangle} title="Report Issue" onClick={() => navigate('/report-issue')} />
          <MenuRow icon={Shield} title="Transaction Protection" onClick={() => navigate('/transaction-protection')} />
        </Section>

        <Section title="About">
          <MenuRow icon={FileText} title="Terms & Conditions" onClick={() => navigate('/terms')} />
          <MenuRow icon={FileText} title="Privacy Policy" onClick={() => navigate('/privacy-policy')} />
          <MenuRow icon={LogOut} title="Sign Out" onClick={() => setIsSignOutOpen(true)} textClass="text-red-600" />
        </Section>
      </div>

      <BottomSheet
        isOpen={isSignOutOpen}
        onClose={() => setIsSignOutOpen(false)}
        title="Sign Out?"
      >
        <div className="space-y-6">
          <p className="text-[15px] text-muted-foreground text-center">
            You will need to sign in again to access your account.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-14 text-[16px] font-bold" onClick={() => setIsSignOutOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" className="flex-1 h-14 text-[16px] font-bold" onClick={() => {
              setIsSignOutOpen(false);
              navigate('/login');
            }}>
              Sign Out
            </Button>
          </div>
        </div>
      </BottomSheet>
      <LanguageSheet isOpen={isLanguageOpen} onClose={() => setIsLanguageOpen(false)} />
      <CurrencySheet isOpen={isCurrencyOpen} onClose={() => setIsCurrencyOpen(false)} />
      <NotificationsSheet isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
    </div>
  )
}
