'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
  privacy: z.boolean().refine((v) => v === true),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const t = useTranslations('contacts.form')
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSuccess(true)
      reset()
    } catch {
      setServerError(t('error'))
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <CheckCircle2 size={40} className="text-[#E60023]" />
        <p className="font-[family-name:var(--font-display)] text-[22px] text-[#242424]">
          {t('success')}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#6B6B6B] mb-2">
            {t('name')} *
          </label>
          <input
            {...register('name')}
            className={cn(
              'w-full border px-4 py-3 text-[14px] text-[#242424] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#242424] transition-colors',
              errors.name ? 'border-[#E60023]' : 'border-[#E8E3DE]'
            )}
          />
        </div>
        <div>
          <label className="block font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#6B6B6B] mb-2">
            {t('email')} *
          </label>
          <input
            {...register('email')}
            type="email"
            className={cn(
              'w-full border px-4 py-3 text-[14px] text-[#242424] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#242424] transition-colors',
              errors.email ? 'border-[#E60023]' : 'border-[#E8E3DE]'
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#6B6B6B] mb-2">
            {t('phone')}
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="w-full border border-[#E8E3DE] px-4 py-3 text-[14px] text-[#242424] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#242424] transition-colors"
          />
        </div>
        <div>
          <label className="block font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#6B6B6B] mb-2">
            {t('subject')} *
          </label>
          <input
            {...register('subject')}
            className={cn(
              'w-full border px-4 py-3 text-[14px] text-[#242424] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#242424] transition-colors',
              errors.subject ? 'border-[#E60023]' : 'border-[#E8E3DE]'
            )}
          />
        </div>
      </div>

      <div>
        <label className="block font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#6B6B6B] mb-2">
          {t('message')} *
        </label>
        <textarea
          {...register('message')}
          rows={5}
          className={cn(
            'w-full border px-4 py-3 text-[14px] text-[#242424] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#242424] resize-none transition-colors',
            errors.message ? 'border-[#E60023]' : 'border-[#E8E3DE]'
          )}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          {...register('privacy')}
          type="checkbox"
          id="privacy"
          className="mt-0.5 accent-[#E60023]"
        />
        <label htmlFor="privacy" className="text-[13px] text-[#6B6B6B] cursor-pointer">
          {t('privacy')}
        </label>
      </div>

      {serverError && <p className="text-[#E60023] text-[13px]">{serverError}</p>}

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {t('submit')}
      </Button>
    </form>
  )
}
