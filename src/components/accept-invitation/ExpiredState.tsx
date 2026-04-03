import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function ExpiredState() {
  const navigate = useNavigate()

  return (
    <>
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-500" />
        </div>
        <CardTitle className="text-2xl">Lời mời đã hết hạn</CardTitle>
        <CardDescription>
          Liên kết mời này đã quá hạn sử dụng.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm text-muted-foreground">
          Vui lòng liên hệ với chủ trang trại để yêu cầu gửi lại lời mời
          mới.
        </p>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate('/')}
        >
          Về trang chủ
        </Button>
      </CardFooter>
    </>
  )
}
