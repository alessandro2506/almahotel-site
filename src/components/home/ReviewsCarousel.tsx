'use client'

interface Review {
  text: string
  author: string
  country: string
  flag: string
  rating: number
  maxRating: number
  platform: 'Booking.com' | 'TripAdvisor' | 'Google'
  date: string
}

const reviews: Review[] = [
  {
    text: "All of the staff were very friendly, from reception to the cleaners. Breakfast was buffet style and very good quality. Room was very comfortable and clean, bed were super comfy. Location was perfect within walking distance of main sights. I would definitely recommend this hotel.",
    author: "Mark",
    country: "United Kingdom",
    flag: "🇬🇧",
    rating: 10,
    maxRating: 10,
    platform: "Booking.com",
    date: "Luglio 2025",
  },
  {
    text: "Alma hotel is excellently placed to visit all parts of Palermo on foot. It's smart, modern, clean and with a large, friendly and helpful staff. The breakfast is very good and varied. The bedroom was spacious and comfortable with an excellent bathroom. We would go there again.",
    author: "Simon C.",
    country: "France",
    flag: "🇫🇷",
    rating: 5,
    maxRating: 5,
    platform: "TripAdvisor",
    date: "Ottobre 2024",
  },
  {
    text: "The staff were very friendly and helpful, and both the room and the hotel were spotlessly clean. The location is excellent, just a few minutes' walk from the city center. The beds were comfortable, and the rooms were always kept very clean. We would definitely love to come back!",
    author: "Arzu",
    country: "Belgio",
    flag: "🇧🇪",
    rating: 10,
    maxRating: 10,
    platform: "Booking.com",
    date: "Agosto 2025",
  },
  {
    text: "This hotel is excellent value for money. The staff are caring and welcoming. The rooms are well serviced, comfortable and clean. We enjoyed a very good breakfast. We thoroughly enjoyed our stay on 2 separate nights.",
    author: "Gillian W.",
    country: "United Kingdom",
    flag: "🇬🇧",
    rating: 5,
    maxRating: 5,
    platform: "TripAdvisor",
    date: "Maggio 2025",
  },
  {
    text: "It was very clean & comfortable. I liked the breakfasts too. I found every one of the staff very friendly, professional, polite & they couldn't do enough for you. I would definitely recommend the Alma Hotel to family & friends.",
    author: "Bernadette",
    country: "Irlanda",
    flag: "🇮🇪",
    rating: 9,
    maxRating: 10,
    platform: "Booking.com",
    date: "Febbraio 2026",
  },
  {
    text: "All of the team were very helpful, our room was quiet and spacious and the location is extremely convenient for the historic centre of Palermo. The breakfast buffet was generous and everything tasty. I'd definitely stay here again.",
    author: "Rob M.",
    country: "United Kingdom",
    flag: "🇬🇧",
    rating: 5,
    maxRating: 5,
    platform: "TripAdvisor",
    date: "Giugno 2025",
  },
  {
    text: "Staff was SO friendly and helpful! Convenient location, good breakfast, very comfortable. We liked everything! I would recommend this hotel because of the super staff & location!",
    author: "Joanne",
    country: "Stati Uniti",
    flag: "🇺🇸",
    rating: 10,
    maxRating: 10,
    platform: "Booking.com",
    date: "Giugno 2025",
  },
  {
    text: "Very friendly staff. We stayed at Alma Hotel and it really exceeded our expectations. The reception and the staff was outstanding. The location was superb and within walking distance of most of the major attractions. The breakfast was really good.",
    author: "Jeffrey",
    country: "Stati Uniti",
    flag: "🇺🇸",
    rating: 8,
    maxRating: 10,
    platform: "Booking.com",
    date: "Ottobre 2025",
  },
]

function StarRating({ rating, maxRating }: { rating: number; maxRating: number }) {
  const stars = maxRating === 5 ? rating : Math.round((rating / maxRating) * 5)
  return (
    <div className="flex gap-0.5 mb-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={i <= stars ? 'text-[#C9A96E]' : 'text-[#E8E3DE]'}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function PlatformBadge({ platform }: { platform: Review['platform'] }) {
  const colors: Record<Review['platform'], string> = {
    'Booking.com': 'bg-[#003580] text-white',
    'TripAdvisor': 'bg-[#00AA6C] text-white',
    'Google': 'bg-[#4285F4] text-white',
  }
  return (
    <span className={`inline-block text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm ${colors[platform]}`}>
      {platform}
    </span>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex-shrink-0 w-[340px] bg-white border border-[#E8E3DE] p-8 mx-3 flex flex-col">
      <StarRating rating={review.rating} maxRating={review.maxRating} />
      <blockquote className="font-[family-name:var(--font-display)] italic text-[#1C1C1C] text-[16px] leading-[1.7] mb-6 flex-1">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#E8E3DE]">
        <div>
          <p className="font-[family-name:var(--font-sans)] text-[13px] font-semibold text-[#242424]">
            {review.flag} {review.author}
          </p>
          <p className="font-[family-name:var(--font-sans)] text-[11px] text-[#9A9A9A] mt-0.5">
            {review.country} · {review.date}
          </p>
        </div>
        <PlatformBadge platform={review.platform} />
      </div>
    </div>
  )
}

export function ReviewsCarousel() {
  return (
    <div className="overflow-hidden relative">
      <div className="flex reviews-track py-2">
        {reviews.map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
        {/* Duplicate for seamless loop */}
        {reviews.map((r, i) => (
          <ReviewCard key={`dup-${i}`} review={r} />
        ))}
      </div>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F5F0E8] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F5F0E8] to-transparent" />
    </div>
  )
}
