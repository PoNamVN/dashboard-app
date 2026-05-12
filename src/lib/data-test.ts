// Version test với mock data - tạm thời bỏ Supabase
import { mockCustomers, mockInvoices, mockCardData, mockRevenue } from './test-data';

export async function fetchRevenue() {
  return mockRevenue;
}

export async function fetchLatestInvoices() {
  return mockInvoices.slice(0, 5).map((invoice) => ({
    ...invoice,
    customer_name: invoice.customers.name,
    customer_email: invoice.customers.email,
  }));
}

export async function fetchCardData() {
  return mockCardData;
}

export async function fetchInvoices() {
  return mockInvoices;
}

export async function fetchCustomers() {
  return mockCustomers;
}

export async function fetchInvoiceById(id: string) {
  return mockInvoices.find(invoice => invoice.id === id);
}
