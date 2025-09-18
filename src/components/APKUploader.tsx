import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Upload, FileCheck, Smartphone, Brain, Network, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface APKUploaderProps {
  onComplete: (projectId: string) => void
}

export const APKUploader = ({ onComplete }: APKUploaderProps) => {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [analysisStep, setAnalysisStep] = useState<'upload' | 'analyzing' | 'learning' | 'generating' | 'complete'>('upload')
  const [progress, setProgress] = useState(0)
  const [currentPage, setCurrentPage] = useState("")
  const [discoveredPages, setDiscoveredPages] = useState<string[]>([])

  const analysisSteps = [
    { key: 'analyzing', title: '逆向工程分析', description: '正在分析APK结构和组件...', icon: Brain },
    { key: 'learning', title: '云真机学习', description: '在云真机上运行应用，学习页面交互...', icon: Smartphone },
    { key: 'generating', title: '生成测试方案', description: '基于学习结果生成测试用例和交互图...', icon: Network }
  ]

  const mockPages = [
    "启动页面", "登录页面", "主页面", "用户中心", "设置页面", "关于页面", "商品列表", "商品详情", "购物车", "订单页面"
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.name.endsWith('.apk')) {
        setUploadedFile(file)
        toast({
          title: "APK文件上传成功",
          description: `文件: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
        })
      } else {
        toast({
          title: "文件格式错误",
          description: "请上传.apk格式的文件",
          variant: "destructive"
        })
      }
    }
  }

  const startAnalysis = async () => {
    if (!uploadedFile) return

    setAnalysisStep('analyzing')
    setProgress(0)
    
    // Mock analysis process
    const totalSteps = analysisSteps.length
    
    for (let i = 0; i < totalSteps; i++) {
      const step = analysisSteps[i]
      setAnalysisStep(step.key as any)
      
      // Simulate progress for each step
      const stepProgress = (i / totalSteps) * 100
      const stepDuration = step.key === 'learning' ? 8000 : 3000
      
      await new Promise(resolve => {
        const interval = setInterval(() => {
          setProgress(prev => {
            const newProgress = Math.min(stepProgress + ((prev - stepProgress) + 100/totalSteps) * 0.1, (i + 1) / totalSteps * 100)
            
            // For learning step, simulate page discovery
            if (step.key === 'learning' && newProgress > stepProgress + 10) {
              const pageIndex = Math.floor(((newProgress - stepProgress) / (100/totalSteps)) * mockPages.length)
              if (pageIndex < mockPages.length && !discoveredPages.includes(mockPages[pageIndex])) {
                setCurrentPage(mockPages[pageIndex])
                setDiscoveredPages(prev => [...prev, mockPages[pageIndex]])
              }
            }
            
            if (newProgress >= (i + 1) / totalSteps * 100) {
              clearInterval(interval)
              resolve(void 0)
            }
            return newProgress
          })
        }, 100)
      })
    }
    
    setAnalysisStep('complete')
    setProgress(100)
    
    toast({
      title: "分析完成！",
      description: "已成功生成测试方案和交互关系图",
    })
    
    // Simulate project creation
    setTimeout(() => {
      onComplete('mock-project-id')
    }, 2000)
  }

  const getCurrentStepInfo = () => {
    return analysisSteps.find(step => step.key === analysisStep) || analysisSteps[0]
  }

  if (analysisStep === 'upload') {
    return (
      <Card className="bg-gradient-card shadow-elevated border-0">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Upload className="h-6 w-6 text-primary" />
            上传APK文件
          </CardTitle>
          <CardDescription>
            支持的格式: .apk | 最大文件大小: 500MB
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div 
            className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <p className="text-lg font-medium mb-2">点击选择APK文件</p>
            <p className="text-sm text-muted-foreground">或拖拽文件到此区域</p>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".apk"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {uploadedFile && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
                <FileCheck className="h-5 w-5 text-success" />
                <div className="flex-1">
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={startAnalysis}
                className="w-full h-12 text-lg bg-gradient-primary hover:opacity-90 transition-all duration-300"
              >
                <Brain className="h-5 w-5 mr-2" />
                开始AI智能分析
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  const stepInfo = getCurrentStepInfo()
  
  return (
    <Card className="bg-gradient-card shadow-elevated border-0">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <stepInfo.icon className="h-6 w-6 text-primary" />
          {stepInfo.title}
        </CardTitle>
        <CardDescription>
          {stepInfo.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">分析进度</span>
            <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Current Status */}
        <div className="grid grid-cols-3 gap-4">
          {analysisSteps.map((step, index) => {
            const isActive = step.key === analysisStep
            const isCompleted = analysisSteps.findIndex(s => s.key === analysisStep) > index
            
            return (
              <div key={step.key} className={`p-4 rounded-lg border transition-all duration-300 ${
                isActive ? 'bg-primary/10 border-primary/30' : 
                isCompleted ? 'bg-success/10 border-success/20' : 
                'bg-muted/10 border-muted/20'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {isCompleted ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : isActive ? (
                    <Clock className="h-4 w-4 text-primary animate-pulse" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Learning Phase - Show discovered pages */}
        {analysisStep === 'learning' && discoveredPages.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">正在学习页面: {currentPage}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {discoveredPages.map((page, index) => (
                <Badge key={index} variant="outline" className="bg-success/10 border-success/20 text-success">
                  {page}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Completion Message */}
        {analysisStep === 'complete' && (
          <div className="text-center space-y-4 p-6 bg-success/10 border border-success/20 rounded-lg">
            <CheckCircle className="h-12 w-12 text-success mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-success mb-2">分析完成！</h3>
              <p className="text-sm text-muted-foreground">
                发现 {discoveredPages.length} 个页面，正在为您创建项目...
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}