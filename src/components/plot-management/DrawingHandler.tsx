import { useMapEvents } from 'react-leaflet'
import { LatLng, LeafletMouseEvent } from 'leaflet'

interface DrawingHandlerProps {
  isDrawing: boolean
  onPointAdded: (point: LatLng) => void
}

export function DrawingHandler({
  isDrawing,
  onPointAdded,
}: DrawingHandlerProps) {
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      if (isDrawing) {
        onPointAdded(e.latlng)
      }
    },
  })

  return null
}
