# Open ERP — Web UI Implementation Plan

## Nguyên tắc kiến trúc (từ ui.md)

FE và BE phát triển **độc lập**. FE hoạt động hoàn toàn offline bằng seed data từ LocalStorage.

### Quy tắc bất di bất dịch
> **Khi thêm BE vào, không sửa code FE. Chỉ sửa ở phần mapping.**

UI và hook chỉ làm việc với **FE Model** — không bao giờ dùng trực tiếp BE DTO hay raw API response.

```
BE Response (raw DTO từ orval)
    ↓
[Mapper] ← chỗ DUY NHẤT biết về BE schema
    ↓        (sửa ở đây khi BE thay đổi)
FE Model  ← chuẩn, bất biến, UI không bao giờ thấy BE
    ↓
Hook      ← đọc MOCK_FLAGS, quyết định mock hay real API
    ↓
UI / Page ← chỉ nhận FE Model, không quan tâm nguồn
```

---

## Mock Flag — Switchable per API

Mỗi API resource có flag riêng. BE xong cái nào → flip flag cái đó, không đụng code FE.

### `web/app/lib/config/mock.config.ts`
```ts
export const MOCK_FLAGS = {
  orders:    process.env.NEXT_PUBLIC_MOCK_ORDERS    === 'true',
  customers: process.env.NEXT_PUBLIC_MOCK_CUSTOMERS === 'true',
  products:  process.env.NEXT_PUBLIC_MOCK_PRODUCTS  === 'true',
  auth:      process.env.NEXT_PUBLIC_MOCK_AUTH      === 'true',
} as const
```

### `web/.env.local` (mặc định — chưa có BE)
```env
NEXT_PUBLIC_MOCK_ORDERS=true
NEXT_PUBLIC_MOCK_CUSTOMERS=true
NEXT_PUBLIC_MOCK_PRODUCTS=true
NEXT_PUBLIC_MOCK_AUTH=true
```

Khi BE orders xong → chỉ đổi `NEXT_PUBLIC_MOCK_ORDERS=false`, không sửa một dòng code nào.

---

## Cấu trúc Layer

```
lib/
├── config/
│   └── mock.config.ts        — MOCK_FLAGS per resource
├── types/                    — FE Models (Order, Customer, Product)
├── mappers/                  — BE DTO → FE Model (chỗ duy nhất biết BE)
├── seed/                     — Mock data theo FE Model
└── hooks/                    — useOrders, useCustomers, useProducts
```

### Pattern bên trong mỗi hook

```ts
// useOrders.ts
import { MOCK_FLAGS } from '@/app/lib/config/mock.config'
import { mockOrderRepo } from '@/app/lib/seed/orders.seed'
import { orderControllerFindAll } from '@/app/lib/api/generated/order/order'
import { mapBEOrder } from '@/app/lib/mappers/order.mapper'

export function useOrders() {
  const getAll = async (): Promise<Order[]> => {
    if (MOCK_FLAGS.orders) {
      return mockOrderRepo.getAll()          // LocalStorage
    }
    const res = await orderControllerFindAll()
    return (res.data as any[]).map(mapBEOrder) // mapper → FE Model
  }

  // create, update, delete tương tự
  return { getAll, ... }
}
```

---

## Phase 1 — Foundation

### 1.1 FE Types — `web/app/lib/types/`

```ts
// order.ts
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
```

```ts
// customer.ts
export type Customer = {
  id: string
  name: string
  email: string
  phone: string | null
  address: string | null
  createdAt: string
  updatedAt: string
}
```

```ts
// product.ts
export type Product = {
  id: string
  productName: string
  productType: string
  price: number
  createdAt: string
  updatedAt: string
}
```

### 1.2 Mappers — `web/app/lib/mappers/`

```ts
// order.mapper.ts — sửa ở đây khi BE đổi field
export function mapBEOrder(raw: any): Order {
  return {
    id:           raw.id,
    customerId:   raw.customerId ?? null,
    customerName: raw.customerName,
    status:       raw.status as OrderStatus,
    totalAmount:  raw.totalAmount,
    items:        (raw.products ?? []).map(mapBEOrderItem),
    createdAt:    raw.createdAt,
    updatedAt:    raw.updatedAt,
  }
}
```

### 1.3 Seed Data — `web/app/lib/seed/`

Seed data theo FE Model (không phải BE DTO). Lưu vào LocalStorage, có helper `getAll / save / findById / remove`.

### 1.4 Mock Config — `web/app/lib/config/mock.config.ts`

Như mô tả ở trên.

### 1.5 Hooks — `web/app/lib/hooks/`

