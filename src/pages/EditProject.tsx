import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Upload, CheckCircle2, Circle, BarChart3 } from "lucide-react";
import { APKUploader } from "@/components/APKUploader";
interface AppModule {
  id: string;
  name: string;
  description: string;
}
export default function EditProject() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    version: ""
  });
  const [showAPKUploader, setShowAPKUploader] = useState(false);
  const [apkUploaded, setApkUploaded] = useState(false);
  const [currentApkName, setCurrentApkName] = useState("");
  const [showModuleSelection, setShowModuleSelection] = useState(false);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [availableModules, setAvailableModules] = useState<AppModule[]>([]);
  useEffect(() => {
    // 模拟加载项目数据
    // 在实际应用中，这里应该从 API 获取项目数据
    const mockProjectData = {
      name: "电商平台测试",
      description: "主要电商平台的功能测试项目，包括用户注册、登录、购物车、支付等核心流程",
      version: "1.0.0"
    };
    setFormData(mockProjectData);
    setCurrentApkName("ecommerce_v1.0.0.apk");
    setApkUploaded(true);

    // 模拟之前分析过的模块数据
    const mockModules: AppModule[] = [{
      id: "1",
      name: "登录模块",
      description: "用户登录、注册相关功能"
    }, {
      id: "2",
      name: "首页模块",
      description: "首页展示、商品推荐"
    }, {
      id: "3",
      name: "购物车模块",
      description: "购物车管理功能"
    }, {
      id: "4",
      name: "订单模块",
      description: "订单创建、查看、管理"
    }, {
      id: "5",
      name: "支付模块",
      description: "支付流程及支付方式"
    }, {
      id: "6",
      name: "个人中心模块",
      description: "用户信息管理"
    }];
    setAvailableModules(mockModules);
  }, [id]);
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const toggleModuleSelection = (moduleId: string) => {
    setSelectedModules(prev => prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]);
  };
  const handleAnalyzeNewVersion = () => {
    setShowModuleSelection(true);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 验证必填项
    if (!formData.name.trim()) {
      alert('请输入项目名称');
      return;
    }
    if (!formData.version.trim()) {
      alert('请输入版本号');
      return;
    }
    if (showModuleSelection && selectedModules.length === 0) {
      alert('请至少选择一个本次更新的模块');
      return;
    }

    // 模拟更新项目
    console.log('更新项目:', formData);
    console.log('选中的更新模块:', selectedModules);

    // 跳转回项目详情页
    navigate(`/projects/${id}`);
  };
  return <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/projects/${id}`)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">修改项目</h2>
          <p className="text-muted-foreground">更新项目信息和APK文件</p>
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
            <Input id="project-name" placeholder="输入项目名称" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} required className="text-lg h-14 text-foreground placeholder:text-muted-foreground" />
          </div>
          
          {/* Project Description */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">项目描述</h3>
              <p className="text-muted-foreground">简单描述项目的目标和测试范围（可选）</p>
            </div>
            <Textarea id="project-description" placeholder="描述项目的目标和范围..." value={formData.description} onChange={e => handleInputChange('description', e.target.value)} rows={6} className="text-lg resize-none text-foreground placeholder:text-muted-foreground" />
          </div>

          {/* Version Number */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">版本号</h3>
              <p className="text-muted-foreground">更新应用的版本号，例如：1.0.1、2.0.0</p>
            </div>
            <Input id="project-version" placeholder="例如：1.0.0" value={formData.version} onChange={e => handleInputChange('version', e.target.value)} required className="text-lg h-14 text-foreground placeholder:text-muted-foreground" />
          </div>

          {/* APK Upload */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">更新APK文件</h3>
              <p className="text-muted-foreground">上传新版本的APK文件以更新测试应用</p>
            </div>
            <div className="border-2 border-dashed border-border rounded-xl p-12 bg-muted/30 hover:bg-muted/50 transition-colors">
              {!showAPKUploader && !showModuleSelection ? <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Save className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-green-600 mb-2">当前APK文件</h4>
                  <p className="text-muted-foreground mb-4">
                    {currentApkName}
                  </p>
                  <Button type="button" variant="outline" onClick={() => setShowAPKUploader(true)} className="gap-2">
                    <Upload className="h-4 w-4" />
                    重新上传APK
                  </Button>
                </div> : showAPKUploader ? <APKUploader 
                onComplete={projectId => {
                  setApkUploaded(true);
                  setShowAPKUploader(false);
                  setCurrentApkName(`updated_v${formData.version}.apk`);
                }}
                onAnalysisStart={() => {
                  setShowAPKUploader(false);
                  setShowModuleSelection(true);
                }}
              /> : null}
            </div>

            {/* 显示分析按钮 */}
            {!showAPKUploader && !showModuleSelection && apkUploaded && <div className="text-center">
                
              </div>}

            {/* 模块选择界面 */}
            {showModuleSelection && <Card className="mt-6">
                <CardHeader>
                  <CardTitle>选择本次更新的模块</CardTitle>
                  <CardDescription className="text-base">
                    <span className="text-primary font-medium">提示：只需要点击本次更新的模块</span>
                    <br />
                    选择本次版本更新涉及的功能模块，系统将重点分析这些模块的变化
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    {availableModules.map(module => {
                  const isSelected = selectedModules.includes(module.id);
                  return <div key={module.id} onClick={() => toggleModuleSelection(module.id)} className={`
                            flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                            ${isSelected ? 'border-primary bg-primary/5 shadow-md' : 'border-border hover:border-primary/50 hover:bg-muted/50'}
                          `}>
                          <div className="mt-0.5">
                            {isSelected ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-foreground mb-1">
                              {module.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {module.description}
                            </div>
                          </div>
                        </div>;
                })}
                  </div>
                  
                  {selectedModules.length > 0 && <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="text-sm font-medium text-foreground mb-2">
                        已选择 {selectedModules.length} 个模块：
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedModules.map(moduleId => {
                    const module = availableModules.find(m => m.id === moduleId);
                    return module ? <Badge key={moduleId} variant="secondary" className="bg-primary/20">
                              {module.name}
                            </Badge> : null;
                  })}
                      </div>
                    </div>}
                </CardContent>
              </Card>}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 pt-8 pb-12">
            <Button type="button" variant="outline" size="lg" className="px-8 h-14 text-lg" onClick={() => navigate(`/projects/${id}`)}>
              取消
            </Button>
            <Button type="submit" size="lg" className="gap-3 px-12 h-14 text-lg font-medium">
              <Save className="h-5 w-5" />
              保存更改
            </Button>
          </div>
        </form>
      </div>
    </div>;
}