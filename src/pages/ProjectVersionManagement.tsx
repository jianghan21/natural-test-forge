import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Upload, Package, Clock, CheckCircle, FileText, Brain } from "lucide-react";
import { APKUploader } from "@/components/APKUploader";
import { useToast } from "@/hooks/use-toast";

interface Version {
  id: string;
  version: string;
  uploadDate: string;
  status: 'current' | 'historical';
  apkName: string;
  size: string;
  modules: string[];
  testReportId?: string;
}

export default function ProjectVersionManagement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAPKUploader, setShowAPKUploader] = useState(false);
  const [showModuleSelection, setShowModuleSelection] = useState(false);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [uploadedVersion, setUploadedVersion] = useState("");

  // 模拟版本数据
  const [versions] = useState<Version[]>([
    {
      id: "v3",
      version: "1.2.3",
      uploadDate: "2024-03-15T10:30:00Z",
      status: "current",
      apkName: "ecommerce_v1.2.3.apk",
      size: "45.2 MB",
      modules: ["登录模块", "首页模块", "购物车模块"],
      testReportId: "report-123"
    },
    {
      id: "v2",
      version: "1.1.0",
      uploadDate: "2024-02-10T14:20:00Z",
      status: "historical",
      apkName: "ecommerce_v1.1.0.apk",
      size: "42.8 MB",
      modules: ["登录模块", "首页模块", "好友模块", "游戏模块"],
      testReportId: "report-122"
    },
    {
      id: "v1",
      version: "1.0.0",
      uploadDate: "2024-01-15T09:00:00Z",
      status: "historical",
      apkName: "ecommerce_v1.0.0.apk",
      size: "40.5 MB",
      modules: ["登录模块", "首页模块"],
      testReportId: "report-121"
    }
  ]);

  // 可选模块列表
  const availableModules = [
    "登录模块",
    "首页模块",
    "好友模块",
    "游戏模块",
    "购物车模块",
    "支付模块",
    "个人中心模块",
    "设置模块"
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleModuleToggle = (module: string) => {
    setSelectedModules(prev =>
      prev.includes(module)
        ? prev.filter(m => m !== module)
        : [...prev, module]
    );
  };

  const handleStartAnalysis = () => {
    if (selectedModules.length === 0) {
      toast({
        title: "请选择模块",
        description: "请至少选择一个需要分析的模块",
        variant: "destructive"
      });
      return;
    }

    setShowModuleSelection(false);
    toast({
      title: "开始分析",
      description: `正在对 ${selectedModules.length} 个模块进行智能分析...`
    });

    // 模拟跳转到分析页面
    setTimeout(() => {
      navigate(`/projects/${id}/analysis/${uploadedVersion}`);
    }, 1500);
  };

  const handleUploadComplete = () => {
    const newVersion = "1.3.0";
    setUploadedVersion(newVersion);
    setShowAPKUploader(false);
    setShowModuleSelection(true);
    setSelectedModules([]);
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/projects/${id}`)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">项目版本管理</h2>
            <p className="text-muted-foreground">管理APK版本和查看历史测试报告</p>
          </div>
        </div>

        <Button onClick={() => setShowAPKUploader(true)} size="lg">
          <Upload className="h-5 w-5 mr-2" />
          上传新版本APK
        </Button>
      </div>

      {/* Version List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">版本历史</h3>
        
        {versions.map((version) => (
          <Card key={version.id} className={version.status === 'current' ? 'border-primary/50 shadow-lg' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="h-6 w-6 text-primary" />
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">版本 {version.version}</CardTitle>
                      {version.status === 'current' && (
                        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                          当前版本
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(version.uploadDate)}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {version.testReportId && (
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/projects/${id}/results/${version.testReportId}`)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      查看测试报告
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">文件名：</span>
                    <span className="font-medium ml-2">{version.apkName}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">文件大小：</span>
                    <span className="font-medium ml-2">{version.size}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground mb-2">包含模块：</p>
                  <div className="flex flex-wrap gap-2">
                    {version.modules.map((module, index) => (
                      <Badge key={index} variant="secondary">
                        {module}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload APK Dialog */}
      <Dialog open={showAPKUploader} onOpenChange={setShowAPKUploader}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">上传新版本APK</DialogTitle>
            <DialogDescription>
              上传新的APK文件后，系统将自动识别版本号
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <APKUploader onComplete={handleUploadComplete} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Module Selection Dialog */}
      <Dialog open={showModuleSelection} onOpenChange={setShowModuleSelection}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              选择本次更新的模块
            </DialogTitle>
            <DialogDescription>
              请选择本次版本更新涉及的功能模块，AI将重点分析这些模块
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                💡 提示：只需要勾选本次更新的模块，未勾选的模块将不会进行分析
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {availableModules.map((module) => (
                <button
                  key={module}
                  onClick={() => handleModuleToggle(module)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    selectedModules.includes(module)
                      ? 'border-primary bg-primary/10 shadow-md'
                      : 'border-border hover:border-primary/50 bg-card'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      selectedModules.includes(module)
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    }`}>
                      {selectedModules.includes(module) && (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className="font-medium">{module}</span>
                  </div>
                </button>
              ))}
            </div>

            {selectedModules.length > 0 && (
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-300">
                  已选择 <span className="font-bold">{selectedModules.length}</span> 个模块：
                  {selectedModules.join('、')}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowModuleSelection(false)}>
              取消
            </Button>
            <Button onClick={handleStartAnalysis} size="lg" className="gap-2">
              <Brain className="h-5 w-5" />
              开始智能分析
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
