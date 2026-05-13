'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, ChevronRight, ChevronLeft, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const guestSchema = z.object({
  name: z.string().min(2),
  surname: z.string().min(2),
  birthDate: z.string().min(1),
  birthPlace: z.string().min(2),
  nationality: z.string().min(2),
  documentType: z.enum(['carta_identita', 'passaporto', 'patente']),
  documentNumber: z.string().min(4),
  documentIssueDate: z.string().min(1),
  documentExpiry: z.string().min(1),
  documentAuthority: z.string().min(2),
})

const schema = z.object({
  arrivalDate: z.string().min(1),
  departureDate: z.string().min(1),
  roomNumber: z.string().optional(),
  bookingCode: z.string().optional(),
  guestEmail: z.string().email().optional(),
  mainGuest: guestSchema,
  additionalGuests: z.array(guestSchema).optional(),
  dataConsent: z.boolean().refine((v) => v === true),
})

type FormData = z.infer<typeof schema>

function inputCls(hasError?: boolean) {
  return cn(
    'w-full border px-4 py-3 text-[14px] text-[#242424] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#242424] transition-colors bg-white',
    hasError ? 'border-[#E60023]' : 'border-[#E8E3DE]'
  )
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#6B6B6B] mb-2">
      {children} {required && '*'}
    </label>
  )
}

