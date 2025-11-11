import { Button } from "@/components/ui/button";
import { Globe, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">
              Smart Monkey
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#features" 
              className="text-white/70 hover:text-white transition-colors duration-300 font-medium"
            >
              功能特点
            </a>
            <a 
              href="#about" 
              className="text-white/70 hover:text-white transition-colors duration-300 font-medium"
            >
              关于我们
            </a>
            <a 
              href="#demo" 
              className="text-white/70 hover:text-white transition-colors duration-300 font-medium"
            >
              获取演示
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <Globe className="h-5 w-5" />
            </Button>
            
            <Button
              onClick={() => navigate('/auth')}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <LogIn className="h-4 w-4 mr-2" />
              登录
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
