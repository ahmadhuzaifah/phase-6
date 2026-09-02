export interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  questions: { question: string; answer: string }[];
}

export const FAQS_DATA: FAQCategory[] = [
  {
    id: 'overview',
    name: 'Area overview',
    icon: '01',
    description: 'Location, sectors and the role of this independent guide.',
    questions: [
      {
        question: 'Where is DHA Phase 6 Lahore?',
        answer: 'DHA Phase 6 is in western Lahore and connects with Shabbir Sharif Boulevard, Bedian Road, Barki Road and the wider DHA road network. Use the exact gate and sector for directions.',
      },
      {
        question: 'Which sectors are in DHA Phase 6 Lahore?',
        answer: 'The official Phase VI map shows sectors A, B, C, D, E, F, G, H, J, K, L, M and N.',
      },
      {
        question: 'Is this an official DHA website?',
        answer: 'No. This is an independent information platform. Always verify official notices, documents, rates, fees and procedures through DHA Lahore.',
      },
    ],
  },
  {
    id: 'property-market',
    name: 'Property and prices',
    icon: '02',
    description: 'How listings and asking-price snapshots should be interpreted.',
    questions: [
      {
        question: 'Are the property cards verified listings?',
        answer: 'Cards sourced from public portals are market snapshots only. A source check does not verify ownership, availability, condition, dues or transfer eligibility.',
      },
      {
        question: 'Are the published prices official DHA rates?',
        answer: 'No. Property prices shown on this portal are observed third-party asking prices. They are not official rates, valuations or completed transaction evidence.',
      },
      {
        question: 'Why do same-size properties have different prices?',
        answer: 'Sector, street, road width, corner or park position, orientation, commercial exposure, house condition and seller expectations can all change the demand.',
      },
    ],
  },
  {
    id: 'verification',
    name: 'Verification and transfer',
    icon: '03',
    description: 'Ownership, dues, NDC and transaction checks.',
    questions: [
      {
        question: 'How should I verify a DHA Phase 6 property?',
        answer: 'Confirm the seller, exact property number, document trail, dues, NDC requirements and transfer eligibility through the current DHA Lahore process and qualified advisers.',
      },
      {
        question: 'Should I pay a token before verification?',
        answer: 'Avoid committing funds until the parties, property and payment terms have been checked and documented. Obtain legal advice for the transaction.',
      },
      {
        question: 'Does a dealer statement replace official verification?',
        answer: 'No. Dealer input can help with discovery, but official records and professional due diligence remain necessary.',
      },
    ],
  },
  {
    id: 'construction',
    name: 'Construction',
    icon: '04',
    description: 'Planning rates, approvals and inspections.',
    questions: [
      {
        question: 'What is a rough 2026 grey-structure planning rate in Lahore?',
        answer: 'Published market guides reviewed in 2026 commonly discuss roughly PKR 2,800 to 3,800 per square foot of covered area. Obtain project-specific quotations and a bill of quantities.',
      },
      {
        question: 'What should I verify before construction?',
        answer: 'Confirm possession, plot demarcation, dues, current DHA Lahore regulations, drawing approval, inspection stages, utility requirements and professional registrations.',
      },
      {
        question: 'Are construction rates based on plot area?',
        answer: 'They are generally discussed against total covered area across all floors, not the plot area. Confirm the measurement method in each quotation.',
      },
    ],
  },
  {
    id: 'images-and-sources',
    name: 'Images and sources',
    icon: '05',
    description: 'How external portal material is handled.',
    questions: [
      {
        question: 'Why do some property cards use a placeholder?',
        answer: 'Third-party listing photographs are not copied, stripped of watermarks or rebranded. A placeholder is used until the owner or dealer supplies clean images with publication rights.',
      },
      {
        question: 'Can I submit my own listing photos?',
        answer: 'Yes, if you own the images or have clear permission to publish them and they contain no third-party branding, phone numbers or protected watermarks.',
      },
      {
        question: 'How often should external listings be checked?',
        answer: 'Before every decision. Portal inventory can change quickly, so open the source link and reconfirm availability directly.',
      },
    ],
  },
];
