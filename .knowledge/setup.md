# 🛠 Setup dự án Open ERP - Web (Next.js)

## Danh sách Tools đã cài / chưa cài

### ✅ ĐÃ CÓ
- 🏗️ Framework & Core: Next.js, React, TypeScript
- 📋 Form & Validation: React Hook Form, Zod, @hookform/resolvers
- 🎨 UI Components: Radix UI, Lucide React, CVA (class-variance-authority), Shadcn, Heroicons
- 🎭 Styling: Tailwind CSS, tailwind-merge, tailwindcss-animate, tw-animate-css, @tailwindcss/forms
- 🔐 Auth: next-auth (v5 beta)
- 🗄️ Database: postgres (postgres.js)
- 🔧 Utilities: use-debounce, clsx, bcrypt
- 📡 API Generation: orval (devDependency)

### ❌ CHƯA CÓ - Cần cài thêm nếu muốn dùng

```bash
# 🌐 API & Data Fetching
pnpm add @tanstack/react-query axios
# Nếu dùng GraphQL:
pnpm add @apollo/client graphql

# ☁️ AWS (Nếu cần)
pnpm add aws-amplify @aws-amplify/ui-react

# 🗃️ State Management
pnpm add zustand nuqs

# 🎭 Theme (Dark mode)
pnpm add next-themes

# 📅 Date & Time
pnpm add dayjs
# hoặc:
pnpm add date-fns react-day-picker

# 📁 File & Upload
pnpm add react-dropzone jszip

# 🔧 Utilities
pnpm add jwt-decode sonner

# ✏️ Rich Text Editor
pnpm add react-quill-new
# hoặc:
pnpm add @uiw/react-md-editor

# 🖱️ Drag & Drop
pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# 🧪 Dev & Testing
pnpm add -D storybook jest @biomejs/biome husky

# 📡 API Generation (thay thế orval nếu muốn)
pnpm add -D @hey-api/openapi-ts
```

## Gợi ý cài theo từng giai đoạn

### Giai đoạn 1 - MVP (Cài ngay)
```bash
pnpm add @tanstack/react-query axios zustand next-themes sonner dayjs
```

### Giai đoạn 2 - Nâng cao
```bash
pnpm add react-dropzone @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### Giai đoạn 3 - Testing & CI/CD
```bash
pnpm add -D @biomejs/biome husky
```
