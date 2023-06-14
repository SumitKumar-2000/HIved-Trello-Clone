"use client"

import "@/style/globals.css"
import { useState } from "react"
import Nav from '@/components/Nav'
import NextAuthSessionProvider from '@/components/providers/NextAuthProvider'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hived',
  description: 'Create, Save, Drag & Drop your todos.',
}

export default function RootLayout({ children }) {

  const [darkMode, setDarkMode] = useState(false)

  return (
    <html lang="en" className={`${darkMode ? "dark" : ""}`}>
        <body className={inter.className}>
          <NextAuthSessionProvider>
            <div
              className="absolute top-0 left-0 w-full min-h-[75vh] -z-50 bg-gradient-to-br from-emerald-400 to-sky-400 filter blur-3xl opacity-50"
              />
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
