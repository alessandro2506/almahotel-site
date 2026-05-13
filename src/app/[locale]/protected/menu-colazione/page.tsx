import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FadeIn, FadeInGroup, FadeInItem } from '@/components/ui/FadeIn'
import { Coffee, Croissant, Leaf, Wheat } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return { title: 'Menù Colazione' }
}

const menuData = {
  sweet: [
    { name: 'Cornetti freschi', description: 'Sfornati ogni mattina, vuoti e ripieni' },
    { name: 'Brioches siciliane', description: 'Con tuppo, la colazione tipica palermitana' },
    { name: 'Torte fatte in casa', description: 'Ricette della tradizione siciliana' },
    { name: 'Yogurt artigianale', description: 'Ai frutti di stagione e naturale' },
    { name: 'Frutta fresca', description: 'Selezione di stagione' },
    { name: 'Marmellate & miele', description: 'Prodotti locali selezionati' },
  ],
  savory: [
    { name: 'Uova strapazzate', description: 'Con erbe aromatiche fresche' },
    { name: 'Prosciutto & salumi', description: 'Selezione di salumi siciliani' },
    { name: 'Formaggi locali', description: 'Pecorino siciliano e ricotta fresca' },
    { name: 'Toast & tramezzini', description: 'Preparati al momento' },
    { name: 'Cereal & muesli', description: 'Biologici con latte fresco' },
  ],
  beverages: [
    { name: 'Caffè espresso', description: 'Miscela selezionata da torrefazione artigianale' },
    { name: 'Cappuccino', description: 'Con latte intero o vegetale' },
    { name: 'Tè e infusi', description: 'Selezione biologica' },
    { name: 'Succhi freschi', description: 'Arancia, pompelmo, melograno – di stagione' },
    { name: 'Granita siciliana', description: 'Tradizionale – mandorla, limone, caffè' },
  ],
  glutenFree: [
    { name: 'Pane senza glutine', description: 'Sfornato fresco ogni mattina' },
    { name: 'Biscotti senza glutine', description: 'Artigianali' },
    { name: 'Cereali senza glutine', description: 'Con latte o bevanda vegetale' },
    { name: 'Frutta fresca', description: 'Sempre disponibile' },
  ],
}

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
            Servita dal Lunedì al Domenica · 07:30 – 10:30
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
                * Informare sempre lo staff di eventuali allergie o intolleranze alimentari
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
