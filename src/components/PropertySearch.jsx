import { useState } from 'react';
import { Search, MapPin, Building, DollarSign, Filter } from 'lucide-react';

export default function   PropertySearch({ onFilterChange }) {
  const [propertyType, setPropertyType] = useState('all');
  const [location, setLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [status, setStatus] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange({ propertyType, location, priceRange, status });
    }
    const projectsElem = document.getElementById('projects');
    if (projectsElem) {
      projectsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setPropertyType('all');
    setLocation('all');
    setPriceRange('all');
    setStatus('all');
    if (onFilterChange) {
      onFilterChange({ propertyType: 'all', location: 'all', priceRange: 'all', status: 'all' });
    }
  };

  return (
    <section className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
      <div className="bg-white border border-[#c59b27]/30 rounded-2xl p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
          
          {/* Property Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#9a7210] uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Property Type</span>
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2.5 text-sm text-neutral-800 font-medium focus:outline-none focus:border-[#c59b27] transition-colors cursor-pointer"
            >
              <option value="all">All Sectors</option>
              <option value="commercial">Commercial & IT Parks</option>
              <option value="hospitality">Hospitality & Hotels</option>
              <option value="industrial">Industrial & Textile Parks</option>
              <option value="residential">Luxury Residential & Villas</option>
              <option value="pharma">Pharma & Life Sciences</option>
            </select>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#9a7210] uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Location</span>
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2.5 text-sm text-neutral-800 font-medium focus:outline-none focus:border-[#c59b27] transition-colors cursor-pointer"
            >
              <option value="all">All Locations (Surat & Gujarat)</option>
              <option value="katargam">Katargam, Surat</option>
              <option value="city-centre">Surat City Centre</option>
              <option value="sumul-dairy">Sumul Dairy Road, Surat</option>
              <option value="industrial-zones">Surat Industrial Zones</option>
              <option value="pipodara">Pipodara / Kosamba Corridor</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#9a7210] uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Investment Scale</span>
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2.5 text-sm text-neutral-800 font-medium focus:outline-none focus:border-[#c59b27] transition-colors cursor-pointer"
            >
              <option value="all">Any Scale</option>
              <option value="commercial-lease">Commercial Leasing</option>
              <option value="industrial-plots">Industrial Infrastructure</option>
              <option value="luxury-units">Luxury Residential</option>
              <option value="institutional">Institutional Partnership</option>
            </select>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#9a7210] uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Status</span>
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2.5 text-sm text-neutral-800 font-medium focus:outline-none focus:border-[#c59b27] transition-colors cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="operational">Operational & Active</option>
              <option value="opening-soon">Opening Soon (Diwali 2024 / 2025)</option>
              <option value="leasing-fast">Commercial Leasing Open</option>
              <option value="completed">Fully Delivered</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="pt-6 flex gap-2">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#c59b27] hover:bg-[#aa7f17] hover:shadow-[0_4px_15px_rgba(197,155,39,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Filter Projects</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              title="Reset Filters"
              className="px-3 py-2.5 rounded-xl bg-white border border-neutral-300 text-neutral-600 hover:text-neutral-900 hover:border-[#c59b27] text-xs font-semibold transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}
