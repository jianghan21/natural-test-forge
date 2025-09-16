import { StatCard } from "@/components/StatCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TestTube, 
  Play, 
  Users, 
  Shield, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle 
} from "lucide-react"

export default function Dashboard() {
  const recentTests = [
    {
      id: 1,
      name: "Login Flow Test",
      status: "passed",
      duration: "2m 34s",
      timestamp: "2 hours ago",
      coverage: "94%"
    },
    {
      id: 2,
      name: "Payment Integration",
      status: "failed",
      duration: "1m 12s",
      timestamp: "4 hours ago",
      coverage: "78%"
    },
    {
      id: 3,
      name: "User Registration",
      status: "running",
      duration: "0m 45s",
      timestamp: "Just now",
      coverage: "85%"
    },
    {
      id: 4,
      name: "API Endpoint Tests",
      status: "passed",
      duration: "3m 21s",
      timestamp: "1 day ago",
      coverage: "100%"
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />
      case "running":
        return <Clock className="h-4 w-4 text-warning animate-spin" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      passed: "bg-success/10 text-success border-success/20",
      failed: "bg-destructive/10 text-destructive border-destructive/20",
      running: "bg-warning/10 text-warning border-warning/20"
    }
    
    return (
      <Badge 
        variant="outline" 
        className={variants[status as keyof typeof variants] || ""}
      >
        {status}
      </Badge>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to TestFlow AI</h1>
        <p className="text-white/90 mb-4">
          Transform your testing workflow with natural language AI. Create your first test plan to get started.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
            <Plus className="h-4 w-4 mr-2" />
            Create Test Plan
          </Button>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
            <TestTube className="h-4 w-4 mr-2" />
            New Test Case
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Test Cases"
          value="1,247"
          change="+12% from last month"
          changeType="positive"
          icon={TestTube}
          description="Active test cases in library"
        />
        <StatCard
          title="Test Runs"
          value="8,932"
          change="+23% from last month"
          changeType="positive"
          icon={Play}
          description="Executed this month"
        />
        <StatCard
          title="Team Members"
          value="12"
          change="+2 new members"
          changeType="positive"
          icon={Users}
          description="Active collaborators"
        />
        <StatCard
          title="Coverage Rate"
          value="92.4%"
          change="+5.2% improvement"
          changeType="positive"
          icon={Shield}
          description="Average test coverage"
        />
      </div>

      {/* Recent Test Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Test Results
            </CardTitle>
            <CardDescription>
              Latest test executions and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-3 rounded-lg bg-background border hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <p className="font-medium text-foreground">{test.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {test.duration} • {test.timestamp}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{test.coverage}</span>
                    {getStatusBadge(test.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start hover:bg-accent">
              <TestTube className="h-4 w-4 mr-2" />
              Generate Test from Description
            </Button>
            <Button variant="outline" className="w-full justify-start hover:bg-accent">
              <Play className="h-4 w-4 mr-2" />
              Run All Active Tests
            </Button>
            <Button variant="outline" className="w-full justify-start hover:bg-accent">
              <Shield className="h-4 w-4 mr-2" />
              View Coverage Report
            </Button>
            <Button variant="outline" className="w-full justify-start hover:bg-accent">
              <Users className="h-4 w-4 mr-2" />
              Invite Team Member
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}