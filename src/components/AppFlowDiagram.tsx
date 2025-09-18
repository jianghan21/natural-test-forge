import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ZoomIn, Download, Maximize } from 'lucide-react';

interface NodeData {
  title: string;
  identifier: string;
  icon: string;
  description: string;
  type: string;
}

// Custom Node Component
const AppPageNode = ({ data }: { data: NodeData }) => {
  return (
    <div className="bg-background border border-border rounded-lg shadow-lg min-w-[200px] max-w-[240px]">
      <Handle type="target" position={Position.Top} className="!bg-primary" />
      
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{data.icon}</span>
          <div>
            <h3 className="font-semibold text-sm">{data.title}</h3>
            <p className="text-xs text-muted-foreground">{data.identifier}</p>
          </div>
        </div>
        
        {/* Screenshot placeholder */}
        <div className="w-full h-24 bg-muted rounded border-2 border-dashed border-muted-foreground/20 flex items-center justify-center mb-2">
          <span className="text-xs text-muted-foreground">页面预览</span>
        </div>
        
        <p className="text-xs text-muted-foreground text-center">{data.description}</p>
        
        {data.type && (
          <Badge variant="secondary" className="mt-2 text-xs">
            {data.type}
          </Badge>
        )}
      </div>
      
      <Handle type="source" position={Position.Bottom} className="!bg-primary" />
    </div>
  );
};

const nodeTypes = {
  appPage: AppPageNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'appPage',
    position: { x: 250, y: 50 },
    data: {
      title: '启动页',
      identifier: 'splash',
      icon: '🚀',
      description: '应用启动时的欢迎页面',
      type: 'splash'
    },
  },
  {
    id: '2',
    type: 'appPage',
    position: { x: 50, y: 250 },
    data: {
      title: '登录页',
      identifier: 'form',
      icon: '🔐',
      description: '用户登录界面',
      type: 'form'
    },
  },
  {
    id: '3',
    type: 'appPage',
    position: { x: 450, y: 250 },
    data: {
      title: '注册页',
      identifier: 'form',
      icon: '📝',
      description: '新用户注册界面',
      type: 'form'
    },
  },
  {
    id: '4',
    type: 'appPage',
    position: { x: 250, y: 450 },
    data: {
      title: '首页',
      identifier: 'home',
      icon: '🏠',
      description: '应用主页面',
      type: 'home'
    },
  },
  {
    id: '5',
    type: 'appPage',
    position: { x: 50, y: 650 },
    data: {
      title: '个人中心',
      identifier: 'profile',
      icon: '👤',
      description: '用户个人信息页面',
      type: 'profile'
    },
  },
  {
    id: '6',
    type: 'appPage',
    position: { x: 450, y: 650 },
    data: {
      title: '商品详情页',
      identifier: 'detail',
      icon: '📦',
      description: '商品详细信息页面',
      type: 'detail'
    },
  },
  {
    id: '7',
    type: 'appPage',
    position: { x: 250, y: 850 },
    data: {
      title: '购物车',
      identifier: 'cart',
      icon: '🛒',
      description: '购物车页面',
      type: 'cart'
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    label: '进入应用',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--primary))' },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    label: '注册新用户',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--primary))' },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    label: '登录成功',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--primary))' },
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    label: '注册成功',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--primary))' },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    label: '返回首页',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--primary))' },
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    label: '点击商品',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--primary))' },
  },
  {
    id: 'e4-7',
    source: '4',
    target: '7',
    label: '继续购物',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--primary))' },
  },
  {
    id: 'e6-7',
    source: '6',
    target: '7',
    label: '加入购物车',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--primary))' },
  },
];

interface AppFlowDiagramProps {
  onNext: () => void;
}

export const AppFlowDiagram: React.FC<AppFlowDiagramProps> = ({ onNext }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">AI学习结果 - App页面流程图</h2>
            <p className="text-muted-foreground mt-1">
              智能分析发现了 {nodes.length} 个页面，{edges.length} 个页面跳转关系
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出图片
            </Button>
            <Button variant="outline" size="sm">
              <Maximize className="h-4 w-4 mr-2" />
              全屏查看
            </Button>
          </div>
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-background"
        >
          <Controls className="bg-background border border-border" />
          <MiniMap 
            className="bg-background border border-border"
            nodeColor={(node) => {
              const data = node.data as any;
              switch (data?.type) {
                case 'splash': return 'hsl(var(--primary))';
                case 'form': return 'hsl(var(--secondary))';
                case 'home': return 'hsl(var(--accent))';
                case 'profile': return 'hsl(var(--muted))';
                case 'detail': return 'hsl(var(--chart-1))';
                case 'cart': return 'hsl(var(--chart-2))';
                default: return 'hsl(var(--muted-foreground))';
              }
            }}
          />
          <Background />
        </ReactFlow>

        {/* Selected Node Details */}
        {selectedNode && (
          <Card className="absolute top-4 right-4 w-80 bg-background/95 backdrop-blur-sm border shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">{(selectedNode.data as any)?.icon}</span>
                {(selectedNode.data as any)?.title}
                <Badge variant="outline" className="ml-auto">
                  {(selectedNode.data as any)?.identifier}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                {(selectedNode.data as any)?.description}
              </p>
              <div className="space-y-2">
                <div className="text-xs">
                  <span className="font-medium">页面类型:</span> {(selectedNode.data as any)?.type}
                </div>
                <div className="text-xs">
                  <span className="font-medium">页面ID:</span> {selectedNode.id}
                </div>
              </div>
              <Button 
                size="sm" 
                className="w-full mt-3"
                onClick={() => setSelectedNode(null)}
              >
                <ZoomIn className="h-4 w-4 mr-2" />
                查看详情
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex-shrink-0 p-6 border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            点击节点查看详情，拖拽可调整布局位置
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              重新分析
            </Button>
            <Button onClick={() => window.location.href = '/tests'} className="bg-gradient-to-r from-primary to-blue-500">
              确认结果，进入测试用例界面
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};