import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ weight: ["300", "400", "500", "700"], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Epoxy Crafts',
  description: 'A website for beautiful products made of wood and epoxy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}><div className="flex min-h-screen p-1">{children}</div></body>
    </html>
  );
}
