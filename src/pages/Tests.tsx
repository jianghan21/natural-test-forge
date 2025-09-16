import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TestTube } from "lucide-react"

export default function Tests() {
  return (
    <div className="p-6">
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-primary" />
            Test Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Test case library and management will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}