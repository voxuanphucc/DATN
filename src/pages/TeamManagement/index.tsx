import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs'
import { Users, UserPlus, Mail, ShieldCheck } from 'lucide-react'
import {
  MemberList,
  PendingInvitations,
  InviteDialog,
  ChangeRoleDialog,
  RemoveMemberDialog,
} from '../../components/team-management'
import { mockMembers, mockInvitations, mockTasks } from '../../data/mockData'
import { Member, Invitation, Task, MemberRole } from '../../types/team'

export function TeamManagementPage() {
  const [members, setMembers] = useState<Member[]>(mockMembers)
  const [invitations, setInvitations] = useState<Invitation[]>(mockInvitations)
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [selectedMemberForRole, setSelectedMemberForRole] =
    useState<Member | null>(null)
  const [selectedMemberForRemove, setSelectedMemberForRemove] =
    useState<Member | null>(null)

  const activeMembersCount = members.filter((m) => m.status === 'active').length
  const pendingInvitesCount = invitations.filter(
    (i) => i.status === 'pending' && new Date(i.expiresAt) > new Date(),
  ).length

  const handleInvite = (email: string, role: MemberRole) => {
    const newInvite: Invitation = {
      id: `inv_${Date.now()}`,
      email,
      role,
      status: 'pending',
      invitedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000 * 3).toISOString(),
      token: `token_${Date.now()}`,
    }
    setInvitations([newInvite, ...invitations])
  }

  const handleChangeRole = (memberId: string, newRole: MemberRole) => {
    setMembers(
      members.map((m) =>
        m.id === memberId
          ? {
              ...m,
              role: newRole,
            }
          : m,
      ),
    )
  }

  const handleRemoveMember = (memberId: string) => {
    // Remove member
    setMembers(members.filter((m) => m.id !== memberId))
    // Unassign tasks
    setTasks(
      tasks.map((t) =>
        t.assigneeId === memberId
          ? {
              ...t,
              assigneeId: undefined,
              status: 'unassigned',
            }
          : t,
      ),
    )
  }

  const handleCancelInvitation = (id: string) => {
    setInvitations(
      invitations.map((i) =>
        i.id === id
          ? {
              ...i,
              status: 'cancelled',
            }
          : i,
      ),
    )
  }

  const handleResendInvitation = (id: string) => {
    const inv = invitations.find((i) => i.id === id)
    if (inv) {
      const newInvite: Invitation = {
        ...inv,
        id: `inv_${Date.now()}`,
        status: 'pending',
        invitedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 86400000 * 3).toISOString(),
        token: `token_${Date.now()}`,
      }
      setInvitations([newInvite, ...invitations.filter((i) => i.id !== id)])
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Quản lý thành viên
          </h1>
          <p className="text-muted-foreground mt-1">Trang trại Hoa Hồng</p>
        </div>
        <Button onClick={() => setIsInviteOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Mời thành viên
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng thành viên
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{members.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Đang hoạt động
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMembersCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lời mời đang chờ
            </CardTitle>
            <Mail className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingInvitesCount}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="members">Thành viên</TabsTrigger>
          <TabsTrigger value="invitations">Lời mời đang chờ</TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="space-y-4">
          <MemberList
            members={members}
            onChangeRoleClick={setSelectedMemberForRole}
            onRemoveClick={setSelectedMemberForRemove}
          />
        </TabsContent>
        <TabsContent value="invitations" className="space-y-4">
          <PendingInvitations
            invitations={invitations}
            onCancelInvitation={handleCancelInvitation}
            onResendInvitation={handleResendInvitation}
          />
        </TabsContent>
      </Tabs>

      <InviteDialog
        open={isInviteOpen}
        onOpenChange={setIsInviteOpen}
        onInvite={handleInvite}
        existingMembers={members}
      />

      <ChangeRoleDialog
        member={selectedMemberForRole}
        open={!!selectedMemberForRole}
        onOpenChange={(open) => !open && setSelectedMemberForRole(null)}
        onChangeRole={handleChangeRole}
      />

      <RemoveMemberDialog
        member={selectedMemberForRemove}
        open={!!selectedMemberForRemove}
        onOpenChange={(open) => !open && setSelectedMemberForRemove(null)}
        onRemove={handleRemoveMember}
        tasks={tasks}
      />
    </div>
  )
}

export default TeamManagementPage
