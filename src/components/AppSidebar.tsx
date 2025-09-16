import { 
  Home, 
  Plus, 
  BarChart3, 
  Calendar, 
  TestTube, 
  Brain, 
  Shield, 
  Settings, 
  Cog 
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const mainItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "New Test", url: "/new-test", icon: Plus },
  { title: "Results", url: "/results", icon: BarChart3 },
  { title: "Plans", url: "/plans", icon: Calendar },
  { title: "Tests", url: "/tests", icon: TestTube },
]

const analysisItems = [
  { title: "Insights", url: "/insights", icon: Brain },
  { title: "Coverage", url: "/coverage", icon: Shield },
]

const settingsItems = [
  { title: "Configuration", url: "/configuration", icon: Cog },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/"
    }
    return currentPath.startsWith(path)
  }

  const getNavClass = (path: string) => {
    const active = isActive(path)
    return `${active 
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    } transition-all duration-200`
  }

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

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main
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

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Analysis
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

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Settings
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