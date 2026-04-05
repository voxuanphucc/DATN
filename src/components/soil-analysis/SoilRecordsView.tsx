import { useMemo, useState } from 'react'
import { User, Plot, SoilRecord, checkThresholds } from '@/types'
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
import { Plus, Edit2, Trash2, AlertTriangle, Eye, EyeOff, TrendingUp } from 'lucide-react'
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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { SoilRecordsTableSkeleton } from '@/components/skeletons'
import { useSimulatedLoading } from '@/hooks/useSimulatedLoading'

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

  // Simulate loading state for skeleton display
  const isLoading = useSimulatedLoading(true, 300)

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

  const getHoursRemaining = (createdAt: string) => {
    const hours = differenceInHours(new Date(), parseISO(createdAt))
    const remaining = 24 - hours
    return Math.max(0, remaining)
  }

  const getPlotName = (id: string) =>
    plots.find((p) => p.id === id)?.name || 'Unknown'

  // Prepare chart data from filtered records
  const chartData = useMemo(() => {
    return filteredRecords
      .sort((a, b) => new Date(a.sampleDate).getTime() - new Date(b.sampleDate).getTime())
      .map((record) => ({
        date: format(parseISO(record.sampleDate), 'dd/MM'),
        fullDate: record.sampleDate,
        pH: record.pH,
        'Đạm (N)': record.nitrogen,
        'Lân (P)': record.phosphorus,
        'Kali (K)': record.potassium,
        'Độ ẩm (%)': record.moisture,
      }))
  }, [filteredRecords])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Dữ liệu phân tích</CardTitle>
            <div className="flex items-center gap-4">
              {user.role === 'owner' && (
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
              <TabsTrigger value="chart" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Biểu đồ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {isLoading ? (
                <SoilRecordsTableSkeleton />
              ) : (
                <>
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
                                  ⏱️ Còn {getHoursRemaining(record.createdAt)}h
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="bg-red-50 text-red-600 border-red-200"
                                >
                                  ❌ Hết hạn
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              {user.role === 'owner' && !record.isDeleted && (
                                <div className="flex justify-end gap-2">
                                  {editable ? (
                                    <>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onEditRecord(record)}
                                        title={`Chỉnh sửa (còn ${getHoursRemaining(record.createdAt)}h)`}
                                      >
                                        <Edit2 className="h-4 w-4 text-blue-600" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setRecordToDelete(record.id)}
                                        title="Xóa"
                                      >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                      </Button>
                                    </>
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
                                            Đã quá 24h, không thể chỉnh sửa hoặc xóa
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  )}
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
                </>
              )}
            </TabsContent>

            <TabsContent value="chart" className="space-y-4">
              {chartData.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <p className="text-muted-foreground mb-2">
                    Không có dữ liệu để hiển thị biểu đồ
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Thêm hồ sơ phân tích để xem xu hướng theo thời gian
                  </p>
                </div>
              ) : (
                <div className="w-full h-96 bg-white p-4 rounded-lg border">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 5, right: 30, left: 0, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="date"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        yAxisId="left"
                        label={{ value: 'pH / Đạm / Lân / Kali', angle: -90, position: 'insideLeft' }}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        label={{ value: 'Độ ẩm (%)', angle: 90, position: 'insideRight' }}
                        tick={{ fontSize: 12 }}
                      />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          padding: '8px',
                        }}
                        formatter={(value) => typeof value === 'number' ? value.toFixed(2) : value}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="pH"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        connectNulls
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="Đạm (N)"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        connectNulls
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="Lân (P)"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        connectNulls
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="Kali (K)"
                        stroke="#a855f7"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        connectNulls
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="Độ ẩm (%)"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        connectNulls
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
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
