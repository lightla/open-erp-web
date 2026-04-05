import type { Product } from '@/app/lib/types/product'

export function mapBEProduct(raw: any): Product {
  return {
    id: raw.id,
    productName: raw.productName,
    productType: raw.productType,
    price: raw.price ?? 0,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  }
}
