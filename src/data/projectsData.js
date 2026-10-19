import imgITPark from '../assets/images/1_800x600.jpg';
import imgIcon from '../assets/images/2_800x600.jpg';
import imgHilton from '../assets/images/ndimg-parallax-04-1024x683.jpg';
import imgDiamondPark from '../assets/images/3_800x600.jpg';
import imgTextilePark from '../assets/images/111.webp';
import imgMahekPark from '../assets/images/11_800x600.webp';
import imgVillas from '../assets/images/Screenshot_2025-09-12_134856_170b8efc-fcd0-41e0-8231-7eead09ac193_800x600.png';
import imgPharma from '../assets/images/e1.jpg';

export const allProjectsData = [
  {
    id: 'it-park',
    title: 'Mahek IT Park',
    location: 'Katargam, Surat, Gujarat',
    address: 'Opp. RJD Business Hub, Near Kiran Hospital, Katargam, Surat - 395004',
    type: 'commercial',
    category: 'Commercial & IT Hub',
    description: 'Premier multi-story commercial and technology park in Katargam, Surat. Built to modern global specifications, housing corporate chambers, tech firms, financial institutions, and high-street retail showrooms with extensive multi-level basement parking.',
    units: 'Corporate Offices & Retail',
    parking: 'Multi-Level Basement',
    beds: 'High-Speed Elevators',
    baths: '24/7 Power Backup',
    sqft: '500 - 15,000 sq.ft',
    price: 'Premium Commercial Hub',
    image: imgITPark,
    pdfUrl: '/brochures/mahek-it-park.pdf',
    featured: true,
    highlights: [
      'Corporate Headquarters of Mahek Real Estate',
      'Located directly opposite R.J.D Business Hub',
      'High-speed optical fiber backbone & 24/7 power backup',
      'Minutes from Kiran Multispeciality Hospital'
    ]
  },
  {
    id: 'hilton',
    title: 'Hilton Garden Inn Surat City Centre',
    location: 'Surat Railway Station Precinct, Surat',
    address: 'Steps from Surat Railway Station, Central Surat, Gujarat',
    type: 'hospitality',
    category: 'International Hospitality',
    description: "In 2019, Mahek Real Estate collaborated with the prestigious global Hilton Brand to develop one of Gujarat's first Hiltons. A magnificent 9-story luxury edifice featuring 104 guest rooms, two full-service restaurants (including Together & Co.), and three expansive banquet halls, redefining Surat's hospitality landscape.",
    units: '104 Luxury Rooms',
    parking: 'Valet & Covered Parking',
    beds: '3 Grand Banquet Halls',
    baths: '2 Full-Service Restaurants',
    sqft: '9-Story Edifice',
    price: 'Diwali 2024 Milestone',
    image: imgHilton,
    pdfUrl: '/Mahek-Group-Profile.pdf',
    featured: true,
    highlights: [
      "First Hilton Garden Inn in the State of Gujarat",
      'Just 500 meters from Surat Railway Station',
      '104 contemporary rooms & executive suites',
      '3 expansive banquet halls for weddings & corporate summits'
    ]
  },
  {
    id: 'icon',
    title: 'Mahek Icon (Parshwa Mahek Icon)',
    location: 'Sumul Dairy Road, Surat, Gujarat',
    address: 'Sumul Dairy Road, near Railway Station & Katargam, Surat',
    type: 'commercial',
    category: 'Commercial & Retail Complex',
    description: 'Iconic commercial hub developed along the prime Sumul Dairy Road corridor. Designed for high foot traffic and maximum street frontage, accommodating flagship retail showrooms, corporate offices, healthcare suites, and restaurants.',
    units: 'Showrooms & Offices',
    parking: 'Multi-Tier Parking',
    beds: 'Glass Curtain Façade',
    baths: 'High-Traffic Corridor',
    sqft: '350 - 5,000 sq.ft',
    price: 'Prime Retail & Office',
    image: imgIcon,
    pdfUrl: '/Mahek-Group-Profile.pdf',
    featured: true,
    highlights: [
      'Prime location on busy Sumul Dairy Road corridor',
      'Immediate access to Surat Railway Station & bus terminals',
      'Modern glass architectural façade with grand atrium',
      'Ample visitor and tenant multi-tier parking'
    ]
  },
  {
    id: 'diamond-park',
    title: 'Mahek Diamond Park',
    location: 'Katargam / Surat Diamond Corridor',
    address: 'Surat Diamond Manufacturing Hub, Gujarat',
    type: 'industrial',
    category: 'Specialized Industrial Hub',
    description: "Engineered specifically for Surat's world-leading natural and lab-grown diamond manufacturing industries. Features reinforced load-bearing construction, high-security surveillance infrastructure, uninterrupted industrial power, and clean-room capabilities.",
    units: 'Diamond Manufacturing Units',
    parking: 'Heavy Vehicle & Staff Parking',
    beds: 'Vaults & Security Systems',
    baths: 'Power Stabilization',
    sqft: 'Custom Industrial Floorplates',
    price: 'Industrial Infrastructure',
    image: imgDiamondPark,
    pdfUrl: '/Mahek-Group-Profile.pdf',
    featured: true,
    highlights: [
      "Custom-built for Surat's world-class diamond processing industry",
      'Multi-tier security vaults and biometric access zones',
      'Uninterrupted 3-phase industrial power supply',
      'Strategic synergy with Surat Diamond Bourse (SDB)'
    ]
  },
  {
    id: 'textile-park',
    title: 'Mahek Textile Park (Scap Group Manufacturing)',
    location: 'Surat Industrial Textile Belt, Gujarat',
    address: 'SCAP Techno Fab Pvt. Ltd. Manufacturing Facility, Surat',
    type: 'industrial',
    category: 'Technical Textiles Facility',
    description: 'State-of-the-art production hub for SCAP Techno Fab Pvt. Ltd. (Scap Group). Transitioned from trading in 2008 to full-scale PP Non-woven fabric manufacturing by 2011, now producing over 25 Million meters annually with ISO 9001:2015 certification for global and Fortune 500 clients.',
    units: '25M+ Meters / Year',
    parking: 'Container Loading Bays',
    beds: 'ISO 9001:2015 Certified',
    baths: 'Fortune 500 Supplier',
    sqft: 'Expansive Industrial Campus',
    price: 'Global Textile Export',
    image: imgTextilePark,
    pdfUrl: '/Mahek-Group-Profile.pdf',
    featured: false,
    highlights: [
      'Annual capacity exceeding 25 Million meters of PP non-woven fabric',
      'ISO 9001:2015 certified production processes',
      'Serving Fortune 500 corporations across packaging & healthcare',
      'Advanced European extrusion technology'
    ]
  },
  {
    id: 'mahek-park',
    title: 'The Mahek Park - 1 & Orange Mahek Park',
    location: 'Katargam / Surat Regional Corridor',
    address: 'Industrial Plotting Master Plan, Surat, Gujarat',
    type: 'industrial',
    category: 'Industrial Plots & Infrastructure',
    description: 'Master-planned industrial estates developed by Mahek Realty offering clear-title industrial plots. Featuring wide concrete logistics avenues, underground drainage, high-tension electricity lines, street lighting, and dedicated container transit corridors.',
    units: 'Industrial Plots & Sheds',
    parking: 'Heavy Logistic Corridors',
    beds: 'Clear Title Approved',
    baths: 'Underground Drainage',
    sqft: 'Plot Sizes from 1,000 sq.yd+',
    price: 'Industrial Investment',
    image: imgMahekPark,
    pdfUrl: '/brochures/the-mahek-park-1.pdf',
    featured: false,
    highlights: [
      'Comprehensive statutory zoning and industrial permissions',
      'Wide roads engineered for 40ft container truck movement',
      'Plug-and-play water and high-tension electrical connections',
      'Ideal for engineering, packaging, and textile units'
    ]
  },
  {
    id: 'villas',
    title: 'Mahek Villas & Mahek Bungalows',
    location: 'Surat, Gujarat',
    address: 'Prime Residential Belt, Surat, Gujarat',
    type: 'residential',
    category: 'Luxury Residential Enclave',
    description: 'Prestigious residential enclave representing the serene side of Mahek Realty. Offering bespoke luxury bungalows and contemporary villas set within a private gated community with landscaped recreational parks and elite security.',
    units: 'Bespoke Luxury Villas',
    parking: 'Private Multi-Car Garages',
    beds: '3 - 5 Bedroom Estates',
    baths: 'Private Garden Enclaves',
    sqft: '2,500 - 6,500 sq.ft',
    price: 'Luxury Residential Living',
    image: imgVillas,
    pdfUrl: '/brochures/mahek-residency.pdf',
    featured: true,
    highlights: [
      'Tranquil, peaceful residential enclave in Surat',
      'Architectural customization for private landowners',
      'Gated community with 24/7 security and lush gardens',
      'Built by Mahek Realty with heirloom-quality materials'
    ]
  },
  {
    id: 'life-science',
    title: 'Mahek Life Science (Pharmaceuticals)',
    location: 'Gujarat Pharmaceutical Zone',
    address: 'Mahek Life Science Production Plant, Gujarat',
    type: 'pharmaceutical',
    category: 'Pharmaceutical Intermediates',
    description: 'Specialized chemical and pharmaceutical manufacturing division producing key intermediates CMH and R CMH. These high-purity compounds are pivotal in the chemical synthesis of Pregabaline API, an essential therapeutic substance used worldwide.',
    units: 'CMH & R CMH Intermediates',
    parking: 'Secure Chemical Logistics',
    beds: 'Pregabaline API Synthesis',
    baths: 'Analytical Testing Labs',
    sqft: 'GMP Compliant Facility',
    price: 'Pharma Division',
    image: imgPharma,
    pdfUrl: '/Mahek-Group-Profile.pdf',
    featured: false,
    highlights: [
      'Key synthesis intermediate CMH & R CMH production',
      'Pivotal raw material for Pregabaline API therapeutic drugs',
      'Strict analytical quality control and GMP compliance',
      'Reliable partner for domestic and export pharmaceutical houses'
    ]
  }
];
