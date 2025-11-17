import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Send, Bot, User, CheckCircle, XCircle, Clock, Play, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [phase, setPhase] = useState<Phase>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      content: '你好！我是测试用例生成助手。请输入您的完整需求文档，我会帮您生成测试用例。如果需要更多信息，我会向您提问。',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    // Check if user wants to start execution in review phase
    if (phase === 'review' && (
      currentInput.includes('开始执行') || 
      currentInput.includes('执行测试') ||
      currentInput.includes('开始测试') ||
      currentInput.toLowerCase().includes('start')
    )) {
      setTimeout(() => {
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'agent',
          content: '好的，我现在开始执行这些测试用例...',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, agentMessage]);
        setIsLoading(false);
        
        // Start execution after a short delay
        setTimeout(() => {
          handleStartExecution();
        }, 1000);
      }, 1000);
      return;
    }

    // Calculate conversation round (count user messages)
    const userMessageCount = messages.filter(m => m.role === 'user').length;

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
    
    const responses = [
      '感谢您提供的信息。请问这个功能的主要使用场景是什么？',
      '我需要了解一下，这个功能是否需要考虑异常情况处理？',
      '明白了。还有一个问题，这个功能是否涉及用户权限控制？',
      '好的，信息已经足够了。让我为您生成测试用例...'
    ];
    
    // After 3 rounds of conversation, generate test cases
    if (conversationRound >= 3) {
      setTimeout(() => {
        generateTestCases();
      }, 2000);
      return responses[3];
    }
    
    return responses[conversationRound];
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

  const handleRestart = () => {
    setPhase('chat');
    setMessages([
      {
        id: Date.now().toString(),
        role: 'agent',
        content: '你好！我是测试用例生成助手。请输入您的完整需求文档，我会帮您生成测试用例。',
        timestamp: new Date()
      }
    ]);
    setTestCases([]);
    setTestResults([]);
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
          {/* Messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'agent' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-5 w-5 text-foreground" />
                </div>
              )}
            </div>
          ))}
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

          {/* Test Cases Table */}
          {(phase === 'review' || phase === 'executing' || phase === 'completed') && testCases.length > 0 && (
            <Card className="shadow-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">测试用例</h2>
                  {phase === 'completed' && (
                    <Button
                      onClick={handleRestart}
                      variant="outline"
                    >
                      创建新测试
                    </Button>
                  )}
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
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Fixed at bottom */}
        {phase !== 'executing' && phase !== 'completed' && (
          <div className="p-4 border-t border-border bg-card">
            <div className="relative flex items-center bg-background border border-input rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder={phase === 'review' ? "对测试用例有什么修改意见吗？" : "请输入需求文档或回答问题..."}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-5 py-4 text-[15px] placeholder:text-muted-foreground"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                size="icon"
                className="mr-2 rounded-full h-9 w-9 bg-primary hover:bg-primary/90 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
