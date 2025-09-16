import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Plus, 
  Upload, 
  Cloud, 
  HardDrive, 
  Play, 
  X,
  Smartphone,
  Zap,
  Settings,
  CheckCircle,
  Edit,
  Download,
  Eye,
  Loader2,
  AlertCircle,
  Code,
  Trash2
} from "lucide-react"

type WorkflowStep = 'form' | 'generating' | 'reviewing' | 'scripting' | 'running' | 'completed'

interface TestCase {
  id: string
  caseNumber: string
  module: string
  title: string
  steps: string
  expected: string
  priority: 'P0' | 'P1' | 'P2' | 'P3'
  testType: '功能测试' | '性能测试' | '界面测试' | '兼容性测试'
}

export default function NewTest() {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('form')
  const [testName, setTestName] = useState("")
  const [testDescription, setTestDescription] = useState("")
  const [labels, setLabels] = useState<string[]>([])
  const [newLabel, setNewLabel] = useState("")
  const [trainingMode, setTrainingMode] = useState("")
  const [deviceModel, setDeviceModel] = useState("")
  const [systemVersion, setSystemVersion] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [timeoutMinutes, setTimeoutMinutes] = useState("")
  const [retryCount, setRetryCount] = useState("")
  const [envVariables, setEnvVariables] = useState("")
  
  // Workflow state
  const [progress, setProgress] = useState(0)
  const [testCases, setTestCases] = useState<TestCase[]>([])
  const [generatedScript, setGeneratedScript] = useState("")
  const [runningResults, setRunningResults] = useState<Array<{id: string, status: 'pending' | 'running' | 'passed' | 'failed', title: string}>>([])
  const [editingCase, setEditingCase] = useState<TestCase | null>(null)
  const [isEditing, setIsEditing] = useState(false)

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
    setCurrentStep('generating')
    setProgress(0)
    
    // Mock step 1: Generate test cases
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          // Generate mock test cases
          const mockTestCases: TestCase[] = [
            {
              id: '1',
              caseNumber: 'TC001',
              module: '应用启动',
              title: '启动应用并验证主界面',
              steps: '1. 启动应用\n2. 等待加载完成\n3. 验证主界面显示',
              expected: '主界面正常显示，所有必要元素可见',
              priority: 'P0',
              testType: '功能测试'
            },
            {
              id: '2',
              caseNumber: 'TC002', 
              module: '用户认证',
              title: '用户登录流程测试',
              steps: '1. 点击登录按钮\n2. 输入用户名\n3. 输入密码\n4. 点击登录',
              expected: '登录成功，跳转到用户主页',
              priority: 'P0',
              testType: '功能测试'
            },
            {
              id: '3',
              caseNumber: 'TC003',
              module: '用户认证',
              title: '登录失败处理',
              steps: '1. 输入错误用户名\n2. 输入错误密码\n3. 点击登录',
              expected: '显示错误提示信息，用户停留在登录页面',
              priority: 'P1',
              testType: '功能测试'
            }
          ]
          setTestCases(mockTestCases)
          setCurrentStep('reviewing')
          return 100
        }
        return prev + 2
      })
    }, 50)
  }

  const generateScript = () => {
    setCurrentStep('scripting')
    setProgress(0)
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          const mockScript = `# Generated Appium Python Test Script
from appium import webdriver
from selenium.webdriver.common.by import By
import time

class TestLogin:
    def setUp(self):
        desired_caps = {
            'platformName': '${systemVersion?.includes('ios') ? 'iOS' : 'Android'}',
            'deviceName': '${deviceModel}',
            'app': '/path/to/${uploadedFile?.name || 'app.apk'}'
        }
        self.driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)
    
    def test_login_flow(self):
        # Test Case 1: Launch app and verify main interface
        time.sleep(2)
        assert self.driver.find_element(By.ID, "main_layout").is_displayed()
        
        # Test Case 2: User login process
        login_btn = self.driver.find_element(By.ID, "login_button")
        login_btn.click()
        
        username_field = self.driver.find_element(By.ID, "username")
        username_field.send_keys("testuser")
        
        password_field = self.driver.find_element(By.ID, "password") 
        password_field.send_keys("testpass")
        
        submit_btn = self.driver.find_element(By.ID, "submit")
        submit_btn.click()
        
        time.sleep(2)
        assert self.driver.find_element(By.ID, "user_home").is_displayed()
    
    def tearDown(self):
        self.driver.quit()`
          setGeneratedScript(mockScript)
          return 100
        }
        return prev + 3
      })
    }, 60)
  }

  const startExecution = () => {
    setCurrentStep('running')
    setProgress(0)
    
    const results = testCases.map(tc => ({
      id: tc.id,
      status: 'pending' as const,
      title: tc.title
    }))
    setRunningResults(results)
    
    // Simulate test execution
    let currentIndex = 0
    const runNextTest = () => {
      if (currentIndex < results.length) {
        setRunningResults(prev => prev.map((r, i) => 
          i === currentIndex ? {...r, status: 'running'} : r
        ))
        
        setTimeout(() => {
          const passed = Math.random() > 0.3 // 70% pass rate
          setRunningResults(prev => prev.map((r, i) => 
            i === currentIndex ? {...r, status: passed ? 'passed' : 'failed'} : r
          ))
          currentIndex++
          setProgress((currentIndex / results.length) * 100)
          
          if (currentIndex < results.length) {
            setTimeout(runNextTest, 1000)
          } else {
            setTimeout(() => setCurrentStep('completed'), 1500)
          }
        }, 2000 + Math.random() * 3000)
      }
    }
    
    setTimeout(runNextTest, 1000)
  }

  const addNewTestCase = () => {
    const newCase: TestCase = {
      id: Date.now().toString(),
      caseNumber: `TC${String(testCases.length + 1).padStart(3, '0')}`,
      module: '',
      title: '',
      steps: '',
      expected: '',
      priority: 'P1',
      testType: '功能测试'
    }
    setEditingCase(newCase)
    setIsEditing(true)
  }

  const editTestCase = (testCase: TestCase) => {
    setEditingCase({ ...testCase })
    setIsEditing(true)
  }

  const deleteTestCase = (id: string) => {
    setTestCases(testCases.filter(tc => tc.id !== id))
  }

  const saveTestCase = () => {
    if (!editingCase) return
    
    if (testCases.find(tc => tc.id === editingCase.id)) {
      // Edit existing
      setTestCases(testCases.map(tc => tc.id === editingCase.id ? editingCase : tc))
    } else {
      // Add new
      setTestCases([...testCases, editingCase])
    }
    
    setEditingCase(null)
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setEditingCase(null)
    setIsEditing(false)
  }

  // Render different steps
  if (currentStep === 'generating') {
    return (
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="bg-gradient-primary rounded-xl p-6 text-white shadow-elevated">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin" />
            正在生成测试用例
          </h1>
          <p className="text-white/90">AI 正在分析您的应用和描述，生成个性化测试用例...</p>
        </div>
        
        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Progress value={progress} className="h-3" />
                </div>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Eye className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">分析应用结构</h3>
                    <p className="text-sm text-muted-foreground">解析 APK/IPA 文件</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">理解测试需求</h3>
                    <p className="text-sm text-muted-foreground">分析自然语言描述</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">生成测试用例</h3>
                    <p className="text-sm text-muted-foreground">AI 智能生成</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === 'reviewing') {
    return (
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="bg-gradient-primary rounded-xl p-6 text-white shadow-elevated">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <CheckCircle className="h-6 w-6" />
            测试用例检查
          </h1>
          <p className="text-white/90">AI 已生成 {testCases.length} 个测试用例，请检查并确认</p>
        </div>
        
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>测试用例列表</CardTitle>
              <Button onClick={addNewTestCase} className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                新增用例
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">用例编号</TableHead>
                    <TableHead className="w-[120px]">用例模块</TableHead>
                    <TableHead className="w-[200px]">测试步骤</TableHead>
                    <TableHead className="w-[200px]">预期结果</TableHead>
                    <TableHead className="w-[80px]">优先级</TableHead>
                    <TableHead className="w-[100px]">测试类型</TableHead>
                    <TableHead className="w-[120px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testCases.map((testCase) => (
                    <TableRow key={testCase.id}>
                      <TableCell className="font-medium">{testCase.caseNumber}</TableCell>
                      <TableCell>{testCase.module}</TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate" title={testCase.steps}>
                          {testCase.steps.split('\n')[0]}...
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate" title={testCase.expected}>
                          {testCase.expected}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={testCase.priority === 'P0' ? 'destructive' : testCase.priority === 'P1' ? 'default' : 'secondary'}>
                          {testCase.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{testCase.testType}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => editTestCase(testCase)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteTestCase(testCase.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        {isEditing && editingCase && (
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle>{testCases.find(tc => tc.id === editingCase.id) ? '编辑测试用例' : '新增测试用例'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="caseNumber">用例编号</Label>
                  <Input
                    id="caseNumber"
                    value={editingCase.caseNumber}
                    onChange={(e) => setEditingCase({...editingCase, caseNumber: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="module">用例模块</Label>
                  <Input
                    id="module"
                    value={editingCase.module}
                    onChange={(e) => setEditingCase({...editingCase, module: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="title">测试用例标题</Label>
                <Input
                  id="title"
                  value={editingCase.title}
                  onChange={(e) => setEditingCase({...editingCase, title: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="steps">测试步骤</Label>
                <Textarea
                  id="steps"
                  value={editingCase.steps}
                  onChange={(e) => setEditingCase({...editingCase, steps: e.target.value})}
                  placeholder="请输入测试步骤，每行一个步骤"
                  rows={4}
                />
              </div>
              
              <div>
                <Label htmlFor="expected">预期结果</Label>
                <Textarea
                  id="expected"
                  value={editingCase.expected}
                  onChange={(e) => setEditingCase({...editingCase, expected: e.target.value})}
                  placeholder="请输入预期结果"
                  rows={2}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">优先级</Label>
                  <Select value={editingCase.priority} onValueChange={(value: 'P0' | 'P1' | 'P2' | 'P3') => setEditingCase({...editingCase, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="P0">P0 - 高</SelectItem>
                      <SelectItem value="P1">P1 - 中</SelectItem>
                      <SelectItem value="P2">P2 - 低</SelectItem>
                      <SelectItem value="P3">P3 - 最低</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="testType">测试类型</Label>
                  <Select value={editingCase.testType} onValueChange={(value: '功能测试' | '性能测试' | '界面测试' | '兼容性测试') => setEditingCase({...editingCase, testType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="功能测试">功能测试</SelectItem>
                      <SelectItem value="性能测试">性能测试</SelectItem>
                      <SelectItem value="界面测试">界面测试</SelectItem>
                      <SelectItem value="兼容性测试">兼容性测试</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={cancelEdit}>
                  取消
                </Button>
                <Button onClick={saveTestCase} className="bg-gradient-primary">
                  保存
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep('form')}>
            返回编辑
          </Button>
          <Button onClick={generateScript} className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
            <Code className="h-4 w-4 mr-2" />
            生成测试脚本
          </Button>
        </div>
      </div>
    )
  }

  if (currentStep === 'scripting') {
    return (
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="bg-gradient-primary rounded-xl p-6 text-white shadow-elevated">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin" />
            正在生成测试脚本
          </h1>
          <p className="text-white/90">基于测试用例生成 Appium Python 脚本...</p>
        </div>
        
        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Progress value={progress} className="h-3" />
                </div>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              
              <div className="text-center">
                <Code className="h-16 w-16 mx-auto text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">生成 Appium 自动化脚本</h3>
                <p className="text-muted-foreground">将测试用例转换为可执行的 Python 代码</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {generatedScript && (
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle>生成的测试脚本</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-auto max-h-64">
                {generatedScript}
              </pre>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  下载脚本
                </Button>
                <Button onClick={startExecution} className="bg-gradient-primary">
                  <Play className="h-4 w-4 mr-2" />
                  开始运行
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  if (currentStep === 'running') {
    return (
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="bg-gradient-primary rounded-xl p-6 text-white shadow-elevated">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <Play className="h-6 w-6" />
            测试执行中
          </h1>
          <p className="text-white/90">正在自动化设备上运行测试用例...</p>
        </div>
        
        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Progress value={progress} className="h-3" />
                </div>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              
              <div className="space-y-3">
                {runningResults.map((result, index) => (
                  <div key={result.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      {result.status === 'pending' && <div className="w-2 h-2 bg-muted rounded-full" />}
                      {result.status === 'running' && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
                      {result.status === 'passed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {result.status === 'failed' && <AlertCircle className="w-4 h-4 text-red-500" />}
                    </div>
                    <span className="flex-1">{result.title}</span>
                    <span className={`text-sm font-medium ${
                      result.status === 'passed' ? 'text-green-600' :
                      result.status === 'failed' ? 'text-red-600' :
                      result.status === 'running' ? 'text-blue-600' :
                      'text-muted-foreground'
                    }`}>
                      {result.status === 'pending' && '等待中'}
                      {result.status === 'running' && '运行中'}
                      {result.status === 'passed' && '通过 ✅'}
                      {result.status === 'failed' && '失败 ❌'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === 'completed') {
    const passedCount = runningResults.filter(r => r.status === 'passed').length
    const failedCount = runningResults.filter(r => r.status === 'failed').length
    
    return (
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="bg-gradient-primary rounded-xl p-6 text-white shadow-elevated">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <CheckCircle className="h-6 w-6" />
            测试完成
          </h1>
          <p className="text-white/90">测试执行完毕，查看详细报告</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card shadow-card border-0">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">{runningResults.length}</div>
              <p className="text-muted-foreground">总用例数</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card border-0">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">{passedCount}</div>
              <p className="text-muted-foreground">通过数</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card shadow-card border-0">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-600">{failedCount}</div>
              <p className="text-muted-foreground">失败数</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle>测试结果详情</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {runningResults.map((result, index) => (
                <div key={result.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span>{result.title}</span>
                  <span className={`font-medium ${
                    result.status === 'passed' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.status === 'passed' ? '通过 ✅' : '失败 ❌'}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                下载 HTML 报告
              </Button>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                查看详细日志
              </Button>
              <Button onClick={() => setCurrentStep('form')} className="bg-gradient-primary">
                创建新测试
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Default form view
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

            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

              {/* Test Description - Full Width */}
              <div>
                <Label htmlFor="testDescription" className="text-sm font-medium flex items-center gap-2">
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
                    value={timeoutMinutes}
                    onChange={(e) => setTimeoutMinutes(e.target.value)}
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