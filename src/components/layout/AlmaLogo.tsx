import Image from 'next/image'

interface AlmaLogoProps {
  variant?: 'light' | 'dark'
  className?: string
}

export function AlmaLogo({ variant = 'dark', className }: AlmaLogoProps) {
  const src = variant === 'light' ? '/logo/logo-light.svg' : '/logo/logo-dark.svg'

  return (
    <Image
      src={src}
      alt="Alma Hotel Palermo"
      width={160}
      height={60}
      priority
      className={className}
    />
  )
}
