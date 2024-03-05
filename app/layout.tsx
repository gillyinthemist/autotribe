import '@/app/ui/global.css';
import type { Metadata } from 'next';
import { openSans } from './ui/fonts';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: {
    template: '%s | Autotribe',
    default: 'Autotribe',
  },
  description: 'Keep track of your pride and joys, get inspired by others',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        {children} <Analytics /> <SpeedInsights/>
      </body>
    </html>
  );
}
