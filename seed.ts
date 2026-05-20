import { drizzle } from "drizzle-orm/mysql2";
import { products } from "./drizzle/schema";
import { getDb } from "./server/db";

const sampleProducts = [
  {
    name: "Diamond Engagement Ring",
    category: "Rings",
    price: "45000",
    description: "A stunning diamond engagement ring with a classic solitaire design, perfect for proposing to your loved one.",
    images: [],
    featured: 1,
  },
  {
    name: "Couple Bands - Silver",
    category: "Couple Bands",
    price: "12000",
    description: "Elegant matching couple bands in pure silver, symbolizing eternal love and commitment.",
    images: [],
    featured: 1,
  },
  {
    name: "Royal Silver Signature Ring",
    category: "Royal Silver",
    price: "28000",
    description: "Our signature collection ring featuring intricate silver work and premium craftsmanship.",
    images: [],
    featured: 1,
  },
  {
    name: "Pearl Pendant Ring",
    category: "Rings",
    price: "18000",
    description: "Elegant ring featuring a lustrous pearl set in silver with delicate filigree work.",
    images: [],
    featured: 0,
  },
  {
    name: "Couple Bands - Gold Plated",
    category: "Couple Bands",
    price: "15000",
    description: "Beautiful couple bands with gold plating over silver, combining elegance with durability.",
    images: [],
    featured: 0,
  },
  {
    name: "Royal Silver Heritage Collection",
    category: "Royal Silver",
    price: "35000",
    description: "Part of our heritage collection, featuring traditional designs with modern aesthetics.",
    images: [],
    featured: 0,
  },
];

async function seed() {
  try {
    console.log("🌱 Starting database seed...");
    
    const db = await getDb();
    if (!db) {
      throw new Error("Database connection failed");
    }
    
    for (const product of sampleProducts) {
      await db.insert(products).values(product);
      console.log(`✓ Added: ${product.name}`);
    }
    
    console.log("✅ Database seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
