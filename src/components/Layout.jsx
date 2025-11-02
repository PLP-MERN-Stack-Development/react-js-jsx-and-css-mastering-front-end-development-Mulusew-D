import React from 'react'
import Navbar from './navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto max-w-5xl px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
