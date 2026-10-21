import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileWarning, ArrowLeft, Home, ChevronRight, Calendar,
  Building2, Mail, Phone, MapPin, FileText, CheckCircle2,
  AlertTriangle, ShieldAlert
} from 'lucide-react';

export default function DisclaimerPage() {
  useEffect(() => {
    document.title = 'Disclaimer | Mahek Group of Companies';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Official Disclaimer for Mahek Group of Companies. Read our property disclosures, pricing indicators, architectural renderings notes, and terms of use.'
      );
    }
  }, []);

  const sections = [
    {
      id: 'general-information',
      number: '1',
      title: 'General Information',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            The information provided on the Mahek Group of Companies website is intended for general informational purposes only.
          </p>
          <p>
            The website presents information about our group, business divisions, real estate projects, hospitality activities, technical textiles, pharmaceuticals, lab-grown diamonds, and related business interests.
          </p>
          <p>
            Although we aim to provide accurate and current information, we do not warrant that all website content is complete, accurate, current, or free from errors or omissions.
          </p>
        </div>
      ),
    },
    {
      id: 'real-estate-project-information',
      number: '2',
      title: 'Real Estate Project Information',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            Project descriptions, photographs, architectural renderings, floor plans, layouts, specifications, amenities, location details, development timelines, and other property-related information are provided for general reference.
          </p>
          <p>
            Actual project features, specifications, dimensions, facilities, construction progress, possession dates, and availability may differ from the information displayed on this website.
          </p>
          <p className="bg-[#faf8f2] p-3 sm:p-4 rounded-xl border border-[#c59b27]/25 text-xs sm:text-sm">
            All project information is subject to change without prior notice, where legally permitted. Prospective buyers, investors, tenants, and other interested parties should independently verify the relevant details with the authorized project representative before making a decision or entering into a transaction.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600">
            The information on this website does not replace the applicable agreements, approved plans, statutory disclosures, or other formal project documentation.
          </p>
        </div>
      ),
    },
    {
      id: 'prices-availability-and-offers',
      number: '3',
      title: 'Prices, Availability, and Offers',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            Any prices, payment details, offers, availability information, or commercial terms displayed on the website are indicative unless expressly stated otherwise in an official written offer or agreement.
          </p>
          <p>
            Prices and availability may change due to market conditions, inventory, taxes, government charges, project specifications, or other relevant factors.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 italic">
            Please contact the authorized representative to confirm current prices, applicable charges, availability, terms, and conditions before proceeding.
          </p>
        </div>
      ),
    },
    {
      id: 'images-renderings-visual-representations',
      number: '4',
      title: 'Images, Renderings, and Visual Representations',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            Images, videos, illustrations, architectural renderings, and other visual materials on this website may be used to communicate the design, concept, or intended appearance of a project or business.
          </p>
          <p>
            Certain visuals may be illustrative or representative and may not depict the final completed property, actual dimensions, furnishings, surroundings, landscaping, or facilities.
          </p>
          <p className="text-xs sm:text-sm text-neutral-800 font-medium">
            Actual results and completed developments may vary from the representations shown.
          </p>
        </div>
      ),
    },
    {
      id: 'no-professional-advice',
      number: '5',
      title: 'No Professional or Investment Advice',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs sm:text-sm text-amber-950 font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#c59b27] shrink-0" />
            <span>Information on this website does not constitute legal, financial, tax, investment, medical, pharmaceutical, or other professional advice.</span>
          </div>
          <p>
            References to real estate opportunities, business activities, products, or services should not be interpreted as a guarantee of profitability, investment returns, future performance, or suitability for a particular purpose.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600">
            Visitors should seek independent professional advice where appropriate before making financial, investment, property, health-related, or other significant decisions.
          </p>
        </div>
      ),
    },
    {
      id: 'business-divisions-and-brands',
      number: '6',
      title: 'Business Divisions and Third-Party Brands',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            Mahek Group operates across multiple business sectors and may refer to affiliated companies, independent business entities, collaborators, suppliers, partners, or third-party brands.
          </p>
          <p>
            Such references are provided for identification and informational purposes. Unless expressly stated in a formal agreement or official disclosure, references to a business, partner, brand, or project should not be interpreted as establishing a legal partnership, agency, endorsement, or guarantee.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600">
            Third-party products, services, statements, and representations remain subject to the terms and responsibilities of their respective providers.
          </p>
        </div>
      ),
    },
    {
      id: 'external-links',
      number: '7',
      title: 'External Links',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            Our website may include links to external websites for convenience or additional information.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
            We do not control and are not responsible for the availability, accuracy, security, policies, or content of external websites. Visiting an external website is at your own discretion and subject to that website's terms and policies.
          </p>
        </div>
      ),
    },
    {
      id: 'website-availability',
      number: '8',
      title: 'Website Availability and Technical Errors',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            We make reasonable efforts to maintain website availability and functionality. However, we do not guarantee uninterrupted, error-free, or continuously available access.
          </p>
          <p>
            The website may occasionally be unavailable due to maintenance, technical issues, connectivity problems, security measures, or circumstances beyond our reasonable control.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600">
            We reserve the right to modify, suspend, or discontinue website features or content, subject to applicable law.
          </p>
        </div>
      ),
    },
    {
      id: 'limitation-of-liability',
      number: '9',
      title: 'Limitation of Liability',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            To the extent permitted by applicable law, Mahek Group shall not be liable for losses arising from reliance on inaccurate or incomplete website information, temporary website unavailability, technical errors, or the use of external websites.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
            Nothing in this Disclaimer excludes or limits liability where such exclusion or limitation is prohibited by applicable law. This Disclaimer does not affect any rights or remedies that cannot lawfully be excluded.
          </p>
        </div>
      ),
    },
    {
      id: 'intellectual-property',
      number: '10',
      title: 'Intellectual Property',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            Unless otherwise indicated, website content, including text, graphics, photographs, logos, design elements, and other materials, is owned by or used with permission by the relevant rights holder.
          </p>
          <p>
            You may not reproduce, republish, distribute, modify, or commercially exploit protected content without prior authorization, except where permitted by law.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600">
            Third-party names, trademarks, and logos remain the property of their respective owners.
          </p>
        </div>
      ),
    },
    {
      id: 'changes-to-disclaimer',
      number: '11',
      title: 'Changes to This Disclaimer',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            We may revise this Disclaimer periodically to reflect changes to our website, business operations, or applicable legal requirements.
          </p>
          <p className="text-xs sm:text-sm">
            Updated versions will be published on this page with a revised “Last Updated” date. Continued use of the website after changes are published is subject to applicable law.
          </p>
        </div>
      ),
    },
    {
      id: 'contact-us',
      number: '12',
      title: 'Contact Us',
      content: (
        <div className="space-y-4 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            For questions about this Disclaimer or information published on our website, please contact:
          </p>
          <div className="bg-[#faf8f2] rounded-xl p-4 sm:p-5 border border-[#c59b27]/30 space-y-3">
            <h4 className="font-bold font-serif text-neutral-900 text-base">
              Mahek Group of Companies
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                <span>
                  Mahek IT Park, Opp. R.J.D. Business Hub, F.P. No. 11, T.P.S. No. 03, Katargam, Surat, Gujarat – 395004, India.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c59b27] shrink-0" />
                <a href="mailto:info.mahekrealestate@gmail.com" className="text-[#9a7210] hover:underline font-semibold">
                  info.mahekrealestate@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c59b27] shrink-0" />
                <a href="tel:+919377744633" className="text-[#9a7210] hover:underline font-semibold">
                  +91 93777 44633
                </a>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Top Breadcrumb Bar */}
      <div className="pt-16 sm:pt-20 md:pt-24 bg-[#faf8f2] border-b border-[#c59b27]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between text-xs text-neutral-500">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2">
            <Link to="/" className="hover:text-[#9a7210] flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-[#9a7210] font-semibold">Disclaimer</span>
          </nav>

          <Link
            to="/"
            className="flex items-center gap-1 text-neutral-600 hover:text-[#9a7210] font-semibold text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </div>

      {/* 2. Hero Header */}
      <section className="relative bg-white text-neutral-900 border-b border-[#c59b27]/20 py-8 sm:py-12 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c59b27]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#c59b27]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#faf8f2] border border-[#c59b27]/30 text-[#9a7210] shadow-xs">
                <FileWarning className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Statutory Disclosures</span>
              </span>

              <span className="flex items-center gap-1 text-xs text-neutral-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Last Updated: 17 October 2026</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-serif tracking-tight text-neutral-900 leading-tight">
              Website Disclaimer & Terms
            </h1>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Official disclaimer, project information parameters, and general terms regarding the content, visuals, and estimates presented by Mahek Group of Companies.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-neutral-500">
              <Building2 className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Official Disclaimer of <strong>Mahek Group of Companies</strong></span>
              <span className="mx-1.5">•</span>
              <a href="https://mahekgroup.com/" target="_blank" rel="noopener noreferrer" className="text-[#9a7210] hover:underline">
                mahekgroup.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Quick Table of Contents Sidebar */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-28 bg-[#faf8f2] rounded-2xl p-5 border border-[#c59b27]/30 shadow-xs space-y-4">
              <h3 className="text-sm font-bold font-serif text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#c59b27]" />
                <span>Disclaimer Contents</span>
              </h3>
              <nav className="space-y-1 text-xs">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block py-1.5 px-2.5 rounded-lg text-neutral-700 hover:text-[#9a7210] hover:bg-white transition-all font-medium"
                  >
                    <span className="text-[#9a7210] font-bold mr-2">{sec.number}.</span>
                    {sec.title}
                  </a>
                ))}
              </nav>

              <div className="pt-3 border-t border-[#c59b27]/20">
                <Link
                  to="/privacy-policy"
                  className="w-full py-2.5 px-3 bg-white hover:bg-[#faf8f2] border border-[#c59b27]/40 text-[#9a7210] text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-between group"
                >
                  <span>View Privacy Policy</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#c59b27] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Sections List */}
          <main className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            {sections.map((sec) => (
              <article
                key={sec.id}
                id={sec.id}
                className="scroll-mt-28 bg-white rounded-2xl p-5 sm:p-7 border border-[#c59b27]/25 shadow-xs transition-shadow hover:shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-neutral-100">
                  <span className="w-8 h-8 rounded-xl bg-[#faf8f2] border border-[#c59b27]/30 text-[#9a7210] font-bold font-serif flex items-center justify-center text-sm shrink-0">
                    {sec.number}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold font-serif text-neutral-900">
                    {sec.title}
                  </h2>
                </div>

                {sec.content}
              </article>
            ))}

            {/* Statutory Compliance Note */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <ShieldAlert className="w-4 h-4 text-[#c59b27]" />
                <span>Statutory Compliance Notice</span>
              </div>
              <p>
                These pages represent website policy notices for Mahek Group of Companies. Before entering into any commercial, investment, or property purchase agreements, clients and partners are advised to review official registered legal documentation, approvals, and contract disclosures.
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
