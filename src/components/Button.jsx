import React from 'react'

export default function Button({ children, variant='primary', className='', ...props }) {
  const base = 'px-4 py-2 rounded-md font-medium focus:outline-none transition transform active:scale-95'
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent border border-gray-300 dark:border-gray-700'
  }
  const cls = `${base} ${variants[variant] || variants.primary} ${className}`
  return <button className={cls} {...props}>{children}</button>
}
