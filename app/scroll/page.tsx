import { CategoryScrollShowcase } from "@/components/category-scroll-showcase"
import { InventoryProvider } from "@/context/inventory-context"
import { LoadingScreen } from "@/components/loading-screen"

export default function ScrollPage() {
  return (
    <main className="min-h-screen relative">
      <div className="relative z-10">
        <InventoryProvider>
          <LoadingScreen />
          <CategoryScrollShowcase />
        </InventoryProvider>
      </div>
    </main>
  )
}
