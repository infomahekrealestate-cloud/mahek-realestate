import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowUp, Mail } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingActions({ onOpenContact, onOpenEnquiry }) {
  const [showScroll, setShowScroll] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailClick = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else if (onOpenContact && location.pathname === '/') {
      onOpenContact();
    } else if (location.pathname === '/') {
      const contactElem = document.getElementById('contact');
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#contact');
    }
  };

  const handleWhatsAppClick = () => {
    const text = 'Hello Mahek Real Estate,\n\nI would like to enquire about your projects and availability.';
    const url = `https://wa.me/919376622000?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-2.5 sm:gap-3">
      {/* Back to top */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          title="Back to Top"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#c59b27]/50 text-[#9a7210] hover:bg-[#c59b27] hover:text-white flex items-center justify-center hover:shadow-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Email Enquiry Button */}
      <button
        onClick={handleEmailClick}
        aria-label="Email Enquiry"
        title="Email Enquiry"
        className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#c59b27] hover:bg-[#aa7f17] text-white flex items-center justify-center shadow-lg hover:shadow-[0_4px_20px_rgba(197,155,39,0.35)] transition-all hover:scale-110 active:scale-95 cursor-pointer"
      >
        <Mail className="w-5 h-5 sm:w-5 sm:h-5" />
        <span className="absolute right-full mr-2.5 px-2.5 py-1 rounded-lg bg-neutral-900 text-white text-[11px] font-semibold whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          Email Enquiry
        </span>
      </button>

      {/* WhatsApp Enquiry Button */}
      <button
        onClick={handleWhatsAppClick}
        aria-label="WhatsApp Enquiry"
        title="WhatsApp Enquiry"
        className="group relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg hover:shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-all hover:scale-110 active:scale-95 cursor-pointer"
      >
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
        <span className="absolute right-full mr-2.5 px-2.5 py-1 rounded-lg bg-neutral-900 text-white text-[11px] font-semibold whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          WhatsApp Enquiry
        </span>
      </button>
    </div>
  );
}
