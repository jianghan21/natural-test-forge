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
import { NavLink, useLocation, useParams, useNavigate } from "react-router-dom"
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
      icon: Building2,
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
  const navigate = useNavigate()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"
  
  // Extract project ID from current route
  const currentProjectId = params.projectId || params.id
  const [selectedProject, setSelectedProject] = useState(currentProjectId || "1")

  const isActive = (path: string) => {
    // Home page exact match
    if (path === "/" && currentPath === "/") {
      return true
    }
    
    // Projects list page match
    if (path === "/projects" && currentPath === "/projects") {
      return true
    }
    
    // For project overview page, only match if it's exactly the project detail page
    if (path.match(/^\/projects\/\d+$/)) {
      return currentPath === path
    }
    
    // For tests routes, also match legacy /new-test route
    if (path.includes("/tests") && currentPath === "/new-test") {
      return true
    }
    
    // For all other routes, match exactly
    return currentPath === path
  }
  
  const getNavClass = (path: string) => {
    const active = isActive(path)
    return active 
      ? "bg-primary text-primary-foreground font-medium hover:bg-primary! hover:text-primary-foreground! data-[state=open]:bg-primary data-[state=open]:text-primary-foreground" 
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
  }

  const mainItems = getMainItems(currentProjectId || selectedProject)
  const analysisItems = getAnalysisItems(currentProjectId || selectedProject)
  
  const currentProject = projects.find(p => p.id === (currentProjectId || selectedProject))

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <div className="p-4 border-b">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer w-full"
        >
          <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <TestTube className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div className="text-left">
              <h2 className="font-semibold text-foreground">TestFlow</h2>
              <p className="text-xs text-muted-foreground">AI Testing Platform</p>
            </div>
          )}
        </button>
      </div>


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