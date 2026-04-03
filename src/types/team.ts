export type MemberRole = 'owner' | 'manager' | 'employee' | 'accountant'
export type MemberStatus = 'active' | 'pending' | 'rejected'
export type InvitationStatus = 'pending' | 'accepted' | 'expired' | 'cancelled'

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
  role: MemberRole
  status: InvitationStatus
  invitedAt: string
  expiresAt: string
  token: string
}

export interface Task {
  id: string
  title: string
  status: 'in_progress' | 'completed' | 'unassigned'
  assigneeId?: string
}
