-- Tạo bảng customers
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email TEXT UNIQUE NOT NULL,
  image_url TEXT
);

-- Tạo bảng invoices
CREATE TABLE IF NOT EXISTS invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  amount INT NOT NULL, -- Lưu bằng cents (số nguyên)
  status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'paid')),
  date DATE NOT NULL
);

-- Tạo bảng revenue
CREATE TABLE IF NOT EXISTS revenue (
  month VARCHAR(10) PRIMARY KEY,
  revenue INT NOT NULL
);

-- Chèn dữ liệu mẫu
INSERT INTO customers (name, email, image_url) VALUES
  ('John Doe', 'john@example.com', '/customers/john.jpg'),
  ('Jane Smith', 'jane@example.com', '/customers/jane.jpg'),
  ('Bob Johnson', 'bob@example.com', '/customers/bob.jpg')
ON CONFLICT (email) DO NOTHING;

INSERT INTO invoices (customer_id, amount, status, date) VALUES
  ((SELECT id FROM customers WHERE email = 'john@example.com'), 15000, 'paid', '2024-01-15'),
  ((SELECT id FROM customers WHERE email = 'john@example.com'), 25000, 'pending', '2024-02-20'),
  ((SELECT id FROM customers WHERE email = 'jane@example.com'), 35000, 'paid', '2024-01-10'),
  ((SELECT id FROM customers WHERE email = 'jane@example.com'), 45000, 'pending', '2024-03-05'),
  ((SELECT id FROM customers WHERE email = 'bob@example.com'), 55000, 'paid', '2024-02-15')
ON CONFLICT DO NOTHING;

INSERT INTO revenue (month, revenue) VALUES
  ('Jan', 45000),
  ('Feb', 65000),
  ('Mar', 75000),
  ('Apr', 85000),
  ('May', 95000),
  ('Jun', 105000)
ON CONFLICT (month) DO NOTHING;
