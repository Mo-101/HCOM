import { KnowledgeHub } from "@/components/knowledge-hub"
import { InventoryProvider } from "@/context/inventory-context"

export default function KnowledgePage() {
  return (
    <InventoryProvider>
      <KnowledgeHub />
    </InventoryProvider>
  )
}
