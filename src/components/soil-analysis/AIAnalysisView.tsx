import { useState, useRef } from 'react'
import { User, SoilRecord, Plot } from '@/types'

// Cấu trúc gợi ý cây trồng từ AI
interface AISuggestion {
  id: string
  name: string
  compatibility: number
  explanation: string
  details?: string
}

// Danh sách gợi ý AI — sẽ được fetch từ API khi backend sẵn sàng
const aiSuggestions: AISuggestion[] = []

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Alert,
  AlertDescription,
} from '@/components/ui'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  BrainCircuit,
  ArrowRight,
  Save,
} from 'lucide-react'
import { toast } from 'sonner'

interface AIAnalysisViewProps {
  user: User
  plots: Plot[]
  onSaveExtractedData: (data: Partial<SoilRecord>) => void
}

type UploadState =
  | 'idle'
  | 'uploading'
  | 'extracting'
  | 'analyzing'
  | 'success'
  | 'error'

export function AIAnalysisView({
  user,
  plots: _plots,
  onSaveExtractedData,
}: AIAnalysisViewProps) {
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [progress, setProgress] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [extractedData, setExtractedData] =
    useState<Partial<SoilRecord> | null>(null)
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    if (
      !validTypes.includes(file.type) &&
      !file.name.endsWith('.pdf') &&
      !file.name.endsWith('.docx')
    ) {
      setErrorMsg('Chỉ chấp nhận file định dạng PDF hoặc DOCX.')
      setUploadState('error')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Kích thước file vượt quá 10MB.')
      setUploadState('error')
      return
    }

    setSelectedFile(file)
    simulateProcess()
  }

  const simulateProcess = () => {
    setUploadState('uploading')
    setProgress(0)
    setErrorMsg('')
    setExtractedData(null)

    let p = 0
    const uploadInterval = setInterval(() => {
      p += 15
      if (p >= 100) {
        clearInterval(uploadInterval)
        setUploadState('extracting')

        setTimeout(() => {
          setUploadState('analyzing')

          setTimeout(() => {
            setUploadState('success')
            setExtractedData({
              pH: 6.2,
              nitrogen: 145,
              phosphorus: 42,
              potassium: 210,
              moisture: 58,
              notes: 'Dữ liệu trích xuất từ file phân tích lab.',
              sampleDate: new Date().toISOString().split('T')[0],
            })
            toast.success('Phân tích hoàn tất!')
          }, 2000)
        }, 1500)
      } else {
        setProgress(p)
      }
    }, 200)
  }

  const handleSave = () => {
    if (extractedData) {
      onSaveExtractedData(extractedData)
      toast.success('Đã chuyển dữ liệu sang form tạo hồ sơ')
    }
  }

  const selectedCropDetails = aiSuggestions.find((c: AISuggestion) => c.id === selectedCrop)

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Phân tích đất bằng AI
        </h2>
        <p className="text-muted-foreground">
          Tải lên kết quả từ phòng lab để nhận gợi ý cây trồng phù hợp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload Section */}
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Tải lên kết quả</CardTitle>
                <CardDescription>Hỗ trợ PDF, DOCX (Tối đa 10MB)</CardDescription>
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                🎭 Demo
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 text-xs">
                Đây là phiên bản demo. Tính năng AI chưa được tích hợp với hệ thống thực tế.
              </AlertDescription>
            </Alert>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                uploadState === 'idle' || uploadState === 'error'
                  ? 'border-slate-300 hover:border-green-500 hover:bg-green-50 cursor-pointer'
                  : 'border-green-500 bg-green-50'
              }`}
              onClick={() =>
                (uploadState === 'idle' || uploadState === 'error') &&
                fileInputRef.current?.click()
              }
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileSelect}
              />

              {uploadState === 'idle' && (
                <div className="space-y-2">
                  <UploadCloud className="h-10 w-10 text-slate-400 mx-auto" />
                  <p className="text-sm font-medium">
                    Kéo thả file hoặc click để chọn
                  </p>
                </div>
              )}

              {uploadState === 'error' && (
                <div className="space-y-2">
                  <AlertCircle className="h-10 w-10 text-red-500 mx-auto" />
                  <p className="text-sm font-medium text-red-600">
                    Tải lên thất bại
                  </p>
                  <p className="text-xs text-slate-500">Click để thử lại</p>
                </div>
              )}

              {(uploadState === 'uploading' ||
                uploadState === 'extracting' ||
                uploadState === 'analyzing') && (
                <div className="space-y-4">
                  <FileText className="h-10 w-10 text-green-600 mx-auto animate-pulse" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {uploadState === 'uploading' && 'Đang tải file lên...'}
                      {uploadState === 'extracting' &&
                        'Đang trích xuất dữ liệu...'}
                      {uploadState === 'analyzing' && 'AI đang phân tích...'}
                    </p>
                    <Progress
                      value={uploadState === 'uploading' ? progress : 100}
                      className="h-2"
                    />
                  </div>
                </div>
              )}

              {uploadState === 'success' && (
                <div className="space-y-2">
                  <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto" />
                  <p className="text-sm font-medium text-green-700">
                    {selectedFile?.name}
                  </p>
                  <p className="text-xs text-slate-500">Đã xử lý thành công</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => setUploadState('idle')}
                  >
                    Tải file khác
                  </Button>
                </div>
              )}
            </div>

            {errorMsg && (
              <Alert variant="destructive" className="py-2">
                <AlertDescription className="text-xs">
                  {errorMsg}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="md:col-span-2 space-y-6">
          {uploadState === 'idle' && (
            <Card className="h-full flex items-center justify-center bg-slate-50 border-dashed">
              <div className="text-center p-8 text-slate-500 space-y-3">
                <BrainCircuit className="h-12 w-12 mx-auto opacity-20" />
                <p>
                  Tải lên file kết quả phân tích đất để AI gợi ý cây trồng phù
                  hợp.
                </p>
              </div>
            </Card>
          )}

          {(uploadState === 'extracting' || uploadState === 'analyzing') && (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center p-8 space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
                  <BrainCircuit className="absolute inset-0 m-auto h-6 w-6 text-green-600" />
                </div>
                <p className="text-lg font-medium animate-pulse">
                  {uploadState === 'extracting'
                    ? 'Đang đọc dữ liệu từ file...'
                    : 'AI đang đánh giá độ phù hợp...'}
                </p>
              </div>
            </Card>
          )}

          {uploadState === 'success' && extractedData && (
            <>
              {/* Extracted Data Card */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Dữ liệu trích xuất
                    </CardTitle>
                    {user.role === 'owner' && (
                      <Button size="sm" onClick={handleSave} className="gap-2">
                        <Save className="h-4 w-4" />
                        Lưu thành hồ sơ
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-slate-500 mb-1">pH</p>
                      <p className="font-bold text-lg">{extractedData.pH}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-slate-500 mb-1">Đạm (N)</p>
                      <p className="font-bold text-lg">
                        {extractedData.nitrogen}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-slate-500 mb-1">Lân (P)</p>
                      <p className="font-bold text-lg">
                        {extractedData.phosphorus}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-slate-500 mb-1">Kali (K)</p>
                      <p className="font-bold text-lg">
                        {extractedData.potassium}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                      <p className="text-xs text-slate-500 mb-1">Độ ẩm</p>
                      <p className="font-bold text-lg">
                        {extractedData.moisture}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Suggestions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-purple-600" />
                  AI Gợi ý cây trồng
                </h3>
                <div className="grid gap-4">
                  {aiSuggestions.map((crop: AISuggestion, index: number) => (
                    <Card
                      key={crop.id}
                      className={`overflow-hidden ${
                        index === 0 ? 'border-green-200 shadow-sm' : ''
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div
                          className={`p-4 flex items-center justify-center sm:w-24 ${
                            crop.compatibility >= 90
                              ? 'bg-green-100 text-green-700'
                              : crop.compatibility >= 80
                                ? 'bg-blue-100 text-blue-700'
                                : crop.compatibility >= 70
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-orange-100 text-orange-700'
                          }`}
                        >
                          <div className="text-center">
                            <span className="text-2xl font-bold">
                              {crop.compatibility}%
                            </span>
                            <span className="block text-[10px] uppercase font-semibold mt-1">
                              Phù hợp
                            </span>
                          </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-center">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg">{crop.name}</h4>
                            {index === 0 && (
                              <Badge className="bg-green-600">Tốt nhất</Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600">
                            {crop.explanation}
                          </p>
                        </div>
                        <div className="p-4 bg-slate-50 sm:bg-transparent flex items-center justify-end sm:border-l border-t sm:border-t-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1"
                            onClick={() => setSelectedCrop(crop.id)}
                          >
                            Chi tiết <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedCrop}
        onOpenChange={(open) => !open && setSelectedCrop(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Chi tiết đánh giá: {selectedCropDetails?.name}
              <Badge
                variant="outline"
                className="ml-2 bg-green-50 text-green-700 border-green-200"
              >
                Độ phù hợp: {selectedCropDetails?.compatibility}%
              </Badge>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <h5 className="font-semibold text-sm mb-1 text-slate-700">
                Đánh giá tổng quan
              </h5>
              <p className="text-sm">{selectedCropDetails?.explanation}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border">
              <h5 className="font-semibold text-sm mb-2 text-slate-700 flex items-center gap-2">
                <BrainCircuit className="h-4 w-4 text-purple-600" />
                Phân tích chuyên sâu từ AI
              </h5>
              <p className="text-sm leading-relaxed text-slate-600">
                {selectedCropDetails?.details}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
