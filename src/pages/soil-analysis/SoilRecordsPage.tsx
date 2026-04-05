import { useState } from 'react'
import { SoilRecordsView, SoilRecordForm } from '@/components/soil-analysis'
import type { Plot, SoilRecord } from '@/types/soil-records'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/slices/authStore'

/**
 * SoilRecordsPage — Trang hồ sơ phân tích đất riêng biệt
 * Fix: biến `plots` phải được định nghĩa trong scope
 */
export function SoilRecordsPage() {
  const { user } = useAuthStore()

  // Placeholder — sẽ fetch từ API
  const plots: Plot[] = []
  const [records, setRecords] = useState<SoilRecord[]>([])
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

  const soilUser = user
    ? {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      }
    : null

  if (!soilUser) {
    return (
      <div className="space-y-6">
        <p className="text-muted-foreground text-center py-8">
          Vui lòng đăng nhập để xem hồ sơ phân tích.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hồ sơ phân tích đất</h1>
          <p className="text-muted-foreground mt-2">
            Tạo, quản lý và theo dõi chất lượng đất qua các kỳ phân tích
          </p>
        </div>

        <SoilRecordsView
          user={soilUser}
          plots={plots}
          records={records}
          onAddRecord={handleAddRecord}
          onEditRecord={handleEditRecord}
          onDeleteRecord={handleDeleteRecord}
        />
      </div>

      <SoilRecordForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        plots={plots}
        initialData={editingRecord}
        onSave={handleSaveRecord}
      />
    </>
  )
}
