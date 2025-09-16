import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

export default function NewTest() {
  return (
    <div className="p-6">
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            New Test
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Create new test functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}