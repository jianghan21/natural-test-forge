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
                  <Input id="project-name" placeholder="输入项目名称" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="project-description">项目描述</Label>
                  <Textarea id="project-description" placeholder="描述项目的目标和范围" value={formData.description} onChange={e => handleInputChange('description', e.target.value)} rows={4} />
                </div>

                <div className="space-y-2">
                  <Label>APK文件上传 *</Label>
                  <div className="border border-dashed border-border rounded-lg p-4">
                    {!showAPKUploader ? (
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full gap-2" 
                        onClick={() => setShowAPKUploader(true)}
                      >
                        <Upload className="h-4 w-4" />
                        上传APK文件
                      </Button>
                    ) : (
                      <APKUploader onComplete={(projectId) => {
                        setApkUploaded(true);
                        navigate(`/projects/${projectId}`);
                      }} />
                    )}
                  </div>
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
                <Button type="button" variant="outline" className="w-full" onClick={() => navigate('/projects')}>
                  取消
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>;
}