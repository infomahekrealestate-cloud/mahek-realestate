import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, ArrowLeft, Home, ChevronRight, Calendar,
  Building2, Mail, Phone, MapPin, Lock, FileText, CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | Mahek Group of Companies';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Privacy Policy for Mahek Group of Companies. Learn how we collect, use, store, protect, and handle personal information.'
      );
    }
  }, []);

  const sections = [
    {
      id: 'introduction',
      number: '1',
      title: 'Introduction',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            Mahek Group of Companies (“Mahek Group,” “we,” “our,” or “us”) respects your privacy and is committed to protecting the personal information you share through our website.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, store, disclose, and protect information when you visit our website, submit an enquiry, subscribe to our newsletter, or contact us regarding our businesses and projects.
          </p>
          <p>
            By using our website, you acknowledge this Privacy Policy. Where consent is legally required, we will seek it before processing your personal information.
          </p>
        </div>
      ),
    },
    {
      id: 'information-we-collect',
      number: '2',
      title: 'Information We Collect',
      content: (
        <div className="space-y-4 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>We may collect the following categories of information:</p>

          <div className="bg-[#faf8f2] rounded-xl p-4 sm:p-5 border border-[#c59b27]/25 space-y-2">
            <h4 className="font-bold text-neutral-900 text-sm sm:text-base flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#c59b27] text-white text-xs flex items-center justify-center font-bold">A</span>
              Personal Information
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-neutral-700 ml-1">
              <li>Full name, including first and last name.</li>
              <li>Email address.</li>
              <li>Mobile or WhatsApp number.</li>
              <li>Information provided through enquiry forms, newsletter subscriptions, or other communications.</li>
            </ul>
          </div>

          <div className="bg-[#faf8f2] rounded-xl p-4 sm:p-5 border border-[#c59b27]/25 space-y-2">
            <h4 className="font-bold text-neutral-900 text-sm sm:text-base flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#c59b27] text-white text-xs flex items-center justify-center font-bold">B</span>
              Enquiry and Project Information
            </h4>
            <p className="text-xs sm:text-sm text-neutral-700">
              If you enquire about our real estate projects, commercial properties, residential developments, hospitality services, or other business activities, we may collect information necessary to respond to your enquiry.
            </p>
          </div>

          <div className="bg-[#faf8f2] rounded-xl p-4 sm:p-5 border border-[#c59b27]/25 space-y-2">
            <h4 className="font-bold text-neutral-900 text-sm sm:text-base flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#c59b27] text-white text-xs flex items-center justify-center font-bold">C</span>
              Technical Information
            </h4>
            <p className="text-xs sm:text-sm text-neutral-700">
              When you visit our website, certain technical information may be collected, including your IP address, browser type, device information, pages visited, approximate location, and website usage data, subject to applicable law and the technologies we use.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'how-we-use-information',
      number: '3',
      title: 'How We Use Your Information',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>We may use your information to:</p>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
            {[
              'Respond to enquiries and requests for information.',
              'Provide details about our real estate projects, properties, and business activities.',
              'Contact you regarding project availability, site visits, or requested services.',
              'Send newsletters, company updates, and promotional communications where permitted.',
              'Improve website functionality, content, security, and user experience.',
              'Maintain business records and prevent fraudulent or unauthorized activity.',
              'Comply with applicable legal and regulatory requirements.'
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs sm:text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg border border-neutral-200 mt-2">
            We will not use your personal information for purposes that are incompatible with the purpose disclosed to you, except where permitted by applicable law.
          </p>
        </div>
      ),
    },
    {
      id: 'sharing-of-information',
      number: '4',
      title: 'Sharing of Information',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs sm:text-sm text-amber-950 font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#c59b27] shrink-0" />
            <span>We do not sell your personal information as a standalone commercial product.</span>
          </div>
          <p className="text-xs sm:text-sm">We may share relevant information, where necessary and lawful, with:</p>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li className="p-3 rounded-lg bg-white border border-neutral-200">
              <strong className="text-neutral-900 block mb-0.5">Group companies and business divisions:</strong>
              To respond to enquiries relating to the appropriate business or project.
            </li>
            <li className="p-3 rounded-lg bg-white border border-neutral-200">
              <strong className="text-neutral-900 block mb-0.5">Service providers:</strong>
              Such as website hosting providers, analytics services, communication platforms, and technical support providers.
            </li>
            <li className="p-3 rounded-lg bg-white border border-neutral-200">
              <strong className="text-neutral-900 block mb-0.5">Business partners:</strong>
              Where your enquiry relates to a particular project or service and sharing is appropriate and legally permitted.
            </li>
            <li className="p-3 rounded-lg bg-white border border-neutral-200">
              <strong className="text-neutral-900 block mb-0.5">Government and regulatory authorities:</strong>
              Where disclosure is required by law, a valid legal process, or a lawful request.
            </li>
          </ul>
          <p className="text-xs sm:text-sm text-neutral-600 italic">
            We expect relevant service providers to handle personal information appropriately and in accordance with their applicable obligations.
          </p>
        </div>
      ),
    },
    {
      id: 'cookies-and-similar-technologies',
      number: '5',
      title: 'Cookies and Similar Technologies',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            Our website may use cookies and similar technologies to support essential website functions, understand website traffic, and improve your browsing experience.
          </p>
          <p className="text-xs sm:text-sm">
            You may be able to manage cookies through your browser settings. Disabling certain cookies may affect website functionality.
          </p>
          <p className="text-xs sm:text-sm">
            Where required by applicable law, we will obtain the necessary consent before using non-essential cookies or similar technologies.
          </p>
        </div>
      ),
    },
    {
      id: 'data-storage-and-security',
      number: '6',
      title: 'Data Storage and Security',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            We take reasonable measures designed to protect personal information against unauthorized access, disclosure, alteration, loss, or misuse.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
            However, no method of transmitting or storing information electronically can be guaranteed to be completely secure. We cannot guarantee absolute security of information transmitted over the internet.
          </p>
        </div>
      ),
    },
    {
      id: 'data-retention',
      number: '7',
      title: 'Data Retention',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            We retain personal information only for as long as reasonably necessary to fulfil the purposes described in this policy, respond to enquiries, maintain legitimate business records, resolve disputes, and comply with legal obligations.
          </p>
          <p className="text-xs sm:text-sm">
            When information is no longer required, we will take appropriate steps to delete it or otherwise handle it in accordance with applicable law.
          </p>
        </div>
      ),
    },
    {
      id: 'your-privacy-rights',
      number: '8',
      title: 'Your Privacy Rights',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>Subject to applicable law, you may be entitled to:</p>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
            {[
              'Request information about the personal data we hold about you.',
              'Request correction or updating of inaccurate information.',
              'Request deletion of personal information where applicable.',
              'Withdraw consent where processing is based on consent.',
              'Opt out of promotional emails or other marketing communications.',
              'Raise a privacy-related question or complaint.'
            ].map((right, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                <span>{right}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            You can request assistance by contacting us using the details in the Contact Us section below. We may need to verify your identity before acting on a request.
          </p>
        </div>
      ),
    },
    {
      id: 'third-party-websites',
      number: '9',
      title: 'Third-Party Websites',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            Our website may contain links to third-party websites, services, or business partners. Those websites operate under their own privacy policies and practices.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
            We are not responsible for the privacy, security, or content practices of third-party websites. We encourage you to review their policies before providing personal information.
          </p>
        </div>
      ),
    },
    {
      id: 'childrens-privacy',
      number: '10',
      title: "Children's Privacy",
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            Our website is intended for general audiences and is not specifically directed at children. Please do not submit personal information through the website unless you are legally permitted to do so.
          </p>
          <p className="text-xs sm:text-sm">
            Where applicable law requires additional safeguards or consent for processing children's personal data, we will comply with those requirements.
          </p>
        </div>
      ),
    },
    {
      id: 'changes-to-policy',
      number: '11',
      title: 'Changes to This Privacy Policy',
      content: (
        <div className="space-y-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our business, website functionality, or applicable laws.
          </p>
          <p className="text-xs sm:text-sm">
            Any updated version will be published on this page with a revised “Last Updated” date. We encourage you to review this page periodically.
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
            For privacy-related questions, requests, or complaints, please contact:
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
            <span className="text-[#9a7210] font-semibold">Privacy Policy</span>
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
                <ShieldCheck className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Legal & Governance</span>
              </span>

              <span className="flex items-center gap-1 text-xs text-neutral-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Last Updated: 17 October 2026</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-serif tracking-tight text-neutral-900 leading-tight">
              Privacy Policy
            </h1>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Mahek Group of Companies is dedicated to upholding the highest standards of data protection, transparency, and user privacy across all our real estate, industrial, and business operations.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-neutral-500">
              <Building2 className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Official Policy of <strong>Mahek Group of Companies</strong></span>
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
                <span>Policy Contents</span>
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
                  to="/disclaimer"
                  className="w-full py-2.5 px-3 bg-white hover:bg-[#faf8f2] border border-[#c59b27]/40 text-[#9a7210] text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-between group"
                >
                  <span>View Official Disclaimer</span>
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
          </main>
        </div>
      </div>
    </div>
  );
}
