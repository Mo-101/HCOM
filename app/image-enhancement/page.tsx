import { ImageEnhancementTips } from "@/components/image-enhancement-utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ImageEnhancementPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">WHO Equipment Image Enhancement</h1>
        <p className="text-gray-600">Guidelines and tools for improving the visual quality of WHO equipment images</p>
      </div>

      <div className="grid gap-6">
        <ImageEnhancementTips />

        <Card>
          <CardHeader>
            <CardTitle>📋 Current Image Issues</CardTitle>
            <CardDescription>Issues identified in the provided WHO equipment images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-red-600">❌ Issues to Fix</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Background removal shadows</li>
                  <li>• Low resolution/pixelation</li>
                  <li>• Inconsistent lighting</li>
                  <li>• Rough edges from cutouts</li>
                  <li>• Color inconsistencies</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-green-600">✅ Target Results</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Clean, seamless backgrounds</li>
                  <li>• HD quality (1920x1080+)</li>
                  <li>• Consistent lighting/shadows</li>
                  <li>• Smooth, anti-aliased edges</li>
                  <li>• Professional appearance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🎯 Specific Equipment Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded">
                <h4 className="font-medium">Boso Medicus Uno (Blood Pressure Monitor)</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Remove harsh shadows, enhance LCD display clarity, improve cable definition
                </p>
              </div>
              <div className="p-3 border rounded">
                <h4 className="font-medium">TESK 2019 Module Boxes</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Clean up packaging shadows, enhance label readability, standardize box angles
                </p>
              </div>
              <div className="p-3 border rounded">
                <h4 className="font-medium">Halyard N95 Respirator Box</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Remove background completely, enhance text clarity, improve box edges
                </p>
              </div>
              <div className="p-3 border rounded">
                <h4 className="font-medium">WHO Cholera Kits</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Standardize lighting, remove plastic wrap reflections, enhance label visibility
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
