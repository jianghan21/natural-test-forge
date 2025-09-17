import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { StatCard } from "@/components/StatCard"
import { 
  ArrowLeft, 
  Settings, 
  TestTube, 
  FileText, 
  BarChart3, 
  Users, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus
} from "lucide-react"

interface ProjectData {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  creator: string
  status: 'active' | 'archived'
  testCount: number
  planCount: number
  memberCount: number
  recentActivity: Array<{
    id: string
    type: 'test_created' | 'plan_executed' | 'member_added'
    description: string
    timestamp: string
    user: string
  }>
  stats: {
    totalTests: number
    passedTests: number
    failedTests: number
    pendingTests: number
    passRate: number
    executionTime: number
    coverage: number
  }
}

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // 模拟项目数据
  const [project] = useState<ProjectData>({
    id: id || "1",
    name: "电商平台测试",
    description: "主要电商平台的功能测试项目，包括用户注册、登录、购物车、支付等核心流程",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-10", 
    creator: "张三",
    status: "active",
    testCount: 45,
    planCount: 12,
    memberCount: 8,
    recentActivity: [
      {
        id: "1",
        type: "test_created",
        description: "创建了新的支付流程测试用例",
        timestamp: "2024-03-10T10:30:00Z",
        user: "李四"
      },
      {
        id: "2", 
        type: "plan_executed",
        description: "执行了用户注册测试计划",
        timestamp: "2024-03-09T16:45:00Z",
        user: "王五"
      },
      {
        id: "3",
        type: "member_added",
        description: "邀请了新成员加入项目",
        timestamp: "2024-03-08T14:20:00Z",
        user: "张三"
      }
    ],
    stats: {
      totalTests: 45,
      passedTests: 38,
      failedTests: 5,
      pendingTests: 2,
      passRate: 84.4,
      executionTime: 1240,
      coverage: 78.5
    }
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'test_created':
        return TestTube
      case 'plan_executed':
        return FileText
      case 'member_added':
        return Users
      default:
        return Clock
    }
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/projects')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                {project.name}
              </h2>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                活跃
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">{project.description}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span>创建者: {project.creator}</span>
              <span>•</span>
              <span>创建时间: {formatDate(project.createdAt)}</span>
              <span>•</span>
              <span>最后更新: {formatDate(project.updatedAt)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => navigate(`/projects/${id}/settings`)}>
            <Settings className="h-4 w-4 mr-2" />
            项目设置
          </Button>
          <Button onClick={() => navigate(`/projects/${id}/tests/new`)}>
            <Plus className="h-4 w-4 mr-2" />
            新建测试
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">测试用例</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.stats.totalTests}</div>
            <p className="text-xs text-muted-foreground">
              通过率 {project.stats.passRate}%
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">测试计划</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.planCount}</div>
            <p className="text-xs text-muted-foreground">
              执行中的计划
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">团队成员</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.memberCount}</div>
            <p className="text-xs text-muted-foreground">
              活跃贡献者
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">测试覆盖率</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.stats.coverage}%</div>
            <p className="text-xs text-muted-foreground">
              代码覆盖率
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">项目概览</TabsTrigger>
          <TabsTrigger value="tests">测试用例</TabsTrigger>
          <TabsTrigger value="plans">测试计划</TabsTrigger>
          <TabsTrigger value="results">测试结果</TabsTrigger>
          <TabsTrigger value="team">团队管理</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Test Status Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    测试状态概览
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {project.stats.passedTests}
                        </div>
                        <div className="text-sm text-muted-foreground">通过</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-8 w-8 text-red-500" />
                      <div>
                        <div className="text-2xl font-bold text-red-600">
                          {project.stats.failedTests}
                        </div>
                        <div className="text-sm text-muted-foreground">失败</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-8 w-8 text-yellow-500" />
                      <div>
                        <div className="text-2xl font-bold text-yellow-600">
                          {project.stats.pendingTests}
                        </div>
                        <div className="text-sm text-muted-foreground">待执行</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>整体通过率</span>
                      <span className="font-medium">{project.stats.passRate}%</span>
                    </div>
                    <Progress value={project.stats.passRate} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>快速操作</CardTitle>
                  <CardDescription>
                    常用的项目操作和功能入口
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 justify-start"
                      onClick={() => navigate(`/projects/${id}/tests/new`)}
                    >
                      <div className="flex items-center gap-3">
                        <TestTube className="h-5 w-5 text-blue-500" />
                        <div className="text-left">
                          <div className="font-medium">创建测试用例</div>
                          <div className="text-sm text-muted-foreground">添加新的测试用例</div>
                        </div>
                      </div>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 justify-start"
                      onClick={() => navigate(`/projects/${id}/plans/new`)}
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-green-500" />
                        <div className="text-left">
                          <div className="font-medium">创建测试计划</div>
                          <div className="text-sm text-muted-foreground">制定执行计划</div>
                        </div>
                      </div>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 justify-start"
                      onClick={() => navigate(`/projects/${id}/results`)}
                    >
                      <div className="flex items-center gap-3">
                        <BarChart3 className="h-5 w-5 text-purple-500" />
                        <div className="text-left">
                          <div className="font-medium">查看测试报告</div>
                          <div className="text-sm text-muted-foreground">分析测试结果</div>
                        </div>
                      </div>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 justify-start"
                      onClick={() => navigate(`/projects/${id}/team`)}
                    >
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-orange-500" />
                        <div className="text-left">
                          <div className="font-medium">管理团队</div>
                          <div className="text-sm text-muted-foreground">邀请成员协作</div>
                        </div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    最近活动
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.recentActivity.map((activity, index) => (
                    <div key={activity.id}>
                      <div className="flex items-start gap-3">
                        {(() => {
                          const IconComponent = getActivityIcon(activity.type)
                          return <IconComponent className="h-4 w-4 text-blue-500" />
                        })()}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{activity.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {activity.user}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(activity.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {index < project.recentActivity.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle>项目信息</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">项目ID</span>
                    <span className="font-mono">{project.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">创建时间</span>
                    <span>{formatDate(project.createdAt)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">最后更新</span>
                    <span>{formatDate(project.updatedAt)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">执行时间</span>
                    <span>{Math.round(project.stats.executionTime / 60)}分钟</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tests">
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <TestTube className="h-12 w-12 mx-auto text-muted-foreground" />
                <div className="text-xl font-semibold">测试用例管理</div>
                <p className="text-muted-foreground">
                  此功能将重定向到项目的测试用例页面
                </p>
                <Button onClick={() => navigate(`/projects/${id}/tests`)}>
                  查看测试用例
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                <div className="text-xl font-semibold">测试计划管理</div>
                <p className="text-muted-foreground">
                  此功能将重定向到项目的测试计划页面
                </p>
                <Button onClick={() => navigate(`/projects/${id}/plans`)}>
                  查看测试计划
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                <div className="text-xl font-semibold">测试结果分析</div>
                <p className="text-muted-foreground">
                  此功能将重定向到项目的测试结果页面
                </p>
                <Button onClick={() => navigate(`/projects/${id}/results`)}>
                  查看测试结果
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                <div className="text-xl font-semibold">团队成员管理</div>
                <p className="text-muted-foreground">
                  管理项目团队成员和权限设置
                </p>
                <Button onClick={() => navigate(`/projects/${id}/team`)}>
                  管理团队
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}