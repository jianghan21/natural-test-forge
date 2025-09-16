import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Play,
  FileText,
  Calendar,
  User,
  TestTube
} from "lucide-react"
import { format } from "date-fns"

interface TestCase {
  id: string
  module: string
  steps: string
  expectedResult: string
  actualResult: string
  status: "passed" | "failed" | "running" | "pending"
  executionTime: number // in milliseconds
  logs: string[]
  errorMessage?: string
}

interface TestDetail {
  id: string
  testName: string
  planName: string | null
  status: "running" | "finished" | "scheduled"
  startTime: Date
  endTime?: Date
  progress: number
  totalCases: number
  completedCases: number
  passedCases: number
  failedCases: number
  passRate: number
  creator: string
  testCases: TestCase[]
}

export default function ResultDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock data
  const testDetail: TestDetail = {
    id: id || "1",
    testName: "用户登录功能测试",
    planName: "用户管理测试计划",
    status: "finished",
    startTime: new Date("2024-01-15T10:30:00"),
    endTime: new Date("2024-01-15T11:45:00"),
    progress: 100,
    totalCases: 5,
    completedCases: 5,
    passedCases: 4,
    failedCases: 1,
    passRate: 80,
    creator: "张三",
    testCases: [
      {
        id: "tc1",
        module: "登录模块",
        steps: "1. 打开登录页面\n2. 输入正确的用户名和密码\n3. 点击登录按钮",
        expectedResult: "成功登录并跳转到首页",
        actualResult: "成功登录并跳转到首页",
        status: "passed",
        executionTime: 2340,
        logs: [
          "2024-01-15 10:30:01 - 开始执行测试用例",
          "2024-01-15 10:30:02 - 打开登录页面",
          "2024-01-15 10:30:03 - 输入用户名: testuser",
          "2024-01-15 10:30:04 - 输入密码: ********",
          "2024-01-15 10:30:05 - 点击登录按钮",
          "2024-01-15 10:30:06 - 登录成功，跳转到首页",
          "2024-01-15 10:30:07 - 测试用例执行完成"
        ]
      },
      {
        id: "tc2",
        module: "登录模块",
        steps: "1. 打开登录页面\n2. 输入错误的用户名和密码\n3. 点击登录按钮",
        expectedResult: "显示错误提示信息",
        actualResult: "显示错误提示信息",
        status: "passed",
        executionTime: 1890,
        logs: [
          "2024-01-15 10:32:01 - 开始执行测试用例",
          "2024-01-15 10:32:02 - 打开登录页面",
          "2024-01-15 10:32:03 - 输入用户名: wronguser",
          "2024-01-15 10:32:04 - 输入密码: wrongpass",
          "2024-01-15 10:32:05 - 点击登录按钮",
          "2024-01-15 10:32:06 - 显示错误提示: 用户名或密码错误",
          "2024-01-15 10:32:07 - 测试用例执行完成"
        ]
      },
      {
        id: "tc3",
        module: "登录模块",
        steps: "1. 打开登录页面\n2. 不输入任何信息\n3. 点击登录按钮",
        expectedResult: "显示必填字段验证提示",
        actualResult: "页面无响应，未显示验证提示",
        status: "failed",
        executionTime: 1200,
        errorMessage: "验证提示未正确显示",
        logs: [
          "2024-01-15 10:34:01 - 开始执行测试用例",
          "2024-01-15 10:34:02 - 打开登录页面",
          "2024-01-15 10:34:03 - 不输入任何信息",
          "2024-01-15 10:34:04 - 点击登录按钮",
          "2024-01-15 10:34:05 - ERROR: 未找到验证提示元素",
          "2024-01-15 10:34:06 - 测试用例执行失败"
        ]
      },
      {
        id: "tc4",
        module: "登录模块",
        steps: "1. 打开登录页面\n2. 输入用户名但不输入密码\n3. 点击登录按钮",
        expectedResult: "显示密码必填提示",
        actualResult: "显示密码必填提示",
        status: "passed",
        executionTime: 1560,
        logs: [
          "2024-01-15 10:36:01 - 开始执行测试用例",
          "2024-01-15 10:36:02 - 打开登录页面",
          "2024-01-15 10:36:03 - 输入用户名: testuser",
          "2024-01-15 10:36:04 - 密码字段保持为空",
          "2024-01-15 10:36:05 - 点击登录按钮",
          "2024-01-15 10:36:06 - 显示提示: 请输入密码",
          "2024-01-15 10:36:07 - 测试用例执行完成"
        ]
      },
      {
        id: "tc5",
        module: "登录模块",
        steps: "1. 打开登录页面\n2. 输入特殊字符作为用户名和密码\n3. 点击登录按钮",
        expectedResult: "正确处理特殊字符输入",
        actualResult: "正确处理特殊字符输入",
        status: "passed",
        executionTime: 2100,
        logs: [
          "2024-01-15 10:38:01 - 开始执行测试用例",
          "2024-01-15 10:38:02 - 打开登录页面",
          "2024-01-15 10:38:03 - 输入用户名: <script>alert('test')</script>",
          "2024-01-15 10:38:04 - 输入密码: @#$%^&*()",
          "2024-01-15 10:38:05 - 点击登录按钮",
          "2024-01-15 10:38:06 - 正确处理特殊字符，显示登录失败提示",
          "2024-01-15 10:38:07 - 测试用例执行完成"
        ]
      }
    ]
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "passed":
        return <Badge className="bg-green-500/20 text-green-700 border-green-300">通过</Badge>
      case "failed":
        return <Badge className="bg-red-500/20 text-red-700 border-red-300">失败</Badge>
      case "running":
        return <Badge className="bg-blue-500/20 text-blue-700 border-blue-300">运行中</Badge>
      case "pending":
        return <Badge className="bg-gray-500/20 text-gray-700 border-gray-300">待执行</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "running":
        return <Play className="h-4 w-4 text-blue-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-gray-600" />
      default:
        return null
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/results')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回结果列表
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{testDetail.testName}</h1>
          <p className="text-muted-foreground">
            计划名: {testDetail.planName || "null"}
          </p>
        </div>
      </div>

      {/* Test Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TestTube className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">总用例数</span>
            </div>
            <p className="text-2xl font-bold mt-1">{testDetail.totalCases}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-muted-foreground">通过用例</span>
            </div>
            <p className="text-2xl font-bold mt-1 text-green-600">{testDetail.passedCases}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-muted-foreground">失败用例</span>
            </div>
            <p className="text-2xl font-bold mt-1 text-red-600">{testDetail.failedCases}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">通过率</span>
            </div>
            <p className="text-2xl font-bold mt-1">{testDetail.passRate}%</p>
            <Progress value={testDetail.passRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Test Details */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle>测试详情</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">开始时间:</span>
            <span>{format(testDetail.startTime, "yyyy-MM-dd HH:mm:ss")}</span>
          </div>
          {testDetail.endTime && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">结束时间:</span>
              <span>{format(testDetail.endTime, "yyyy-MM-dd HH:mm:ss")}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">创建人:</span>
            <span>{testDetail.creator}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">执行时长:</span>
            <span>
              {testDetail.endTime 
                ? `${Math.round((testDetail.endTime.getTime() - testDetail.startTime.getTime()) / 1000 / 60)} 分钟`
                : "运行中..."
              }
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Test Cases */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle>测试用例详情</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testDetail.testCases.map((testCase, index) => (
              <Card key={testCase.id} className="border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(testCase.status)}
                      <span className="font-medium">用例 {index + 1}: {testCase.module}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(testCase.status)}
                      <span className="text-sm text-muted-foreground">
                        {(testCase.executionTime / 1000).toFixed(1)}s
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="details">用例详情</TabsTrigger>
                      <TabsTrigger value="logs">执行日志</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">测试步骤</h4>
                          <div className="text-sm text-muted-foreground whitespace-pre-line bg-muted/30 p-3 rounded">
                            {testCase.steps}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">预期结果</h4>
                          <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">
                            {testCase.expectedResult}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">实际结果</h4>
                        <div className={`text-sm p-3 rounded ${
                          testCase.status === 'passed' 
                            ? 'bg-green-50 text-green-800 border border-green-200' 
                            : 'bg-red-50 text-red-800 border border-red-200'
                        }`}>
                          {testCase.actualResult}
                          {testCase.errorMessage && (
                            <div className="mt-2 font-medium">
                              错误信息: {testCase.errorMessage}
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="logs">
                      <ScrollArea className="h-64 w-full rounded border">
                        <div className="p-4">
                          {testCase.logs.map((log, logIndex) => (
                            <div key={logIndex} className="text-sm font-mono mb-1">
                              {log}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}