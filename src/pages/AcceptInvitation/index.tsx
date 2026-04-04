import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card } from '../../components/ui/card'
import { mockInvitations } from '../../data/mockData'
import { Invitation } from '../../types/team'
import {
  LoadingState,
  ValidHasAccountState,
  ValidNoAccountState,
  ExpiredState,
  InvalidState,
  SuccessState,
} from '../../components/accept-invitation'
import { toast } from 'sonner'

type PageState =
  | 'loading'
  | 'valid_has_account'
  | 'valid_no_account'
  | 'expired'
  | 'invalid'
  | 'success'

export function AcceptInvitationPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [state, setState] = useState<PageState>('loading')
  const [invitation, setInvitation] = useState<Invitation | null>(null)

  useEffect(() => {
    // Simulate API call to verify token
    const verifyToken = () => {
      setTimeout(() => {
        if (!token) {
          setState('invalid')
          return
        }
        const found = mockInvitations.find((i) => i.token === token)
        if (!found) {
          setState('invalid')
          return
        }
        setInvitation(found)
        if (found.status === 'cancelled') {
          setState('invalid')
          return
        }
        if (
          new Date(found.expiresAt) < new Date() ||
          found.status === 'expired'
        ) {
          setState('expired')
          return
        }
        // Simulate checking if user has an account (randomly assign for demo)
        const hasAccount = Math.random() > 0.5
        setState(hasAccount ? 'valid_has_account' : 'valid_no_account')
      }, 1500)
    }
    verifyToken()
  }, [token])

  const handleJoin = () => {
    setState('loading')
    setTimeout(() => {
      setState('success')
      toast.success('Tham gia trang trại thành công!')
    }, 1000)
  }

  const renderContent = () => {
    switch (state) {
      case 'loading':
        return <LoadingState />
      case 'valid_has_account':
        return (
          <ValidHasAccountState invitation={invitation} onJoin={handleJoin} />
        )
      case 'valid_no_account':
        return <ValidNoAccountState invitation={invitation} />
      case 'expired':
        return <ExpiredState />
      case 'invalid':
        return <InvalidState />
      case 'success':
        return <SuccessState />
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <style>{`
        .invitation-card {
          background: white;
          border: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border-radius: 1rem;
        }
      `}</style>
      <Card className="invitation-card w-full max-w-md">{renderContent()}</Card>
    </div>
  )
}

export default AcceptInvitationPage
