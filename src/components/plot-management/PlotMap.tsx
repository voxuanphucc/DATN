import { useCallback, useState, useRef } from 'react'
import { GoogleMap, useJsApiLoader, Polygon, Polyline, Marker } from '@react-google-maps/api'
import {
  Plus,
  Minus,
  Maximize2,
  RotateCcw,
  Edit2,
  Save,
  X,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Plot } from '@/types/plot-management'
// TODO: Fetch plots from API
const mockPlots: any[] = []
import { toast } from 'sonner'
import { env } from '@/config/env'

const DEFAULT_CENTER = { lat: 16.0544, lng: 108.2022 }
const DEFAULT_ZOOM = 14

interface DrawingControlsProps {
  isDrawing: boolean
  onStartDrawing: () => void
  onCancelDrawing: () => void
  onSaveDrawing: () => void
  canSave: boolean
}

function DrawingControls({
  isDrawing,
  onStartDrawing,
  onCancelDrawing,
  onSaveDrawing,
  canSave,
}: DrawingControlsProps) {
  return (
    <div className="absolute top-4 left-4 z-[1000] flex gap-2">
      {!isDrawing ? (
        <Button onClick={onStartDrawing} size="sm">
          <Edit2 className="w-4 h-4 mr-2" />
          Vẽ ranh giới
        </Button>
      ) : (
        <>
          <Button onClick={onSaveDrawing} size="sm" disabled={!canSave}>
            <Save className="w-4 h-4 mr-2" />
            Lưu
          </Button>
          <Button onClick={onCancelDrawing} variant="outline" size="sm">
            <X className="w-4 h-4 mr-2" />
            Hủy
          </Button>
        </>
      )}
    </div>
  )
}

