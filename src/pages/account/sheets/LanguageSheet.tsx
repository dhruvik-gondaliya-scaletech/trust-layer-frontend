import * as React from "react"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function LanguageSheet({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [selected, setSelected] = React.useState("English (US)")
  const languages = ["English (US)", "English (UK)", "Spanish", "French", "German"]

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Language">
      <div className="space-y-2 pb-6">
        {languages.map(lang => (
          <div 
            key={lang}
            onClick={() => setSelected(lang)}
            className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
          >
            <span className={`text-[15px] ${selected === lang ? "font-bold text-blue-600" : "font-medium text-gray-700"}`}>
              {lang}
            </span>
            {selected === lang && <Check className="w-5 h-5 text-blue-600" />}
          </div>
        ))}
      </div>
      <Button className="w-full h-14 text-[16px] font-bold rounded-xl bg-blue-600 text-white" onClick={onClose}>
        Save Changes
      </Button>
    </BottomSheet>
  )
}
