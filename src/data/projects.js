/**
 * Mahek Real Estate Projects Data
 * Extracted directly from MASTER CATALOUGE.pdf
 * Source of Truth: MASTER CATALOUGE Pages 2 to 11
 */
import { allProjectsData } from './projectsData';

export const projects = [
  {
    id: 'the-mahek-park-1',
    slug: 'the-mahek-park-1',
    name: 'The Mahek Park-1',
    category: 'Industrial',
    categoryLabel: 'Industrial / Plotted Development',
    developerPartners: 'SG Maruti Developers & Mahek Real Estate',
    tagline: 'તમારા વ્યવસાયને મળશે નવી જગ્યા, નવી ગતિ અને નવી ઊંચાઈ!',
    taglineEn: 'The Only Industrial Project with the Best Infrastructure on the National Highway',
    location: 'National Highway No. 48, near Ladvi Gurukul, Umrakh, Gujarat',
    address: 'National Highway No.48, B/H. Ladvi Gurukul, Umbhel (Umrakh), Surat, Gujarat',
    shortDescription: 'Master-planned industrial park on NH-48 near Ladvi Gurukul, featuring wide RCC roads, ready infrastructure, and immediate construction readiness.',
    fullDescription: 'A premier industrial plotted hub on NH-48 with direct 200-foot frontage near Ladvi Gurukul. Built for manufacturing, logistics, and warehousing, it features statutory approved layouts, 100 ft and 60 ft heavy RCC avenues, underground utilities, and eligibility for state industrial subsidies.',
    heroImage: '/projects/the-mahek-park-1/hero.png',
    brochureCover: '/projects/the-mahek-park-1/brochure_cover.png',
    brochureFeature: '/projects/the-mahek-park-1/brochure_feature.png',
    pdfUrl: '/brochures/the-mahek-park-1.pdf',
    layoutPlan: '/projects/the-mahek-park-1/layout_plan.png',
    layoutTitle: 'Industrial Plotted Master Layout Plan',
    layoutDescription: 'Approved master plan featuring 100+ industrial plots with highway frontage, 100-foot and 60-foot logistics corridors, and 33-foot internal feeder roads.',
    cardBadge: '200 Ft. NH-48 Frontage',
    keyUspList: [
      '200 Ft. Wide NH-48 Highway Frontage',
      '100 Ft. & 60 Ft. Heavy RCC Roads',
      'Statutory Approved Industrial Layout Plan'
    ],
    highlights: [
      'Direct 200 Ft. Wide National Highway No. 48 Frontage',
      'Industrial Layout Approved (ઈન્ડસ્ટ્રીયલ પ્લાન પાસ)',
      '100 Ft. & 60 Ft. Wide Heavy RCC Concrete Roads',
      'Textile Area & Regional Market Connection',
      'Eligible for Gujarat Warehouse & Textile Policy Subsidies',
      'Ready for Immediate Construction (બાંધકામ માટે તૈયાર)',
      'Underground Drainage Network & Street Lighting',
      'Minutes from Kadodara Junction & Kamrej Corridor'
    ],
    features: [
      'Approved Industrial Master Plan',
      'Direct 200 Ft. National Highway 48 Frontage',
      '100 Ft. & 60 Ft. Wide RCC Roads',
      '33 Ft. & 32.9 Ft. Internal Feeder Roads',
      'Textile Area & Market Connectivity',
      'Street Lighting Infrastructure',
      'Underground Drainage Line',
      'Warehouse & Textile Policy Subsidy Eligibility',
      'Strategic Kadodara Connectivity'
    ],
    specifications: [
      { label: 'Category', value: 'Industrial / Plotted Development' },
      { label: 'Location', value: 'National Highway No. 48, near Ladvi Gurukul, Umbhel, Surat' },
      { label: 'Highway Frontage', value: '200 Ft. Wide National Highway No. 48' },
      { label: 'Main Internal Roads', value: '100 Ft. and 60 Ft. Wide RCC Roads' },
      { label: 'Secondary Roads', value: '33 Ft. and 32.9 Ft. Wide Roads' },
      { label: 'Sample Plot Dimensions', value: '34\'-5" × 187\'-7" (718 Sq.Yds), 33\'-0" × 131\'-0" (480 Sq.Yds), 16\'-6" × 130\'-0" (238 Sq.Yds), 60\'-2" × 178\'-4" (1134 Sq.Yds)' },
      { label: 'Layout Approval', value: 'Industrial Plan Approved' },
      { label: 'Construction Readiness', value: 'Ready for Immediate Construction' },
      { label: 'Policy Incentives', value: 'Eligible for Government Textile & Warehouse Subsidies' }
    ],
    gallery: [
      { title: 'Industrial Development Concept', url: '/projects/the-mahek-park-1/hero.png' },
      { title: 'Official Brochure Cover', url: '/projects/the-mahek-park-1/brochure_cover.png' },
      { title: 'Infrastructure & Location Highlights', url: '/projects/the-mahek-park-1/brochure_feature.png' },
      { title: 'Master Layout Plan', url: '/projects/the-mahek-park-1/layout_plan.png' },
      { title: 'Project Amenities Ribbon', url: '/projects/the-mahek-park-1/amenities.png' },
      { title: 'Ready for Construction Badge', url: '/projects/the-mahek-park-1/ready_badge.png' },
      { title: 'Full Master Brochure Spread', url: '/projects/the-mahek-park-1/layout_full.png' }
    ],
    mapCoordinates: {
      lat: 21.2052,
      lng: 73.0132,
      zoom: 15
    },
    availability: 'Contact us for details',
    pdfSource: 'MASTER CATALOUGE Pages 2–3',
    seoTitle: 'The Mahek Park-1 | Industrial Plots on NH 48 Surat | Mahek Real Estate',
    seoDescription: 'Explore The Mahek Park-1 industrial plotted development on National Highway 48, near Ladvi Gurukul, Umrakh, Surat. Featuring 100ft & 60ft RCC roads, approved plans, and ready infrastructure.'
  },
  {
    id: 'orange-mahek-park',
    slug: 'orange-mahek-park',
    name: 'Orange Mahek Park',
    category: 'Industrial',
    categoryLabel: 'Industrial Park',
    developerPartners: 'Amaara, Orange & Mahek Real Estate',
    tagline: 'લાભ અને વૃદ્ધિનું સરનામું, તમારું પોતાનું ઔદ્યોગિક પ્લોટ!',
    taglineEn: 'Where the Growth is Guaranteed — Best Industrial Rental Income with Best Connectivity',
    location: 'Opposite Ashwariya Mill, behind Police Station, Surat–Bardoli–Kadodara Road, Gujarat',
    address: 'Opposite Ashwariya Mill, B/H. Police Station, Surat-Bardoli-Kadodara Road, Gujarat',
    shortDescription: 'Strategically located industrial enclave on Surat-Bardoli Road with 80-ft logistics avenues, high rental demand, and ready infrastructure.',
    fullDescription: 'An integrated industrial park opposite Ashwariya Mill on Surat-Bardoli-Kadodara Road. Tailored for textiles, manufacturing, and logistics, offering plot sizes from 16\'-6" × 135\', 80 ft and 60 ft concrete roadways, perimeter security, and complete utility connections.',
    heroImage: '/projects/orange-mahek-park/hero.png',
    brochureCover: '/projects/orange-mahek-park/brochure_cover.png',
    brochureFeature: '/projects/orange-mahek-park/brochure_feature.png',
    pdfUrl: '/brochures/orange-mahek-park.pdf',
    layoutPlan: '/projects/orange-mahek-park/layout_plan.png',
    layoutTitle: 'Orange Mahek Park Industrial Layout Plan',
    layoutDescription: 'Engineered plotting layout featuring 80 ft and 60 ft logistics corridors, 33 ft access roads, and plots ranging from 221 to 743 sq.yd.',
    cardBadge: '80 Ft. Logistics Corridor',
    keyUspList: [
      'Opposite Ashwariya Mill, Kadodara Road',
      '80 Ft. & 60 Ft. Wide Heavy RCC Avenues',
      'Guaranteed Industrial Rental Income'
    ],
    highlights: [
      'Tailored for Logistics, Storage, Textile & Packaging Industries',
      'Best Industrial Rental Income with Highway Connectivity',
      'Verified Standard Plot Size: 16\'-6" × 135\' and custom configurations',
      '80 Ft. and 60 Ft. Wide Concrete Access Avenues',
      'Complete Compound Wall Enclosing the Entire Estate',
      'Ready for Immediate Construction (બાંધકામ માટે રેડી)',
      'Dedicated Underground Drainage & High-Lumen Street Lighting',
      'Make in India Aligned Industrial Manufacturing Zone'
    ],
    features: [
      'Street Lighting on all internal corridors',
      'Underground Drainage Network',
      'Heavy RCC Roads (80 Ft. and 60 Ft. Wide)',
      'Textile Area Connectivity',
      'Comprehensive Compound Wall Protection',
      '33 Ft. Wide Internal Cross Roads',
      'Dedicated Common Open Plots (COP)'
    ],
    specifications: [
      { label: 'Category', value: 'Industrial Park & Logistics Hub' },
      { label: 'Location', value: 'Opp. Ashwariya Mill, B/H Police Station, Surat-Bardoli-Kadodara Road' },
      { label: 'Standard Plot Dimension', value: '16\'-6" × 135\' (approx. 238.35 Sq.Yds to 495.23 Sq.Yds)' },
      { label: 'Plot Area Range', value: '221.50 Sq.Yd up to 743.21 Sq.Yd' },
      { label: 'Main Logistics Roads', value: '80\'-0" Wide Road & 60\'-0" Wide Road' },
      { label: 'Internal Circulation', value: '33\'-0" Wide Internal Roads' },
      { label: 'Security Infrastructure', value: 'Secured Compound Wall around Estate' },
      { label: 'Ideal Industry Profiles', value: 'Logistics Services, Storage, Textile Manufacturing, Box/Plastic Packaging, Startups' },
      { label: 'Construction Status', value: 'Ready for Construction (બાંધકામ માટે રેડી)' }
    ],
    gallery: [
      { title: 'Industrial Growth Segments', url: '/projects/orange-mahek-park/hero.png' },
      { title: 'Brochure Cover & Title', url: '/projects/orange-mahek-park/brochure_cover.png' },
      { title: 'Make In India Brochure Feature', url: '/projects/orange-mahek-park/brochure_feature.png' },
      { title: 'Plotting Master Plan', url: '/projects/orange-mahek-park/layout_plan.png' },
      { title: 'Full Layout & Amenities Spread', url: '/projects/orange-mahek-park/layout_full.png' },
      { title: 'Project Amenities Row', url: '/projects/orange-mahek-park/amenities.png' }
    ],
    mapCoordinates: {
      lat: 21.1715,
      lng: 72.9550,
      zoom: 15
    },
    availability: 'Contact us for details',
    pdfSource: 'MASTER CATALOUGE Pages 4–5',
    seoTitle: 'Orange Mahek Park | Industrial Plots Surat-Bardoli Road | Mahek Real Estate',
    seoDescription: 'Orange Mahek Park offers industrial plots on Surat-Bardoli-Kadodara Road opposite Ashwariya Mill. Featuring 16.5x135 ft plots, 80ft roads, compound wall, and drainage.'
  },
  {
    id: 'mahek-it-park',
    slug: 'mahek-it-park',
    name: 'Mahek I.T. Park',
    category: 'Commercial',
    categoryLabel: 'Commercial / Office Spaces',
    developerPartners: 'Mahek Real Estate & Parshwa Group',
    tagline: 'STEP INTO A FUTURE YOU\'VE BEEN WATCHING',
    taglineEn: 'The Perfect Location For Everyone — 5 Layer Parking & 16\' Feet Floor Height',
    location: 'Near Kiran Hospital, opposite RJD Complex, Katargam, Surat',
    address: 'Nr. Kiran Hospital, Opp. RJD Complex, Naginawadi Road, Katargam, Surat - 395004',
    shortDescription: 'Government-approved corporate and IT park in Katargam featuring 5-layer parking, 16-foot floor heights, and high-street showrooms.',
    fullDescription: 'A landmark corporate development opposite RJD Complex and near Kiran Hospital in Katargam. Designed to global standards, it offers 16-foot ceiling heights, 5-layer structured parking, four dedicated elevators, and premium spaces for IT firms, financial institutions, and retail showrooms.',
    heroImage: '/projects/mahek-it-park/hero.png',
    brochureCover: '/projects/mahek-it-park/brochure_specs.png',
    pdfUrl: '/brochures/mahek-it-park.pdf',
    layoutPlan: '/projects/mahek-it-park/floor_3_to_6.png',
    layoutTitle: '3rd to 6th Floor Typical Commercial Plan',
    layoutDescription: 'Commercial floorplate with offices from 288 to 405 sq.ft, 8\'-3" wide corridors, central reception foyer, and four dedicated elevators.',
    layoutPlans: [
      {
        title: '3rd to 6th Floor Office Plan',
        image: '/projects/mahek-it-park/floor_3_to_6.png',
        description: 'Offices CA 288 to 405 sq.ft with 8\'-3" wide passage, central foyer, fire lift (8P), goods lift (15P), 2 passenger lifts (13P, 8P), and refuge area.'
      },
      {
        title: '8th Floor Executive & Penthouse Plan',
        image: '/projects/mahek-it-park/floor_8.png',
        description: 'Large executive suites up to CA 672 sq.ft (30\'-7.5" × 27\'-0") featuring a 396 sq.ft open landscaped sky terrace.'
      }
    ],
    cardBadge: '16-Ft Clear Ceiling Height',
    keyUspList: [
      '16-Foot Voluminous Clear Floor Height',
      '5-Layer Dedicated Structured Parking',
      'Directly Opposite R.J.D Complex'
    ],
    highlights: [
      '5-Layer Dedicated Multi-Level Parking',
      '16-Foot Floor Height for Generous Volume & Natural Light',
      'Directly Opposite RJD Complex & Steps from Kiran Hospital',
      'Tailored for IT Offices, Banks, Corporate, Diamond & CA Chambers',
      '8th Floor Executive Level with 396 Sq.Ft. Open Sky Terrace',
      'Four Dedicated Lifts: Passenger Lifts (13P, 8P), Goods Lift (15P), Fire Lift (8P)',
      'Grand Foyer (20\'-0" × 26\'-6") & 8\'-3" Wide Corridors',
      'Double-Height Street-Facing High-Street Retail Showrooms'
    ],
    features: [
      '5-Layer Structured Parking System',
      '16\' Floor Height on Commercial Levels',
      'High-Speed Elevators (Passenger, Goods 15P, Fire Lift 8P)',
      'Central 20\'-0" × 26\'-6" Reception Foyer',
      'Wide 8\'-3" Finished Passages',
      'Executive 8th Floor with 396 Sq.Ft Open Terrace',
      'Designated Smoking Zone & Refuge Area',
      'Dedicated Washroom & OTS Duct in Every Unit',
      'Full Glass Curtain Façade'
    ],
    specifications: [
      { label: 'Category', value: 'Commercial / Office Spaces' },
      { label: 'Location', value: 'Near Kiran Hospital, Opp. RJD Complex, Katargam, Surat' },
      { label: 'Floor Heights', value: '16 Feet Clear Height' },
      { label: 'Parking Infrastructure', value: '5-Layer Engineered Multi-Tier Parking' },
      { label: 'Office Unit Carpet Areas', value: 'CA 288 Sq.Ft., 325 Sq.Ft., 405 Sq.Ft., 449 Sq.Ft., 486 Sq.Ft., 672 Sq.Ft.' },
      { label: 'Sample Unit Dimensions', value: '12\'-0" × 26\'-3", 12\'-0" × 27\'-0", 15\'-0" × 27\'-0", 30\'-7.5" × 27\'-0"' },
      { label: 'Elevator Configuration', value: '2 Passenger Lifts (13P & 8P), 1 Goods Lift (15P), 1 Fire Lift (8P)' },
      { label: 'Target Business Verticals', value: 'IT Offices, Banks, Corporate Chambers, Showrooms, Jewellers, Advocate Offices, CA Houses, Diamond Offices' },
      { label: 'Special Features', value: '8th Floor 396 SFT Open Terrace, Ground Floor Retail Arcade' }
    ],
    gallery: [
      { title: 'Official Government Approved IT Park Poster', url: '/projects/mahek-it-park/official_poster.jpg' },
      { title: 'Architectural 3D Elevation', url: '/projects/mahek-it-park/hero.png' },
      { title: 'Project Brochure & Vertical Hubs', url: '/projects/mahek-it-park/brochure_specs.png' },
      { title: '3rd to 6th Floor Plan', url: '/projects/mahek-it-park/floor_3_to_6.png' },
      { title: '8th Floor Penthouse Plan', url: '/projects/mahek-it-park/floor_8.png' },
      { title: 'Full Architectural Floorplans Sheet', url: '/projects/mahek-it-park/layout_full.png' }
    ],
    mapCoordinates: {
      lat: 21.2263,
      lng: 72.8278,
      zoom: 16
    },
    availability: 'Contact us for details',
    pdfSource: 'MASTER CATALOUGE Pages 6–7',
    seoTitle: 'Mahek I.T. Park | Commercial Offices in Katargam Surat | Mahek Real Estate',
    seoDescription: 'Mahek I.T. Park in Katargam, Surat opposite RJD Complex and near Kiran Hospital. Featuring 5-layer parking, 16ft floor height, and premium corporate offices.'
  },
  {
    id: 'the-am-park',
    slug: 'the-am-park',
    name: 'The AM Park',
    category: 'Commercial',
    categoryLabel: 'Commercial Complex',
    developerPartners: 'Angel Group, Mahek Real Estate & SG Maruti Developers',
    tagline: 'SHOWROOM | HOSPITAL | SHOP | OFFICE',
    taglineEn: 'First Time In SURAT — ONLY G+2 COMPLEX with 21 Ft. & 19.5 Ft. Floor Heights',
    location: 'Bapa Sitaram Chowk, Simada–BRTS Road, Surat',
    address: 'Bapa Sitaram Chowk, Beside-MBH-3, Opp. Silver Business Hub, Simada-BRTS Road, Surat',
    shortDescription: 'Surat\'s premier G+2 commercial hub on 45m Simada-BRTS corridor, featuring 21-ft ground floor height and full basement parking.',
    fullDescription: 'A landmark G+2 commercial complex at Bapa Sitaram Chowk on the 45-meter Simada-BRTS corridor. Engineered for retail showrooms, corporate offices, and hospitals, it features 21-ft ground floor ceilings, 19.5-ft upper lofts, and a 15-ft deep basement parking level with dual ramps.',
    heroImage: '/projects/the-am-park/hero.png',
    brochureCover: '/projects/the-am-park/brochure_specs.png',
    pdfUrl: '/brochures/the-am-park.pdf',
    layoutPlan: '/projects/the-am-park/layout_full.png',
    layoutTitle: 'Four-Level Architectural Floorplans (Basement, Ground, 1st & 2nd Floor)',
    layoutDescription: 'Architectural master plan across 4 levels: 21-ft ground showrooms, 13-ft first floor, 19.5-ft second floor, and 15-ft basement parking.',
    layoutPlans: [
      {
        title: 'Ground Floor Showrooms (21 Ft Height)',
        image: '/projects/the-am-park/ground_floor.png',
        description: 'High-volume flagship retail units Shop-01 through Shop-20 facing the 45m BRTS Road with double-lane surface customer parking.'
      },
      {
        title: '1st Floor Commercial Suites (13 Ft Height)',
        image: '/projects/the-am-park/first_floor.png',
        description: 'Functional floorplate designed for commercial offices, healthcare clinics, and business setups.'
      },
      {
        title: '2nd Floor Grand Lofts (19.5 Ft Height)',
        image: '/projects/the-am-park/second_floor.png',
        description: 'Dramatic high-ceiling volume ideal for corporate headquarters, large healthcare departments, and destination retail.'
      },
      {
        title: 'Basement Parking Floor (15 Ft Height)',
        image: '/projects/the-am-park/basement_floor.png',
        description: 'Spacious dedicated basement parking with ingress/egress ramps, central store room, and elevator access.'
      }
    ],
    cardBadge: '21-Ft Ground Showrooms',
    keyUspList: [
      '21-Ft Ground Floor Showroom Volume',
      'Expansive 45m BRTS Road Corridor Frontage',
      'Full 15-Ft High Basement Parking'
    ],
    highlights: [
      'First Time in Surat: Exclusive Low-Rise G+2 Mega Complex',
      'Extraordinary 21 Ft. Ground Floor Showroom Height',
      '19.5 Ft. Height on Second Floor & 13 Ft. Height on First Floor',
      'Massive 45.00 Meter Wide BRTS Road Frontage',
      'Full-Floor Dedicated Basement Parking (15 Ft. Height)',
      'Opposite Silver Business Hub at Prime Bapa Sitaram Chowk',
      'Ideal for Multi-Speciality Hospitals, Showrooms & Offices',
      'Expansive Glazed Architectural Façade with High Visibility'
    ],
    features: [
      '21 Ft. Ground Floor Height',
      '19.5 Ft. Second Floor Height',
      '13 Ft. First Floor Height',
      '15 Ft. Basement Parking Height',
      '45.00 Mt. Wide Road Frontage',
      'Dual Vehicle Ramps for Basement',
      'Double-Row Surface Parking for Customers',
      'High-Speed Commercial Lifts & Service Stairs',
      'Approved for Hospital & Large Commercial Operations'
    ],
    specifications: [
      { label: 'Category', value: 'Commercial Complex' },
      { label: 'Location', value: 'Bapa Sitaram Chowk, Simada-BRTS Road, Surat' },
      { label: 'Building Configuration', value: 'Basement + Ground + 2 Floors (G+2)' },
      { label: 'Ground Floor Height', value: '21.00 Feet' },
      { label: 'First Floor Height', value: '13.00 Feet' },
      { label: 'Second Floor Height', value: '19.50 Feet' },
      { label: 'Basement Height', value: '15.00 Feet' },
      { label: 'Front Road Corridor', value: '45.00 Meter Wide BRTS Road' },
      { label: 'Permitted Commercial Use', value: 'Showroom, Hospital, Shop, Corporate Office' },
      { label: 'Parking Infrastructure', value: 'Dedicated 15ft Basement Parking + Surface Customer Parking' }
    ],
    gallery: [
      { title: 'Official Landmark Architectural Poster', url: '/projects/the-am-park/official_poster.jpg' },
      { title: 'Architectural Rendering on BRTS Road', url: '/projects/the-am-park/hero.png' },
      { title: 'Commercial Façade & Showroom Arcade', url: '/projects/the-am-park/facade.png' },
      { title: 'Official Brochure Spread', url: '/projects/the-am-park/brochure_full.png' },
      { title: 'Ground Floor Plan (21 Ft Height)', url: '/projects/the-am-park/ground_floor.png' },
      { title: '1st Floor Plan (13 Ft Height)', url: '/projects/the-am-park/first_floor.png' },
      { title: '2nd Floor Plan (19.5 Ft Height)', url: '/projects/the-am-park/second_floor.png' },
      { title: 'Basement Parking Plan (15 Ft Height)', url: '/projects/the-am-park/basement_floor.png' },
      { title: 'Complete Four-Level Floorplans', url: '/projects/the-am-park/layout_full.png' }
    ],
    mapCoordinates: {
      lat: 21.2185,
      lng: 72.8835,
      zoom: 16
    },
    availability: 'Contact us for details',
    pdfSource: 'MASTER CATALOUGE Pages 8–9',
    seoTitle: 'The AM Park | G+2 Commercial Complex Simada BRTS Surat | Mahek Real Estate',
    seoDescription: 'The AM Park on Simada-BRTS Road, Surat at Bapa Sitaram Chowk. Featuring 21ft ground floor showrooms, 19.5ft 2nd floor, 15ft basement parking, and 45m road frontage.'
  },
  {
    id: 'anthems-mahek-park',
    slug: 'anthems-mahek-park',
    name: 'Anthems Mahek Park',
    category: 'Industrial',
    categoryLabel: 'Industrial / Business Plots',
    developerPartners: 'Anthems Corporation, Mahek Real Estate & SG Maruti Developers',
    tagline: 'બિઝનેસ માટે ઓપન પ્લોટનું આયોજન',
    taglineEn: 'Designed for Industry, Dedicated to Development (ઉદ્યોગ માટે રચાયેલ, વિકાસ માટે સમર્પિત)',
    location: 'Near Umiyadham Temple, Umiyadham Road, Surat',
    address: 'Near Umiyadham Temple, Umiyadham Road, Surat, Gujarat',
    shortDescription: 'Planned business and industrial plotted estate near Umiyadham Temple, featuring 12m internal roads, COP gardens, and ready-to-build plots.',
    fullDescription: 'An organized industrial and commercial plotted development near Umiyadham Temple on Umiyadham Road. Designed for manufacturing and logistics, it offers verified plots (from 16\'-6" × 107\'), 12-meter wide paved thoroughfares, landscaped green spaces, and clear-title infrastructure.',
    heroImage: '/projects/anthems-mahek-park/hero.png',
    brochureCover: '/projects/anthems-mahek-park/brochure_specs.png',
    pdfUrl: '/brochures/anthems-mahek-park.pdf',
    layoutPlan: '/projects/anthems-mahek-park/layout_plan.png',
    layoutTitle: 'Anthems Mahek Park Master Layout Plan',
    layoutDescription: 'Master layout featuring 82 demarcated business plots, 12m paved roads, Owners Plot enclave, and landscaped Common Open Plot (COP).',
    cardBadge: '82 Planned Business Plots',
    keyUspList: [
      '82 Demarcated Business & Shed Plots',
      'Strategic Corridor Near Umiyadham Temple',
      '12m Wide Main Paved Access Highway'
    ],
    highlights: [
      'Strategic Location Near Umiyadham Temple on Umiyadham Road',
      'Verified Plot Sizes: 16\'-6" × 110\' | 16\'-6" × 107\' | 16\'-6" × 115\'',
      'Wide 12.19 Meter & 12.00 Meter Paved Road Network',
      'Planned Estate with 82 Demarcated Business Plots',
      'Common Open Plot (COP) with Perimeter Green Landscaping',
      'Dedicated Owners Plot Zone for Anchor Businesses',
      'Engineered for Textiles, Manufacturing, and Commercial Logistics'
    ],
    features: [
      '12.19 Mt. Wide Main Access Road',
      '12.00 Mt. Wide Internal Paved Roads',
      '82 Demarcated Commercial / Industrial Plots',
      'Common Open Plot (COP) Green Area',
      'Owners Plot Enclave',
      'Near Umiyadham Commercial Highway Corridor',
      'Engineered for Immediate Development'
    ],
    specifications: [
      { label: 'Category', value: 'Industrial / Business Plots' },
      { label: 'Location', value: 'Near Umiyadham Temple, Umiyadham Road, Surat' },
      { label: 'Verified Plot Sizes', value: '16\'6" × 110\' | 16\'6" × 107\' | 16\'6" × 115\'' },
      { label: 'Plot Width', value: '16\'-6" (approx. 5.03 Meters)' },
      { label: 'Plot Lengths', value: '107 Ft., 110 Ft., and 115 Ft.' },
      { label: 'Total Plots', value: '82 Planned Units + Owners Plot' },
      { label: 'Perimeter Access Road', value: '12.19 Meter Wide Road' },
      { label: 'Internal Circulation', value: '12.00 Meter Wide Internal Road' },
      { label: 'Green Spaces', value: 'Dedicated Landscaped Common Open Plot (COP)' }
    ],
    gallery: [
      { title: 'Textile & Industrial Concept', url: '/projects/anthems-mahek-park/hero.png' },
      { title: 'Project Brochure & Verified Sizes', url: '/projects/anthems-mahek-park/brochure_specs.png' },
      { title: 'Master Layout Plan', url: '/projects/anthems-mahek-park/layout_plan.png' },
      { title: 'Official Brochure Spread', url: '/projects/anthems-mahek-park/brochure_full.png' }
    ],
    mapCoordinates: {
      lat: 21.2240,
      lng: 72.8710,
      zoom: 16
    },
    availability: 'Contact us for details',
    pdfSource: 'MASTER CATALOUGE Page 10',
    seoTitle: 'Anthems Mahek Park | Business & Industrial Plots Umiyadham Road Surat | Mahek Real Estate',
    seoDescription: 'Anthems Mahek Park near Umiyadham Temple, Umiyadham Road, Surat. Offering 16.5x110, 16.5x107, 16.5x115 ft industrial plots with 12m wide roads and green zones.'
  },
  {
    id: 'mahek-residency',
    slug: 'mahek-residency',
    name: 'Mahek Residency',
    category: 'Residential',
    categoryLabel: 'Residential Development',
    developerPartners: 'Mahek Real Estate, SG Maruti Developers, Kyros Developers & Vaidehi',
    tagline: 'RESIDENTIAL PLOT SIZE: 12\'X37\' | 12\'X53\' | 18\'X37\'',
    taglineEn: 'A Landmark Residential Community with Contemporary Villas and Green Gardens',
    location: 'Opposite Mansarovar Society, Godadra–Devadh Main Road, Surat',
    address: 'Opposite Mansarovar Society, Godadra-Devadh Main Road, Surat, Gujarat',
    shortDescription: 'Gated residential enclave on Godadra-Devadh Road featuring verified plot sizes, modern twin villa concepts, and landscaped community parks.',
    fullDescription: 'A master-planned residential community opposite Mansarovar Society on Godadra-Devadh Road. Featuring 173 plots, modern twin-villa bungalow designs, an 18-meter entrance boulevard, lush garden parks, and 24/7 gated security.',
    heroImage: '/projects/mahek-residency/hero.png',
    brochureCover: '/projects/mahek-residency/brochure_full.png',
    pdfUrl: '/brochures/mahek-residency.pdf',
    layoutPlan: '/projects/mahek-residency/layout_plan.png',
    layoutTitle: 'Mahek Residency Master Residential Layout Plan',
    layoutDescription: 'Master plan featuring 173 residential plots, twin villa layouts, 18m main boulevard, 7.5m internal streets, and landscaped park enclaves.',
    cardBadge: '173 Gated Community Plots',
    keyUspList: [
      '173 Verified Residential Plots',
      'Modern 2-Storey Twin Villa Bungalows',
      'Monumental Security Entrance & Green Parks'
    ],
    highlights: [
      'Prime Location Opposite Mansarovar Society on Godadra-Devadh Main Road',
      'Verified Residential Plot Sizes: 12\' × 37\' | 12\' × 53\' | 18\' × 37\'',
      'Monumental Entrance Gate with Security Checkpoint & Landscaping',
      'Contemporary Twin Villa Elevations with Private Balconies',
      'Wide 18.00 Meter Entry Boulevard & 7.50m / 6.00m Internal Roads',
      'Dedicated Landscaped Residential Garden Parks',
      '173 Planned Residential Plots in Gated Enclave',
      'Street-Facing High-Visibility Display Retail Pavilions'
    ],
    features: [
      'Grand Gated Entrance Portal with Security Cabin',
      '18.00 Mt. Wide Main Access Boulevard',
      '7.50 Mt. and 6.00 Mt. Wide Internal Paved Roads',
      'Multiple Landscaped Residential Garden Enclaves',
      'Underground Drainage, Water & Power Utilities',
      'Street-Facing Commercial & Retail Display Pavilions',
      'Contemporary Twin Villa Architectural Designs'
    ],
    specifications: [
      { label: 'Category', value: 'Residential Development / Residential Plots' },
      { label: 'Location', value: 'Opposite Mansarovar Society, Godadra-Devadh Main Road, Surat' },
      { label: 'Verified Plot Sizes', value: '12\' × 37\' | 12\' × 53\' | 18\' × 37\' (Verify units and availability before publishing)' },
      { label: 'Total Plots', value: '173 Planned Residential Plots' },
      { label: 'Main Boulevard Width', value: '18.00 Meter Wide Road' },
      { label: 'Internal Street Widths', value: '7.50 Meter and 6.00 Meter Wide Roads' },
      { label: 'Community Amenities', value: 'Landscaped Garden Parks, Designer Entry Gate, Display Retail' },
      { label: 'Architectural Style', value: 'Contemporary 2-Storey Twin Bungalows with Glass Balconies' }
    ],
    gallery: [
      { title: 'Grand Entrance Gate & Street Retail', url: '/projects/mahek-residency/hero.png' },
      { title: 'Contemporary Twin Villa Elevation', url: '/projects/mahek-residency/villa_elevation.png' },
      { title: 'Master Residential Layout Plan', url: '/projects/mahek-residency/layout_plan.png' },
      { title: 'Official Brochure & Layout Spread', url: '/projects/mahek-residency/brochure_full.png' }
    ],
    mapCoordinates: {
      lat: 21.1820,
      lng: 72.8760,
      zoom: 16
    },
    availability: 'Contact us for details',
    pdfSource: 'MASTER CATALOUGE Page 11',
    seoTitle: 'Mahek Residency | Residential Plots Godadra-Devadh Surat | Mahek Real Estate',
    seoDescription: 'Mahek Residency residential plotted development opposite Mansarovar Society, Godadra-Devadh Road, Surat. Featuring 12x37, 12x53, 18x37 ft plots, 18m road, and gardens.'
  }
];

