import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { CheckCircle2 } from 'lucide-react'
import { Invitation } from '../../types/team'
import { getRoleLabel } from './utils'

interface ValidHasAccountStateProps {
  invitation: Invitation | null
  onJoin: () => void
}

export function ValidHasAccountState({
  invitation,
  onJoin,
}: ValidHasAccountStateProps) {
  return (
    <>
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">
          Lời mời tham gia trang trại
        </CardTitle>
        <CardDescription>
          Bạn đã được mời tham gia{' '}
          <span className="font-semibold text-foreground">
            Trang trại Hoa Hồng
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Email của bạn:</span>
            <span className="font-medium">{invitation?.email}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Vai trò được giao:
            </span>
            <span className="font-medium">
              {getRoleLabel(invitation?.role || '')}
            </span>
          </div>
        </div>
        <p className="text-sm text-center text-muted-foreground">
          Bạn đã có tài khoản trên hệ thống. Nhấn nút bên dưới để tham gia
          ngay.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onJoin}>
          Tham gia trang trại
        </Button>
      </CardFooter>
    </>
  )
}
