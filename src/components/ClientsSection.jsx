export default function ClientsSection() {
  const partners = [
    {
      id: 1,
      name: 'SG Maruti Developers',
      role: 'Joint Venture Developer',
      img: '/partners/sg-maruti.png',
      alt: 'SG Maruti Developers - Joint Venture Partner'
    },
    {
      id: 2,
      name: 'Anthems Corporation',
      role: 'Strategic Developer',
      img: '/partners/anthems-corporation.png',
      alt: 'Anthems Corporation - Industrial & Realty Developer'
    },
    {
      id: 3,
      name: 'Parshwa Group',
      role: 'Development Partner',
      img: '/partners/parshwa-group.png',
      alt: 'Parshwa Group - Development Partner'
    },
    {
      id: 4,
      name: 'Angel Group',
      role: 'Infrastructure Partner',
      img: '/partners/angel-group.png',
      alt: 'Angel Group - Infrastructure & Commercial Partner'
    },
    {
      id: 5,
      name: 'Atmiya Group',
      role: 'Developer Alliance',
      img: '/partners/atmiya-group.png',
      alt: 'Atmiya Group - Developer Alliance Partner'
    },
    {
      id: 6,
      name: 'Orange Group',
      role: 'Industrial & Realty',
      img: '/partners/orange-group.png',
      alt: 'Orange Group - Industrial Estate Development'
    },
    {
      id: 7,
      name: 'Amaara',
      role: 'Architectural Living',
      img: '/partners/amaara.png',
      alt: 'Amaara - Architectural Living & Developments'
    },
    {
      id: 8,
      name: 'Kyros Developers',
      role: 'Master-Planned Estates',
      img: '/partners/kyros-developers.png',
      alt: 'Kyros Developers - Master-Planned Estates'
    }
  ];

  return (
    <section id="clients" className="py-3 sm:py-4 md:py-5 bg-white border-y border-[#c59b27]/20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Matching 'Our Developer Family' Theme */}
        <div className="text-center mb-3 sm:mb-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-neutral-900 tracking-tight">
            Our <span className="gold-gradient-text">Developer Family</span>
          </h2>
          
          <p className="mt-1 text-xs sm:text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
            Strategic alliances and consortium partners collaborating with Mahek Group across Gujarat's premier industrial, commercial, and residential developments.
          </p>
        </div>

        {/* 8-Partner Developer Grid (2 cols on mobile, 4 cols on tablet & desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-3.5 items-stretch">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="card-hover-fx group px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-white border border-[#c59b27]/25 hover:border-[#c59b27] flex flex-col items-center justify-between hover:shadow-[0_10px_25px_rgba(197,155,39,0.16)] cursor-default"
            >
              {/* Logo Area (Compact top/bottom padding, large clear logo) */}
              <div className="w-full flex-1 flex items-center justify-center py-1 sm:py-1.5 px-2 bg-neutral-50/70 rounded-lg sm:rounded-xl border border-neutral-100 group-hover:bg-white group-hover:border-[#c59b27]/25 transition-all duration-300">
                <img
                  src={partner.img}
                  alt={partner.alt}
                  className="h-12 sm:h-16 md:h-18 max-h-[60px] sm:max-h-[72px] w-auto max-w-[94%] object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Title & Role */}
              <div className="w-full pt-1 sm:pt-1.5 text-center">
                <p className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-[#9a7210] transition-colors truncate leading-tight">
                  {partner.name}
                </p>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-500 font-semibold truncate mt-0.5">
                  {partner.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
