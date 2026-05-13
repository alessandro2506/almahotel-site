import { PasswordGate } from '@/components/forms/PasswordGate'
import { ReactNode } from 'react'

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <PasswordGate>{children}</PasswordGate>
}
