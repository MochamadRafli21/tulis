import '../globals.css'
import 'react-quill/dist/quill.snow.css';
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { CookiesProvider } from 'next-client-cookies/server'
import { Suspense } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'PageUp | Auth',
  description: "Starting Your Morning With New Page"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CookiesProvider>
          <Suspense>
            {children}
          </Suspense>
        </CookiesProvider>
      </body>
    </html>
  )
}
