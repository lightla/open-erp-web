import type { Customer } from '@/app/lib/types/customer'

export function mapBECustomer(raw: any): Customer {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    phone: raw.phone ?? null,
    address: raw.address ?? null,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  }
}