function GuestFields({
  prefix,
  register,
  errors,
  cf,
}: {
  prefix: 'mainGuest' | `additionalGuests.${number}`
  register: ReturnType<typeof useForm<FormData>>['register']
  errors: ReturnType<typeof useForm<FormData>>['formState']['errors']
  cf: ReturnType<typeof useTranslations<'checkinForm'>>
}) {
  const DOC_TYPES = [
    { value: 'carta_identita', label: cf('docIdCard') },
    { value: 'passaporto', label: cf('docPassport') },
    { value: 'patente', label: cf('docLicense') },
  ]

  const getError = (field: string) => {
    const parts = prefix.split('.')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let err: any = errors
    for (const p of parts) err = err?.[p]
    return err?.[field]?.message
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <FieldLabel required>{cf('name')}</FieldLabel>
          <input {...register(`${prefix}.name` as Parameters<typeof register>[0])} className={inputCls(!!getError('name'))} />
        </div>
        <div>
          <FieldLabel required>{cf('surname')}</FieldLabel>
          <input {...register(`${prefix}.surname` as Parameters<typeof register>[0])} className={inputCls(!!getError('surname'))} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <FieldLabel required>{cf('birthDate')}</FieldLabel>
          <input type="date" {...register(`${prefix}.birthDate` as Parameters<typeof register>[0])} className={inputCls(!!getError('birthDate'))} />
        </div>
        <div>
          <FieldLabel required>{cf('birthPlace')}</FieldLabel>
          <input {...register(`${prefix}.birthPlace` as Parameters<typeof register>[0])} className={inputCls(!!getError('birthPlace'))} />
        </div>
      </div>
      <div>
        <FieldLabel required>{cf('nationality')}</FieldLabel>
        <input {...register(`${prefix}.nationality` as Parameters<typeof register>[0])} className={inputCls(!!getError('nationality'))} />
      </div>
      <div>
        <FieldLabel required>{cf('documentType')}</FieldLabel>
        <select {...register(`${prefix}.documentType` as Parameters<typeof register>[0])} className={inputCls(!!getError('documentType'))}>
          {DOC_TYPES.map((d) => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>
      <div>
        <FieldLabel required>{cf('documentNumber')}</FieldLabel>
        <input {...register(`${prefix}.documentNumber` as Parameters<typeof register>[0])} className={inputCls(!!getError('documentNumber'))} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <FieldLabel required>{cf('issueDate')}</FieldLabel>
          <input type="date" {...register(`${prefix}.documentIssueDate` as Parameters<typeof register>[0])} className={inputCls(!!getError('documentIssueDate'))} />
        </div>
        <div>
          <FieldLabel required>{cf('expiryDate')}</FieldLabel>
          <input type="date" {...register(`${prefix}.documentExpiry` as Parameters<typeof register>[0])} className={inputCls(!!getError('documentExpiry'))} />
        </div>
        <div>
          <FieldLabel required>{cf('authority')}</FieldLabel>
          <input {...register(`${prefix}.documentAuthority` as Parameters<typeof register>[0])} className={inputCls(!!getError('documentAuthority'))} />
        </div>
      </div>
    </div>
  )
}

export function CheckInForm() {
  const t = useTranslations('protected.checkin')
  const cf = useTranslations('checkinForm')
  const [step, setStep] = useState(1)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      mainGuest: { documentType: 'carta_identita' },
      additionalGuests: [],
    },
  })

  const { register, handleSubmit, watch, trigger, formState: { errors, isSubmitting }, control } = form

  const { fields: additionalGuests, append, remove } = useFieldArray({
    control,
    name: 'additionalGuests',
  })

  const stepValidation = [
    ['arrivalDate', 'departureDate'],
    ['mainGuest'],
    [],
    ['dataConsent'],
  ]

  async function nextStep() {
    const fields = stepValidation[step - 1] as (keyof FormData)[]
    const valid = await trigger(fields)
    if (valid) setStep((s) => s + 1)
  }

  async function onSubmit(data: FormData) {
    setServerError('')
    try {
      const res = await fetch('/api/web-checkin', {
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

  const steps = [t('step1'), t('step2'), t('step3'), t('step4')]

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
      <div className="flex items-center mb-10 gap-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div
              className={cn(
                'flex-shrink-0 w-8 h-8 flex items-center justify-center text-[12px] font-semibold border',
                i + 1 <= step ? 'bg-[#E60023] border-[#E60023] text-white' : 'border-[#E8E3DE] text-[#9A9A9A]'
              )}
            >
              {i + 1}
            </div>
            <div className="flex-1 ml-2 mr-2 last:flex-none">
              <p className={cn(
                'font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-widest hidden sm:block',
                i + 1 <= step ? 'text-[#242424]' : 'text-[#9A9A9A]'
              )}>
                {s}
              </p>
              {i < steps.length - 1 && (
                <div className={cn('h-px mt-1', i + 1 < step ? 'bg-[#E60023]' : 'bg-[#E8E3DE]')} />
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1 - Dati soggiorno */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <FieldLabel required>{cf('arrivalDate')}</FieldLabel>
                <input type="date" {...register('arrivalDate')} className={inputCls(!!errors.arrivalDate)} />
              </div>
              <div>
                <FieldLabel required>{cf('departureDate')}</FieldLabel>
                <input type="date" {...register('departureDate')} className={inputCls(!!errors.departureDate)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <FieldLabel>{cf('roomNumber')}</FieldLabel>
                <input {...register('roomNumber')} className={inputCls()} placeholder={cf('optional')} />
              </div>
              <div>
                <FieldLabel>{cf('bookingCode')}</FieldLabel>
                <input {...register('bookingCode')} className={inputCls()} placeholder={cf('optional')} />
              </div>
            </div>
            <div>
              <FieldLabel>{cf('guestEmail')}</FieldLabel>
              <input {...register('guestEmail')} type="email" className={inputCls(!!errors.guestEmail)} placeholder={cf('guestEmailPlaceholder')} />
            </div>
          </div>
        )}

        {/* Step 2 - Ospite principale */}
        {step === 2 && (
          <div>
            <h3 className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#9A9A9A] mb-6">
              {cf('mainGuest')}
            </h3>
            <GuestFields prefix="mainGuest" register={register} errors={errors} cf={cf} />
          </div>
        )}

        {/* Step 3 - Ospiti aggiuntivi */}
        {step === 3 && (
          <div className="space-y-8">
            {additionalGuests.length === 0 ? (
              <p className="text-[#6B6B6B] text-[14px]">{t('noAdditionalGuests')}</p>
            ) : (
              additionalGuests.map((field, index) => (
                <div key={field.id} className="border border-[#E8E3DE] p-6 relative">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#6B6B6B]">
                      {cf('guestNumber', { n: index + 2 })}
                    </h3>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-[#9A9A9A] hover:text-[#E60023] transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <GuestFields
                    prefix={`additionalGuests.${index}`}
                    register={register}
                    errors={errors}
                    cf={cf}
                  />
                </div>
              ))
            )}
            <Button
              type="button"
              variant="outline"
              onClick={() => append({
                name: '', surname: '', birthDate: '', birthPlace: '',
                nationality: '', documentType: 'carta_identita',
                documentNumber: '', documentIssueDate: '', documentExpiry: '',
                documentAuthority: '',
              })}
            >
              <Plus size={14} className="mr-2" />
              {t('addGuest')}
            </Button>
          </div>
        )}

        {/* Step 4 - Conferma */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="bg-[#F7F3EE] p-6 space-y-3">
              <h3 className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#6B6B6B] mb-4">
                {cf('summary')}
              </h3>
              {[
                { label: cf('summaryArrival'), value: watch('arrivalDate') },
                { label: cf('summaryDeparture'), value: watch('departureDate') },
                ...(watch('roomNumber') ? [{ label: cf('summaryRoom'), value: watch('roomNumber') }] : []),
                { label: cf('summaryGuest'), value: `${watch('mainGuest.name')} ${watch('mainGuest.surname')}` },
                { label: cf('summaryNationality'), value: watch('mainGuest.nationality') },
                { label: cf('summaryGuests'), value: 1 + (additionalGuests.length) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-[12px] uppercase tracking-wider text-[#9A9A9A]">{label}</span>
                  <span className="text-[13px] text-[#242424] font-medium">{String(value)}</span>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3">
              <input {...register('dataConsent')} type="checkbox" id="consent" className="mt-0.5 accent-[#E60023]" />
              <label htmlFor="consent" className="text-[13px] text-[#6B6B6B] cursor-pointer">
                {cf('consentLabel')}
              </label>
            </div>
            {errors.dataConsent && <p className="text-[#E60023] text-[12px]">{cf('consentError')}</p>}

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

          {step < 4 ? (
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
