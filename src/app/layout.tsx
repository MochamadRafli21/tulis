import './globals.css'
import 'react-quill/dist/quill.snow.css';
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Suspense } from 'react';
import MobileNavBar from '@/libs/components/organisms/mobile-navbar';
import NavBar from '@/libs/components/organisms/navbar';
import { CookiesProvider } from 'next-client-cookies/server'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'PageUp',
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
          <div className='flex relative'>
            <Suspense>
              <NavBar />
            </Suspense>
            <div className='md:ml-[72px] w-full'>
              <Suspense>
                {children}
              </Suspense>
              <div className='md:hidden'>
                <Suspense>
                  <MobileNavBar />
                </Suspense>
              </div>
            </div>
          </div>
        </CookiesProvider>
      </body>
    </html>
  )
}
