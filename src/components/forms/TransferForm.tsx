'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  serviceType: z.enum(['arrival', 'departure']),
  date: z.string().min(1),
  time: z.string().min(1),
  origin: z.string().min(2),
  customOrigin: z.string().optional(),
  destination: z.string().min(2),
  passengers: z.number().min(1).max(8),
  flightNumber: z.string().optional(),
  name: z.string().min(2),
  surname: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  roomNumber: z.string().optional(),
  notes: z.string().optional(),
  privacy: z.boolean().refine((v) => v === true),
})

type FormData = z.infer<typeof schema>

const LOCATIONS = [
  'Aeroporto Palermo (PMO)',
  'Aeroporto Catania (CTA)',
  'Stazione Centrale Palermo',
  'Altro',
]

function InputField({
  label,
  error,
  children,
  required,
}: {
  label: string
  error?: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <div>
      <label className="block font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#6B6B6B] mb-2">
        {label} {required && '*'}
      </label>
      {children}
      {error && <p className="text-[#E60023] text-[12px] mt-1">{error}</p>}
    </div>
  )
}

const inputCls = (hasError?: boolean) =>
  cn(
    'w-full border px-4 py-3 text-[14px] text-[#242424] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#242424] transition-colors bg-white',
    hasError ? 'border-[#E60023]' : 'border-[#E8E3DE]'
  )

