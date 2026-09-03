/** DHA Phase 6 Lahore sector directory based on the official phase map. */
export interface Block {
  name: string;
  slug: string;
  category: 'executive' | 'residential' | 'luxury-villas' | 'commercial';
  status: 'developed' | 'under-development' | 'possession-ready';
  possessionPercentage: number;
  plotTypes: string[];
  plotSizes: string[];
  features: string[];
  locationHighlight: string;
  description: string;
}

const sector = (
  letter: string,
  plotSizes: string[],
  locationHighlight: string,
  features: string[],
  description: string,
): Block => ({
  name: `Sector ${letter}`,
  slug: `sector-${letter.toLowerCase()}`,
  category: 'residential',
  status: 'developed',
  possessionPercentage: 0,
  plotTypes: ['Residential'],
  plotSizes,
  features,
  locationHighlight,
  description,
});

export const BLOCKS: Block[] = [
  sector('A', ['1 Kanal', '2 Kanal'], 'Western side of Phase 6 near the main approach network', ['Large residential plots', 'Sector parks', 'Boulevard access'], 'Sector A is commonly evaluated for larger plots and its position on the western side of the phase. Compare the exact street, plot orientation and nearby land use on the official map.'),
  sector('B', ['1 Kanal', '2 Kanal'], 'North-western residential area adjoining the Phase 6 road network', ['Large residential plots', 'Park pockets', 'Links toward Barki Road'], 'Sector B is a large-plot residential area. Prices can vary substantially by road width, corner status and proximity to commercial or recreational land.'),
  sector('C', ['1 Kanal', '2 Kanal'], 'Central-western part of Phase 6', ['Central position', 'Residential streets', 'Access to surrounding sectors'], 'Sector C offers a central residential context. Buyers should verify the plot number against the official map and inspect surrounding construction before making a decision.'),
  sector('D', ['1 Kanal'], 'Central Phase 6 with access from major internal roads', ['Residential plots', 'Internal parks', 'Commercial access'], 'Sector D appears frequently in public property searches. Asking prices are not transaction evidence, so compare several current listings and verify documents independently.'),
  sector('E', ['1 Kanal'], 'Central-southern area near the Phase 6 medical centre', ['Medical centre context', 'Residential streets', 'Internal road access'], 'Sector E includes established residential streets and is identified by DHA Lahore as the location of its Phase 6 Medical Centre.'),
  sector('F', ['1 Kanal', '2 Kanal'], 'Southern-central part of the phase', ['Large plot options', 'Sector parks', 'Links to adjoining sectors'], 'Sector F is generally considered by buyers seeking larger residential formats. Confirm plot dimensions, building controls and utility status with DHA Lahore.'),
  sector('G', ['10 Marla', '1 Kanal'], 'South-eastern side with routes toward Bedian Road', ['Mixed residential sizes', 'Road connectivity', 'Park and mosque context'], 'Sector G can suit buyers comparing access toward Bedian Road with internal Phase 6 connectivity. Exact travel times depend on route and traffic.'),
  sector('H', ['10 Marla', '1 Kanal'], 'Eastern-central residential area near CCA activity', ['10 Marla options', 'Commercial access', 'Internal parks'], 'Sector H is commonly searched for both 10 Marla and larger residential options. Check each plot against the map because location premiums vary street by street.'),
  sector('J', ['10 Marla', '1 Kanal'], 'Eastern residential area between internal boulevards', ['10 Marla options', 'Residential streets', 'Neighbourhood amenities'], 'Sector J is a practical comparison point for 10 Marla buyers. Evaluate built-up surroundings, road width, orientation and asking-price age.'),
  sector('K', ['1 Kanal', '2 Kanal'], 'South-eastern residential area', ['Large plots', 'Lower through-traffic streets', 'Links toward the phase edge'], 'Sector K contains larger residential plots in the eastern half of Phase 6. A physical visit is important for understanding the immediate street context.'),
  sector('L', ['1 Kanal', '2 Kanal'], 'Eastern side of Phase 6 near regional road links', ['Large residential plots', 'Eastern access', 'Sector green spaces'], 'Sector L is positioned toward the eastern edge of the phase. Confirm access routes and neighbouring land use on the latest official map.'),
  sector('M', ['1 Kanal', '2 Kanal'], 'North-eastern side close to Barki Road connections', ['Large residential plots', 'Barki Road context', 'Internal boulevard links'], 'Sector M is often compared for Barki Road-side access and larger plot options. Verify every location and demand directly before relying on an advertisement.'),
  sector('N', ['1 Kanal'], 'Northern side of Phase 6 near Barki Road', ['Residential plots', 'Northern access', 'Public market inventory'], 'Sector N has active public listing inventory. Treat advertised prices as asking snapshots and check live availability, ownership and dues.'),
  {
    name: 'CCA 1', slug: 'cca-1', category: 'commercial', status: 'developed', possessionPercentage: 0,
    plotTypes: ['Commercial'], plotSizes: ['4 Marla Commercial', '8 Marla Commercial'],
    features: ['Retail and office context', 'Commercial plots', 'Internal phase access'],
    locationHighlight: 'Commercial area serving nearby Phase 6 sectors',
    description: 'CCA 1 is a commercial destination within Phase 6. Commercial due diligence should cover frontage, parking, permitted use, building controls, dues and transfer requirements.',
  },
  {
    name: 'CCA 2', slug: 'cca-2', category: 'commercial', status: 'developed', possessionPercentage: 0,
    plotTypes: ['Commercial'], plotSizes: ['4 Marla Commercial', '8 Marla Commercial'],
    features: ['Commercial plots', 'Retail context', 'Access from eastern sectors'],
    locationHighlight: 'Commercial area in the eastern half of Phase 6',
    description: 'CCA 2 appears frequently in commercial property searches. Compare exact plot position, road width and development controls rather than relying on a phase-wide average.',
  },
  {
    name: 'CCA Commercial Area',
    slug: 'cca',
    category: 'commercial',
    status: 'developed',
    possessionPercentage: 0,
    plotTypes: ['Commercial'],
    plotSizes: ['4 Marla Commercial', '8 Marla Commercial'],
    features: ['Central Broadway retail', 'Corporate offices', 'Banks and dining', 'CCA 1 & CCA 2 hub'],
    locationHighlight: 'Prime commercial heart of DHA Phase 6 Lahore',
    description: 'CCA Commercial Area serves as the central commercial hub for DHA Phase 6 Lahore, bringing together major bank branches, 24/7 pharmacies, retail outlets, and multi-storey commercial plazas across CCA 1 and CCA 2.',
  },
  {
    name: 'Main Boulevard Commercial',
    slug: 'main-boulevard-commercial',
    category: 'commercial',
    status: 'developed',
    possessionPercentage: 0,
    plotTypes: ['Commercial'],
    plotSizes: ['4 Marla Commercial', '8 Marla Commercial'],
    features: ['Dolmen Mall Lahore', 'DHA Head Office', 'Carrefour Hypermarket', 'High-traffic boulevard access'],
    locationHighlight: 'Major arterial commercial boulevard of DHA Phase 6',
    description: 'Main Boulevard Commercial represents the primary commercial corridor of DHA Phase 6 Lahore, housing landmark institutions including the DHA Lahore Head Office, Dolmen Mall, international brand showrooms, and fuel stations.',
  },
  {
    name: 'Raya Commercial',
    slug: 'raya-commercial',
    category: 'commercial',
    status: 'developed',
    possessionPercentage: 0,
    plotTypes: ['Commercial'],
    plotSizes: ['4 Marla Commercial', '8 Marla Commercial'],
    features: ['Fairways promenade', 'Upscale cafes and fine dining', 'Boutique shopping', 'Golf view plazas'],
    locationHighlight: 'Exclusive lifestyle commercial strip adjoining Defence Raya',
    description: 'Raya Commercial (Fairways Commercial) is a boutique lifestyle and retail destination in DHA Phase 6, known for specialty cafes, designer salons, corporate suites, and tranquil views over the 18-hole golf course.',
  },
  {
    name: 'Defence Raya',
    slug: 'defence-raya',
    category: 'commercial',
    status: 'developed',
    possessionPercentage: 0,
    plotTypes: ['Commercial', 'Residential'],
    plotSizes: ['1 Kanal Golf Villas', '2 Kanal Golf Villas', 'Commercial Suites'],
    features: ['18-hole championship golf course', 'Country club resort', 'Wellness spa & pool', 'Grand banquet facilities'],
    locationHighlight: 'World-class golf and country club community in Sector N / Barki link',
    description: 'Defence Raya Golf & Country Club is an internationally acclaimed resort community in DHA Phase 6 Lahore featuring an 18-hole golf course, clubhouse, athletic facilities, gourmet restaurants, and luxury fairways residences.',
  },
];

export const PLOT_TYPES = ['Residential Plots', 'Commercial Plots', 'Houses'] as const;
export const PLOT_SIZES = ['5 Marla', '8 Marla', '10 Marla', '1 Kanal', '2 Kanal', '4 Marla Commercial', '8 Marla Commercial'] as const;

export type PlotType = (typeof PLOT_TYPES)[number];
export type PlotSize = (typeof PLOT_SIZES)[number];
