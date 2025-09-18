import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Bot, Smartphone, Brain, ArrowRight, Zap, Eye, Network } from "lucide-react"
import { APKUploader } from "@/components/APKUploader"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()
  const [showUploader, setShowUploader] = useState(false)

  const features = [
    {
      icon: Bot,
      title: "AI测试智能体",
      description: "基于大模型的端到端自动化测试，理解应用逻辑并生成测试用例"
    },
    {
      icon: Smartphone,
      title: "云真机运行",
      description: "在真实云端设备上运行您的APK，获得最接近用户体验的测试结果"
    },
    {
      icon: Brain,
      title: "应用智能解析",
      description: "自动逆向工程分析APK结构，理解每个页面功能和交互逻辑"
    },
    {
      icon: Network,
      title: "交互关系图",
      description: "生成完整的用户体验流程图，可视化应用的页面跳转和交互关系"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
                AI驱动的端到端
                <br />
                移动应用测试平台
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                上传您的APK文件，我们的AI测试智能体将自动学习您的应用，
                生成完整的测试用例并在云真机上执行测试
              </p>
            </div>

            {/* Upload Section */}
            <div className="max-w-2xl mx-auto">
              {!showUploader ? (
                <Card className="bg-gradient-card shadow-elevated border-0 hover:shadow-glow transition-all duration-500">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Upload className="h-7 w-7 text-primary" />
                      开始智能测试之旅
                    </CardTitle>
                    <CardDescription className="text-base">
                      上传您的APK文件，让AI为您的应用生成专业的测试方案
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      size="lg" 
                      className="w-full h-14 text-lg font-semibold bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
                      onClick={() => setShowUploader(true)}
                    >
                      <Upload className="h-6 w-6 mr-3" />
                      上传APK文件开始分析
                      <ArrowRight className="h-5 w-5 ml-3" />
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <APKUploader onComplete={(projectId) => navigate(`/projects/${projectId}`)} />
              )}
            </div>

            {/* Quick Action */}
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/projects')}
                className="group hover:shadow-lg transition-all duration-300"
              >
                或者查看现有项目
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">为什么选择我们的AI测试平台？</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            结合最新的AI技术和云端基础设施，为您的移动应用提供前所未有的测试体验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group bg-gradient-card border-0 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-muted/20 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">AI测试流程</h2>
            <p className="text-lg text-muted-foreground">
              简单三步，让AI为您的应用生成完整的测试方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Upload,
                title: "上传APK",
                description: "将您的Android应用APK文件上传到我们的平台"
              },
              {
                step: "02",
                icon: Eye,
                title: "AI学习分析",
                description: "AI在云真机上运行应用，逆向分析并学习应用结构和交互逻辑"
              },
              {
                step: "03",
                icon: Zap,
                title: "生成测试",
                description: "自动生成完整的测试用例和交互关系图，开始智能化测试"
              }
            ].map((process, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <process.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                    {process.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{process.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}