export function TransferForm() {
  const t = useTranslations('protected.transfer')
  const [step, setStep] = useState(1)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { serviceType: 'arrival', passengers: 2 },
  })

  const origin = watch('origin')

  const steps = [
    { label: t('step1'), fields: ['serviceType', 'date', 'time', 'origin', 'destination', 'passengers', 'flightNumber'] },
    { label: t('step2'), fields: ['name', 'surname', 'email', 'phone', 'roomNumber', 'notes'] },
    { label: t('step3'), fields: ['privacy'] },
  ]

  async function nextStep() {
    const fields = steps[step - 1].fields as (keyof FormData)[]
    const valid = await trigger(fields)
    if (valid) setStep((s) => s + 1)
  }

  async function onSubmit(data: FormData) {
    setServerError('')
    try {
      const res = await fetch('/api/transfer-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSuccess(true)
    } catch {
      setServerError(t('error'))
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center max-w-lg mx-auto">
        <CheckCircle2 size={48} className="text-[#E60023]" />
        <p className="font-[family-name:var(--font-display)] text-[26px] text-[#242424]">
          {t('success')}
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center mb-10">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center flex-1">
            <div
              className={cn(
                'flex-shrink-0 w-8 h-8 flex items-center justify-center text-[12px] font-semibold border transition-colors',
                i + 1 <= step
                  ? 'bg-[#E60023] border-[#E60023] text-white'
                  : 'border-[#E8E3DE] text-[#9A9A9A]'
              )}
            >
              {i + 1}
            </div>
            <div className="flex-1 ml-2 mr-3">
              <p className={cn(
                'font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-widest hidden sm:block',
                i + 1 <= step ? 'text-[#242424]' : 'text-[#9A9A9A]'
              )}>
                {s.label}
              </p>
              {i < steps.length - 1 && (
                <div className={cn(
                  'h-px mt-1 sm:mt-2 transition-colors',
                  i + 1 < step ? 'bg-[#E60023]' : 'bg-[#E8E3DE]'
                )} />
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-5">
            <InputField label="Tipo Servizio" required>
              <div className="grid grid-cols-2 gap-3">
                {(['arrival', 'departure'] as const).map((type) => (
                  <label
                    key={type}
                    className={cn(
                      'flex items-center gap-3 border px-4 py-3 cursor-pointer transition-colors',
                      watch('serviceType') === type
                        ? 'border-[#242424] bg-[#F7F3EE]'
                        : 'border-[#E8E3DE]'
                    )}
                  >
                    <input {...register('serviceType')} type="radio" value={type} className="accent-[#E60023]" />
                    <span className="text-[13px] text-[#242424]">
                      {type === 'arrival' ? "Arrivo all'hotel" : "Partenza dall'hotel"}
                    </span>
                  </label>
                ))}
              </div>
            </InputField>

            <div className="grid grid-cols-2 gap-5">
              <InputField label="Data" required error={errors.date?.message}>
                <input {...register('date')} type="date" className={inputCls(!!errors.date)} />
              </InputField>
              <InputField label="Ora" required error={errors.time?.message}>
                <input {...register('time')} type="time" className={inputCls(!!errors.time)} />
              </InputField>
            </div>

            <InputField label="Provenienza" required error={errors.origin?.message}>
              <select {...register('origin')} className={inputCls(!!errors.origin)}>
                <option value="">Seleziona...</option>
                {LOCATIONS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </InputField>
            {origin === 'Altro' && (
              <InputField label="Specifica provenienza">
                <input {...register('customOrigin')} className={inputCls()} placeholder="Es. Porto, stazione..." />
              </InputField>
            )}

            <InputField label="Destinazione" required error={errors.destination?.message}>
              <select {...register('destination')} className={inputCls(!!errors.destination)}>
                <option value="">Seleziona...</option>
                {LOCATIONS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </InputField>

            <div className="grid grid-cols-2 gap-5">
              <InputField label="N° Passeggeri" required>
                <input
                  {...register('passengers', { valueAsNumber: true })}
                  type="number"
                  min={1}
                  max={8}
                  className={inputCls(!!errors.passengers)}
                />
              </InputField>
              <InputField label="N° Volo/Treno">
                <input {...register('flightNumber')} className={inputCls()} placeholder="Opzionale" />
              </InputField>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <InputField label="Nome" required error={errors.name?.message}>
                <input {...register('name')} className={inputCls(!!errors.name)} />
              </InputField>
              <InputField label="Cognome" required error={errors.surname?.message}>
                <input {...register('surname')} className={inputCls(!!errors.surname)} />
              </InputField>
            </div>
            <InputField label="Email" required error={errors.email?.message}>
              <input {...register('email')} type="email" className={inputCls(!!errors.email)} />
            </InputField>
            <InputField label="Telefono" required error={errors.phone?.message}>
              <input {...register('phone')} type="tel" className={inputCls(!!errors.phone)} />
            </InputField>
            <div className="grid grid-cols-2 gap-5">
              <InputField label="N° Camera">
                <input {...register('roomNumber')} className={inputCls()} placeholder="Opzionale" />
              </InputField>
            </div>
            <InputField label="Note">
              <textarea {...register('notes')} rows={3} className={cn(inputCls(), 'resize-none')} placeholder="Informazioni aggiuntive..." />
            </InputField>
          </div>
        )}

        {/* Step 3 — Conferma */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-[#F7F3EE] p-6 space-y-3">
              <h3 className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#6B6B6B] mb-4">
                Riepilogo Richiesta
              </h3>
              {[
                { label: 'Servizio', value: watch('serviceType') === 'arrival' ? "Arrivo all'hotel" : "Partenza dall'hotel" },
                { label: 'Data', value: `${watch('date')} alle ${watch('time')}` },
                { label: 'Da', value: watch('origin') },
                { label: 'A', value: watch('destination') },
                { label: 'Passeggeri', value: watch('passengers') },
                { label: 'Nome', value: `${watch('name')} ${watch('surname')}` },
                { label: 'Email', value: watch('email') },
                { label: 'Telefono', value: watch('phone') },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-[12px] uppercase tracking-wider text-[#9A9A9A]">{label}</span>
                  <span className="text-[13px] text-[#242424] font-medium">{String(value)}</span>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3">
              <input {...register('privacy')} type="checkbox" id="privacy" className="mt-0.5 accent-[#E60023]" />
              <label htmlFor="privacy" className="text-[13px] text-[#6B6B6B] cursor-pointer">
                Acconsento al trattamento dei dati personali per la gestione della richiesta di transfer
              </label>
            </div>
            {errors.privacy && <p className="text-[#E60023] text-[12px]">Devi accettare la privacy policy</p>}

            {serverError && <p className="text-[#E60023] text-[13px]">{serverError}</p>}
          </div>
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E8E3DE]">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
              <ChevronLeft size={14} className="mr-1" />
              {t('back')}
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button type="button" variant="primary" onClick={nextStep}>
              {t('next')}
              <ChevronRight size={14} className="ml-1" />
            </Button>
          ) : (
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {t('submit')}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