export const getProjectBySlug = (slug) => {
  if (!slug) return null;
  const clean = slug.toLowerCase().trim();

  // 1. Check in 6 PDF flagship projects
  const found = projects.find(
    (p) =>
      (p.slug && p.slug.toLowerCase() === clean) ||
      (p.id && p.id.toLowerCase() === clean) ||
      (p.name && p.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === clean) ||
      (p.name && p.name.toLowerCase() === clean)
  );
  if (found) return found;

  // 2. Fallback check for corporate & strategic projects from allProjectsData
  const corp = allProjectsData.find(
    (p) =>
      (p.id && p.id.toLowerCase() === clean) ||
      (p.title && p.title.toLowerCase().replace(/[^a-z0-9]/g, '-') === clean) ||
      (p.title && p.title.toLowerCase() === clean)
  );

  if (corp) {
    return {
      id: corp.id,
      slug: corp.id,
      name: corp.title,
      title: corp.title,
      category: corp.category || 'Commercial',
      categoryLabel: corp.category || 'Commercial Development',
      developerPartners: 'Mahek Real Estate',
      tagline: corp.description,
      location: corp.location,
      address: corp.address || corp.location,
      fullAddress: corp.address || corp.location,
      shortDescription: corp.description,
      fullDescription: corp.description,
      heroImage: corp.image,
      image: corp.image,
      pdfUrl: corp.pdfUrl || '/brochures/master-catalogue.pdf',
      pdfSource: 'Mahek Real Estate Master Catalogue',
      layoutPlan: corp.image,
      layoutTitle: `${corp.title} Architectural Master Plan`,
      layoutDescription: `Architectural and development outline for ${corp.title}.`,
      highlights: corp.highlights || [
        `Prime landmark development in ${corp.location}`,
        `Engineered to Mahek Real Estate hallmark quality standards`,
        `High accessibility and arterial infrastructure connectivity`
      ],
      features: corp.highlights || [
        '24/7 Power Infrastructure',
        'Strategic Regional Connectivity',
        'Modern Architectural Facade'
      ],
      specifications: [
        { label: 'Category', value: corp.category || 'Commercial' },
        { label: 'Location', value: corp.location },
        { label: 'Address', value: corp.address || corp.location },
        { label: 'Configuration / Units', value: corp.units || 'Prime Units' },
        { label: 'Parking & Access', value: corp.parking || 'Dedicated Parking' },
        { label: 'Area / Dimensions', value: corp.sqft || 'Comprehensive Campus' },
        { label: 'Status / Milestone', value: corp.price || 'Operational & Delivered' }
      ],
      gallery: [{ title: corp.title, url: corp.image }],
      mapCoordinates: { lat: 21.2052, lng: 72.84, zoom: 15 },
      availability: corp.price || 'Contact sales desk',
      seoTitle: `${corp.title} | Mahek Real Estate`,
      seoDescription: corp.description
    };
  }

  return null;
};

export const getProjectsByCategory = (category) => {
  if (!category || category === 'All') return projects;
  return projects.filter((p) => p.category.toLowerCase() === category.toLowerCase());
};

export const getRelatedProjects = (currentSlug, limit = 3) => {
  const current = getProjectBySlug(currentSlug);
  if (!current) return projects.slice(0, limit);
  const sameCategory = projects.filter((p) => p.slug !== currentSlug && p.category === current.category);
  const otherProjects = projects.filter((p) => p.slug !== currentSlug && p.category !== current.category);
  return [...sameCategory, ...otherProjects].slice(0, limit);
};
