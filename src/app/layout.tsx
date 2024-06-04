import './globals.css'
import 'react-quill/dist/quill.snow.css';
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import MobileNavBar from '@/libs/components/organisms/mobile-navbar';
import NavBar from '@/libs/components/organisms/navbar';

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
        <div className='flex relative'>
          <NavBar />
          <div className='md:ml-[72px] w-full'>
            {children}
            <div className='md:hidden'>
              <MobileNavBar />
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
