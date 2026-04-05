'use client'
import { useState, useEffect, useCallback } from 'react'
import type { Order } from '@/app/lib/types/order'
import { MOCK_FLAGS } from '@/app/lib/config/mock.config'
import { mockOrderRepo } from '@/app/lib/seed/orders.seed'
import { mapBEOrder } from '@/app/lib/mappers/order.mapper'
import { orderControllerFindAll, orderControllerCreate, orderControllerUpdate, orderControllerDelete } from '@/app/lib/api/generated/order/order'

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      if (MOCK_FLAGS.orders) {
        setOrders(mockOrderRepo.getAll())
      } else {
        const res = await orderControllerFindAll()
        setOrders(((res.data as unknown) as any[]).map(mapBEOrder))
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const create = async (data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (MOCK_FLAGS.orders) {
      const newOrder: Order = { ...data, id: `ORD-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      mockOrderRepo.save(newOrder)
      await load()
    } else {
      await orderControllerCreate(data as any)
      await load()
    }
  }

  const update = async (id: string, data: Partial<Order>) => {
    if (MOCK_FLAGS.orders) {
      const existing = mockOrderRepo.getById(id)
      if (existing) mockOrderRepo.save({ ...existing, ...data, updatedAt: new Date().toISOString() })
      await load()
    } else {
      await orderControllerUpdate(id, data as any)
      await load()
    }
  }

  const remove = async (id: string) => {
    if (MOCK_FLAGS.orders) {
      mockOrderRepo.remove(id)
      await load()
    } else {
      await orderControllerDelete(id)
      await load()
    }
  }

  return { orders, loading, reload: load, create, update, remove }
}
