import { Plus, Minus, Maximize2, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui'

// Legacy Leaflet component - kept for reference but not used
// Project uses Google Maps API (@react-google-maps/api) instead
// Map controls are integrated into PlotMap component with Google Maps

export function MapControls() {
  // Placeholder - map controls are now integrated in PlotMap component with Google Maps
  return (
    <>
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <Button variant="outline" size="icon" disabled>
          <Plus className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" disabled>
          <Minus className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" disabled>
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
