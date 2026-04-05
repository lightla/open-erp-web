import type { Order, OrderItem, OrderStatus } from '@/app/lib/types/order'

export function mapBEOrderItem(raw: any): OrderItem {
  return {
    id: raw.id,
    productId: raw.productId,
    productName: raw.product?.productName ?? raw.productName ?? '',
    quantity: raw.quantity,
    unitPrice: raw.unitPrice,
    totalAmount: raw.totalAmount,
  }
}

export function mapBEOrder(raw: any): Order {
  return {
    id: raw.id,
    customerId: raw.customerId ?? null,
    customerName: raw.customerName ?? raw.customer?.name ?? '',
    status: (raw.status ?? 'pending') as OrderStatus,
    totalAmount: raw.totalAmount ?? 0,
    items: (raw.products ?? raw.orderItems ?? []).map(mapBEOrderItem),
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  }
}
