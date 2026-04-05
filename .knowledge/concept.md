# Open ERP — UI Concept & Technology Stack

> Tài liệu này định nghĩa triết lý thiết kế và các công nghệ cần tận dụng.
> Mục tiêu: **không tự làm những gì thư viện đã làm tốt**.

---

## Triết lý cốt lõi

### 1. Dùng thư viện, không tự build component
Mọi UI primitive (sidebar, table, form, toast, dialog, sheet...) đều có thư viện chất lượng cao.
Tự viết HTML/CSS thủ công cho những thứ này là lãng phí và dễ bug.

### 2. Tham khảo ERP hiện đại
Các sản phẩm như **Linear**, **Notion**, **Vercel Dashboard**, **Retool** đang set standard:
- Sidebar collapsible, icon-only mode khi thu nhỏ
- Data table với sort/filter/pagination built-in
- Command palette (Cmd+K) để navigate nhanh
- Toast notification nhẹ, không chặn UI
- Sheet/Drawer cho form tạo mới thay vì navigate sang trang khác

### 3. Tránh position thủ công
Không dùng `absolute`, `fixed`, `z-index` tự tính toán cho layout.
Dùng layout primitives của thư viện — chúng đã handle responsive, accessibility, focus trap.

---

## Stack UI chính thức

### Layout & Navigation

| Thứ cần làm | Dùng gì | Không tự làm |
|---|---|---|
| Sidebar collapsible | `shadcn/ui Sidebar` (`SidebarProvider`, `Sidebar`, `SidebarContent`) | ~~CSS position + localStorage toggle thủ công~~ |
| Mobile sidebar overlay | `shadcn/ui Sheet` | ~~fixed overlay + z-index thủ công~~ |
| Breadcrumb | `shadcn/ui Breadcrumb` | ~~tự render array~~ |

**shadcn Sidebar** có sẵn: collapsible icon-only, mobile Sheet, keyboard shortcut, cookie persistence.
```bash
npx shadcn@latest add sidebar
```

---

### Data Table

| Thứ cần làm | Dùng gì |
|---|---|
| Bảng dữ liệu | `shadcn/ui DataTable` + `@tanstack/react-table` |
| Sort, filter, pagination | Built-in trong TanStack Table |
| Column visibility toggle | Built-in |
| Row selection | Built-in |

TanStack Table là engine, shadcn DataTable là UI layer. Đây là combo chuẩn của Linear, Notion.
```bash
pnpm add @tanstack/react-table
npx shadcn@latest add table
```

---

### Forms

| Thứ cần làm | Dùng gì |
|---|---|
| Form state + validation | `react-hook-form` + `zod` + `@hookform/resolvers` |
| Form UI components | `shadcn/ui Form` (wrapper của RHF) |
| Select, Combobox | `shadcn/ui Select`, `shadcn/ui Combobox` |
| Date picker | `shadcn/ui Calendar` + `react-day-picker` |

Đã có sẵn trong project. Không dùng `useState` để quản lý form.

---

### Notifications & Feedback

| Thứ cần làm | Dùng gì |
|---|---|
| Toast (success/error/loading) | `sonner` (tích hợp qua `shadcn/ui Sonner`) |
| Loading state | `shadcn/ui Skeleton` |
| Empty state | Custom component nhẹ (chỉ icon + text) |
| Confirm dialog | `shadcn/ui AlertDialog` |

```bash
pnpm add sonner
npx shadcn@latest add sonner skeleton alert-dialog
```

---

### URL State (Search, Filter, Pagination)

Dùng **`nuqs`** để sync state với URL query params.
Lợi ích: shareable URL, browser back/forward hoạt động đúng, không mất filter khi refresh.

```bash
pnpm add nuqs
```

```ts
// Thay vì useState
const [search, setSearch] = useState('')

// Dùng nuqs
const [search, setSearch] = useQueryState('q')
```

---

### Dialog / Sheet cho CRUD

Thay vì navigate sang `/orders/create` (mất context), dùng:
- **Sheet** (slide-in panel) cho form tạo/edit — giữ nguyên list phía sau
- **Dialog** cho confirm delete

```bash
npx shadcn@latest add sheet dialog
```

---

### Command Palette (optional, Phase 7+)

`shadcn/ui Command` — navigate nhanh giữa các module, search global.
```bash
npx shadcn@latest add command
```

---

## Packages cần cài (tổng hợp)

```bash
# Core UI additions
npx shadcn@latest add sidebar data-table sheet dialog alert-dialog sonner skeleton command

# npm packages
pnpm add @tanstack/react-table nuqs sonner
```

---

## Quy tắc khi code UI

1. **Sidebar** → dùng `SidebarProvider` + `Sidebar` của shadcn, không tự viết
2. **Table** → dùng `useReactTable` + shadcn `DataTable`, không tự render `<tr><td>`
3. **Form** → dùng shadcn `Form` + `useForm` + `zodResolver`, không dùng `useState` cho input
4. **Toast** → gọi `toast.success()` / `toast.error()` từ sonner, không tự render notification
5. **Modal/Sheet** → dùng shadcn `Dialog` / `Sheet`, không tự làm overlay
6. **URL state** → dùng `nuqs` cho search/filter/page, không dùng `useState` cho những thứ cần share qua URL
7. **Loading** → dùng shadcn `Skeleton`, không tự viết spinner CSS

---

## Tham khảo thiết kế

- [Linear](https://linear.app) — sidebar, issue list, keyboard-first
- [Vercel Dashboard](https://vercel.com/dashboard) — data table, clean header
- [shadcn/ui blocks](https://ui.shadcn.com/blocks) — dashboard layouts có sẵn
- [shadcn Sidebar docs](https://ui.shadcn.com/docs/components/sidebar)
- [TanStack Table docs](https://tanstack.com/table/latest)
