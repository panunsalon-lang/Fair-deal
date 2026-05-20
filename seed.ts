import { products } from "./drizzle/schema";
import { getDb } from "./server/db";

const sampleProducts = [
  // Food Section
  {
    name: "Organic Honey",
    category: "Food",
    price: "450",
    description: "Pure, organic honey sourced from the finest beehives. Rich in antioxidants and natural sweetness.",
    images: ["https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800"],
    featured: 1,
  },
  {
    name: "Premium Basmati Rice",
    category: "Food",
    price: "1200",
    description: "Long-grain, aromatic Basmati rice, aged to perfection for the best culinary experience.",
    images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800"],
    featured: 1,
  },
  // Clothes Section
  {
    name: "Cotton Summer Dress",
    category: "Clothes",
    price: "2500",
    description: "Lightweight and breathable cotton dress, perfect for warm summer days. Available in various sizes.",
    images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800"],
    featured: 1,
  },
  {
    name: "Classic Denim Jacket",
    category: "Clothes",
    price: "3800",
    description: "Timeless denim jacket with a modern fit. Durable and stylish for any casual occasion.",
    images: ["https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&q=80&w=800"],
    featured: 0,
  },
  // Cosmetics Section
  {
    name: "Hydrating Face Serum",
    category: "Cosmetics",
    price: "1500",
    description: "Advanced hydrating serum with hyaluronic acid for a glowing and youthful complexion.",
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800"],
    featured: 1,
  },
  {
    name: "Matte Lipstick Set",
    category: "Cosmetics",
    price: "2200",
    description: "A set of long-lasting matte lipsticks in trending shades. Smudge-proof and highly pigmented.",
    images: ["https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&q=80&w=800"],
    featured: 0,
  },
  // Jewelry Section
  {
    name: "Diamond Engagement Ring",
    category: "Jewelry",
    price: "45000",
    description: "A stunning diamond engagement ring with a classic solitaire design, perfect for proposing to your loved one.",
    images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800"],
    featured: 1,
  },
  {
    name: "Silver Couple Bands",
    category: "Jewelry",
    price: "12000",
    description: "Elegant matching couple bands in pure silver, symbolizing eternal love and commitment.",
    images: ["https://images.unsplash.com/photo-1603912627214-901155445e99?auto=format&fit=crop&q=80&w=800"],
    featured: 1,
  },
];

async function seed() {
  try {
    console.log("🌱 Starting database seed...");
    
    const db = await getDb();
    if (!db) {
      throw new Error("Database connection failed. Please ensure DATABASE_URL is set.");
    }
    
    // Clear existing products first if needed, or just append
    console.log("Adding new products...");
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
