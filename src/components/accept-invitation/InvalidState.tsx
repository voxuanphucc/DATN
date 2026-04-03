import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { XCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function InvalidState() {
  const navigate = useNavigate()

  return (
    <>
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
          <XCircle className="h-6 w-6 text-destructive" />
        </div>
        <CardTitle className="text-2xl">Lời mời không hợp lệ</CardTitle>
        <CardDescription>
          Liên kết này không tồn tại hoặc đã bị hủy.
        </CardDescription>
      </CardHeader>
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
