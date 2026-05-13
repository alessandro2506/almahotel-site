'use client'

import { useRef, useEffect } from 'react'
import { BookingBar } from './BookingBar'

export function BookingBarWrapper() {
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    heroRef.current = document.querySelector('section') as HTMLElement
  }, [])

  return <BookingBar heroRef={heroRef} />
}
