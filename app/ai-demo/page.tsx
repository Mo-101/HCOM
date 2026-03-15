import { AIDemoComponent } from "@/components/ai-demo"
import { AILearningAssistant } from "@/components/ai-learning-assistant"

export default function AIDemoPage() {
  // Sample equipment for demonstration
  const sampleEquipment = {
    name: "Oxygen Concentrator",
    category: "Biomedical Equipment",
    description: "Portable oxygen concentrator for emergency medical care",
    specifications: {
      flow_rate: "0.5-5 L/min",
      oxygen_concentration: "93% ± 3%",
      power: "AC 110-240V, DC 12V",
      weight: "2.3 kg",
    },
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Assistant Demo - WHO Emergency Equipment</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Experience how our AI-powered learning assistant provides expert guidance on WHO emergency response equipment
          usage, maintenance, and emergency protocols.
        </p>
      </div>

      {/* Demo Component */}
      <AIDemoComponent />

      {/* Interactive AI Assistant */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Try the Interactive AI Assistant</h2>
        <AILearningAssistant
          selectedItem={sampleEquipment}
          accessibilitySettings={{
            signLanguage: false,
            highContrast: false,
            fontSize: "medium",
          }}
        />
      </div>
    </div>
  )
}
