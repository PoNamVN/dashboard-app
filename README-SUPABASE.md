# Dashboard App với Supabase - Hướng dẫn Cấu hình

Ứng dụng Dashboard Dynamic được xây dựng với Next.js App Router và Supabase Database.

## Cấu trúc dự án

```
dashboard-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── layout.tsx     # Dashboard layout
│   │   │   ├── page.tsx       # Overview page
│   │   │   ├── invoices/      # Invoices page
│   │   │   └── customers/     # Customers page
│   │   ├── ui/                # UI components
│   │   │   ├── fonts.ts       # Font configuration
│   │   │   └── dashboard/     # Dashboard components
│   │   └── layout.tsx         # Root layout
│   └── lib/                   # Utility functions
│       ├── data.ts            # Data fetching functions
│       ├── definitions.ts     # TypeScript types
│       └── supabase.ts        # Supabase client
├── supabase-schema.sql        # Database schema
└── package.json
```

## Bước 1: Tạo Supabase Project

1. Truy cập [https://supabase.com](https://supabase.com)
2. Đăng nhập hoặc tạo tài khoản mới
3. Click "New Project"
4. Điền thông tin:
   - Name: `dashboard-app`
   - Database Password: (nhớ lưu lại)
   - Region: Chọn region gần bạn nhất
5. Click "Create new project"
6. Đợi khoảng 1-2 phút để Supabase khởi tạo database

## Bước 2: Lấy Supabase Credentials

Sau khi project được tạo:

1. Vào **Settings** → **API**
2. Copy các thông tin sau:
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public key**: Chuỗi dài bắt đầu bằng `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Bước 3: Tạo file .env.local

1. Mở VS Code
2. Chuột phải vào vùng trống trong cây thư mục (bên trái)
3. Chọn "New File"
4. Đặt tên: `.env.local` (có dấu chấm ở đầu)
5. Dán nội dung sau:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

6. Thay thế bằng credentials từ Bước 2

## Bước 4: Tạo Database Tables

1. Vào Supabase Dashboard → **SQL Editor**
2. Click "New Query"
3. Copy nội dung từ file `supabase-schema.sql`
4. Paste vào SQL Editor
5. Click "Run" hoặc nhấn `Ctrl + Enter`

SQL này sẽ tạo:
- `customers` table
- `invoices` table  
- `revenue` table
- Dữ liệu mẫu cho testing

## Bước 5: Cài đặt Dependencies

```bash
cd dashboard-app
npm install
```

## Bước 6: Chạy Development Server

```bash
npm run dev
```

Mở http://localhost:3000 để xem ứng dụng.

## Các tính năng đã triển khai

### ✅ Hoàn thành
- **Next.js App Router**: File-based routing
- **Font Optimization**: next/font với Inter và Lusitana
- **Layouts**: Dashboard layout với sidebar
- **Navigation**: Link với usePathname và active highlighting
- **Supabase Integration**: Database client và data fetching
- **Server Components**: Fetch data trực tiếp từ database
- **Dynamic Rendering**: Trang render với data từ database

### 🚧 Đang làm
- Streaming với Suspense
- Search và Pagination
- CRUD với Server Actions
- Error handling
- Accessibility
- Authentication với NextAuth
- Metadata và SEO

## Database Schema

### Customers Table
```sql
- id: UUID (Primary Key)
- name: VARCHAR(255)
- email: TEXT (Unique)
- image_url: TEXT
```

### Invoices Table
```sql
- id: UUID (Primary Key)
- customer_id: UUID (Foreign Key → customers.id)
- amount: INT (lưu bằng cents)
- status: 'pending' | 'paid'
- date: DATE
```

### Revenue Table
```sql
- month: VARCHAR(10) (Primary Key)
- revenue: INT
```

## Data Fetching Functions

- `fetchRevenue()` - Lấy doanh thu theo tháng
- `fetchLatestInvoices()` - Lấy 5 invoice gần nhất
- `fetchCardData()` - Lấy thống kê cho dashboard cards
- `fetchInvoices()` - Lấy tất cả invoices
- `fetchCustomers()` - Lấy tất cả customers
- `fetchInvoiceById(id)` - Lấy invoice theo ID

## Troubleshooting

### Lỗi "Supabase URL not found"
- Kiểm tra file `.env.local` đã được tạo
- Đảm bảo biến môi trường đúng tên
- Restart development server sau khi tạo `.env.local`

### Lỗi "Table does not exist"
- Chạy SQL schema trong Supabase SQL Editor
- Kiểm tra table đã được tạo trong Supabase Dashboard

### Lỗi "Connection refused"
- Kiểm tra Supabase project đang hoạt động
- Đảm bảo database URL đúng
- Kiểm tra internet connection

## Bước tiếp theo

Sau khi cấu hình thành công:
1. Test các trang dashboard, invoices, customers
2. Kiểm tra data từ Supabase được hiển thị đúng
3. Tiếp tục với các tính năng nâng cao (CRUD, Authentication, v.v.)
