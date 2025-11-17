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
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: generateAgentResponse(userMessage.content),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAgentResponse = (userInput: string): string => {
    // Mock AI logic - replace with actual AI integration
    const responses = [
      '感谢您提供的信息。请问这个功能的主要使用场景是什么？',
      '我需要了解一下，这个功能是否需要考虑异常情况处理？',
      '明白了。还有一个问题，这个功能是否涉及用户权限控制？',
      '好的，信息已经足够了。让我为您生成测试用例...'
    ];
    
    const randomIndex = Math.floor(Math.random() * responses.length);
    
    // Last response triggers test case generation
    if (randomIndex === responses.length - 1) {
      setTimeout(() => {
        generateTestCases();
      }, 2000);
    }
    
    return responses[randomIndex];
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
      content: '我已经为您生成了测试用例。请查看下方的测试用例表格，确认无误后点击"开始执行测试"按钮。',
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
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'running':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const passedCount = testResults.filter(r => r.status === 'passed').length;
  const failedCount = testResults.filter(r => r.status === 'failed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">AI 测试用例生成</h1>
          <p className="text-slate-300">与 AI 对话，自动生成测试用例并执行测试</p>
        </div>

        {/* Chat Interface */}
        <Card className="bg-slate-900/50 border-slate-700 mb-6">
          <CardContent className="p-0">
            {/* Messages Area */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'agent' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-100'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString('zh-CN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {phase === 'chat' && (
              <div className="border-t border-slate-700 p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="请输入需求文档或回答问题..."
                    className="flex-1 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test Cases Table */}
        {(phase === 'review' || phase === 'executing' || phase === 'completed') && testCases.length > 0 && (
          <Card className="bg-slate-900/50 border-slate-700 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">测试用例</h2>
                {phase === 'review' && (
                  <Button
                    onClick={handleStartExecution}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    开始执行测试
                  </Button>
                )}
                {phase === 'completed' && (
                  <Button
                    onClick={handleRestart}
                    variant="outline"
                    className="border-slate-600 text-white hover:bg-slate-800"
                  >
                    创建新测试
                  </Button>
                )}
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-slate-800/50">
                      <TableHead className="text-slate-300">用例编号</TableHead>
                      <TableHead className="text-slate-300">模块</TableHead>
                      <TableHead className="text-slate-300">测试标题</TableHead>
                      <TableHead className="text-slate-300">测试步骤</TableHead>
                      <TableHead className="text-slate-300">预期结果</TableHead>
                      <TableHead className="text-slate-300">优先级</TableHead>
                      <TableHead className="text-slate-300">类型</TableHead>
                      {(phase === 'executing' || phase === 'completed') && (
                        <TableHead className="text-slate-300">状态</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testCases.map((testCase) => {
                      const result = testResults.find(r => r.caseId === testCase.id);
                      return (
                        <TableRow key={testCase.id} className="border-slate-700 hover:bg-slate-800/50">
                          <TableCell className="font-mono text-slate-300">{testCase.caseNumber}</TableCell>
                          <TableCell className="text-slate-300">{testCase.module}</TableCell>
                          <TableCell className="text-slate-300">{testCase.title}</TableCell>
                          <TableCell className="text-slate-300 max-w-xs">
                            <div className="whitespace-pre-wrap text-sm">{testCase.steps}</div>
                          </TableCell>
                          <TableCell className="text-slate-300 max-w-xs">
                            <div className="text-sm">{testCase.expected}</div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getPriorityColor(testCase.priority)} text-white`}>
                              {testCase.priority}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-300">{testCase.testType}</TableCell>
                          {(phase === 'executing' || phase === 'completed') && result && (
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(result.status)}
                                {result.duration && (
                                  <span className="text-xs text-slate-400">{result.duration}</span>
                                )}
                              </div>
                              {result.error && (
                                <p className="text-xs text-red-400 mt-1">{result.error}</p>
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
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-slate-400 text-sm mb-1">总用例数</p>
                        <p className="text-3xl font-bold text-white">{testCases.length}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-900/20 border-green-700">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-green-400 text-sm mb-1">通过</p>
                        <p className="text-3xl font-bold text-green-500">{passedCount}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-900/20 border-red-700">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-red-400 text-sm mb-1">失败</p>
                        <p className="text-3xl font-bold text-red-500">{failedCount}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
