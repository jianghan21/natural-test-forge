import { useState } from "react"
import { 
  FolderOpen, 
  TestTube, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Shield, 
  Settings, 
  Wrench,
  Home,
  Plus,
  ChevronDown,
  Building2
} from "lucide-react"
import { NavLink, useLocation, useParams } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock projects data
const projects = [
  { id: "1", name: "电商平台测试" },
  { id: "2", name: "移动端APP测试" }, 
  { id: "3", name: "API接口测试" }
]

// Navigation items
const getMainItems = (projectId?: string) => [
  {
    title: "项目列表",
    url: "/projects",
    icon: Building2,
  },
  ...(projectId ? [
    {
      title: "项目概览",
      url: `/projects/${projectId}`,
      icon: Home,
    },
    {
      title: "测试用例",
      url: `/projects/${projectId}/tests`,
      icon: TestTube,
    },
    {
      title: "测试计划",
      url: `/projects/${projectId}/plans`,
      icon: FileText,
    },
    {
      title: "测试结果",
      url: `/projects/${projectId}/results`,
      icon: BarChart3,
    },
  ] : [])
]

const getAnalysisItems = (projectId?: string) => [
  ...(projectId ? [
    {
      title: "测试洞察",
      url: `/projects/${projectId}/insights`,
      icon: TrendingUp,
    },
    {
      title: "覆盖率分析",
      url: `/projects/${projectId}/coverage`,
      icon: Shield,
    },
    {
      title: "测试配置",
      url: `/projects/${projectId}/configuration`,
      icon: Wrench,
    },
  ] : [])
]

const settingsItems = [
  {
    title: "系统设置",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const params = useParams()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"
  
  // Extract project ID from current route
  const currentProjectId = params.projectId || params.id
  const [selectedProject, setSelectedProject] = useState(currentProjectId || "1")

  const isActive = (path: string) => {
    if (path === "/projects" && (currentPath === "/" || currentPath === "/projects")) {
      return true
    }
    if (path === "/") {
      return currentPath === "/"
    }
    // For project-specific routes, check exact match or project scope
    if (path.includes("/projects/") && currentProjectId) {
      return currentPath === path
    }
    // For other routes, only match if it's exact or starts with path but has a delimiter
    return currentPath === path || (currentPath.startsWith(path + "/") && path !== "/projects")
  }
  
  const getNavClass = (path: string) => {
    const active = isActive(path)
    return `${active 
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    } transition-all duration-200 ${active ? "hover:bg-primary hover:text-primary-foreground" : ""}`
  }

  const mainItems = getMainItems(currentProjectId || selectedProject)
  const analysisItems = getAnalysisItems(currentProjectId || selectedProject)
  
  const currentProject = projects.find(p => p.id === (currentProjectId || selectedProject))

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <TestTube className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-semibold text-foreground">TestFlow</h2>
              <p className="text-xs text-muted-foreground">AI Testing Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Project Selector */}
      {!collapsed && (currentProjectId || selectedProject) && (
        <div className="p-4 border-b">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">当前项目</label>
            <Select value={currentProjectId || selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-full">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span className="truncate">{currentProject?.name}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {project.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <SidebarContent className="px-2 py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            主要功能
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className={`${collapsed ? "h-5 w-5" : "h-4 w-4"}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Analysis Tools - Only show when in a project */}
        {analysisItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
              分析工具
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {analysisItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClass(item.url)}>
                        <item.icon className={`${collapsed ? "h-5 w-5" : "h-4 w-4"}`} />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            设置
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className={`${collapsed ? "h-5 w-5" : "h-4 w-4"}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}