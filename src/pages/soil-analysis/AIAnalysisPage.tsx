import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AIAnalysisView, SoilRecordForm } from '@/components/soil-analysis'
import type { Plot, SoilRecord } from '@/types/soil-records'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageWrapper, PageHeader, PageContent } from '@/components/layout/PageWrapper'
import { Beaker, Brain } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/slices/authStore'

/**
 * AIAnalysisPage — Upload kết quả phân tích đất từ lab & nhận gợi ý từ AI (US09/PB09)
 * - Hỗ trợ upload PDF/DOCX, tối đa 10MB
 * - Trích xuất pH, N, P, K, độ ẩm
 * - Gọi AI để gợi ý cây trồng phù hợp
 */
export function AIAnalysisPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  // Placeholder — sẽ fetch từ API
  const plots: Plot[] = []
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<SoilRecord | null>(null)

  const handleSaveExtractedData = (data: Partial<SoilRecord>) => {
    setEditingRecord(data as SoilRecord)
    setIsFormOpen(true)
  }


  const handleSaveRecord = (_data: Partial<SoilRecord>) => {
    if (!user) return
    // Trong thực tế sẽ gọi API POST /soil-records với _data
    toast.success('Đã tạo hồ sơ mới từ dữ liệu AI thành công')
    setIsFormOpen(false)
  }


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
        subtitle="Tải lên kết quả lab và nhận gợi ý từ AI"
        icon={<Brain className="w-6 h-6 text-gray-700" />}
      />
      <PageContent>
        <style>{`
          .ai-tabs {
            background: white;
            border-radius: 0.5rem;
            padding: 1.5rem;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            border: 1px solid #e5e7eb;
          }
          .ai-tabs [role="tablist"] {
            display: flex;
            gap: 1rem;
            border-bottom: 1px solid #e5e7eb;
          }
          .ai-tabs [role="tab"] {
            padding: 0.75rem 1.5rem;
            font-weight: 500;
            color: #6b7280;
            border-bottom: 2px solid transparent;
            margin-bottom: -1px;
            transition: all 150ms;
            cursor: pointer;
          }
          .ai-tabs [role="tab"][aria-selected="true"] {
            color: #1f2937;
            border-color: #1f2937;
          }
        `}</style>
        <div className="ai-tabs">
          <Tabs
            value="ai"
            onValueChange={(val) => {
              if (val === 'records') {
                navigate('/soil-analysis')
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

            <TabsContent value="ai" className="mt-6">
              {soilUser ? (
                <AIAnalysisView
                  user={soilUser}
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
