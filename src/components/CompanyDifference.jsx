import iconAmbition from '../assets/images/DASC_DascoDifference_Ambition_Icon_667827ff-c687-4536-8453-b2ed7cad1e36_100x100.svg';
import iconPurpose from '../assets/images/DASC_DascoDifference_Purpose_Icon_daf5d44f-6755-4cd0-b48f-5fa7e5388d4e_100x100.svg';
import iconExcellence from '../assets/images/DASC_DascoDifference_OurValues_Icon_Excellence_80x80.svg';
import iconRespect from '../assets/images/DASC_DascoDifference_OurValues_Icon_Respect_80x80.svg';
import iconPartnership from '../assets/images/DASC_DascoDifference_OurValues_Icon_Partnership_80x80.svg';
import iconReliability from '../assets/images/DASC_DascoDifference_OurValues_Icon_Reliability_80x80.svg';
import iconSafety from '../assets/images/DASC_DascoDifference_OurValues_Icon_Safety_80x80.svg';

export default function CompanyDifference() {
  const values = [
    { title: 'Excellence', icon: iconExcellence, desc: 'Setting the highest benchmarks in build quality.' },
    { title: 'Respect', icon: iconRespect, desc: 'Valuing our team, community, and environment.' },
    { title: 'Partnership', icon: iconPartnership, desc: 'Transparent collaboration with every investor.' },
    { title: 'Reliability', icon: iconReliability, desc: 'On-time delivery and steadfast accountability.' },
    { title: 'Safety', icon: iconSafety, desc: 'Uncompromised safety across all project sites.' }
  ];

  return (
    <section id="difference" className="py-6 md:py-8 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#c59b27]/30 text-xs font-bold uppercase tracking-widest text-[#9a7210] mb-3">
            <span>Foundational Philosophy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-neutral-900 tracking-tight">
            The Mahek <span className="gold-gradient-text">Difference</span>
          </h2>
          <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
            What sets our conglomerate apart: an unwavering dedication to People, Passion, and Progress across all our industries.
          </p>
        </div>

        {/* Ambition & Purpose Two Major Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Ambition */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#c59b27]/30 hover:border-[#c59b27] transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6 group hover:shadow-xl">
            <div className="w-20 h-20 rounded-xl bg-white border border-[#c59b27]/40 flex items-center justify-center p-4 flex-shrink-0 group-hover:scale-105 transition-transform">
              <img
                src={iconAmbition}
                alt="Ambition"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9a7210] font-bold block mb-1">Pillar One</span>
              <h3 className="text-2xl font-bold font-serif text-neutral-900 mb-3 group-hover:text-[#9a7210] transition-colors">
                Ambition
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed font-normal">
                Creating with care to help our communities prosper. We pursue ambitious architectural milestones, building vibrant spaces that foster long-term prosperity.
              </p>
            </div>
          </div>

          {/* Card 2: Purpose */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#c59b27]/30 hover:border-[#c59b27] transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6 group hover:shadow-xl">
            <div className="w-20 h-20 rounded-xl bg-white border border-[#c59b27]/40 flex items-center justify-center p-4 flex-shrink-0 group-hover:scale-105 transition-transform">
              <img
                src={iconPurpose}
                alt="Purpose"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9a7210] font-bold block mb-1">Pillar Two</span>
              <h3 className="text-2xl font-bold font-serif text-neutral-900 mb-3 group-hover:text-[#9a7210] transition-colors">
                Purpose
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed font-normal">
                Deliver the best possible outcomes for a more liveable future. Every blueprint and construction decision is guided by purposeful living and ecological responsibility.
              </p>
            </div>
          </div>

        </div>

        {/* Our 5 Values Cards Grid */}
        <div className="bg-white border border-[#c59b27]/25 rounded-2xl p-8 sm:p-12 hover:shadow-lg transition-shadow duration-300">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-[#9a7210] font-bold block mb-1">Guiding Principles</span>
            <h3 className="text-2xl font-bold font-serif text-neutral-900">Our Core Values</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-5 rounded-2xl bg-white border border-neutral-200/90 hover:border-[#c59b27] transition-all duration-300 text-center flex flex-col items-center group hover:shadow-md"
              >
                <div className="w-14 h-14 rounded-xl bg-white border border-[#c59b27]/30 flex items-center justify-center p-2.5 mb-3 group-hover:scale-110 transition-transform">
                  <img
                    src={v.icon}
                    alt={v.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="text-base font-bold font-serif text-neutral-900 group-hover:text-[#9a7210] transition-colors mb-1">
                  {v.title}
                </h4>
                <p className="text-[11px] text-neutral-500 leading-snug font-medium">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
