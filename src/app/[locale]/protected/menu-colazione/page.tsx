'use client'

import { useTranslations } from 'next-intl'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn } from '@/components/ui/FadeIn'
import { Coffee, Croissant, Leaf, Wheat } from 'lucide-react'

interface MenuCardProps {
  name: string
  description: string
}

function MenuCard({ name, description }: MenuCardProps) {
  return (
    <div className="border border-[#E8E3DE] p-5 hover:border-[#E60023] transition-colors group">
      <h4 className="font-[family-name:var(--font-sans)] text-[13px] font-semibold text-[#242424] mb-1 group-hover:text-[#E60023] transition-colors">
        {name}
      </h4>
      <p className="text-[13px] text-[#9A9A9A]">{description}</p>
    </div>
  )
}

interface MenuSectionProps {
  title: string
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>
  items: Array<{ name: string; description: string }>
}

function MenuSection({ title, icon: Icon, items }: MenuSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Icon size={20} className="text-[#E60023]" strokeWidth={1.5} />
        <h3 className="font-[family-name:var(--font-sans)] text-[13px] font-semibold uppercase tracking-widest text-[#242424]">
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <MenuCard key={item.name} {...item} />
        ))}
      </div>
    </div>
  )
}

function MenuColazioneContent() {
  const t = useTranslations('protected.breakfast')
  const tm = useTranslations('breakfastMenu')

  const menuData = {
    sweet: [
      { name: tm('sweet.croissants.name'), description: tm('sweet.croissants.desc') },
      { name: tm('sweet.brioche.name'), description: tm('sweet.brioche.desc') },
      { name: tm('sweet.torte.name'), description: tm('sweet.torte.desc') },
      { name: tm('sweet.yogurt.name'), description: tm('sweet.yogurt.desc') },
      { name: tm('sweet.fruit.name'), description: tm('sweet.fruit.desc') },
      { name: tm('sweet.jams.name'), description: tm('sweet.jams.desc') },
    ],
    savory: [
      { name: tm('savory.eggs.name'), description: tm('savory.eggs.desc') },
      { name: tm('savory.meats.name'), description: tm('savory.meats.desc') },
      { name: tm('savory.cheese.name'), description: tm('savory.cheese.desc') },
      { name: tm('savory.toast.name'), description: tm('savory.toast.desc') },
      { name: tm('savory.cereals.name'), description: tm('savory.cereals.desc') },
    ],
    beverages: [
      { name: tm('beverages.espresso.name'), description: tm('beverages.espresso.desc') },
      { name: tm('beverages.cappuccino.name'), description: tm('beverages.cappuccino.desc') },
      { name: tm('beverages.tea.name'), description: tm('beverages.tea.desc') },
      { name: tm('beverages.juices.name'), description: tm('beverages.juices.desc') },
      { name: tm('beverages.granita.name'), description: tm('beverages.granita.desc') },
    ],
    glutenFree: [
      { name: tm('glutenFree.bread.name'), description: tm('glutenFree.bread.desc') },
      { name: tm('glutenFree.biscuits.name'), description: tm('glutenFree.biscuits.desc') },
      { name: tm('glutenFree.cereals.name'), description: tm('glutenFree.cereals.desc') },
      { name: tm('glutenFree.fruit.name'), description: tm('glutenFree.fruit.desc') },
    ],
  }

  return (
    <div className="pt-[72px]">
      <SectionWrapper>
        <FadeIn className="text-center mb-12">
          <span className="font-[family-name:var(--font-sans)] text-[11px] font-semibold uppercase tracking-widest text-[#E60023] block mb-4">
            ALMA HOTEL PALERMO
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[40px] leading-[48px] italic text-[#242424] mb-4">
            {t('title')}
          </h1>
          <p className="text-[16px] text-[#6B6B6B] max-w-xl mx-auto">
            {t('subtitle')}
          </p>
          <p className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-widest text-[#9A9A9A] mt-3">
            {tm('hours')}
          </p>
        </FadeIn>

        <div className="space-y-12">
          <FadeIn><MenuSection title={t('sweet')} icon={Croissant} items={menuData.sweet} /></FadeIn>
          <FadeIn><MenuSection title={t('savory')} icon={Wheat} items={menuData.savory} /></FadeIn>
          <FadeIn><MenuSection title={t('beverages')} icon={Coffee} items={menuData.beverages} /></FadeIn>
          <FadeIn>
            <div className="bg-[#F7F3EE] border border-[#E60023]/20 p-8">
              <MenuSection title={t('glutenFree')} icon={Leaf} items={menuData.glutenFree} />
              <p className="text-[12px] text-[#9A9A9A] mt-4">
                {tm('allergyNote')}
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionWrapper>
    </div>
  )
}

export default function MenuColazionePage() {
  return <MenuColazioneContent />
}
