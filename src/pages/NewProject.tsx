import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, FolderPlus, Upload } from "lucide-react";
import { APKUploader } from "@/components/APKUploader";
export default function NewProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });
  const [showAPKUploader, setShowAPKUploader] = useState(false);
  const [apkUploaded, setApkUploaded] = useState(false);
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 验证必填项
    if (!formData.name.trim()) {
      alert('请输入项目名称');
      return;
    }
    
    if (!apkUploaded) {
      alert('请上传APK文件');
      return;
    }

    // 模拟创建项目
    console.log('创建项目:', formData);

    // 跳转到项目详情页
    navigate('/projects/new-project-id');
  };
  return <div className="flex-1 space-y-6 p-8 pt-6">
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

      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Project Name */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">项目名称</h3>
              <p className="text-muted-foreground">为你的项目起一个简洁明了的名称</p>
            </div>
            <Input 
              id="project-name" 
              placeholder="输入项目名称" 
              value={formData.name} 
              onChange={e => handleInputChange('name', e.target.value)} 
              required 
              className="text-lg h-14 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          
          {/* Project Description */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">项目描述</h3>
              <p className="text-muted-foreground">简单描述项目的目标和测试范围（可选）</p>
            </div>
            <Textarea 
              id="project-description" 
              placeholder="描述项目的目标和范围..." 
              value={formData.description} 
              onChange={e => handleInputChange('description', e.target.value)} 
              rows={6}
              className="text-lg resize-none text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* APK Upload */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">上传APK文件</h3>
              <p className="text-muted-foreground">上传你的Android应用程序包，我们将为其生成智能测试方案</p>
            </div>
            <div className="border-2 border-dashed border-border rounded-xl p-12 bg-muted/30 hover:bg-muted/50 transition-colors">
              {!showAPKUploader ? (
                <div className="text-center">
                  <Button 
                    type="button" 
                    size="lg"
                    variant="outline" 
                    className="gap-3 h-16 px-8 text-lg font-medium" 
                    onClick={() => setShowAPKUploader(true)}
                  >
                    <Upload className="h-6 w-6" />
                    选择APK文件上传
                  </Button>
                  <p className="text-muted-foreground mt-4">支持.apk格式文件</p>
                </div>
              ) : (
                <APKUploader onComplete={(projectId) => {
                  setApkUploaded(true);
                  navigate(`/projects/${projectId}`);
                }} />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 pt-8 pb-12">
            <Button 
              type="button" 
              variant="outline" 
              size="lg"
              className="px-8 h-14 text-lg"
              onClick={() => navigate('/projects')}
            >
              取消
            </Button>
            <Button 
              type="submit" 
              size="lg"
              className="gap-3 px-12 h-14 text-lg font-medium" 
              disabled={!apkUploaded}
            >
              <Save className="h-5 w-5" />
              创建项目
            </Button>
          </div>
        </form>
      </div>
    </div>;
}