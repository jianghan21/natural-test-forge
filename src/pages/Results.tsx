import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export default function Results() {
  return (
    <div className="p-6">
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Test Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Test results and analytics will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}