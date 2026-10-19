import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Check, Eye, Send, ArrowRight,
  ShieldCheck, Layers, Ruler, Factory, Building2, Home, Share2
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

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-xl sm:rounded-2xl overflow-hidden border border-[#c59b27]/25 bg-white hover:border-[#c59b27] transition-all duration-300 hover:shadow-[0_20px_45px_-10px_rgba(197,155,39,0.22)] flex flex-col justify-between"
            >
              {/* Image Container with Badges */}
              <Link
                to={`/project/${project.slug || project.id}`}
                className="block relative h-36 sm:h-52 md:h-64 overflow-hidden bg-neutral-900 group/img"
              >
                <img
                  src={project.heroImage}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-108 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30"></div>
                
                {/* Category Badge */}
                <div className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-wider bg-white/95 text-[#9a7210] border border-[#c59b27]/40 shadow-xs backdrop-blur-md">
                    {getCategoryIcon(project.category)}
                    <span>{project.category}</span>
                  </span>
                </div>

                {/* Share Button (Top Right) */}
                <div className="absolute top-2 right-2 sm:top-3.5 sm:right-3.5 z-10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShareProject(project);
                    }}
                    title="Share Project"
                    aria-label="Share Project"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 hover:bg-[#c59b27] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Location Pill */}
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center gap-1 text-[9px] sm:text-xs text-white bg-black/75 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-white/20 font-medium truncate">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#e5c365] shrink-0" />
                  <span className="truncate">{project.location}</span>
                </div>
              </Link>

              {/* Card Content */}
              <div className="p-3 sm:p-5 md:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm sm:text-lg md:text-xl font-bold font-serif text-neutral-900 group-hover:text-[#9a7210] transition-colors mb-1 sm:mb-2 line-clamp-1">
                    <Link to={`/project/${project.slug || project.id}`}>
                      {project.name}
                    </Link>
                  </h3>
                  
                  <p className="text-[11px] sm:text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-2.5 sm:mb-4 font-normal">
                    {project.shortDescription}
                  </p>

                  {/* Highlights Bullet Points */}
                  <div className="hidden sm:block space-y-2 mb-5">
                    {project.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#c59b27] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: View Details, Enquire Now & WhatsApp Enquiry */}
                <div className="pt-2.5 sm:pt-4 border-t border-neutral-100 flex items-center gap-1 sm:gap-2">
                  <Link
                    to={`/project/${project.slug || project.id}`}
                    className="flex-1 py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-lg sm:rounded-xl bg-white border border-[#c59b27]/40 hover:border-[#c59b27] text-[#9a7210] hover:text-white hover:bg-[#c59b27] font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer hover:shadow-md"
                    title="View Project Details"
                  >
                    <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    <span className="truncate">Details</span>
                  </Link>

                  <button
                    onClick={() => onEnquire && onEnquire(project)}
                    className="py-1.5 sm:py-2 px-1.5 sm:px-3 rounded-lg sm:rounded-xl bg-[#c59b27] hover:bg-[#aa7f17] text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer shadow-xs hover:shadow-[0_4px_15px_rgba(197,155,39,0.3)] shrink-0"
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
                    <span className="hidden xl:inline text-xs font-bold uppercase tracking-wider">WhatsApp</span>
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
