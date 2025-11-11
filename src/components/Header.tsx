import { Button } from "@/components/ui/button";
import { Globe, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-slate-950/95 via-blue-950/95 to-indigo-950/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Smart Monkey
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#features" 
              className="text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium"
            >
              功能特点
            </a>
            <a 
              href="#about" 
              className="text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium"
            >
              关于我们
            </a>
            <a 
              href="#demo" 
              className="text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium"
            >
              获取演示
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/80 hover:text-foreground hover:bg-accent"
            >
              <Globe className="h-5 w-5" />
            </Button>
            
            <Button
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-300"
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
