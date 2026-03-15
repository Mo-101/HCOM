import { erhKits } from "@/lib/erh-kit-mapping"
import { ERHKitCard } from "@/components/erh-kit-card"

export default function ERHKitsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#005A9C] mb-2">Emergency Reproductive Health Kits</h1>
        <p className="text-gray-600">
          UNFPA Emergency Reproductive Health (ERH) Kits are designed to provide essential reproductive health services
          in humanitarian settings. Each kit is color-coded for easy identification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {erhKits.map((kit) => (
          <ERHKitCard key={kit.id} kit={kit} />
        ))}
      </div>
    </div>
  )
}