export function PlotMap() {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawingPoints, setDrawingPoints] = useState<google.maps.LatLngLiteral[]>([])
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [calculatedArea, setCalculatedArea] = useState<number>(0)
  const [draggedPointIndex, setDraggedPointIndex] = useState<number | null>(null)
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null)

  const mainMapRef = useRef<google.maps.Map | null>(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: env.googleMapsApiKey,
  })

  const plots = mockPlots

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mainMapRef.current = map
  }, [])

  const handleStartDrawing = () => {
    if (!selectedPlot) {
      toast.error('Vui lòng chọn một lô đất từ danh sách bên trái')
      return
    }
    setIsDrawing(true)
    setDrawingPoints([])
  }

  const handleCancelDrawing = () => {
    setIsDrawing(false)
    setDrawingPoints([])
  }

  const calculatePolygonArea = (
    points: google.maps.LatLngLiteral[],
  ): number => {
    if (points.length < 3) return 0
    // Simple area calculation using lat/lng
    let area = 0
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length
      area += points[i].lng * points[j].lat
      area -= points[j].lng * points[i].lat
    }
    area = Math.abs(area / 2)
    // Convert to hectares (rough approximation)
    const hectares = area * 12100
    return Math.round(hectares * 10) / 10
  }

  // Check if two line segments intersect
  const ccw = (A: google.maps.LatLngLiteral, B: google.maps.LatLngLiteral, C: google.maps.LatLngLiteral) => {
    return (C.lat - A.lat) * (B.lng - A.lng) > (B.lat - A.lat) * (C.lng - A.lng)
  }

  const doSegmentsIntersect = (
    A: google.maps.LatLngLiteral,
    B: google.maps.LatLngLiteral,
    C: google.maps.LatLngLiteral,
    D: google.maps.LatLngLiteral,
  ) => {
    return ccw(A, C, D) !== ccw(B, C, D) && ccw(A, B, C) !== ccw(A, B, D)
  }

  // Validate polygon is not self-intersecting
  const isValidPolygon = (points: google.maps.LatLngLiteral[]): boolean => {
    if (points.length < 4) return true // 3 or fewer points can't self-intersect
    
    // Check each edge against every other non-adjacent edge
    for (let i = 0; i < points.length; i++) {
      const A = points[i]
      const B = points[(i + 1) % points.length]
      
      // Start from i+2 to skip adjacent edges
      for (let j = i + 2; j < points.length; j++) {
        // Skip the edge that wraps around
        if (i === 0 && j === points.length - 1) continue
        
        const C = points[j]
        const D = points[(j + 1) % points.length]
        
        if (doSegmentsIntersect(A, B, C, D)) {
          return false
        }
      }
    }
    return true
  }

  const handleSaveDrawing = () => {
    if (drawingPoints.length < 3) {
      toast.error('Cần ít nhất 3 điểm để tạo vùng')
      return
    }
    
    // Validate polygon doesn't self-intersect
    if (!isValidPolygon(drawingPoints)) {
      toast.error('Đa giác tự giao nhau. Vui lòng vẽ lại.')
      return
    }

    const area = calculatePolygonArea(drawingPoints)
    setCalculatedArea(area)
    setShowConfirmDialog(true)
  }

  const handleConfirmSave = () => {
    toast.success(
      `Đã lưu ranh giới cho lô ${selectedPlot?.name}. Diện tích: ${calculatedArea} ha`,
    )
    setIsDrawing(false)
    setDrawingPoints([])
    setShowConfirmDialog(false)
    setSelectedPlot(null)
  }

  const handleZoomIn = () => {
    if (mainMapRef.current) {
      mainMapRef.current.setZoom((mainMapRef.current.getZoom() ?? DEFAULT_ZOOM) + 1)
    }
  }

  const handleZoomOut = () => {
    if (mainMapRef.current) {
      mainMapRef.current.setZoom((mainMapRef.current.getZoom() ?? DEFAULT_ZOOM) - 1)
    }
  }

  const handleReset = () => {
    if (mainMapRef.current) {
      mainMapRef.current.setCenter(DEFAULT_CENTER)
      mainMapRef.current.setZoom(DEFAULT_ZOOM)
    }
  }

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (isDrawing && e.latLng) {
      const newPoint = { lat: e.latLng.lat(), lng: e.latLng.lng() }
      setDrawingPoints((prev) => [...prev, newPoint])
    }
  }

  const handlePointMouseDown = (e: React.MouseEvent, index: number) => {
    if (isDrawing) {
      e.preventDefault()
      setDraggedPointIndex(index)
    }
  }

  const handlePointMouseUp = () => {
    setDraggedPointIndex(null)
  }

  const handlePointMouseMove = (e: google.maps.MapMouseEvent, index: number) => {
    if (draggedPointIndex === index && e.latLng) {
      const newPoints = [...drawingPoints]
      newPoints[index] = { lat: e.latLng.lat(), lng: e.latLng.lng() }
      
      // Validate polygon still valid after move
      if (isValidPolygon(newPoints)) {
        setDrawingPoints(newPoints)
      }
    }
  }

  const handlePointContextMenu = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    if (isDrawing && drawingPoints.length > 3) {
      const newPoints = drawingPoints.filter((_, i) => i !== index)
      setDrawingPoints(newPoints)
      toast.success('Đã xóa điểm')
    } else if (isDrawing && drawingPoints.length <= 3) {
      toast.error('Cần ít nhất 3 điểm để tạo vùng')
    }
  }

  const plotsWithBoundaries = plots.filter((p) => p.boundary)

  return (
    <div className="flex h-full">
      <div className="w-80 border-r bg-background overflow-auto">
        <div className="p-4 border-b">
          <h2 className="font-semibold mb-1">Danh sách lô đất</h2>
          <p className="text-sm text-muted-foreground">
            Chọn lô để vẽ hoặc chỉnh sửa ranh giới
          </p>
        </div>
        <div className="p-4 space-y-2">
          {plots.map((plot) => (
            <Card
              key={plot.id}
              className={`cursor-pointer transition-colors ${
                selectedPlot?.id === plot.id
                  ? 'border-primary bg-accent'
                  : 'hover:bg-accent/50'
              }`}
              onClick={() => setSelectedPlot(plot)}
            >
              <CardHeader className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate">
                      {plot.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {plot.area} ha
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <Badge
                      variant={
                        plot.status === 'active' ? 'default' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {plot.status === 'active' ? 'Canh tác' : 'Nghỉ'}
                    </Badge>
                    {plot.boundary && (
                      <div
                        className="w-4 h-4 rounded border-2 border-background"
                        style={{
                          backgroundColor: plot.color,
                        }}
                      />
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex-1 relative">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={DEFAULT_CENTER}
            zoom={DEFAULT_ZOOM}
            options={{
              disableDefaultUI: true,
              gestureHandling: 'greedy',
            }}
            onLoad={onMapLoad}
            onClick={handleMapClick}
          >
            {/* Render existing plot boundaries */}
            {plotsWithBoundaries.map((plot) => {
              if (!plot.boundary) return null
              const paths = plot.boundary.coordinates[0].map(
                (coord: number[]) => ({
                  lat: coord[1],
                  lng: coord[0],
                }),
              )
              return (
                <Polygon
                  key={plot.id}
                  paths={paths}
                  options={{
                    fillColor: plot.color,
                    fillOpacity: 0.3,
                    strokeColor: plot.color,
                    strokeWeight: 2,
                  }}
                />
              )
            })}

            {/* Render drawing in progress */}
            {isDrawing && drawingPoints.length > 0 && (
              <>
                <Polyline
                  path={drawingPoints}
                  options={{
                    strokeColor: '#3b82f6',
                    strokeWeight: 2,
                    strokeOpacity: 1,
                  }}
                />
                {drawingPoints.length >= 3 && (
                  <Polygon
                    paths={drawingPoints}
                    options={{
                      fillColor: '#3b82f6',
                      fillOpacity: 0.2,
                      strokeColor: '#3b82f6',
                      strokeWeight: 2,
                      strokeOpacity: 0.5,
                    }}
                  />
                )}
                
                {/* Render draggable point markers */}
                {drawingPoints.map((point, index) => (
                  <Marker
                    key={index}
                    position={point}
                    draggable={true}
                    onDragStart={() => setDraggedPointIndex(index)}
                    onDrag={(e) => {
                      if (e.latLng) {
                        const newPoints = [...drawingPoints]
                        newPoints[index] = {
                          lat: e.latLng.lat(),
                          lng: e.latLng.lng(),
                        }
                        // Only update if still valid
                        if (isValidPolygon(newPoints)) {
                          setDrawingPoints(newPoints)
                        }
                      }
                    }}
                    onDragEnd={() => setDraggedPointIndex(null)}
                    onMouseOver={() => setHoveredPointIndex(index)}
                    onMouseOut={() => setHoveredPointIndex(null)}
                    onClick={(e) => {
                      if (e.domEvent?.button === 2) { // Right click
                        handlePointContextMenu(
                          e.domEvent as any,
                          index,
                        )
                      }
                    }}
                    title={`Điểm ${index + 1} - Kéo để di chuyển, Chuột phải để xóa`}
                    icon={{
                      path: 'M 0,-20 Q -20,0 0,20 Q 20,0 0,-20 Z',
                      fillColor:
                        draggedPointIndex === index
                          ? '#ef4444'
                          : hoveredPointIndex === index
                            ? '#f59e0b'
                            : '#3b82f6',
                      fillOpacity: 1,
                      strokeColor: '#fff',
                      strokeWeight: 2,
                      scale: 1.2,
                    }}
                  />
                ))}
              </>
            )}
          </GoogleMap>
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-sm text-gray-400">Loading map...</span>
          </div>
        )}

        {/* Map Controls Overlay */}
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
          <Button variant="secondary" size="icon" onClick={handleZoomIn}>
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={handleZoomOut}>
            <Minus className="w-4 h-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Map Info Overlay */}
        <div className="absolute bottom-4 right-4 z-[1000] bg-background/90 backdrop-blur-sm border rounded-lg p-2 text-xs">
          <div className="flex items-center gap-2">
            <Maximize2 className="w-3 h-3" />
            <span className="text-muted-foreground">Google Maps</span>
          </div>
        </div>

        <DrawingControls
          isDrawing={isDrawing}
          onStartDrawing={handleStartDrawing}
          onCancelDrawing={handleCancelDrawing}
          onSaveDrawing={handleSaveDrawing}
          canSave={drawingPoints.length >= 3}
        />

        {isDrawing && (
          <div className="absolute bottom-4 left-4 z-[1000] bg-background border rounded-lg p-3 shadow-lg">
            <p className="text-sm font-medium mb-2">Đang vẽ ranh giới</p>
            <p className="text-xs text-muted-foreground">
              • Click trên bản đồ để thêm điểm
            </p>
            <p className="text-xs text-muted-foreground">
              • Kéo điểm để di chuyển vị trí
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              • Chuột phải trên điểm để xóa
            </p>
            <p className="text-xs text-muted-foreground font-semibold">
              Đã đánh dấu: {drawingPoints.length} điểm
            </p>
          </div>
        )}
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận lưu ranh giới</DialogTitle>
            <DialogDescription>
              Bạn có muốn lưu ranh giới này cho lô{' '}
              <strong>{selectedPlot?.name}</strong> không?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Diện tích tính toán:
                </span>
                <span className="font-semibold">{calculatedArea} ha</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Diện tích hiện tại:
                </span>
                <span>{selectedPlot?.area} ha</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Diện tích sẽ được tự động cập nhật theo ranh giới vừa vẽ.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Hủy
            </Button>
            <Button onClick={handleConfirmSave}>Lưu ranh giới</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
