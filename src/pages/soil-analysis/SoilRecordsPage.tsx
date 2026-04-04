import React, { useEffect, useState } from 'react'
import { SoilRecordsView } from '@/components/soil-analysis'
import {
  currentUser,
  plots,
  initialSoilRecords,
  Role,
  SoilRecord,
} from '@/data/soil-records'
import { SoilRecordForm } from '@/components/soil-analysis'
import { toast } from 'sonner'

export function SoilRecordsPage() {
  const [user, setUser] = useState(currentUser)
  const [records, setRecords] = useState<SoilRecord[]>(initialSoilRecords)

  // Form state
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
          user={user}
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
