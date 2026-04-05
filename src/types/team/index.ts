/**
 * Team Related Types
 * Theo spec US04/US05/PB04/PB05
 */

// ─── Type Aliases (exported để dùng trong components) ────────────────────────
export type MemberRole = 'owner' | 'manager' | 'employee'
export type MemberStatus = 'active' | 'pending' | 'rejected'
export type InvitationStatus = 'pending' | 'expired' | 'cancelled' | 'accepted'

// ─── Interfaces ───────────────────────────────────────────────────────────────
export interface Member {
  id: string
  name: string
  email: string
  role: MemberRole
  status: MemberStatus
  avatar?: string
  joinedAt: string
  expiresAt?: string
}

export interface Invitation {
  id: string
  email: string
  role: 'manager' | 'employee'  // Chỉ mời manager/employee, không mời owner
  status: InvitationStatus
  invitedAt: string
  expiresAt: string
  token: string
}

export interface Task {
  id: string
  title: string
  status: 'in_progress' | 'unassigned'
  assigneeId?: string
}
