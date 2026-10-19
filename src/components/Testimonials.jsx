import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import avatar1 from '../assets/images/31.jpg';
import avatar2 from '../assets/images/elizabeth-favre-4e3a01fe645f44869b1f2a8aa21f3ab2_100x100.jpg';
import avatar3 from '../assets/images/people-headshot-lindsay-kimble-9855440283c440159d1684a4befaa97d_100x100.jpg';
import avatar4 from '../assets/images/Chris-Pratt_small.avif';
import avatar5 from '../assets/images/17.jpg';
import avatar6 from '../assets/images/52.jpg';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Patel',
      role: 'Managing Director, FinTech Solutions',
      avatar: avatar1,
      project: 'Mahek IT Park, Katargam',
      text: 'Securing our regional operations at Mahek IT Park has transformed our workflow. The seismic-resilient engineering, uninterrupted power redundancy, and central Katargam location near Kiran Hospital give our enterprise an undeniable edge.',
      rating: 5
    },
    {
      id: 2,
      name: 'Arun Singhania',
      role: 'VP of Supply Chain, Global Packaging Corp',
      avatar: avatar2,
      project: 'Scap Group (SCAP Techno Fab Pvt. Ltd.)',
      text: 'We have sourced millions of meters of non-woven polypropylene technical fabrics from Scap Group. Their tensile strength consistency, rapid container dispatch, and ISO 9001:2015 quality standards make them an invaluable industrial partner.',
      rating: 5
    },
    {
      id: 3,
      name: 'Pooja Shah',
      role: 'Luxury Villa Resident',
      avatar: avatar3,
      project: 'Mahek Villas & Bungalows, Surat',
      text: 'Living in a Mahek master-planned community is an experience in enduring luxury. From the imported marble finishes to private landscaped gardens and 24/7 gated security, the craftsmanship honors their four decades of trust.',
      rating: 5
    },
    {
      id: 4,
      name: 'Dr. Sanjay Mehta',
      role: 'Procurement Director, API Formulations',
      avatar: avatar4,
      project: 'Mahek Life Science (Pharma Division)',
      text: 'Mahek Life Science’s supply of high-purity CMH and R CMH intermediates has consistently met our strict cGMP regulatory specifications for Pregabaline bulk drugs. A remarkably reliable chemical manufacturing conglomerate.',
      rating: 5
    },
    {
      id: 5,
      name: 'Harshvardhan Kothari',
      role: 'Hospitality Partner & Investor',
      avatar: avatar5,
      project: 'Hilton Garden Inn Surat',
      text: 'Introducing Gujarat’s first Hilton Garden Inn alongside Mahek Real Estate has redefined Surat’s hospitality horizon. Their institutional governance, architectural foresight, and execution speed are unmatched in the region.',
      rating: 5
    },
    {
      id: 6,
      name: 'Deepak Jariwala',
      role: 'Commercial Space Owner',
      avatar: avatar6,
      project: 'Mahek Icon, Sumul Dairy Road',
      text: 'Investing in commercial retail and corporate suites at Mahek Icon was one of our best financial decisions. Exceptional footfall, high rental yield, and premier building management that maintains high asset value.',
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect responsive breakpoint (Mobile shows 1 card, Desktop/Tablet shows 2 cards)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Split reviews into slides (2 reviews per slide on desktop, 1 on mobile)
  const chunkSize = isMobile ? 1 : 2;
  const baseSlides = [];
  for (let i = 0; i < testimonials.length; i += chunkSize) {
    baseSlides.push(testimonials.slice(i, i + chunkSize));
  }

  // Append clone of the first slide at the end for an endless forward loop without rewind
  const displaySlides = [...baseSlides, baseSlides[0]];

  // Reset index if screen resized
  useEffect(() => {
    setIsTransitioning(false);
    setCurrentIndex(0);
  }, [isMobile]);

  // Auto-scroll forward timer (strictly forward, no reverse)
  useEffect(() => {
    if (isPaused || baseSlides.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, baseSlides.length]);

  // When transition to clone completes, snap to index 0 with no animation (invisible forward loop)
  const handleTransitionEnd = () => {
    if (currentIndex >= baseSlides.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  const next = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(baseSlides.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setCurrentIndex(baseSlides.length - 1);
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

  const activeDot = currentIndex % baseSlides.length;

  return (
    <section className="py-5 md:py-6 bg-white relative overflow-hidden">
      {/* Decorative Aura */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#c59b27]/8 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-3 md:mb-5">
         
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-neutral-900 tracking-tight">
            Our Sweet <span className="gold-gradient-text">Clients Say</span>
          </h2>
          <p className="mt-2 text-neutral-600 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-normal leading-relaxed">
            Verified feedback from corporate enterprise tenants, industrial partners, healthcare leaders, and luxury homeowners.
          </p>

          {/* Centered Navigation Controls */}
          <div className="flex items-center justify-center gap-3 mt-3">
            <button
              onClick={prev}
              aria-label="Previous Testimonials"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#c59b27]/30 hover:border-[#c59b27] text-neutral-800 hover:text-[#9a7210] flex items-center justify-center transition-all hover:scale-105 hover:shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next Testimonials"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#c59b27] hover:bg-[#aa7f17] text-white font-bold flex items-center justify-center transition-all hover:scale-105 hover:shadow-[0_4px_15px_rgba(197,155,39,0.3)] cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>


        {/* Auto Scroll Slider Container (Infinite Forward Loop) */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Animated Track with Seamless Loop Transition */}
          <div 
            onTransitionEnd={handleTransitionEnd}
            className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {displaySlides.map((pair, pIdx) => (
              <div 
                key={pIdx} 
                className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6 px-1"
              >
                {pair.map((t, cardIdx) => (
                  <div
                    key={`${t.id}-${pIdx}-${cardIdx}`}
                    className="p-6 sm:p-7 rounded-2xl bg-white border border-[#c59b27]/25 hover:border-[#c59b27] hover:shadow-[0_15px_35px_-10px_rgba(197,155,39,0.2)] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Stars + Quote Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#c59b27] text-[#c59b27]" />
                          ))}
                        </div>
                        <Quote className="w-7 h-7 text-[#c59b27]/30" />
                      </div>

                      {/* Quote Text */}
                      <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed mb-6 italic font-normal">
                        "{t.text}"
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-3.5 pt-4 border-t border-neutral-100">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#c59b27]/50"
                      />
                      <div>
                        <h4 className="text-sm font-bold font-serif text-neutral-900">{t.name}</h4>
                        <p className="text-xs text-[#9a7210] font-bold">{t.role}</p>
                        <span className="text-[10px] text-neutral-500 font-medium block">{t.project}</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-6">
          {baseSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeDot
                  ? 'w-7 bg-[#c59b27]'
                  : 'w-2 bg-neutral-300 hover:bg-[#c59b27]/50'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
