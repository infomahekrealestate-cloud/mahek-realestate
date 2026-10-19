import { useState, useEffect } from 'react';
import { 
  X, MapPin, BedDouble, Bath, Maximize2, 
  Check, Download, ShieldCheck 
} from 'lucide-react';

export default function ProjectModal({ project, onClose, onOpenConsultation }) {
  const [brochureRequested, setBrochureRequested] = useState(false);

  // Prevent background scroll when modal is open and handle Escape key
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow || '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const handleDownloadPdf = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

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

    const cleanName = ((project && (project.name || project.title)) || 'Mahek_Group_Project').replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${cleanName}_Brochure.pdf`;

    setBrochureRequested(true);
    setTimeout(() => setBrochureRequested(false), 4500);

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

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-[#c59b27]/40 rounded-2xl overflow-y-auto no-scrollbar shadow-2xl flex flex-col overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 border border-neutral-300 text-neutral-700 hover:text-[#9a7210] hover:border-[#c59b27] hover:shadow-md flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Banner */}
        <div className="relative h-72 sm:h-96 w-full flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40"></div>
          
          <div className="absolute top-6 left-6 flex items-center gap-2">
            {project.status && (
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md ${project.statusColor || ''}`}>
                {project.status}
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-[#9a7210] border border-[#c59b27]/40 backdrop-blur-md">
              {project.category}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/90 mb-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#e5c365]" />
                <span>{project.location}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                {project.title}
              </h2>
            </div>
            
            <div className="bg-white/95 border border-[#c59b27]/60 rounded-xl px-4 py-2 backdrop-blur-md hover:shadow-md transition-shadow self-start sm:self-auto">
              <span className="text-[10px] text-neutral-500 font-bold block">Starting From</span>
              <span className="text-xl font-bold font-serif text-[#9a7210]">{project.price}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 bg-white">
          
          {/* Key Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-neutral-200 text-center">
            <div>
              <div className="text-xs font-bold text-neutral-900 line-clamp-1">{project.units}</div>
              <div className="text-[10px] text-neutral-500 font-medium">Scope & Capacity</div>
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900 line-clamp-1">{project.sqft}</div>
              <div className="text-[10px] text-neutral-500 font-medium">Dimensions & Output</div>
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900 line-clamp-1">{project.beds}</div>
              <div className="text-[10px] text-neutral-500 font-medium">Key Infrastructure</div>
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900 line-clamp-1">{project.parking}</div>
              <div className="text-[10px] text-neutral-500 font-medium">Logistics & Transit</div>
            </div>
          </div>

          {/* Detailed Overview */}
          <div>
            <h3 className="text-lg font-bold font-serif text-neutral-900 mb-2">Project Overview</h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              {project.description} Designed, engineered, and operated with the visionary standards of Mahek Real Estate. Every square meter reflects over 40 years of entrepreneurial dedication, sustainable construction, and long-term value creation.
            </p>
          </div>

          {/* Highlights & Inclusions */}
          <div>
            <h3 className="text-lg font-bold font-serif text-neutral-900 mb-3">Key Features & Distinction</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-neutral-200 text-xs text-neutral-800 font-medium">
                  <div className="w-5 h-5 rounded-full bg-white border border-[#c59b27]/40 flex items-center justify-center flex-shrink-0 text-[#9a7210]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Callout Bar */}
          <div className="p-6 rounded-2xl bg-white border border-[#c59b27]/30 flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-md transition-shadow">
            <div>
              <h4 className="text-base font-bold font-serif text-neutral-900">Interested in this project?</h4>
              <p className="text-xs text-neutral-600 font-normal">Connect with Mahek Real Estate headquarters for commercial leasing, joint ventures, or inquiries.</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleDownloadPdf}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  brochureRequested
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-xs'
                    : 'bg-white border-neutral-300 hover:border-[#c59b27] hover:shadow-xs text-neutral-800'
                }`}
                title="Download Official Project PDF Brochure"
              >
                {brochureRequested ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Brochure Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-[#c59b27]" />
                    <span>Project Brochure</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (onOpenConsultation) onOpenConsultation(project);
                }}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#c59b27] hover:bg-[#aa7f17] text-white font-bold uppercase tracking-wider text-xs hover:shadow-[0_4px_15px_rgba(197,155,39,0.3)] transition-all whitespace-nowrap cursor-pointer"
              >
                Enquire Now
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
