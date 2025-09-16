import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  ArrowLeft, 
  Edit, 
  Play, 
  Pause, 
  Trash2, 
  TestTube,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Settings
} from "lucide-react"

export default function PlanDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // Mock data - replace with actual API call
  const plan = {
    id: parseInt(id || "1"),
    name: "用户模块回归测试计划",
    description: "包含登录、注册、权限管理等核心功能测试，确保用户相关功能的稳定性和可靠性。",
    nextRunTime: "2024-01-16 09:00",
    status: "active",
    lastResult: "success",
    lastRunTime: "2024-01-15 09:00",
    testCount: 12,
    creator: "zhang.san@company.com",
    createdAt: "2024-01-10 15:30",
    cronExpression: "0 9 * * *",
    scheduleType: "scheduled"
  }

  const associatedTests = [
    { id: 1, name: "用户登录功能测试", status: "active" },
    { id: 2, name: "用户注册流程测试", status: "active" },
    { id: 3, name: "权限管理测试", status: "active" },
    { id: 4, name: "密码重置功能测试", status: "active" },
    { id: 5, name: "用户资料管理测试", status: "active" }
  ]

  const executionHistory = [
    {
      id: 1,
      runTime: "2024-01-15 09:00",
      status: "success",
      duration: "25分钟",
      testsPassed: 12,
      testsTotal: 12,
      passRate: 100
    },
    {
      id: 2,
      runTime: "2024-01-14 09:00", 
      status: "success",
      duration: "23分钟",
      testsPassed: 11,
      testsTotal: 12,
      passRate: 92
    },
    {
      id: 3,
      runTime: "2024-01-13 09:00",
      status: "failed",
      duration: "18分钟",
      testsPassed: 8,
      testsTotal: 12,
      passRate: 67
    },
    {
      id: 4,
      runTime: "2024-01-12 09:00",
      status: "success", 
      duration: "26分钟",
      testsPassed: 12,
      testsTotal: 12,
      passRate: 100
    }
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-success/10 text-success border-success/20",
      paused: "bg-muted/10 text-muted-foreground border-muted/20"
    }
    
    const labels = {
      active: "Active",
      paused: "Paused"
    }
    
    return (
      <Badge 
        variant="outline" 
        className={variants[status as keyof typeof variants] || ""}
      >
        {labels[status as keyof typeof labels] || status}
      </Badge>
    )
  }

  const getResultIcon = (result: string) => {
    switch (result) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/plans')}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回计划列表
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              {plan.name}
              {getStatusBadge(plan.status)}
            </h1>
            <p className="text-muted-foreground">计划详情和执行历史</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={() => navigate(`/plans/${id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            编辑
          </Button>
          <Button variant="outline">
            {plan.status === 'active' ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                暂停
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                启用
              </>
            )}
          </Button>
          <Button variant="destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            删除
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Plan Information */}
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                计划基本信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">计划名称</label>
                  <p className="text-sm font-medium mt-1">{plan.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">创建人</label>
                  <p className="text-sm mt-1 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {plan.creator}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">下次运行时间</label>
                  <p className="text-sm mt-1 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {plan.nextRunTime}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">创建时间</label>
                  <p className="text-sm mt-1">{plan.createdAt}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">描述</label>
                <p className="text-sm mt-1 leading-relaxed">{plan.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Cron 表达式</label>
                <p className="text-sm mt-1 font-mono bg-muted px-2 py-1 rounded">
                  {plan.cronExpression}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Associated Tests */}
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5 text-primary" />
                关联的测试 ({associatedTests.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {associatedTests.map((test, index) => (
                  <div 
                    key={test.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <TestTube className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{test.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {test.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Execution History */}
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                执行历史
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border">
                {/* Table Header */}
                <div className="bg-muted/50 border-b">
                  <div className="grid grid-cols-6 gap-4 p-4 text-sm font-medium text-muted-foreground">
                    <div>运行时间</div>
                    <div>状态</div>
                    <div>持续时间</div>
                    <div>测试结果</div>
                    <div>通过率</div>
                    <div>操作</div>
                  </div>
                </div>
                
                {/* Table Body */}
                <div className="max-h-60 overflow-y-auto">
                  {executionHistory.map((execution, index) => (
                    <div 
                      key={execution.id}
                      className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-muted/30 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="text-sm">{execution.runTime}</div>
                      <div className="flex items-center gap-2">
                        {getResultIcon(execution.status)}
                        <span className="text-sm capitalize">{execution.status}</span>
                      </div>
                      <div className="text-sm">{execution.duration}</div>
                      <div className="text-sm">
                        {execution.testsPassed}/{execution.testsTotal}
                      </div>
                      <div className="text-sm">
                        <Badge 
                          variant="outline"
                          className={execution.passRate >= 90 ? "text-success border-success/20" : 
                                   execution.passRate >= 70 ? "text-warning border-warning/20" : 
                                   "text-destructive border-destructive/20"}
                        >
                          {execution.passRate}%
                        </Badge>
                      </div>
                      <div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/results/${execution.id}`)}
                        >
                          查看详情
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-gradient-card shadow-card border-0 sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5" />
                快速操作
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={() => {/* Run now */}}>
                <Play className="h-4 w-4 mr-2" />
                立即运行
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate(`/plans/${id}/edit`)}>
                <Edit className="h-4 w-4 mr-2" />
                编辑计划
              </Button>
              <Button variant="outline" className="w-full">
                {plan.status === 'active' ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    暂停计划
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    启用计划
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">统计信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">关联测试数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">最近执行次数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">89%</div>
                <div className="text-sm text-muted-foreground">平均通过率</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">23分钟</div>
                <div className="text-sm text-muted-foreground">平均执行时长</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}