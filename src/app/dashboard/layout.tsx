import Link from 'next/link';
import { lusitana } from '../ui/fonts';
import NavLinks from '@/app/ui/dashboard/nav-links';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 bg-gray-900 text-white">
        <div className="p-6">
          <Link href="/" className={`${lusitana.className} text-2xl font-bold`}>
            Dashboard
          </Link>
        </div>
        <nav className="px-4 space-y-2">
          <NavLinks />
        </nav>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-gray-100">
        {children}
      </div>
    </div>
  );
}
