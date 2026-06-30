import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import SocialLinks from '@/components/SocialLinks'
import EmailLink from '@/components/EmailLink'

export const metadata: Metadata = {
  title: 'Ato Supriyanto | WordPress Theme Developer',
  description:
    'Ato Supriyanto is a WordPress Developer based in Bandung, Indonesia who specializes in building exceptional websites and applications.',
  keywords: 'Ato Supriyanto, WordPress Theme Developer, front-end developer, web developer, javascript, indonesia',
  openGraph: {
    title: 'Ato Supriyanto | WordPress Theme Developer',
    description: 'WordPress Developer based in Bandung, Indonesia.',
    url: 'https://atosupriyanto.com',
    siteName: 'Ato Supriyanto',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-navy text-slate">
        <Nav />
        <SocialLinks />
        <EmailLink />
        <div className="px-6 sm:px-12 md:px-24 lg:px-36">
          {children}
        </div>
      </body>
    </html>
  )
}
