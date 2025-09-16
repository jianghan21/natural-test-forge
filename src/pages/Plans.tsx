import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export default function Plans() {
  return (
    <div className="p-6">
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Test Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Test plan management interface will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}