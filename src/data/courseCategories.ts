// Shared driving course categories, subclasses, and fee structure

export interface SubClass {
  code: string;
  name: string;
  description: string;
  fee: number;
  duration: string;
  minAge: number;
  prerequisites: string;
}

export interface Category {
  code: string;
  name: string;
  description: string;
  subclasses: SubClass[];
  imageUrl: string;
}

export const DRIVING_CATEGORIES: Category[] = [
{
  code: 'A',
  name: 'Category A — Motorcycles',
  description: 'Training for two and three-wheeled motor vehicles.',
  imageUrl:
  'https://res.cloudinary.com/dgfmhyebp/image/upload/v1774093199/Bike_wallpaper_qbsflx.jpg',
  subclasses: [
  {
    code: 'A1',
    name: 'Light Motorcycle',
    description: 'Motorcycles up to 125cc engine capacity',
    fee: 10000,
    duration: '4 weeks',
    minAge: 18,
    prerequisites: 'ID/Passport'
  },
  {
    code: 'A2',
    name: 'Motorcycle Courier',
    description: 'Motorcycles for courier and delivery services',
    fee: 12000,
    duration: '5 weeks',
    minAge: 18,
    prerequisites: 'ID/Passport'
  },
  {
    code: 'A3',
    name: 'Tuktuk',
    description: 'Three-wheeled motor vehicles (Tuktuks)',
    fee: 10000,
    duration: '3-4 weeks',
    minAge: 18,
    prerequisites: 'ID/Passport'
  }]

},
{
  code: 'B',
  name: 'Category B — Light Vehicles',
  description: 'Training for cars and light motor vehicles.',
  imageUrl:
  'https://res.cloudinary.com/dgfmhyebp/image/upload/v1760686048/WhatsApp_Image_2025-10-16_at_3.02.26_PM_1_hiduui.jpg',
  subclasses: [
  {
    code: 'B1',
    name: 'Light Vehicle Automatic',
    description: 'Automatic transmission cars up to 3,500 kg',
    fee: 16000,
    duration: '6-8 weeks',
    minAge: 18,
    prerequisites: 'ID/Passport'
  },
  {
    code: 'B2',
    name: 'Light Vehicle Manual',
    description: 'Manual transmission cars up to 3,500 kg',
    fee: 16000,
    duration: '6-8 weeks',
    minAge: 18,
    prerequisites: 'ID/Passport'
  },
  {
    code: 'B3',
    name: 'Professional Qualification',
    description:
    'For taxis, Uber drivers and permits to apply for PSV badges',
    fee: 20000,
    duration: '8-10 weeks',
    minAge: 21,
    prerequisites: 'Valid B1 or B2 license'
  }]

},
{
  code: 'C',
  name: 'Category C — Commercial Vehicles',
  description: 'Training for commercial goods-carrying vehicles.',
  imageUrl:
  'https://res.cloudinary.com/dgfmhyebp/image/upload/v1774030978/WhatsApp_Image_2026-03-20_at_08.39.19_z9m7rt.jpg',
  subclasses: [
  {
    code: 'C',
    name: 'Light Commercial',
    description: 'Light commercial vehicles (3,500 – 7,500 kg)',
    fee: 19000,
    duration: '8 weeks',
    minAge: 21,
    prerequisites: 'Category B license'
  },
  {
    code: 'C1',
    name: 'Medium Commercial',
    description: 'Medium commercial vehicles (7,500 – 16,000 kg)',
    fee: 22000,
    duration: '10 weeks',
    minAge: 21,
    prerequisites: 'Category B license'
  },
  {
    code: 'CE',
    name: 'Heavy Commercial',
    description: 'Heavy commercial vehicles and trailers (16,000+ kg)',
    fee: 26000,
    duration: '12 weeks',
    minAge: 21,
    prerequisites: 'Category C license'
  }]

},
{
  code: 'D',
  name: 'Category D — Passenger Vehicles',
  description: 'Training for buses, matatus and passenger service vehicles.',
  imageUrl:
  'https://res.cloudinary.com/dgfmhyebp/image/upload/v1774030978/WhatsApp_Image_2026-03-20_at_08.39.18_ovmxvo.jpg',
  subclasses: [
  {
    code: 'D1',
    name: 'Light Bus',
    description: 'Passenger vehicles carrying 9-16 passengers',
    fee: 24000,
    duration: '10 weeks',
    minAge: 24,
    prerequisites: 'Category B license'
  },
  {
    code: 'D2',
    name: 'Medium Bus',
    description: 'Passenger vehicles carrying 17-30 passengers',
    fee: 28000,
    duration: '12 weeks',
    minAge: 24,
    prerequisites: 'Category D1 license'
  },
  {
    code: 'D3',
    name: 'Heavy Bus',
    description: 'Passenger vehicles carrying 30+ passengers',
    fee: 32000,
    duration: '14 weeks',
    minAge: 24,
    prerequisites: 'Category D2 license'
  }]

},
{
  code: 'E',
  name: 'Category E — Articulated Vehicles',
  description: 'Training for articulated and combination vehicles.',
  imageUrl:
  'https://res.cloudinary.com/dgfmhyebp/image/upload/v1760686048/WhatsApp_Image_2025-10-16_at_3.02.27_PM_jgs1gx.jpg',
  subclasses: [
  {
    code: 'E',
    name: 'Articulated Vehicles',
    description: 'Articulated lorries and combination vehicles',
    fee: 35000,
    duration: '14-16 weeks',
    minAge: 24,
    prerequisites: 'Category C or D license'
  }]

},
{
  code: 'F',
  name: 'Category F — Special Vehicles',
  description: 'Training for special-purpose motor vehicles.',
  imageUrl:
  'https://images.unsplash.com/photo-1580901368919-7738efb0f228?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  subclasses: [
  {
    code: 'F',
    name: 'Special Vehicles',
    description:
    'Construction, military, and other special-purpose vehicles',
    fee: 18000,
    duration: '6-8 weeks',
    minAge: 21,
    prerequisites: 'Category B license'
  }]

},
{
  code: 'G',
  name: 'Category G — Farm Tractors',
  description: 'Training for agricultural tractors and farm machinery.',
  imageUrl:
  'https://res.cloudinary.com/dgfmhyebp/image/upload/v1774030978/WhatsApp_Image_2026-03-20_at_08.39.20_cmktex.jpg',
  subclasses: [
  {
    code: 'G1',
    name: 'Farm Tractor (Basic)',
    description: 'Basic farm tractors without trailer',
    fee: 12000,
    duration: '4 weeks',
    minAge: 18,
    prerequisites: 'ID/Passport'
  },
  {
    code: 'G2',
    name: 'Farm Tractor + Trailer',
    description: 'Farm tractors with single trailer',
    fee: 14000,
    duration: '5 weeks',
    minAge: 18,
    prerequisites: 'ID/Passport'
  },
  {
    code: 'G3',
    name: 'Farm Tractor (Heavy)',
    description: 'Heavy farm tractors and multi-trailer',
    fee: 15000,
    duration: '5 weeks',
    minAge: 18,
    prerequisites: 'ID/Passport'
  },
  {
    code: 'G4',
    name: 'Combine Harvester',
    description: 'Combine harvesters and harvesting machinery',
    fee: 16000,
    duration: '6 weeks',
    minAge: 18,
    prerequisites: 'ID/Passport'
  },
  {
    code: 'G5',
    name: 'Sprayer Tractor',
    description: 'Agricultural sprayer tractors',
    fee: 14000,
    duration: '5 weeks',
    minAge: 18,
    prerequisites: 'ID/Passport'
  },
  {
    code: 'G6',
    name: 'Ploughing Tractor',
    description: 'Ploughing and tilling tractors',
    fee: 13000,
    duration: '4 weeks',
    minAge: 18,
    prerequisites: 'ID/Passport'
  },
  {
    code: 'G7',
    name: 'Seeding Tractor',
    description: 'Seeding and planting machinery',
    fee: 13000,
    duration: '4 weeks',
    minAge: 18,
    prerequisites: 'ID/Passport'
  },
  {
    code: 'G8',
    name: 'Irrigation Tractor',
    description: 'Irrigation and water pump tractors',
    fee: 14000,
    duration: '5 weeks',
    minAge: 18,
    prerequisites: 'ID/Passport'
  },
  {
    code: 'G9',
    name: 'Loader Tractor',
    description: 'Front-end loader tractors',
    fee: 15000,
    duration: '5 weeks',
    minAge: 18,
    prerequisites: 'ID/Passport'
  },
  {
    code: 'G10',
    name: 'Backhoe Tractor',
    description: 'Backhoe and excavator tractors',
    fee: 16000,
    duration: '6 weeks',
    minAge: 18,
    prerequisites: 'ID/Passport'
  },
  {
    code: 'G11',
    name: 'Forklift Tractor',
    description: 'Agricultural forklift tractors',
    fee: 14000,
    duration: '5 weeks',
    minAge: 18,
    prerequisites: 'ID/Passport'
  },
  {
    code: 'G12',
    name: 'Multi-Purpose Tractor',
    description: 'Multi-purpose farm tractors',
    fee: 15000,
    duration: '5 weeks',
    minAge: 18,
    prerequisites: 'ID/Passport'
  }]

}];


// Helper to get all subclasses as a flat list
export function getAllSubclasses(): (SubClass & {
  categoryCode: string;
  categoryName: string;
})[] {
  return DRIVING_CATEGORIES.flatMap((cat) =>
  cat.subclasses.map((sub) => ({
    ...sub,
    categoryCode: cat.code,
    categoryName: cat.name
  }))
  );
}

// Helper to get fee by subclass code
export function getFeeByCode(code: string): number {
  for (const cat of DRIVING_CATEGORIES) {
    const sub = cat.subclasses.find((s) => s.code === code);
    if (sub) return sub.fee;
  }
  return 15000; // fallback
}

// Helper to get subclass label
export function getSubclassLabel(code: string): string {
  for (const cat of DRIVING_CATEGORIES) {
    const sub = cat.subclasses.find((s) => s.code === code);
    if (sub) return `${sub.code} — ${sub.name}`;
  }
  return code;
}

// Registration fee constant
export const REGISTRATION_FEE = 1500;