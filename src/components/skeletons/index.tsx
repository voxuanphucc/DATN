import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function PlotTableSkeleton() {
  return (
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
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-48" />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function PlotCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function SoilRecordsTableSkeleton() {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ngày lấy mẫu</TableHead>
            <TableHead>pH</TableHead>
            <TableHead>Đạm (N)</TableHead>
            <TableHead>Lân (P)</TableHead>
            <TableHead>Kali (K)</TableHead>
            <TableHead>Độ ẩm (%)</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-12" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-12" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-12" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-12" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-12" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function TeamMembersTableSkeleton() {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thành viên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-40" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-8 w-20 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
