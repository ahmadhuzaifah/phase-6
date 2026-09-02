export interface JobRecord {
  title: string;
  slug: string;
  company: string;
  location: string;
  type: string[];
  category: string;
  compensation?: string;
  summary: string;
  details: string[];
  qualifications?: string[];
  companyUrl?: string;
  sourceUrl: string;
  sourceLabel: string;
  sourceChecked: string;
  publishedLabel: string;
  officialDha: boolean;
}

export const JOBS: JobRecord[] = [
  {
    title: "Business Development Representative",
    slug: "business-development-representative-khired-networks",
    company: "Khired Networks",
    location: "DHA Phase 6, Lahore",
    type: ["Full-time", "Full time on-site"],
    category: "Business Development",
    compensation: "Rs 60,000 - Rs 95,000 a month",
    summary: "Business development role focused on lead generation, client qualification, and international B2B software sales in DHA Phase 6 CCA.",
    details: [
      "Generate and qualify prospective client leads across international markets.",
      "Build a structured sales pipeline and communicate technology solutions.",
      "Coordinate qualified enterprise opportunities with account executives."
    ],
    qualifications: [
      "Bachelor's degree in Business, IT, or related discipline",
      "Excellent professional English verbal and written communication",
      "Minimum 1 year experience in B2B tech sales"
    ],
    companyUrl: "https://www.google.com/search?q=Khired+Networks+Lahore",
    sourceUrl: "https://dhalahore.org/careers/",
    sourceLabel: "LinkedIn Jobs",
    sourceChecked: "2026-09-02",
    publishedLabel: "22-Aug-2026",
    officialDha: false
  },
  {
    title: "Site Supervisor / Construction (DHA 6)",
    slug: "site-supervisor-construction-dha-6-lahore",
    company: "Mustafa Developers",
    location: "DHA Phase 6, Lahore",
    type: ["Full-time", "Full-time, On-site"],
    category: "Construction",
    compensation: "Rs 55,000 - Rs 75,000 a month",
    summary: "On-site construction supervision role for high-end residential luxury house construction in Sector A & Sector F, DHA Phase 6.",
    details: [
      "Supervise daily civil and electrical construction work on-site.",
      "Ensure material quality standards and adherence to DHA bylaws.",
      "Coordinate sub-contractors, site labor, and architectural blueprints."
    ],
    qualifications: [
      "DAE Civil or Diploma in Construction Management",
      "3+ years experience in DHA Lahore residential site supervision",
      "Strong team management and site record-keeping skills"
    ],
    companyUrl: "https://www.google.com/search?q=Mustafa+Developers+Lahore",
    sourceUrl: "https://dhalahore.org/careers/",
    sourceLabel: "Direct Employer",
    sourceChecked: "2026-09-02",
    publishedLabel: "22-Aug-2026",
    officialDha: false
  },
  {
    title: "Interior Designer (Luxury Homes)",
    slug: "interior-designer-dha-6-lahore",
    company: "Raya Design Studio",
    location: "CCA 1, Phase 6, Lahore",
    type: ["Full-time"],
    category: "Architecture & Design",
    compensation: "Rs 100,000 - Rs 180,000 a month",
    summary: "Creative interior design position developing high-end 1 & 2 Kanal villa interiors and commercial office spaces in DHA Phase 6.",
    details: [
      "Create detailed 3D interior renders, mood boards, and layout plans.",
      "Select premium finishes, lighting fixtures, and custom woodwork.",
      "Coordinate with client owners and site implementation teams."
    ],
    qualifications: [
      "Degree in Interior Design or Architecture (NCA / Indus Valley preferred)",
      "Proficiency in 3ds Max, AutoCAD, SketchUp, and V-Ray",
      "Portfolio showcasing completed luxury residential projects"
    ],
    companyUrl: "https://www.google.com/search?q=Raya+Design+Studio+Lahore",
    sourceUrl: "https://dhalahore.org/careers/",
    sourceLabel: "Design Portal",
    sourceChecked: "2026-09-02",
    publishedLabel: "22-Aug-2026",
    officialDha: false
  },
  {
    title: "Assistant Manager Accounts",
    slug: "assistant-manager-accounts-dha-6-lahore",
    company: "Global Business Bridge",
    location: "Main Boulevard Phase 6, Lahore",
    type: ["Full-time"],
    category: "Finance & Accounts",
    compensation: "Rs 80,000 - Rs 110,000 a month",
    summary: "Financial accounting management role handling tax filing, general ledger maintenance, and corporate budgeting in DHA Phase 6.",
    details: [
      "Manage daily journal entries, accounts payable, and bank reconciliations.",
      "Prepare monthly financial statements and tax withholding returns.",
      "Assist external auditors and maintain compliance documentation."
    ],
    qualifications: [
      "ACCAPart-qualified, M.Com, or BBA Finance",
      "3-5 years experience in corporate accounting",
      "Hands-on proficiency in QuickBooks and MS Excel"
    ],
    companyUrl: "https://www.google.com/search?q=Global+Business+Bridge+Lahore",
    sourceUrl: "https://dhalahore.org/careers/",
    sourceLabel: "Indeed Pakistan",
    sourceChecked: "2026-09-02",
    publishedLabel: "22-Aug-2026",
    officialDha: false
  },
  {
    title: "Assistant Director IT - Office Automation",
    slug: "assistant-director-it-office-automation-dha-lahore",
    company: "DHA Lahore",
    location: "Sector A, Phase VI, Lahore",
    type: ["Full-time", "Official DHA source"],
    category: "Information Technology",
    compensation: "As per DHA Officer Grade",
    summary: "Official DHA officer role leading enterprise IT workflow automation, ERP systems integration, and document management in Phase 6.",
    details: [
      "Manage enterprise content management (ECM) and digital workflow platforms.",
      "Supervise IT infrastructure, data security, and network performance.",
      "Implement automated approval workflows across DHA departments."
    ],
    qualifications: [
      "BS / MS in Computer Science, Software Engineering, or IT",
      "5+ years enterprise IT management experience",
      "Official DHA application eligibility criteria apply"
    ],
    companyUrl: "https://dhalahore.org/careers/",
    sourceUrl: "https://dhalahore.org/careers/",
    sourceLabel: "DHA Official Careers",
    sourceChecked: "2026-09-02",
    publishedLabel: "Official page checked 2 Sep 2026",
    officialDha: true
  },
  {
    title: "Front Desk Officer & Guest Relations",
    slug: "front-desk-officer-guest-relations-defence-raya",
    company: "Defence Raya Golf & Country Club",
    location: "Sector N, Phase 6, Lahore",
    type: ["Full-time", "Full-time, On-site"],
    category: "Hospitality & Customer Service",
    compensation: "Rs 45,000 - Rs 60,000 a month",
    summary: "Front desk executive welcoming club members, managing guest check-ins, and handling VIP booking requests at Defence Raya Club.",
    details: [
      "Greet club members and international guests with professional etiquette.",
      "Manage central PBX telephone calls and room/golf slot reservations.",
      "Address guest inquiries and coordinate with concierge services."
    ],
    qualifications: [
      "Bachelor's degree in Hospitality, Humanities, or Communication",
      "Pleasing personality with fluent spoken English & Urdu",
      "1-2 years front desk experience in a 4/5-star hotel or club"
    ],
    companyUrl: "https://www.google.com/search?q=Defence+Raya+Golf+and+Country+Club",
    sourceUrl: "https://dhalahore.org/careers/",
    sourceLabel: "Direct Employer",
    sourceChecked: "2026-09-02",
    publishedLabel: "22-Aug-2026",
    officialDha: false
  },
  {
    title: "Project Engineer - Infrastructure & Roads",
    slug: "project-engineer-infrastructure-roads-dha-6",
    company: "Grand City Developers",
    location: "DHA Phase 6, Lahore",
    type: ["Full-time"],
    category: "Engineering",
    compensation: "Rs 120,000 - Rs 160,000 a month",
    summary: "Senior infrastructure engineer planning and overseeing main boulevard paving, sewerage, and underground utilities execution.",
    details: [
      "Monitor road construction, asphalt laying, and storm-water drainage.",
      "Verify quality testing of concrete, soil compaction, and road base.",
      "Coordinate with DHA technical engineers for compliance clearance."
    ],
    qualifications: [
      "B.Sc Civil Engineering (PEC Registered)",
      "4-7 years experience in urban road infrastructure projects",
      "Proficient in AutoCAD Civil 3D and Primavera P6"
    ],
    companyUrl: "https://www.google.com/search?q=Grand+City+Developers+Lahore",
    sourceUrl: "https://dhalahore.org/careers/",
    sourceLabel: "LinkedIn Jobs",
    sourceChecked: "2026-09-02",
    publishedLabel: "22-Aug-2026",
    officialDha: false
  },
  {
    title: "Customer Relationship Manager (Real Estate)",
    slug: "customer-relationship-manager-real-estate-phase-6",
    company: "Ahmad Huzaifah Property Consultants",
    location: "CCA 2, Phase 6, Lahore",
    type: ["Full-time", "Full-time, On-site"],
    category: "Real Estate & Sales",
    compensation: "Rs 70,000 - Rs 120,000 a month + Commission",
    summary: "Client relations manager advising property buyers, managing plot transfers, and conducting property viewings across Phase 6 sectors.",
    details: [
      "Engage high-net-worth real estate buyers and property investors.",
      "Schedule plot & house site visits across Sectors A through N.",
      "Assist clients through DHA Lahore official transfer documentation."
    ],
    qualifications: [
      "BBA / MBA or equivalent commercial degree",
      "Deep familiarity with DHA Phase 6 plot locations & market rates",
      "Proven sales track record in high-end real estate"
    ],
    companyUrl: "https://www.google.com/search?q=Ahmad+Huzaifah+Property+Consultant",
    sourceUrl: "https://dhalahore.org/careers/",
    sourceLabel: "Direct Employer",
    sourceChecked: "2026-09-02",
    publishedLabel: "22-Aug-2026",
    officialDha: false
  },
  {
    title: "Graphic Designer & Social Media Specialist",
    slug: "graphic-designer-social-media-specialist-nitro-fox",
    company: "Nitro Fox Digital",
    location: "CCA 1, Phase 6, Lahore",
    type: ["Full-time", "Full-Time | Onsite"],
    category: "Marketing & Creative",
    compensation: "Rs 55,000 - Rs 80,000 a month",
    summary: "Creative graphic designer designing branding, social media banners, video reels, and promotional collateral for tech clients.",
    details: [
      "Design static graphics, motion posts, and ad creatives for social channels.",
      "Create brand guidelines, brochures, and digital presentation decks.",
      "Collaborate with digital marketing team on campaign strategies."
    ],
    qualifications: [
      "Expertise in Adobe Photoshop, Illustrator, and Premiere Pro",
      "2+ years experience in creative design agency environment",
      "Strong portfolio demonstrating typography and visual aesthetics"
    ],
    companyUrl: "https://www.google.com/search?q=Nitro+Fox+Digital+Lahore",
    sourceUrl: "https://dhalahore.org/careers/",
    sourceLabel: "Rozee.pk",
    sourceChecked: "2026-09-02",
    publishedLabel: "22-Aug-2026",
    officialDha: false
  },
  {
    title: "Fresh Graduate Trainee (Management & IT)",
    slug: "fresh-graduate-trainee-management-it-sequel",
    company: "Sequel Technologies",
    location: "DHA Phase 6, Lahore",
    type: ["Fresher", "Internship", "Full-time"],
    category: "Information Technology",
    compensation: "Rs 35,000 - Rs 50,000 a month",
    summary: "Career jumpstart program for fresh computer science and business graduates to get hands-on training in software operations.",
    details: [
      "Participate in intensive 3-month structured software training.",
      "Assist senior engineers with software testing, documentation, and CRM.",
      "Transition into full-time junior software engineer or analyst roles."
    ],
    qualifications: [
      "Fresh BS CS / IT / Software Engineering or BBA graduate (2025/2026)",
      "Strong analytical problem-solving and basic coding fundamentals",
      "Eagerness to learn corporate software tools"
    ],
    companyUrl: "https://www.google.com/search?q=Sequel+Technologies+Lahore",
    sourceUrl: "https://dhalahore.org/careers/",
    sourceLabel: "Campus Hiring",
    sourceChecked: "2026-09-02",
    publishedLabel: "22-Aug-2026",
    officialDha: false
  },
  {
    title: "Health & Safety Auditor (Commercial Complexes)",
    slug: "health-safety-auditor-commercial-complexes-phase-6",
    company: "Fun City Pakistan",
    location: "Main Boulevard Phase 6, Lahore",
    type: ["Full-time"],
    category: "Safety & Compliance",
    compensation: "Rs 50,000 - Rs 70,000 a month",
    summary: "HSE auditor conducting safety inspections, fire hazard audits, and emergency protocol compliance for commercial play areas.",
    details: [
      "Perform daily safety audits on indoor rides and commercial facilities.",
      "Ensure compliance with international safety and OSHA standards.",
      "Conduct emergency response drills and staff safety training."
    ],
    qualifications: [
      "NEBOSH IGC or IOSH Managing Safely Certification",
      "2+ years HSE experience in commercial or hospitality sector",
      "Detail-oriented mindset with rigorous reporting habits"
    ],
    companyUrl: "https://www.google.com/search?q=Fun+City+Pakistan+Lahore",
    sourceUrl: "https://dhalahore.org/careers/",
    sourceLabel: "Direct Employer",
    sourceChecked: "2026-09-02",
    publishedLabel: "22-Aug-2026",
    officialDha: false
  },
  {
    title: "Senior Civil Officer - Urban Planning",
    slug: "senior-civil-officer-urban-planning-dha-lahore",
    company: "DHA Lahore",
    location: "Sector A, Phase VI, Lahore",
    type: ["Full-time", "Official DHA source"],
    category: "Engineering & Town Planning",
    compensation: "As per DHA Officer Grade",
    summary: "Official DHA vacancy for experienced civil engineers & town planners overseeing Phase VI expansion and municipal infrastructure.",
    details: [
      "Review layout plans and structural approval submissions.",
      "Ensure strict compliance with DHA Lahore building regulations 2026.",
      "Supervise municipal water, drainage, and road network maintenance."
    ],
    qualifications: [
      "B.Sc / M.Sc Civil Engineering or Urban Planning (PEC Registered)",
      "7+ years experience in municipal or housing authority development",
      "Official DHA application procedure applies"
    ],
    companyUrl: "https://dhalahore.org/careers/",
    sourceUrl: "https://dhalahore.org/careers/",
    sourceLabel: "DHA Official Careers",
    sourceChecked: "2026-09-02",
    publishedLabel: "Official page checked 2 Sep 2026",
    officialDha: true
  }
];
