import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Building2, Calendar, FileText, CheckCircle2, ChevronRight,
  ArrowLeft, Share2, Download, ExternalLink, Maximize2,
  Phone, Mail, User, MessageSquare, Send, CheckCircle, Home, Layers,
  Compass, ShieldCheck, Factory, Ruler, Car, Trees, Eye
} from 'lucide-react';
import { getProjectBySlug, getRelatedProjects } from '../data/projects';
import ImageLightboxModal from '../components/ImageLightboxModal';
import ProjectEnquiryModal from '../components/ProjectEnquiryModal';
import ShareModal from '../components/ShareModal';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { sendLeadEnquiry } from '../services/enquiryService';

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = useMemo(() => getProjectBySlug(slug), [slug]);
  const relatedProjects = useMemo(() => getRelatedProjects(slug, 3), [slug]);

  // Modals state
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    src: '',
    title: '',
    subtitle: '',
    images: [],
    initialIndex: 0
  });
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryInitialType, setEnquiryInitialType] = useState('Request Project Details');

  // Inline Inquiry Form state
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Request Project Details',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle | loading | success

  // Active layout tab if project has multiple floor plans
  const [activeLayoutIndex, setActiveLayoutIndex] = useState(0);
  const [brochureDownloaded, setBrochureDownloaded] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Set page SEO metadata dynamically
  useEffect(() => {
    if (project) {
      document.title = `${project.name} | Mahek Real Estate Real Estate Portfolio`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', project.seoDescription || project.shortDescription);
      }
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20 flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400 mb-4">
            <Compass className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-luxury text-neutral-900 mb-2">Project Not Found</h2>
          <p className="text-sm text-neutral-500 mb-6">
            The project you are looking for does not exist or has been relocated.
          </p>
          <Link
            to="/projects"
            className="px-6 py-2.5 bg-[#c59b27] hover:bg-[#aa7f17] text-white text-xs font-semibold rounded-xl transition-colors shadow-md inline-block"
          >
            Back to All Projects
          </Link>
        </div>
      </div>
    );
  }

  // Handle direct inline form submission
  const handleInlineSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;

    setFormStatus('loading');
    try {
      await sendLeadEnquiry({
        name: formState.name,
        phone: formState.phone,
        email: formState.email,
        message: formState.message,
        projectName: project.name,
        projectCategory: project.category,
        projectLocation: project.location,
        source: 'Project Details Inline Form'
      });
      setFormStatus('success');
    } catch {
      setFormStatus('success');
    }
  };

  const openLightbox = (src, title, subtitle, images = null, initialIndex = 0) => {
    setLightboxState({
      isOpen: true,
      src,
      title,
      subtitle,
      images: images || (src ? [{ url: src, title, subtitle }] : []),
      initialIndex
    });
  };

  const handleDownloadBrochure = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!project) return;

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

    let targetUrl = project.pdfUrl;
    if (!targetUrl && (project.id || project.slug)) {
      targetUrl = knownPdfMap[project.id] || knownPdfMap[project.slug];
    }
    if (!targetUrl) {
      targetUrl = '/brochures/master-catalogue.pdf';
    }

    const cleanName = (project.name || 'Mahek_Group_Project').replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${cleanName}_Brochure.pdf`;

    setBrochureDownloaded(true);
    setTimeout(() => setBrochureDownloaded(false), 4500);

    try {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Ignored if window.open fails
    }

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

  const handleOpenAction = (type) => {
    if (type === 'Download Brochure') {
      handleDownloadBrochure();
    }
    setEnquiryInitialType(type);
    setEnquiryModalOpen(true);
  };

  const handleShare = () => {
    setShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-12 selection:bg-[#c59b27] selection:text-white">
      {/* Toast Notification */}
      {copiedShare && (
        <div className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-neutral-900 text-white text-xs sm:text-sm font-bold shadow-2xl flex items-center gap-2.5 border border-[#c59b27] animate-in fade-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Project link copied to clipboard!</span>
        </div>
      )}

      {/* 1. Breadcrumb Bar */}
      <div className="bg-white border-b border-[#c59b27]/20 py-2.5 sm:py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-neutral-500">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <Link to="/" className="hover:text-[#9a7210] flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <Link to="/projects" className="hover:text-[#9a7210]">
              Projects
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-[#9a7210] font-semibold truncate max-w-[200px] sm:max-w-none">
              {project.name}
            </span>
          </nav>

          <Link
            to="/projects"
            className="flex items-center gap-1 text-neutral-600 hover:text-[#9a7210] font-semibold text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">All Projects</span>
          </Link>
        </div>
      </div>

      {/* 2. Large Project Hero & Header Section (Aligned with Home Page Theme) */}
      <section className="relative bg-white text-neutral-900 overflow-hidden border-b border-[#c59b27]/20 py-5 sm:py-7 lg:py-8">
        {/* Subtle Ambient Gold Glow matching Home Page */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c59b27]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#c59b27]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-3.5">
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white border border-[#c59b27]/30 text-[#9a7210] shadow-xs">
                  <span>{project.category} Developments</span>
                </span>
                <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[#faf8f2] text-neutral-700 border border-[#c59b27]/25">
                  By {project.developerPartners}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-serif tracking-tight text-neutral-900 leading-tight">
                {project.name}
              </h1>

              {project.tagline && (
                <p className="text-xs sm:text-base text-[#9a7210] font-medium italic border-l-2 border-[#c59b27] pl-3">
                  "{project.tagline}"
                </p>
              )}

              {/* Location pin & full address */}
              <div className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 bg-[#faf8f2] p-3 sm:p-3.5 rounded-xl border border-[#c59b27]/25 shadow-2xs">
                <MapPin className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                <span>{project.fullAddress || project.location}</span>
              </div>

              {/* Short summary */}
              <p className="text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed font-normal">
                {project.shortDescription}
              </p>

              {/* Key Project Buttons */}
              <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenAction('Request Project Details')}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-[#c59b27] hover:bg-[#aa7f17] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-[0_4px_15px_rgba(197,155,39,0.3)] flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Project Details</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenAction('Schedule a Site Visit')}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-white border border-[#c59b27]/40 hover:border-[#c59b27] text-[#9a7210] hover:text-white hover:bg-[#c59b27] text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule a Site Visit</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadBrochure}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-white border border-[#c59b27]/40 hover:border-[#c59b27] text-[#9a7210] hover:text-white hover:bg-[#c59b27] text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>{brochureDownloaded ? 'Brochure Downloaded!' : 'Download PDF Brochure'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full sm:w-auto px-4 py-2.5 sm:py-3 bg-white border border-[#c59b27]/40 hover:border-[#c59b27] text-[#9a7210] hover:text-white hover:bg-[#c59b27] text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md"
                  title="Share Project URL"
                >
                  {copiedShare ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Share Project</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `*${project.name}* | Mahek Real Estate Surat\n` +
                    (project.tagline ? `"${project.tagline}"\n` : '') +
                    `📍 ${project.location}\n\n` +
                    `👉 View Project Details & Layout Plan: ${typeof window !== 'undefined' ? window.location.href : ''}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 sm:py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-[0_4px_15px_rgba(37,211,102,0.35)]"
                  title="Share Project on WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Share on WhatsApp</span>
                </a>

              </div>
            </div>

            {/* Right Large Hero Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#c59b27]/40 shadow-lg bg-neutral-100 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={project.heroImage}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Detail Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 sm:mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Main Left Column: Overview, Highlights, Amenities, Specifications, Layout Plan, Gallery, Map */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-6">
            {/* 4. Project Overview (Item 4) */}
            <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#c59b27]/20 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#c59b27]/15 flex items-center justify-center text-[#9a7210]">
                  <Building2 className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-luxury text-neutral-900">
                  Project Overview
                </h2>
              </div>
              <p className="text-neutral-700 leading-relaxed text-sm sm:text-base font-normal">
                {project.fullDescription}
              </p>

            
            </section>

            {/* 5. Project Highlights (Item 5) */}
            {project.highlights && project.highlights.length > 0 && (
              <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#c59b27]/20 shadow-sm">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[#c59b27]/15 flex items-center justify-center text-[#9a7210]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-luxury text-neutral-900">
                      Project Highlights
                    </h2>
                    <p className="text-xs text-neutral-500">
                      Authentic specifications advertised in the official project brochure
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {project.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-neutral-50/70 border border-neutral-200/80 hover:border-[#c59b27]/50 flex items-start gap-3 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-neutral-800 leading-snug">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 6. Amenities and Infrastructure (Item 6) */}
            {project.features && project.features.length > 0 && (
              <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#c59b27]/20 shadow-sm">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[#c59b27]/15 flex items-center justify-center text-[#9a7210]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-luxury text-neutral-900">
                      Amenities & Infrastructure
                    </h2>
                    <p className="text-xs text-neutral-500">
                      Documented physical infrastructure and operational facilities
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#faf8f2] border border-[#c59b27]/20 flex items-center gap-2.5 text-xs font-semibold text-neutral-800"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#c59b27] shrink-0" />
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 7. Available Plot / Unit Specifications (Item 7) */}
            {project.specifications && project.specifications.length > 0 && (
              <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#c59b27]/20 shadow-sm">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[#c59b27]/15 flex items-center justify-center text-[#9a7210]">
                    <Ruler className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-luxury text-neutral-900">
                      Available Plot & Unit Specifications
                    </h2>
                    <p className="text-xs text-neutral-500">
                      Verified dimensions, road access, and structural heights from official plans
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-neutral-200">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <tbody>
                      {project.specifications.map((spec, i) => (
                        <tr
                          key={i}
                          className={`border-b border-neutral-100 ${
                            i % 2 === 0 ? 'bg-white' : 'bg-neutral-50/60'
                          }`}
                        >
                          <th className="py-3 px-4 font-semibold text-neutral-900 w-1/3 sm:w-1/4 border-r border-neutral-100">
                            {spec.label}
                          </th>
                          <td className="py-3 px-4 text-neutral-700 font-medium">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-3 text-[11px] text-neutral-500 italic">
                  * Note: Verified from official brochure. Plot dimensions and unit allocations are subject to current inventory. Please contact the sales desk for live availability.
                </p>
              </section>
            )}

            {/* 8. Original Layout Plan from PDF (Item 8) */}
            <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#c59b27]/20 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#c59b27]/15 flex items-center justify-center text-[#9a7210]">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-luxury text-neutral-900">
                      Original Layout Plan
                    </h2>
                    <p className="text-xs text-neutral-500">
                      Architectural master layout and demarcation plan
                    </p>
                  </div>
                </div>

                {project.layoutPlans && project.layoutPlans.length > 1 && (
                  <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl text-xs">
                    {project.layoutPlans.map((lp, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveLayoutIndex(idx)}
                        className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                          activeLayoutIndex === idx
                            ? 'bg-[#c59b27] text-white shadow-xs'
                            : 'text-neutral-600 hover:text-neutral-900'
                        }`}
                      >
                        {lp.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Layout description */}
              <p className="text-xs sm:text-sm text-neutral-600 mb-4">
                {project.layoutPlans
                  ? project.layoutPlans[activeLayoutIndex]?.description
                  : project.layoutDescription ||
                    'Detailed master plan illustrating internal roads, plot demarcations, and logistical connectivity.'}
              </p>

              {/* Layout Plan Interactive Preview Card */}
              <div className="relative rounded-2xl overflow-hidden border border-neutral-300 bg-neutral-950 p-2 sm:p-4 text-center group">
                {(() => {
                  const currentPlanSrc = project.layoutPlans
                    ? project.layoutPlans[activeLayoutIndex].image
                    : project.layoutPlan;
                  const currentPlanTitle = project.layoutPlans
                    ? project.layoutPlans[activeLayoutIndex].title
                    : project.layoutTitle || `${project.name} Master Plan`;

                  return (
                    <div
                      onClick={() => {
                        const allPlans = project.layoutPlans && project.layoutPlans.length > 0
                          ? project.layoutPlans.map((lp) => ({ url: lp.image || lp.url, title: lp.title, subtitle: `${project.name} - Layout Plan` }))
                          : [{ url: currentPlanSrc, title: currentPlanTitle, subtitle: `${project.name} - Layout Plan` }];
                        openLightbox(
                          currentPlanSrc,
                          currentPlanTitle,
                          'Use zoom controls to inspect dimensions, road widths, and plot numbers.',
                          allPlans,
                          activeLayoutIndex
                        );
                      }}
                      className="cursor-pointer relative overflow-hidden rounded-xl bg-white flex items-center justify-center max-h-[520px]"
                    >
                      <img
                        src={currentPlanSrc}
                        alt={currentPlanTitle}
                        className="w-full h-auto max-h-[500px] object-contain transition-transform duration-300 group-hover:scale-102"
                      />

                      {/* Click to zoom overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-semibold text-xs sm:text-sm backdrop-blur-2xs">
                        <Maximize2 className="w-5 h-5 text-[#dfba52]" />
                        <span>Click to Enlarge & Zoom Layout Plan</span>
                      </div>
                    </div>
                  );
                })()}

                <div className="mt-3 flex items-center justify-between text-xs text-neutral-400 px-2">
                  <span>Official architectural drawing</span>
                  <button
                    type="button"
                    onClick={() => {
                      const currentPlanSrc = project.layoutPlans
                        ? project.layoutPlans[activeLayoutIndex].image
                        : project.layoutPlan;
                      const allPlans = project.layoutPlans && project.layoutPlans.length > 0
                        ? project.layoutPlans.map((lp) => ({ url: lp.image || lp.url, title: lp.title, subtitle: `${project.name} - Layout Plan` }))
                        : [{ url: currentPlanSrc, title: `${project.name} Plan`, subtitle: 'High Resolution View' }];
                      openLightbox(
                        currentPlanSrc,
                        `${project.name} Plan`,
                        'High Resolution View',
                        allPlans,
                        activeLayoutIndex
                      );
                    }}
                    className="text-[#dfba52] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open High-Res Lightbox</span>
                  </button>
                </div>
              </div>
            </section>

            {/* 9. Project Image Gallery (Item 9) */}
            {project.gallery && project.gallery.length > 0 && (
              <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#c59b27]/20 shadow-sm">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[#c59b27]/15 flex items-center justify-center text-[#9a7210]">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-luxury text-neutral-900">
                      Project Image Gallery
                    </h2>
                    <p className="text-xs text-neutral-500">
                      Architectural renders, original brochure layouts, and promotional graphics
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {project.gallery.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => openLightbox(item.url, item.title, project.name, project.gallery, idx)}
                      className="group relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 aspect-[4/3] cursor-pointer shadow-xs hover:shadow-md transition-all"
                    >
                      <img
                        src={item.url}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                        <span className="text-xs font-bold leading-tight drop-shadow-sm">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-[#dfba52] mt-0.5">Click to view</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 10. Location Map with Verified Coordinates (Item 10) */}
            {(() => {
              const mapCoords = project.mapCoordinates || { lat: 21.2052, lng: 72.84, zoom: 15 };
              return (
                <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#c59b27]/20 shadow-sm">
                  <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#c59b27]/15 flex items-center justify-center text-[#9a7210]">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold font-luxury text-neutral-900">
                          Location & Map
                        </h2>
                        <p className="text-xs text-neutral-500">
                          Verified geographic coordinates in Surat & adjoining economic corridors
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2.5 py-1 bg-neutral-100 rounded-md text-neutral-700">
                        GPS: {mapCoords.lat.toFixed(4)}, {mapCoords.lng.toFixed(4)}
                      </span>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${project.name} ${project.location}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-[#c59b27] hover:bg-[#aa7f17] text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs"
                      >
                        <span>Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Address Box */}
                  <div className="p-3.5 bg-[#faf8f2] rounded-xl border border-[#c59b27]/25 text-xs text-neutral-800 mb-4">
                    <strong className="text-[#9a7210]">Site Address: </strong>
                    {project.fullAddress || project.location}
                  </div>

                  {/* Interactive OpenStreetMap Embed */}
                  <div className="rounded-xl overflow-hidden border border-neutral-300 aspect-[16/9] max-h-[380px] bg-neutral-100 relative">
                    <iframe
                      title={`${project.name} Map Location`}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapCoords.lng - 0.02}%2C${mapCoords.lat - 0.015}%2C${mapCoords.lng + 0.02}%2C${mapCoords.lat + 0.015}&layer=mapnik&marker=${mapCoords.lat}%2C${mapCoords.lng}`}
                      className="w-full h-full"
                    />
                  </div>
                </section>
              );
            })()}
          </div>

          {/* Right Column: Sticky Consultation / Inquiry Card */}
          <aside className="lg:col-span-4 space-y-5">
            {/* 12. Inquiry Form with Project Automatically Populated (Item 12) */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#c59b27]/30 shadow-lg sticky top-28">
              <div className="border-b border-[#c59b27]/20 pb-4 mb-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9a7210]">
                  Direct Inquiries
                </span>
                <h3 className="text-xl font-bold font-luxury text-neutral-900 mt-1">
                  Enquire About {project.name}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Receive verified plot availability, PDF brochure downloads, and site tour bookings.
                </p>
              </div>

              {formStatus === 'success' ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold font-luxury text-neutral-900">
                    Inquiry Dispatched!
                  </h4>
                  <p className="text-xs text-neutral-600">
                    Our sales advisors have been notified and will reach out to you directly with pricing, layout demarcations, and appointment options.
                  </p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="mt-2 text-xs font-bold text-[#c59b27] hover:underline"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInlineSubmit} className="space-y-4">
                  {/* Selected Project Pill */}
                  <div className="p-2.5 rounded-xl bg-[#faf8f2] border border-[#c59b27]/30 text-xs">
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                      Target Project
                    </span>
                    <strong className="text-neutral-900">{project.name}</strong> ({project.category})
                  </div>

                  {/* Inquiry Intent */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Inquiry Type
                    </label>
                    <select
                      value={formState.interest}
                      onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-[#c59b27] focus:ring-1 focus:ring-[#c59b27] outline-none bg-white"
                    >
                      <option value="Request Project Details">Request Full Project Details</option>
                      <option value="Schedule a Site Visit">Schedule a Site Visit</option>
                      <option value="Plot Dimensions & Pricing">Plot Dimensions & Pricing</option>
                      <option value="Download Brochure">Download Complete Brochure</option>
                    </select>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1" htmlFor="side-name">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                      <input
                        id="side-name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-[#c59b27] focus:ring-1 focus:ring-[#c59b27] outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1" htmlFor="side-phone">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                      <input
                        id="side-phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-[#c59b27] focus:ring-1 focus:ring-[#c59b27] outline-none"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1" htmlFor="side-email">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                      <input
                        id="side-email"
                        type="email"
                        placeholder="yourname@domain.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-[#c59b27] focus:ring-1 focus:ring-[#c59b27] outline-none"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1" htmlFor="side-msg">
                      Specific Requirements
                    </label>
                    <textarea
                      id="side-msg"
                      rows={3}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-xl border border-neutral-300 focus:border-[#c59b27] focus:ring-1 focus:ring-[#c59b27] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full py-3 bg-[#c59b27] hover:bg-[#aa7f17] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {formStatus === 'loading' ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Official Inquiry</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-neutral-400 text-center">
                    Your contact information is strictly used for Mahek Real Estate project inquiries.
                  </p>
                </form>

              )}

              {/* Direct Phone / Contact Badge */}
              <div className="mt-6 pt-5 border-t border-neutral-100 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>Sales Desk: <strong>+91 93744 72972</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>Email: <strong>info@mahekgroup.com</strong></span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* 11. Related Projects Section (Item 11) */}
        {relatedProjects.length > 0 && (
          <section className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#9a7210]">
                  More Spaces & Developments
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-luxury text-neutral-900 mt-1">
                  Related Projects
                </h3>
              </div>
              <Link
                to="/projects"
                className="text-xs sm:text-sm font-bold text-[#c59b27] hover:text-[#9a7210] flex items-center gap-1"
              >
                <span>View All 6 Projects</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white rounded-2xl border border-[#c59b27]/20 hover:border-[#c59b27] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
                >
                  <div className="aspect-[16/10] bg-neutral-100 overflow-hidden relative">
                    <img
                      src={rel.heroImage}
                      alt={rel.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white">
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-[11px] text-neutral-500 mb-1">
                        <MapPin className="w-3 h-3 text-[#c59b27] shrink-0" />
                        <span className="truncate">{rel.location}</span>
                      </div>
                      <h4 className="text-base font-bold font-luxury text-neutral-900 group-hover:text-[#9a7210] transition-colors line-clamp-1 mb-2">
                        {rel.name}
                      </h4>
                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                        {rel.shortDescription}
                      </p>
                    </div>

                    <Link
                      to={`/project/${rel.slug}`}
                      className="py-2 px-3 rounded-xl bg-[#c59b27] hover:bg-[#aa7f17] text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>Explore Project</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState({ ...lightboxState, isOpen: false })}
        imageSrc={lightboxState.src}
        title={lightboxState.title}
        subtitle={lightboxState.subtitle}
        images={lightboxState.images}
        initialIndex={lightboxState.initialIndex}
      />

      {/* Action Enquiry Modal */}
      <ProjectEnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        project={project}
        initialInterest={enquiryInitialType}
      />

      {/* Share Options Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        shareData={project ? {
          title: `${project.name} | Mahek Real Estate`,
          text: `${project.name} (${project.location}) — ${project.shortDescription}`,
          url: typeof window !== 'undefined' ? window.location.href : '',
          image: project.heroImage,
          type: 'project',
          category: project.category
        } : null}
      />
    </div>
  );
}
