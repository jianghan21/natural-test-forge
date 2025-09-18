import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Bot, Smartphone, Brain, ArrowRight, Zap, Eye, Network, Sparkles, CircuitBoard, Cpu } from "lucide-react";
import { APKUploader } from "@/components/APKUploader";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const [showUploader, setShowUploader] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, vx: number, vy: number}>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    setParticles(particleArray);

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        vx: particle.x <= 0 || particle.x >= window.innerWidth ? -particle.vx : particle.vx,
        vy: particle.y <= 0 || particle.y >= window.innerHeight ? -particle.vy : particle.vy,
      })));
    };

    const interval = setInterval(animateParticles, 16);
    return () => clearInterval(interval);
  }, []);
  const features = [{
    icon: Bot,
    title: "AI测试智能体",
    description: "基于大模型的端到端自动化测试，理解应用逻辑并生成测试用例"
  }, {
    icon: Smartphone,
    title: "云真机运行",
    description: "在真实云端设备上运行您的APK，获得最接近用户体验的测试结果"
  }, {
    icon: Brain,
    title: "应用智能解析",
    description: "自动逆向工程分析APK结构，理解每个页面功能和交互逻辑"
  }, {
    icon: Network,
    title: "交互关系图",
    description: "生成完整的用户体验流程图，可视化应用的页面跳转和交互关系"
  }];
  return <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Dynamic Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                transition: 'all 0.016s linear',
              }}
            />
          ))}
        </div>

        {/* Mouse Follower Glow */}
        <div 
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
          }}
        />

        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 border border-blue-500/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute inset-8 border border-purple-500/20 rounded-full animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
          <div className="absolute inset-16 border border-cyan-500/20 rounded-full animate-spin" style={{ animationDuration: '40s' }} />
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              {/* AI Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm animate-fade-in">
                <Sparkles className="h-5 w-5 text-blue-400" />
                <span className="text-blue-300 font-medium">Powered by Advanced AI</span>
                <CircuitBoard className="h-5 w-5 text-purple-400" />
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-fade-in">
                  AI驱动的端到端
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  移动应用测试平台
                </span>
              </h1>
              
              <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Cpu className="inline h-6 w-6 mr-2 text-blue-400" />
                上传您的APK文件，我们的AI测试智能体将自动学习您的应用，
                <br />
                生成完整的测试用例并在云真机上执行测试
              </p>
            </div>

            {/* Upload Section */}
            <div className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
              {!showUploader ? <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 hover:border-blue-400/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-2xl text-black">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                        <Upload className="h-7 w-7 text-white" />
                      </div>
                      开始智能测试之旅
                    </CardTitle>
                    <CardDescription className="text-base text-black">
                      上传您的APK文件，让AI为您的应用生成专业的测试方案
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      size="lg" 
                      className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 transition-all duration-500 shadow-2xl hover:shadow-blue-500/50 border-0 hover:scale-105 group" 
                      onClick={() => window.location.href = '/upload'}
                    >
                      <div className="flex items-center gap-3">
                        <Upload className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                        上传APK文件开始分析
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </Button>
                  </CardContent>
                </Card> : <APKUploader onComplete={projectId => navigate(`/projects/${projectId}`)} />}
            </div>

            {/* Quick Action */}
            <div className="flex justify-center">
              
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            为什么选择我们的AI测试平台？
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            结合最新的AI技术和云端基础设施，为您的移动应用提供前所未有的测试体验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => <Card 
            key={index} 
            className="group bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-700 hover:-translate-y-3 hover:scale-105 hover:border-blue-400/50 animate-fade-in" 
            style={{ animationDelay: `${index * 0.1 + 0.8}s` }}
          >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-500 border border-blue-400/30">
                    <feature.icon className="h-8 w-8 text-blue-300 group-hover:text-blue-200 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <CardTitle className="text-xl text-black group-hover:text-gray-800 transition-colors duration-300">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-black leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>)}
        </div>
      </div>

      {/* Process Section */}
      <div className="relative z-10 bg-gradient-to-b from-black/20 to-transparent py-20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              AI测试流程
            </h2>
            <p className="text-lg text-white">
              简单三步，让AI为您的应用生成完整的测试方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[{
            step: "01",
            icon: Upload,
            title: "上传APK",
            description: "将您的Android应用APK文件上传到我们的平台"
          }, {
            step: "02",
            icon: Eye,
            title: "AI学习分析",
            description: "AI在云真机上运行应用，逆向分析并学习应用结构和交互逻辑"
          }, {
            step: "03",
            icon: Zap,
            title: "生成测试",
            description: "自动生成完整的测试用例和交互关系图，开始智能化测试"
          }].map((process, index) => <div key={index} className="text-center group animate-fade-in" style={{ animationDelay: `${index * 0.2 + 1.2}s` }}>
                <div className="relative mb-8">
                  {/* Glowing Ring */}
                  <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 animate-pulse" />
                  
                  {/* Main Circle */}
                  <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-500 group-hover:scale-110 border border-blue-400/50">
                    <process.icon className="h-12 w-12 text-white group-hover:rotate-12 transition-transform duration-500" />
                  </div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg border-2 border-white/20">
                    {process.step}
                  </div>
                  
                  {/* Connection Line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-12 h-0.5 bg-gradient-to-r from-blue-400/50 to-transparent transform -translate-y-1/2" />
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-black group-hover:text-gray-800 transition-colors duration-300">
                  {process.title}
                </h3>
                <p className="text-black leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {process.description}
                </p>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
}