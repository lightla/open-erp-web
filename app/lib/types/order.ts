export type OrderStatus = 'pending' | 'completed' | 'cancelled'

export type OrderItem = {
  id: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  totalAmount: number
}

export type Order = {
  id: string
  customerId: string | null
  customerName: string
  status: OrderStatus
  totalAmount: number
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}
