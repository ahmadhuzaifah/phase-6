/**
 * Comprehensive 100+ FAQ Knowledgebase for DHA Phase 6 Lahore
 */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  relatedUrl?: string;
  relatedLabel?: string;
}

export interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  questions: { question: string; answer: string; relatedUrl?: string; relatedLabel?: string }[];
}

export const FAQS_DATA: FAQCategory[] = [
  {
    id: "pricing-valuations",
    name: "Property Pricing & Market Valuations",
    icon: "💰",
    description: "Current asking prices, Marla and Kanal rates, historical trends, and price factors.",
    questions: [
      {
        question: "Is DHA Phase 6 Lahore expensive compared to other DHA phases?",
        answer: "DHA Phase 6 trades at a premium over Phase 7, 8 (Ex-Park View), and 9 Prism due to its 100% completed infrastructure, direct Ring Road connection, and established occupancy. However, it is generally 15% to 25% more affordable per Kanal than mature central Phase 5.",
        relatedUrl: "/dha-phase-6-market-analysis/",
        relatedLabel: "2026 Market Analysis"
      },
      {
        question: "What is the price of a 10 Marla house in DHA Phase 6 Lahore?",
        answer: "As of 2026, a brand-new luxury 10 Marla house in DHA Phase 6 typically ranges from PKR 5.50 Crore to PKR 7.80 Crore depending on sector location (e.g., Sector J commands higher demand), architectural finishing, and corner/park-facing premiums.",
        relatedUrl: "/10-marla-houses-dha-phase-6-lahore/",
        relatedLabel: "10 Marla Houses Guide"
      },
      {
        question: "What is the current price range for a 1 Kanal residential plot in Phase 6?",
        answer: "A standard 1 Kanal residential plot ranges from PKR 4.10 Crore in peripheral growth sectors (K and L) up to PKR 6.50 Crore+ in prime central sectors like Sector C and D near the Grand Jamia Mosque.",
        relatedUrl: "/dha-phase-6-lahore-plot-prices/",
        relatedLabel: "Plot Price Guide"
      },
      {
        question: "What is the price of a brand-new 1 Kanal designer house in Phase 6?",
        answer: "Turnkey 1 Kanal designer houses in DHA Phase 6 range between PKR 10.50 Crore and PKR 16.50 Crore, influenced by construction specifications (Spanish tiles, imported teak, German sanitaryware), basement inclusion, and solar setup.",
        relatedUrl: "/1-kanal-house-for-sale-dha-phase-6-lahore/",
        relatedLabel: "1 Kanal Houses"
      },
      {
        question: "Are 5 Marla residential plots or houses available in DHA Phase 6?",
        answer: "DHA Phase 6 was planned primarily for 10 Marla, 1 Kanal, and 2 Kanal residential properties. 5 Marla inventory is limited to select specialized pockets and townhomes near commercial peripheries.",
        relatedUrl: "/5-marla-plot-for-sale-dha-phase-6-lahore/",
        relatedLabel: "5 Marla Properties"
      },
      {
        question: "What is the price of a 2 Kanal luxury house or plot?",
        answer: "2 Kanal residential plots range from PKR 9.00 Crore to PKR 15.00 Crore, while executive 2 Kanal mansions range from PKR 22.00 Crore to over PKR 35.00 Crore in Sectors A, B, and Defence Raya.",
        relatedUrl: "/best-place-to-live-in-dha-phase-6-lahore/",
        relatedLabel: "Luxury Living Guide"
      },
      {
        question: "Why do plots on the same street have different asking prices?",
        answer: "Plot values vary based on key factors: corner location (+10% DHA premium), direct park facing (+10%), main boulevard frontage (60ft to 150ft roads), direct sun orientation (facing south/east), and depth irregularities.",
        relatedUrl: "/dha-phase-6-property-calculator/",
        relatedLabel: "Property Calculators"
      },
      {
        question: "What is the price of a 4 Marla commercial plot in CCA 1 or CCA 2?",
        answer: "4 Marla commercial plots in CCA 1 range between PKR 8.50 Crore and PKR 14.00 Crore, whereas CCA 2 plots range from PKR 6.50 Crore to PKR 10.50 Crore depending on frontage and parking corridor width.",
        relatedUrl: "/dha-phase-6-commercial-areas/",
        relatedLabel: "Commercial Areas Hub"
      },
      {
        question: "What is the price of an 8 Marla commercial plot in Phase 6?",
        answer: "Prime 8 Marla commercial plots on Main Boulevard and CCA 1 command between PKR 18.00 Crore and PKR 32.00 Crore, driven by high corporate bank and multinational restaurant lease valuations.",
        relatedUrl: "/main-boulevard-commercial-dha-phase-6/",
        relatedLabel: "Main Boulevard Commercial"
      },
      {
        question: "Are advertised property prices on real estate portals negotiable?",
        answer: "Yes. Advertised prices are initial asking demands. In standard market conditions, final negotiated transaction prices often close 3% to 7% lower depending on cash readiness and seller urgency.",
        relatedUrl: "/how-we-collect-property-data/",
        relatedLabel: "Data Collection Protocol"
      },
      {
        question: "What is the historical price growth rate of Phase 6 over the past 10 years?",
        answer: "DHA Phase 6 has delivered an average annualized capital growth of 11.4% between 2014 and 2024, significantly outpacing inflation and bank fixed deposits.",
        relatedUrl: "/dha-phase-6-price-history/",
        relatedLabel: "Historical Price Trends"
      },
      {
        question: "How do basement constructions affect 1 Kanal house valuations?",
        answer: "A full finished basement with a home theatre, gym, and guest suite adds approximately PKR 2.00 to 3.00 Crore to the replacement cost and asking price of a 1 Kanal house in DHA Phase 6.",
        relatedUrl: "/construction/",
        relatedLabel: "Construction Guidelines"
      },
      {
        question: "What are the typical price differentials between Sectors C/D and Sectors K/L?",
        answer: "Sectors K and L trade at an approximate 20% to 25% discount to prime Sectors C and D, representing a major arbitrage opportunity for medium-term capital appreciation.",
        relatedUrl: "/dha-phase-6-sector-ranking/",
        relatedLabel: "Sector Ranking Matrix"
      }
    ]
  },
  {
    id: "sector-selection",
    name: "Sector Selection & Living Quality",
    icon: "🏘️",
    description: "Which sector is best for your family, noise levels, park access, and neighborhood character.",
    questions: [
      {
        question: "Which sector is considered the absolute best to live in DHA Phase 6?",
        answer: "Sector C and Sector D are widely rated the best overall for luxury 1 Kanal and 2 Kanal living due to the Grand Jamia Mosque, low through-traffic, and walking adjacency to CCA 1 amenities.",
        relatedUrl: "/best-sector-in-dha-phase-6-lahore/",
        relatedLabel: "Best Sector Analysis"
      },
      {
        question: "Which sector is best for 10 Marla house construction?",
        answer: "Sector J is the undisputed top choice for 10 Marla homes, hosting Beaconhouse Newlands campus, an active community market, and well-maintained neighborhood parks.",
        relatedUrl: "/dha-phase-6-sector-j-lahore/",
        relatedLabel: "Sector J Guide"
      },
      {
        question: "Which sector in Phase 6 has the fastest commute to Gulberg and Airport?",
        answer: "Sector A is closest to Bedian Road and Phase 5, offering zero-delay airport access (11 minutes), while Sector L provides the quickest entry to the Lahore Ring Road interchange.",
        relatedUrl: "/dha-phase-6-sector-a-lahore/",
        relatedLabel: "Sector A Guide"
      },
      {
        question: "Which sector is the quietest with the least vehicle traffic?",
        answer: "Sectors F, C, and H feature dead-end cul-de-sacs and broad residential lanes well insulated from arterial boulevard noise and transit traffic.",
        relatedUrl: "/dha-phase-6-sector-f-lahore/",
        relatedLabel: "Sector F Guide"
      },
      {
        question: "What makes Defence Raya unique within DHA Phase 6?",
        answer: "Defence Raya (Sectors M & N) is an integrated golf resort developed with BRDB Malaysia, featuring an 18-hole championship course, private country club, swimming complexes, and luxury fairway villas.",
        relatedUrl: "/defence-raya-commercial/",
        relatedLabel: "Defence Raya Guide"
      },
      {
        question: "How does Sector B compare to Sector C?",
        answer: "Sector B is known for prestige and hosts Roots Millennium School with large executive plots, whereas Sector C has greater walkability to CCA 1 shopping and the Grand Jamia Mosque.",
        relatedUrl: "/dha-phase-6-sector-comparison/",
        relatedLabel: "Sector Comparison"
      },
      {
        question: "What are the advantages of living in Sector E?",
        answer: "Sector E contains the official DHA Medical Centre, sports ground, and community center, making it exceptionally convenient for families with elderly members or medical requirements.",
        relatedUrl: "/dha-phase-6-sector-e-lahore/",
        relatedLabel: "Sector E Guide"
      },
      {
        question: "What is the development and occupancy status of Sector K?",
        answer: "Sector K is 100% possession-ready with underground electrification. Residential occupancy is currently around 55% and growing rapidly due to attractive plot entry rates.",
        relatedUrl: "/dha-phase-6-sector-k-lahore/",
        relatedLabel: "Sector K Guide"
      },
      {
        question: "Are all sectors in DHA Phase 6 possession ready?",
        answer: "Yes, all residential sectors from Sector A through Sector N, as well as CCA 1 and CCA 2, are fully developed with on-ground possession and approved for construction.",
        relatedUrl: "/development-status/",
        relatedLabel: "Development Status"
      },
      {
        question: "Which sector is best for living near parks and walking tracks?",
        answer: "Sector B and Sector C have the highest ratio of dedicated green park belts per square kilometer, featuring jogging tracks, floral landscaping, and children play equipment.",
        relatedUrl: "/parks-in-dha-phase-6-lahore/",
        relatedLabel: "Phase 6 Parks Guide"
      },
      {
        question: "Is there any sector affected by high-voltage transmission lines?",
        answer: "Certain perimeter boundary streets in Phase 6 have power grid easements. Our advisory desk screens every plot to ensure 100% clearance from grid easements.",
        relatedUrl: "/property-advisor/",
        relatedLabel: "Property Advisor"
      },
      {
        question: "Can overseas Pakistanis easily manage construction while living abroad?",
        answer: "Yes. Many trusted turnkey construction firms and architectural consultants operate in Phase 6, providing live milestone updates and DHA stage inspection compliance.",
        relatedUrl: "/construction/",
        relatedLabel: "Construction Desk"
      }
    ]
  },
  {
    id: "investment-yields",
    name: "Investment Potential & Rental Yields",
    icon: "📈",
    description: "Rental yields, ROI expectations, buy-to-let strategies, and commercial cashflows.",
    questions: [
      {
        question: "Is DHA Phase 6 Lahore a good investment in 2026?",
        answer: "Yes. DHA Phase 6 represents one of Lahore's most resilient real estate markets, offering steady capital preservation, consistent 4.5% to 5.2% residential rental yields, and strong institutional demand.",
        relatedUrl: "/is-dha-phase-6-lahore-a-good-investment/",
        relatedLabel: "Investment Analysis"
      },
      {
        question: "What is the average monthly rental income for a 1 Kanal house in Phase 6?",
        answer: "A brand-new 1 Kanal house in Phase 6 typically rents for PKR 350,000 to PKR 550,000 per month depending on sector, interior fittings, basement amenities, and furnishing status.",
        relatedUrl: "/dha-phase-6-market-analysis/",
        relatedLabel: "Market Analysis"
      },
      {
        question: "What is the rental income for a 10 Marla house in Phase 6?",
        answer: "A 10 Marla house commands between PKR 180,000 and PKR 280,000 per month in Sectors J, G, and H, driven by strong executive tenant demand from nearby corporate hubs and schools.",
        relatedUrl: "/10-marla-houses-dha-phase-6-lahore/",
        relatedLabel: "10 Marla Houses"
      },
      {
        question: "What is the rental yield on commercial plazas in CCA 1 and CCA 2?",
        answer: "Commercial buildings generate gross rental yields between 6.5% and 7.8% annually, with long-term 3- to 5-year leases secured with corporate banks, pharmaceutical chains, and restaurants.",
        relatedUrl: "/dha-phase-6-commercial-areas/",
        relatedLabel: "Commercial Areas"
      },
      {
        question: "Should I invest in a vacant plot or a ready-built house for capital gains?",
        answer: "Plots offer zero maintenance overhead and pure land appreciation upside. Built houses generate ongoing monthly rental cash flow but require periodic maintenance and depreciate in construction structure over time.",
        relatedUrl: "/dha-phase-6-property-calculator/",
        relatedLabel: "ROI Calculator"
      },
      {
        question: "Which sectors offer the highest capital appreciation potential over the next 3 years?",
        answer: "Sectors K, L, and G offer the strongest capital growth runway due to their lower baseline entry costs (20% below central sectors) and accelerating construction velocity.",
        relatedUrl: "/best-investment-area-in-dha-phase-6-lahore/",
        relatedLabel: "Best Investment Sectors"
      },
      {
        question: "How does inflation impact property valuations in DHA Phase 6?",
        answer: "Real estate in mature DHA phases acts as an effective hedge against inflation and currency devaluation because land scarcity and construction replacement costs rise in lockstep with CPI inflation.",
        relatedUrl: "/dha-phase-6-price-history/",
        relatedLabel: "Price History"
      },
      {
        question: "What is the tenancy vacancy rate in DHA Phase 6?",
        answer: "The residential vacancy rate in prime sectors is under 6%, with well-constructed modern houses typically leased within 3 to 6 weeks of listing.",
        relatedUrl: "/dha-phase-6-property-market-dashboard/",
        relatedLabel: "Market Dashboard"
      },
      {
        question: "Are corporate tenants common in Phase 6 residential properties?",
        answer: "Yes, multinational company executives, bank regional managers, and senior consultants frequently rent 1 Kanal luxury houses in Sectors A, B, C, and D.",
        relatedUrl: "/why-dha-phase-6-lahore/",
        relatedLabel: "Why Phase 6"
      },
      {
        question: "Can commercial shops be purchased individually as floor units?",
        answer: "Yes, multi-story commercial plazas in CCA 1 and CCA 2 frequently offer individual retail shops, lower-ground spaces, and corporate office floors with dedicated sub-lease agreements.",
        relatedUrl: "/cca-1-dha-phase-6-lahore/",
        relatedLabel: "CCA 1 Guide"
      },
      {
        question: "What is the typical annual rent escalation clause in Phase 6 agreements?",
        answer: "Standard rental agreements in DHA Phase 6 stipulate an annual rent escalation of 10%, though corporate leases often fix escalations at 15% to 20% every two to three years.",
        relatedUrl: "/dha-phase-6-property-calculator/",
        relatedLabel: "Rental Yield Calculator"
      },
      {
        question: "Is commercial property in Defence Raya a sound investment?",
        answer: "Defence Raya Fairways commercial plazas offer prestige and strong boutique retail rental yields, catering to high-net-worth club members and golf villa residents.",
        relatedUrl: "/defence-raya-commercial/",
        relatedLabel: "Defence Raya Commercial"
      }
    ]
  },
  {
    id: "transfer-bylaws",
    name: "DHA Transfer Process, NDC & Bylaws",
    icon: "📋",
    description: "Official procedures, No Demand Certificate, allocation letters, and building codes.",
    questions: [
      {
        question: "How does the official property transfer process work in DHA Lahore?",
        answer: "Transfers are conducted exclusively at the DHA Lahore Main Office. Steps: 1) Seller applies for NDC, 2) Buyer and seller submit transfer sets, 3) Both parties appear before the Transfer Officer for biometric/photo verification, 4) DHA issues the Transfer Letter to the buyer within 10 to 14 working days.",
        relatedUrl: "/verification-and-transfer/",
        relatedLabel: "Transfer Guide"
      },
      {
        question: "What is a No Demand Certificate (NDC) in DHA?",
        answer: "An NDC is an official clearance certificate issued by DHA verifying that all development charges, outstanding dues, water/sewerage fees, and non-construction penalties on the property are fully paid.",
        relatedUrl: "/verification-and-transfer/",
        relatedLabel: "NDC Verification"
      },
      {
        question: "How long does it take to obtain an NDC from DHA Lahore?",
        answer: "Standard NDC processing takes 7 to 10 working days. Urgent processing is available through DHA for an expedited fee, delivering the certificate in 3 to 4 working days.",
        relatedUrl: "/dha-phase-6-property-calculator/",
        relatedLabel: "Calculator Suite"
      },
      {
        question: "Can an overseas Pakistani transfer property without visiting Lahore in person?",
        answer: "Yes. Overseas owners can execute a Special Power of Attorney (Hiba/Transfer POA) attested by the Pakistan Embassy or High Commission in their country of residence and counter-verified by the Ministry of Foreign Affairs (MOFA) in Pakistan.",
        relatedUrl: "/verification-and-transfer/",
        relatedLabel: "Overseas Transfer Guide"
      },
      {
        question: "What documents are required from the buyer on transfer day?",
        answer: "The buyer needs: original CNIC / NICOP and 2 copies, two passport-sized photographs, DHA membership form, payment receipts for DHA transfer fees, and FBR Advance Tax payment proof.",
        relatedUrl: "/verification-and-transfer/",
        relatedLabel: "Required Documents"
      },
      {
        question: "What happens if a property has non-construction penalties (DPC fines)?",
        answer: "DHA requires all non-construction penalties to be fully settled prior to issuing the NDC. The seller is contractually responsible for clearing these dues unless otherwise agreed in writing.",
        relatedUrl: "/how-we-collect-property-data/",
        relatedLabel: "Due Diligence"
      },
      {
        question: "What are the mandatory boundary setbacks for building a 1 Kanal house?",
        answer: "Under DHA Lahore building bylaws, a 1 Kanal house must maintain a minimum 15-foot front setback, a 7-foot rear setback, and 5-foot side setbacks on both sides to ensure light, ventilation, and emergency access.",
        relatedUrl: "/construction/",
        relatedLabel: "Building Bylaws"
      },
      {
        question: "What is the maximum allowed building height for a residential house in Phase 6?",
        answer: "DHA permits Basement + Ground Floor + First Floor + Rooftop Mumty, with a maximum permissible total height of 35 to 38 feet from road level depending on parapet configuration.",
        relatedUrl: "/construction/",
        relatedLabel: "Height Regulations"
      },
      {
        question: "Can commercial plazas have rooftop dining in Phase 6?",
        answer: "Rooftop dining requires explicit commercial zoning clearance, fire safety approval, and waste management permits from DHA Lahore building control.",
        relatedUrl: "/dha-phase-6-commercial-areas/",
        relatedLabel: "Commercial Bylaws"
      },
      {
        question: "Is possession automatic upon receiving the transfer letter?",
        answer: "The transfer letter confers legal title. Physical site possession for construction requires applying for site demarcation from the DHA Survey & Planning branch.",
        relatedUrl: "/verification-and-transfer/",
        relatedLabel: "Site Demarcation"
      },
      {
        question: "How can I verify if an allotment letter is original and unencumbered?",
        answer: "Request an official Information / Verification slip from the DHA Lahore verification window before paying any substantial advance or token money.",
        relatedUrl: "/property-advisor/",
        relatedLabel: "Advisory Desk"
      },
      {
        question: "What is Urgent Transfer in DHA Lahore?",
        answer: "Urgent transfer allows completion of the transfer appointment and issuance of the transfer letter within 24 to 48 hours upon payment of an expedited fee to DHA.",
        relatedUrl: "/verification-and-transfer/",
        relatedLabel: "Urgent Transfer"
      }
    ]
  },
  {
    id: "taxes-fbr",
    name: "Government Taxes, FBR & Transfer Costs",
    icon: "📑",
    description: "FBR Section 236K, 236C, filer vs non-filer rates, stamp duty, and DHA charges.",
    questions: [
      {
        question: "What is FBR Advance Tax under Section 236K for property buyers?",
        answer: "Section 236K is advance income tax paid by the buyer at the time of property transfer. Active tax filers pay 3% of the recorded FBR property valuation, whereas non-filers pay substantially higher rates ranging from 6% to 10% depending on property value slabs.",
        relatedUrl: "/dha-phase-6-property-calculator/",
        relatedLabel: "Transfer Cost Calculator"
      },
      {
        question: "What tax is paid by the seller under Section 236C?",
        answer: "Section 236C is advance capital gains tax paid by the seller: 3% for active filers, and 6% to 10% for non-filers. Reductions apply depending on the seller holding period.",
        relatedUrl: "/dha-phase-6-property-calculator/",
        relatedLabel: "Tax Calculator"
      },
      {
        question: "What are the DHA Lahore transfer fees for a 1 Kanal residential plot?",
        answer: "DHA charges a fixed transfer fee (approximately PKR 120,000 to PKR 150,000), membership fee (PKR 50,000 to PKR 75,000 if first-time member), and urgent/processing dues.",
        relatedUrl: "/buying-costs/",
        relatedLabel: "Buying Costs Breakdown"
      },
      {
        question: "Does Punjab Stamp Duty apply to DHA property transfers?",
        answer: "Yes, provincial Stamp Duty (typically 1% of the registered value) is payable along with local TMA / Cantonment transfer taxes.",
        relatedUrl: "/dha-phase-6-property-calculator/",
        relatedLabel: "Stamp Duty Calculator"
      },
      {
        question: "How are FBR property valuation tables applied in DHA Phase 6?",
        answer: "FBR establishes statutory benchmark rates per Marla for DHA Lahore. Taxes are calculated on the higher of the FBR valuation table rate or the declared transaction value.",
        relatedUrl: "/dha-phase-6-property-calculator/",
        relatedLabel: "FBR Calculator"
      },
      {
        question: "Can an overseas Pakistani qualify as an active tax filer?",
        answer: "Yes. Overseas Pakistanis can obtain a National Tax Number (NTN) and file annual foreign income declaration returns to maintain active filer status on the FBR Active Taxpayer List (ATL).",
        relatedUrl: "/verification-and-transfer/",
        relatedLabel: "Tax Filer Guide"
      },
      {
        question: "Are capital gains taxes exempt if the property is held for over 6 years?",
        answer: "Tax laws have evolved; current finance acts impose scaled capital gains tax based on holding duration. Check current financial year amendments with a qualified tax consultant.",
        relatedUrl: "/dha-phase-6-property-calculator/",
        relatedLabel: "Tax Rules"
      },
      {
        question: "What is the total estimated transfer cost for a 1 Kanal house for an active filer?",
        answer: "For an active tax filer purchasing a 1 Kanal house in DHA Phase 6, total government and DHA dues generally total between 4.5% and 5.5% of the recorded FBR valuation.",
        relatedUrl: "/dha-phase-6-property-calculator/",
        relatedLabel: "Calculate Total Costs"
      },
      {
        question: "Do non-filers face any restrictions when buying property in DHA?",
        answer: "Under current financial regulations, non-filers face punitive tax rates (up to 10% on 236K) and may face statutory inquiries regarding documented source of funds.",
        relatedUrl: "/buying-costs/",
        relatedLabel: "Non-Filer Regulations"
      },
      {
        question: "What payment instruments are accepted by DHA for transfer fees?",
        answer: "DHA Lahore accepts Pay Orders / Banker Cheques drawn in favor of 'DHA Lahore' from recognized commercial banks. Cash is not accepted at transfer counters.",
        relatedUrl: "/verification-and-transfer/",
        relatedLabel: "Payment Modes"
      },
      {
        question: "How can I verify my Active Taxpayer List (ATL) status before transfer day?",
        answer: "Verify your status online through the FBR portal or by sending an SMS with 'ATL [CNIC]' to 9966 to ensure you receive the filer tax rate.",
        relatedUrl: "/dha-phase-6-property-calculator/",
        relatedLabel: "ATL Verification"
      },
      {
        question: "Are commercial property transfer taxes higher than residential?",
        answer: "Yes, commercial properties have higher DHA transfer fee scales and higher FBR valuation tables per square foot, resulting in higher nominal tax obligations.",
        relatedUrl: "/dha-phase-6-commercial-areas/",
        relatedLabel: "Commercial Costs"
      }
    ]
  },
  {
    id: "schools-healthcare",
    name: "Schools, Colleges & Healthcare",
    icon: "🏫",
    description: "Educational institutions, medical centers, emergency response, and campuses.",
    questions: [
      {
        question: "Which top private schools have campuses inside DHA Phase 6?",
        answer: "Phase 6 is home to premier campuses including Lahore Grammar School (LGS) in Sector G, Beaconhouse Newlands in Sector J, Roots Millennium School in Sector B, and DHA Senior School for Boys & Girls.",
        relatedUrl: "/schools-in-dha-phase-6-lahore/",
        relatedLabel: "Schools Guide"
      },
      {
        question: "Where is the DHA Medical Centre located in Phase 6?",
        answer: "The official DHA Medical Centre is situated in Sector E, featuring 24/7 outpatient emergency services, dental clinics, digital radiology, and pharmacy facilities.",
        relatedUrl: "/hospitals-in-dha-phase-6-lahore/",
        relatedLabel: "Healthcare Facilities"
      },
      {
        question: "How far is PKLI (Pakistan Kidney and Liver Institute) from Phase 6?",
        answer: "PKLI is located approximately 5 to 7 minutes from the Phase 6 main boulevard, making it one of the closest quaternary multi-specialty hospitals.",
        relatedUrl: "/hospitals-in-dha-phase-6-lahore/",
        relatedLabel: "Hospitals Near Phase 6"
      },
      {
        question: "Are there pre-schools and daycares available in individual sectors?",
        answer: "Yes, numerous Montessori and early-learning centers, including Roots Junior, Froebel's, and Scarsdale, operate within Sectors A, B, and C.",
        relatedUrl: "/schools-in-dha-phase-6-lahore/",
        relatedLabel: "Montessori Campuses"
      },
      {
        question: "What universities and higher-education colleges are nearby?",
        answer: "Lahore University of Management Sciences (LUMS) is located approximately 7 to 9 minutes away in Phase 5, accessible directly via signal-free boulevards.",
        relatedUrl: "/why-dha-phase-6-lahore/",
        relatedLabel: "Strategic Connectivity"
      },
      {
        question: "Are there 24/7 pharmacies in Phase 6 commercial areas?",
        answer: "Yes. Major pharmacy chains including Servaid, Fazal Din's, Clinix, and Chughtai Lab operate 24-hour branches in CCA 1 and CCA 2.",
        relatedUrl: "/cca-1-dha-phase-6-lahore/",
        relatedLabel: "CCA 1 Pharmacies"
      },
      {
        question: "How fast is the DHA emergency ambulance response in Phase 6?",
        answer: "The dedicated DHA Phase 6 emergency ambulance and fire rescue station typically responds to internal sector calls within 5 to 8 minutes.",
        relatedUrl: "/helplines/",
        relatedLabel: "Emergency Helplines"
      },
      {
        question: "Are sports complexes and swimming pools available for students?",
        answer: "Yes, Sector E and Defence Raya feature comprehensive sports complexes with heated swimming pools, squash courts, tennis courts, and football academies.",
        relatedUrl: "/dha-phase-6-sector-e-lahore/",
        relatedLabel: "Sector E Sports Complex"
      },
      {
        question: "Are specialized diagnostic labs available in Phase 6?",
        answer: "Yes, Chughtai Lab, Shaukat Khanum Diagnostic Centre, and IDC (Islamabad Diagnostic Centre) have active branches in CCA 1.",
        relatedUrl: "/hospitals-in-dha-phase-6-lahore/",
        relatedLabel: "Diagnostic Labs"
      },
      {
        question: "Do school buses and vans have easy pickup access across all sectors?",
        answer: "Yes, the wide 50-foot residential streets and structured cul-de-sacs allow smooth school van and bus navigation without gridlock.",
        relatedUrl: "/dha-phase-6-sector-j-lahore/",
        relatedLabel: "Sector J Community"
      },
      {
        question: "Are there dedicated special education schools near Phase 6?",
        answer: "Rising Sun Institute and other specialized centers are located within a short 10-minute commute along Ghazi Road and Phase 5.",
        relatedUrl: "/schools-in-dha-phase-6-lahore/",
        relatedLabel: "Education Network"
      },
      {
        question: "Is veterinary and pet healthcare available in Phase 6?",
        answer: "Yes, modern pet clinics and grooming centers operate in CCA 1 and CCA 2, providing veterinary surgeries and boarding facilities.",
        relatedUrl: "/cca-2-dha-phase-6-lahore/",
        relatedLabel: "CCA 2 Services"
      }
    ]
  },
  {
    id: "connectivity-transit",
    name: "Accessibility, Ring Road & Airport Commutes",
    icon: "🚗",
    description: "Travel times, highway interchanges, public transit, and airport distances.",
    questions: [
      {
        question: "How far is Allama Iqbal International Airport from DHA Phase 6?",
        answer: "The airport is approximately 8 to 10 kilometers away. Via Bedian Road and the signal-free DHA Main Boulevard, drive time is typically 10 to 12 minutes.",
        relatedUrl: "/location/",
        relatedLabel: "Location & Commute"
      },
      {
        question: "Where are the Lahore Ring Road interchanges for Phase 6?",
        answer: "Phase 6 has direct access to the Lahore Ring Road (L-20) via the Nawaz Sharif Interchange and the dedicated Phase 6 / Sector L exit ramp.",
        relatedUrl: "/dha-phase-6-lahore-map/",
        relatedLabel: "Master Plan Map"
      },
      {
        question: "How long does it take to commute from Phase 6 to Gulberg?",
        answer: "Via the Lahore Ring Road and Ferozepur Road or Cantt corridors, travel time to Main Boulevard Gulberg is approximately 16 to 20 minutes outside rush hours.",
        relatedUrl: "/why-dha-phase-6-lahore/",
        relatedLabel: "Transit Advantages"
      },
      {
        question: "How is Phase 6 connected to DHA Phase 5 and Phase 7?",
        answer: "Phase 6 connects seamlessly to Phase 5 via the 150-foot Shabbir Sharif Boulevard over Bedian Road, and connects directly to Phase 7 via the eastern boulevard corridor.",
        relatedUrl: "/dha-phase-6-vs-phase-5-lahore/",
        relatedLabel: "Phase 5 vs Phase 6"
      },
      {
        question: "Is there any traffic congestion at the Phase 6 main entrance?",
        answer: "The grade-separated underpass and widened multi-lane approach from Bedian Road have eliminated historical bottlenecking at the main gate.",
        relatedUrl: "/dha-phase-6-market-updates/",
        relatedLabel: "Infrastructure Updates"
      },
      {
        question: "What are the primary access roads into DHA Phase 6?",
        answer: "The four primary arteries are: 1) Shabbir Sharif Boulevard (from Phase 5), 2) Bedian Road (western side), 3) Barki Road (northern side), and 4) Lahore Ring Road (eastern side).",
        relatedUrl: "/dha-phase-6-lahore-map/",
        relatedLabel: "Interactive Map"
      },
      {
        question: "Are ride-hailing services (Uber, Careem, InDrive, Yango) available in Phase 6?",
        answer: "Yes, all major app-based ride-hailing and food delivery services (Foodpanda) operate freely with average pickup arrival times under 5 minutes.",
        relatedUrl: "/living-in-dha-phase-6-lahore/",
        relatedLabel: "Living in Phase 6"
      },
      {
        question: "How long does it take to reach Lahore Motorway (M-2 / M-3)?",
        answer: "Via the southern loop of the Lahore Ring Road, drivers reach the Babu Sabu and Thokar Niaz Baig motorway interchanges in approximately 22 to 26 minutes.",
        relatedUrl: "/location/",
        relatedLabel: "Regional Connectivity"
      },
      {
        question: "Is commercial trucking allowed inside residential sectors?",
        answer: "No. Heavy construction trailers and delivery trucks are strictly restricted by DHA Security to designated service corridors during specified off-peak night hours.",
        relatedUrl: "/construction/",
        relatedLabel: "Transit Bylaws"
      },
      {
        question: "How far is the nearest railway station from Phase 6?",
        answer: "Lahore Cantt Railway Station is approximately 18 minutes away, while Lahore Junction Main Railway Station is roughly 25 to 30 minutes away.",
        relatedUrl: "/location/",
        relatedLabel: "Location Details"
      },
      {
        question: "Is Phase 6 affected by morning school traffic jams?",
        answer: "Because campuses are distributed across different sectors (Sector G, Sector J, Sector B) with wide 80-foot boulevards, localized drop-off traffic disperses rapidly.",
        relatedUrl: "/schools-in-dha-phase-6-lahore/",
        relatedLabel: "Schools Hub"
      },
      {
        question: "Can pedestrians easily cross between sectors?",
        answer: "Yes, broad paved sidewalks, signalized pedestrian crossings, and landscaped central medians make walking between sectors safe and pleasant.",
        relatedUrl: "/parks-in-dha-phase-6-lahore/",
        relatedLabel: "Walking Tracks"
      }
    ]
  },
  {
    id: "utilities-infrastructure",
    name: "Utilities, Underground Grid & Infrastructure",
    icon: "⚡",
    description: "Electricity stability, solar net-metering, water supply, sewerage, and internet fiber.",
    questions: [
      {
        question: "Does DHA Phase 6 have 100% underground electrification?",
        answer: "Yes. All sectors from Sector A to Sector N, including CCA 1, CCA 2, and Defence Raya, feature 100% underground power distribution with zero overhead wiring.",
        relatedUrl: "/utilities/",
        relatedLabel: "Utilities Guide"
      },
      {
        question: "What is the status of Sui gas supply in DHA Phase 6?",
        answer: "Underground gas distribution pipelines and supply mains are fully laid throughout Phase 6. While national SNGPL policy prioritizes LPG and LNG during peak winter, gas meters are installed across developed houses.",
        relatedUrl: "/utilities/",
        relatedLabel: "Gas Infrastructure"
      },
      {
        question: "Is solar net-metering allowed and supported in DHA Phase 6?",
        answer: "Yes. DHA Phase 6 is one of Lahore's most solar-friendly societies. Over 80% of newly constructed homes install 15kW to 25kW three-phase hybrid net-metering systems with LESCO green meters.",
        relatedUrl: "/construction/",
        relatedLabel: "Solar Integration"
      },
      {
        question: "How does the water supply system function in Phase 6?",
        answer: "DHA maintains dedicated deep-well tube wells and high-capacity overhead water reservoirs across all sectors, ensuring pressurized, chlorinated tap water supply twice daily.",
        relatedUrl: "/utilities/",
        relatedLabel: "Water Supply System"
      },
      {
        question: "Is high-speed fiber-optic internet available in every sector?",
        answer: "Yes. Multiple tier-1 fiber-to-the-home (FTTH) internet service providers operate underground networks, including PTCL Flash Fiber, StormFiber, Optix, and Nayatel, delivering speeds up to 1 Gbps.",
        relatedUrl: "/living-in-dha-phase-6-lahore/",
        relatedLabel: "Internet & Telecom"
      },
      {
        question: "Does DHA Phase 6 experience waterlogging during monsoon rains?",
        answer: "No. DHA Phase 6 features a modern gravity-fed underground storm drainage system equipped with high-capacity retention sumps, ensuring roads drain completely within minutes after intense downpours.",
        relatedUrl: "/dha-phase-6-market-updates/",
        relatedLabel: "Drainage Infrastructure"
      },
      {
        question: "What backup power arrangements exist for streetlights and security cameras?",
        answer: "All major boulevards, intersection signals, security checkpoints, and surveillance cameras are backed by dedicated DHA industrial generators and solar arrays.",
        relatedUrl: "/why-dha-phase-6-lahore/",
        relatedLabel: "Security Systems"
      },
      {
        question: "How is household garbage and waste collected in Phase 6?",
        answer: "DHA operates a daily door-to-door solid waste management service with mechanized compaction trucks, keeping residential streets immaculate.",
        relatedUrl: "/utilities/",
        relatedLabel: "Waste Management"
      },
      {
        question: "Can residents drill personal water bores in DHA Phase 6?",
        answer: "Private deep tube-well drilling is regulated by DHA to preserve water tables. Residents are required to utilize the central DHA chlorinated water supply network.",
        relatedUrl: "/construction/",
        relatedLabel: "Water Bylaws"
      },
      {
        question: "Are mobile cellular signals strong across all sectors?",
        answer: "Yes. Concealed camouflaged cell towers (palm-tree antennas) are integrated into park areas, ensuring 4G/5G coverage across Jazz, Zong, Telenor, and Ufone.",
        relatedUrl: "/living-in-dha-phase-6-lahore/",
        relatedLabel: "Connectivity"
      },
      {
        question: "What is the typical monthly DHA maintenance charge for a 1 Kanal house?",
        answer: "DHA monthly maintenance and conservancy dues for a 1 Kanal house are approximately PKR 3,500 to PKR 5,000, covering security patrols, street lighting, and sanitation.",
        relatedUrl: "/buying-costs/",
        relatedLabel: "Maintenance Charges"
      },
      {
        question: "Where is the DHA customer care and complaint office located for Phase 6?",
        answer: "The DHA Phase 6 Sub-Office and customer service desk is located inside Sector E near the Medical Centre, handling utility complaints, tree trimming, and road maintenance.",
        relatedUrl: "/helplines/",
        relatedLabel: "Helplines & Desk"
      }
    ]
  }
];
