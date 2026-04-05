import type { Customer } from '@/app/lib/types/customer'
import { storageGet, storageSet } from './storage'

const KEY = 'erp_customers'

const INITIAL: Customer[] = [
  { id: 'CUS-001', name: 'Nguyen Van A', email: 'nguyenvana@example.com', phone: '0901234567', address: 'Hanoi, Vietnam', createdAt: '2026-01-10', updatedAt: '2026-01-10' },
  { id: 'CUS-002', name: 'Tran Thi B', email: 'tranthib@example.com', phone: '0912345678', address: 'Ho Chi Minh City, Vietnam', createdAt: '2026-01-22', updatedAt: '2026-01-22' },
  { id: 'CUS-003', name: 'Le Van C', email: 'levanc@example.com', phone: '0923456789', address: 'Da Nang, Vietnam', createdAt: '2026-02-05', updatedAt: '2026-02-05' },
  { id: 'CUS-004', name: 'Pham Thi D', email: 'phamthid@example.com', phone: '0934567890', address: 'Can Tho, Vietnam', createdAt: '2026-02-18', updatedAt: '2026-02-18' },
  { id: 'CUS-005', name: 'Hoang Van E', email: 'hoangvane@example.com', phone: '0945678901', address: 'Hue, Vietnam', createdAt: '2026-03-01', updatedAt: '2026-03-01' },
  { id: 'CUS-006', name: 'Vu Thi F', email: 'vuthif@example.com', phone: '0956789012', address: 'Hai Phong, Vietnam', createdAt: '2026-03-10', updatedAt: '2026-03-10' },
]

export const mockCustomerRepo = {
  getAll: () => storageGet<Customer>(KEY, INITIAL),
  getById: (id: string) => storageGet<Customer>(KEY, INITIAL).find(c => c.id === id) ?? null,
  save: (customer: Customer) => {
    const all = storageGet<Customer>(KEY, INITIAL)
    const idx = all.findIndex(c => c.id === customer.id)
    if (idx >= 0) all[idx] = customer
    else all.push(customer)
    storageSet(KEY, all)
  },
  remove: (id: string) => storageSet(KEY, storageGet<Customer>(KEY, INITIAL).filter(c => c.id !== id)),
}
