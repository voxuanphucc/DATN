import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function SuccessState() {
  const navigate = useNavigate()

  return (
    <>
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500" />
        </div>
        <CardTitle className="text-2xl">Thành công!</CardTitle>
        <CardDescription>
          Bạn đã trở thành thành viên của Trang trại Hoa Hồng.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => navigate('/')}>
          Vào trang quản lý
        </Button>
      </CardFooter>
    </>
  )
}
