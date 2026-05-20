import { eq, desc, and, like, gte, lte, or, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, products, InsertProduct, Product, reviews, InsertReview, Review, wishlists, InsertWishlist, Wishlist, inventory, InsertInventory, Inventory, orders, InsertOrder, Order, subscribers, InsertSubscriber, Subscriber, sales, InsertSale, Sale, testimonials, InsertTestimonial, Testimonial, adminCredentials, InsertAdminCredential, AdminCredential } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const url = process.env.DATABASE_URL;
      const hasQuery = url.includes('?');
      const sslConfig = 'ssl={"rejectUnauthorized":false}';
      const connectionString = hasQuery ? `${url}&${sslConfig}` : `${url}?${sslConfig}`;
      _db = drizzle(connectionString);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Product queries
export async function getAllProducts(): Promise<Product[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).orderBy(desc(products.createdAt));
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).where(eq(products.category, category)).orderBy(desc(products.createdAt));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).where(eq(products.featured, 1)).orderBy(desc(products.createdAt)).limit(6);
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createProduct(data: InsertProduct): Promise<Product | null> {
  const db = await getDb();
  if (!db) return null;
  await db.insert(products).values(data);
  const result = await db.select().from(products).orderBy(desc(products.createdAt)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product | null> {
  const db = await getDb();
  if (!db) return null;
  await db.update(products).set(data).where(eq(products.id, id));
  const result = await getProductById(id);
  return result || null;
}

export async function deleteProduct(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  await db.delete(products).where(eq(products.id, id));
  return true;
}

export async function getProductStats() {
  const db = await getDb();
  if (!db) return { total: 0, byCategory: {} };
  
  const allProducts = await db.select().from(products);
  const byCategory: Record<string, number> = {};
  
  allProducts.forEach(p => {
    byCategory[p.category] = (byCategory[p.category] || 0) + 1;
  });
  
  return {
    total: allProducts.length,
    byCategory,
  };
}

// Search and filter products
export async function searchProducts(query: string, minPrice?: number, maxPrice?: number, category?: string): Promise<Product[]> {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = [];
  
  if (query) {
    conditions.push(
      or(
        like(products.name, `%${query}%`),
        like(products.description, `%${query}%`)
      )
    );
  }
  
  if (minPrice !== undefined) {
    conditions.push(gte(products.price, minPrice.toString()));
  }
  
  if (maxPrice !== undefined) {
    conditions.push(lte(products.price, maxPrice.toString()));
  }
  
  if (category) {
    conditions.push(eq(products.category, category));
  }
  
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
  return db.select().from(products).where(whereClause).orderBy(desc(products.createdAt));
}

// Review queries
export async function getProductReviews(productId: number): Promise<Review[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reviews).where(and(eq(reviews.productId, productId), eq(reviews.approved, 1))).orderBy(desc(reviews.createdAt));
}

export async function createReview(data: InsertReview): Promise<Review | null> {
  const db = await getDb();
  if (!db) return null;
  await db.insert(reviews).values(data);
  const result = await db.select().from(reviews).orderBy(desc(reviews.createdAt)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getAverageRating(productId: number): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select().from(reviews).where(and(eq(reviews.productId, productId), eq(reviews.approved, 1)));
  if (result.length === 0) return 0;
  const sum = result.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / result.length) * 10) / 10;
}

// Wishlist queries
export async function getUserWishlist(userId: number): Promise<Product[]> {
  const db = await getDb();
  if (!db) return [];
  const wishlistItems = await db.select().from(wishlists).where(eq(wishlists.userId, userId));
  const productIds = wishlistItems.map(w => w.productId);
  if (productIds.length === 0) return [];
  return db.select().from(products).where(inArray(products.id, productIds));
}

export async function addToWishlist(userId: number, productId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.insert(wishlists).values({ userId, productId });
    return true;
  } catch {
    return false;
  }
}

export async function removeFromWishlist(userId: number, productId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  await db.delete(wishlists).where(and(eq(wishlists.userId, userId), eq(wishlists.productId, productId)));
  return true;
}

export async function isInWishlist(userId: number, productId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select().from(wishlists).where(and(eq(wishlists.userId, userId), eq(wishlists.productId, productId))).limit(1);
  return result.length > 0;
}

