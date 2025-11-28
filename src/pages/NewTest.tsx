import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Bot, User, CheckCircle, XCircle, Clock, Play, Loader2, Paperclip, X, Pencil, Trash2, Plus, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import loginPage from "@/assets/login-page.jpg";
import appHome from "@/assets/app-home.jpg";
import userCenter from "@/assets/user-center.jpg";
import appScreen1 from "@/assets/app-screen-1.jpg";
import appScreen2 from "@/assets/app-screen-2.jpg";
import mobileAppUi from "@/assets/mobile-app-ui.jpg";

// Mock app pages data
interface AppPage {
  id: string;
  name: string;
  image: string;
  isMainPage: boolean;
}

const mockAppPages: AppPage[] = [
  { id: '1', name: 'Explore Page with Creation Menu', image: loginPage, isMainPage: false },
  { id: '2', name: "whh's OC Management Page", image: appHome, isMainPage: false },
  { id: '3', name: 'RP Card Page', image: userCenter, isMainPage: false },
  { id: '4', name: 'RPCard Page', image: appScreen1, isMainPage: false },
  { id: '5', name: 'RPCard Page', image: appScreen2, isMainPage: false },
  { id: '6', name: 'Partner OC Configuration Page', image: mobileAppUi, isMainPage: false },
  { id: '7', name: 'Introduction Page', image: loginPage, isMainPage: false },
  { id: '8', name: 'Rating Settings Page', image: appHome, isMainPage: false },
  { id: '9', name: 'Rating Settings Page 2', image: userCenter, isMainPage: false },
  { id: '10', name: 'Main Explore Page', image: appScreen1, isMainPage: true },
];

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

interface TestCase {
  id: string;
  caseNumber: string;
  module: string;
  title: string;
  steps: string;
  expected: string;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  testType: '功能测试' | '性能测试' | '界面测试' | '兼容性测试';
}

interface TestResult {
  caseId: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  duration?: string;
  error?: string;
}

type Phase = 'chat' | 'review' | 'executing' | 'completed';

