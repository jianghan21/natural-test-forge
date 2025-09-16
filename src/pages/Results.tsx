import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { 
  BarChart3, 
  Filter, 
  CalendarIcon, 
  Play, 
  Clock, 
  CheckCircle,
  User,
  FileText,
  Calendar as CalendarLucide
} from "lucide-react"

interface TestResult {
  id: string
  testName: string
  planName: string | null
  status: "running" | "finished" | "scheduled"
  startTime: Date
  progress: number
  totalCases: number
  completedCases: number
  passRate: number
  creator: string
}

export default function Results() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    status: "all",
    testName: "",
    planName: "",
    startDateFrom: undefined as Date | undefined,
    startDateTo: undefined as Date | undefined,
    passRate: "all",
    creator: ""
  })

  // Mock data
  const testResults: TestResult[] = [
    {
      id: "1",
      testName: "用户登录功能测试",
      planName: "用户管理测试计划",
      status: "running",
      startTime: new Date("2024-01-15T10:30:00"),
      progress: 65,
      totalCases: 20,
      completedCases: 13,
      passRate: 92,
      creator: "张三"
    },
    {
      id: "2", 
      testName: "支付流程测试",
      planName: null,
      status: "finished",
      startTime: new Date("2024-01-14T14:20:00"),
      progress: 100,
      totalCases: 15,
      completedCases: 15,
      passRate: 87,
      creator: "李四"
    },
    {
      id: "3",
      testName: "订单管理测试",
      planName: "电商核心功能测试",
      status: "scheduled",
      startTime: new Date("2024-01-16T09:00:00"),
      progress: 0,
      totalCases: 25,
      completedCases: 0,
      passRate: 0,
      creator: "王五"
    },
    {
      id: "4",
      testName: "商品搜索测试",
      planName: "搜索功能测试计划",
      status: "finished",
      startTime: new Date("2024-01-13T16:45:00"),
      progress: 100,
      totalCases: 12,
      completedCases: 12,
      passRate: 75,
      creator: "赵六"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-blue-500/20 text-blue-700 border-blue-300">正在运行</Badge>
      case "scheduled":
        return <Badge className="bg-orange-500/20 text-orange-700 border-orange-300">计划运行</Badge>
      case "finished":
        return <Badge className="bg-green-500/20 text-green-700 border-green-300">运行结束</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusPriority = (status: string) => {
    switch (status) {
      case "running": return 3
      case "scheduled": return 2
      case "finished": return 1
      default: return 0
    }
  }

  const filteredResults = testResults
    .filter(result => {
      if (filters.status !== "all" && result.status !== filters.status) return false
      if (filters.testName && !result.testName.toLowerCase().includes(filters.testName.toLowerCase())) return false
      if (filters.planName && !result.planName?.toLowerCase().includes(filters.planName.toLowerCase())) return false
      if (filters.creator && !result.creator.toLowerCase().includes(filters.creator.toLowerCase())) return false
      if (filters.startDateFrom && result.startTime < filters.startDateFrom) return false
      if (filters.startDateTo && result.startTime > filters.startDateTo) return false
      if (filters.passRate !== "all") {
        if (filters.passRate === "90" && result.passRate <= 90) return false
        if (filters.passRate === "60" && result.passRate <= 60) return false
        if (filters.passRate === "30" && result.passRate <= 30) return false
      }
      return true
    })
    .sort((a, b) => getStatusPriority(b.status) - getStatusPriority(a.status))

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">测试结果</h1>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            筛选条件
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>运行状态</Label>
            <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value === "all" ? "" : value})}>
              <SelectTrigger>
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="running">正在运行</SelectItem>
                <SelectItem value="scheduled">计划运行</SelectItem>
                <SelectItem value="finished">运行结束</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>测试名称</Label>
            <Input 
              placeholder="输入测试名称"
              value={filters.testName}
              onChange={(e) => setFilters({...filters, testName: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>计划名称</Label>
            <Input 
              placeholder="输入计划名称"
              value={filters.planName}
              onChange={(e) => setFilters({...filters, planName: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>创建人账号</Label>
            <Input 
              placeholder="输入创建人"
              value={filters.creator}
              onChange={(e) => setFilters({...filters, creator: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>开始时间（从）</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start text-left font-normal", !filters.startDateFrom && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.startDateFrom ? format(filters.startDateFrom, "PPP") : "选择开始日期"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.startDateFrom}
                  onSelect={(date) => setFilters({...filters, startDateFrom: date})}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>开始时间（到）</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start text-left font-normal", !filters.startDateTo && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.startDateTo ? format(filters.startDateTo, "PPP") : "选择结束日期"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.startDateTo}
                  onSelect={(date) => setFilters({...filters, startDateTo: date})}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>通过率</Label>
            <Select value={filters.passRate} onValueChange={(value) => setFilters({...filters, passRate: value === "all" ? "" : value})}>
              <SelectTrigger>
                <SelectValue placeholder="选择通过率" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="90">大于90%</SelectItem>
                <SelectItem value="60">大于60%</SelectItem>
                <SelectItem value="30">大于30%</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button 
              onClick={() => setFilters({
                status: "all",
                testName: "",
                planName: "",
                startDateFrom: undefined,
                startDateTo: undefined,
                passRate: "all",
                creator: ""
              })}
              variant="outline"
            >
              重置筛选
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredResults.map((result) => (
          <Card 
            key={result.id}
            className="bg-gradient-card shadow-card border-0 hover:shadow-elevated transition-all duration-300 cursor-pointer"
            onClick={() => navigate(`/results/${result.id}`)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{result.testName}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    计划名: {result.planName || "null"}
                  </p>
                </div>
                {getStatusBadge(result.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarLucide className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">开始时间:</span>
                </div>
                <span>{format(result.startTime, "yyyy-MM-dd HH:mm")}</span>

                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">运行进度:</span>
                </div>
                <span>{result.completedCases}/{result.totalCases} 用例</span>

                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">通过率:</span>
                </div>
                <span className={cn(
                  "font-medium",
                  result.passRate >= 90 ? "text-green-600" : 
                  result.passRate >= 60 ? "text-orange-600" : "text-red-600"
                )}>
                  {result.passRate}%
                </span>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">创建人:</span>
                </div>
                <span>{result.creator}</span>
              </div>

              {result.status !== "scheduled" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">进度</span>
                    <span>{result.progress}%</span>
                  </div>
                  <Progress value={result.progress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResults.length === 0 && (
        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="py-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">没有找到匹配的测试结果</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}