import { InventoryCatalog } from "@/components/inventory-catalog"
import { InventoryProvider } from "@/context/inventory-context"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.slug)

  return (
    <InventoryProvider>
      <div className="min-h-screen bg-gray-50">
        <InventoryCatalog selectedCategory={category} />
      </div>
    </InventoryProvider>
  )
}
