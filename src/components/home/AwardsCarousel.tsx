const awards = [
  { name: 'TripAdvisor Travellers Choice', year: '2024' },
  { name: "Booking.com Guest Review Award", year: '2024' },
  { name: 'Federalberghi', year: '2021' },
  { name: 'Accoglienza Sicura', year: '2021' },
  { name: 'Trivago Top Rated', year: '2023' },
  { name: 'Hotels.com Loved by Guests', year: '2024' },
  { name: 'Expedia Traveler Preferred', year: '2024' },
]

function AwardBadge({ name, year }: { name: string; year: string }) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-center px-10 py-4 border-r border-[#E8E3DE] last:border-r-0">
      <span className="font-[family-name:var(--font-sans)] text-[12px] font-semibold uppercase tracking-wider text-[#6B6B6B] whitespace-nowrap">
        {name}
      </span>
      {year && (
        <span className="font-[family-name:var(--font-sans)] text-[11px] text-[#9A9A9A] mt-1">
          {year}
        </span>
      )}
    </div>
  )
}

export function AwardsCarousel() {
  return (
    <div className="overflow-hidden relative">
      <div className="flex carousel-track">
        {awards.map((a) => (
          <AwardBadge key={a.name} {...a} />
        ))}
        {/* Duplicate for seamless loop */}
        {awards.map((a) => (
          <AwardBadge key={`dup-${a.name}`} {...a} />
        ))}
      </div>
    </div>
  )
}
