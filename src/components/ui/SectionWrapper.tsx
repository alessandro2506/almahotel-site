import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  background?: 'white' | 'warm' | 'dark'
}

export function SectionWrapper({
  children,
  className,
  id,
  background = 'white',
}: SectionWrapperProps) {
  const bg = {
    white: 'bg-white',
    warm: 'bg-[#F7F3EE]',
    dark: 'bg-[#242424]',
  }

  return (
    <section
      id={id}
      className={cn('py-[96px] max-md:py-[64px]', bg[background], className)}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">{children}</div>
    </section>
  )
}
