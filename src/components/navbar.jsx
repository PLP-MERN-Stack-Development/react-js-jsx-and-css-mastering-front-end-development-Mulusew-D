import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import Button from './Button'

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <nav className="w-full border-b dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-semibold inline-flex items-center gap-2">
            <span className="w-8 h-8 rounded-md bg-primary text-white flex items-center justify-center animate-float">R</span>
            ReactLab
          </Link>
          <Link to="/posts" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">Posts</Link>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={toggleTheme}>
            {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </Button>
        </div>
      </div>
    </nav>
  )
}
