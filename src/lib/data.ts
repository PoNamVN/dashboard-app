import { supabase } from './supabase';
import { Revenue, LatestInvoiceRaw, Invoice } from './definitions';

export async function fetchRevenue() {
  const { data, error } = await supabase
    .from('revenue')
    .select('*')
    .order('month');

  if (error) {
    console.error('Database Error:', error.message, error.details, error.hint);
    throw new Error('Failed to fetch revenue data.');
  }

  return data as Revenue[];
}

export async function fetchLatestInvoices() {
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      id,
      amount,
      status,
      date,
      customers (
        name,
        email
      )
    `)
    .order('date', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Database Error:', error.message, error.details, error.hint);
    throw new Error('Failed to fetch the latest invoices.');
  }

  const latestInvoices = data.map((invoice: any) => ({
    ...invoice,
    customer_name: invoice.customers.name,
    customer_email: invoice.customers.email,
  }));

  return latestInvoices as LatestInvoiceRaw[];
}

export async function fetchCardData() {
  try {
    const invoiceCountPromise = supabase
      .from('invoices')
      .select('*', { count: 'exact', head: true });

    const customerCountPromise = supabase
      .from('customers')
      .select('*', { count: 'exact', head: true });

    const invoiceStatusPromise = supabase
      .from('invoices')
      .select('status');

    const [invoiceCountData, customerCountData, invoiceStatusData] = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = invoiceCountData.count || 0;
    const numberOfCustomers = customerCountData.count || 0;
    
    const totalPaidInvoices = invoiceStatusData.data?.filter(
      (invoice: any) => invoice.status === 'paid'
    ).length || 0;
    
    const totalPendingInvoices = invoiceStatusData.data?.filter(
      (invoice: any) => invoice.status === 'pending'
    ).length || 0;

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchInvoices() {
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      id,
      customer_id,
      amount,
      status,
      date,
      customers (
        name,
        email,
        image_url
      )
    `)
    .order('date', { ascending: false });

  if (error) {
    console.error('Database Error:', error.message, error.details, error.hint);
    throw new Error('Failed to fetch invoices.');
  }

  return data as any[];
}

export async function fetchCustomers() {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('name');

  if (error) {
    console.error('Database Error:', error.message, error.details, error.hint);
    throw new Error('Failed to fetch customers.');
  }

  return data as any[];
}

export async function fetchInvoiceById(id: string) {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return undefined;
    }
    console.error('Database Error:', error.message, error.details, error.hint);
    throw new Error('Failed to fetch invoice.');
  }

  return data;
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  let supabaseQuery = supabase
    .from('invoices')
    .select(`
      id,
      amount,
      date,
      status,
      customers!inner(name, email, image_url)
    `);

  if (query) {
    supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,email.ilike.%${query}%`, { foreignTable: 'customers' });
  }

  const { data, error } = await supabaseQuery
    .order('date', { ascending: false })
    .range(offset, offset + ITEMS_PER_PAGE - 1);

  if (error) {
    console.error('Database Error:', error.message, error.details, error.hint);
    throw new Error('Failed to fetch invoices.');
  }

  return data as any[];
}

export async function fetchInvoicesPages(query: string) {
  let supabaseQuery = supabase
    .from('invoices')
    .select('*, customers!inner(name, email)', { count: 'exact', head: true });

  if (query) {
    supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,email.ilike.%${query}%`, { foreignTable: 'customers' });
  }

  const { count, error } = await supabaseQuery;

  if (error) {
    console.error('Database Error:', error.message, error.details, error.hint);
    throw new Error('Failed to fetch total number of invoices.');
  }

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

