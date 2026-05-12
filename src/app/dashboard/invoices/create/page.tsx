import Form from '@/app/ui/invoices/create-form';
import { fetchCustomers } from '@/lib/data';

export const metadata = {
  title: 'Create Invoice',
};

export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <h1 className="text-3xl font-bold mb-6">Create Invoice</h1>
      <Form customers={customers} />
    </main>
  );
}
