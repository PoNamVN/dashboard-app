import { fetchCustomers } from '@/lib/data-test';

export const metadata = {
  title: 'Customers',
};

export default async function Page() {
  const customers = await fetchCustomers();
  
  return (
    <main>
      <h1 className="text-3xl font-bold mb-6">Customers</h1>
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer: any) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{customer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
