import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Plus, FolderOpen, Users, TestTube, FileText, BarChart3, Settings, Archive } from "lucide-react";
interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  creator: string;
  status: 'active' | 'archived';
  testCount: number;
  planCount: number;
  memberCount: number;
}
export default function Projects() {
  const navigate = useNavigate();
  const [projects] = useState<Project[]>([{
    id: "1",
    name: "电商平台测试",
    description: "主要电商平台的功能测试项目，包括用户注册、登录、购物车、支付等核心流程",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-10",
    creator: "张三",
    status: "active",
    testCount: 45,
    planCount: 12,
    memberCount: 8
  }, {
    id: "2",
    name: "移动端APP测试",
    description: "移动应用的兼容性和功能测试，覆盖iOS和Android平台",
    createdAt: "2024-02-01",
    updatedAt: "2024-03-08",
    creator: "李四",
    status: "active",
    testCount: 32,
    planCount: 8,
    memberCount: 5
  }, {
    id: "3",
    name: "API接口测试",
    description: "后端API接口的功能和性能测试项目",
    createdAt: "2024-01-20",
    updatedAt: "2024-02-28",
    creator: "王五",
    status: "archived",
    testCount: 28,
    planCount: 6,
    memberCount: 3
  }]);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '活跃';
      case 'archived':
        return '已归档';
      default:
        return '未知';
    }
  };
  const activeProjects = projects.filter(p => p.status === 'active');
  const archivedProjects = projects.filter(p => p.status === 'archived');
  return <div className="flex-1 space-y-8 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">项目管理</h2>
          <p className="text-muted-foreground">管理和组织你的测试项目</p>
        </div>
        <Button onClick={() => navigate('/projects/new')} className="gap-2">
          <Plus className="h-4 w-4" />
          创建项目
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总项目数</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              活跃: {activeProjects.length} | 归档: {archivedProjects.length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总测试用例</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.reduce((sum, p) => sum + p.testCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              分布在 {activeProjects.length} 个活跃项目中
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">测试计划</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.reduce((sum, p) => sum + p.planCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              覆盖所有活跃项目
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">团队成员</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.max(...projects.map(p => p.memberCount))}
            </div>
            <p className="text-xs text-muted-foreground">
              最大项目团队规模
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            活跃项目
          </CardTitle>
          <CardDescription>
            当前正在进行的测试项目
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead className="w-[250px]">项目名称</TableHead>
                  <TableHead className="w-[180px]">创建时间</TableHead>
                  <TableHead className="w-[180px]">最后更新</TableHead>
                  <TableHead className="w-[140px]">创建人</TableHead>
                  <TableHead className="w-[120px]">测试用例</TableHead>
                  <TableHead className="w-[120px]">测试计划</TableHead>
                  <TableHead className="w-[120px]">团队成员</TableHead>
                  <TableHead className="w-[100px]">状态</TableHead>
                  
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeProjects.map(project => <TableRow key={project.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{project.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(project.createdAt)}</TableCell>
                    <TableCell>{formatDate(project.updatedAt)}</TableCell>
                    <TableCell>{project.creator}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{project.testCount}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{project.planCount}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.memberCount}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusText(project.status)}
                      </Badge>
                    </TableCell>
                    
                  </TableRow>)}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Archived Projects */}
      {archivedProjects.length > 0 && <>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5" />
                已归档项目
              </CardTitle>
              <CardDescription>
                已完成或暂停的项目
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead className="w-[250px]">项目名称</TableHead>
                      <TableHead className="w-[180px]">创建时间</TableHead>
                      <TableHead className="w-[140px]">创建人</TableHead>
                      <TableHead className="w-[120px]">测试用例</TableHead>
                      <TableHead className="w-[100px]">状态</TableHead>
                      <TableHead className="w-[180px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {archivedProjects.map(project => <TableRow key={project.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-semibold text-muted-foreground">{project.name}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {project.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(project.createdAt)}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{project.creator}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-muted-foreground">
                            {project.testCount}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(project.status)}>
                            {getStatusText(project.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => navigate(`/projects/${project.id}`)}>
                              <FolderOpen className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => {
                        // 恢复项目逻辑
                        console.log('恢复项目:', project.id);
                      }}>
                              恢复
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </>}
    </div>;
}