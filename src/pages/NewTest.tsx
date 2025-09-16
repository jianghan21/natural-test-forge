import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Plus, 
  Upload, 
  Cloud, 
  HardDrive, 
  Play, 
  X,
  Smartphone,
  Zap,
  Settings
} from "lucide-react"

export default function NewTest() {
  const [testName, setTestName] = useState("")
  const [testDescription, setTestDescription] = useState("")
  const [labels, setLabels] = useState<string[]>([])
  const [newLabel, setNewLabel] = useState("")
  const [trainingMode, setTrainingMode] = useState("")
  const [deviceModel, setDeviceModel] = useState("")
  const [systemVersion, setSystemVersion] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [timeout, setTimeout] = useState("")
  const [retryCount, setRetryCount] = useState("")
  const [envVariables, setEnvVariables] = useState("")

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

  const handleCreateTest = () => {
    // This will trigger the 5-step process:
    // 1. Generate test cases
    // 2. Test case review
    // 3. Generate test script
    // 4. Program execution
    // 5. Report display
    console.log("Creating test with:", {
      testName,
      testDescription,
      labels,
      trainingMode,
      uploadedFile,
      deviceModel,
      systemVersion,
      timeout,
      retryCount,
      envVariables
    })
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
          填写测试信息，AI 将自动生成测试用例并执行完整的测试流程
        </p>
      </div>

      {/* Main Form */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardContent className="p-8 space-y-8">
          {/* Basic Information Section */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">基本信息</h2>
                <p className="text-muted-foreground text-sm">填写测试的基本信息</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

              <div>
                <Label htmlFor="testDescription" className="text-sm font-medium">
                  测试描述 <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="testDescription"
                  value={testDescription}
                  onChange={(e) => setTestDescription(e.target.value)}
                  placeholder="请详细描述您想要测试的功能或场景，例如：测试用户登录流程是否正常"
                  className="mt-2 min-h-[150px] transition-all duration-200 focus:scale-[1.02]"
                />
              </div>
            </div>
          </div>

          {/* Core Settings Section */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">核心设置</h2>
                <p className="text-muted-foreground text-sm">选择训练方式和上传应用包</p>
              </div>
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

          {/* Optional Configurations Section */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">可选配置</h2>
                <p className="text-muted-foreground text-sm">配置高级选项，优化测试执行效果</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">超时时间 (分钟)</Label>
                  <Input
                    type="number"
                    value={timeout}
                    onChange={(e) => setTimeout(e.target.value)}
                    placeholder="30"
                    className="mt-2 transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium">重试次数</Label>
                  <Input
                    type="number"
                    value={retryCount}
                    onChange={(e) => setRetryCount(e.target.value)}
                    placeholder="3"
                    className="mt-2 transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">环境变量</Label>
                <Textarea
                  value={envVariables}
                  onChange={(e) => setEnvVariables(e.target.value)}
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

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button 
              variant="outline"
              className="hover:scale-105 transition-transform duration-200"
            >
              取消
            </Button>
            
            <Button 
              onClick={handleCreateTest}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105"
              disabled={!testName.trim() || !testDescription.trim() || !trainingMode || !uploadedFile}
            >
              <Play className="h-4 w-4 mr-2" />
              创建测试
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}