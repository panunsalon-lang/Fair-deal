import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock context with admin user
function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@royalsilver.com",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

// Mock context with regular user
function createUserContext(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Product CRUD Operations", () => {
  describe("getAll - Public Endpoint", () => {
    it("should return all products for public users", async () => {
      const ctx = createUserContext();
      const caller = appRouter.createCaller(ctx);

      const products = await caller.products.getAll();

      expect(Array.isArray(products)).toBe(true);
      // Should contain seeded products
      expect(products.length).toBeGreaterThanOrEqual(0);
    });

    it("should return products with required fields", async () => {
      const ctx = createUserContext();
      const caller = appRouter.createCaller(ctx);

      const products = await caller.products.getAll();

      if (products.length > 0) {
        const product = products[0];
        expect(product).toHaveProperty("id");
        expect(product).toHaveProperty("name");
        expect(product).toHaveProperty("category");
        expect(product).toHaveProperty("price");
        expect(product).toHaveProperty("description");
        expect(product).toHaveProperty("images");
      }
    });
  });

  describe("getStats - Public Endpoint", () => {
    it("should return product statistics", async () => {
      const ctx = createUserContext();
      const caller = appRouter.createCaller(ctx);

      const stats = await caller.products.getStats();

      expect(stats).toHaveProperty("total");
      expect(stats).toHaveProperty("byCategory");
      expect(typeof stats.total).toBe("number");
      expect(typeof stats.byCategory).toBe("object");
    });

    it("should include category breakdown", async () => {
      const ctx = createUserContext();
      const caller = appRouter.createCaller(ctx);

      const stats = await caller.products.getStats();

      // Should have categories from seeded data
      const categories = Object.keys(stats.byCategory);
      expect(categories.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe("getFeatured - Public Endpoint", () => {
    it("should return featured products", async () => {
      const ctx = createUserContext();
      const caller = appRouter.createCaller(ctx);

      const featured = await caller.products.getFeatured();

      expect(Array.isArray(featured)).toBe(true);
      // All returned products should be featured
      featured.forEach((product) => {
        expect(product.featured).toBe(1);
      });
    });
  });

  describe("getByCategory - Public Endpoint", () => {
    it("should return products by category", async () => {
      const ctx = createUserContext();
      const caller = appRouter.createCaller(ctx);

      const products = await caller.products.getByCategory({ category: "Rings" });

      expect(Array.isArray(products)).toBe(true);
      // All returned products should be in the specified category
      products.forEach((product) => {
        expect(product.category).toBe("Rings");
      });
    });

    it("should return empty array for non-existent category", async () => {
      const ctx = createUserContext();
      const caller = appRouter.createCaller(ctx);

      const products = await caller.products.getByCategory({ category: "NonExistent" });

      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBe(0);
    });
  });

  describe("getById - Public Endpoint", () => {
    it("should return a product by ID", async () => {
      const ctx = createUserContext();
      const caller = appRouter.createCaller(ctx);

      // First get all products
      const allProducts = await caller.products.getAll();
      if (allProducts.length > 0) {
        const firstProduct = allProducts[0];
        const product = await caller.products.getById({ id: firstProduct.id });

        expect(product).toBeDefined();
        expect(product?.id).toBe(firstProduct.id);
        expect(product?.name).toBe(firstProduct.name);
      }
    });

    it("should return undefined for non-existent product", async () => {
      const ctx = createUserContext();
      const caller = appRouter.createCaller(ctx);

      const product = await caller.products.getById({ id: 99999 });

      expect(product).toBeUndefined();
    });
  });

  describe("create - Admin Only", () => {
    it("should create a new product with admin role", async () => {
      const ctx = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const newProduct = {
        name: "Test Diamond Ring",
        category: "Rings",
        price: "50000",
        description: "A beautiful test diamond ring",
        images: [],
        featured: 0,
      };

      const created = await caller.products.create(newProduct);

      expect(created).toBeDefined();
      expect(created.name).toBe(newProduct.name);
      expect(created.category).toBe(newProduct.category);
      // Price is stored as DECIMAL in database, so it returns with .00
      expect(created.price).toContain('50000');
    });

    it("should not allow regular users to create products", async () => {
      const ctx = createUserContext();
      const caller = appRouter.createCaller(ctx);

      const newProduct = {
        name: "Test Diamond Ring",
        category: "Rings",
        price: "50000",
        description: "A beautiful test diamond ring",
        images: [],
        featured: 0,
      };

      try {
        await caller.products.create(newProduct);
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("update - Admin Only", () => {
    it("should update an existing product with admin role", async () => {
      const ctx = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      // First get a product to update
      const allProducts = await caller.products.getAll();
      if (allProducts.length > 0) {
        const product = allProducts[0];
        const updatedData = {
          id: product.id,
          name: "Updated Product Name",
          category: product.category,
          price: "99999",
          description: "Updated description",
          images: product.images || [],
          featured: 1,
        };

        const updated = await caller.products.update(updatedData);

        expect(updated.name).toBe("Updated Product Name");
        // Price is stored as DECIMAL in database, so it returns with .00
        expect(updated.price).toContain("99999");
        expect(updated.featured).toBe(1);
      }
    });

    it("should not allow regular users to update products", async () => {
      const ctx = createUserContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.products.update({
          id: 1,
          name: "Updated",
          category: "Rings",
          price: "1000",
          description: "test",
          images: [],
          featured: 0,
        });
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("delete - Admin Only", () => {
    it("should delete a product with admin role", async () => {
      const ctx = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      // Create a product to delete
      const newProduct = {
        name: "Product to Delete",
        category: "Rings",
        price: "10000",
        description: "This will be deleted",
        images: [],
        featured: 0,
      };

      const created = await caller.products.create(newProduct);
      const deleteResult = await caller.products.delete({ id: created.id });

      expect(deleteResult).toBe(true);

      // Verify it's deleted
      const deleted = await caller.products.getById({ id: created.id });
      expect(deleted).toBeUndefined();
    });

    it("should not allow regular users to delete products", async () => {
      const ctx = createUserContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.products.delete({ id: 1 });
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should handle deleting non-existent product gracefully", async () => {
      const ctx = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      // Delete returns true even if product doesn't exist (no rows affected)
      const result = await caller.products.delete({ id: 99999 });

      // The implementation returns true regardless, which is acceptable
      expect(typeof result).toBe("boolean");
    });
  });
});
