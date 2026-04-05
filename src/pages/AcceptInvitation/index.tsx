import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
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
import { acceptInvitationService } from '@/services'
import LoginBg from '@/assets/login.png'
import LogoBrowser from '@/assets/Logo-browser.png'

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
  const navigate = useNavigate()
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
        const response = await acceptInvitationService.verifyInvitation(token)

        if (!response.success || !response.data) {
          setState('invalid')
          return
        }

        const inv: Invitation = response.data as unknown as Invitation
        setInvitation(inv)

        if (inv.status === 'cancelled') {
          setState('invalid')
          return
        }

        if (new Date(inv.expiresAt) < new Date() || inv.status === 'expired') {
          setState('expired')
          return
        }

        // Note: Kiểm tra hasAccount từ API response
        // Tạm thời không sử dụng vì API chưa trả về field này
        setState('valid_has_account')
      } catch (error) {
        // Error handling từ axios interceptor
        setState('invalid')
      }
    }

    verifyToken()
  }, [token])

  const handleJoin = async () => {
    if (!token) return
    setState('loading')

    try {
      await acceptInvitationService.acceptInvitation({ token })
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
    <div className="h-screen w-full flex">
      <style>{`
        /* Left Column - Form Section */
        .form-section {
          width: 100%;
          height: 100vh;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 1rem;
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 1024px) {
          .form-section {
            width: 50%;
            padding: 2rem 2.5rem;
            overflow: hidden;
          }
        }

        /* Right Column - Image Section */
        .image-section {
          display: none;
          width: 50%;
          height: 100vh;
          background-image: url('${LoginBg}');
          background-size: cover;
          background-position: center;
          border-radius: 16px 0 0 16px;
        }

        @media (min-width: 1024px) {
          .image-section {
            display: block;
          }
        }

        .invitation-card {
          width: 100%;
          max-width: 400px;
          background: white;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }
      `}</style>

      <div className="form-section">
        <button
          onClick={() => navigate('/')}
          className="absolute top-0 left-0 p-4 md:p-8 flex items-center gap-2.5 bg-none border-none cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          <div className="relative" style={{
            filter: 'drop-shadow(0 4px 8px rgba(5, 150, 105, 0.25))'
          }}>
            <img
              src={LogoBrowser}
              alt="FarmerAI logo"
              className="h-8 md:h-10 object-contain transition-transform duration-300"
              style={{ filter: 'hue-rotate(0deg) brightness(1.1) saturate(1.3)' }}
            />
          </div>
          <span 
            className="font-prompt font-extrabold text-[38px] leading-none"
            style={{
              background: 'linear-gradient(135deg, #047857 0%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 2px 4px rgba(5, 150, 105, 0.1)'
            }}
          >
            farmarAI
          </span>
        </button>
        <Card className="invitation-card">{renderContent()}</Card>
      </div>

      <div className="image-section"></div>
    </div>
  )
}

export default AcceptInvitationPage
