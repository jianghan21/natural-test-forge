import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { 
  Plus, 
  Upload, 
  Smartphone, 
  Cloud, 
  HardDrive, 
  Settings, 
  Play, 
  X,
  FileText,
  Zap,
  CheckCircle,
  Clock
} from "lucide-react"

export default function NewTest() {
  const [currentStep, setCurrentStep] = useState(1)
  const [testName, setTestName] = useState("")
  const [testDescription, setTestDescription] = useState("")
  const [labels, setLabels] = useState<string[]>([])
  const [newLabel, setNewLabel] = useState("")
  const [trainingMode, setTrainingMode] = useState("")
  const [deviceModel, setDeviceModel] = useState("")
  const [systemVersion, setSystemVersion] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const steps = [
    { id: 1, title: "基本信息", icon: FileText },
    { id: 2, title: "核心设置", icon: Settings },
    { id: 3, title: "可选配置", icon: Zap },
    { id: 4, title: "确认创建", icon: CheckCircle }
  ]

  const addLabel = () => {
    if (newLabel.trim() && !labels.includes(newLabel.trim())) {
      setLabels([...labels, newLabel.trim()])
      setNewLabel("")
    }
  }

  const removeLabel = (labelToRemove: string) => {
    setLabels(labels.filter(label => label !== labelToRemove))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-primary rounded-xl p-6 text-white shadow-elevated">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <Plus className="h-6 w-6" />
          创建新测试
        </h1>
        <p className="text-white/90">
          通过 AI 智能生成测试用例，轻松构建自动化测试流程
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Progress Steps */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-card shadow-card border-0 sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                进度步骤
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {steps.map((step, index) => {
                const StepIcon = step.icon
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id
                
                return (
                  <div 
                    key={step.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                      isActive ? 'bg-primary/10 border border-primary/20' : 
                      isCompleted ? 'bg-green-500/10 border border-green-500/20' : 
                      'bg-muted/50'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`p-2 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-primary text-primary-foreground' :
                      isCompleted ? 'bg-green-500 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? <CheckCircle className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                    </div>
                    <span className={`font-medium transition-colors duration-300 ${
                      isActive ? 'text-primary' :
                      isCompleted ? 'text-green-600' :
                      'text-muted-foreground'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                )
              })}
              
              <div className="mt-6">
                <Progress value={(currentStep / 4) * 100} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  步骤 {currentStep} / 4
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="bg-gradient-card shadow-card border-0">
            <CardContent className="p-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      基本信息
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      填写测试的基本信息，包括名称、描述和标签
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="testName" className="text-sm font-medium flex items-center gap-2">
                        测试名称 <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="testName"
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)}
                        placeholder="请输入测试名称"
                        className="mt-2 transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="testDescription" className="text-sm font-medium">
                        测试描述
                      </Label>
                      <Textarea
                        id="testDescription"
                        value={testDescription}
                        onChange={(e) => setTestDescription(e.target.value)}
                        placeholder="请描述您想要测试的功能或场景，例如：测试用户登录流程是否正常"
                        className="mt-2 min-h-[120px] transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">测试标签</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={newLabel}
                          onChange={(e) => setNewLabel(e.target.value)}
                          placeholder="添加标签"
                          className="flex-1"
                          onKeyPress={(e) => e.key === 'Enter' && addLabel()}
                        />
                        <Button onClick={addLabel} size="sm" className="hover:scale-105 transition-transform duration-200">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {labels.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {labels.map((label, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="flex items-center gap-1 hover:scale-105 transition-transform duration-200"
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              {label}
                              <X 
                                className="h-3 w-3 cursor-pointer hover:text-destructive" 
                                onClick={() => removeLabel(label)}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Core Settings */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      核心设置
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      选择训练方式、上传应用包并配置虚拟设备
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-2">
                        训练方式 <span className="text-destructive">*</span>
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div 
                          className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                            trainingMode === 'cloud' ? 'border-primary bg-primary/10' : 'border-muted hover:border-primary/50'
                          }`}
                          onClick={() => setTrainingMode('cloud')}
                        >
                          <div className="flex items-center gap-3">
                            <Cloud className={`h-6 w-6 ${trainingMode === 'cloud' ? 'text-primary' : 'text-muted-foreground'}`} />
                            <div>
                              <h3 className="font-medium">Cloud Training</h3>
                              <p className="text-sm text-muted-foreground">云端训练，更强性能</p>
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                            trainingMode === 'local' ? 'border-primary bg-primary/10' : 'border-muted hover:border-primary/50'
                          }`}
                          onClick={() => setTrainingMode('local')}
                        >
                          <div className="flex items-center gap-3">
                            <HardDrive className={`h-6 w-6 ${trainingMode === 'local' ? 'text-primary' : 'text-muted-foreground'}`} />
                            <div>
                              <h3 className="font-medium">Local Training</h3>
                              <p className="text-sm text-muted-foreground">本地训练，数据安全</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium flex items-center gap-2">
                        应用包文件 <span className="text-destructive">*</span>
                      </Label>
                      <div 
                        className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 hover:scale-105 cursor-pointer ${
                          uploadedFile ? 'border-green-500 bg-green-500/10' : 'border-muted hover:border-primary/50'
                        }`}
                      >
                        <input
                          type="file"
                          accept=".apk,.ipa"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className={`h-8 w-8 mx-auto mb-3 ${uploadedFile ? 'text-green-500' : 'text-muted-foreground'}`} />
                          {uploadedFile ? (
                            <div>
                              <p className="font-medium text-green-600">文件上传成功</p>
                              <p className="text-sm text-muted-foreground">{uploadedFile.name}</p>
                            </div>
                          ) : (
                            <div>
                              <p className="font-medium">点击上传 APK 或 IPA 文件</p>
                              <p className="text-sm text-muted-foreground">支持 .apk 和 .ipa 格式</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">设备型号</Label>
                        <Select value={deviceModel} onValueChange={setDeviceModel}>
                          <SelectTrigger className="mt-2 transition-all duration-200 hover:scale-105">
                            <SelectValue placeholder="选择设备型号" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="iphone-14">iPhone 14</SelectItem>
                            <SelectItem value="iphone-13">iPhone 13</SelectItem>
                            <SelectItem value="samsung-s23">Samsung Galaxy S23</SelectItem>
                            <SelectItem value="pixel-7">Google Pixel 7</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">系统版本</Label>
                        <Select value={systemVersion} onValueChange={setSystemVersion}>
                          <SelectTrigger className="mt-2 transition-all duration-200 hover:scale-105">
                            <SelectValue placeholder="选择系统版本" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ios-17">iOS 17</SelectItem>
                            <SelectItem value="ios-16">iOS 16</SelectItem>
                            <SelectItem value="android-14">Android 14</SelectItem>
                            <SelectItem value="android-13">Android 13</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Optional Configurations */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      可选配置
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      配置高级选项，优化测试执行效果
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">超时时间 (分钟)</Label>
                        <Input
                          type="number"
                          placeholder="30"
                          className="mt-2 transition-all duration-200 focus:scale-[1.02]"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">重试次数</Label>
                        <Input
                          type="number"
                          placeholder="3"
                          className="mt-2 transition-all duration-200 focus:scale-[1.02]"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">环境变量</Label>
                      <Textarea
                        placeholder="KEY1=value1&#10;KEY2=value2"
                        className="mt-2 transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">高级选项</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>• 自动截图：测试过程中自动保存关键步骤截图</p>
                        <p>• 性能监控：记录 CPU、内存使用情况</p>
                        <p>• 网络监控：监控网络请求和响应</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      确认创建
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      请确认所有配置信息，点击创建开始生成测试用例
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-4 border border-muted">
                        <h4 className="font-medium mb-3 text-primary">基本信息</h4>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">测试名称:</span> {testName || "未设置"}</p>
                          <p><span className="font-medium">描述:</span> {testDescription || "无描述"}</p>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">标签:</span>
                            {labels.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {labels.map((label, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {label}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">无标签</span>
                            )}
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 border border-muted">
                        <h4 className="font-medium mb-3 text-primary">核心设置</h4>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">训练方式:</span> {trainingMode === 'cloud' ? 'Cloud Training' : trainingMode === 'local' ? 'Local Training' : '未选择'}</p>
                          <p><span className="font-medium">应用包:</span> {uploadedFile?.name || "未上传"}</p>
                          <p><span className="font-medium">设备型号:</span> {deviceModel || "未选择"}</p>
                          <p><span className="font-medium">系统版本:</span> {systemVersion || "未选择"}</p>
                        </div>
                      </Card>
                    </div>

                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <h4 className="font-medium text-primary mb-2">下一步操作</h4>
                      <p className="text-sm text-muted-foreground">
                        点击"创建测试"后，系统将：
                      </p>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        <li>1. 分析您的应用包，理解应用结构</li>
                        <li>2. 基于您的描述，AI 自动生成测试用例</li>
                        <li>3. 进入测试用例检查和编辑阶段</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <Separator className="my-8" />

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  上一步
                </Button>

                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    取消
                  </Button>
                  
                  {currentStep < 4 ? (
                    <Button 
                      onClick={nextStep}
                      className="hover:scale-105 transition-transform duration-200"
                      disabled={currentStep === 1 && !testName.trim()}
                    >
                      下一步
                    </Button>
                  ) : (
                    <Button 
                      className="bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105"
                      disabled={!testName.trim() || !trainingMode || !uploadedFile}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      创建测试
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}