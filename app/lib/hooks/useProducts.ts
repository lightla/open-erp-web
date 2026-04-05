'use client'
import { useState, useEffect, useCallback } from 'react'
import type { Product } from '@/app/lib/types/product'
import { MOCK_FLAGS } from '@/app/lib/config/mock.config'
import { mockProductRepo } from '@/app/lib/seed/products.seed'
import { mapBEProduct } from '@/app/lib/mappers/product.mapper'
import { productControllerFindAll, productControllerCreate, productControllerRemove } from '@/app/lib/api/generated/product/product'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      if (MOCK_FLAGS.products) {
        setProducts(mockProductRepo.getAll())
      } else {
        const res = await productControllerFindAll()
        setProducts(((res.data as unknown) as any[]).map(mapBEProduct))
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const create = async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (MOCK_FLAGS.products) {
      const newProduct: Product = { ...data, id: `PRD-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      mockProductRepo.save(newProduct)
      await load()
    } else {
      await productControllerCreate(data as any)
      await load()
    }
  }

  const remove = async (id: string) => {
    if (MOCK_FLAGS.products) {
      mockProductRepo.remove(id)
      await load()
    } else {
      await productControllerRemove(id)
      await load()
    }
  }

  return { products, loading, reload: load, create, remove }
}
