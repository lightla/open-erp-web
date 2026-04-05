import type { Order } from '@/app/lib/types/order'
import { storageGet, storageSet } from './storage'

const KEY = 'erp_orders'

const INITIAL: Order[] = [
  { id: 'ORD-001', customerId: 'CUS-001', customerName: 'Nguyen Van A', status: 'completed', totalAmount: 26200000, items: [{ id: 'OI-001', productId: 'PRD-001', productName: 'Laptop Dell XPS 13', quantity: 1, unitPrice: 25000000, totalAmount: 25000000 }, { id: 'OI-002', productId: 'PRD-002', productName: 'Chuột Logitech MX', quantity: 1, unitPrice: 1200000, totalAmount: 1200000 }], createdAt: '2026-04-04', updatedAt: '2026-04-04' },
  { id: 'ORD-002', customerId: 'CUS-002', customerName: 'Tran Thi B', status: 'pending', totalAmount: 2500000, items: [{ id: 'OI-003', productId: 'PRD-003', productName: 'Bàn phím Keychron K2', quantity: 1, unitPrice: 2500000, totalAmount: 2500000 }], createdAt: '2026-04-04', updatedAt: '2026-04-04' },
  { id: 'ORD-003', customerId: 'CUS-003', customerName: 'Le Van C', status: 'completed', totalAmount: 16300000, items: [{ id: 'OI-004', productId: 'PRD-004', productName: 'Màn hình LG 27"', quantity: 1, unitPrice: 8500000, totalAmount: 8500000 }, { id: 'OI-005', productId: 'PRD-005', productName: 'Tai nghe Sony WH-1000XM5', quantity: 1, unitPrice: 7800000, totalAmount: 7800000 }], createdAt: '2026-04-03', updatedAt: '2026-04-03' },
  { id: 'ORD-004', customerId: 'CUS-004', customerName: 'Pham Thi D', status: 'cancelled', totalAmount: 2400000, items: [{ id: 'OI-006', productId: 'PRD-002', productName: 'Chuột Logitech MX', quantity: 2, unitPrice: 1200000, totalAmount: 2400000 }], createdAt: '2026-04-03', updatedAt: '2026-04-03' },
  { id: 'ORD-005', customerId: 'CUS-005', customerName: 'Hoang Van E', status: 'pending', totalAmount: 10300000, items: [{ id: 'OI-007', productId: 'PRD-003', productName: 'Bàn phím Keychron K2', quantity: 1, unitPrice: 2500000, totalAmount: 2500000 }, { id: 'OI-008', productId: 'PRD-005', productName: 'Tai nghe Sony WH-1000XM5', quantity: 1, unitPrice: 7800000, totalAmount: 7800000 }], createdAt: '2026-04-02', updatedAt: '2026-04-02' },
  { id: 'ORD-006', customerId: 'CUS-006', customerName: 'Vu Thi F', status: 'completed', totalAmount: 8500000, items: [{ id: 'OI-009', productId: 'PRD-004', productName: 'Màn hình LG 27"', quantity: 1, unitPrice: 8500000, totalAmount: 8500000 }], createdAt: '2026-04-01', updatedAt: '2026-04-01' },
  { id: 'ORD-007', customerId: 'CUS-001', customerName: 'Nguyen Van A', status: 'pending', totalAmount: 1200000, items: [{ id: 'OI-010', productId: 'PRD-002', productName: 'Chuột Logitech MX', quantity: 1, unitPrice: 1200000, totalAmount: 1200000 }], createdAt: '2026-03-31', updatedAt: '2026-03-31' },
]

export const mockOrderRepo = {
  getAll: () => storageGet<Order>(KEY, INITIAL),
  getById: (id: string) => storageGet<Order>(KEY, INITIAL).find(o => o.id === id) ?? null,
  save: (order: Order) => {
    const all = storageGet<Order>(KEY, INITIAL)
    const idx = all.findIndex(o => o.id === order.id)
    if (idx >= 0) all[idx] = order
    else all.push(order)
    storageSet(KEY, all)
  },
  remove: (id: string) => storageSet(KEY, storageGet<Order>(KEY, INITIAL).filter(o => o.id !== id)),
}
