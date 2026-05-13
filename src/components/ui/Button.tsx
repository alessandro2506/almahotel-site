'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'outline-white'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-[family-name:var(--font-sans)] font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E60023] disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

    const variants = {
      primary:
        'bg-[#E60023] text-white hover:bg-[#C60015] focus-visible:ring-[#E60023]',
      outline:
        'border border-[#242424] text-[#242424] bg-transparent hover:bg-[#242424] hover:text-white',
      'outline-white':
        'border border-white text-white bg-transparent hover:bg-white hover:text-[#242424]',
      ghost:
        'text-[#6B6B6B] underline-offset-4 hover:text-[#1A1A1A] hover:underline bg-transparent border-none',
    }

    const sizes = {
      sm: 'text-[11px] px-5 py-2.5',
      md: 'text-[13px] px-8 py-3.5',
      lg: 'text-[13px] px-10 py-4',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