export default function NewTest() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      content: '你好！我是测试用例生成助手。请输入您的完整需求文档，我会帮您生成测试用例。如果需要更多信息，我会向您提问。\n\n以下是一些帮助我更好理解需求的关键信息：\n\n1️⃣ **场景路径**：从哪个入口进入？（如：首页 Banner / 我的 → 登录）\n2️⃣ **关键变量**：使用什么账号/密码/手机号？\n3️⃣ **边界情况**：失败场景要不要测？（如：密码错误、网络失败等）',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [editingCase, setEditingCase] = useState<TestCase | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPageSelectionDialogOpen, setIsPageSelectionDialogOpen] = useState(false);
  const [appPages, setAppPages] = useState<AppPage[]>(mockAppPages);
  const [selectedPageIds, setSelectedPageIds] = useState<string[]>([]);
  const [pendingUserMessage, setPendingUserMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    // Calculate conversation round (count user messages) before adding the new one
    const userMessageCount = messages.filter(m => m.role === 'user').length;

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');

    // Check if user wants to start execution in review phase
    if (phase === 'review' && (
      currentInput.includes('开始执行') || 
      currentInput.includes('执行测试') ||
      currentInput.includes('开始测试') ||
      currentInput.toLowerCase().includes('start')
    )) {
      setIsLoading(true);
      setTimeout(() => {
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'agent',
          content: '好的，正在准备执行环境...',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, agentMessage]);
        setIsLoading(false);
        
        // Navigate to execution page
        setTimeout(() => {
          navigate('/test-execution', { state: { testCases } });
        }, 1000);
      }, 1000);
      return;
    }

    // First user message: show page selection dialog before asking questions
    if (userMessageCount === 0) {
      setPendingUserMessage(currentInput);
      setIsPageSelectionDialogOpen(true);
      return;
    }

    setIsLoading(true);
    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: generateAgentResponse(currentInput, userMessageCount),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handlePageSelect = (pageId: string) => {
    setSelectedPageIds(prev => 
      prev.includes(pageId) 
        ? prev.filter(id => id !== pageId) 
        : [...prev, pageId]
    );
  };

  const handleSetMainPage = (pageId: string) => {
    setAppPages(prev => prev.map(page => ({
      ...page,
      isMainPage: page.id === pageId
    })));
    toast({
      title: "已设置主页面",
      description: "主页面设置成功",
    });
  };

  const handleConfirmPageSelection = () => {
    setIsPageSelectionDialogOpen(false);
    setIsLoading(true);
    
    // Continue with the conversation
    const userMessageCount = messages.filter(m => m.role === 'user').length;
    
    setTimeout(() => {
      const selectedPagesText = selectedPageIds.length > 0 
        ? `\n\n已选择 ${selectedPageIds.length} 个测试页面。` 
        : '';
      const mainPage = appPages.find(p => p.isMainPage);
      const mainPageText = mainPage ? `\n主页面：${mainPage.name}` : '';
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: `收到您的需求，已记录测试页面配置。${selectedPagesText}${mainPageText}\n\n${generateAgentResponse(pendingUserMessage, userMessageCount)}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);
      setPendingUserMessage('');
    }, 1500);
  };

  const generateAgentResponse = (userInput: string, conversationRound: number): string => {
    // Mock AI logic - replace with actual AI integration
    
    // If in review phase and user wants modifications
    if (phase === 'review') {
      setTimeout(() => {
        // Regenerate test cases with modifications
        generateTestCases();
      }, 2000);
      return '好的，我已根据您的反馈重新调整了测试用例。请查看更新后的内容。';
    }
    
    // Diverse question pools for different conversation rounds
    const questionPools = {
      round1: [
        '感谢您提供的信息。请问这个功能的主要使用场景是什么？',
        '收到！能详细说明一下这个功能的目标用户群体吗？',
        '好的，我了解了基本情况。请问这个功能的核心价值是什么？',
        '明白了。能说说这个功能最重要的业务流程是什么吗？',
        '谢谢分享。这个功能预计会有多少并发用户使用？'
      ],
      round2: [
        '我需要了解一下，这个功能是否需要考虑异常情况处理？',
        '请问在使用这个功能时，是否有特殊的性能要求？',
        '这个功能是否需要支持多语言或国际化？',
        '能告诉我这个功能的数据量级大概是多少吗？',
        '这个功能是否需要与第三方系统集成？',
        '请问是否需要考虑移动端和PC端的兼容性？'
      ],
      round3: [
        '明白了。还有一个问题，这个功能是否涉及用户权限控制？',
        '最后确认一下，这个功能是否需要审计日志记录？',
        '请问这个功能的数据安全等级要求如何？',
        '能说说这个功能的容错机制需要达到什么程度吗？',
        '这个功能是否需要支持数据备份和恢复？'
      ],
      pageSelection: {
        text: '我注意到应用中有多个页面。为了更准确地生成测试用例，请帮我确认一下哪个是主页面：',
        images: [
          { id: 1, label: '登录页面', description: '用户身份验证入口' },
          { id: 2, label: 'app首页', description: '数据展示和操作中心' },
          { id: 3, label: '用户管理页面', description: '用户信息管理' }
        ]
      }
    };
    
    // Special case: Always ask for page selection in round 2
    if (conversationRound === 1) {
      return typeof questionPools.pageSelection === 'string' 
        ? questionPools.pageSelection 
        : JSON.stringify(questionPools.pageSelection);
    }
    
    // After 3 rounds of conversation, generate test cases
    if (conversationRound >= 3) {
      setTimeout(() => {
        generateTestCases();
      }, 2000);
      return '好的，信息已经足够了。让我为您生成测试用例...';
    }
    
    // Select random question from the appropriate pool
    let pool: string[];
    if (conversationRound === 0) {
      pool = questionPools.round1;
    } else if (conversationRound === 1) {
      pool = questionPools.round2;
    } else {
      pool = questionPools.round3;
    }
    
    // Return a random question from the pool
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  };

  const generateTestCases = () => {
    const mockTestCases: TestCase[] = [
      {
        id: '1',
        caseNumber: 'TC001',
        module: '用户登录',
        title: '使用正确的用户名和密码登录',
        steps: '1. 打开应用\n2. 输入正确的用户名\n3. 输入正确的密码\n4. 点击登录按钮',
        expected: '用户成功登录，跳转到主页面',
        priority: 'P0',
        testType: '功能测试'
      },
      {
        id: '2',
        caseNumber: 'TC002',
        module: '用户登录',
        title: '使用错误的密码登录',
        steps: '1. 打开应用\n2. 输入正确的用户名\n3. 输入错误的密码\n4. 点击登录按钮',
        expected: '显示错误提示信息，登录失败',
        priority: 'P0',
        testType: '功能测试'
      },
      {
        id: '3',
        caseNumber: 'TC003',
        module: '用户登录',
        title: '使用空密码登录',
        steps: '1. 打开应用\n2. 输入用户名\n3. 密码字段留空\n4. 点击登录按钮',
        expected: '显示验证错误提示',
        priority: 'P1',
        testType: '功能测试'
      },
      {
        id: '4',
        caseNumber: 'TC004',
        module: '数据展示',
        title: '验证数据列表加载',
        steps: '1. 成功登录后\n2. 进入数据列表页面\n3. 等待数据加载',
        expected: '数据列表正确显示，无加载错误',
        priority: 'P0',
        testType: '功能测试'
      },
      {
        id: '5',
        caseNumber: 'TC005',
        module: '界面适配',
        title: '验证不同分辨率下的界面显示',
        steps: '1. 在不同分辨率设备上打开应用\n2. 检查界面元素布局',
        expected: '界面在各种分辨率下显示正常',
        priority: 'P2',
        testType: '界面测试'
      }
    ];

    setTestCases(mockTestCases);
    setPhase('review');
    
    const finalMessage: Message = {
      id: Date.now().toString(),
      role: 'agent',
      content: '我已经为您生成了测试用例。请查看下方的测试用例表格。\n\n如果测试用例生成的满意的话，您可以说"开始执行"，我立即帮您执行这些测试用例。如果还有需要修改的地方，告诉我具体的修改意见，我会继续调整。',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, finalMessage]);
  };

  const handleStartExecution = () => {
    setPhase('executing');
    
    // Initialize test results
    const initialResults: TestResult[] = testCases.map(tc => ({
      caseId: tc.id,
      status: 'pending'
    }));
    setTestResults(initialResults);

    // Simulate test execution
    testCases.forEach((testCase, index) => {
      setTimeout(() => {
        // Update to running
        setTestResults(prev => prev.map(result => 
          result.caseId === testCase.id 
            ? { ...result, status: 'running' }
            : result
        ));

        // Complete after delay
        setTimeout(() => {
          const passed = Math.random() > 0.3; // 70% pass rate
          setTestResults(prev => prev.map(result => 
            result.caseId === testCase.id 
              ? { 
                  ...result, 
                  status: passed ? 'passed' : 'failed',
                  duration: `${Math.floor(Math.random() * 10 + 5)}s`,
                  error: passed ? undefined : '断言失败：预期结果与实际结果不符'
                }
              : result
          ));

          // Check if all tests completed
          if (index === testCases.length - 1) {
            setTimeout(() => {
              setPhase('completed');
              const finalMessage: Message = {
                id: Date.now().toString(),
                role: 'agent',
                content: '测试执行完成！请查看下方的测试结果。',
                timestamp: new Date()
              };
              setMessages(prev => [...prev, finalMessage]);
            }, 1000);
          }
        }, 3000 + Math.random() * 2000);
      }, index * 1000);
    });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
      toast({
        title: "文件已选择",
        description: `已添加 ${newFiles.length} 个文件`,
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddTestCase = () => {
    const newCase: TestCase = {
      id: Date.now().toString(),
      caseNumber: `TC${String(testCases.length + 1).padStart(3, '0')}`,
      module: '新模块',
      title: '新测试用例',
      steps: '1. 步骤1\n2. 步骤2',
      expected: '预期结果',
      priority: 'P1',
      testType: '功能测试'
    };
    setTestCases(prev => [...prev, newCase]);
    toast({
      title: "测试用例已添加",
      description: "您可以点击编辑按钮修改详细信息",
    });
  };

  const handleEditTestCase = (testCase: TestCase) => {
    setEditingCase({ ...testCase });
    setIsEditDialogOpen(true);
  };

  const handleSaveTestCase = () => {
    if (!editingCase) return;
    
    setTestCases(prev => prev.map(tc => 
      tc.id === editingCase.id ? editingCase : tc
    ));
    setIsEditDialogOpen(false);
    setEditingCase(null);
    toast({
      title: "测试用例已更新",
      description: "修改已保存",
    });
  };

  const handleDeleteTestCase = (id: string) => {
    setTestCases(prev => prev.filter(tc => tc.id !== id));
    toast({
      title: "测试用例已删除",
      variant: "destructive",
    });
  };

  const updateEditingCase = (field: keyof TestCase, value: string) => {
    if (!editingCase) return;
    setEditingCase(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleRestart = () => {
    setPhase('chat');
    setMessages([
      {
        id: Date.now().toString(),
        role: 'agent',
        content: '你好！我是测试用例生成助手。请输入您的完整需求文档，我会帮您生成测试用例。如果需要更多信息，我会向您提问。\n\n以下是一些帮助我更好理解需求的关键信息：\n\n1️⃣ **场景路径**：从哪个入口进入？（如：首页 Banner / 我的 → 登录）\n2️⃣ **关键变量**：使用什么账号/密码/手机号？\n3️⃣ **边界情况**：失败场景要不要测？（如：密码错误、网络失败等）',
        timestamp: new Date()
      }
    ]);
    setTestCases([]);
    setTestResults([]);
    setSelectedFiles([]);
  };

  const isPageSelectionMessage = (content: string) => {
    try {
      const parsed = JSON.parse(content);
      return parsed.text && parsed.images && Array.isArray(parsed.images);
    } catch {
      return false;
    }
  };

  const renderPageSelectionMessage = (content: string) => {
    try {
      const data = JSON.parse(content);
      const pageImages = [loginPage, appHome, userCenter];
      
      return (
        <div className="space-y-4">
          <p className="text-[15px] leading-relaxed">{data.text}</p>
          <div className="grid grid-cols-3 gap-3">
            {data.images.map((page: any, index: number) => (
              <div 
                key={page.id}
                className="group cursor-pointer rounded-lg border-2 border-border hover:border-primary transition-all overflow-hidden"
                onClick={() => {
                  setInputValue(`我选择 ${page.id}`);
                }}
              >
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <img 
                    src={pageImages[index]} 
                    alt={page.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-3 bg-card">
                  <p className="font-medium text-sm text-foreground mb-1">{page.label}</p>
                  <p className="text-xs text-muted-foreground">{page.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } catch {
      return <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{content}</p>;
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'P0': 'bg-red-500',
      'P1': 'bg-orange-500',
      'P2': 'bg-yellow-500',
      'P3': 'bg-blue-500'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-500';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'running':
        return <Loader2 className="h-5 w-5 text-primary animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const passedCount = testResults.filter(r => r.status === 'passed').length;
  const failedCount = testResults.filter(r => r.status === 'failed').length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto flex flex-col h-screen">
        {/* Header */}
        <div className="py-6 px-4 border-b border-border bg-card">
          <h1 className="text-2xl font-semibold text-foreground mb-1">AI 测试用例生成</h1>
          <p className="text-muted-foreground text-sm">与 AI 对话，自动生成测试用例并执行测试</p>
        </div>

        {/* Messages and Test Cases Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Messages and Test Cases (interleaved) */}
          {messages.map((message, index) => {
            // Find if test cases should be shown after this message
            const showTestCasesAfterThisMessage = 
              (phase === 'review' || phase === 'executing' || phase === 'completed') && 
              testCases.length > 0 && 
              message.content.includes('我已经为您生成了测试用例') &&
              index === messages.findIndex(m => m.content.includes('我已经为您生成了测试用例'));
            
            return (
              <div key={message.id}>
                {/* Render the message */}
                <div className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.role === 'agent' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="h-5 w-5 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`${
                      message.role === 'agent' && isPageSelectionMessage(message.content) 
                        ? 'max-w-full' 
                        : 'max-w-[80%]'
                    } rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {message.role === 'agent' && isPageSelectionMessage(message.content) 
                      ? renderPageSelectionMessage(message.content)
                      : <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{message.content}</p>
                    }
                  </div>
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-5 w-5 text-foreground" />
                    </div>
                  )}
                </div>
                
                {/* Render test cases table right after the generation message */}
                {showTestCasesAfterThisMessage && (
                  <Card className="shadow-card border-border mt-6">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-foreground">测试用例</h2>
                        <div className="flex gap-2">
                          {phase === 'review' && (
                            <Button
                              onClick={handleAddTestCase}
                              variant="outline"
                              size="sm"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              添加用例
                            </Button>
                          )}
                          {phase === 'completed' && (
                            <Button
                              onClick={handleRestart}
                              variant="outline"
                            >
                              创建新测试
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-border hover:bg-muted/50">
                              <TableHead className="text-muted-foreground font-medium">用例编号</TableHead>
                              <TableHead className="text-muted-foreground font-medium">模块</TableHead>
                              <TableHead className="text-muted-foreground font-medium">测试标题</TableHead>
                              <TableHead className="text-muted-foreground font-medium">测试步骤</TableHead>
                              <TableHead className="text-muted-foreground font-medium">预期结果</TableHead>
                              <TableHead className="text-muted-foreground font-medium">优先级</TableHead>
                              <TableHead className="text-muted-foreground font-medium">类型</TableHead>
                              {(phase === 'executing' || phase === 'completed') && (
                                <TableHead className="text-muted-foreground font-medium">状态</TableHead>
                              )}
                              {phase === 'review' && (
                                <TableHead className="text-muted-foreground font-medium">操作</TableHead>
                              )}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {testCases.map((testCase) => {
                              const result = testResults.find(r => r.caseId === testCase.id);
                              return (
                                <TableRow key={testCase.id} className="border-border hover:bg-muted/50">
                                  <TableCell className="font-mono text-foreground">{testCase.caseNumber}</TableCell>
                                  <TableCell className="text-foreground">{testCase.module}</TableCell>
                                  <TableCell className="text-foreground">{testCase.title}</TableCell>
                                  <TableCell className="text-foreground max-w-xs">
                                    <div className="whitespace-pre-wrap text-sm">{testCase.steps}</div>
                                  </TableCell>
                                  <TableCell className="text-foreground max-w-xs">
                                    <div className="text-sm">{testCase.expected}</div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge className={`${getPriorityColor(testCase.priority)} text-white border-0`}>
                                      {testCase.priority}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-foreground">{testCase.testType}</TableCell>
                                  {(phase === 'executing' || phase === 'completed') && result && (
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        {getStatusIcon(result.status)}
                                        {result.duration && (
                                          <span className="text-xs text-muted-foreground">{result.duration}</span>
                                        )}
                                      </div>
                                      {result.error && (
                                        <p className="text-xs text-destructive mt-1">{result.error}</p>
                                      )}
                                    </TableCell>
                                  )}
                                  {phase === 'review' && (
                                    <TableCell>
                                      <div className="flex gap-2">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => handleEditTestCase(testCase)}
                                          className="h-8 w-8"
                                        >
                                          <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => handleDeleteTestCase(testCase.id)}
                                          className="h-8 w-8 text-destructive hover:text-destructive"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  )}
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>

                      {phase === 'completed' && (
                        <div className="mt-6 grid grid-cols-3 gap-4">
                          <Card className="bg-muted border-border">
                            <CardContent className="p-4">
                              <div className="text-center">
                                <p className="text-muted-foreground text-sm mb-1">总用例数</p>
                                <p className="text-3xl font-bold text-foreground">{testCases.length}</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="bg-success/10 border-success">
                            <CardContent className="p-4">
                              <div className="text-center">
                                <p className="text-success text-sm mb-1">通过</p>
                                <p className="text-3xl font-bold text-success">{passedCount}</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="bg-destructive/10 border-destructive">
                            <CardContent className="p-4">
                              <div className="text-center">
                                <p className="text-destructive text-sm mb-1">失败</p>
                                <p className="text-3xl font-bold text-destructive">{failedCount}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
          
          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Fixed at bottom */}
        {phase !== 'executing' && phase !== 'completed' && (
          <div className="p-4 border-t border-border bg-card">
            {/* Selected Files Display */}
            {selectedFiles.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {selectedFiles.map((file, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="pl-3 pr-1 py-1.5 flex items-center gap-2"
                  >
                    <span className="text-sm">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full hover:bg-muted"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="relative flex items-center bg-background border border-input rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="ml-2 h-9 w-9 rounded-full hover:bg-muted"
                disabled={isLoading}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder={phase === 'review' ? "对测试用例有什么修改意见吗？" : "请输入需求文档或回答问题..."}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-4 text-[15px] placeholder:text-muted-foreground"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || (!inputValue.trim() && selectedFiles.length === 0)}
                size="icon"
                className="mr-2 rounded-full h-9 w-9 bg-primary hover:bg-primary/90 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Page Selection Dialog */}
      <Dialog open={isPageSelectionDialogOpen} onOpenChange={setIsPageSelectionDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl">测试页面 ({appPages.length})</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">点击页面标题下方的按钮设置为主页面</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  添加页面
                </Button>
                <Button variant="default" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  批量添加
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <ScrollArea className="flex-1 pr-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-4">
              {appPages.map((page) => (
                <div 
                  key={page.id}
                  className={`relative group rounded-lg border-2 transition-all overflow-hidden cursor-pointer ${
                    selectedPageIds.includes(page.id) 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : 'border-border hover:border-primary/50'
                  } ${page.isMainPage ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handlePageSelect(page.id)}
                >
                  {/* Main page badge */}
                  {page.isMainPage && (
                    <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded">
                      主页面
                    </div>
                  )}
                  
                  {/* Selection indicator */}
                  {selectedPageIds.includes(page.id) && (
                    <div className="absolute top-2 right-2 z-10 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  {/* Close button */}
                  <button 
                    className="absolute top-2 right-2 z-10 w-5 h-5 bg-destructive rounded-full items-center justify-center hidden group-hover:flex"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAppPages(prev => prev.filter(p => p.id !== page.id));
                    }}
                  >
                    <X className="h-3 w-3 text-destructive-foreground" />
                  </button>
                  
                  {/* Page image */}
                  <div className="aspect-[9/16] overflow-hidden bg-muted">
                    <img 
                      src={page.image} 
                      alt={page.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Page info */}
                  <div className="p-3 bg-card">
                    <p className="font-medium text-sm text-foreground mb-2 line-clamp-1">{page.name}</p>
                    <Button 
                      variant={page.isMainPage ? "secondary" : "outline"}
                      size="sm" 
                      className="w-full text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetMainPage(page.id);
                      }}
                    >
                      {page.isMainPage ? '当前主页面' : '设为主页面'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <DialogFooter className="flex-shrink-0 border-t pt-4">
            <Button variant="outline" onClick={() => setIsPageSelectionDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleConfirmPageSelection}>
              确认保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Test Case Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>编辑测试用例</DialogTitle>
          </DialogHeader>
          {editingCase && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="caseNumber">用例编号</Label>
                  <Input
                    id="caseNumber"
                    value={editingCase.caseNumber}
                    onChange={(e) => updateEditingCase('caseNumber', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="module">模块</Label>
                  <Input
                    id="module"
                    value={editingCase.module}
                    onChange={(e) => updateEditingCase('module', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">测试标题</Label>
                <Input
                  id="title"
                  value={editingCase.title}
                  onChange={(e) => updateEditingCase('title', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="steps">测试步骤</Label>
                <Textarea
                  id="steps"
                  value={editingCase.steps}
                  onChange={(e) => updateEditingCase('steps', e.target.value)}
                  rows={4}
                  placeholder="1. 步骤1&#10;2. 步骤2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expected">预期结果</Label>
                <Textarea
                  id="expected"
                  value={editingCase.expected}
                  onChange={(e) => updateEditingCase('expected', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">优先级</Label>
                  <Select
                    value={editingCase.priority}
                    onValueChange={(value) => updateEditingCase('priority', value)}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="P0">P0</SelectItem>
                      <SelectItem value="P1">P1</SelectItem>
                      <SelectItem value="P2">P2</SelectItem>
                      <SelectItem value="P3">P3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testType">测试类型</Label>
                  <Select
                    value={editingCase.testType}
                    onValueChange={(value) => updateEditingCase('testType', value)}
                  >
                    <SelectTrigger id="testType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="功能测试">功能测试</SelectItem>
                      <SelectItem value="性能测试">性能测试</SelectItem>
                      <SelectItem value="界面测试">界面测试</SelectItem>
                      <SelectItem value="兼容性测试">兼容性测试</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSaveTestCase}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
