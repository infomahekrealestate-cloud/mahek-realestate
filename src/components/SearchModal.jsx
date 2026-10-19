import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, ArrowRight, Eye, Building2 } from 'lucide-react';
import { projects } from '../data/projects';
import { allProjectsData } from '../data/projectsData';

export default function SearchModal({ isOpen, onClose, onSelectProject }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  // Prevent background scroll when modal is open and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  // Unified normalized list of projects
  const searchItems = useMemo(() => {
    // 1. The 6 Authentic PDF-Verified Projects
    const pdfItems = projects.map((p) => ({
      id: p.id,
      title: p.name,
      category: p.category,
      location: p.location,
      description: p.shortDescription,
      image: p.heroImage,
      isPdf: true,
      project: p
    }));

    // Exclude duplicates from allProjectsData that already exist in PDF projects
    const duplicateIds = new Set(['it-park', 'mahek-park', 'villas']);

    // 2. Additional Corporate & Strategic Developments
    const corporateItems = allProjectsData
      .filter((p) => !duplicateIds.has(p.id))
      .map((p) => {
        // Construct full project object matching ProjectDetailModal specs
        const normalizedProject = {
          id: p.id,
          slug: p.id,
          name: p.title,
          title: p.title,
          category: p.category || 'Commercial',
          categoryLabel: p.category,
          location: p.location,
          address: p.address || p.location,
          shortDescription: p.description,
          fullDescription: p.description,
          heroImage: p.image,
          image: p.image,
          pdfUrl: p.pdfUrl || '/Mahek-Group-Profile.pdf',
          layoutPlan: p.image,
          layoutTitle: `${p.title} Development Overview`,
          layoutDescription: `Architectural and development outline for ${p.title}.`,
          highlights: p.highlights || [
            `Prime development in ${p.location}`,
            `Developed to Mahek Real Estate corporate standards`,
            `High accessibility and infrastructure connectivity`
          ],
          features: p.highlights || [
            '24/7 Power Infrastructure',
            'Strategic Regional Connectivity',
            'Modern Architectural Facade'
          ],
          specifications: [
            { label: 'Category', value: p.category || 'Commercial' },
            { label: 'Location', value: p.location },
            { label: 'Address', value: p.address || p.location },
            { label: 'Configuration / Units', value: p.units || 'Prime Units' },
            { label: 'Parking & Access', value: p.parking || 'Dedicated Parking' },
            { label: 'Area / Dimensions', value: p.sqft || 'Comprehensive Campus' },
            { label: 'Status / Milestone', value: p.price || 'Operational & Delivered' }
          ],
          gallery: [
            { title: p.title, url: p.image }
          ]
        };

        return {
          id: p.id,
          title: p.title,
          category: p.category,
          location: p.location,
          description: p.description,
          image: p.image,
          isPdf: false,
          project: normalizedProject
        };
      });

    return [...pdfItems, ...corporateItems];
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return searchItems;
    const q = query.toLowerCase();
    return searchItems.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [query, searchItems]);

  const handleSelect = (item) => {
    onClose();
    if (onSelectProject) {
      onSelectProject(item.project);
    } else {
      navigate(`/project/${item.project.slug || item.project.id}`);
    }
  };

  const handleKeyDownInput = (e) => {
    if (e.key === 'Enter' && results.length > 0) {
      handleSelect(results[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-20 px-2 sm:px-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl bg-white border border-[#c59b27]/40 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-2xl relative overscroll-contain flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center gap-3 pb-3 sm:pb-4 border-b border-neutral-200">
          <Search className="w-5 h-5 text-[#c59b27] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDownInput}
            placeholder="Search projects & developments (e.g. Mahek IT Park, Orange Mahek, Hilton)..."
            className="w-full bg-transparent text-sm sm:text-base text-neutral-900 placeholder-neutral-400 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-neutral-700 px-2 py-1 rounded cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Info */}
        <div className="flex items-center justify-between pt-3 pb-2 px-1 text-xs text-neutral-500 font-semibold">
          <span>{results.length} Project{results.length === 1 ? '' : 's'} Found</span>
          <span className="text-[11px] text-[#9a7210] hidden sm:inline">
            Click any project to view full architectural details & floor plans
          </span>
        </div>

        {/* Results List */}
        <div className="mt-1 overflow-y-auto space-y-2.5 sm:space-y-3 pr-1 flex-1">
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect(item);
                }
              }}
              className="p-3 sm:p-4 rounded-2xl bg-white border border-neutral-200/90 hover:border-[#c59b27] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer transition-all duration-200 group hover:shadow-[0_8px_20px_rgba(197,155,39,0.12)] hover:-translate-y-0.5"
            >
              <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover border border-neutral-200 group-hover:border-[#c59b27]/60 transition-colors"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="mb-0.5">
                    <h4 className="text-sm sm:text-base font-bold font-serif text-neutral-900 group-hover:text-[#9a7210] transition-colors truncate">
                      {item.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                    <span className="truncate max-w-[320px]">{item.location}</span>
                  </div>

                  <p className="text-xs text-neutral-600 line-clamp-1 hidden sm:block font-normal">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Button: View Details */}
              <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100 shrink-0">
                <span className="text-[10px] px-2.5 py-1 rounded-full border border-neutral-200 text-neutral-600 uppercase font-semibold bg-neutral-50">
                  {item.category}
                </span>

                <div className="flex items-center gap-1 text-xs font-bold text-[#9a7210] group-hover:text-[#c59b27] transition-colors bg-[#c59b27]/10 px-3 py-1.5 rounded-xl border border-[#c59b27]/20 group-hover:border-[#c59b27]">
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}

          {results.length === 0 && (
            <div className="text-center py-12 text-neutral-500 text-sm">
              <Building2 className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
              <p className="font-semibold text-neutral-700">No developments found matching "{query}"</p>
              <p className="text-xs text-neutral-400 mt-1">Try searching for "Mahek IT Park", "AM Park", "Residency", or "Hilton"</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
