import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { 
  TestTube, 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User
} from "lucide-react"

interface TestRun {
  id: string
  runNumber: number
  startTime: string
  duration: string
  status: 'success' | 'failed' | 'running' | 'pending'
  passRate: number
  totalCases: number
  passedCases: number
  failedCases: number
  triggeredBy: string
}

export default function TestDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock test data
  const test = {
    id: id || '1',
    name: '用户登录流程测试',
    description: '测试用户登录、登出以及各种登录异常情况的处理',
    creator: 'admin@example.com',
    createdAt: '2024-01-15 14:30:25',
    lastModified: '2024-01-20 10:15:30',
    status: 'active' as const,
    tags: ['登录', '认证', '用户管理'],
    environment: 'iOS 17.0, Android 14',
    totalRuns: 45,
    avgPassRate: 95.5
  }

  // Mock run history
  const [runHistory] = useState<TestRun[]>([
    {
      id: '1',
      runNumber: 45,
      startTime: '2024-01-20 15:30:00',
      duration: '5m 32s',
      status: 'success',
      passRate: 100,
      totalCases: 12,
      passedCases: 12,
      failedCases: 0,
      triggeredBy: 'scheduled'
    },
    {
      id: '2', 
      runNumber: 44,
      startTime: '2024-01-20 09:30:00',
      duration: '6m 18s',
      status: 'failed',
      passRate: 83.3,
      totalCases: 12,
      passedCases: 10,
      failedCases: 2,
      triggeredBy: 'manual'
    },
    {
      id: '3',
      runNumber: 43,
      startTime: '2024-01-19 15:30:00', 
      duration: '5m 45s',
      status: 'success',
      passRate: 100,
      totalCases: 12,
      passedCases: 12,
      failedCases: 0,
      triggeredBy: 'scheduled'
    },
    {
      id: '4',
      runNumber: 42,
      startTime: '2024-01-19 09:30:00',
      duration: '4m 52s',
      status: 'success',
      passRate: 91.7,
      totalCases: 12,
      passedCases: 11,
      failedCases: 1,
      triggeredBy: 'scheduled'
    },
    {
      id: '5',
      runNumber: 41,
      startTime: '2024-01-18 15:30:00',
      duration: '5m 28s', 
      status: 'success',
      passRate: 100,
      totalCases: 12,
      passedCases: 12,
      failedCases: 0,
      triggeredBy: 'scheduled'
    }
  ])

  const getStatusIcon = (status: TestRun['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-success" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />
      case 'running':
        return <AlertCircle className="h-4 w-4 text-warning animate-pulse" />
      case 'pending':
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusText = (status: TestRun['status']) => {
    switch (status) {
      case 'success':
        return '成功'
      case 'failed':
        return '失败'
      case 'running':
        return '运行中'
      case 'pending':
        return '等待中'
    }
  }

  const getStatusColor = (status: TestRun['status']) => {
    switch (status) {
      case 'success':
        return 'bg-success text-success-foreground'
      case 'failed':
        return 'bg-destructive text-destructive-foreground'
      case 'running':
        return 'bg-warning text-warning-foreground'
      case 'pending':
        return 'bg-muted text-muted-foreground'
    }
  }

  const getTriggerText = (trigger: string) => {
    switch (trigger) {
      case 'manual':
        return '手动触发'
      case 'scheduled':
        return '定时触发'
      case 'api':
        return 'API 触发'
      default:
        return trigger
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/tests')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回测试列表
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <TestTube className="h-6 w-6 text-primary" />
            {test.name}
          </h1>
          <p className="text-muted-foreground">{test.description}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => {/* Run test */}}
          >
            <Play className="h-4 w-4 mr-2" />
            立即运行
          </Button>
          <Button 
            variant="outline"
            onClick={() => {/* Pause/Resume */}}
          >
            {test.status === 'active' ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                暂停
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                恢复
              </>
            )}
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate(`/tests/${id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            编辑
          </Button>
          <Button 
            variant="outline"
            onClick={() => {/* Delete test */}}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            删除
          </Button>
        </div>
      </div>

      {/* Test Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TestTube className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">平均通过率</p>
                <p className="text-2xl font-bold text-success">{test.avgPassRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Play className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">总运行次数</p>
                <p className="text-2xl font-bold">{test.totalRuns}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">创建时间</p>
                <p className="text-sm font-medium">{formatDate(test.createdAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">创建人</p>
                <p className="text-sm font-medium">{test.creator}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Details */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle>测试详情</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">基本信息</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">状态：</span>
                  <Badge className={test.status === 'active' ? 'bg-success text-success-foreground' : ''}>
                    {test.status === 'active' ? '运行中' : '已暂停'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">测试环境：</span>
                  <span>{test.environment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">最后修改：</span>
                  <span>{formatDate(test.lastModified)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">标签</h4>
              <div className="flex flex-wrap gap-2">
                {test.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Run History */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            运行历史记录
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="w-[80px]">运行#</TableHead>
                    <TableHead className="w-[160px]">开始时间</TableHead>
                    <TableHead className="w-[100px]">运行时长</TableHead>
                    <TableHead className="w-[100px]">状态</TableHead>
                    <TableHead className="w-[120px]">通过率</TableHead>
                    <TableHead className="w-[100px]">用例数</TableHead>
                    <TableHead className="w-[120px]">触发方式</TableHead>
                    <TableHead className="w-[100px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {runHistory.map((run) => (
                    <TableRow 
                      key={run.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => navigate(`/results/${run.id}`)}
                    >
                      <TableCell className="font-medium">#{run.runNumber}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(run.startTime)}
                      </TableCell>
                      <TableCell>{run.duration}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(run.status)}
                          <Badge className={getStatusColor(run.status)}>
                            {getStatusText(run.status)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${run.passRate >= 95 ? 'text-success' : run.passRate >= 80 ? 'text-warning' : 'text-destructive'}`}>
                              {run.passRate}%
                            </span>
                          </div>
                          <Progress value={run.passRate} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="text-success">{run.passedCases} 通过</div>
                          <div className="text-destructive">{run.failedCases} 失败</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getTriggerText(run.triggeredBy)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/results/${run.id}`)
                          }}
                        >
                          查看详情
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}