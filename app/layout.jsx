"use client"

import "@/style/globals.css"
import { useState } from "react"
import Nav from '@/components/Nav'
import NextAuthSessionProvider from '@/components/providers/NextAuthProvider'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// to use layout in client side, it is required to add "use client" but also required to remove this meta data
// export const metadata = {
//   title: 'Hived',
//   description: 'Create, Save, Drag & Drop your todos.'
// }

export default function RootLayout({ children }) {

  const [darkMode, setDarkMode] = useState(false)

  return (
    <html lang="en" className={`${darkMode ? "dark" : ""}`}>
        <body className={inter.className}>
          <NextAuthSessionProvider>
            <div className="emerald_sky_gradient"/>
            <Nav
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
            <main className='main'>
              {children}
            </main>
          </NextAuthSessionProvider>
        </body>
    </html>
  )
}
