import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Check, Eye, Send, ArrowRight,
  ShieldCheck, Layers, Ruler, Factory, Building2, Home, Share2, CheckCircle2
} from 'lucide-react';
import { projects } from '../data/projects';
import WhatsAppIcon from './WhatsAppIcon';
import ShareModal from './ShareModal';

export default function SignatureProjects({ onViewDetails, onEnquire, activeFilters }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [shareProject, setShareProject] = useState(null);

  const categories = [
    { id: 'All', label: 'All Projects (6)' },
    { id: 'Residential', label: 'Residential' },
    { id: 'Commercial', label: 'Commercial' },
    { id: 'Industrial', label: 'Industrial' }
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Search / activeFilters if provided
      if (activeFilters) {
        if (activeFilters.propertyType && activeFilters.propertyType !== 'all') {
          if (activeFilters.propertyType.toLowerCase() !== p.category.toLowerCase()) return false;
        }
        if (activeFilters.location && activeFilters.location !== 'all') {
          const locQuery = activeFilters.location.toLowerCase().replace('-', ' ');
          if (!p.location.toLowerCase().includes(locQuery)) return false;
        }
      }
      return true;
    });
  }, [selectedCategory, activeFilters]);

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'residential':
        return <Home className="w-3.5 h-3.5" />;
      case 'commercial':
        return <Building2 className="w-3.5 h-3.5" />;
      case 'industrial':
        return <Factory className="w-3.5 h-3.5" />;
      default:
        return <Building2 className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="projects" className="py-5 md:py-7 bg-white relative overflow-hidden">
      {/* Decorative Gold Ambient Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#c59b27]/8 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#c59b27]/8 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-2.5 sm:px-5 md:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5">
          
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif text-neutral-900 tracking-tight">
            Explore Our <span className="gold-gradient-text">Projects</span>
          </h2>
          
          <p className="mt-2 sm:mt-2.5 text-neutral-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Discover spaces for living, business, and industrial growth. Extracted directly from official blueprints and brochures, featuring verified clearances, dimensions, and architectural master plans.
          </p>

          {/* Category Filter Tabs Centered */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-2xl bg-white border border-neutral-300 mt-3.5 max-w-fit mx-auto shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#c59b27] text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>


        {/* 6 Projects Responsive Grid (2 columns on mobile/small screen, 3 on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 md:gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="card-hover-fx group rounded-xl sm:rounded-2xl overflow-hidden border border-[#c59b27]/25 bg-white hover:border-[#c59b27] hover:shadow-[0_20px_45px_-10px_rgba(197,155,39,0.22)] flex flex-col justify-between"
            >
              {/* Image Container with Badges */}
              <Link
                to={`/project/${project.slug || project.id}`}
                className="block relative h-36 sm:h-52 md:h-64 overflow-hidden bg-neutral-900 group/img isolate"
              >
                <img
                  src={project.heroImage}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-105 group-hover:scale-105 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30"></div>
                
                {/* Category Badge */}
                <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8.5px] sm:text-xs font-bold uppercase tracking-wider bg-white/95 text-[#9a7210] border border-[#c59b27]/40 shadow-xs backdrop-blur-md">
                    {getCategoryIcon(project.category)}
                    <span>{project.category}</span>
                  </span>
                </div>

                {/* Share Button (Top Right) */}
                <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 z-10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShareProject(project);
                    }}
                    title="Share Project"
                    aria-label="Share Project"
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/60 hover:bg-[#c59b27] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95"
                  >
                    <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>

                {/* Location Pill */}
                <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-3 sm:left-3 sm:right-3 flex items-center gap-1 text-[8.5px] sm:text-xs text-white bg-black/75 backdrop-blur-md px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-md sm:rounded-xl border border-white/20 font-medium truncate">
                  <MapPin className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#e5c365] shrink-0" />
                  <span className="truncate">{project.location}</span>
                </div>

                {/* Standout Key USP Badge on Image */}
                {project.cardBadge && (
                  <div className="absolute bottom-8 sm:bottom-12 left-1.5 sm:left-3 pointer-events-none z-10">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-[11px] font-bold bg-white/95 text-[#9a7210] border border-[#c59b27]/40 shadow-md backdrop-blur-md">
                      <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#c59b27] shrink-0" />
                      <span className="truncate max-w-[110px] min-[400px]:max-w-[140px] sm:max-w-none">{project.cardBadge}</span>
                    </span>
                  </div>
                )}
              </Link>

              {/* Card Content (Balanced side spacing for small screens) */}
              <div className="px-2.5 py-3 sm:px-4 sm:py-4 md:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-lg md:text-xl font-bold font-serif text-neutral-900 group-hover:text-[#9a7210] transition-colors mb-1 sm:mb-2 line-clamp-1">
                    <Link to={`/project/${project.slug || project.id}`}>
                      {project.name}
                    </Link>
                  </h3>
                  
                  <p className="text-[10px] sm:text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-2 sm:mb-3 font-normal">
                    {project.shortDescription}
                  </p>

                  {/* Prominent Project Highlights Section - Visible on BOTH Mobile & Desktop */}
                  <div className="mt-1.5 pt-1.5 sm:mt-3 sm:pt-3 border-t border-[#c59b27]/20 mb-2.5 sm:mb-4">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <span className="inline-flex items-center gap-1 text-[8.5px] sm:text-[11px] font-bold uppercase tracking-wider text-[#9a7210]">
                        <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#c59b27] shrink-0" />
                        <span>Project Highlights</span>
                      </span>
                      {project.highlights && project.highlights.length > 2 && (
                        <span className="text-[7.5px] sm:text-[10px] text-neutral-400 font-medium">
                          +{project.highlights.length - 2} verified
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      {(project.keyUspList || project.highlights.slice(0, 2)).slice(0, 2).map((hl, i) => (
                        <div
                          key={i}
                          className="px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-md sm:rounded-xl bg-[#faf8f2] border border-[#c59b27]/25 hover:border-[#c59b27]/50 flex items-center gap-1 sm:gap-2 transition-colors"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#c59b27] shrink-0" />
                          <span className="text-[9px] sm:text-xs font-semibold text-neutral-800 line-clamp-1 leading-snug">
                            {hl}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons: View Details, Enquire Now & WhatsApp Enquiry */}
                <div className="pt-2 sm:pt-4 border-t border-neutral-100 flex items-center gap-1 sm:gap-2">
                  <Link
                    to={`/project/${project.slug || project.id}`}
                    className="flex-1 py-1.5 sm:py-2 px-1 sm:px-2 rounded-lg sm:rounded-xl bg-white border border-[#c59b27]/40 hover:border-[#c59b27] text-[#9a7210] hover:text-white hover:bg-[#c59b27] font-bold text-[9.5px] sm:text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer hover:shadow-md"
                    title="View Project Details"
                  >
                    <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    <span className="truncate">Details</span>
                  </Link>

                  <button
                    onClick={() => onEnquire && onEnquire(project)}
                    className="py-1.5 sm:py-2 px-1.5 sm:px-3 rounded-lg sm:rounded-xl bg-[#c59b27] hover:bg-[#aa7f17] text-white font-bold text-[9.5px] sm:text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer shadow-xs hover:shadow-[0_4px_15px_rgba(197,155,39,0.3)] shrink-0"
                    title="Enquire Now"
                  >
                    <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    <span className="hidden min-[420px]:inline truncate">Enquire</span>
                  </button>

                  <a
                    href={`https://wa.me/919376622000?text=${encodeURIComponent(
                      `Hello Mahek Real Estate,\n\nI am interested in inquiring about *${project.name || project.title}* (${project.location}). Please share pricing and availability.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 sm:py-2 px-1.5 sm:px-3 rounded-lg sm:rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer shadow-xs hover:shadow-[0_4px_15px_rgba(37,211,102,0.35)] shrink-0"
                    title="WhatsApp Enquiry"
                    aria-label="WhatsApp Enquiry"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" />
                    <span className="hidden xl:inline text-xs font-bold tracking-wider">WhatsApp</span>
                  </a>
                </div>
              </div>



            </div>
          ))}
        </div>

        {/* Empty filter message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-neutral-300 mt-6">
            <h4 className="text-lg font-bold text-neutral-900 mb-1">No developments match your current filter</h4>
            <p className="text-sm text-neutral-500">Select "All Projects" to view all 6 flagship developments.</p>
          </div>
        )}

      </div>

      {/* Share Project Modal */}
      <ShareModal
        isOpen={!!shareProject}
        onClose={() => setShareProject(null)}
        shareData={shareProject ? {
          title: `${shareProject.name} | Mahek Real Estate`,
          text: `${shareProject.name} (${shareProject.location}) — ${shareProject.shortDescription}`,
          url: `${typeof window !== 'undefined' ? window.location.origin : ''}/project/${shareProject.slug || shareProject.id}`,
          image: shareProject.heroImage,
          type: 'project',
          category: shareProject.category
        } : null}
      />
    </section>
  );
}
