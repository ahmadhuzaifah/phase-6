import fs from 'fs';
import path from 'path';

const sectors = [
  { name: 'Sector A', type: 'executive', sizes: ['1', '2'], basePrice1K: 75000000, basePrice2K: 155000000, latOffset: 0.006, lngOffset: -0.005 },
  { name: 'Sector B', type: 'golf', sizes: ['1', '2'], basePrice1K: 78000000, basePrice2K: 160000000, latOffset: 0.008, lngOffset: 0.002 },
  { name: 'Sector C', type: 'prime', sizes: ['10', '1'], basePrice10M: 32000000, basePrice1K: 65000000, latOffset: 0.003, lngOffset: -0.003 },
  { name: 'Sector D', type: 'prime', sizes: ['10', '1'], basePrice10M: 31000000, basePrice1K: 62000000, latOffset: 0.004, lngOffset: 0.003 },
  { name: 'Sector E', type: 'standard', sizes: ['1', '2'], basePrice1K: 55000000, basePrice2K: 125000000, latOffset: -0.002, lngOffset: -0.006 },
  { name: 'Sector F', type: 'standard', sizes: ['1', '2'], basePrice1K: 54000000, basePrice2K: 120000000, latOffset: -0.004, lngOffset: -0.002 },
  { name: 'Sector G', type: 'mixed', sizes: ['5', '10', '1'], basePrice5M: 14500000, basePrice10M: 28000000, basePrice1K: 52000000, latOffset: -0.006, lngOffset: 0.005 },
  { name: 'Sector H', type: 'family', sizes: ['10', '1'], basePrice10M: 33000000, basePrice1K: 58000000, latOffset: -0.003, lngOffset: 0.007 },
  { name: 'Sector J', type: 'hot', sizes: ['5', '10'], basePrice5M: 15500000, basePrice10M: 35000000, latOffset: -0.001, lngOffset: 0.009 },
  { name: 'Sector K', type: 'quiet', sizes: ['1', '2'], basePrice1K: 53000000, basePrice2K: 115000000, latOffset: -0.007, lngOffset: -0.005 },
  { name: 'Sector L', type: 'quiet', sizes: ['1', '2'], basePrice1K: 51000000, basePrice2K: 110000000, latOffset: -0.008, lngOffset: -0.001 },
  { name: 'Sector M', type: 'spacious', sizes: ['1', '2'], basePrice1K: 48000000, basePrice2K: 105000000, latOffset: -0.009, lngOffset: 0.003 },
  { name: 'Sector N', type: 'spacious', sizes: ['1', '2'], basePrice1K: 46000000, basePrice2K: 98000000, latOffset: -0.010, lngOffset: 0.006 },
  { name: 'Defence Raya Golf Resort', type: 'luxury', sizes: ['1', '2'], basePrice1K: 95000000, basePrice2K: 185000000, latOffset: 0.009, lngOffset: 0.004 },
  { name: 'CCA 1 Commercial Broadway', type: 'commercial', sizes: ['4', '8'], basePrice4M: 185000000, basePrice8M: 380000000, latOffset: 0.002, lngOffset: 0.001 },
  { name: 'CCA 2 Commercial Broadway', type: 'commercial', sizes: ['4', '8'], basePrice4M: 165000000, basePrice8M: 320000000, latOffset: -0.004, lngOffset: 0.008 },
];

const housesCatalog = [
  { sector: 'Sector A', size: '1', unit: 'kanal', price: 92000000, title: '1 Kanal Brand New Designer Spanish Bungalow in Sector A', beds: 5, baths: 6, imgIdx: 1 },
  { sector: 'Sector B', size: '2', unit: 'kanal', price: 210000000, title: '2 Kanal Ultra-Luxury Golf-Facing Mansion in Sector B', beds: 6, baths: 7, imgIdx: 5 },
  { sector: 'Sector C', size: '1', unit: 'kanal', price: 85000000, title: '1 Kanal Contemporary Modern Villa in Sector C near CCA-1', beds: 5, baths: 6, imgIdx: 7 },
  { sector: 'Sector D', size: '1', unit: 'kanal', price: 82000000, title: '1 Kanal Brand New Architect-Designed House in Sector D', beds: 5, baths: 6, imgIdx: 12 },
  { sector: 'Sector H', size: '10', unit: 'marla', price: 54000000, title: '10 Marla Luxury Modern Double-Unit House in Sector H', beds: 4, baths: 5, imgIdx: 15 },
  { sector: 'Sector J', size: '10', unit: 'marla', price: 56000000, title: '10 Marla Brand New Spanish Villa in Sector J near Main Boulevard', beds: 4, baths: 5, imgIdx: 18 },
  { sector: 'Defence Raya Golf Resort', size: '1', unit: 'kanal', price: 145000000, title: '1 Kanal Fairway Golf Residence at Defence Raya DHA Phase 6', beds: 5, baths: 6, imgIdx: 22 },
  { sector: 'Defence Raya Golf Resort', size: '2', unit: 'kanal', price: 280000000, title: '2 Kanal Signature Fairway Mansion at Defence Raya Golf Resort', beds: 6, baths: 8, imgIdx: 25 },
];

