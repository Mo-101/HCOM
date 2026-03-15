import { ChatbotDemoConversation } from "@/components/chatbot-demo-conversation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Users, Clock, Brain } from "lucide-react"

export default function EmergencyProtocolsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">WHO Emergency Response Protocols</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore how the WHO AI Assistant provides expert guidance on emergency response procedures, equipment
          deployment, and coordination protocols.
        </p>
        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
          <Brain className="h-4 w-4 mr-2" />
          AI-Powered Emergency Expertise
        </Badge>
      </div>

      <ChatbotDemoConversation />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-4 w-4" />
              Immediate Response
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-red-600">
            <div className="space-y-2">
              <div>• 0-24 hour protocols</div>
              <div>• Verification & assessment</div>
              <div>• IHR notification</div>
              <div>• Emergency activation</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-blue-700">
              <Shield className="h-4 w-4" />
              Equipment Deployment
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-600">
            <div className="space-y-2">
              <div>• Medical supply kits</div>
              <div>• Diagnostic equipment</div>
              <div>• PPE & safety gear</div>
              <div>• Field infrastructure</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-green-700">
              <Users className="h-4 w-4" />
              Coordination
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-green-600">
            <div className="space-y-2">
              <div>• Local partnerships</div>
              <div>• Joint operations</div>
              <div>• Resource sharing</div>
              <div>• Capacity building</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-purple-700">
              <Clock className="h-4 w-4" />
              Timeline Management
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-purple-600">
            <div className="space-y-2">
              <div>• 0-24 hours: Immediate</div>
              <div>• 24-72 hours: Rapid</div>
              <div>• 72+ hours: Sustained</div>
              <div>• Continuous monitoring</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
