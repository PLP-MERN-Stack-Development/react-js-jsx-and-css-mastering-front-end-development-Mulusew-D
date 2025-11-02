import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-12 border-t dark:border-gray-700">
      <div className="mx-auto max-w-5xl px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="text-sm">&copy; {new Date().getFullYear()} ReactLab. All rights reserved.</div>
        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  )
}
