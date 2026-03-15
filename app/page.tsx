import { HeaderSlideshow } from "@/components/header-slideshow"
import { CategoryShowcase } from "@/components/category-showcase"
import { FeaturedItems } from "@/components/featured-items"
import { InventoryProvider } from "@/context/inventory-context"

export default function Home() {
  return (
    <InventoryProvider>
      <main className="min-h-screen bg-white w-full dark:bg-gray-900">
        <HeaderSlideshow />
        <CategoryShowcase />
        <FeaturedItems />
      </main>
    </InventoryProvider>
  )
}
