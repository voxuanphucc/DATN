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
import { toast } from 'sonner'

interface ValidNoAccountStateProps {
  invitation: Invitation | null
}

export function ValidNoAccountState({
  invitation,
}: ValidNoAccountStateProps) {
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
        <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 rounded-md p-3 text-sm text-blue-800 dark:text-blue-200">
          Bạn chưa có tài khoản. Vui lòng đăng ký tài khoản mới để tham
          gia trang trại.
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => toast.info('Chuyển hướng đến trang đăng ký...')}
        >
          Đăng ký tài khoản
        </Button>
      </CardFooter>
    </>
  )
}
