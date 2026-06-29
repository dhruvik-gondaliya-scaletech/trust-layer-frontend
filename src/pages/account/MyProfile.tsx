import * as React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { 
  ChevronLeft, Camera, ShieldCheck, Mail, Phone, ChevronRight, 
  MapPin, Clock, Globe, User, Download, Trash2, ShieldOff, Key
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BottomActionBar } from "@/components/ui/bottom-action-bar"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { ProfileEditSheet, type ProfileField } from "./profile/ProfileEditSheet"
import { useProfileDemo } from "@/hooks/useProfileDemo"

function EditRow({ icon: Icon, title, value, onClick }: { icon: any, title: string, value: string, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 p-4 border-b border-gray-50 last:border-0 ${onClick ? 'hover:bg-gray-50 active:bg-gray-100 active:scale-[0.98] transition-all duration-150 cursor-pointer group' : ''}`}
    >
      <div className={`w-8 h-8 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center shrink-0 ${onClick ? 'group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors' : ''}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{title}</p>
        <p className="text-[14px] font-bold text-gray-900 truncate">{value}</p>
      </div>
      {onClick && (
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold text-blue-600">Edit</span>
          <ChevronRight className="w-4 h-4 text-gray-300 group-active:translate-x-1 transition-transform" />
        </div>
      )}
    </div>
  )
}

