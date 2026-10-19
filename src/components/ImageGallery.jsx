import { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft, ChevronRight, MapPin, Calendar,
  Building2, Sparkles, Image as ImageIcon,
  CheckCircle2, ArrowRight
} from 'lucide-react';

const GALLERY_ITEMS = [
  {
    id: 'expo-vip-showcase',
    src: '/gallery/expo-vip-showcase.jpg',
    category: 'expo',
    categoryLabel: 'SEBA Property Expo',
    title: 'HALO Property Expo 2026 — VIP Delegation & Executive Team',
    subtitle: 'Surat East Builders Association (SEBA) 24·25·26 April 2026',
    location: 'Anthem Circle, Valthan - Punagam Rd, Outer Ringroad, Surat',
    date: 'April 24-26, 2026',
    description: 'Mahek Group leadership and delegates welcoming distinguished guests and patrons at the premier HALO Property Expo showcase.',
    badge: 'VIP Showcase',
    tag: 'SEBA Expo 2026'
  },
  {
    id: 'expo-leadership',
    src: '/gallery/expo-leadership.jpg',
    category: 'expo',
    categoryLabel: 'SEBA Property Expo',
    title: 'HALO Property Expo 2026 — Executive Leadership',
    subtitle: 'Surat East Builders Association (SEBA) 24·25·26 April 2026',
    location: 'Anthem Circle, Valthan - Punagam Rd, Outer Ringroad, Surat',
    date: 'April 24-26, 2026',
    description: 'Executive leadership presenting Mahek Group’s landmark projects: The Mahek Park-1, Orange Mahek Park, Mahek I.T. Park, and The AM Park at the premier SEBA convention.',
    badge: 'Leadership Presence',
    tag: 'SEBA Expo 2026'
  },
  {
    id: 'expo-team',
    src: '/gallery/expo-team.png',
    category: 'expo',
    categoryLabel: 'SEBA Property Expo',
    title: 'Surat East Builders Association — Delegation Team',
    subtitle: 'HALO Property Expo 2026 Pavilion Presence',
    location: 'Anthem Circle, Valthan - Punagam Rd, Outer Ringroad, Surat',
    date: 'April 2026',
    description: 'The Mahek Group executive delegation and development team welcoming builders, investors, and home seekers at the prestigious HALO Property Expo.',
    badge: 'Delegation Team',
    tag: 'Surat East Builders'
  },
  {
    id: 'it-park-elevation',
    src: '/gallery/it-park-elevation.jpg',
    category: 'commercial',
    categoryLabel: 'Mahek IT Park',
    title: 'Mahek IT Park — Ideal Office Space & Tower Elevation',
    subtitle: 'Iconic Corporate High-Rise Architecture',
    location: 'Magan Wadi, Naginawadi Rd, Beside RJD Complex, Katargam, Surat',
    date: 'Bookings Open',
    description: 'Next-generation IT infrastructure featuring open-span columnless office floors, modern glazing, and state-of-the-art corporate amenities in prime Katargam.',
    badge: 'Commercial Landmark',
    tag: 'Ideal Office Space'
  },
  {
    id: 'expo-showcase',
    src: '/gallery/expo-showcase.jpg',
    category: 'expo',
    categoryLabel: 'SEBA Property Expo',
    title: 'HALO Property Expo 2026 — Project Model Pavilion',
    subtitle: 'Live Interactive Exhibitions & Model Unveilings',
    location: 'Anthem Circle, Valthan - Punagam Rd, Outer Ringroad, Surat',
    date: 'April 2026',
    description: 'Showcasing scale architectural mockups, master plan walkthroughs, and investment counseling for Mahek Park-1, Orange Mahek Park, and Mahek IT Park.',
    badge: 'Live Pavilion',
    tag: 'Model Showcase'
  },
  {
    id: 'it-park-terrace',
    src: '/gallery/it-park-terrace.jpg',
    category: 'commercial',
    categoryLabel: 'Mahek IT Park',
    title: 'The Future of IT is Here — Showrooms & Corporate Suites',
    subtitle: 'Lush Sky-Decks, Executive Terraces & Glass Facades',
    location: 'Magan Wadi, Naginawadi Rd, Katargam, Surat',
    date: 'Bookings Open',
    description: 'Elevated lifestyle workspaces combining panoramic rooftop greenery, triple-height premium retail showrooms, and multi-tier tech-ready corporate floors.',
    badge: 'Sky Terraces',
    tag: 'Corporate Hub'
  }
];