// Inventory queries
export async function getInventory(productId: number): Promise<Inventory | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(inventory).where(eq(inventory.productId, productId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateInventory(productId: number, quantity: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const existing = await getInventory(productId);
  if (existing) {
    await db.update(inventory).set({ quantity }).where(eq(inventory.productId, productId));
  } else {
    await db.insert(inventory).values({ productId, quantity });
  }
  return true;
}

// Order queries
export async function createOrder(data: InsertOrder): Promise<Order | null> {
  const db = await getDb();
  if (!db) return null;
  await db.insert(orders).values(data);
  const result = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getUserOrders(userId: number): Promise<Order[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
}

export async function updateOrderStatus(orderId: number, status: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  await db.update(orders).set({ status: status as any }).where(eq(orders.id, orderId));
  return true;
}

// Newsletter queries
export async function subscribeNewsletter(email: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  try {
    await db.insert(subscribers).values({ email }).onDuplicateKeyUpdate({
      set: { subscribed: 1, unsubscribedAt: null },
    });
    return true;
  } catch {
    return false;
  }
}

export async function unsubscribeNewsletter(email: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  await db.update(subscribers).set({ subscribed: 0, unsubscribedAt: new Date() }).where(eq(subscribers.email, email));
  return true;
}

export async function getSubscribers(): Promise<Subscriber[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(subscribers).where(eq(subscribers.subscribed, 1));
}


export async function getAllReviews(): Promise<Review[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reviews).orderBy(desc(reviews.createdAt));
}

export async function approveReview(reviewId: number): Promise<Review | null> {
  const db = await getDb();
  if (!db) return null;
  await db.update(reviews).set({ approved: 1 }).where(eq(reviews.id, reviewId));
  const result = await db.select().from(reviews).where(eq(reviews.id, reviewId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function rejectReview(reviewId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  await db.delete(reviews).where(eq(reviews.id, reviewId));
  return true;
}


// Sales/Promotions functions
export async function createSale(sale: InsertSale): Promise<Sale | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(sales).values(sale);
  if (result[0].insertId) {
    const created = await db.select().from(sales).where(eq(sales.id, result[0].insertId as number)).limit(1);
    return created.length > 0 ? created[0] : null;
  }
  return null;
}

export async function getSaleById(id: number): Promise<Sale | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(sales).where(eq(sales.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getAllSales(): Promise<Sale[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(sales).orderBy(desc(sales.createdAt));
}

export async function getActiveSales(): Promise<Sale[]> {
  const db = await getDb();
  if (!db) return [];
  const now = new Date();
  return db.select().from(sales).where(
    and(
      eq(sales.active, 1),
      lte(sales.startDate, now),
      gte(sales.endDate, now)
    )
  ).orderBy(desc(sales.featured), desc(sales.createdAt));
}

export async function getFeaturedSales(): Promise<Sale[]> {
  const db = await getDb();
  if (!db) return [];
  const now = new Date();
  return db.select().from(sales).where(
    and(
      eq(sales.active, 1),
      eq(sales.featured, 1),
      lte(sales.startDate, now),
      gte(sales.endDate, now)
    )
  ).limit(5);
}

export async function updateSale(id: number, updates: Partial<InsertSale>): Promise<Sale | null> {
  const db = await getDb();
  if (!db) return null;
  await db.update(sales).set(updates).where(eq(sales.id, id));
  return getSaleById(id);
}

export async function deleteSale(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  await db.delete(sales).where(eq(sales.id, id));
  return true;
}


// ============ TESTIMONIALS FUNCTIONS ============

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
}

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).where(eq(testimonials.approved, 1)).orderBy(desc(testimonials.createdAt));
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).where(and(eq(testimonials.featured, 1), eq(testimonials.approved, 1))).orderBy(desc(testimonials.createdAt)).limit(5);
}

export async function getTestimonialById(id: number): Promise<Testimonial | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createTestimonial(data: InsertTestimonial): Promise<Testimonial | null> {
  const db = await getDb();
  if (!db) return null;
  await db.insert(testimonials).values(data);
  const result = await db.select().from(testimonials).orderBy(desc(testimonials.id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateTestimonial(id: number, updates: Partial<InsertTestimonial>): Promise<Testimonial | null> {
  const db = await getDb();
  if (!db) return null;
  await db.update(testimonials).set(updates).where(eq(testimonials.id, id));
  return getTestimonialById(id);
}

export async function deleteTestimonial(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  await db.delete(testimonials).where(eq(testimonials.id, id));
  return true;
}

export async function approveTestimonial(id: number): Promise<Testimonial | null> {
  const db = await getDb();
  if (!db) return null;
  await db.update(testimonials).set({ approved: 1 }).where(eq(testimonials.id, id));
  return getTestimonialById(id);
}

export async function rejectTestimonial(id: number): Promise<Testimonial | null> {
  const db = await getDb();
  if (!db) return null;
  await db.update(testimonials).set({ approved: 0 }).where(eq(testimonials.id, id));
  return getTestimonialById(id);
}

// ============ ADMIN CREDENTIALS FUNCTIONS ============

export async function getAdminByUsername(username: string): Promise<AdminCredential | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(adminCredentials).where(eq(adminCredentials.username, username)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createAdminCredential(data: InsertAdminCredential): Promise<AdminCredential | null> {
  const db = await getDb();
  if (!db) return null;
  await db.insert(adminCredentials).values(data);
  const result = await db.select().from(adminCredentials).orderBy(desc(adminCredentials.id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateAdminCredential(id: number, updates: Partial<InsertAdminCredential>): Promise<AdminCredential | null> {
  const db = await getDb();
  if (!db) return null;
  await db.update(adminCredentials).set(updates).where(eq(adminCredentials.id, id));
  const result = await db.select().from(adminCredentials).where(eq(adminCredentials.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getAllAdminCredentials(): Promise<AdminCredential[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(adminCredentials).orderBy(desc(adminCredentials.createdAt));
}
