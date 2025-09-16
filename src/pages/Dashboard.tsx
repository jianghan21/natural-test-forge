import { StatCard } from "@/components/StatCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  TestTube, 
  Play, 
  Users, 
  Shield, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  CalendarClock,
  Target
} from "lucide-react"

export default function Dashboard() {
  const todayTests = [
    {
      id: 1,
      name: "用户登录模块测试",
      status: "running",
      startTime: "09:30",
      progress: 65,
      totalTestcases: 23,
      completedTestcases: 15,
      creator: "zhang.san@company.com"
    },
    {
      id: 2,
      name: "支付流程测试",
      status: "scheduled",
      startTime: "14:00",
      progress: 0,
      totalTestcases: 18,
      completedTestcases: 0,
      creator: "li.si@company.com"
    },
    {
      id: 3,
      name: "API接口测试",
      status: "finished",
      startTime: "08:15",
      progress: 100,
      totalTestcases: 42,
      completedTestcases: 42,
      creator: "wang.wu@company.com"
    },
    {
      id: 4,
      name: "移动端UI测试",
      status: "running",
      startTime: "11:20",
      progress: 35,
      totalTestcases: 28,
      completedTestcases: 10,
      creator: "zhao.liu@company.com"
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Play className="h-4 w-4 text-warning animate-pulse" />
      case "finished":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "scheduled":
        return <CalendarClock className="h-4 w-4 text-muted-foreground" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      running: "bg-warning/10 text-warning border-warning/20",
      finished: "bg-success/10 text-success border-success/20",
      scheduled: "bg-muted/10 text-muted-foreground border-muted/20"
    }
    
    const labels = {
      running: "正在运行",
      finished: "运行结束", 
      scheduled: "计划运行"
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

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-xl p-8 text-white shadow-elevated hover:shadow-glow transition-all duration-500 group">
        <h1 className="text-3xl font-bold mb-3 group-hover:scale-105 transition-transform duration-300">
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
          >
            <Plus className="h-5 w-5 mr-2" />
            创建第一个计划
          </Button>
          <Button 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10 hover:scale-105 transition-all duration-200"
            size="lg"
          >
            <TestTube className="h-5 w-5 mr-2" />
            创建第一条测试
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <StatCard
            title="总测试Test数"
            value="156"
            change="+8 个新测试"
            changeType="positive"
            icon={TestTube}
            description="当前系统中的测试总数"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <StatCard
            title="正在运行的测试Test数"
            value="3"
            change="2个即将开始"
            changeType="neutral"
            icon={Play}
            description="当前正在执行的测试"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <StatCard
            title="本月运行总次数"
            value="2,847"
            change="+23% 较上月"
            changeType="positive"
            icon={Target}
            description="本月测试执行统计"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <StatCard
            title="本月测试Testcase通过率"
            value="94.2%"
            change="+2.1% 较上月"
            changeType="positive"
            icon={Shield}
            description="测试用例成功率统计"
          />
        </div>
      </div>

      {/* Today's Running Test Modules */}
      <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <Card className="bg-gradient-card shadow-card border-0 hover:shadow-elevated transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Clock className="h-6 w-6 text-primary" />
              今日运行的测试模块
            </CardTitle>
            <CardDescription className="text-base">
              按运行状态优先级排序：正在运行 {">"} 计划运行 {">"} 运行结束
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {todayTests
                .sort((a, b) => {
                  const priority = { running: 3, scheduled: 2, finished: 1 }
                  return priority[b.status as keyof typeof priority] - priority[a.status as keyof typeof priority]
                })
                .map((test, index) => (
                <div 
                  key={test.id} 
                  className="group p-5 rounded-xl bg-background border hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        {getStatusIcon(test.status)}
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                          {test.name}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            开始时间: {test.startTime}
                          </span>
                          •
                          <span className="inline-flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            创建人: {test.creator}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="transform group-hover:scale-110 transition-transform duration-200">
                      {getStatusBadge(test.status)}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-medium">
                        运行进度: {test.completedTestcases}/{test.totalTestcases} 测试用例
                      </span>
                      <span className="text-primary font-semibold bg-primary/10 px-2 py-1 rounded-md">
                        {test.progress}%
                      </span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={test.progress} 
                        className="h-3 bg-secondary/50 transition-all duration-300 group-hover:h-4" 
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}