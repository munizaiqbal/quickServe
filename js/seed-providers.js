
import { createProvider } from "./firestore.js";

const providers = [
  {
    name: "SparkClean Karachi",
    category: "cleaning",
    subcategory: "home-cleaning",
    description:
      "Professional residential cleaning with flexible scheduling and trusted staff.",
    location: "Karachi",
    phone: "+92 302 3456789",
    rating: 4.9,
    reviewCount: 187,
    verified: true,
    available: true,
    image: "",
    gallery: [],
  },
  {
    name: "FreshSpace Cleaning",
    category: "cleaning",
    subcategory: "deep-cleaning",
    description:
      "Deep cleaning services for homes, offices and special occasions.",
    location: "Karachi",
    phone: "+92 303 4567890",
    rating: 4.7,
    reviewCount: 73,
    verified: true,
    available: true,
    image: "",
    gallery: [],
  },
  {
    name: "FixRight Plumbing",
    category: "plumbing",
    subcategory: "plumbing",
    description:
      "Fast and reliable plumbing services for homes, apartments and offices.",
    location: "Karachi",
    phone: "+92 301 2345678",
    rating: 4.8,
    reviewCount: 96,
    verified: true,
    available: true,
    image: "",
    gallery: [],
  },
  {
    name: "AquaFix Plumbing",
    category: "plumbing",
    subcategory: "pipe-repair",
    description:
      "Professional pipe repair, leak detection and plumbing maintenance.",
    location: "Karachi",
    phone: "+92 310 4567890",
    rating: 4.7,
    reviewCount: 81,
    verified: true,
    available: true,
    image: "",
    gallery: [],
  },
  {
    name: "Ali Electrical Services",
    category: "electrical",
    subcategory: "electrician",
    description:
      "Professional electrical installation, repair and maintenance services.",
    location: "Karachi",
    phone: "+92 300 1234567",
    rating: 4.9,
    reviewCount: 128,
    verified: true,
    available: true,
    image: "",
    gallery: [],
  },
  {
    name: "PowerFix Electric",
    category: "electrical",
    subcategory: "wiring",
    description:
      "Reliable electrical wiring, installation and troubleshooting services.",
    location: "Karachi",
    phone: "+92 301 7654321",
    rating: 4.8,
    reviewCount: 94,
    verified: true,
    available: true,
    image: "",
    gallery: [],
  },
  {
    name: "CoolTech Services",
    category: "ac-appliances",
    subcategory: "ac-repair",
    description:
      "AC installation, servicing, maintenance and cooling system repairs.",
    location: "Karachi",
    phone: "+92 311 2345678",
    rating: 4.9,
    reviewCount: 142,
    verified: true,
    available: true,
    image: "",
    gallery: [],
  },
  {
    name: "HomeAppliance Fix",
    category: "ac-appliances",
    subcategory: "appliance-repair",
    description:
      "Reliable repair and maintenance for common household appliances.",
    location: "Karachi",
    phone: "+92 312 3456789",
    rating: 4.7,
    reviewCount: 67,
    verified: true,
    available: true,
    image: "",
    gallery: [],
  },
  {
    name: "PerfectFinish Painters",
    category: "painting",
    subcategory: "interior-painting",
    description:
      "Professional interior painting with clean preparation and quality finishing.",
    location: "Karachi",
    phone: "+92 313 4567890",
    rating: 4.8,
    reviewCount: 102,
    verified: true,
    available: true,
    image: "",
    gallery: [],
  },
  {
    name: "ColorCraft Painters",
    category: "painting",
    subcategory: "exterior-painting",
    description:
      "Exterior and interior painting services for homes, offices and commercial spaces.",
    location: "Karachi",
    phone: "+92 314 5678901",
    rating: 4.7,
    reviewCount: 76,
    verified: true,
    available: true,
    image: "",
    gallery: [],
  },
  {
    name: "MoveMate Logistics",
    category: "moving",
    subcategory: "home-moving",
    description:
      "Reliable moving assistance for homes, apartments and offices.",
    location: "Karachi",
    phone: "+92 304 5678901",
    rating: 4.8,
    reviewCount: 88,
    verified: true,
    available: true,
    image: "",
    gallery: [],
  },
  {
    name: "QuickMove Express",
    category: "moving",
    subcategory: "furniture-moving",
    description:
      "Careful furniture transportation and moving assistance.",
    location: "Karachi",
    phone: "+92 305 6789012",
    rating: 4.6,
    reviewCount: 51,
    verified: true,
    available: true,
    image: "",
    gallery: [],
  },
  {
    name: "Glow Studio",
    category: "beauty",
    subcategory: "beauty",
    description:
      "Professional beauty and grooming services from experienced specialists.",
    location: "Karachi",
    phone: "+92 306 7890123",
    rating: 4.9,
    reviewCount: 211,
    verified: true,
    available: true,
    image: "",
    gallery: [],
  },
  {
    name: "Wellness by Sara",
    category: "beauty",
    subcategory: "wellness",
    description:
      "Personal wellness services designed around your schedule and needs.",
    location: "Karachi",
    phone: "+92 307 8901234",
    rating: 4.8,
    reviewCount: 64,
    verified: true,
    available: true,
    image: "",
    gallery: [],
  },
];

async function seedProviders() {
  console.log("Starting provider seed...");

  try {
    for (const provider of providers) {
      const id = await createProvider(provider);
      console.log(`Provider created: ${provider.name}`, id);
    }

    console.log("Provider seeding completed.");
  } catch (error) {
    console.error("PROVIDER SEED ERROR:", error);
  }
}

seedProviders();

