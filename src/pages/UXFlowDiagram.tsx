import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Eye, Download, ZoomIn, Network, Smartphone } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function UXFlowDiagram() {
  const navigate = useNavigate()
  const [selectedPage, setSelectedPage] = useState<string | null>(null)

  // Mock UX flow data
  const pages = [
    {
      id: "splash",
      name: "启动页面",
      screenshot: "/api/placeholder/200/300",
      position: { x: 100, y: 50 },
      connections: ["login", "main"],
      type: "entry"
    },
    {
      id: "login",
      name: "登录页面", 
      screenshot: "/api/placeholder/200/300",
      position: { x: 50, y: 200 },
      connections: ["main", "register"],
      type: "auth"
    },
    {
      id: "register",
      name: "注册页面",
      screenshot: "/api/placeholder/200/300", 
      position: { x: 250, y: 200 },
      connections: ["login", "main"],
      type: "auth"
    },
    {
      id: "main",
      name: "主页面",
      screenshot: "/api/placeholder/200/300",
      position: { x: 100, y: 350 },
      connections: ["profile", "products", "cart"],
      type: "main"
    },
    {
      id: "products",
      name: "商品列表",
      screenshot: "/api/placeholder/200/300",
      position: { x: 300, y: 350 },
      connections: ["product_detail", "cart"],
      type: "feature"
    },
    {
      id: "product_detail",
      name: "商品详情",
      screenshot: "/api/placeholder/200/300",
      position: { x: 450, y: 350 },
      connections: ["cart", "products"],
      type: "feature"
    },
    {
      id: "cart",
      name: "购物车",
      screenshot: "/api/placeholder/200/300",
      position: { x: 200, y: 500 },
      connections: ["checkout", "products"],
      type: "feature"
    },
    {
      id: "checkout",
      name: "结算页面",
      screenshot: "/api/placeholder/200/300",
      position: { x: 350, y: 500 },
      connections: ["payment"],
      type: "feature"
    },
    {
      id: "payment",
      name: "支付页面",
      screenshot: "/api/placeholder/200/300",
      position: { x: 500, y: 500 },
      connections: ["success"],
      type: "feature"
    },
    {
      id: "success",
      name: "支付成功",
      screenshot: "/api/placeholder/200/300",
      position: { x: 350, y: 650 },
      connections: ["main"],
      type: "result"
    },
    {
      id: "profile",
      name: "用户中心",
      screenshot: "/api/placeholder/200/300",
      position: { x: 50, y: 500 },
      connections: ["settings", "orders"],
      type: "feature"
    },
    {
      id: "settings",
      name: "设置页面",
      screenshot: "/api/placeholder/200/300",
      position: { x: 50, y: 650 },
      connections: ["profile"],
      type: "feature"
    },
    {
      id: "orders",
      name: "我的订单",
      screenshot: "/api/placeholder/200/300",
      position: { x: 150, y: 650 },
      connections: ["profile"],
      type: "feature"
    }
  ]

  const getPageTypeColor = (type: string) => {
    const colors = {
      entry: "bg-primary/10 border-primary/30 text-primary",
      auth: "bg-warning/10 border-warning/30 text-warning", 
      main: "bg-success/10 border-success/30 text-success",
      feature: "bg-info/10 border-info/30 text-info",
      result: "bg-secondary/10 border-secondary/30 text-secondary"
    }
    return colors[type as keyof typeof colors] || colors.feature
  }

  const getConnectionPath = (from: typeof pages[0], to: typeof pages[0]) => {
    const fromX = from.position.x + 100  // Center of page card
    const fromY = from.position.y + 150
    const toX = to.position.x + 100
    const toY = to.position.y + 150

    // Create curved path
    const midX = (fromX + toX) / 2
    const midY = (fromY + toY) / 2
    
    return `M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Network className="h-8 w-8 text-primary" />
            应用交互流程图
          </h1>
          <p className="text-muted-foreground mt-2">
            基于AI分析生成的应用页面交互关系图，包含 {pages.length} 个页面
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出图片
          </Button>
          <Button variant="outline" size="sm">
            <ZoomIn className="h-4 w-4 mr-2" />
            全屏查看
          </Button>
          <Button onClick={() => navigate('/projects/mock-project-id')}>
            创建项目
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "入口页面", count: pages.filter(p => p.type === 'entry').length, color: "text-primary" },
          { label: "认证页面", count: pages.filter(p => p.type === 'auth').length, color: "text-warning" },
          { label: "主要页面", count: pages.filter(p => p.type === 'main').length, color: "text-success" },
          { label: "功能页面", count: pages.filter(p => p.type === 'feature').length, color: "text-info" },
          { label: "结果页面", count: pages.filter(p => p.type === 'result').length, color: "text-secondary" }
        ].map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-4">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.count}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Flow Diagram */}
      <Card className="bg-gradient-card border-0 shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            页面流程图
          </CardTitle>
          <CardDescription>
            点击页面查看详细信息，箭头表示页面跳转关系
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative bg-background rounded-lg p-6 min-h-[800px] overflow-auto border">
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {pages.map(page => 
                page.connections.map(connectionId => {
                  const targetPage = pages.find(p => p.id === connectionId)
                  if (!targetPage) return null
                  
                  return (
                    <g key={`${page.id}-${connectionId}`}>
                      <path
                        d={getConnectionPath(page, targetPage)}
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="5,5"
                        opacity="0.6"
                        markerEnd="url(#arrowhead)"
                      />
                    </g>
                  )
                })
              )}
              
              {/* Arrow marker definition */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="hsl(var(--primary))"
                    opacity="0.6"
                  />
                </marker>
              </defs>
            </svg>

            {/* Page cards */}
            {pages.map(page => (
              <div
                key={page.id}
                className="absolute cursor-pointer group"
                style={{ 
                  left: page.position.x, 
                  top: page.position.y,
                  zIndex: selectedPage === page.id ? 10 : 2
                }}
                onClick={() => setSelectedPage(selectedPage === page.id ? null : page.id)}
              >
                <Card className={`w-48 transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                  selectedPage === page.id ? 'ring-2 ring-primary shadow-lg scale-105' : ''
                }`}>
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      {/* Screenshot placeholder */}
                      <div className="w-full h-24 bg-muted rounded-md flex items-center justify-center">
                        <Eye className="h-6 w-6 text-muted-foreground" />
                      </div>
                      
                      {/* Page info */}
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium truncate">{page.name}</h4>
                        <Badge variant="outline" className={`text-xs ${getPageTypeColor(page.type)}`}>
                          {page.type}
                        </Badge>
                      </div>
                      
                      {/* Connections count */}
                      <div className="text-xs text-muted-foreground">
                        {page.connections.length} 个连接
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Page Details */}
      {selectedPage && (
        <Card className="bg-gradient-card border-0 shadow-elevated">
          <CardHeader>
            <CardTitle>页面详情</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const page = pages.find(p => p.id === selectedPage)
              if (!page) return null
              
              const connectedPages = page.connections.map(id => 
                pages.find(p => p.id === id)?.name
              ).filter(Boolean)
              
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{page.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">页面类型:</span>
                        <Badge variant="outline" className={getPageTypeColor(page.type)}>
                          {page.type}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm font-medium">连接页面:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {connectedPages.map((pageName, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {pageName}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">页面截图</h4>
                    <div className="w-32 h-48 bg-muted rounded-lg flex items-center justify-center">
                      <Eye className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  )
}