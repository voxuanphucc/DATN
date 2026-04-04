import { Plus, Minus, Maximize2, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui'
import { useMap } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'

const DEFAULT_CENTER: LatLngExpression = [16.0544, 108.2022]
const DEFAULT_ZOOM = 14

export function MapControls() {
  const map = useMap()

  const handleZoomIn = () => map.zoomIn()
  const handleZoomOut = () => map.zoomOut()
  const handleReset = () => {
    map.setView(DEFAULT_CENTER, DEFAULT_ZOOM)
  }

  return (
    <>
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <Button variant="outline" size="icon" onClick={handleZoomIn}>
          <Plus className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleZoomOut}>
          <Minus className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleReset}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <div className="absolute bottom-4 right-4 z-[1000] bg-background/90 backdrop-blur-sm border rounded-lg p-2 text-xs">
        <div className="flex items-center gap-2">
          <Maximize2 className="w-3 h-3" />
          <span className="text-muted-foreground">Bản đồ vệ tinh</span>
        </div>
      </div>
    </>
  )
}
