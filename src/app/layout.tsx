import type { Metadata } from "next";
import { inter, lusitana } from './ui/fonts';
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | Dashboard App',
    default: 'Dashboard App',
  },
  description: 'Dynamic Dashboard App with Supabase',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lusitana.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${inter.className} min-h-full flex flex-col`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