export default function MyProfile() {
  const navigate = useNavigate()
  const location = useLocation()
  const { state, updateState, progress } = useProfileDemo()
  const [showToast, setShowToast] = React.useState(location.state?.toast || "")
  const [showDangerSheet, setShowDangerSheet] = React.useState(false)
  const [editField, setEditField] = React.useState<ProfileField>(null)

  React.useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast("")
        // clear the state so refresh doesn't show toast again
        navigate('.', { replace: true, state: {} })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showToast, navigate])

  const missingItems = [
    { id: 'photo', title: 'Add Profile Photo', action: () => setEditField('photo'), done: state.hasPhoto },
    { id: 'bio', title: 'Write a Bio', action: () => setEditField('bio'), done: state.hasBio },
  ].filter(i => !i.done);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-[140px]">
      <div className="flex items-center justify-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="font-bold text-[17px]">My Profile</span>
      </div>

      <div className="flex-1 px-5 pt-6 animate-in fade-in duration-300 space-y-8">
        
        {/* HERO SECTION */}
        <div className="flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center bg-gray-50">
              {state.hasPhoto ? (
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" alt="Alex Johnson" className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-gray-300" />
              )}
            </div>
            <button 
              onClick={() => setEditField('photo')}
              className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 active:scale-95 transition-all border-2 border-white"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <h2 className="text-[22px] font-extrabold text-gray-900 leading-none mb-1">Alex Johnson</h2>
          <p className="text-[14px] font-bold text-gray-500 mb-3">Austin, Texas • United States</p>
        </div>

        {/* ABOUT ME */}
        <div className="space-y-3">
          <h3 className="text-[14px] font-extrabold text-gray-400 uppercase tracking-wider px-1">About Me</h3>
          <div 
            onClick={() => setEditField('bio')}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:bg-gray-50 active:bg-gray-100 active:scale-[0.98] transition-all duration-150 cursor-pointer group"
          >
            {state.hasBio ? (
              <>
                <p className="text-[15px] leading-relaxed text-gray-700 mb-4 whitespace-pre-line">
                  Vintage trading card collector specializing in Pokémon and sports cards.{"\n"}
                  Buying and selling authenticated collectibles.{"\n"}
                  50+ successful transactions.
                </p>
                <div className="flex items-center text-blue-600 gap-1 font-bold text-[13px]">
                  Edit <ChevronRight className="w-3.5 h-3.5 group-active:translate-x-1 transition-transform" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <User className="w-5 h-5" />
                </div>
                <p className="text-[14px] font-bold text-gray-900 mb-1">Tell other members about yourself.</p>
                <p className="text-[13px] text-gray-500 mb-4">Adding a bio builds trust.</p>
                <Button variant="outline" className="h-9 text-[13px] font-bold" onClick={(e) => {
                  e.stopPropagation();
                  setEditField('bio');
                }}>
                  Add Bio
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* PERSONAL INFO */}
        <div className="space-y-3">
          <h3 className="text-[14px] font-extrabold text-gray-400 uppercase tracking-wider px-1">Personal Information</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <EditRow icon={User} title="Full Name" value="Alex Johnson" onClick={() => setEditField('name')} />
            <EditRow icon={User} title="Username" value="@alexj_collectibles" />
            <EditRow icon={Mail} title="Email" value="alex@email.com" onClick={() => setEditField('email')} />
            <EditRow icon={Phone} title="Phone" value="+1 (555) 123-4567" onClick={() => setEditField('phone')} />
          </div>
        </div>

        {/* TRUST & VERIFICATION */}
        <div className="space-y-3">
          <h3 className="text-[14px] font-extrabold text-gray-400 uppercase tracking-wider px-1">Trust & Verification</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-3 p-4 border-b border-gray-50">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-[14px] font-bold text-gray-900 flex-1">Email Verified</span>
            </div>
            <div className="flex items-center gap-3 p-4 border-b border-gray-50">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-[14px] font-bold text-gray-900 flex-1">Phone Verified</span>
            </div>
            <div className="flex items-center gap-3 p-4 border-b border-gray-50">
              <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[14px] font-bold text-gray-900 flex-1">Member Since March 2026</span>
            </div>
            
            <div className="p-4 border-b border-gray-50 last:border-0">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[14px] font-bold text-gray-900">Profile Completion</span>
                <span className="text-[14px] font-bold text-blue-600">{progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden mb-3 relative">
                <motion.div 
                  className="absolute top-0 left-0 bottom-0 bg-blue-600 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              {progress < 100 && (
                <div className="mt-3">
                  <span className="text-[12px] font-bold text-gray-500 mb-2 block uppercase tracking-wider">Remaining Steps</span>
                  <div className="space-y-2">
                    {missingItems.map(item => (
                      <div key={item.id} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        <button 
                          onClick={item.action}
                          className="text-[13px] font-bold text-blue-600 hover:text-blue-700 text-left"
                        >
                          {item.title}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CHANGE PASSWORD */}
        <div className="space-y-3">
          <h3 className="text-[14px] font-extrabold text-gray-400 uppercase tracking-wider px-1">Security</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <EditRow icon={Key} title="Change Password" value="Update your account password." onClick={() => setEditField('password')} />
          </div>
        </div>


        {/* DANGER ZONE */}
        <div className="space-y-3 pb-6">
          <h3 className="text-[14px] font-extrabold text-red-400 uppercase tracking-wider px-1">Danger Zone</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
            <div onClick={() => setShowDangerSheet(true)} className="flex items-center gap-3 p-4 hover:bg-red-50 transition-colors cursor-pointer border-b border-red-50 last:border-0 group">
              <ShieldOff className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
              <span className="flex-1 text-[14px] font-bold text-gray-700 group-hover:text-red-700">Deactivate Account</span>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </div>
            <div onClick={() => setShowDangerSheet(true)} className="flex items-center gap-3 p-4 hover:bg-red-50 transition-colors cursor-pointer group">
              <Trash2 className="w-4 h-4 text-red-500" />
              <span className="flex-1 text-[14px] font-bold text-red-600">Delete Account</span>
              <ChevronRight className="w-4 h-4 text-red-300" />
            </div>
          </div>
          <p className="text-[12px] text-gray-400 font-medium px-1 leading-relaxed">
            Deleting your account is permanent. This action will remove your profile, verification status, and transaction history.
          </p>
        </div>

      </div>

      <BottomActionBar>
        <Button 
          variant="outline" 
          className="w-full h-14 text-[16px] font-bold border-gray-200"
          onClick={() => {
            // Secret reset button for demo purposes
            updateState({ hasBio: false, hasPhoto: false, hasPayment: false, hasShipping: false });
            setShowToast("Demo Reset");
          }}
        >
          Reset Demo State
        </Button>
      </BottomActionBar>

      <BottomSheet isOpen={showDangerSheet} onClose={() => setShowDangerSheet(false)} title="Are you sure?">
        <div className="space-y-6">
          <p className="text-[15px] text-gray-600 leading-relaxed">
            This action requires you to contact support to verify your identity before deletion.
          </p>
          <Button className="w-full h-14 text-[16px] font-bold" onClick={() => setShowDangerSheet(false)}>
            Got it
          </Button>
        </div>
      </BottomSheet>

      <ProfileEditSheet 
        field={editField}
        isOpen={editField !== null}
        onClose={() => setEditField(null)}
        onSave={(f, v) => {
          if (f === 'photo') updateState({ hasPhoto: true });
          if (f === 'bio') updateState({ hasBio: true });
          
          let toastMessage = 'Profile updated successfully';
          if (f === 'password') toastMessage = 'Password updated successfully.';
          else if (f === 'photo') toastMessage = 'Photo updated successfully';
          else if (f === 'bio') toastMessage = 'Bio updated successfully';
          
          setShowToast(toastMessage);
        }}
      />

      {showToast && (
        <div className="fixed bottom-[100px] left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[calc(480px-32px)] bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-center animate-in slide-in-from-bottom-5 z-50">
          <span className="font-semibold text-[15px] flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"><ShieldCheck className="w-3 h-3 text-white" /></div>
            {showToast}
          </span>
        </div>
      )}
    </div>
  )
}
