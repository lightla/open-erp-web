export const MOCK_FLAGS = {
  orders:    process.env.NEXT_PUBLIC_MOCK_ORDERS    !== 'false',
  customers: process.env.NEXT_PUBLIC_MOCK_CUSTOMERS !== 'false',
  products:  process.env.NEXT_PUBLIC_MOCK_PRODUCTS  !== 'false',
  auth:      process.env.NEXT_PUBLIC_MOCK_AUTH      !== 'false',
} as const
