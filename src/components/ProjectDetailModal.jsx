import { useState, useEffect } from 'react';
import {
  X, MapPin, Building2, Calendar, FileText, CheckCircle2,
  Share2, Download, ExternalLink, Maximize2,
  Phone, Mail, User, MessageSquare, Send, CheckCircle,
  Compass, ShieldCheck, Factory, Ruler, Car, Trees, Eye, Check, MessageCircle,
  Map, Image as ImageIcon, SlidersHorizontal, ChevronDown
} from 'lucide-react';
import { sendLeadEnquiry } from '../services/enquiryService';
import WhatsAppIcon from './WhatsAppIcon';
import ShareModal from './ShareModal';

export default function ProjectDetailModal({
  isOpen,
  project,
  onClose,
  onOpenEnquiry,
  onOpenLightbox
}) {
  const [activeLayoutIndex, setActiveLayoutIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // overview | layout | specs | gallery
  const [isTabDropdownOpen, setIsTabDropdownOpen] = useState(false);
  const [brochureRequested, setBrochureRequested] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Form state inside modal
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    if (project) {
      setActiveLayoutIndex(0);
      setActiveTab('overview');
      setFormStatus('idle');
      const pName = project.name || project.title || 'Project';
      const pLoc = project.location || 'Surat, Gujarat';
      setFormState({
        name: '',
        phone: '',
        email: '',
        message: `I am interested in ${pName} (${pLoc}). Please provide current unit availability, pricing, and layout plan details.`
      });
    }
  }, [project]);

  // Lock body scroll and listen for ESC key
  useEffect(() => {
    if (!isOpen || !project) return;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = origOverflow || '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, project, onClose]);

  if (!isOpen || !project) return null;

  const projectName = project.name || project.title || 'Development';
  const projectHero = project.heroImage || project.image;
  const projectDesc = project.fullDescription || project.description || project.shortDescription || '';
  const projectHighlights = project.highlights || [];
  const projectFeatures = project.features || project.highlights || [];
  const projectSpecs = project.specifications || [];
  const projectGallery = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [{ title: projectName, url: projectHero }];

  const currentLayoutImage = project.layoutPlans && project.layoutPlans.length > 0
    ? project.layoutPlans[activeLayoutIndex]?.image || project.layoutPlan || projectHero
    : project.layoutPlan || projectHero;

  const currentLayoutTitle = project.layoutPlans && project.layoutPlans.length > 0
    ? project.layoutPlans[activeLayoutIndex]?.title || project.layoutTitle || `${projectName} Layout`
    : project.layoutTitle || `${projectName} Master Plan`;

  const currentLayoutDesc = project.layoutPlans && project.layoutPlans.length > 0
    ? project.layoutPlans[activeLayoutIndex]?.description || project.layoutDescription || `Layout plan for ${projectName}`
    : project.layoutDescription || `Comprehensive architectural layout plan for ${projectName}`;

  const getProjectShareUrl = () => {
    try {
      const slug = project.slug || project.id || '';
      const u = new URL(window.location.origin + window.location.pathname);
      if (slug) {
        u.searchParams.set('project', slug);
      }
      return u.toString();
    } catch {
      return window.location.href;
    }
  };

  const handleShare = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setShareModalOpen(true);
  };

  const handleDownloadPdf = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // 1. Identify authentic PDF URL
    const knownPdfMap = {
      'the-mahek-park-1': '/brochures/the-mahek-park-1.pdf',
      'orange-mahek-park': '/brochures/orange-mahek-park.pdf',
      'mahek-it-park': '/brochures/mahek-it-park.pdf',
      'the-am-park': '/brochures/the-am-park.pdf',
      'anthems-mahek-park': '/brochures/anthems-mahek-park.pdf',
      'mahek-residency': '/brochures/mahek-residency.pdf',
      'it-park': '/brochures/mahek-it-park.pdf',
      'mahek-park': '/brochures/the-mahek-park-1.pdf',
      'villas': '/brochures/mahek-residency.pdf',
    };

    let targetUrl = project?.pdfUrl;
    if (!targetUrl && (project?.id || project?.slug)) {
      targetUrl = knownPdfMap[project.id] || knownPdfMap[project.slug];
    }
    if (!targetUrl) {
      targetUrl = '/Mahek-Group-Profile.pdf';
    }

    const cleanName = (projectName || 'Mahek_Group_Project').replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${cleanName}_Brochure.pdf`;

    setBrochureRequested(true);
    setTimeout(() => setBrochureRequested(false), 4500);

    // 2. Open PDF in a new tab immediately in the user click gesture tick
    try {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Ignored if window.open fails
    }

    // 3. Guarantee direct file download to device via Blob
    try {
      const res = await fetch(targetUrl);
      if (res.ok) {
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = blobUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
        }, 2000);
      }
    } catch (err) {
      console.warn('Blob download fallback:', err);
    }
  };

  const handleWhatsAppEnquiry = () => {
    const text = `Hello Mahek Real Estate,\n\nI would like to enquire about *${projectName}* (${project?.location || 'Surat, Gujarat'}).\n\nPlease share current inventory, pricing, layout plans, and site visit availability.\n\nLink: ${getProjectShareUrl()}`;
    const url = `https://wa.me/919376622000?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;
    setFormStatus('loading');
    try {
      await sendLeadEnquiry({
        name: formState.name,
        phone: formState.phone,
        email: formState.email,
        message: formState.message,
        projectName: projectName,
        projectCategory: project.category,
        projectLocation: project.location,
        source: 'Project Detail Modal'
      });
      setFormStatus('success');
    } catch {
      setFormStatus('success');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto overscroll-contain"
      onClick={onClose}
    >
      {/* Toast Notification */}
      {copiedShare && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-60 px-4 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-bold shadow-2xl flex items-center gap-2 border border-[#c59b27] animate-in fade-in slide-in-from-top duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Project link copied to clipboard! Paste and share anywhere.</span>
        </div>
      )}

      <div
        className="relative w-full max-w-5xl max-h-[94vh] sm:max-h-[92vh] bg-white border border-[#c59b27]/40 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Controls */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3.5 bg-white border-b border-[#c59b27]/20 z-20 shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-[#c59b27]/15 text-[#9a7210] border border-[#c59b27]/30">
              {project.category}
            </span>
            <span className="text-xs text-neutral-500 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-xs font-semibold text-neutral-800 truncate max-w-[150px] sm:max-w-md">
              {projectName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* 1. Universal Copy / Share Button */}
            <button
              onClick={handleShare}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer text-xs flex items-center gap-1.5 ${
                copiedShare
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-xs'
                  : 'border-neutral-200 text-neutral-700 hover:text-[#9a7210] hover:border-[#c59b27] bg-white'
              }`}
              title="Share Project Link"
            >
              {copiedShare ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-bold text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span className="font-semibold">Share</span>
                </>
              )}
            </button>

            {/* 2. Direct WhatsApp Share Shortcut */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `*${projectName}* | Mahek Real Estate Surat\n` +
                (project.taglineEn ? `"${project.taglineEn}"\n` : '') +
                `📍 ${project.location}\n\n` +
                `👉 View Project Details & Brochure: ${getProjectShareUrl()}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title="Share on WhatsApp"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>


            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Modal"
              className="p-1.5 sm:p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          
          {/* Hero Media Banner */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full shrink-0 overflow-hidden bg-neutral-900">
            <img
              src={projectHero}
              alt={projectName}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>

            {/* Developer Partner Badge - Hidden on small screen */}
            {project.developerPartners && (
              <div className="hidden sm:block absolute top-4 left-4 sm:top-6 sm:left-6 max-w-[90%]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-black/60 text-[#dfba52] border border-[#c59b27]/40 backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#dfba52]" />
                  <span>{project.developerPartners}</span>
                </span>
              </div>
            )}

            {/* Hero Overlay Info */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1 sm:space-y-2 max-w-2xl">
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-200">
                  <MapPin className="w-3.5 h-3.5 text-[#dfba52] shrink-0" />
                  <span className="truncate">{project.location}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white tracking-tight">
                  {projectName}
                </h1>
                {project.taglineEn && (
                  <p className="text-xs sm:text-sm text-[#dfba52] font-medium italic">
                    "{project.taglineEn}"
                  </p>
                )}
              </div>

              {/* Action Buttons on Hero - Hidden on small screen for clean image display */}
              <div className="hidden sm:flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
                <button
                  onClick={handleDownloadPdf}
                  className={`px-3.5 py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-1.5 cursor-pointer backdrop-blur-md ${
                    brochureRequested
                      ? 'bg-emerald-600/90 border-emerald-400 text-white'
                      : 'bg-white/95 hover:bg-white text-neutral-900 border-white/60'
                  }`}
                  title="Download Official Project PDF Brochure"
                >
                  {brochureRequested ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Brochure Downloaded!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-[#c59b27]" />
                      <span>Request PDF</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWhatsAppEnquiry}
                  className="px-3 sm:px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-[0_4px_15px_rgba(37,211,102,0.35)] flex items-center gap-1.5 cursor-pointer"
                  title="Enquire on WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>WhatsApp Enquiry</span>
                </button>

                <button
                  onClick={() => {
                    if (onOpenEnquiry) onOpenEnquiry(project);
                  }}
                  className="px-3 sm:px-4 py-2.5 rounded-xl bg-[#c59b27] hover:bg-[#aa7f17] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enquire Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Navigation Tabs inside Modal: Luxury Dropdown on Mobile, Classic Tabs on Desktop */}
          {(() => {
            const tabOptions = [
              { id: 'overview', label: 'Overview & Highlights', subtitle: 'Brochure narrative & verified highlights', icon: FileText },
              { id: 'layout', label: 'PDF Layout Plan', subtitle: 'Architectural blueprint extracted from PDF', icon: Map },
              { id: 'specs', label: 'Specifications', subtitle: 'Plot dimensions & infrastructure specs', icon: SlidersHorizontal },
              { id: 'gallery', label: 'Brochure Gallery', subtitle: 'High-resolution blueprint sheets', icon: ImageIcon }
            ];
            const currentTab = tabOptions.find((t) => t.id === activeTab) || tabOptions[0];
            const CurrentIcon = currentTab.icon;

            return (
              <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-3 sm:px-6 py-2.5 sm:py-0">
                {/* Mobile View: Luxury Dropdown Selector (sm:hidden) */}
                <div className="sm:hidden relative">
                  <button
                    type="button"
                    onClick={() => setIsTabDropdownOpen(!isTabDropdownOpen)}
                    className="w-full py-2.5 px-3 rounded-xl bg-white border border-[#c59b27]/40 hover:border-[#c59b27] shadow-xs flex items-center justify-between text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[#c59b27]/10 flex items-center justify-center shrink-0 text-[#9a7210]">
                        <CurrentIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#9a7210] block leading-tight">
                          Select Section
                        </span>
                        <span className="text-xs font-bold text-neutral-900 truncate block">
                          {currentTab.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <span className="text-[10px] font-bold text-[#c59b27] uppercase tracking-wider">Change</span>
                      <ChevronDown className={`w-4 h-4 text-[#c59b27] transition-transform duration-200 ${isTabDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {/* Dropdown Menu Modal */}
                  {isTabDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-20 bg-black/25"
                        onClick={() => setIsTabDropdownOpen(false)}
                      />
                      <div className="absolute top-full left-0 right-0 mt-1.5 z-30 bg-white rounded-2xl border border-[#c59b27]/40 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="p-2 border-b border-neutral-100 bg-[#faf8f2]">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9a7210] px-2 block">
                            Project Sections
                          </span>
                        </div>
                        <div className="p-1.5 space-y-1">
                          {tabOptions.map((tab) => {
                            const Icon = tab.icon;
                            const isSelected = activeTab === tab.id;
                            return (
                              <button
                                key={tab.id}
                                type="button"
                                onClick={() => {
                                  setActiveTab(tab.id);
                                  setIsTabDropdownOpen(false);
                                }}
                                className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#c59b27]/15 border border-[#c59b27]/40 text-[#9a7210]'
                                    : 'hover:bg-neutral-100 text-neutral-800'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                    isSelected ? 'bg-[#c59b27] text-white' : 'bg-neutral-100 text-neutral-600'
                                  }`}>
                                    <Icon className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="min-w-0">
                                    <span className="text-xs font-bold block truncate">
                                      {tab.label}
                                    </span>
                                    <span className="text-[10px] text-neutral-500 block truncate">
                                      {tab.subtitle}
                                    </span>
                                  </div>
                                </div>
                                {isSelected && (
                                  <Check className="w-4 h-4 text-[#c59b27] shrink-0 ml-2" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Desktop View: Classic Horizontal Tabs */}
                <div className="hidden sm:flex items-center gap-6 overflow-x-auto no-scrollbar">
                  {tabOptions.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 text-sm font-bold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                        activeTab === tab.id
                          ? 'border-[#c59b27] text-[#9a7210]'
                          : 'border-transparent text-neutral-500 hover:text-neutral-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

          <div className="p-5 sm:p-8 space-y-10 bg-white">

            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                {/* PDF Verified Tagline in Gujarati if present */}
                {project.tagline && (
                  <div className="p-4 rounded-xl bg-[#c59b27]/10 border border-[#c59b27]/30 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#c59b27] shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9a7210] block">
                        Official Brochure Statement
                      </span>
                      <p className="text-sm font-semibold text-neutral-800">
                        {project.tagline}
                      </p>
                    </div>
                  </div>
                )}

                {/* Full Description from Brochure */}
                <div>
                  <h3 className="text-lg font-bold font-serif text-neutral-900 mb-2">
                    Project Overview
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {projectDesc}
                  </p>
                </div>

                {/* Key Highlights Grid */}
                {projectHighlights.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold font-serif text-neutral-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#c59b27]" />
                      <span>
                        Verified Project Highlights
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {projectHighlights.map((hl, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-800 font-medium"
                        >
                          <div className="w-4 h-4 rounded-full bg-[#c59b27]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#9a7210]">
                            <CheckCircle className="w-3 h-3" />
                          </div>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features Checklist */}
                {projectFeatures && projectFeatures.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold font-serif text-neutral-900 mb-3">
                      Features & Infrastructure
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-neutral-700">
                      {projectFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg border border-neutral-100 bg-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]"></span>
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: LAYOUT PLAN */}
            {activeTab === 'layout' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9a7210]">
                      Architectural Master Layout Plan
                    </span>
                    <h3 className="text-xl font-bold font-serif text-neutral-900">
                      {currentLayoutTitle || 'Master Layout Plan'}
                    </h3>
                    <p className="text-xs text-neutral-500 max-w-xl mt-1">
                      {currentLayoutDesc || 'Exact architectural blueprint extracted directly from Mahek Real Estate Profile.pdf.'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (onOpenLightbox) {
                        const allPlans = project.layoutPlans && project.layoutPlans.length > 0
                          ? project.layoutPlans.map((lp) => ({ url: lp.image || lp.url, title: lp.title, subtitle: `${projectName} - Layout Plan` }))
                          : [{ url: currentLayoutImage, title: `${projectName} - Layout Plan`, subtitle: currentLayoutTitle }];
                        onOpenLightbox(currentLayoutImage, `${projectName} - Layout Plan`, currentLayoutTitle, allPlans, activeLayoutIndex);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-[#c59b27] text-white text-xs font-bold transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer shadow-sm"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>Zoom Layout in Fullscreen Lightbox</span>
                  </button>
                </div>

                {/* Multiple Layout Floor Tabs (e.g., Mahek IT Park, The AM Park) */}
                {project.layoutPlans && project.layoutPlans.length > 1 && (
                  <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-neutral-100 border border-neutral-200">
                    {project.layoutPlans.map((plan, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveLayoutIndex(idx)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          activeLayoutIndex === idx
                            ? 'bg-[#c59b27] text-white shadow-xs'
                            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                        }`}
                      >
                        {plan.title}
                      </button>
                    ))}
                  </div>
                )}

                {/* Layout Plan Display Card */}
                <div
                  className="relative rounded-2xl overflow-hidden border-2 border-dashed border-[#c59b27]/40 bg-neutral-50 p-2 sm:p-4 group cursor-zoom-in"
                  onClick={() => {
                    if (onOpenLightbox) {
                      const allPlans = project.layoutPlans && project.layoutPlans.length > 0
                        ? project.layoutPlans.map((lp) => ({ url: lp.image || lp.url, title: lp.title, subtitle: `${projectName} - Layout Plan` }))
                        : [{ url: currentLayoutImage, title: `${projectName} - Layout Plan`, subtitle: currentLayoutTitle }];
                      onOpenLightbox(currentLayoutImage, `${projectName} - Layout Plan`, currentLayoutTitle, allPlans, activeLayoutIndex);
                    }
                  }}
                >
                  <img
                    src={currentLayoutImage}
                    alt={currentLayoutTitle || 'Layout Plan'}
                    className="w-full max-h-[500px] object-contain rounded-xl bg-white shadow-xs transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                  <div className="absolute bottom-6 right-6 bg-black/75 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5 text-[#dfba52]" />
                    <span>Click to zoom in high resolution</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SPECIFICATIONS */}
            {activeTab === 'specs' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9a7210]">
                    Verified Specifications & Clearances
                  </span>
                  <h3 className="text-xl font-bold font-serif text-neutral-900">
                    Technical Specifications
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Engineering and infrastructure details
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <tbody className="divide-y divide-neutral-200">
                      {projectSpecs.map((spec, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50/70'}>
                          <td className="py-3 px-4 sm:px-6 font-bold text-neutral-800 w-1/3 sm:w-1/4 border-r border-neutral-200">
                            {spec.label}
                          </td>
                          <td className="py-3 px-4 sm:px-6 text-neutral-600 font-medium">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9a7210]">
                    Architectural Assets
                  </span>
                  <h3 className="text-xl font-bold font-serif text-neutral-900">
                    Brochure & Architectural Gallery
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Click any image to view in full resolution
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {projectGallery.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (onOpenLightbox) {
                          onOpenLightbox(item.url, item.title, projectName, projectGallery, index);
                        }
                      }}
                      className="group relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 aspect-4/3 cursor-pointer shadow-xs hover:border-[#c59b27] transition-all"
                    >
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <div className="flex items-center justify-between w-full text-white text-xs">
                          <span className="font-semibold truncate">{item.title}</span>
                          <Eye className="w-4 h-4 text-[#dfba52] shrink-0 ml-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Quick Inquiry & Download Bar */}
            <div className="p-4 sm:p-6 rounded-2xl bg-neutral-50 border border-[#c59b27]/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm sm:text-base font-bold font-serif text-neutral-900">
                  Ready to explore {projectName}?
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-600">
                  Speak directly with the Mahek Real Estate sales & leasing desk for current plot and office inventory.
                </p>
              </div>

              {/* 3 Action Buttons: Clean 3-column equal grid on small screen with icon+label stack, flex on desktop */}
              <div className="grid grid-cols-3 sm:flex sm:items-center gap-1.5 sm:gap-2.5 w-full sm:w-auto">
                <button
                  onClick={handleDownloadPdf}
                  className={`py-2 sm:py-2.5 px-1 sm:px-4 rounded-xl border text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 transition-all cursor-pointer ${
                    brochureRequested
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-xs'
                      : 'border-neutral-300 hover:border-[#c59b27] bg-white text-neutral-800 hover:shadow-xs'
                  }`}
                  title="Download Official Project PDF Brochure"
                >
                  {brochureRequested ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-[10px] sm:text-xs font-semibold sm:font-bold tracking-tight">Ready</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-[#c59b27] shrink-0" />
                      <span className="text-[10px] sm:text-xs font-semibold sm:font-bold tracking-tight sm:hidden">PDF</span>
                      <span className="text-xs font-bold hidden sm:inline">Request PDF</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWhatsAppEnquiry}
                  className="py-2 sm:py-2.5 px-1 sm:px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-[0_4px_15px_rgba(37,211,102,0.35)] flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 cursor-pointer"
                  title="Direct inquiry on WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
                  <span className="text-[10px] sm:text-xs font-semibold sm:font-bold tracking-tight sm:hidden">WhatsApp</span>
                  <span className="text-xs font-bold hidden sm:inline">WhatsApp Enquiry</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    if (onOpenEnquiry) onOpenEnquiry(project);
                  }}
                  className="py-2 sm:py-2.5 px-1 sm:px-5 rounded-xl bg-[#c59b27] hover:bg-[#aa7f17] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 cursor-pointer"
                  title="Enquire Now"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="text-[10px] sm:text-xs font-semibold sm:font-bold tracking-tight sm:hidden">Enquire</span>
                  <span className="text-xs font-bold hidden sm:inline">Enquire Now</span>
                </button>
              </div>
            </div>



          </div>
        </div>

      </div>

      {/* Multi-channel Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        shareData={project ? {
          title: `${projectName} | Mahek Real Estate`,
          text: `Discover ${projectName} by Mahek Real Estate Surat. ${project.taglineEn || project.shortDescription || ''}`,
          url: getProjectShareUrl(),
          image: heroImage,
          type: 'project',
          category: project.category
        } : null}
      />
    </div>
  );
}
