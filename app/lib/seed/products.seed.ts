import type { Product } from '@/app/lib/types/product'
import { storageGet, storageSet } from './storage'

const KEY = 'erp_products'

const INITIAL: Product[] = [
  { id: 'PRD-001', productName: 'Laptop Dell XPS 13', productType: 'Electronics', price: 25000000, createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'PRD-002', productName: 'Chuột Logitech MX', productType: 'Accessories', price: 1200000, createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'PRD-003', productName: 'Bàn phím Keychron K2', productType: 'Accessories', price: 2500000, createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'PRD-004', productName: 'Màn hình LG 27"', productType: 'Electronics', price: 8500000, createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'PRD-005', productName: 'Tai nghe Sony WH-1000XM5', productType: 'Electronics', price: 7800000, createdAt: '2026-01-01', updatedAt: '2026-01-01' },
]

export const mockProductRepo = {
  getAll: () => storageGet<Product>(KEY, INITIAL),
  getById: (id: string) => storageGet<Product>(KEY, INITIAL).find(p => p.id === id) ?? null,
  save: (product: Product) => {
    const all = storageGet<Product>(KEY, INITIAL)
    const idx = all.findIndex(p => p.id === product.id)
    if (idx >= 0) all[idx] = product
    else all.push(product)
    storageSet(KEY, all)
  },
  remove: (id: string) => storageSet(KEY, storageGet<Product>(KEY, INITIAL).filter(p => p.id !== id)),
}