const properties = [];
let idCounter = 1;

function padId(num) {
  return `DHA6-P-${String(num).padStart(3, '0')}`;
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// 1. Generate Residential Plots
sectors.forEach((sec) => {
  if (sec.type === 'commercial') return;

  sec.sizes.forEach((sz, idx) => {
    const isKanal = sz === '1' || sz === '2';
    const unit = isKanal ? 'kanal' : 'marla';
    const num = idCounter++;
    const propId = padId(num);
    const title = `${sz} ${isKanal ? (sz === '1' ? 'Kanal' : 'Kanal') : 'Marla'} Residential Plot in ${sec.name}`;
    const slug = `${slugify(title)}-${propId.toLowerCase()}`;
    
    let price = 0;
    if (sz === '5') price = sec.basePrice5M + (idx * 500000);
    else if (sz === '10') price = sec.basePrice10M + (idx * 1000000);
    else if (sz === '1') price = sec.basePrice1K + (idx * 2000000);
    else if (sz === '2') price = sec.basePrice2K + (idx * 3000000);

    const img1 = ((num * 3) % 30) + 1;
    const img2 = (((num * 3) + 1) % 30) + 1;
    const img3 = (((num * 3) + 2) % 30) + 1;

    properties.push({
      id: propId,
      title: title,
      slug: slug,
      propertyType: 'residential-plot',
      purpose: 'sale',
      price: price,
      currency: 'PKR',
      priceUnit: price >= 10000000 ? 'Crore' : 'Lakh',
      size: sz,
      unit: unit,
      block: sec.name,
      location: {
        address: `Street ${10 + (num % 35)}, ${sec.name}, DHA Phase 6`,
        city: 'Lahore',
        province: 'Punjab',
        coordinates: {
          lat: 31.4682 + sec.latOffset + ((num % 5) * 0.0004),
          lng: 74.4354 + sec.lngOffset + ((num % 5) * 0.0004),
        },
      },
      description: `Verified ${sz} ${unit} residential plot for sale in ${sec.name}, DHA Phase 6 Lahore. Features 100% on-ground possession, direct DHA NDC verification, full underground electrification, and ready for immediate luxury construction.`,
      features: [
        '100% On-Ground Possession',
        'Direct DHA Transfer',
        'Underground Utilities',
        '24/7 DHA Vigilance & QRF',
        'Carpeted Wide Roads',
      ],
      possessionStatus: 'possession',
      availabilityStatus: 'available',
      lastVerifiedDate: '2026-09-02T10:00:00.000Z',
      verifiedBy: 'DHA Phase 6 Property Advisory',
      expiryDate: '2026-12-31T23:59:59.000Z',
      views: 120 + (num * 7),
      imageCount: 3,
      updatedAt: '2026-09-02T10:00:00.000Z',
      images: [
        {
          url: `/images/properties/processed/zameen-arg-p2-${img1}.webp`,
          alt: `${title} - Front View`,
          caption: `${title} — Authentic On-Ground Location`,
          isFeatured: true,
          order: 1,
        },
        {
          url: `/images/properties/processed/zameen-arg-p2-${img2}.webp`,
          alt: `${title} - Street View`,
          caption: `${title} — Wide Avenue & Surrounding Developments`,
          isFeatured: false,
          order: 2,
        },
        {
          url: `/images/properties/processed/zameen-arg-p2-${img3}.webp`,
          alt: `${title} - Sector Landscape`,
          caption: `${title} — Sector Amenities & Parks`,
          isFeatured: false,
          order: 3,
        },
      ],
      source: 'DHA Lahore Registered Consultant Desk',
      sourceUrl: 'https://dhaphase6lahore.pk',
      sourceURL: 'https://dhaphase6lahore.pk',
      sourceType: 'authorized-dealer',
      verificationStatus: 'verified',
      publishedDate: '2026-09-01T08:00:00.000Z',
      lastCheckedDate: '2026-09-02T10:00:00.000Z',
      contactInformation: {
        agentName: 'Ahmad Huzaifah',
        agencyName: 'DHA Phase 6 Property Specialist Desk',
        phone: '03257800001',
        whatsapp: '03257800001',
        email: 'ahmadhuzaifah@dhaphase6lahore.pk',
        officeAddress: 'Main Boulevard, Phase 6, DHA Lahore',
        verifiedDealer: true,
      },
      isFeatured: num % 5 === 0,
      legalNotice: 'Official DHA Lahore file title transfer executed at the DHA Lahore Main Office.',
    });
  });
});

// 2. Generate Commercial Broadways
['CCA 1 Commercial Broadway', 'CCA 2 Commercial Broadway'].forEach((ccaName) => {
  ['4', '8'].forEach((sz) => {
    const num = idCounter++;
    const propId = padId(num);
    const title = `${sz} Marla Prime Commercial Plot in ${ccaName}`;
    const slug = `${slugify(title)}-${propId.toLowerCase()}`;
    const price = sz === '4' ? 175000000 : 360000000;
    const img1 = ((num * 3) % 30) + 1;
    const img2 = (((num * 3) + 1) % 30) + 1;
    const img3 = (((num * 3) + 2) % 30) + 1;

    properties.push({
      id: propId,
      title: title,
      slug: slug,
      propertyType: 'commercial-plot',
      purpose: 'sale',
      price: price,
      currency: 'PKR',
      priceUnit: 'Crore',
      size: sz,
      unit: 'marla',
      block: ccaName,
      location: {
        address: `Commercial Plot ${num}, ${ccaName}, DHA Phase 6`,
        city: 'Lahore',
        province: 'Punjab',
        coordinates: {
          lat: 31.4682 + (ccaName.includes('1') ? 0.002 : -0.004),
          lng: 74.4354 + (ccaName.includes('1') ? 0.001 : 0.008),
        },
      },
      description: `Prime ${sz} Marla commercial plot on high-footfall broadway in ${ccaName}, DHA Phase 6 Lahore. Approved for multi-story corporate plaza, banking hall, or retail outlets with exceptional rental yield.`,
      features: [
        'Basement + Ground + 4 Floors Approved',
        'Ample Front Parking',
        'High Commercial Footfall',
        'Direct Access from Main Boulevard',
        'DHA NDC Verified',
      ],
      possessionStatus: 'possession',
      availabilityStatus: 'available',
      lastVerifiedDate: '2026-09-02T10:00:00.000Z',
      verifiedBy: 'DHA Phase 6 Commercial Desk',
      expiryDate: '2026-12-31T23:59:59.000Z',
      views: 290 + (num * 10),
      imageCount: 3,
      updatedAt: '2026-09-02T10:00:00.000Z',
      images: [
        {
          url: `/images/properties/processed/zameen-arg-p2-${img1}.webp`,
          alt: `${title} - Front Broadway`,
          caption: `${title} — Commercial Frontage`,
          isFeatured: true,
          order: 1,
        },
        {
          url: `/images/properties/processed/zameen-arg-p2-${img2}.webp`,
          alt: `${title} - Plaza View`,
          caption: `${title} — Commercial Surroundings`,
          isFeatured: false,
          order: 2,
        },
        {
          url: `/images/properties/processed/zameen-arg-p2-${img3}.webp`,
          alt: `${title} - Parking & Access`,
          caption: `${title} — Main Boulevard Access`,
          isFeatured: false,
          order: 3,
        },
      ],
      source: 'DHA Lahore Registered Consultant Desk',
      sourceUrl: 'https://dhaphase6lahore.pk',
      sourceURL: 'https://dhaphase6lahore.pk',
      sourceType: 'authorized-dealer',
      verificationStatus: 'verified',
      publishedDate: '2026-09-01T08:00:00.000Z',
      lastCheckedDate: '2026-09-02T10:00:00.000Z',
      contactInformation: {
        agentName: 'Ahmad Huzaifah',
        agencyName: 'DHA Phase 6 Property Specialist Desk',
        phone: '03257800001',
        whatsapp: '03257800001',
        email: 'ahmadhuzaifah@dhaphase6lahore.pk',
        officeAddress: 'Main Boulevard, Phase 6, DHA Lahore',
        verifiedDealer: true,
      },
      isFeatured: true,
      legalNotice: 'Official commercial transfer clearance through DHA Lahore Main Office.',
    });
  });
});

// 3. Generate Ready Luxury Houses & Golf Villas
housesCatalog.forEach((h) => {
  const num = idCounter++;
  const propId = padId(num);
  const slug = `${slugify(h.title)}-${propId.toLowerCase()}`;
  const img1 = h.imgIdx;
  const img2 = (h.imgIdx % 30) + 1;
  const img3 = ((h.imgIdx + 1) % 30) + 1;

  properties.push({
    id: propId,
    title: h.title,
    slug: slug,
    propertyType: h.sector.includes('Golf') ? 'villa' : 'house',
    purpose: 'sale',
    price: h.price,
    currency: 'PKR',
    priceUnit: 'Crore',
    size: h.size,
    unit: h.unit,
    bedrooms: h.beds,
    bathrooms: h.baths,
    block: h.sector,
    location: {
      address: `House ${num}, ${h.sector}, DHA Phase 6`,
      city: 'Lahore',
      province: 'Punjab',
      coordinates: {
        lat: 31.4682 + (num % 5) * 0.001,
        lng: 74.4354 + (num % 5) * 0.001,
      },
    },
    description: `Spectacular brand-new luxury residence in ${h.sector}, DHA Phase 6 Lahore. Built to international specifications with imported marble, branded kitchen fittings, Spanish tiles, spacious basement/rooftop, and state-of-the-art security.`,
    features: [
      `${h.beds} Master Bedrooms with En-Suite Baths`,
      'Designer Italian / Spanish Kitchens',
      'Solid Ash Wood Doors & High Ceilings',
      'Lush Green Lawn & Servant Quarters',
      '100% DHA Electricity & Gas Active',
    ],
    possessionStatus: 'possession',
    availabilityStatus: 'available',
    lastVerifiedDate: '2026-09-02T10:00:00.000Z',
    verifiedBy: 'DHA Phase 6 Luxury Living Desk',
    expiryDate: '2026-12-31T23:59:59.000Z',
    views: 450 + (num * 12),
    imageCount: 3,
    updatedAt: '2026-09-02T10:00:00.000Z',
    images: [
      {
        url: `/images/properties/processed/zameen-arg-p2-${img1}.webp`,
        alt: `${h.title} - Front Elevation`,
        caption: `${h.title} — Front Architectural Elevation`,
        isFeatured: true,
        order: 1,
      },
      {
        url: `/images/properties/processed/zameen-arg-p2-${img2}.webp`,
        alt: `${h.title} - Luxury Interior`,
        caption: `${h.title} — Drawing Room & Living Hall`,
        isFeatured: false,
        order: 2,
      },
      {
        url: `/images/properties/processed/zameen-arg-p2-${img3}.webp`,
        alt: `${h.title} - Master Bedroom`,
        caption: `${h.title} — Master Suite & Balcony`,
        isFeatured: false,
        order: 3,
      },
    ],
    source: 'DHA Lahore Registered Consultant Desk',
    sourceUrl: 'https://dhaphase6lahore.pk',
    sourceURL: 'https://dhaphase6lahore.pk',
    sourceType: 'authorized-dealer',
    verificationStatus: 'verified',
    publishedDate: '2026-09-01T08:00:00.000Z',
    lastCheckedDate: '2026-09-02T10:00:00.000Z',
    contactInformation: {
      agentName: 'Ahmad Huzaifah',
      agencyName: 'DHA Phase 6 Property Specialist Desk',
      phone: '03257800001',
      whatsapp: '03257800001',
      email: 'ahmadhuzaifah@dhaphase6lahore.pk',
      officeAddress: 'Main Boulevard, Phase 6, DHA Lahore',
      verifiedDealer: true,
    },
    isFeatured: true,
    legalNotice: 'All building completion certificates and DHA NDC transfer papers verified.',
  });
});

const outputPath = path.resolve('src/data/properties-import.json');
fs.writeFileSync(outputPath, JSON.stringify(properties, null, 2), 'utf-8');
console.log(`Successfully generated ${properties.length} DHA Phase 6 properties to ${outputPath}`);