```
useOrders.ts      → getAll, getById, create, update, remove
useCustomers.ts   → getAll, getById, create, update, remove
useProducts.ts    → getAll, getById, create, update, remove
```

---

## Phase 2 — Orders Module

### 2.1 Orders List (`/orders`)
- [x] Bảng UI với status badge
- [ ] Kết nối `useOrders.getAll()`
- [ ] Search client-side (customer name / order ID)
- [ ] Filter theo status
- [ ] Pagination client-side

### 2.2 Create Order (`/orders/create`)
- [ ] Chọn customer (dropdown từ `useCustomers`)
- [ ] Thêm sản phẩm dynamic (từ `useProducts`)
- [ ] Tự tính `totalAmount`
- [ ] Submit → `useOrders.create()`

### 2.3 Order Detail (`/orders/[id]`)
- [ ] Fetch bằng `useOrders.getById(id)`
- [ ] Hiển thị danh sách sản phẩm trong đơn
- [ ] Đổi status → `useOrders.update()`
- [ ] Xoá đơn → `useOrders.remove()`

---

## Phase 3 — Customers Module

### 3.1 Customers List (`/customers`)
- [x] Bảng UI với avatar initials
- [ ] Kết nối `useCustomers.getAll()`
- [ ] Search theo tên / email

### 3.2 Create Customer
- [ ] Form: name, email, phone, address
- [ ] Submit → `useCustomers.create()`

### 3.3 Customer Detail (`/customers/[id]`)
- [ ] Profile info
- [ ] Lịch sử orders của customer (filter từ `useOrders`)

---

## Phase 4 — Home Dashboard

- [ ] Stats cards kết nối `useOrders` + `useCustomers` (tính toán thật)
- [ ] Recent orders table kết nối `useOrders.getAll()` lấy 5 mới nhất

---

## Phase 5 — Products Module

### 5.1 Products List (`/products`)
- [ ] Bảng: tên, loại, giá
- [ ] Kết nối `useProducts.getAll()`
- [ ] CRUD cơ bản

> Cần xong trước Phase 2.2 vì form tạo Order cần chọn product.

---

## Phase 6 — Account & Auth

- [ ] Kết nối next-auth session → hiển thị user thật trên `/account`
- [ ] Sign Out hoạt động
- [ ] Kiểm tra login flow → redirect `/home`

---

## Phase 7 — UX Polish

- [ ] Toast notifications (`sonner`) cho mọi action
- [ ] Loading skeleton
- [ ] Empty state
- [ ] Error state khi API lỗi

---

## Thứ tự thực hiện

```
Phase 1 (bắt buộc xong trước)
    ↓
Phase 5 (Products hook — cần cho Phase 2.2)
    ↓
Phase 2 + Phase 3 (song song)
    ↓
Phase 4 → Phase 6 → Phase 7
```

---

## Packages cần cài

```bash
pnpm add sonner zustand
```

---

## Cấu trúc thư mục mục tiêu

```
web/app/
├── (erp)/
│   ├── home/page.tsx              ✅ UI done  ⬜ hook
│   ├── orders/
│   │   ├── page.tsx               ✅ UI done  ⬜ hook
│   │   ├── create/page.tsx        ⬜ todo
│   │   └── [id]/page.tsx          ⬜ todo
│   ├── customers/
│   │   ├── page.tsx               ✅ UI done  ⬜ hook
│   │   ├── create/page.tsx        ⬜ todo
│   │   └── [id]/page.tsx          ⬜ todo
│   ├── products/
│   │   └── page.tsx               ⬜ todo
│   └── account/page.tsx           ✅ UI done  ⬜ session
└── lib/
    ├── config/
    │   └── mock.config.ts         ⬜ Phase 1.4
    ├── types/
    │   ├── order.ts               ⬜ Phase 1.1
    │   ├── customer.ts            ⬜ Phase 1.1
    │   └── product.ts             ⬜ Phase 1.1
    ├── mappers/
    │   ├── order.mapper.ts        ⬜ Phase 1.2
    │   ├── customer.mapper.ts     ⬜ Phase 1.2
    │   └── product.mapper.ts      ⬜ Phase 1.2
    ├── seed/
    │   ├── orders.seed.ts         ⬜ Phase 1.3
    │   ├── customers.seed.ts      ⬜ Phase 1.3
    │   └── products.seed.ts       ⬜ Phase 1.3
    └── hooks/
        ├── useOrders.ts           ⬜ Phase 1.5
        ├── useCustomers.ts        ⬜ Phase 1.5
        └── useProducts.ts         ⬜ Phase 1.5
```
