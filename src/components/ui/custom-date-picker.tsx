import * as React from "react"
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CustomDatePickerProps {
  value: string
  onChange: (val: string) => void
  onOpenChange?: (isOpen: boolean) => void
  placeholder?: string
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

// Generate years from current year to 10 years ahead
const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 11 }, (_, i) => currentYear + i)

const DAYS_OF_WEEK = ["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"]

export function CustomDatePicker({ value, onChange, onOpenChange, placeholder = "MM/DD/YYYY" }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  
  // Parse initial value or use current date
  const initialDate = React.useMemo(() => {
    if (!value) return new Date()
    const parts = value.split("/")
    if (parts.length === 3) {
      const m = parseInt(parts[0], 10) - 1
      const d = parseInt(parts[1], 10)
      const y = parseInt(parts[2], 10)
      if (!isNaN(m) && !isNaN(d) && !isNaN(y)) {
        return new Date(y, m, d)
      }
    }
    return new Date()
  }, [value])

  const [viewYear, setViewYear] = React.useState(initialDate.getFullYear())
  const [viewMonth, setViewMonth] = React.useState(initialDate.getMonth())

  const [showYearDropdown, setShowYearDropdown] = React.useState(false)
  const [showMonthDropdown, setShowMonthDropdown] = React.useState(false)

  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setShowYearDropdown(false)
        setShowMonthDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Auto-scroll and parent notification when calendar opens
  React.useEffect(() => {
    if (onOpenChange) {
      onOpenChange(isOpen)
    }
    if (isOpen && containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 50)
    }
  }, [isOpen, onOpenChange])

  // Calendar Math
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()
  
  // Adjust Sunday (0) to 6, Monday (1) to 0
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
  
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate()

  const handleSelectDate = (day: number, isPrevMonth: boolean, isNextMonth: boolean) => {
    let targetYear = viewYear
    let targetMonth = viewMonth

    if (isPrevMonth) {
      if (targetMonth === 0) {
        targetMonth = 11
        targetYear--
      } else {
        targetMonth--
      }
    } else if (isNextMonth) {
      if (targetMonth === 11) {
        targetMonth = 0
        targetYear++
      } else {
        targetMonth++
      }
    }

    // Format MM/DD/YYYY
    const formattedDate = `${String(targetMonth + 1).padStart(2, "0")}/${String(day).padStart(2, "0")}/${targetYear}`
    onChange(formattedDate)
    setIsOpen(false)
  }

  // Generate grid
  const grid = []
  
  // Previous month days
  for (let i = startOffset - 1; i >= 0; i--) {
    grid.push({ day: daysInPrevMonth - i, isPrevMonth: true, isNextMonth: false })
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    grid.push({ day: i, isPrevMonth: false, isNextMonth: false })
  }
  
  // Next month days to fill up exactly 42 slots (6 rows)
  const remainingSlots = 42 - grid.length
  for (let i = 1; i <= remainingSlots; i++) {
    grid.push({ day: i, isPrevMonth: false, isNextMonth: true })
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* Input Field Trigger */}
      <div 
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer hover:border-gray-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value || placeholder}
        </span>
        <CalendarIcon className="w-4 h-4 text-gray-400" />
      </div>

      {/* Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: -4, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full rounded-[16px] border border-gray-100 bg-white p-5 shadow-xl bottom-full left-0 origin-bottom-left mb-1"
          >
            {/* Header Dropdowns */}
            <div className="flex items-center gap-4 mb-6">
              {/* Year Dropdown */}
              <div className="relative flex-1">
                <button 
                  onClick={() => {
                    setShowYearDropdown(!showYearDropdown)
                    setShowMonthDropdown(false)
                  }}
                  className="flex items-center justify-between w-full text-[16px] font-bold text-slate-800"
                >
                  {viewYear} <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>
                
                <AnimatePresence>
                  {showYearDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute top-full left-0 mt-2 w-full max-h-[200px] overflow-y-auto bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-2 hide-scrollbar"
                    >
                      {YEARS.map(y => (
                        <div 
                          key={y}
                          onClick={() => { setViewYear(y); setShowYearDropdown(false) }}
                          className={`px-4 py-2 text-sm cursor-pointer hover:bg-slate-50 ${y === viewYear ? 'font-bold text-blue-600' : 'text-slate-700'}`}
                        >
                          {y}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-px h-6 bg-slate-200" />

              {/* Month Dropdown */}
              <div className="relative flex-1">
                <button 
                  onClick={() => {
                    setShowMonthDropdown(!showMonthDropdown)
                    setShowYearDropdown(false)
                  }}
                  className="flex items-center justify-between w-full text-[16px] font-bold text-slate-800"
                >
                  {MONTHS[viewMonth]} <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>
                
                <AnimatePresence>
                  {showMonthDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute top-full left-0 mt-2 w-[140px] max-h-[200px] overflow-y-auto bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-2 hide-scrollbar"
                    >
                      {MONTHS.map((m, idx) => (
                        <div 
                          key={m}
                          onClick={() => { setViewMonth(idx); setShowMonthDropdown(false) }}
                          className={`px-4 py-2 text-sm cursor-pointer hover:bg-slate-50 ${idx === viewMonth ? 'font-bold text-blue-600' : 'text-slate-700'}`}
                        >
                          {m}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 mb-4">
              {DAYS_OF_WEEK.map(day => (
                <div key={day} className="text-center text-[13px] font-semibold text-slate-600">
                  {day}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-y-3">
              {grid.map((cell, idx) => {
                const isSelected = 
                  !cell.isPrevMonth && 
                  !cell.isNextMonth && 
                  value && 
                  initialDate.getDate() === cell.day && 
                  initialDate.getMonth() === viewMonth &&
                  initialDate.getFullYear() === viewYear

                return (
                  <div 
                    key={idx} 
                    onClick={() => handleSelectDate(cell.day, cell.isPrevMonth, cell.isNextMonth)}
                    className="flex items-center justify-center h-8 cursor-pointer"
                  >
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-full text-[14px] transition-all
                      ${isSelected ? 'bg-slate-900 text-white font-bold shadow-md' : 'hover:bg-slate-100 text-slate-700'}
                      ${(cell.isPrevMonth || cell.isNextMonth) ? 'text-slate-400 font-medium' : 'font-medium'}
                    `}>
                      {cell.day}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
