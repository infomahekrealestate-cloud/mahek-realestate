import newsHilton from '../assets/images/people/news-hilton.jpg';
import newsLogistics from '../assets/images/people/news-logistics.jpg';
import newsItPark from '../assets/images/people/mahek-it-park-official.jpg';
import differenceGlobal from '../assets/images/people/difference-global.jpg';
import drSanjayMehta from '../assets/images/people/dr-sanjay-mehta.jpg';
import newsAmPark from '../assets/images/people/the-am-park-official.jpg';

export const articleCategories = [
  { id: 'All', label: 'All News (6)' },
  { id: 'Hospitality', label: 'Hospitality' },
  { id: 'Industrial & Real Estate', label: 'Industrial & Real Estate' },
  { id: 'Manufacturing & Textiles', label: 'Manufacturing & Textiles' },
  { id: 'Pharmaceuticals', label: 'Pharmaceuticals' }
];

export const articles = [
  {
    id: 1,
    slug: 'hilton-garden-inn-surat',
    title: 'Gujarat’s 1st Hilton Garden Inn: Landmark Hospitality Destination in Surat City Centre',
    date: 'Diwali 2024 / 2025',
    author: 'Mahek Hospitality & Hilton Worldwide',
    category: 'Hospitality',
    categoryBadge: 'Hospitality Alliances',
    image: newsHilton,
    excerpt: 'Gujarat’s first Hilton Garden Inn, developed in partnership with Hilton Worldwide. A 9-story luxury edifice steps from Surat Railway Station featuring 104 guest rooms and grand convention spaces.',
    fullStory: [
      'Developed in partnership with Hilton Worldwide, Gujarat’s first Hilton Garden Inn is located steps from Surat Railway Station in central Surat. The 9-story landmark offers 104 guest rooms, executive suites, and the signature Together & Co. restaurant.',
      'Designed to serve business travelers and corporate summits, the hotel features three grand ballrooms with advanced acoustic engineering, establishing a new luxury benchmark in the city.'
    ],
    highlights: [
      'First Hilton Garden Inn in Gujarat',
      'Prime location 500m from Surat Railway Station',
      '104 contemporary guest rooms and suites',
      'Together & Co. multi-cuisine restaurant',
      '3 expansive banquet and convention halls'
    ],
    milestone: 'Commissioned & Welcoming Guests'
  },
  {
    id: 2,
    slug: 'the-mahek-park-1-nh48',
    title: 'The Mahek Park-1: High-Speed Industrial & Logistics Corridor Commissioned on NH-48',
    date: '2024 - 2025',
    author: 'SG Maruti Developers & Mahek Real Estate',
    category: 'Industrial & Real Estate',
    categoryBadge: 'Highway Logistics',
    image: newsLogistics,
    excerpt: 'Directly fronting the 200-ft National Highway 48 near Ladvi Gurukul, this approved master-planned industrial park provides wide RCC avenues, heavy utilities, and government subsidies.',
    fullStory: [
      'Developed jointly by Mahek Real Estate and SG Maruti Developers, The Mahek Park-1 is strategically positioned on National Highway 48 near Ladvi Gurukul in Umbhel / Umrakh, meeting regional industrial demand.',
      'The approved master plan features 100-ft and 60-ft heavy RCC roads engineered for container transit, underground drainage, high-tension power, and eligibility for Gujarat warehouse and textile subsidies.'
    ],
    highlights: [
      'Direct 200 Ft. wide NH-48 road frontage',
      'Statutory Industrial Layout Approved',
      '100 Ft. and 60 Ft. heavy-duty RCC roads',
      'Eligible for Gujarat Warehouse & Textile subsidies',
      'Ready for immediate construction with utilities'
    ],
    milestone: 'Ready For Immediate Construction'
  },
  {
    id: 3,
    slug: 'mahek-it-park-katargam',
    title: 'Mahek I.T. Park: Katargam’s Premier Corporate & Technology Hub Opposite R.J.D Business Complex',
    date: '2024 - 2025',
    author: 'Mahek Realty & Parshwa Group',
    category: 'Industrial & Real Estate',
    categoryBadge: 'Commercial IT Hub',
    image: newsItPark,
    excerpt: 'Surat’s 1st government-approved IT park in Katargam, featuring 16-ft ceiling heights, five levels of structured parking, and spaces for corporate chambers and retail brands.',
    fullStory: [
      'Mahek I.T. Park is Surat’s landmark government-approved IT park, developed jointly by Mahek Real Estate and Parshwa Group beside R.J.D Complex on Sumul Dairy Road, Katargam.',
      'Engineered to international standards, the complex features 16-foot floor heights, 5-level structured parking, four dedicated elevators, and tailored spaces for IT firms, banks, and corporate headquarters.'
    ],
    highlights: [
      'Government Approved 1st I.T. Park in Surat',
      'Showrooms on lease with brands & corporate offices',
      '16-Foot monumental floor height on commercial levels',
      'Five comprehensive levels of structured parking',
      'Beside R.J.D Complex, Near Kiran Hospital, Katargam'
    ],
    milestone: 'Govt. Approved 1st I.T. Park'
  },
  {
    id: 4,
    slug: 'scap-group-technical-textiles',
    title: 'SCAP Group Crosses 25 Million Meters Annual Production in Technical Non-Woven Textiles',
    date: '2024 - 2025',
    author: 'SCAP Techno Fab Pvt. Ltd.',
    category: 'Manufacturing & Textiles',
    categoryBadge: 'Technical Textiles',
    image: differenceGlobal,
    excerpt: 'SCAP Group achieves a milestone annual output of 25+ million meters of high-tensile polypropylene non-woven technical fabrics with ISO 9001:2015 certification.',
    fullStory: [
      'SCAP Techno Fab Pvt. Ltd., the manufacturing division of Mahek Real Estate, has exceeded 25 million meters in annual polypropylene spunbond non-woven fabric production from its Surat facility.',
      'Holding ISO 9001:2015 certification, SCAP operates European extrusion machinery to supply high-tensile, eco-friendly technical textiles to medical, packaging, and multinational industrial partners worldwide.'
    ],
    highlights: [
      'Annual capacity exceeding 25,000,000 meters',
      'ISO 9001:2015 certified production processes',
      'Supplying Fortune 500 corporations in packaging & healthcare',
      'High-tensile PP spunbond fabric engineered for export',
      'Pioneer in sustainable non-woven material solutions'
    ],
    milestone: '25M+ Meters Annual Capacity'
  },
  {
    id: 5,
    slug: 'mahek-life-science-apis',
    title: 'Mahek Life Science Expands High-Purity Synthesis for Essential Pregabaline APIs',
    date: '2024 - 2025',
    author: 'Mahek Life Science Division',
    category: 'Pharmaceuticals',
    categoryBadge: 'Pharmaceutical APIs',
    image: drSanjayMehta,
    excerpt: 'Advancing India’s pharmaceutical supply chain through dedicated cGMP manufacturing of high-purity chemical intermediates CMH and R CMH for Pregabaline synthesis.',
    fullStory: [
      'Mahek Life Science, the chemical and pharmaceutical arm of Mahek Real Estate, has expanded its manufacturing footprint for high-purity intermediates CMH and R CMH.',
      'These specialized compounds are vital building blocks in the synthesis of Pregabaline API. Produced under strict cGMP protocols and analytical testing, they support domestic formulation houses and global supply chains.'
    ],
    highlights: [
      'High-purity CMH & R CMH specialized chemical intermediates',
      'Pivotal raw material for Pregabaline API synthesis',
      'cGMP compliant manufacturing with rigorous testing',
      'Strengthening domestic supply of essential medicines',
      'Trusted partner for top Indian and global pharma formulators'
    ],
    milestone: 'GMP Compliant Pharmaceutical Synthesis'
  },
  {
    id: 6,
    slug: 'the-am-park-orange-mahek-park',
    title: 'The AM Park & Orange Mahek Park: Expanding Plotted Industrial Footprint Across Gujarat',
    date: '2024 - 2025',
    author: 'Mahek Consortium & Angel Group',
    category: 'Industrial & Real Estate',
    categoryBadge: 'Commercial & Industrial',
    image: newsAmPark,
    excerpt: 'The AM Park delivers Surat’s premier G+2 commercial landmark at Bapa Sitaram Chowk on the 45m Simada-BRTS corridor, built for flagship showrooms, clinics, and corporate offices.',
    fullStory: [
      'The AM Park stands as an architectural milestone developed by Angel Group, Mahek Real Estate, and SG Maruti Developers at Bapa Sitaram Chowk on the 45-meter Simada-BRTS corridor in Surat.',
      'As Surat’s first low-rise G+2 complex, it offers 21-ft ground-floor showrooms, 19.5-ft upper lofts, and 15-ft basement parking, setting a new benchmark for corporate headquarters and retail flagships.'
    ],
    highlights: [
      '“The Right Growth Starts With The Right Location”',
      'Bapa Sitaram Chowk on 45m Simada-BRTS corridor',
      'Approved for Showrooms, Hospitals, Shops & Offices',
      'Monumental 21 Ft. ground floor & 15 Ft. basement parking',
      'First-of-its-kind G+2 architectural elevation'
    ],
    milestone: 'Landmark Commercial & Industrial Destination'
  }
];

export const getArticleById = (identifier) => {
  if (!identifier) return null;
  const clean = String(identifier).toLowerCase().trim();
  return articles.find(
    (a) =>
      String(a.id) === clean ||
      (a.slug && a.slug.toLowerCase() === clean) ||
      (a.title && a.title.toLowerCase().replace(/[^a-z0-9]/g, '-') === clean)
  );
};

export const getRelatedArticles = (currentId, limit = 3) => {
  const current = getArticleById(currentId);
  if (!current) return articles.slice(0, limit);
  const sameCategory = articles.filter((a) => a.id !== current.id && a.category === current.category);
  const others = articles.filter((a) => a.id !== current.id && a.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
};
