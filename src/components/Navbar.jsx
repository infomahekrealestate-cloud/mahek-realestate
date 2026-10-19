import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import {
  Menu, X, Phone, Mail, Clock, Search,
  ChevronRight, ArrowRight, Building2
} from 'lucide-react';

export default function Navbar({ onOpenContact: _onOpenContact, onOpenSearch }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Track scroll state for subtle shadow enhancement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when side drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (sectionId) => {
    setDrawerOpen(false);
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

  const handleProjectsClick = () => {
    setDrawerOpen(false);
    navigate('/projects');
  };

  return (
    <>
      {/* ============================================================ */}
      {/* MINIMALIST HEADER (Matching user screenshot with Logo Gold Theme) */}
      {/* ============================================================ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#c59b27]/25 transition-all duration-300 ${isScrolled
            ? 'py-1.5 shadow-sm'
            : 'py-2 sm:py-2.5'
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo (Left) */}
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 group focus:outline-none cursor-pointer"
            aria-label="Mahek Real Estate Home"
          >
            <img
              src={logoImg}
              alt="Mahek Real Estate"
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button in Navbar */}
            <button
              onClick={() => onOpenSearch && onOpenSearch()}
              aria-label="Search Projects"
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-neutral-700 hover:text-[#9a7210] hover:bg-neutral-100 border border-[#c59b27]/20 hover:border-[#c59b27] transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            >
              <Search className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#c59b27]" />
              <span className="hidden sm:inline">Search</span>
            </button>

            <Link
              to="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all text-neutral-700 hover:text-[#9a7210] hover:bg-neutral-100 border border-[#c59b27]/20 cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Explore Projects</span>
            </Link>

            {/* Clean Hamburger Menu Button (Right, gold theme matching logo) */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open Navigation Menu"
              className="p-1.5 sm:p-2 rounded-xl text-[#c59b27] hover:text-[#9a7210] hover:bg-neutral-100 border border-[#c59b27]/20 hover:border-[#c59b27] transition-all duration-200 cursor-pointer focus:outline-none"
            >
              <Menu className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* SLIDE-OUT NAVIGATION DRAWER & OVERLAY */}
      {/* ============================================================ */}

      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity duration-300 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Side Drawer with Gold Brand Accent */}
      <aside
        className={`fixed top-0 right-0 h-full w-[310px] sm:w-[380px] max-w-[85vw] bg-white border-l border-[#c59b27]/30 z-50 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        aria-label="Main Navigation Drawer"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#c59b27]/20 bg-white">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Mahek Real Estate" className="h-10 sm:h-12 w-auto object-contain" />
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close Navigation Menu"
            className="p-1.5 rounded-full text-neutral-500 hover:text-[#c59b27] hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Navigation Links */}
        <div className="flex-1 overflow-y-auto px-6 py-6">

          {/* Main Menu */}
          <div>
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#9a7210] mb-3">
              Main Menu
            </h4>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => handleNavClick('hero')}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-base font-semibold text-neutral-800 hover:text-[#9a7210] hover:bg-neutral-100 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-[#c59b27] transition-transform group-hover:translate-x-1" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-base font-semibold text-neutral-800 hover:text-[#9a7210] hover:bg-neutral-100 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span>About Us (Est. 1982)</span>
                  <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-[#c59b27] transition-transform group-hover:translate-x-1" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('services')}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-base font-semibold text-neutral-800 hover:text-[#9a7210] hover:bg-neutral-100 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span>Business Segments</span>
                  <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-[#c59b27] transition-transform group-hover:translate-x-1" />
                </button>
              </li>
              <li>
                <button
                  onClick={handleProjectsClick}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-base font-semibold text-neutral-800 hover:text-[#9a7210] hover:bg-neutral-100 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>Explore All Projects</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#c59b27]/20 text-[#9a7210] font-bold">6 Flagships</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-[#c59b27] transition-transform group-hover:translate-x-1" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('features')}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-base font-semibold text-neutral-800 hover:text-[#9a7210] hover:bg-neutral-100 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span>Capabilities & Story</span>
                  <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-[#c59b27] transition-transform group-hover:translate-x-1" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('gallery')}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-base font-semibold text-neutral-800 hover:text-[#9a7210] hover:bg-neutral-100 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>Photo Gallery</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#c59b27]/20 text-[#9a7210] font-bold">Expo & IT</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-[#c59b27] transition-transform group-hover:translate-x-1" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-base font-semibold text-neutral-800 hover:text-[#9a7210] hover:bg-neutral-100 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span>Contact Us</span>
                  <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-[#c59b27] transition-transform group-hover:translate-x-1" />
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Drawer Footer with Quick Contact & Action */}
        <div className="p-6 border-t border-[#c59b27]/20 bg-white space-y-4">
          <div className="space-y-2 text-xs text-neutral-700">
            <a href="tel:+919377744633" className="flex items-center gap-2 font-semibold text-neutral-800 hover:text-[#9a7210]">
              <Phone className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>+91 93777 44633 / +91 75674 41177</span>
            </a>
            <a href="mailto:infomahek2@gmail.com" className="flex items-center gap-2 font-semibold text-neutral-800 hover:text-[#9a7210]">
              <Mail className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>infomahek2@gmail.com</span>
            </a>
            <div className="flex items-center gap-2 text-neutral-600 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Mon - Sat: 9:30AM - 7:00PM IST</span>
            </div>
          </div>

          <button
            onClick={() => handleNavClick('contact')}
            className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#c59b27] hover:bg-[#aa7f17] hover:shadow-[0_10px_20px_rgba(197,155,39,0.3)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-101 active:scale-98"
          >
            <span>Inquire With Mahek Real Estate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </aside>
    </>
  );
}
