import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Save, Users, Settings, FolderPlus } from "lucide-react"

export default function NewProject() {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    template: "",
    visibility: "private",
    members: [] as string[]
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 模拟创建项目
    console.log('创建项目:', formData)
    
    // 跳转到项目详情页
    navigate('/projects/new-project-id')
  }

  const projectTemplates = [
    { value: "web-app", label: "Web应用测试", description: "适用于网站和Web应用的功能测试" },
    { value: "mobile-app", label: "移动应用测试", description: "iOS和Android应用的兼容性测试" },
    { value: "api-testing", label: "API接口测试", description: "后端接口的功能和性能测试" },
    { value: "e2e-testing", label: "端到端测试", description: "完整业务流程的自动化测试" },
    { value: "performance", label: "性能测试", description: "系统性能和负载测试" },
    { value: "security", label: "安全测试", description: "应用安全漏洞检测测试" },
    { value: "custom", label: "自定义项目", description: "根据需求自定义测试项目" }
  ]

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/projects')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">创建新项目</h2>
          <p className="text-muted-foreground">设置项目基本信息和配置</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderPlus className="h-5 w-5" />
                  基本信息
                </CardTitle>
                <CardDescription>
                  设置项目的基本信息
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">项目名称 *</Label>
                  <Input
                    id="project-name"
                    placeholder="输入项目名称"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="project-description">项目描述</Label>
                  <Textarea
                    id="project-description"
                    placeholder="描述项目的目标和范围"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Project Template */}
            <Card>
              <CardHeader>
                <CardTitle>项目模板</CardTitle>
                <CardDescription>
                  选择适合的项目模板，可以快速开始
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {projectTemplates.map((template) => (
                    <div
                      key={template.value}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        formData.template === template.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-muted-foreground'
                      }`}
                      onClick={() => handleInputChange('template', template.value)}
                    >
                      <div className="font-medium">{template.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {template.description}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  项目设置
                </CardTitle>
                <CardDescription>
                  配置项目的访问权限和其他设置
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="visibility">项目可见性</Label>
                  <Select value={formData.visibility} onValueChange={(value) => handleInputChange('visibility', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择可见性" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">私有 - 仅团队成员可见</SelectItem>
                      <SelectItem value="internal">内部 - 组织内部可见</SelectItem>
                      <SelectItem value="public">公开 - 所有人可见</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button type="submit" className="w-full gap-2">
                  <Save className="h-4 w-4" />
                  创建项目
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/projects')}
                >
                  取消
                </Button>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  团队成员
                </CardTitle>
                <CardDescription>
                  项目创建后可以邀请团队成员
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  你将自动成为项目创建者和管理员。创建项目后，可以通过项目设置页面邀请其他成员。
                </div>
              </CardContent>
            </Card>

            {/* Template Info */}
            {formData.template && (
              <Card>
                <CardHeader>
                  <CardTitle>模板说明</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {projectTemplates.find(t => t.value === formData.template)?.description}
                  </div>
                  <Separator className="my-3" />
                  <div className="text-sm">
                    <div className="font-medium mb-2">该模板将包含:</div>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>预设的测试用例模板</li>
                      <li>常用的测试计划配置</li>
                      <li>推荐的测试工具集成</li>
                      <li>最佳实践指导</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}