import Nav from '@/components/Nav'
import "@/style/globals.css"
import { Inter } from 'next/font/google'
// import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hived',
  description: 'Create, Save, Drag & Drop your todos.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          className="absolute top-0 left-0 w-full max-sm:h-96 h-[65vh] -z-50 bg-gradient-to-br from-emerald-800 to-sky-800 filter blur-3xl opacity-50"
        />
        <Nav/>
        <main className='main'>
          {children}
        </main>
        {/* <Footer/> */}
      </body>
    </html>
  )
}
