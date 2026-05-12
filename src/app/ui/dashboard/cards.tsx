import { fetchCardData } from '@/lib/data';

export default async function CardWrapper() {
  const cardData = await fetchCardData();

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Total Invoices</h2>
        <p className="text-3xl font-bold text-gray-900">{cardData.numberOfInvoices}</p>
        <p className="text-sm text-gray-500 mt-2">Paid: {cardData.totalPaidInvoices} | Pending: {cardData.totalPendingInvoices}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Total Customers</h2>
        <p className="text-3xl font-bold text-gray-900">{cardData.numberOfCustomers}</p>
        <p className="text-sm text-gray-500 mt-2">Active customers</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Paid Invoices</h2>
        <p className="text-3xl font-bold text-green-600">{cardData.totalPaidInvoices}</p>
        <p className="text-sm text-gray-500 mt-2">Successfully processed</p>
      </div>
    </>
  );
}
