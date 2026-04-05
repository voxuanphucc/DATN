import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card } from '../../components/ui/card'
import type { Invitation } from '../../types/team'
import {
  LoadingState,
  ValidHasAccountState,
  ValidNoAccountState,
  ExpiredState,
  InvalidState,
  SuccessState,
} from '../../components/accept-invitation'
import { toast } from 'sonner'
import axios from 'axios'

type PageState =
  | 'loading'
  | 'valid_has_account'
  | 'valid_no_account'
  | 'expired'
  | 'invalid'
  | 'success'

/**
 * AcceptInvitationPage — Xác nhận lời mời tham gia trang trại (US04/PB04)
 *
 * Flow theo spec:
 * 1. Lấy `token` từ URL query param
 * 2. Gọi API để xác minh token → trả về trạng thái invitation
 * 3. Nếu hợp lệ: kiểm tra user đã có tài khoản chưa
 *    - Có tài khoản → ValidHasAccountState → click "Tham gia" → gọi API join
 *    - Chưa có → ValidNoAccountState → chuyển đến trang đăng ký
 * 4. Nếu hết hạn → ExpiredState
 * 5. Nếu không hợp lệ/bị hủy → InvalidState
 */
export function AcceptInvitationPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [state, setState] = useState<PageState>('loading')
  const [invitation, setInvitation] = useState<Invitation | null>(null)

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setState('invalid')
        return
      }

      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
        const response = await axios.get(`${API_BASE_URL}/invitations/verify`, {
          params: { token },
        })

        const data = response.data

        if (!data.success || !data.invitation) {
          setState('invalid')
          return
        }

        const inv: Invitation = data.invitation
        setInvitation(inv)

        if (inv.status === 'cancelled') {
          setState('invalid')
          return
        }

        if (new Date(inv.expiresAt) < new Date() || inv.status === 'expired') {
          setState('expired')
          return
        }

        // Kiểm tra user đã có tài khoản (từ API trả về)
        const hasAccount = data.hasAccount === true
        setState(hasAccount ? 'valid_has_account' : 'valid_no_account')
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status
          if (status === 404) {
            setState('invalid')
          } else if (status === 410) {
            // 410 Gone = expired
            setState('expired')
          } else {
            setState('invalid')
          }
        } else {
          setState('invalid')
        }
      }
    }

    verifyToken()
  }, [token])

  const handleJoin = async () => {
    if (!token) return
    setState('loading')

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
      await axios.post(`${API_BASE_URL}/invitations/accept`, { token })
      setState('success')
      toast.success('Tham gia trang trại thành công!')
    } catch {
      setState('invalid')
      toast.error('Không thể tham gia trang trại. Vui lòng thử lại.')
    }
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
