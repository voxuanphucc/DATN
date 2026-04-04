import React, { useMemo, useState } from 'react'
import { User, Plot, SoilRecord, checkThresholds } from '@/data/soil-records'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Edit2, Trash2, AlertTriangle, Eye, EyeOff } from 'lucide-react'
import { format, differenceInHours, parseISO } from 'date-fns'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface SoilRecordsViewProps {
  user: User
  plots: Plot[]
  records: SoilRecord[]
  onAddRecord: () => void
  onEditRecord: (record: SoilRecord) => void
  onDeleteRecord: (id: string) => void
}

export function SoilRecordsView({
  user,
  plots,
  records,
  onAddRecord,
  onEditRecord,
  onDeleteRecord,
}: SoilRecordsViewProps) {
  const [selectedPlot, setSelectedPlot] = useState<string>('all')
  const [showDeleted, setShowDeleted] = useState(false)
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null)

  const filteredRecords = useMemo(() => {
    return records
      .filter((r) => selectedPlot === 'all' || r.plotId === selectedPlot)
      .filter((r) => (showDeleted ? true : !r.isDeleted))
      .sort(
        (a, b) =>
          new Date(b.sampleDate).getTime() - new Date(a.sampleDate).getTime()
      )
  }, [records, selectedPlot, showDeleted])

  const isEditable = (createdAt: string) => {
    const hours = differenceInHours(new Date(), parseISO(createdAt))
    return hours < 24
  }

  const getPlotName = (id: string) =>
    plots.find((p) => p.id === id)?.name || 'Unknown'

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Dữ liệu phân tích</CardTitle>
            <div className="flex items-center gap-4">
              {user.role === 'farmer' && (
                <Button onClick={onAddRecord} className="gap-2" size="sm">
                  <Plus className="h-4 w-4" />
                  Tạo hồ sơ mới
                </Button>
              )}
              <Select value={selectedPlot} onValueChange={setSelectedPlot}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Tất cả lô đất" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả lô đất</SelectItem>
                  {plots.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="list">Danh sách</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDeleted(!showDeleted)}
                  className="text-muted-foreground h-8"
                >
                  {showDeleted ? (
                    <EyeOff className="h-4 w-4 mr-2" />
                  ) : (
                    <Eye className="h-4 w-4 mr-2" />
                  )}
                  {showDeleted ? 'Ẩn hồ sơ đã xóa' : 'Hiện hồ sơ đã xóa'}
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lô đất</TableHead>
                      <TableHead>Ngày lấy mẫu</TableHead>
                      <TableHead>pH</TableHead>
                      <TableHead>N-P-K (mg/kg)</TableHead>
                      <TableHead>Độ ẩm</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-8 text-muted-foreground"
                        >
                          Không có dữ liệu
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRecords.map((record) => {
                        const warnings = checkThresholds(record)
                        const editable = isEditable(record.createdAt)
                        return (
                          <TableRow
                            key={record.id}
                            className={
                              record.isDeleted ? 'opacity-50 bg-slate-50' : ''
                            }
                          >
                            <TableCell className="font-medium">
                              {getPlotName(record.plotId)}
                              {record.notes && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="ml-2 text-xs bg-slate-100 px-1.5 py-0.5 rounded cursor-help">
                                        📝
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{record.notes}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </TableCell>
                            <TableCell>
                              {format(
                                parseISO(record.sampleDate),
                                'dd/MM/yyyy'
                              )}
                            </TableCell>
                            <TableCell>
                              <span
                                className={
                                  warnings.some((w) => w.includes('pH'))
                                    ? 'text-red-600 font-bold flex items-center gap-1'
                                    : ''
                                }
                              >
                                {record.pH}
                                {warnings.some((w) => w.includes('pH')) && (
                                  <AlertTriangle className="h-3 w-3" />
                                )}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span
                                className={
                                  warnings.some(
                                    (w) =>
                                      w.includes('Đạm') ||
                                      w.includes('Lân') ||
                                      w.includes('Kali')
                                  )
                                    ? 'text-red-600 font-bold'
                                    : ''
                                }
                              >
                                {record.nitrogen} - {record.phosphorus} -{' '}
                                {record.potassium}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span
                                className={
                                  warnings.some((w) => w.includes('Độ ẩm'))
                                    ? 'text-red-600 font-bold'
                                    : ''
                                }
                              >
                                {record.moisture}%
                              </span>
                            </TableCell>
                            <TableCell>
                              {record.isDeleted ? (
                                <Badge variant="secondary">Đã xóa</Badge>
                              ) : editable ? (
                                <Badge
                                  variant="outline"
                                  className="bg-green-50 text-green-700 border-green-200"
                                >
                                  Có thể sửa
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="bg-slate-50 text-slate-500"
                                >
                                  Đã khóa
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              {user.role === 'farmer' && !record.isDeleted && (
                                <div className="flex justify-end gap-2">
                                  {editable ? (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => onEditRecord(record)}
                                      title="Chỉnh sửa (còn hạn 24h)"
                                    >
                                      <Edit2 className="h-4 w-4 text-blue-600" />
                                    </Button>
                                  ) : (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div className="p-2 opacity-50 cursor-not-allowed">
                                            <Edit2 className="h-4 w-4 text-slate-400" />
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>
                                            Đã quá 24h, không thể chỉnh sửa
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setRecordToDelete(record.id)}
                                    title="Xóa"
                                  >
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AlertDialog
        open={!!recordToDelete}
        onOpenChange={(open) => !open && setRecordToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa hồ sơ</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa hồ sơ này không? Dữ liệu sẽ được chuyển
              vào thùng rác (xóa mềm).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (recordToDelete) onDeleteRecord(recordToDelete)
                setRecordToDelete(null)
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
