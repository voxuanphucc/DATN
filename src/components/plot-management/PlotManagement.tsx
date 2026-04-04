import { useMemo, useState } from 'react'
import { Search, Plus, Grid3x3, List, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui'
import { Input } from '@/components/ui'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { Badge } from '@/components/ui'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { PlotDialog } from './PlotDialog'
import { DeletePlotDialog } from './DeletePlotDialog'
import { Plot } from '@/types/plot-management'
import { mockPlots } from '@/data/plots/mockPlots'
import { toast } from 'sonner'

export function PlotManagement() {
  const [plots, setPlots] = useState<Plot[]>(
    mockPlots.filter((p) => !p.isDeleted),
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'resting'
  >('all')
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table')
  const [editingPlot, setEditingPlot] = useState<Plot | null>(null)
  const [deletingPlot, setDeletingPlot] = useState<Plot | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredPlots = useMemo(() => {
    return plots.filter((plot) => {
      const matchesSearch = plot.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesStatus =
        statusFilter === 'all' || plot.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [plots, searchQuery, statusFilter])

  const handleAddPlot = (
    plotData: Omit<
      Plot,
      'id' | 'createdAt' | 'isDeleted' | 'relatedPlans' | 'farmId' | 'color'
    >,
  ) => {
    const newPlot: Plot = {
      ...plotData,
      id: Date.now().toString(),
      farmId: 'farm-1',
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      createdAt: new Date().toISOString(),
      isDeleted: false,
      relatedPlans: [],
    }
    setPlots([...plots, newPlot])
    setIsDialogOpen(false)
    toast.success('Đã thêm lô đất thành công')
  }

  const handleEditPlot = (
    plotData: Omit<
      Plot,
      'id' | 'createdAt' | 'isDeleted' | 'relatedPlans' | 'farmId' | 'color'
    >,
  ) => {
    if (!editingPlot) return
    setPlots(
      plots.map((p) =>
        p.id === editingPlot.id
          ? {
              ...p,
              ...plotData,
            }
          : p,
      ),
    )
    setEditingPlot(null)
    setIsDialogOpen(false)
    toast.success('Đã cập nhật lô đất thành công')
  }

  const handleDeletePlot = () => {
    if (!deletingPlot) return
    setPlots(
      plots
        .map((p) =>
          p.id === deletingPlot.id
            ? {
                ...p,
                isDeleted: true,
              }
            : p,
        )
        .filter((p) => !p.isDeleted),
    )
    setDeletingPlot(null)
    toast.success('Đã xóa lô đất thành công')
  }

  const openAddDialog = () => {
    setEditingPlot(null)
    setIsDialogOpen(true)
  }

  const openEditDialog = (plot: Plot) => {
    setEditingPlot(plot)
    setIsDialogOpen(true)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Quản lý lô đất</h1>
          <Button onClick={openAddDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm lô đất
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên lô..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as 'all' | 'active' | 'resting')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="active">Đang canh tác</SelectItem>
              <SelectItem value="resting">Đang nghỉ</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-1 border rounded-lg p-1">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'card' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('card')}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {filteredPlots.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-muted-foreground mb-2">
              Không tìm thấy lô đất nào
            </p>
            <p className="text-sm text-muted-foreground">
              Thử thay đổi bộ lọc hoặc thêm lô đất mới
            </p>
          </div>
        ) : viewMode === 'table' ? (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên lô</TableHead>
                  <TableHead>Diện tích (ha)</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlots.map((plot) => (
                  <TableRow key={plot.id}>
                    <TableCell className="font-medium">{plot.name}</TableCell>
                    <TableCell>{plot.area.toFixed(1)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          plot.status === 'active' ? 'default' : 'secondary'
                        }
                      >
                        {plot.status === 'active'
                          ? 'Đang canh tác'
                          : 'Đang nghỉ'}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {plot.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(plot)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeletingPlot(plot)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlots.map((plot) => (
              <Card key={plot.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{plot.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {plot.area.toFixed(1)} ha
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        plot.status === 'active' ? 'default' : 'secondary'
                      }
                    >
                      {plot.status === 'active' ? 'Đang canh tác' : 'Đang nghỉ'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {plot.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => openEditDialog(plot)}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Chỉnh sửa
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeletingPlot(plot)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <PlotDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        plot={editingPlot}
        onSave={editingPlot ? handleEditPlot : handleAddPlot}
      />

      <DeletePlotDialog
        plot={deletingPlot}
        onOpenChange={(open) => !open && setDeletingPlot(null)}
        onConfirm={handleDeletePlot}
      />
    </div>
  )
}
