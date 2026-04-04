import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AIAnalysisView } from '@/components/soil-analysis'
import {
  currentUser,
  plots,
  initialSoilRecords,
  SoilRecord,
} from '@/data/soil-records'
import { SoilRecordForm } from '@/components/soil-analysis'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageWrapper, PageHeader, PageContent } from '@/components/layout/PageWrapper'
import { Beaker, Brain } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function AIAnalysisPage() {
  const navigate = useNavigate()
  const [user] = useState(currentUser)
  const [records, setRecords] = useState<SoilRecord[]>(initialSoilRecords)

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<SoilRecord | null>(null)

  const handleSaveExtractedData = (data: Partial<SoilRecord>) => {
    setEditingRecord(data as SoilRecord)
    setIsFormOpen(true)
  }

  const handleSaveRecord = (data: Partial<SoilRecord>) => {
    // Create new record from extracted data
    const newRecord: SoilRecord = {
      ...data,
      id: `r${Date.now()}`,
      createdBy: user.name,
      createdAt: new Date().toISOString(),
      isDeleted: false,
    } as SoilRecord
    setRecords([newRecord, ...records])
    toast.success('Đã tạo hồ sơ mới từ dữ liệu AI thành công')
    setIsFormOpen(false)
  }

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
          <Tabs value="ai" onValueChange={(val) => {
            if (val === 'records') {
              navigate('/soil-analysis')
            }
          }}>
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
              <AIAnalysisView
                user={user}
                plots={plots}
                onSaveExtractedData={handleSaveExtractedData}
              />
            </TabsContent>
          </Tabs>
        </div>
      </PageContent>

      <SoilRecordForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        plots={plots}
        initialData={editingRecord}
        onSave={handleSaveRecord}
      />
    </PageWrapper>
  )
}
