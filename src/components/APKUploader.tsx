import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Upload, FileCheck, Smartphone, Brain, Network, CheckCircle, Clock, AlertCircle, Monitor, HelpCircle, ChevronRight } from "lucide-react"

interface APKUploaderProps {
  onComplete: (projectId: string) => void
}

export const APKUploader = ({ onComplete }: APKUploaderProps) => {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [analysisStep, setAnalysisStep] = useState<'upload' | 'analyzing' | 'cloud-device' | 'learning' | 'generating' | 'complete'>('upload')
  const [progress, setProgress] = useState(0)
  const [currentPage, setCurrentPage] = useState("")
  const [discoveredPages, setDiscoveredPages] = useState<string[]>([])
  const [currentScreenshot, setCurrentScreenshot] = useState("/placeholder.svg")
  const [needsHelp, setNeedsHelp] = useState(false)
  const [pageDescription, setPageDescription] = useState("")

  const analysisSteps = [
    { key: 'analyzing', title: '逆向工程分析', description: '正在分析APK结构和组件...', icon: Brain },
    { key: 'cloud-device', title: '云真机模拟', description: '在云真机上运行APK，需要您的协助...', icon: Monitor },
    { key: 'learning', title: 'AI智能学习', description: '基于交互数据学习应用流程...', icon: Smartphone },
    { key: 'generating', title: '生成测试方案', description: '生成测试用例和UX交互图...', icon: Network }
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
    
    // First step: analyzing APK
    await simulateStep('analyzing', 20)
    
    // Second step: cloud device simulation (requires user interaction)
    setAnalysisStep('cloud-device')
    setProgress(25)
    setCurrentScreenshot("/placeholder.svg")
    setCurrentPage("启动页面")
  }

  const simulateStep = async (step: string, targetProgress: number) => {
    return new Promise<void>(resolve => {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = Math.min(prev + 2, targetProgress)
          if (newProgress >= targetProgress) {
            clearInterval(interval)
            resolve()
          }
          return newProgress
        })
      }, 100)
    })
  }

  const continueAfterCloudDevice = async () => {
    // Continue with learning phase
    setAnalysisStep('learning')
    await simulateStep('learning', 70)
    
    // Add discovered pages during learning
    for (const page of mockPages.slice(0, 8)) {
      setDiscoveredPages(prev => [...prev, page])
      await new Promise(resolve => setTimeout(resolve, 300))
    }
    
    // Generate test plans
    setAnalysisStep('generating')
    await simulateStep('generating', 100)
    
    setAnalysisStep('complete')
    
    toast({
      title: "分析完成！",
      description: "已成功生成测试方案和UX交互关系图",
    })
    
    // Navigate to UX Flow Diagram
    setTimeout(() => {
      window.location.href = '/ux-flow-diagram'
    }, 2000)
  }

  const handleScreenHelp = (description: string) => {
    setPageDescription(description)
    setNeedsHelp(false)
    
    // Simulate moving to next page
    const currentIndex = mockPages.indexOf(currentPage)
    const nextIndex = (currentIndex + 1) % mockPages.length
    setCurrentPage(mockPages[nextIndex])
    setDiscoveredPages(prev => [...prev, currentPage])
    
    if (discoveredPages.length >= 5) {
      continueAfterCloudDevice()
    }
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

  // Cloud Device Simulation Phase
  if (analysisStep === 'cloud-device') {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-card shadow-elevated border-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Monitor className="h-6 w-6 text-primary" />
              云真机模拟运行
            </CardTitle>
            <CardDescription>
              AI正在云真机上运行您的应用，需要您的协助来理解页面功能
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium">当前页面: {currentPage}</span>
              <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3 mb-6" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cloud Device Screen */}
          <Card className="bg-gradient-card shadow-elevated border-0">
            <CardHeader>
              <CardTitle className="text-lg">云真机屏幕</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-64 h-[480px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2rem] p-4 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[1.5rem] overflow-hidden relative">
                    {/* Status Bar */}
                    <div className="h-6 bg-black flex items-center justify-between px-4 text-white text-xs">
                      <span>9:41</span>
                      <span>●●●</span>
                    </div>
                    
                    {/* App Content */}
                    <div className="h-full bg-gradient-to-b from-blue-50 to-white p-4 flex flex-col items-center justify-center">
                      <img 
                        src={currentScreenshot} 
                        alt="App Screenshot"
                        className="w-20 h-20 rounded-lg mb-4 border border-gray-200"
                      />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{currentPage}</h3>
                      <p className="text-sm text-gray-600 text-center mb-4">
                        AI正在分析这个页面的功能...
                      </p>
                      
                      {/* Help Request */}
                      <div className="mt-auto w-full">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                          <HelpCircle className="h-5 w-5 text-yellow-600 mx-auto mb-2" />
                          <p className="text-xs text-yellow-800">
                            AI需要您的帮助来理解这个页面
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Panel */}
          <Card className="bg-gradient-card shadow-elevated border-0">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                协助AI理解页面
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 mb-3">
                  <strong>当前页面:</strong> {currentPage}
                </p>
                <p className="text-sm text-blue-700">
                  请帮助AI理解这个页面的主要功能是什么？
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "这是应用的主页面，显示主要功能入口",
                  "这是登录/注册页面，用于用户身份验证", 
                  "这是商品/内容列表页面",
                  "这是个人中心/用户设置页面",
                  "这是详情页面，显示具体信息",
                  "其他功能页面"
                ].map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => handleScreenHelp(option)}
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    {option}
                  </Button>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-xs text-muted-foreground text-center">
                  已识别页面: {discoveredPages.length}/10
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {discoveredPages.map((page, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {page}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
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