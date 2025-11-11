import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Smartphone, Brain, ArrowRight, Zap, Eye, Network, Sparkles, CircuitBoard, Cpu, Rocket, Shield, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
export default function Home() {
  const navigate = useNavigate();
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
  return <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Dynamic Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
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
        <div className="relative max-w-7xl mx-auto px-6 py-32 pt-40">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              {/* AI Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm animate-fade-in">
                <Sparkles className="h-5 w-5 text-blue-400" />
                <span className="text-blue-300 font-medium">Powered by Advanced AI</span>
                <CircuitBoard className="h-5 w-5 text-purple-400" />
              </div>

               <h1 className="text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
                <span className="text-white animate-fade-in drop-shadow-2xl">
                  AI驱动的
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-clip-text text-transparent animate-fade-in drop-shadow-2xl" style={{ animationDelay: '0.2s' }}>
                  智能测试平台
                </span>
              </h1>
              
              <p className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed animate-fade-in font-light" style={{ animationDelay: '0.4s' }}>
                革命性的AI测试智能体，自动学习应用逻辑
                <br />
                <span className="text-blue-300 font-medium">在云真机上生成并执行完整测试用例</span>
              </p>
            </div>


            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  99.9%
                </div>
                <div className="text-sm text-white/70">测试准确率</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  10x
                </div>
                <div className="text-sm text-white/70">效率提升</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  24/7
                </div>
                <div className="text-sm text-white/70">云端运行</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm mb-8">
            <Shield className="h-5 w-5 text-blue-400" />
            <span className="text-blue-300 font-medium">核心能力</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 text-white">
            为什么选择我们？
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            结合尖端AI技术和云端基础设施，提供企业级测试解决方案
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => <Card 
            key={index} 
            className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-blue-500/20 transition-all duration-700 hover:-translate-y-4 hover:border-blue-400/40 animate-fade-in" 
            style={{ animationDelay: `${index * 0.1 + 1}s` }}
          >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-all duration-700" />
              
              <CardHeader className="pb-6 relative z-10">
                <div className="flex items-start gap-5">
                  <div className="relative">
                    {/* Icon Glow */}
                    <div className="absolute inset-0 bg-blue-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
                    <div className="relative p-5 rounded-2xl bg-blue-500/20 group-hover:bg-blue-500/30 transition-all duration-500 border border-blue-400/30 group-hover:border-blue-300/50 shadow-lg group-hover:shadow-blue-500/30">
                      <feature.icon className="h-10 w-10 text-blue-300 group-hover:text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <CardTitle className="text-2xl text-white transition-colors duration-300 mb-3">
                      {feature.title}
                    </CardTitle>
                    <p className="text-base text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>)}
        </div>
      </div>

      {/* Process Section */}
      <div className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm mb-8">
              <Zap className="h-5 w-5 text-blue-400" />
              <span className="text-blue-300 font-medium">工作流程</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 text-white">
              三步开启智能测试
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              简洁高效的流程，让AI为您的应用生成专业测试方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
            
            {[{
            step: "01",
            icon: Rocket,
            title: "创建项目",
            description: "上传Android应用APK文件，快速创建测试项目，系统自动进行初始化配置"
          }, {
            step: "02",
            icon: Eye,
            title: "AI深度学习",
            description: "AI在云真机环境中运行应用，智能分析页面结构和交互逻辑，绘制完整流程图"
          }, {
            step: "03",
            icon: Zap,
            title: "自动化测试",
            description: "基于学习结果自动生成测试用例，在多设备上并行执行，实时反馈测试结果"
          }].map((process, index) => <div key={index} className="relative text-center group animate-fade-in" style={{ animationDelay: `${index * 0.15 + 1.3}s` }}>
                {/* Card Background */}
                <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl group-hover:shadow-blue-500/20 transition-all duration-700 group-hover:-translate-y-6 group-hover:border-blue-400/40">
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 rounded-3xl transition-all duration-700" />
                  
                  <div className="relative mb-8">
                    {/* Outer Glow Ring */}
                    <div className="absolute inset-0 w-28 h-28 mx-auto rounded-full bg-blue-500/30 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Pulsing Ring */}
                    <div className="absolute inset-0 w-28 h-28 mx-auto rounded-full bg-blue-500/20 animate-pulse" />
                    
                    {/* Main Circle */}
                    <div className="relative w-28 h-28 mx-auto rounded-full bg-blue-600 flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/60 transition-all duration-700 group-hover:scale-125 border-2 border-blue-400/50 group-hover:border-blue-300/80">
                      <process.icon className="h-14 w-14 text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                    </div>
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-base font-bold text-white shadow-xl border-4 border-white/20 group-hover:scale-125 transition-transform duration-500">
                      {process.step}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white transition-colors duration-300">
                    {process.title}
                  </h3>
                  <p className="text-base text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300 px-4">
                    {process.description}
                  </p>
                </div>
              </div>)}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <Button 
              size="lg" 
              className="h-16 px-12 text-lg font-semibold bg-blue-600 hover:bg-blue-500 transition-all duration-500 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 border-0 hover:scale-110 group rounded-xl text-white" 
              onClick={() => navigate('/upload')}
            >
              <div className="flex items-center gap-3">
                <Rocket className="h-6 w-6 group-hover:-translate-y-1 group-hover:rotate-12 transition-all duration-300" />
                开始您的测试之旅
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>;
}