import * as React from "react"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export type ProfileField = "photo" | "name" | "username" | "bio" | "email" | "phone" | "location" | "password" | null

interface ProfileEditSheetProps {
  field: ProfileField
  isOpen: boolean
  onClose: () => void
  onSave: (field: ProfileField, value: string) => void
}

export function ProfileEditSheet({ field, isOpen, onClose, onSave }: ProfileEditSheetProps) {
  const [value, setValue] = React.useState("")
  const [isSaving, setIsSaving] = React.useState(false)

  // Reset value when sheet opens
  React.useEffect(() => {
    if (isOpen) {
      setValue("")
      setIsSaving(false)
    }
  }, [isOpen, field])

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      onSave(field, value)
      onClose()
    }, 600) // Simulate network request
  }

  const getSheetContent = () => {
    switch (field) {
      case "name":
        return {
          title: "Edit Full Name",
          description: "This name appears on your TrustLayer profile.",
          content: (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
                <Input placeholder="e.g. Alex Johnson" className="h-12 bg-gray-50 border-gray-200" value={value} onChange={e => setValue(e.target.value)} />
              </div>
            </div>
          )
        }
      case "username":
        return {
          title: "Change Username",
          description: "Your username appears on your public profile.",
          content: (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">@</span>
                  <Input placeholder="username" className="h-12 pl-8 bg-gray-50 border-gray-200" value={value} onChange={e => setValue(e.target.value)} />
                </div>
                {value.length > 2 && (
                  <p className="text-[13px] text-emerald-600 font-bold flex items-center gap-1 mt-2">
                    ✓ Username available
                  </p>
                )}
              </div>
            </div>
          )
        }
      case "bio":
        return {
          title: "Edit Bio",
          description: "Tell buyers and sellers a little about yourself.",
          content: (
            <div className="space-y-4">
              <div className="space-y-2">
                <textarea 
                  className="flex w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[15px] shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-h-[120px] resize-none"
                  placeholder="Tell buyers and sellers a little about yourself."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  maxLength={250}
                />
                <div className="flex justify-end">
                  <span className="text-[12px] font-bold text-gray-400">{value.length}/250</span>
                </div>
              </div>
            </div>
          )
        }
      case "email":
        return {
          title: "Edit Email",
          description: "Changing your email requires verification.",
          content: (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                <Input type="email" placeholder="alex@email.com" className="h-12 bg-gray-50 border-gray-200" value={value} onChange={e => setValue(e.target.value)} />
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-[13px] text-amber-800 font-medium leading-relaxed">
                  We will send a one-time password to your new email to verify it.
                </p>
              </div>
            </div>
          )
        }
      case "phone":
        return {
          title: "Edit Phone",
          description: "Update your mobile number.",
          content: (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">Phone Number</label>
                <div className="flex gap-2">
                  <div className="w-24 h-12 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center font-bold text-[15px]">
                    🇺🇸 +1
                  </div>
                  <Input type="tel" placeholder="(555) 123-4567" className="flex-1 h-12 bg-gray-50 border-gray-200" value={value} onChange={e => setValue(e.target.value)} />
                </div>
              </div>
            </div>
          )
        }
      case "location":
        return {
          title: "Edit Location",
          description: "Update your city, state, and country.",
          content: (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">City</label>
                <Input placeholder="Austin" className="h-12 bg-gray-50 border-gray-200" value={value} onChange={e => setValue(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">State / Province</label>
                <Input placeholder="Texas" className="h-12 bg-gray-50 border-gray-200" />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">Country</label>
                <Input placeholder="United States" className="h-12 bg-gray-50 border-gray-200" />
              </div>
            </div>
          )
        }
      case "photo":
        return {
          title: "Profile Photo",
          description: "Upload a new photo for your profile.",
          content: (
            <div className="space-y-4 flex flex-col items-center py-4">
              <div className="w-24 h-24 rounded-full border-4 border-gray-100 shadow-sm overflow-hidden bg-white mb-4">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" alt="Current" className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-3 w-full">
                <Button variant="outline" className="flex-1 h-12 rounded-xl border-gray-200 font-bold" onClick={onClose}>Remove</Button>
                <Button 
                  className="flex-1 h-12 rounded-xl bg-blue-600 text-white font-bold" 
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? "Uploading..." : "Choose Library"}
                </Button>
              </div>
            </div>
          )
        }
      case "password":
        return {
          title: "Change Password",
          description: "Update your account password.",
          content: (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">Current Password</label>
                <Input type="password" placeholder="Enter current password" className="h-12 bg-gray-50 border-gray-200" />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">New Password</label>
                <Input type="password" placeholder="Enter new password" className="h-12 bg-gray-50 border-gray-200" value={value} onChange={e => setValue(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider">Confirm Password</label>
                <Input type="password" placeholder="Confirm new password" className="h-12 bg-gray-50 border-gray-200" />
              </div>
            </div>
          )
        }
      default:
        return { title: "", description: "", content: null }
    }
  }

  const { title, description, content } = getSheetContent()

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col h-full">
        <p className="text-[14px] text-gray-500 mb-6 font-medium leading-relaxed">{description}</p>
        
        <div className="flex-1 pb-6">
          {content}
        </div>

        {field !== 'photo' && (
          <div className="flex gap-3 mt-auto pt-4">
            <Button 
              variant="outline" 
              className="flex-1 h-14 rounded-xl border-gray-200 font-bold text-[15px]" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 h-14 rounded-xl bg-blue-600 text-white font-bold text-[15px]" 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : field === 'password' ? "Update Password" : "Save Changes"}
            </Button>
          </div>
        )}
      </div>
    </BottomSheet>
  )
}
