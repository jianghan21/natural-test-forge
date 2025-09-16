import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { 
  Calendar, 
  Plus, 
  Play, 
  Pause, 
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Eye
} from "lucide-react"

export default function Plans() {
  const navigate = useNavigate()
  
  const plans = [
    {
      id: 1,
      name: "用户模块回归测试计划",
      description: "包含登录、注册、权限管理等核心功能测试",
      nextRunTime: "2024-01-16 09:00",
      status: "active",
      lastResult: "success",
      lastRunTime: "2024-01-15 09:00",
      testCount: 12,
      creator: "zhang.san@company.com"
    },
    {
      id: 2,
      name: "支付系统压力测试计划",
      description: "支付流程高并发性能测试",
      nextRunTime: "2024-01-16 14:00",
      status: "paused",
      lastResult: "failed",
      lastRunTime: "2024-01-14 14:00",
      testCount: 8,
      creator: "li.si@company.com"
    },
    {
      id: 3,
      name: "API接口冒烟测试计划",
      description: "每日API接口基础功能验证",
      nextRunTime: "每日 08:00",
      status: "active",
      lastResult: "success",
      lastRunTime: "2024-01-15 08:00",
      testCount: 25,
      creator: "wang.wu@company.com"
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

  const hasPlans = plans.length > 0

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Welcome Section */}
      {!hasPlans && (
        <div className="bg-gradient-primary rounded-xl p-8 text-white shadow-elevated hover:shadow-glow transition-all duration-500 group overflow-hidden">
          <h1 className="text-3xl font-bold mb-3 transition-transform duration-300">
            欢迎使用 TestFlow AI
          </h1>
          <p className="text-white/90 mb-6 text-lg leading-relaxed">
            开始您的自动化测试之旅，创建第一个测试计划来体验AI驱动的测试流程。
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="secondary" 
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:scale-105 transition-all duration-200 shadow-lg"
              size="lg"
              onClick={() => navigate('/plans/new')}
            >
              <Plus className="h-5 w-5 mr-2" />
              创建第一个计划
            </Button>
          </div>
        </div>
      )}

      {/* Plans List */}
      <Card className="bg-gradient-card shadow-card border-0 hover:shadow-elevated transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Calendar className="h-6 w-6 text-primary" />
              测试计划列表
            </CardTitle>
            <Button onClick={() => navigate('/plans/new')}>
              <Plus className="h-4 w-4 mr-2" />
              新建计划
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {hasPlans ? (
            <div className="overflow-hidden rounded-lg border">
              {/* Table Header - Frozen */}
              <div className="bg-muted/50 border-b sticky top-0 z-10">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground">
                  <div className="col-span-2">计划名称</div>
                  <div className="col-span-2">描述</div>
                  <div className="col-span-2">下次运行时间</div>
                  <div className="col-span-1">状态</div>
                  <div className="col-span-2">最近运行结果</div>
                  <div className="col-span-1">关联测试</div>
                  <div className="col-span-2">操作</div>
                </div>
              </div>
              
              {/* Table Body - Scrollable */}
              <div className="max-h-96 overflow-y-auto">
                {plans.map((plan, index) => (
                  <div 
                    key={plan.id}
                    className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-muted/30 transition-colors cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => navigate(`/plans/${plan.id}`)}
                  >
                    <div className="col-span-2">
                      <div className="font-medium text-foreground">{plan.name}</div>
                      <div className="text-sm text-muted-foreground">创建人: {plan.creator}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {plan.description}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {plan.nextRunTime}
                      </div>
                    </div>
                    <div className="col-span-1">
                      {getStatusBadge(plan.status)}
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        {getResultIcon(plan.lastResult)}
                        <div className="text-sm">
                          <div className="text-muted-foreground">{plan.lastRunTime}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Badge variant="outline" className="text-xs">
                        {plan.testCount} 个测试
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/plans/${plan.id}`)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/plans/${plan.id}/edit`)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (plan.status === 'active') {
                              // Pause plan
                            } else {
                              // Resume plan
                            }
                          }}
                        >
                          {plan.status === 'active' ? 
                            <Pause className="h-4 w-4" /> : 
                            <Play className="h-4 w-4" />
                          }
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Delete plan
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">还没有创建任何测试计划</p>
              <Button onClick={() => navigate('/plans/new')}>
                <Plus className="h-4 w-4 mr-2" />
                创建第一个计划
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}