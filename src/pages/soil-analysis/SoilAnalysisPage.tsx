import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SoilRecordForm, SoilRecordsView, AIAnalysisView } from '@/components/soil-analysis'
import {
  currentUser,
  plots,
  initialSoilRecords,
  Role,
  SoilRecord,
} from '@/data/soil-records'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageWrapper, PageHeader, PageContent } from '@/components/layout/PageWrapper'
import { Beaker, Brain } from 'lucide-react'
import { toast } from 'sonner'

export function SoilAnalysisPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'records' | 'ai'>('records')
  const [user, setUser] = useState(currentUser)
  const [records, setRecords] = useState<SoilRecord[]>(initialSoilRecords)

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<SoilRecord | null>(null)

  const handleSetUserRole = (role: Role) => {
    setUser({
      ...user,
      role,
    })
    toast.info(
      `Đã chuyển sang vai trò: ${role === 'farmer' ? 'Nông dân' : 'Quản lý'}`
    )
  }

  const handleAddRecord = () => {
    setEditingRecord(null)
    setIsFormOpen(true)
  }

  const handleEditRecord = (record: SoilRecord) => {
    setEditingRecord(record)
    setIsFormOpen(true)
  }

  const handleSaveRecord = (data: Partial<SoilRecord>) => {
    if (editingRecord && editingRecord.id) {
      // Update
      setRecords(
        records.map((r) =>
          r.id === editingRecord.id
            ? ({
                ...r,
                ...data,
              } as SoilRecord)
            : r
        )
      )
      toast.success('Đã cập nhật hồ sơ thành công')
    } else {
      // Create
      const newRecord: SoilRecord = {
        ...data,
        id: `r${Date.now()}`,
        createdBy: user.name,
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
        r.id === id
          ? {
              ...r,
              isDeleted: true,
            }
          : r
      )
    )
    toast.success('Đã chuyển hồ sơ vào thùng rác')
  }

  const handleSaveExtractedData = (data: Partial<SoilRecord>) => {
    setEditingRecord(data as SoilRecord)
    setActiveTab('records')
    setIsFormOpen(true)
  }

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
          <Tabs value={activeTab} onValueChange={(val) => {
            const newTab = val as 'records' | 'ai'
            setActiveTab(newTab)
            if (newTab === 'ai') {
              navigate('/soil-ai-analysis')
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

            <TabsContent value="records" className="mt-6">
              <SoilRecordsView
                user={user}
                plots={plots}
                records={records}
                onAddRecord={handleAddRecord}
                onEditRecord={handleEditRecord}
                onDeleteRecord={handleDeleteRecord}
              />
            </TabsContent>

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
