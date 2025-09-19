import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Smartphone, MousePointer, Move, Clock, Zap, Settings } from 'lucide-react';

interface InputRule {
  id: string;
  inputType: string;
  rule: string;
  description: string;
}

interface SpecialAction {
  id: string;
  elementType: string;
  actionType: string;
  description: string;
}

interface PageInteraction {
  pageId: string;
  pageTitle: string;
  pageDescription: string;
  inputRules: InputRule[];
  specialActions: SpecialAction[];
}

const CloudDeviceSimulator = () => {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [showConfigCard, setShowConfigCard] = useState(false);
  const [currentInteraction, setCurrentInteraction] = useState<PageInteraction | null>(null);

  // 模拟的页面数据
  const pages = [
    {
      id: 'login',
      title: '登录页面',
      description: '用户登录界面，包含用户名和密码输入',
      screenshot: '/api/placeholder/180/320',
      position: { x: 50, y: 100 }
    },
    {
      id: 'home',
      title: '首页',
      description: '应用主页面，展示主要功能入口',
      screenshot: '/api/placeholder/180/320',
      position: { x: 50, y: 450 }
    },
    {
      id: 'profile',
      title: '个人中心',
      description: '用户个人信息管理页面',
      screenshot: '/api/placeholder/180/320',
      position: { x: 300, y: 100 }
    },
    {
      id: 'settings',
      title: '设置页面',
      description: '应用设置和偏好配置',
      screenshot: '/api/placeholder/180/320',
      position: { x: 300, y: 450 }
    }
  ];

  const handlePageClick = (pageId: string) => {
    setSelectedPage(pageId);
    setShowConfigCard(true);
    
    // 初始化当前页面的交互配置
    const page = pages.find(p => p.id === pageId);
    if (page) {
      setCurrentInteraction({
        pageId: page.id,
        pageTitle: page.title,
        pageDescription: page.description,
        inputRules: [],
        specialActions: []
      });
    }
  };

  const addInputRule = () => {
    if (!currentInteraction) return;
    
    const newRule: InputRule = {
      id: Date.now().toString(),
      inputType: '',
      rule: '',
      description: ''
    };
    
    setCurrentInteraction({
      ...currentInteraction,
      inputRules: [...currentInteraction.inputRules, newRule]
    });
  };

  const updateInputRule = (ruleId: string, field: keyof InputRule, value: string) => {
    if (!currentInteraction) return;
    
    setCurrentInteraction({
      ...currentInteraction,
      inputRules: currentInteraction.inputRules.map(rule =>
        rule.id === ruleId ? { ...rule, [field]: value } : rule
      )
    });
  };

  const removeInputRule = (ruleId: string) => {
    if (!currentInteraction) return;
    
    setCurrentInteraction({
      ...currentInteraction,
      inputRules: currentInteraction.inputRules.filter(rule => rule.id !== ruleId)
    });
  };

  const addSpecialAction = () => {
    if (!currentInteraction) return;
    
    const newAction: SpecialAction = {
      id: Date.now().toString(),
      elementType: '',
      actionType: '',
      description: ''
    };
    
    setCurrentInteraction({
      ...currentInteraction,
      specialActions: [...currentInteraction.specialActions, newAction]
    });
  };

  const updateSpecialAction = (actionId: string, field: keyof SpecialAction, value: string) => {
    if (!currentInteraction) return;
    
    setCurrentInteraction({
      ...currentInteraction,
      specialActions: currentInteraction.specialActions.map(action =>
        action.id === actionId ? { ...action, [field]: value } : action
      )
    });
  };

  const removeSpecialAction = (actionId: string) => {
    if (!currentInteraction) return;
    
    setCurrentInteraction({
      ...currentInteraction,
      specialActions: currentInteraction.specialActions.filter(action => action.id !== actionId)
    });
  };

  const closeConfigCard = () => {
    setShowConfigCard(false);
    setSelectedPage(null);
    setCurrentInteraction(null);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* 左侧 - 云真机模拟器 */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Smartphone className="h-8 w-8 text-primary" />
            云真机模拟运行
          </h1>
          <p className="text-muted-foreground mt-2">
            点击左侧页面进行交互配置，为自动化测试定义操作规则
          </p>
        </div>

        {/* 设备模拟区域 */}
        <Card className="max-w-md mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
          <CardContent className="p-6">
            {/* 设备外框 */}
            <div className="bg-black rounded-2xl p-4 shadow-2xl">
              {/* 状态栏 */}
              <div className="bg-slate-900 rounded-t-lg px-3 py-1 flex justify-between items-center text-white text-xs">
                <span>9:41</span>
                <span>●●●●● WiFi</span>
                <span>100%</span>
              </div>
              
              {/* 屏幕内容区域 */}
              <div className="bg-white rounded-b-lg relative overflow-hidden" style={{ height: '600px' }}>
                {/* 页面卡片 */}
                {pages.map(page => (
                  <div
                    key={page.id}
                    className={`absolute cursor-pointer transition-all duration-200 ${
                      selectedPage === page.id 
                        ? 'ring-2 ring-primary scale-105 shadow-lg' 
                        : 'hover:scale-102 hover:shadow-md'
                    }`}
                    style={{
                      left: page.position.x,
                      top: page.position.y,
                      width: '120px',
                      height: '160px'
                    }}
                    onClick={() => handlePageClick(page.id)}
                  >
                    <Card className="h-full border-2">
                      <CardContent className="p-2 h-full flex flex-col">
                        {/* 页面预览图 */}
                        <div className="flex-1 bg-gradient-to-br from-primary/10 to-secondary/10 rounded mb-2 flex items-center justify-center">
                          <div className="text-center">
                            <Settings className="h-6 w-6 mx-auto text-primary mb-1" />
                            <span className="text-xs font-medium">{page.title}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 右侧 - 交互配置卡片 */}
      {showConfigCard && currentInteraction && (
        <div className="w-96 border-l border-border bg-background/95 backdrop-blur-sm">
          <Card className="h-full rounded-none border-0">
            <CardHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{currentInteraction.pageTitle}</CardTitle>
                  <CardDescription className="mt-1">
                    {currentInteraction.pageDescription}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={closeConfigCard}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* 页面基本信息 */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    页面信息
                  </Badge>
                </h3>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="pageTitle">页面标签名</Label>
                    <Input
                      id="pageTitle"
                      value={currentInteraction.pageTitle}
                      onChange={(e) => setCurrentInteraction({
                        ...currentInteraction,
                        pageTitle: e.target.value
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pageDescription">页面描述</Label>
                    <Textarea
                      id="pageDescription"
                      value={currentInteraction.pageDescription}
                      onChange={(e) => setCurrentInteraction({
                        ...currentInteraction,
                        pageDescription: e.target.value
                      })}
                      className="mt-1 min-h-[80px]"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Input组件规则定义 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
                      输入规则
                    </Badge>
                  </h3>
                  <Button variant="outline" size="sm" onClick={addInputRule}>
                    添加规则
                  </Button>
                </div>

                {currentInteraction.inputRules.map(rule => (
                  <Card key={rule.id} className="p-3 border-dashed">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">输入组件</Label>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeInputRule(rule.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">组件类型</Label>
                          <Select
                            value={rule.inputType}
                            onValueChange={(value) => updateInputRule(rule.id, 'inputType', value)}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue placeholder="选择类型" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">文本输入</SelectItem>
                              <SelectItem value="password">密码输入</SelectItem>
                              <SelectItem value="email">邮箱输入</SelectItem>
                              <SelectItem value="number">数字输入</SelectItem>
                              <SelectItem value="search">搜索框</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="text-xs">输入规则</Label>
                          <Input
                            placeholder="如: 6-20位字符"
                            value={rule.rule}
                            onChange={(e) => updateInputRule(rule.id, 'rule', e.target.value)}
                            className="h-8"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-xs">规则说明</Label>
                        <Input
                          placeholder="详细描述输入要求"
                          value={rule.description}
                          onChange={(e) => updateInputRule(rule.id, 'description', e.target.value)}
                          className="h-8"
                        />
                      </div>
                    </div>
                  </Card>
                ))}

                {currentInteraction.inputRules.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    暂无输入规则，点击"添加规则"开始配置
                  </div>
                )}
              </div>

              <Separator />

              {/* 特殊操作配置 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                      特殊操作
                    </Badge>
                  </h3>
                  <Button variant="outline" size="sm" onClick={addSpecialAction}>
                    添加操作
                  </Button>
                </div>

                {currentInteraction.specialActions.map(action => (
                  <Card key={action.id} className="p-3 border-dashed">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">操作配置</Label>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeSpecialAction(action.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">元素类型</Label>
                          <Select
                            value={action.elementType}
                            onValueChange={(value) => updateSpecialAction(action.id, 'elementType', value)}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue placeholder="选择元素" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="button">按钮</SelectItem>
                              <SelectItem value="image">图片</SelectItem>
                              <SelectItem value="text">文本</SelectItem>
                              <SelectItem value="card">卡片</SelectItem>
                              <SelectItem value="list">列表项</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="text-xs">操作类型</Label>
                          <Select
                            value={action.actionType}
                            onValueChange={(value) => updateSpecialAction(action.id, 'actionType', value)}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue placeholder="选择操作" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="longPress">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3 w-3" />
                                  长按
                                </div>
                              </SelectItem>
                              <SelectItem value="drag">
                                <div className="flex items-center gap-2">
                                  <Move className="h-3 w-3" />
                                  拖拽
                                </div>
                              </SelectItem>
                              <SelectItem value="doubleClick">
                                <div className="flex items-center gap-2">
                                  <MousePointer className="h-3 w-3" />
                                  双击
                                </div>
                              </SelectItem>
                              <SelectItem value="swipe">
                                <div className="flex items-center gap-2">
                                  <Zap className="h-3 w-3" />
                                  滑动
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-xs">操作说明</Label>
                        <Input
                          placeholder="描述具体的操作行为"
                          value={action.description}
                          onChange={(e) => updateSpecialAction(action.id, 'description', e.target.value)}
                          className="h-8"
                        />
                      </div>
                    </div>
                  </Card>
                ))}

                {currentInteraction.specialActions.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    暂无特殊操作，点击"添加操作"开始配置
                  </div>
                )}
              </div>
            </CardContent>

            {/* 底部操作按钮 */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={closeConfigCard}>
                  取消
                </Button>
                <Button size="sm" className="flex-1">
                  保存配置
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CloudDeviceSimulator;