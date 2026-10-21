import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import {
  Phone, Mail, MapPin, ArrowUp,
  ShieldCheck, ChevronDown
} from 'lucide-react';

export default function Footer({ onOpenContact }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Dropdown accordions state for mobile and tablet screens
  const [openSections, setOpenSections] = useState({
    navigation: false,
    segments: false,
    headquarters: false
  });

  const toggleSection = (key) => {
    setOpenSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (sectionId) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-white border-t border-[#c59b27]/30 text-neutral-700 relative overflow-hidden">
      {/* Subtle gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#c59b27]/10 blur-3xl pointer-events-none"></div>

      {/* Main Footer Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 md:pt-6 pb-5 relative z-10">

        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-8 pb-5 lg:pb-7 border-b border-neutral-300">

          {/* Col 1: Brand Info */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4 pb-5 lg:pb-0 border-b border-[#c59b27]/20 lg:border-none">
            <Link to="/" className="inline-block">
              <div className="p-1 rounded-xl inline-block">
                <img
                  src={logoImg}
                  alt="Mahek Real Estate Logo"
                  className="h-14 sm:h-16 md:h-20 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-xs text-neutral-600 leading-relaxed font-normal max-w-sm">
              Surat's premier real estate and diversified investment group since 1982.
            </p>

            {/* <div className="pt-1 flex items-center gap-2 text-xs text-neutral-800 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#c59b27] flex-shrink-0" />
              <span>ISO Certified & Hilton Partner</span>
            </div> */}

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a href="https://mahekgroup.com/" target="_blank" rel="noopener noreferrer" aria-label="Website" className="w-8 h-8 rounded-full bg-white border border-[#c59b27]/30 text-neutral-700 hover:text-[#9a7210] hover:border-[#c59b27] hover:shadow-sm flex items-center justify-center transition-all">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm7.93 9h-3.18a15.8 15.8 0 0 0-1.37-5.06A8 8 0 0 1 19.93 11zM12 4.07c.94 1.48 1.7 3.65 1.94 6.93H10.06C10.3 7.72 11.06 5.55 12 4.07zM4.07 13h3.18a15.8 15.8 0 0 0 1.37 5.06A8 8 0 0 1 4.07 13zm3.18-2H4.07a8 8 0 0 1 4.55-5.06A15.8 15.8 0 0 0 7.25 11zM12 19.93c-.94-1.48-1.7-3.65-1.94-6.93h3.88c-.24 3.28-1 5.45-1.94 6.93zm3.43-1.87a15.8 15.8 0 0 0 1.37-5.06h3.18a8 8 0 0 1-4.55 5.06z" /></svg>
              </a>
              {/* <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-white border border-[#c59b27]/30 text-neutral-700 hover:text-[#9a7210] hover:border-[#c59b27] hover:shadow-sm flex items-center justify-center transition-all">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.69 1.69 0 1 0 0-3.38 1.69 1.69 0 0 0 0 3.38m1.4 9.74V9.93H5.06v8.57h2.8z" /></svg>
              </a> */}
              <a href="https://www.instagram.com/mahek_group/" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white border border-[#c59b27]/30 text-neutral-700 hover:text-[#9a7210] hover:border-[#c59b27] hover:shadow-sm flex items-center justify-center transition-all">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
              </a>
              <a href="https://www.facebook.com/share/1CPnvkxnQz/" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white border border-[#c59b27]/30 text-neutral-700 hover:text-[#9a7210] hover:border-[#c59b27] hover:shadow-sm flex items-center justify-center transition-all">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (Dropdown Accordion on Mobile & Tablet) */}
          <div className="sm:col-span-1 lg:col-span-2 border-b border-[#c59b27]/20 lg:border-none pb-3 lg:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('navigation')}
              aria-expanded={openSections.navigation}
              className="w-full flex items-center justify-between text-left py-2 lg:py-0 cursor-pointer lg:cursor-default select-none group"
            >
              <h4 className="text-sm font-bold font-serif text-neutral-900 uppercase tracking-wider group-hover:text-[#9a7210] lg:group-hover:text-neutral-900 transition-colors">
                Quick Links
              </h4>
              <div className="w-7 h-7 rounded-lg bg-white border border-[#c59b27]/30 flex items-center justify-center lg:hidden">
                <ChevronDown
                  className={`w-4 h-4 text-[#c59b27] transition-transform duration-300 ${openSections.navigation ? 'rotate-180 text-[#9a7210]' : ''
                    }`}
                />
              </div>
            </button>

            <div
              className={`transition-all duration-300 ${openSections.navigation ? 'block pt-2 pb-2' : 'hidden lg:block lg:pt-3'
                }`}
            >
              <ul className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-2 text-xs font-medium">
                <li>
                  <Link to="/" onClick={scrollToTop} className="hover:text-[#9a7210] transition-colors block py-0.5">Home</Link>
                </li>
                <li>
                  <button type="button" onClick={() => handleNavClick('about')} className="hover:text-[#9a7210] transition-colors text-left block py-0.5 cursor-pointer">About Us</button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNavClick('services')} className="hover:text-[#9a7210] transition-colors text-left block py-0.5 cursor-pointer">Segments</button>
                </li>
                <li>
                  <Link to="/projects" onClick={scrollToTop} className="hover:text-[#9a7210] transition-colors block py-0.5">Projects</Link>
                </li>
                <li>
                  <button type="button" onClick={() => handleNavClick('features')} className="hover:text-[#9a7210] transition-colors text-left block py-0.5 cursor-pointer">Capabilities</button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNavClick('gallery')} className="hover:text-[#9a7210] transition-colors text-left block py-0.5 cursor-pointer">Gallery</button>
                </li>
                <li className="col-span-2 lg:col-span-1">
                  <button type="button" onClick={() => handleNavClick('contact')} className="hover:text-[#9a7210] transition-colors text-left block py-0.5 cursor-pointer">Contact</button>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 3: Portfolio Segments (Dropdown Accordion on Mobile & Tablet) */}
          <div className="sm:col-span-1 lg:col-span-3 border-b border-[#c59b27]/20 lg:border-none pb-3 lg:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('segments')}
              aria-expanded={openSections.segments}
              className="w-full flex items-center justify-between text-left py-2 lg:py-0 cursor-pointer lg:cursor-default select-none group"
            >
              <h4 className="text-sm font-bold font-serif text-neutral-900 uppercase tracking-wider group-hover:text-[#9a7210] lg:group-hover:text-neutral-900 transition-colors">
                Portfolio
              </h4>
              <div className="w-7 h-7 rounded-lg bg-white border border-[#c59b27]/30 flex items-center justify-center lg:hidden">
                <ChevronDown
                  className={`w-4 h-4 text-[#c59b27] transition-transform duration-300 ${openSections.segments ? 'rotate-180 text-[#9a7210]' : ''
                    }`}
                />
              </div>
            </button>

            <div
              className={`transition-all duration-300 ${openSections.segments ? 'block pt-2 pb-2' : 'hidden lg:block lg:pt-3'
                }`}
            >
              <ul className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-2 text-xs font-medium">
                <li>
                  <Link to="/project/the-mahek-park-1" onClick={scrollToTop} className="hover:text-[#9a7210] transition-colors block py-0.5">The Mahek Park-1</Link>
                </li>
                <li>
                  <Link to="/project/mahek-it-park" onClick={scrollToTop} className="hover:text-[#9a7210] transition-colors block py-0.5">Mahek IT Park</Link>
                </li>
                <li>
                  <Link to="/project/orange-mahek-park" onClick={scrollToTop} className="hover:text-[#9a7210] transition-colors block py-0.5">Orange Mahek Park</Link>
                </li>
                <li>
                  <Link to="/project/the-am-park" onClick={scrollToTop} className="hover:text-[#9a7210] transition-colors block py-0.5">The AM Park</Link>
                </li>
                <li>
                  <Link to="/project/mahek-diamond-park" onClick={scrollToTop} className="hover:text-[#9a7210] transition-colors block py-0.5">Mahek Diamond Park</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 4: Contact / Office (Dropdown Accordion on Mobile & Tablet) */}
          <div className="sm:col-span-2 lg:col-span-3 border-b border-[#c59b27]/20 lg:border-none pb-3 lg:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('headquarters')}
              aria-expanded={openSections.headquarters}
              className="w-full flex items-center justify-between text-left py-2 lg:py-0 cursor-pointer lg:cursor-default select-none group"
            >
              <h4 className="text-sm font-bold font-serif text-neutral-900 uppercase tracking-wider group-hover:text-[#9a7210] lg:group-hover:text-neutral-900 transition-colors">
                Contact
              </h4>
              <div className="w-7 h-7 rounded-lg bg-white border border-[#c59b27]/30 flex items-center justify-center lg:hidden">
                <ChevronDown
                  className={`w-4 h-4 text-[#c59b27] transition-transform duration-300 ${openSections.headquarters ? 'rotate-180 text-[#9a7210]' : ''
                    }`}
                />
              </div>
            </button>

            <div
              className={`transition-all duration-300 ${openSections.headquarters ? 'block pt-2 pb-2' : 'hidden lg:block lg:pt-3'
                }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 text-xs font-medium">
                <div className="sm:col-span-2 lg:col-span-1 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#c59b27] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Mahek IT Park, Katargam, Surat - 395004
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#c59b27] flex-shrink-0" />
                  <a href="tel:+919377744633" className="hover:text-[#9a7210] transition-colors">+91 93777 44633</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#c59b27] flex-shrink-0" />
                  <a href="mailto:info.mahekrealestate@gmail.com" className="hover:text-[#9a7210] transition-colors">info.mahekrealestate@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-4 sm:pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600 font-medium">
          <p>
            © {new Date().getFullYear()} MAHEK REAL ESTATE. Powered by <a href="https://www.megascale.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#9a7210] underline underline-offset-2">Megascale</a>
          </p>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link to="/privacy-policy" className="hover:text-[#9a7210] transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/disclaimer" className="hover:text-[#9a7210] transition-colors">Disclaimer</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

