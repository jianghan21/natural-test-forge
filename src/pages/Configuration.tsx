import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cog } from "lucide-react"

export default function Configuration() {
  return (
    <div className="p-6">
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cog className="h-5 w-5 text-primary" />
            Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">System configuration and integration settings will be available here.</p>
        </CardContent>
      </Card>
    </div>
  )
}