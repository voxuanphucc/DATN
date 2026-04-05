import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SoilRecordForm, SoilRecordsView, AIAnalysisView } from '@/components/soil-analysis'
import type { SoilRecord, Plot } from '@/types/soil-records'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageWrapper, PageHeader, PageContent } from '@/components/layout/PageWrapper'
import { Beaker, Brain } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/slices/authStore'

/**
 * SoilAnalysisPage — Hồ sơ phân tích đất (US08/PB08)
 * - owner: tạo, xem, sửa (24h), xóa mềm
 * - manager: chỉ xem (ẩn nút tạo/sửa/xóa)
 * Plots và records sẽ được fetch từ API khi backend sẵn sàng
 */
export function SoilAnalysisPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  // Placeholder — sẽ fetch từ API
  const plots: Plot[] = []
  const [records, setRecords] = useState<SoilRecord[]>([])

  const [activeTab, setActiveTab] = useState<'records' | 'ai'>('records')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<SoilRecord | null>(null)

  const handleAddRecord = () => {
    setEditingRecord(null)
    setIsFormOpen(true)
  }

  const handleEditRecord = (record: SoilRecord) => {
    setEditingRecord(record)
    setIsFormOpen(true)
  }

  const handleSaveRecord = (data: Partial<SoilRecord>) => {
    if (!user) return
    if (editingRecord?.id) {
      setRecords(
        records.map((r) =>
          r.id === editingRecord.id ? ({ ...r, ...data } as SoilRecord) : r,
        ),
      )
      toast.success('Đã cập nhật hồ sơ thành công')
    } else {
      const newRecord: SoilRecord = {
        ...data,
        id: `r${Date.now()}`,
        createdBy: user.fullName,
        createdAt: new Date().toISOString(),
        isDeleted: false,
      } as SoilRecord
      setRecords([newRecord, ...records])
      toast.success('Đã tạo hồ sơ mới thành công')
    }
    setIsFormOpen(false)
  }

  const handleDeleteRecord = (id: string) => {
    setRecords(
      records.map((r) =>
        r.id === id ? { ...r, isDeleted: true } : r,
      ),
    )
    toast.success('Đã chuyển hồ sơ vào thùng rác')
  }

  const handleSaveExtractedData = (data: Partial<SoilRecord>) => {
    setEditingRecord(data as SoilRecord)
    setActiveTab('records')
    setIsFormOpen(true)
  }

  // Chuyển UserProfileDto sang User dùng trong soil-analysis
  const soilUser = user
    ? {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      }
    : null

  return (
    <PageWrapper variant="default">
      <PageHeader
        title="Quản lý phân tích đất"
        subtitle="Tạo, quản lý hồ sơ phân tích và nhận gợi ý từ AI"
        icon={<Beaker className="w-6 h-6 text-gray-700" />}
      />
      <PageContent>
        <style>{`
          .soil-tabs {
            background: white;
            border-radius: 0.5rem;
            padding: 1.5rem;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            border: 1px solid #e5e7eb;
          }
          .soil-tabs [role="tablist"] {
            display: flex;
            gap: 1rem;
            border-bottom: 1px solid #e5e7eb;
          }
          .soil-tabs [role="tab"] {
            padding: 0.75rem 1.5rem;
            font-weight: 500;
            color: #6b7280;
            border-bottom: 2px solid transparent;
            margin-bottom: -1px;
            transition: all 150ms;
            cursor: pointer;
          }
          .soil-tabs [role="tab"][aria-selected="true"] {
            color: #1f2937;
            border-color: #1f2937;
          }
        `}</style>
        <div className="soil-tabs">
          <Tabs
            value={activeTab}
            onValueChange={(val) => {
              const newTab = val as 'records' | 'ai'
              setActiveTab(newTab)
              if (newTab === 'ai') {
                navigate('/soil-ai-analysis')
              }
            }}
          >
            <TabsList className="bg-transparent border-0 p-0">
              <TabsTrigger value="records" className="data-[state=active]:bg-transparent">
                <Beaker className="w-4 h-4 mr-2" />
                Hồ sơ phân tích
              </TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-transparent">
                <Brain className="w-4 h-4 mr-2" />
                Phân tích AI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="records" className="mt-6">
              {soilUser ? (
                <SoilRecordsView
                  user={soilUser}
                  plots={plots}
                  records={records}
                  onAddRecord={handleAddRecord}
                  onEditRecord={handleEditRecord}
                  onDeleteRecord={handleDeleteRecord}
                />
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Vui lòng đăng nhập để xem hồ sơ phân tích.
                </p>
              )}
            </TabsContent>

            <TabsContent value="ai" className="mt-6">
              {soilUser ? (
                <AIAnalysisView
                  user={soilUser}
                  plots={plots}
                  onSaveExtractedData={handleSaveExtractedData}
                />
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Vui lòng đăng nhập để sử dụng phân tích AI.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </PageContent>

      {soilUser && (
        <SoilRecordForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          plots={plots}
          initialData={editingRecord}
          onSave={handleSaveRecord}
        />
      )}
    </PageWrapper>
  )
}
