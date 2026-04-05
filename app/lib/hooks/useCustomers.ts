'use client'
import { useState, useEffect, useCallback } from 'react'
import type { Customer } from '@/app/lib/types/customer'
import { MOCK_FLAGS } from '@/app/lib/config/mock.config'
import { mockCustomerRepo } from '@/app/lib/seed/customers.seed'
import { mapBECustomer } from '@/app/lib/mappers/customer.mapper'
import { customerControllerFindAll, customerControllerCreate, customerControllerRemove } from '@/app/lib/api/generated/customer/customer'

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      if (MOCK_FLAGS.customers) {
        setCustomers(mockCustomerRepo.getAll())
      } else {
        const res = await customerControllerFindAll()
        setCustomers(((res.data as unknown) as any[]).map(mapBECustomer))
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const create = async (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (MOCK_FLAGS.customers) {
      const newCustomer: Customer = { ...data, id: `CUS-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      mockCustomerRepo.save(newCustomer)
      await load()
    } else {
      await customerControllerCreate(data as any)
      await load()
    }
  }

  const remove = async (id: string) => {
    if (MOCK_FLAGS.customers) {
      mockCustomerRepo.remove(id)
      await load()
    } else {
      await customerControllerRemove(id)
      await load()
    }
  }

  return { customers, loading, reload: load, create, remove }
}
