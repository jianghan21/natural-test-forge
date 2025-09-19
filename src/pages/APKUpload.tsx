import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { AppFlowDiagram } from "@/components/AppFlowDiagram"
import { Upload, FileCheck, Smartphone, Brain, Network, CheckCircle, Clock, AlertCircle, Monitor, HelpCircle, ChevronRight, Sparkles, Zap, Eye, Bot, MessageCircle, Trash2, Tag, Type, MousePointer, Hand } from "lucide-react"

// Import real app screenshots
import mobileAppUI from "@/assets/mobile-app-ui.jpg"
import appScreen1 from "@/assets/app-screen-1.jpg"
import appScreen2 from "@/assets/app-screen-2.jpg"

interface APKUploadProps {
  onComplete?: (projectId: string) => void
}

const APKUpload = ({ onComplete }: APKUploadProps) => {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [analysisStep, setAnalysisStep] = useState<'upload' | 'analyzing' | 'cloud-device' | 'learning' | 'generating' | 'complete'>('upload')
  const [progress, setProgress] = useState(0)
  const [currentPage, setCurrentPage] = useState("")
  const [discoveredPages, setDiscoveredPages] = useState<string[]>([])
  const [currentScreenshot, setCurrentScreenshot] = useState(mobileAppUI)
  const [needsHelp, setNeedsHelp] = useState(false)
  const [pageDescription, setPageDescription] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showConfigCard, setShowConfigCard] = useState(false)
  const [pageLabel, setPageLabel] = useState("")
  const [inputRules, setInputRules] = useState<Array<{id: string, label: string, rule: string}>>([])
  const [specialOperations, setSpecialOperations] = useState<Array<{id: string, element: string, operation: string}>>([])
  const conversationEndRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [showConfigCard])

  const analysisSteps = [
    { key: 'analyzing', title: '逆向工程分析', description: '正在分析APK结构和组件...', icon: Brain },
    { key: 'cloud-device', title: '云真机模拟', description: '在云真机上运行APK，需要您的协助...', icon: Monitor },
    { key: 'learning', title: 'AI智能学习', description: '基于交互数据学习应用流程...', icon: Smartphone },
    { key: 'generating', title: '生成测试方案', description: '生成测试用例和UX交互图...', icon: Network }
  ]

  const mockPages = [
    { name: "启动页面", screenshot: mobileAppUI },
    { name: "登录页面", screenshot: appScreen1 },
    { name: "主页面", screenshot: mobileAppUI },
    { name: "用户中心", screenshot: appScreen2 },
    { name: "设置页面", screenshot: appScreen1 },
    { name: "关于页面", screenshot: mobileAppUI },
    { name: "商品列表", screenshot: appScreen2 },
    { name: "商品详情", screenshot: appScreen1 },
    { name: "购物车", screenshot: mobileAppUI },
    { name: "订单页面", screenshot: appScreen2 }
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
    setCurrentScreenshot(mobileAppUI)
    setCurrentPage(mockPages[0].name)
    
    // Don't initialize conversation - wait for user to click screen
    setShowConfigCard(false)
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
      setDiscoveredPages(prev => [...prev, page.name])
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
    
    // Analysis complete - no auto navigation
  }

  const handleScreenHelp = (description: string) => {
    setPageDescription(description)
    
    // Move to next page after configuration
    setTimeout(() => {
      const currentIndex = mockPages.findIndex(page => page.name === currentPage)
      const nextIndex = (currentIndex + 1) % mockPages.length
      const nextPage = mockPages[nextIndex]
      
      setCurrentPage(nextPage.name)
      setCurrentScreenshot(nextPage.screenshot)
      setDiscoveredPages(prev => [...prev, currentPage])
      setShowConfigCard(false) // Hide card so user needs to click screen again
    }, 1000)
  }

  const getCurrentStepInfo = () => {
    return analysisSteps.find(step => step.key === analysisStep) || analysisSteps[0]
  }

  // Dynamic background with particles
  const BackgroundEffects = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background animate-pulse" />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
      
      {/* Mouse glow effect */}
      <div 
        className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl transition-all duration-300"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />
    </div>
  )

  if (analysisStep === 'upload') {
    return (
      <div className="min-h-screen bg-background relative">
        <BackgroundEffects />
        
        {/* Header */}
        <div className="relative z-10 pt-20 pb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative">
              <Sparkles className="h-16 w-16 text-primary animate-pulse" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-ping" />
            </div>
          </div>
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
            AI智能分析
          </h1>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
            上传您的APK文件，让AI为您生成完整的测试方案
          </p>
        </div>

        {/* Upload Section */}
        <div className="relative z-10 max-w-4xl mx-auto px-8">
          <Card className="bg-background/80 backdrop-blur-xl border-primary/20 shadow-2xl">
            <CardHeader className="pb-8 text-center">
              <CardTitle className="flex items-center justify-center gap-4 text-3xl">
                <Upload className="h-10 w-10 text-primary" />
                上传APK文件
              </CardTitle>
              <CardDescription className="text-lg">
                支持的格式: .apk | 最大文件大小: 500MB
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {!uploadedFile && (
                <div 
                  className="border-2 border-dashed border-primary/30 rounded-2xl p-16 text-center hover:border-primary/60 transition-all duration-300 cursor-pointer group bg-gradient-to-br from-primary/5 to-purple-500/5"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="relative">
                    <Upload className="h-20 w-20 mx-auto mb-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-2xl font-semibold mb-4">点击选择APK文件</p>
                  <p className="text-lg text-muted-foreground">或拖拽文件到此区域</p>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".apk"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {uploadedFile && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-6 bg-success/10 border border-success/30 rounded-xl">
                    <FileCheck className="h-8 w-8 text-success" />
                    <div className="flex-1">
                      <p className="text-xl font-semibold">{uploadedFile.name}</p>
                      <p className="text-lg text-muted-foreground">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setUploadedFile(null)
                        if (fileInputRef.current) {
                          fileInputRef.current.value = ''
                        }
                        toast({
                          title: "文件已删除",
                          description: "您可以重新选择APK文件",
                        })
                      }}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={startAnalysis}
                    className="w-full h-16 text-xl bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 transition-all duration-300 group"
                  >
                    <Brain className="h-6 w-6 mr-3 group-hover:animate-pulse" />
                    开始AI智能分析
                    <Zap className="h-6 w-6 ml-3 group-hover:animate-bounce" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Cloud Device Simulation Phase
  if (analysisStep === 'cloud-device') {
    return (
      <div className="min-h-screen bg-background relative">
        <BackgroundEffects />
        
        <div className="relative z-10 pt-12 px-8">
          {/* Header */}
          <Card className="max-w-6xl mx-auto mb-8 bg-background/80 backdrop-blur-xl border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-4 text-3xl">
                <Monitor className="h-8 w-8 text-primary" />
                云真机模拟运行
              </CardTitle>
              <CardDescription className="text-lg">
                AI正在云真机上运行您的应用，需要您的协助来理解页面功能
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-medium">当前页面: {currentPage}</span>
                <span className="text-xl font-bold text-primary">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-4 mb-6" />
            </CardContent>
          </Card>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              {/* Cloud Device Screen - Full Screen Mobile */}
              <Card className="bg-background/80 backdrop-blur-xl border-primary/20 shadow-2xl h-[800px]">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <Smartphone className="h-8 w-8 text-primary" />
                    云真机屏幕
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="relative group">
                    {/* Mobile Screen - No Frame, Just Content */}
                    <div className="w-96 h-[700px] bg-black rounded-3xl overflow-hidden shadow-2xl relative">
                      {/* Status Bar */}
                      <div className="h-12 bg-black flex items-center justify-between px-8 text-white text-base font-medium">
                        <span>9:41</span>
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* App Content - Full Bleed */}
                      <div className="h-full bg-white relative">
                        <img 
                          src={currentScreenshot} 
                          alt="App Screenshot"
                          className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => {
                            setShowConfigCard(true)
                            setPageLabel(currentPage)
                            setPageDescription("")
                            setInputRules([])
                            setSpecialOperations([])
                          }}
                        />
                        
                        {/* Overlay with current page info */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                          <h3 className="text-2xl font-bold text-white mb-2">{currentPage}</h3>
                          <div className="flex items-center gap-2">
                            <Eye className="h-5 w-5 text-green-400" />
                            <p className="text-base text-green-200 font-medium">
                              AI正在分析页面功能...
                            </p>
                          </div>
                        </div>
                        
                        {/* AI Analysis Indicator */}
                        <div className="absolute top-6 right-6">
                          <div className="bg-primary/90 rounded-full p-3 shadow-lg">
                            <Brain className="h-6 w-6 text-white animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Help Panel - Only show when config card is active */}
              {showConfigCard ? (
                <Card className="bg-background/80 backdrop-blur-xl border-primary/20 shadow-2xl flex flex-col h-[800px]">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <HelpCircle className="h-8 w-8 text-primary" />
                    协助AI理解页面
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col min-h-0">
                  {/* Page Configuration Form */}
                  <div className="space-y-6">
                    {/* Part 1: Page Label and Description */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Tag className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">页面信息</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">页面标签名</label>
                          <input
                            type="text"
                            value={pageLabel}
                            onChange={(e) => setPageLabel(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="例如：登录页面"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">页面描述</label>
                          <textarea
                            value={pageDescription}
                            onChange={(e) => setPageDescription(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                            rows={3}
                            placeholder="描述这个页面的主要功能和用途..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Part 2: Input Rules */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Type className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">输入规则定义</h3>
                      </div>
                      <div className="space-y-3">
                        {inputRules.map((rule, index) => (
                          <div key={rule.id} className="flex gap-2">
                            <input
                              type="text"
                              value={rule.label}
                              onChange={(e) => {
                                const newRules = [...inputRules]
                                newRules[index].label = e.target.value
                                setInputRules(newRules)
                              }}
                              className="flex-1 px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                              placeholder="输入框标签"
                            />
                            <input
                              type="text"
                              value={rule.rule}
                              onChange={(e) => {
                                const newRules = [...inputRules]
                                newRules[index].rule = e.target.value
                                setInputRules(newRules)
                              }}
                              className="flex-1 px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                              placeholder="输入规则"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setInputRules(inputRules.filter((_, i) => i !== index))
                              }}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setInputRules([...inputRules, {
                              id: Date.now().toString(),
                              label: "",
                              rule: ""
                            }])
                          }}
                          className="w-full"
                        >
                          + 添加输入规则
                        </Button>
                      </div>
                    </div>

                    {/* Part 3: Special Operations */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Hand className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">特殊操作</h3>
                      </div>
                      <div className="space-y-3">
                        {specialOperations.map((operation, index) => (
                          <div key={operation.id} className="flex gap-2">
                            <input
                              type="text"
                              value={operation.element}
                              onChange={(e) => {
                                const newOps = [...specialOperations]
                                newOps[index].element = e.target.value
                                setSpecialOperations(newOps)
                              }}
                              className="flex-1 px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                              placeholder="页面元素"
                            />
                            <select
                              value={operation.operation}
                              onChange={(e) => {
                                const newOps = [...specialOperations]
                                newOps[index].operation = e.target.value
                                setSpecialOperations(newOps)
                              }}
                              className="flex-1 px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                              <option value="">选择操作</option>
                              <option value="long-press">长按</option>
                              <option value="drag">拖拽</option>
                              <option value="swipe">滑动</option>
                              <option value="double-tap">双击</option>
                              <option value="pinch">缩放</option>
                            </select>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSpecialOperations(specialOperations.filter((_, i) => i !== index))
                              }}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSpecialOperations([...specialOperations, {
                              id: Date.now().toString(),
                              element: "",
                              operation: ""
                            }])
                          }}
                          className="w-full"
                        >
                          + 添加特殊操作
                        </Button>
                    </div>

                    {/* Progress Section */}
                    <div className="border-t pt-4 flex-shrink-0">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>页面识别进度</span>
                        <span>{Math.round((discoveredPages.length / 10) * 100)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1">
                        <div 
                          className="bg-gradient-to-r from-primary to-blue-500 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${(discoveredPages.length / 10) * 100}%` }}
                        ></div>
                      </div>
                      {discoveredPages.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {discoveredPages.map((page, index) => (
                            <Badge key={index} variant="secondary" className="text-xs px-1.5 py-0.5">
                              {page}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                    {/* Save Button */}
                    <div className="pt-4 border-t">
                      <Button 
                        onClick={() => handleScreenHelp(pageDescription)}
                        className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
                        disabled={!pageLabel.trim()}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        保存配置并继续
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ) : (
                <Card className="bg-background/80 backdrop-blur-xl border-primary/20 shadow-2xl flex flex-col h-[800px]">
                  <CardContent className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Monitor className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">点击左侧屏 训练SmartMonkey</h3>
                      <p className="text-muted-foreground">
                        点击云真机屏幕上的 "{currentPage}" 页面，开始AI智能分析
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            </div>
          </div>
          
          {/* Bottom Action Button */}
          {discoveredPages.length >= 3 && (
            <div className="max-w-7xl mx-auto mt-8 px-8">
              <div className="text-center">
                <Button 
                  onClick={continueAfterCloudDevice}
                  className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 px-8 py-3 text-lg"
                  size="lg"
                >
                  <CheckCircle className="h-5 w-5 mr-3" style={{ animation: 'none' }} />
                  完成测试，继续分析 ({discoveredPages.length} 页面)
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  当您觉得测试足够时，点击此按钮继续AI深度分析
                </p>
              </div>
            </div>
          )}
        </div>
    )
  }


  const stepInfo = getCurrentStepInfo()
  
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundEffects />
      
      <div className="relative z-10 pt-20 px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-background/80 backdrop-blur-xl border-primary/20 shadow-2xl">
            <CardHeader className="pb-8 text-center">
              <CardTitle className="flex items-center justify-center gap-4 text-3xl">
                <stepInfo.icon className="h-10 w-10 text-primary" />
                {stepInfo.title}
              </CardTitle>
              <CardDescription className="text-lg">
                {stepInfo.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Progress */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">分析进度</span>
                  <span className="text-lg font-bold text-primary">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-4" />
              </div>

              {/* Current Status */}
              <div className="grid grid-cols-2 gap-6">
                {analysisSteps.map((step, index) => {
                  const isActive = step.key === analysisStep
                  const isCompleted = analysisSteps.findIndex(s => s.key === analysisStep) > index
                  
                  return (
                    <div key={step.key} className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      isActive ? 'bg-primary/10 border-primary/30' : 
                      isCompleted ? 'bg-success/10 border-success/30' : 
                      'bg-muted/10 border-muted/30'
                    }`}>
                      <div className="flex items-center gap-3 mb-3">
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-success" />
                        ) : isActive ? (
                          <Clock className="h-6 w-6 text-primary animate-pulse" />
                        ) : (
                          <AlertCircle className="h-6 w-6 text-muted-foreground" />
                        )}
                        <span className="text-lg font-medium">{step.title}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Learning Phase - Show discovered pages */}
              {analysisStep === 'learning' && discoveredPages.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-6 w-6 text-primary" />
                    <span className="text-lg font-medium">正在学习页面: {currentPage}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {discoveredPages.map((page, index) => (
                      <Badge key={index} variant="outline" className="bg-success/10 border-success/30 text-success text-sm px-3 py-1">
                        {page}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Completion Message with Flow Diagram */}
              {analysisStep === 'complete' && (
                <div className="space-y-8">
                  <div className="text-center p-6 bg-success/10 border-2 border-success/30 rounded-xl">
                    <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                    <div>
                      <h3 className="text-xl font-bold text-success mb-2">AI分析完成！</h3>
                      <p className="text-muted-foreground">
                        发现 {discoveredPages.length} 个页面，已自动生成页面流程图
                      </p>
                    </div>
                  </div>
                  
                  {/* Flow Diagram */}
                  <div className="border border-border rounded-xl bg-background/50 backdrop-blur-sm" style={{ height: '600px' }}>
                    <AppFlowDiagram onNext={() => {
                      toast({
                        title: "流程图确认完成",
                        description: "感谢您的确认，您可以继续使用其他功能。",
                      })
                      // 用户确认后不自动跳转，可以在这里添加实际的跳转逻辑
                    }} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default APKUpload