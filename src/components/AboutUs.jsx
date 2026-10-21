import { ArrowRight, Award, ShieldCheck } from 'lucide-react';
import founderImg from '../assets/images/builder_founder.jpg';

export default function AboutUs({ onOpenContact }) {
  const pillars = [
    {
      num: '01',
      title: 'People. Passion. Progress.',
      description: 'We are fueled by a passion for creating enduring value and stand united in our vision of fostering sustainable urban growth across Gujarat.'
    },
    {
      num: '02',
      title: 'Over 40 Years of Excellence (Est. 1982)',
      description: "Founded in Surat, India in 1982, Mahek Real Estate has stood at the intersection of tradition and forward-thinking, delivering 18+ landmark commercial & residential developments."
    },
    {
      num: '03',
      title: 'Global Standards & Partnerships',
      description: "From our milestone collaboration with Hilton Worldwide introducing Gujarat's 1st Hilton Garden Inn to ISO 9001:2015 certified technical textiles, we redefine quality at every scale."
    }
  ];

  return (
    <section id="about" className="py-5 md:py-7 bg-white relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#c59b27]/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight">
            About <span className="gold-gradient-text">Mahek Real Estate</span>
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm md:text-base text-neutral-600 font-normal max-w-2xl mx-auto leading-relaxed">
            Over four decades of transformative real estate, industrial manufacturing, and world-class hospitality shaping Surat's skyline.
          </p>
        </div>


        {/* ============================================================ */}
        {/* 3 CORPORATE PILLARS & STORY */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="card-hover-fx p-6 sm:p-7 rounded-2xl bg-white border border-[#c59b27]/25 hover:border-[#c59b27] flex flex-col justify-between group hover:shadow-md"
            >
              <div>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#c59b27]/10 border border-[#c59b27]/30 flex items-center justify-center text-base sm:text-lg font-bold text-[#9a7210] mb-4 group-hover:scale-105 transition-transform">
                  {p.num}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-[#9a7210] transition-colors mb-2.5">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Bar */}
        <div className="mt-5 sm:mt-6 p-4 sm:p-5 rounded-2xl bg-white border border-[#c59b27]/30 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 sm:gap-6 hover:shadow-md transition-shadow">
          <div>
            <h4 className="text-base sm:text-lg md:text-xl font-bold text-neutral-900 mb-1">
              Connect Directly with Mahek Real Estate
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 font-normal">
              Schedule a confidential corporate consultation for commercial developments, investment partnerships, or VIP off-plan allocations.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#c59b27] hover:bg-[#aa7f17] hover:shadow-[0_8px_20px_rgba(197,155,39,0.3)] transition-all duration-300 whitespace-nowrap hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Inquire With Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