export default function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState('all'); // 'all' | 'expo' | 'commercial'
  const spotlightRef = useRef(null);

  const filteredItems = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  // Keep index within filtered bounds
  const activeItem = filteredItems[currentIndex] || filteredItems[0] || GALLERY_ITEMS[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const thumbnailsRef = useRef(null);
  const isFirstRender = useRef(true);

  // Auto-scroll active thumbnail inside the thumbnail strip container only on user interaction (never on initial mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (thumbnailsRef.current && thumbnailsRef.current.children[currentIndex]) {
      const container = thumbnailsRef.current;
      const activeBtn = container.children[currentIndex];
      if (activeBtn) {
        const scrollLeft = activeBtn.offsetLeft - (container.clientWidth / 2) + (activeBtn.clientWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const selectItemById = (id) => {
    const idx = filteredItems.findIndex((it) => it.id === id);
    if (idx !== -1) {
      setCurrentIndex(idx);
    } else {
      // Switch filter to match this item
      const item = GALLERY_ITEMS.find((it) => it.id === id);
      if (item) {
        setFilter('all');
        const allIdx = GALLERY_ITEMS.findIndex((it) => it.id === id);
        setCurrentIndex(allIdx !== -1 ? allIdx : 0);
      }
    }
    // Smoothly scroll spotlight into view
    if (spotlightRef.current) {
      spotlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const expoCount = GALLERY_ITEMS.filter((item) => item.category === 'expo').length;
  const commercialCount = GALLERY_ITEMS.filter((item) => item.category === 'commercial').length;

  return (
    <section
      id="gallery"
      className="py-10 md:py-16 bg-gradient-to-b from-white via-neutral-50/60 to-white border-t border-[#c59b27]/25 relative overflow-hidden"
    >
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-64 bg-[#c59b27]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
           
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
              Event Exhibitions & Project Gallery
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm mt-1 max-w-2xl">
              Glimpse into Mahek Group’s presence at the Surat East Builders Association (SEBA) HALO Property Expo and prime commercial developments.
            </p>
          </div>

          {/* Filter Option Selection (Responsive scrollable pills on small screens, elegant pill group on desktop) */}
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap md:flex-nowrap">
              <button
                type="button"
                onClick={() => { setFilter('all'); setCurrentIndex(0); }}
                className={`group flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                  filter === 'all'
                    ? 'bg-[#c59b27] text-white border-[#c59b27] shadow-sm'
                    : 'bg-white text-neutral-700 border-neutral-200/90 hover:border-[#c59b27]/60 hover:text-[#9a7210]'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${filter === 'all' ? 'text-white' : 'text-[#c59b27]'}`} />
                <span>All Images</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold transition-colors ${
                  filter === 'all' ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600 group-hover:bg-[#c59b27]/10 group-hover:text-[#9a7210]'
                }`}>
                  {GALLERY_ITEMS.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => { setFilter('expo'); setCurrentIndex(0); }}
                className={`group flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                  filter === 'expo'
                    ? 'bg-[#c59b27] text-white border-[#c59b27] shadow-sm'
                    : 'bg-white text-neutral-700 border-neutral-200/90 hover:border-[#c59b27]/60 hover:text-[#9a7210]'
                }`}
              >
                <Building2 className={`w-3.5 h-3.5 ${filter === 'expo' ? 'text-white' : 'text-[#c59b27]'}`} />
                <span>SEBA Expo 2026</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold transition-colors ${
                  filter === 'expo' ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600 group-hover:bg-[#c59b27]/10 group-hover:text-[#9a7210]'
                }`}>
                  {expoCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => { setFilter('commercial'); setCurrentIndex(0); }}
                className={`group flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                  filter === 'commercial'
                    ? 'bg-[#c59b27] text-white border-[#c59b27] shadow-sm'
                    : 'bg-white text-neutral-700 border-neutral-200/90 hover:border-[#c59b27]/60 hover:text-[#9a7210]'
                }`}
              >
                <Building2 className={`w-3.5 h-3.5 ${filter === 'commercial' ? 'text-white' : 'text-[#c59b27]'}`} />
                <span>Mahek IT Park</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold transition-colors ${
                  filter === 'commercial' ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600 group-hover:bg-[#c59b27]/10 group-hover:text-[#9a7210]'
                }`}>
                  {commercialCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* IN-PAGE SPOTLIGHT VIEWER (No Full-Screen Modal) */}
        {/* ============================================================ */}
        <div
          ref={spotlightRef}
          className="scroll-mt-24 sm:scroll-mt-28 bg-white rounded-2xl border border-[#c59b27]/30 overflow-hidden mb-8 transition-all hover:border-[#c59b27] hover:shadow-[0_8px_30px_rgba(197,155,39,0.12)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px] md:min-h-[520px]">

            {/* Left: Interactive In-Page Image Viewport */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="lg:col-span-7 xl:col-span-8 bg-neutral-950 relative flex items-center justify-center p-3 sm:p-5 overflow-hidden group touch-pan-y select-none min-h-[300px] sm:min-h-[420px]"
            >
              {/* Subtle backdrop blur effect */}
              <img
                src={activeItem.src}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
              />

              {/* Main Display Image (In-page only, no lightbox trigger) */}
              <img
                src={activeItem.src}
                alt={activeItem.title}
                className="relative z-10 max-h-[360px] sm:max-h-[500px] w-auto max-w-full object-contain rounded-lg transition-transform duration-300"
              />

              {/* Counter Badge */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-white/90 border border-white/15">
                {String(currentIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
              </div>

              {/* In-Page Navigation Buttons */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-[#c59b27] text-neutral-900 hover:text-white border border-neutral-200 hover:border-[#c59b27] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-[#c59b27] text-neutral-900 hover:text-white border border-neutral-200 hover:border-[#c59b27] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Mobile Interactive Dot Indicators */}
              <div className="sm:hidden absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                {filteredItems.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => setCurrentIndex(dotIdx)}
                    aria-label={`Go to photo ${dotIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      dotIdx === currentIndex
                        ? 'w-5 bg-[#c59b27]'
                        : 'w-1.5 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>

              <div className="hidden sm:flex absolute bottom-3 left-4 right-4 z-20 items-center justify-between text-[11px] text-white/70">
                <span className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
                  Interactive in-page viewer
                </span>
                <span className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
                  Swipe or select thumbnails
                </span>
              </div>
            </div>

            {/* Right: Rich Image Details & Metadata */}
            <div className="lg:col-span-5 xl:col-span-4 p-5 sm:p-7 flex flex-col justify-between bg-white">
              
              {/* Thumbnail Strip for Fast Selection (Directly beneath image on mobile, bottom on desktop) */}
              <div className="order-first lg:order-last pb-5 mb-5 lg:pb-0 lg:mb-0 lg:pt-5 lg:mt-5 border-b lg:border-b-0 lg:border-t border-[#c59b27]/20">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Select Photo</span>
                    <span className="text-[#9a7210] font-semibold">({currentIndex + 1} of {filteredItems.length})</span>
                  </span>
                  <span className="text-[11px] font-medium text-neutral-400 hidden sm:inline">
                    Tap thumbnail to view
                  </span>
                </div>

                {/* Horizontally scrollable on mobile, flexible grid on desktop */}
                <div
                  ref={thumbnailsRef}
                  className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 sm:grid sm:grid-cols-6 sm:gap-2"
                >
                  {filteredItems.map((item, idx) => {
                    const isSelected = idx === currentIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`View photo ${idx + 1}: ${item.title}`}
                        className={`relative w-14 h-14 sm:w-auto aspect-square shrink-0 sm:shrink rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#c59b27] ring-2 ring-[#c59b27]/30 scale-105 shadow-sm'
                            : 'border-neutral-200 opacity-60 hover:opacity-100 hover:border-neutral-400'
                        }`}
                      >
                        <img
                          src={item.src}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#c59b27]/15 flex items-center justify-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#c59b27] ring-2 ring-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Text metadata & specifications */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#9a7210] uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{activeItem.categoryLabel} • {activeItem.tag}</span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-neutral-900 leading-snug">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs font-semibold text-neutral-500 mt-1">
                    {activeItem.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {activeItem.description}
                </p>

                {/* Information Pills */}
                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <div className="flex items-start gap-2 text-xs text-neutral-700">
                    <MapPin className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                    <span className="font-medium">{activeItem.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-700">
                    <Calendar className="w-4 h-4 text-[#c59b27] shrink-0" />
                    <span className="font-medium">{activeItem.date}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* ALL 6 IMAGES MAGAZINE GRID (Click switches in-page spotlight) */}
        {/* ============================================================ */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#c59b27]" />
              <span>Explore All Gallery Items ({GALLERY_ITEMS.length})</span>
            </h4>
            <span className="text-xs text-neutral-500">
              Click any image to view in spotlight
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {GALLERY_ITEMS.map((item, idx) => {
              const isActiveInSpotlight = activeItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => selectItemById(item.id)}
                  className={`group relative bg-white rounded-xl border overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#c59b27] hover:shadow-[0_8px_25px_rgba(197,155,39,0.15)] hover:-translate-y-1 ${
                    isActiveInSpotlight
                      ? 'border-[#c59b27] ring-2 ring-[#c59b27]/30'
                      : 'border-neutral-200'
                  }`}
                >
                  {/* Image Container with Fixed Aspect Ratio */}
                  <div className="relative aspect-[4/5] bg-neutral-900 overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient overlay on card */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Active Indicator Pin */}
                    {isActiveInSpotlight && (
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-white text-[#9a7210]">
                        <CheckCircle2 className="w-3 h-3 text-[#c59b27]" />
                        <span>Viewing</span>
                      </div>
                    )}

                    {/* Bottom Card Title & Location */}
                    <div className="absolute bottom-0 inset-x-0 p-3 text-white">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#dfb743]">
                        {item.categoryLabel}
                      </p>
                      <h5 className="text-xs font-bold leading-snug line-clamp-2 mt-0.5 text-white/95">
                        {item.title}
                      </h5>
                      <p className="text-[10px] text-white/70 line-clamp-1 mt-1 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-[#c59b27] shrink-0" />
                        <span>{item.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="p-2.5 bg-white border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-neutral-700 group-hover:text-[#9a7210] transition-colors">
                    <span>{isActiveInSpotlight ? 'Currently Featured' : 'View in Spotlight'}</span>
                    <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-[#c59b27] transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
