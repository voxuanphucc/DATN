import { Member, Invitation, Task } from '../types/team'

export const CURRENT_USER_EMAIL = 'an.nguyen@example.com'

export const mockMembers: Member[] = [
  {
    id: 'm1',
    name: 'Nguyễn Văn An',
    email: 'an.nguyen@example.com',
    role: 'owner',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=m1',
    joinedAt: '2023-01-15T08:00:00Z',
  },
  {
    id: 'm2',
    name: 'Trần Thị Bình',
    email: 'binh.tran@example.com',
    role: 'manager',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=m2',
    joinedAt: '2023-02-20T09:30:00Z',
  },
  {
    id: 'm3',
    name: 'Lê Văn Cường',
    email: 'cuong.le@example.com',
    role: 'employee',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=m3',
    joinedAt: '2023-03-10T10:15:00Z',
  },
  {
    id: 'm4',
    name: 'Phạm Thị Dung',
    email: 'dung.pham@example.com',
    role: 'accountant',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=m4',
    joinedAt: '2023-04-05T14:20:00Z',
  },
  {
    id: 'm5',
    name: 'Hoàng Văn Em',
    email: 'em.hoang@example.com',
    role: 'employee',
    status: 'pending',
    joinedAt: '2023-10-01T08:00:00Z',
    expiresAt: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
  },
  {
    id: 'm6',
    name: 'Đinh Thị Phượng',
    email: 'phuong.dinh@example.com',
    role: 'employee',
    status: 'rejected',
    joinedAt: '2023-09-15T08:00:00Z',
  },
]

export const mockInvitations: Invitation[] = [
  {
    id: 'inv1',
    email: 'em.hoang@example.com',
    role: 'employee',
    status: 'pending',
    invitedAt: '2023-10-01T08:00:00Z',
    expiresAt: new Date(Date.now() + 86400000 * 2).toISOString(),
    token: 'valid_token_123',
  },
  {
    id: 'inv2',
    email: 'giang.vu@example.com',
    role: 'manager',
    status: 'expired',
    invitedAt: '2023-09-01T08:00:00Z',
    expiresAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    token: 'expired_token_456',
  },
  {
    id: 'inv3',
    email: 'hai.nguyen@example.com',
    role: 'employee',
    status: 'cancelled',
    invitedAt: '2023-09-20T08:00:00Z',
    expiresAt: new Date(Date.now() + 86400000 * 5).toISOString(),
    token: 'cancelled_token_789',
  },
]

export const mockTasks: Task[] = [
  {
    id: 't1',
    title: 'Kiểm tra hệ thống tưới tiêu',
    status: 'in_progress',
    assigneeId: 'm2',
  },
  {
    id: 't2',
    title: 'Thu hoạch cà chua khu A',
    status: 'in_progress',
    assigneeId: 'm3',
  },
  {
    id: 't3',
    title: 'Bón phân khu B',
    status: 'in_progress',
    assigneeId: 'm3',
  },
  {
    id: 't4',
    title: 'Lập báo cáo tài chính tháng 9',
    status: 'in_progress',
    assigneeId: 'm4',
  },
  { id: 't5', title: 'Sửa chữa máy cày', status: 'unassigned' },
]
