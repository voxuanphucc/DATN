export interface Plot {
  id: string
  name: string
  area: number
  description: string
  status: 'active' | 'resting'
  boundary: GeoJSON.Polygon | null
  color: string
  farmId: string
  createdAt: string
  isDeleted: boolean
  relatedPlans: Array<{
    id: string
    name: string
    status: 'active' | 'completed' | 'cancelled'
  }>
}
