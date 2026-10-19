import { useState, useEffect } from 'react';
import { 
  CheckCircle2, Building2, Hotel, Layers, FlaskConical, Gem, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function ServicesSection() {
  const segments = [
    {
      id: 'real-estate',
      title: 'Real Estate (Mahek Realty)',
      icon: Building2,
      category: 'PROPERTY DEVELOPMENT',
      description: 'A key division and trailblazer in Surat representing over 18 standout projects, from the elegance of Mahek IT Park to tranquil residential bungalows.',
      bullets: [
        '18+ Landmark projects commissioned',
        'Mahek IT Park, Mahek Icon & Diamond Park',
        'Master-planned industrial & commercial estates',
        'Bespoke luxury residential bungalows'
      ]
    },
    {
      id: 'hospitality',
      title: 'Hospitality (Hilton Collaboration)',
      icon: Hotel,
      category: 'REFINED HOSPITALITY',
      description: "Partnered with the prestigious Hilton Brand to introduce one of Gujarat's first Hiltons. A 9-story edifice with 104 luxury rooms, 2 restaurants, and 3 banquet halls.",
      bullets: [
        '1st Hilton Garden Inn in Gujarat',
        'Steps from Surat Railway Station',
        '104 contemporary guest rooms & suites',
        'Together & Co. & 3 banquet halls'
      ]
    },
    {
      id: 'textiles',
      title: 'Technical Textiles (Scap Group)',
      icon: Layers,
      category: 'SCAP TECHNO FAB PVT. LTD.',
      description: 'Transitioned from trading in 2008 to manufacturing PP Non-woven fabrics by 2011. ISO 9001:2015 certified, delivering 25M+ meters per annum to Fortune 500 clients.',
      bullets: [
        '25M+ meters annual production capacity',
        'ISO 9001:2015 certified operations',
        'Serving Fortune 500 corporate clients',
        'Advanced European extrusion technology'
      ]
    },
    {
      id: 'pharma',
      title: 'Pharmaceuticals (Mahek Life Science)',
      icon: FlaskConical,
      category: 'API INTERMEDIATES',
      description: 'Specializing in the chemical production of key intermediates CMH and R CMH, pivotal for the chemical synthesis of Pregabaline API therapeutic substance.',
      bullets: [
        'Specialized CMH & R CMH production',
        'Essential for Pregabaline API synthesis',
        'GMP compliant QA & analytical labs',
        'High-purity therapeutic supply chain'
      ]
    },
    {
      id: 'diamonds',
      title: 'Lab-Grown Diamonds (Omit Diamond)',
      icon: Gem,
      category: 'DIAMOND & GEMS DIVISION',
      description: "Pioneering ethical, precision lab-grown diamond manufacturing and cutting-edge diamond trade right in Surat, the world's premier diamond capital.",
      bullets: [
        'Ethical & eco-conscious diamond growth',
        'Surat diamond ecosystem integration',
        'High-clarity precision cut diamonds',
        'Global diamond market distribution'
      ]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Duplicate segments to create an infinite seamless forward loop without reverse scrolling
  const displaySegments = [...segments, ...segments];

  // Responsive items count: 1 on mobile, 2 on tablet, 3 on desktop
  useEffect(() => {
    const handleResize = () => {
      setIsTransitioning(false);
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous auto-play timer: strictly scrolls forward every 4.5 seconds (no reverse scrolling)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // When transition to clone completes, seamlessly snap back to index 0 with zero animation
  const handleTransitionEnd = () => {
    if (currentIndex >= segments.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(segments.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setCurrentIndex(segments.length - 1);
        });
      });
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToSlide = (idx) => {
    setIsTransitioning(true);
    setCurrentIndex(idx);
  };

  const activeIndex = currentIndex % segments.length;

  // Touch Swipe Handlers for mobile phones & tablets
  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  return (
    <section 
      id="services" 
      className="py-5 md:py-7 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Golden Aura Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#c59b27]/8 rounded-full blur-[140px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c59b27]/8 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Title and Carousel Navigation */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5">
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-neutral-900 tracking-tight">
            Diversified Portfolios of <br />
            <span className="gold-gradient-text">Mahek Real Estate</span>
          </h2>
          <p className="mt-2 sm:mt-2.5 text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed font-normal max-w-2xl mx-auto">
            Co-steering transformative growth across technical textiles, pharmaceuticals, real estate, lab-grown diamonds, and hospitality.
          </p>

          {/* Centered Carousel Arrow Buttons & Counter */}
          <div className="flex items-center justify-center gap-3 mt-3.5">
            <button
              onClick={handlePrev}
              aria-label="Previous portfolio segment"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-300 hover:border-[#c59b27] bg-white text-neutral-800 hover:text-[#9a7210] flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-xs font-bold text-neutral-500 font-mono select-none px-2">
              <span className="text-neutral-900 font-bold text-sm">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="mx-1 text-neutral-400">/</span>
              <span>{String(segments.length).padStart(2, '0')}</span>
            </div>
            <button
              onClick={handleNext}
              aria-label="Next portfolio segment"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-300 hover:border-[#c59b27] bg-white text-neutral-800 hover:text-[#9a7210] flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>


        {/* Carousel Slider Window */}
        <div 
          className="overflow-hidden relative touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {displaySegments.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.id}-${idx}`}
                  style={{ width: `${100 / itemsPerPage}%` }}
                  className="shrink-0 p-2 sm:p-3"
                >
                  <div className="h-full p-6 sm:p-8 rounded-2xl bg-white border border-[#c59b27]/25 hover:border-[#c59b27] transition-all duration-300 hover:shadow-[0_20px_35px_-10px_rgba(197,155,39,0.2)] flex flex-col justify-between group">
                    <div>
                      {/* Icon Container */}
                      <div className="w-14 h-14 rounded-xl bg-[#c59b27]/10 border border-[#c59b27]/30 flex items-center justify-center p-3 mb-5 group-hover:border-[#c59b27] group-hover:scale-105 transition-all">
                        <Icon className="w-7 h-7 text-[#c59b27]" />
                      </div>

                      <span className="text-[10px] font-bold tracking-widest uppercase text-[#9a7210] block mb-2">
                        {item.category}
                      </span>

                      <h3 className="text-lg sm:text-xl font-bold font-serif text-neutral-900 group-hover:text-[#9a7210] transition-colors mb-3">
                        {item.title}
                      </h3>

                      <p className="text-xs text-neutral-600 leading-relaxed mb-6 font-normal">
                        {item.description}
                      </p>
                    </div>

                    {/* Bullet Points */}
                    <div className="pt-4 border-t border-neutral-100 space-y-2 mt-auto">
                      {item.bullets.map((b, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-neutral-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#c59b27] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {segments.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 transition-all rounded-full cursor-pointer ${
                activeIndex === idx
                  ? 'w-8 bg-[#c59b27]'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
