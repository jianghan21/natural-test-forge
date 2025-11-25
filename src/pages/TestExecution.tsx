import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, Clock, Loader2, AlertCircle, FileText, ArrowLeft, Smartphone } from "lucide-react";
import mobileAppUI from "@/assets/mobile-app-ui.jpg";

interface TestCase {
  id: string;
  caseNumber: string;
  module: string;
  title: string;
  steps: string;
  expected: string;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  testType: string;
}

interface TestResult {
  caseId: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  duration?: string;
  error?: string;
}

interface ExecutionLog {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

export default function TestExecution() {
  const location = useLocation();
  const navigate = useNavigate();
  const testCases = (location.state?.testCases || []) as TestCase[];
  
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([]);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    if (testCases.length === 0) {
      navigate('/new-test');
      return;
    }

    // Initialize test results
    const initialResults: TestResult[] = testCases.map(tc => ({
      caseId: tc.id,
      status: 'pending'
    }));
    setTestResults(initialResults);

    // Add initial log
    addLog('info', '已连接到测试设备，开始执行测试用例');
    addLog('info', '初始化 WebSocket 服务');

    // Start execution
    executeTests();
  }, []);

  const addLog = (level: ExecutionLog['level'], message: string) => {
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    setExecutionLogs(prev => [...prev, {
      id: Date.now().toString() + Math.random(),
      timestamp,
      level,
      message
    }]);
  };

  const executeTests = () => {
    testCases.forEach((testCase, index) => {
      setTimeout(() => {
        // Update to running
        setTestResults(prev => prev.map(result => 
          result.caseId === testCase.id 
            ? { ...result, status: 'running' }
            : result
        ));

        addLog('info', `开始执行测试用例 ${testCase.caseNumber}: ${testCase.title}`);
        
        // Simulate screen changes
        setCurrentScreen((index % 3) + 1);
        addLog('info', `WebSocket 已连接到应用`);

        // Simulate test execution steps
        const steps = testCase.steps.split('\n');
        steps.forEach((step, stepIndex) => {
          setTimeout(() => {
            addLog('info', step.trim());
          }, stepIndex * 800);
        });

        // Complete after delay
        setTimeout(() => {
          const passed = Math.random() > 0.25; // 75% pass rate
          const duration = `${Math.floor(Math.random() * 10 + 5)}s`;
          
          setTestResults(prev => prev.map(result => 
            result.caseId === testCase.id 
              ? { 
                  ...result, 
                  status: passed ? 'passed' : 'failed',
                  duration,
                  error: passed ? undefined : '断言失败：预期结果与实际结果不符'
                }
              : result
          ));

          if (passed) {
            addLog('success', `测试用例 ${testCase.caseNumber} 执行成功`);
            addLog('success', `设备连接成功, 设备ID: 211.91.52.140:10125`);
          } else {
            addLog('error', `测试用例 ${testCase.caseNumber} 执行失败`);
            addLog('error', `WebSocket 连接错误`);
          }

          // Check if all tests completed
          if (index === testCases.length - 1) {
            setTimeout(() => {
              setIsCompleted(true);
              addLog('info', '所有测试用例执行完成');
            }, 1000);
          }
        }, 4000 + Math.random() * 2000);
      }, index * 6000);
    });
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-emerald-500 fill-emerald-500/20" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getLogIcon = (level: ExecutionLog['level']) => {
    switch (level) {
      case 'success':
        return <CheckCircle className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />;
      case 'error':
        return <XCircle className="h-3.5 w-3.5 text-red-500 flex-shrink-0" />;
      case 'warning':
        return <AlertCircle className="h-3.5 w-3.5 text-yellow-500 flex-shrink-0" />;
      default:
        return <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />;
    }
  };

  const passedCount = testResults.filter(r => r.status === 'passed').length;
  const failedCount = testResults.filter(r => r.status === 'failed').length;
  const completedCount = passedCount + failedCount;
  const progress = (completedCount / testCases.length) * 100;
  const passRate = testCases.length > 0 ? ((passedCount / testCases.length) * 100).toFixed(1) : '0';

  if (showReport) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setShowReport(false)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回执行详情
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                测试报告
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Summary */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground">{testCases.length}</div>
                      <div className="text-sm text-muted-foreground mt-1">总用例数</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-500">{passedCount}</div>
                      <div className="text-sm text-muted-foreground mt-1">通过</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-500">{failedCount}</div>
                      <div className="text-sm text-muted-foreground mt-1">失败</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{passRate}%</div>
                      <div className="text-sm text-muted-foreground mt-1">通过率</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              {/* Detailed Results */}
              <div>
                <h3 className="font-semibold mb-4">详细结果</h3>
                <div className="space-y-3">
                  {testCases.map((testCase) => {
                    const result = testResults.find(r => r.caseId === testCase.id);
                    return (
                      <Card key={testCase.id}>
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {result && getStatusIcon(result.status)}
                                <span className="font-medium">{testCase.caseNumber}</span>
                                <span className="text-sm text-muted-foreground">{testCase.title}</span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>模块: {testCase.module}</span>
                                <span>优先级: {testCase.priority}</span>
                                {result?.duration && <span>耗时: {result.duration}</span>}
                              </div>
                              {result?.error && (
                                <div className="mt-2 text-sm text-red-500">
                                  错误: {result.error}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => navigate('/new-test')} className="flex-1">
                  创建新测试
                </Button>
                <Button variant="outline" onClick={() => window.print()} className="flex-1">
                  导出报告
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">测试执行</h1>
            <p className="text-sm text-muted-foreground mt-1">
              测试用例执行中 ({completedCount}/{testCases.length})
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">通过率</div>
              <div className="text-2xl font-bold text-primary">{passRate}%</div>
            </div>
            {isCompleted && (
              <Button onClick={() => setShowReport(true)}>
                <FileText className="h-4 w-4 mr-2" />
                查看报告
              </Button>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content - Three Columns */}
      <div className="flex-1 grid grid-cols-12 gap-6 p-6 overflow-hidden">
        {/* Left: Cloud Device Simulator */}
        <div className="col-span-3">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                设备预览
                <Badge variant="outline" className="ml-auto">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5" />
                  已连接
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-[240px] h-[480px] bg-gray-900 rounded-[2.5rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden">
                  {/* Screen */}
                  <div className="w-full h-full bg-white relative overflow-hidden">
                    <img 
                      src={mobileAppUI} 
                      alt="App Screen" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Status Bar on Phone */}
                <div className="absolute top-[12px] left-[12px] right-[12px] flex items-center justify-between px-4 text-white z-10">
                  <span className="text-xs font-medium">15:44</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-3 border border-white rounded-sm relative">
                      <div className="absolute inset-0.5 bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle: Test Cases */}
        <div className="col-span-5">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">
                测试用例执行 ({testCases.length} 个用例)
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-2">
                  {testCases.map((testCase) => {
                    const result = testResults.find(r => r.caseId === testCase.id);
                    const statusText = result?.status === 'pending' ? '待执行' :
                                      result?.status === 'running' ? '执行中' :
                                      result?.status === 'passed' ? '通过' : '失败';
                    
                    return (
                      <div
                        key={testCase.id}
                        className={`p-3 rounded-lg border transition-all ${
                          result?.status === 'running' 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border bg-card hover:bg-accent/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="mt-0.5">
                              {result && getStatusIcon(result.status)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{testCase.caseNumber}</span>
                                <span className="text-xs text-muted-foreground truncate">
                                  {testCase.title}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {testCase.module}
                              </div>
                            </div>
                          </div>
                          <Badge 
                            variant={
                              result?.status === 'passed' ? 'default' :
                              result?.status === 'failed' ? 'destructive' :
                              result?.status === 'running' ? 'default' : 'outline'
                            }
                            className="flex-shrink-0"
                          >
                            {statusText}
                          </Badge>
                        </div>
                        {result?.error && (
                          <div className="mt-2 text-xs text-red-500 pl-7">
                            {result.error}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Right: Execution Logs */}
        <div className="col-span-4">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">执行日志</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-2 font-mono text-xs">
                  {executionLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-2">
                      <span className="text-muted-foreground flex-shrink-0 w-16">
                        {log.timestamp}
                      </span>
                      {getLogIcon(log.level)}
                      <span className={`flex-1 ${
                        log.level === 'error' ? 'text-red-500' :
                        log.level === 'success' ? 'text-green-500' :
                        log.level === 'warning' ? 'text-yellow-500' :
                        'text-foreground'
                      }`}>
                        {log.message}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
