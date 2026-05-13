'use client'

import { useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { AlmaLogo } from '@/components/layout/AlmaLogo'
import { Button } from '@/components/ui/Button'
import { Eye, EyeOff, Lock } from 'lucide-react'

const TOKEN_KEY = 'alma_guest_token'

interface PasswordGateProps {
  children: ReactNode
}

export function PasswordGate({ children }: PasswordGateProps) {
  const t = useTranslations('protected.password')
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY)
    setAuthenticated(!!token)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth-protected', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()

      if (data.ok) {
        sessionStorage.setItem(TOKEN_KEY, data.token)
        setAuthenticated(true)
        router.refresh()
      } else {
        setError(t('error'))
      }
    } catch {
      setError(t('error'))
    } finally {
      setLoading(false)
    }
  }

  if (authenticated === null) return null

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#242424] flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-10">
            <AlmaLogo variant="light" />
          </div>

          <div className="bg-white p-10">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 border border-[#E8E3DE] flex items-center justify-center">
                <Lock size={20} className="text-[#E60023]" />
              </div>
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-[22px] text-center text-[#242424] mb-2">
              {t('title')}
            </h1>
            <p className="text-[13px] text-[#6B6B6B] text-center mb-8">
              {t('subtitle')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('placeholder')}
                  required
                  className="w-full border border-[#E8E3DE] px-4 py-3 text-[14px] text-[#242424] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#242424] pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#242424]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error && (
                <p className="text-[#E60023] text-[13px]">{error}</p>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading || !password}
              >
                {loading ? t('loading') : t('cta')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
