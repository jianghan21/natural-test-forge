import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowLeft, Save, X, TestTube, Clock, Zap, Timer } from "lucide-react"

export default function NewPlan() {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    selectedTests: [] as number[],
    scheduleType: "manual", // manual, scheduled, event
    cronExpression: "",
    schedulePreset: "" // daily, weekly, monthly
  })

  const availableTests = [
    { id: 1, name: "用户登录模块测试", description: "测试用户登录相关功能" },
    { id: 2, name: "支付流程测试", description: "测试支付相关流程" },
    { id: 3, name: "API接口测试", description: "测试API接口功能" },
    { id: 4, name: "移动端UI测试", description: "测试移动端用户界面" },
    { id: 5, name: "数据库操作测试", description: "测试数据库相关操作" },
    { id: 6, name: "安全性测试", description: "测试系统安全性" }
  ]

  const handleTestSelection = (testId: number, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedTests: checked 
        ? [...prev.selectedTests, testId]
        : prev.selectedTests.filter(id => id !== testId)
    }))
  }

  const handleSave = () => {
    // TODO: Save plan logic
    console.log("Saving plan:", formData)
    navigate('/plans')
  }

  const generateCronFromPreset = (preset: string) => {
    const expressions = {
      daily: "0 8 * * *",
      weekly: "0 8 * * 1", 
      monthly: "0 8 1 * *"
    }
    return expressions[preset as keyof typeof expressions] || ""
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
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
          <h1 className="text-2xl font-bold">创建新的测试计划</h1>
          <p className="text-muted-foreground">配置测试计划的基本信息、关联测试和调度设置</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                基本信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="plan-name">计划名称</Label>
                <Input
                  id="plan-name"
                  placeholder="输入测试计划名称"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan-description">计划描述</Label>
                <Textarea
                  id="plan-description"
                  placeholder="描述测试计划的目的和范围"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Test Selection */}
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5 text-primary" />
                选择要运行的测试
                {formData.selectedTests.length > 0 && (
                  <Badge variant="outline">
                    已选择 {formData.selectedTests.length} 个测试
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {availableTests.map((test) => (
                  <div key={test.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id={`test-${test.id}`}
                      checked={formData.selectedTests.includes(test.id)}
                      onCheckedChange={(checked) => handleTestSelection(test.id, !!checked)}
                    />
                    <div className="flex-1 min-w-0">
                      <Label 
                        htmlFor={`test-${test.id}`}
                        className="font-medium cursor-pointer"
                      >
                        {test.name}
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {test.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Schedule Configuration */}
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                调度设置
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={formData.scheduleType} onValueChange={(value) => setFormData(prev => ({ ...prev, scheduleType: value }))}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="manual" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    手动运行
                  </TabsTrigger>
                  <TabsTrigger value="scheduled" className="flex items-center gap-2">
                    <Timer className="h-4 w-4" />
                    定时运行
                  </TabsTrigger>
                  <TabsTrigger value="event" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    事件触发
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="manual" className="space-y-4 mt-4">
                  <p className="text-sm text-muted-foreground">
                    计划将等待手动触发执行，您可以随时在计划列表中启动测试。
                  </p>
                </TabsContent>
                
                <TabsContent value="scheduled" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>调度频率</Label>
                      <Select
                        value={formData.schedulePreset}
                        onValueChange={(value) => {
                          setFormData(prev => ({ 
                            ...prev, 
                            schedulePreset: value,
                            cronExpression: generateCronFromPreset(value)
                          }))
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择调度频率" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">每日运行</SelectItem>
                          <SelectItem value="weekly">每周运行</SelectItem>
                          <SelectItem value="monthly">每月运行</SelectItem>
                          <SelectItem value="custom">自定义</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cron-expression">Cron 表达式</Label>
                      <Input
                        id="cron-expression"
                        placeholder="0 8 * * * (每天上午8点)"
                        value={formData.cronExpression}
                        onChange={(e) => setFormData(prev => ({ ...prev, cronExpression: e.target.value }))}
                      />
                      <p className="text-xs text-muted-foreground">
                        格式: 分钟 小时 日 月 星期，例如 "0 8 * * *" 表示每天上午8点
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="event" className="space-y-4 mt-4">
                  <p className="text-sm text-muted-foreground">
                    事件触发功能正在开发中，敬请期待。
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <Card className="bg-gradient-card shadow-card border-0 sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">计划摘要</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">计划名称</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.name || "未命名计划"}
                </p>
              </div>
              
              <div>
                <Label className="text-sm font-medium">关联测试</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  已选择 {formData.selectedTests.length} 个测试
                </p>
              </div>
              
              <div>
                <Label className="text-sm font-medium">调度方式</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.scheduleType === 'manual' && '手动运行'}
                  {formData.scheduleType === 'scheduled' && '定时运行'}
                  {formData.scheduleType === 'event' && '事件触发'}
                </p>
              </div>
              
              {formData.scheduleType === 'scheduled' && formData.cronExpression && (
                <div>
                  <Label className="text-sm font-medium">Cron 表达式</Label>
                  <p className="text-sm text-muted-foreground mt-1 font-mono">
                    {formData.cronExpression}
                  </p>
                </div>
              )}
              
              <div className="pt-4 space-y-2">
                <Button 
                  onClick={handleSave} 
                  className="w-full"
                  disabled={!formData.name || formData.selectedTests.length === 0}
                >
                  <Save className="h-4 w-4 mr-2" />
                  保存计划
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/plans')}
                  className="w-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  取消
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}