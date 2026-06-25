import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, CreditCard, Building2, Trash2, Edit2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomSheet } from "@/components/ui/bottom-sheet"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useProfileDemo } from "@/hooks/useProfileDemo"

export default function PaymentMethods() {
  const navigate = useNavigate()
  const { state, updateState } = useProfileDemo()
  const [activeTab, setActiveTab] = React.useState("cards")
  const [deleteModal, setDeleteModal] = React.useState<string | null>(null)
  const [showToast, setShowToast] = React.useState(false)

  const handleDelete = () => {
    setDeleteModal(null)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleAddPayment = () => {
    updateState({ hasPayment: true })
    navigate('/profile', { state: { toast: "Payment Method added successfully" } })
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <div className="flex items-center justify-center p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="absolute left-4 p-2 -ml-2 rounded-full text-foreground hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-2">
          <span className="font-bold text-[17px]">Payment Methods</span>
        </div>
      </div>

      <div className="flex-1 px-5 pt-6 animate-in fade-in duration-300">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full h-12 bg-gray-200/50 p-1 rounded-xl mb-6">
            <TabsTrigger value="cards" className="flex-1 rounded-lg font-bold text-[14px]">Cards</TabsTrigger>
            <TabsTrigger value="banks" className="flex-1 rounded-lg font-bold text-[14px]">Bank Accounts</TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-4 outline-none">
            {state.hasPayment ? (
              <>
                <Card className="rounded-2xl border-blue-200 shadow-sm overflow-hidden bg-blue-50/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                          <CreditCard className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[15px] text-foreground">Visa</h3>
                          <p className="text-[13px] text-muted-foreground">**** 4242</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-md uppercase tracking-wider">Default</span>
                    </div>
                    <div className="flex items-center gap-2 pt-3 border-t border-blue-100/50">
                      <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground font-semibold h-10 hover:bg-blue-100/50">
                        <Edit2 className="w-4 h-4 mr-2" /> Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteModal('Visa ****4242')} className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 font-semibold h-10">
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border-gray-200 shadow-sm overflow-hidden bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-gray-50 border border-gray-100 rounded-xl shadow-sm flex items-center justify-center">
                          <CreditCard className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[15px] text-foreground">Mastercard</h3>
                          <p className="text-[13px] text-muted-foreground">**** 8821</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                      <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground font-semibold h-10 hover:bg-gray-100">
                        <Edit2 className="w-4 h-4 mr-2" /> Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteModal('Mastercard ****8821')} className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 font-semibold h-10">
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full h-14 rounded-2xl bg-white border border-gray-200 text-primary shadow-sm hover:bg-gray-50 font-bold mt-4" onClick={handleAddPayment}>
                  <Plus className="w-5 h-5 mr-2" /> Add New Card
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-4">
                  <CreditCard className="w-8 h-8" />
                </div>
                <h3 className="text-[17px] font-bold text-gray-900 mb-2">No cards added</h3>
                <p className="text-[14px] text-gray-500 max-w-[250px] mb-6">
                  Add a payment method to easily buy items.
                </p>
                <Button className="w-full h-14 rounded-2xl font-bold shadow-sm" onClick={handleAddPayment}>
                  <Plus className="w-5 h-5 mr-2" /> Add New Card
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="banks" className="space-y-4 outline-none">
            {state.hasPayment ? (
              <>
                <Card className="rounded-2xl border-blue-200 shadow-sm overflow-hidden bg-blue-50/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[15px] text-foreground">Chase</h3>
                          <p className="text-[13px] text-muted-foreground">**** 8231</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-md uppercase tracking-wider">Default</span>
                    </div>
                    <div className="flex items-center gap-2 pt-3 border-t border-blue-100/50">
                      <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground font-semibold h-10 hover:bg-blue-100/50">
                        <Edit2 className="w-4 h-4 mr-2" /> Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteModal('Chase ****8231')} className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 font-semibold h-10">
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full h-14 rounded-2xl bg-white border border-gray-200 text-primary shadow-sm hover:bg-gray-50 font-bold mt-4" onClick={handleAddPayment}>
                  <Plus className="w-5 h-5 mr-2" /> Add Bank Account
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-4">
                  <Building2 className="w-8 h-8" />
                </div>
                <h3 className="text-[17px] font-bold text-gray-900 mb-2">No bank accounts added</h3>
                <p className="text-[14px] text-gray-500 max-w-[250px] mb-6">
                  Add a bank account to receive payouts from your sales.
                </p>
                <Button className="w-full h-14 rounded-2xl font-bold shadow-sm" onClick={handleAddPayment}>
                  <Plus className="w-5 h-5 mr-2" /> Add Bank Account
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomSheet
        isOpen={deleteModal !== null}
        onClose={() => setDeleteModal(null)}
        title="Remove Payment Method?"
      >
        <div className="space-y-6">
          <p className="text-[15px] text-muted-foreground text-center">
            Are you sure you want to remove <span className="font-bold text-foreground">{deleteModal}</span>? You will need to add it again to use it for future transactions.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-14 text-[16px] font-bold" onClick={() => setDeleteModal(null)}>
              Cancel
            </Button>
            <Button variant="destructive" className="flex-1 h-14 text-[16px] font-bold" onClick={handleDelete}>
              Remove
            </Button>
          </div>
        </div>
      </BottomSheet>

      {showToast && (
        <div className="fixed bottom-10 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[calc(480px-32px)] bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-center animate-in slide-in-from-bottom-5 z-50">
          <span className="font-semibold text-[15px]">Payment Method Removed</span>
        </div>
      )}
    </div>
  )
}
