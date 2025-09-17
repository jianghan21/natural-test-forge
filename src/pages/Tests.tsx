import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TestTube, Plus, Play, Pause, Edit, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface Test {
  id: string
  name: string
  createdAt: string
  lastRunPassRate: number
  creator: string
  description: string
  status: 'active' | 'paused'
}

export default function Tests() {
  const navigate = useNavigate()
  
  // Mock test data
  const [tests] = useState<Test[]>([
    {
      id: '1',
      name: '用户登录流程测试',
      createdAt: '2024-01-15 14:30:25',
      lastRunPassRate: 95.5,
      creator: 'admin@example.com',
      description: '测试用户登录、登出以及各种登录异常情况的处理',
      status: 'active'
    },
    {
      id: '2', 
      name: '商品浏览与搜索功能',
      createdAt: '2024-01-14 10:15:42',
      lastRunPassRate: 88.2,
      creator: 'tester1@example.com',
      description: '验证商品列表显示、分类筛选、搜索功能的正确性',
      status: 'active'
    },
    {
      id: '3',
      name: '订单创建与支付流程',
      createdAt: '2024-01-13 16:45:18',
      lastRunPassRate: 92.8,
      creator: 'tester2@example.com', 
      description: '完整的购物车到支付完成的端到端测试',
      status: 'paused'
    },
    {
      id: '4',
      name: '用户个人中心功能',
      createdAt: '2024-01-12 09:20:33',
      lastRunPassRate: 96.7,
      creator: 'admin@example.com',
      description: '个人信息编辑、订单查看、地址管理等功能测试',
      status: 'active'
    },
    {
      id: '5',
      name: '应用性能基准测试',
      createdAt: '2024-01-11 13:55:07',
      lastRunPassRate: 78.9,
      creator: 'performance@example.com',
      description: '应用启动时间、页面加载速度、内存使用等性能指标测试',
      status: 'active'
    }
  ])

  const getPassRateColor = (rate: number) => {
    if (rate >= 95) return 'text-success'
    if (rate >= 80) return 'text-warning'
    return 'text-destructive'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Top Guidance Section */}
      <div className="bg-gradient-primary rounded-xl p-6 text-white shadow-elevated">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <TestTube className="h-6 w-6" />
              欢迎使用 TestFlow AI
            </h1>
            <p className="text-white/90 mb-4">开始创建您的第一个测试用例，让 AI 帮您自动生成完整的测试流程</p>
            <Button 
              onClick={() => navigate('/new-test')}
              variant="secondary"
              size="lg"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm"
            >
              <Plus className="h-5 w-5 mr-2" />
              创建第一个测试
            </Button>
          </div>
        </div>
      </div>

      {/* Test List */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-primary" />
            测试用例库
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <ScrollArea className="h-[600px]">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="w-[200px]">测试名称</TableHead>
                    <TableHead className="w-[160px]">创建时间</TableHead>
                    <TableHead className="w-[120px]">最近通过率</TableHead>
                    <TableHead className="w-[160px]">创建人</TableHead>
                    <TableHead className="w-[80px]">状态</TableHead>
                    <TableHead className="min-w-[200px]">描述</TableHead>
                    <TableHead className="w-[150px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tests.map((test) => (
                    <TableRow 
                      key={test.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => navigate(`/tests/${test.id}`)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <TestTube className="h-4 w-4 text-primary" />
                          {test.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(test.createdAt)}
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${getPassRateColor(test.lastRunPassRate)}`}>
                          {test.lastRunPassRate}%
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {test.creator}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={test.status === 'active' ? 'default' : 'secondary'}
                          className={test.status === 'active' ? 'bg-success text-success-foreground' : ''}
                        >
                          {test.status === 'active' ? '运行中' : '已暂停'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="max-w-[300px] truncate" title={test.description}>
                          {test.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Toggle pause/resume
                            }}
                          >
                            {test.status === 'active' ? (
                              <Pause className="h-3 w-3" />
                            ) : (
                              <Play className="h-3 w-3" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate(`/tests/${test.id}/edit`)
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Delete test
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}