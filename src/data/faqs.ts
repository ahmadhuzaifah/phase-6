/**
 * Comprehensive FAQ Authority Hub Dataset
 * Al Rehman Garden Phase 2 Lahore Authority Portal
 */

export interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

export const FAQS_DATA: FAQCategory[] = [
  {
    id: 'general',
    name: 'General & Society Overview',
    icon: '🏛️',
    description: 'Foundational information about Al Rehman Garden Phase 2, developer background, and location.',
    questions: [
      {
        question: 'Where is Al Rehman Garden Phase 2 located in Lahore?',
        answer: 'Al Rehman Garden Phase 2 is situated directly on Main Sharaqpur Road, just 2 minutes from the M-2 Motorway (Faizpur Interchange) and 10 minutes from Mall Road / Sagian Bridge in Lahore.',
      },
      {
        question: 'Who is the developer of Al Rehman Garden Phase 2?',
        answer: 'The project is developed by Al Rehman Developers, one of Punjab’s established real estate development groups with over two decades of track record in delivering master-planned communities.',
      },
      {
        question: 'How many families currently live in Al Rehman Garden Phase 2?',
        answer: 'Over 5,000 families currently reside in the mature sectors (Blocks A, B, C, D, E, and F), creating a fully functional community with operational schools, banks, hospitals, and commercial markets.',
      },
    ],
  },
  {
    id: 'legal-noc',
    name: 'Legal Title & NOC Status',
    icon: '⚖️',
    description: 'Regulatory compliance, LDA approvals, and title deed verification.',
    questions: [
      {
        question: 'Is Al Rehman Garden Phase 2 LDA approved?',
        answer: 'Yes, Al Rehman Garden Phase 2 holds official approval for its master development layout plan from the Lahore Development Authority (LDA) and relevant district civic authorities.',
      },
      {
        question: 'Can I get an individual registry (Inteqal) for my plot?',
        answer: 'Yes, plots in possession-ready mature blocks (such as Block A, B, C, D, and E) are eligible for direct registry and Inteqal through standard Lahore revenue authority procedures.',
      },
      {
        question: 'How do I verify the authenticity of a property file before buying?',
        answer: 'Buyers should request a verification certificate directly from the Al Rehman Garden Head Office and confirm the No Demand Certificate (NDC) and biometric transfer clearance.',
      },
    ],
  },
  {
    id: 'prices-investment',
    name: 'Prices & Investment Returns',
    icon: '💰',
    description: 'Current market rates, historical appreciation, and investment potential.',
    questions: [
      {
        question: 'What is the starting price for a 5 Marla residential plot in 2026?',
        answer: 'In 2026, 5 Marla residential plots range from approximately PKR 42 Lakh to PKR 58 Lakh depending on sector maturity, road width (e.g. 150ft Boulevard vs. 30ft street), and corner/park-facing premiums.',
      },
      {
        question: 'What is the expected annual ROI for plots in Al Rehman Garden Phase 2?',
        answer: 'Developing sectors like Mirabel Block, Royal Block, and Beverly Hills have experienced historical capital appreciation of 14% to 18% annually due to expanding road infrastructure and high demand.',
      },
      {
        question: 'Are there installment payment plans available?',
        answer: 'Yes, newly launched luxury enclaves (Mirabel and Beverly Hills) offer 3 to 5-year flexible installment payment plans with easy monthly and quarterly payment schedules.',
      },
    ],
  },
  {
    id: 'utilities',
    name: 'Utilities & Civic Facilities',
    icon: '⚡',
    description: 'Electricity grid, Sui gas, water supply, internet, and security.',
    questions: [
      {
        question: 'Is electricity underground in Al Rehman Garden Phase 2?',
        answer: 'Yes, mature and executive sectors feature 100% underground electric cabling with dedicated backup transformers, providing a clean, wire-free skyline and reliable power supply.',
      },
      {
        question: 'Is Sui Gas connected and operational for residents?',
        answer: 'Yes, Sui Northern Gas Pipelines Limited (SNGPL) pipeline infrastructure is fully active in mature residential sectors with domestic household meter connections.',
      },
      {
        question: 'What is the water supply source in the society?',
        answer: 'The society operates heavy-duty deep-well turbine water supply systems along with automated Reverse Osmosis (RO) commercial filtration plants in multiple sectors for pure drinking water.',
      },
      {
        question: 'What security measures are implemented in Phase 2?',
        answer: 'The society features 24/7 gated entry barriers, armed mobile security patrols, biometric resident registration, and over 200 high-definition PTZ CCTV cameras monitored in a central control room.',
      },
    ],
  },
  {
    id: 'possession-construction',
    name: 'Possession & Home Construction',
    icon: '🔑',
    description: 'Handover timelines, construction bylaws, and building your home.',
    questions: [
      {
        question: 'Which blocks are ready for immediate house construction?',
        answer: 'Block A (Executive), Block B, Block C, Block D, and Blocks E & F have 100% ready on-ground possession where you can start house construction immediately after transfer.',
      },
      {
        question: 'What is the procedure to start house construction?',
        answer: 'Submit your architectural floor plans and elevation drawings to the society town planning desk for by-law approval, obtain utility connection NOCs, and commence ground-breaking.',
      },
    ],
  },
];
