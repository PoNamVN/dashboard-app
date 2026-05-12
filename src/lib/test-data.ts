// Mock data để test khi chưa có Supabase connection
export const mockCustomers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  },
  {
    id: '2', 
    name: 'Jane Smith',
    email: 'jane@example.com',
  },
  {
    id: '3',
    name: 'Bob Johnson', 
    email: 'bob@example.com',
  },
];

export const mockInvoices = [
  {
    id: '1',
    customer_id: '1',
    amount: 15000,
    status: 'paid' as const,
    date: '2024-01-15',
    customers: {
      name: 'John Doe',
      email: 'john@example.com',
    },
  },
  {
    id: '2',
    customer_id: '1', 
    amount: 25000,
    status: 'pending' as const,
    date: '2024-02-20',
    customers: {
      name: 'John Doe',
      email: 'john@example.com',
    },
  },
  {
    id: '3',
    customer_id: '2',
    amount: 35000,
    status: 'paid' as const,
    date: '2024-01-10',
    customers: {
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
  },
];

export const mockCardData = {
  numberOfCustomers: 3,
  numberOfInvoices: 5,
  totalPaidInvoices: 3,
  totalPendingInvoices: 2,
};

export const mockRevenue = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 65000 },
  { month: 'Mar', revenue: 75000 },
  { month: 'Apr', revenue: 85000 },
  { month: 'May', revenue: 95000 },
  { month: 'Jun', revenue: 105000 },
];
