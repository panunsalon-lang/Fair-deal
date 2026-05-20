import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as db from "./db";
import bcrypt from "bcryptjs";
import { sdk } from "./_core/sdk";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  products: router({
    getAll: publicProcedure.query(() => db.getAllProducts()),
    getByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(({ input }) => db.getProductsByCategory(input.category)),
    getFeatured: publicProcedure.query(() => db.getFeaturedProducts()),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getProductById(input.id)),
    getStats: publicProcedure.query(() => db.getProductStats()),
    
    // Search and filter
    search: publicProcedure
      .input(z.object({
        query: z.string().optional(),
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
        category: z.string().optional(),
      }))
      .query(({ input }) => db.searchProducts(input.query || "", input.minPrice, input.maxPrice, input.category)),
    
    create: protectedProcedure
      .input(z.object({
        name: z.string().min(1),
        category: z.string().min(1),
        price: z.string().min(1),
        description: z.string().optional(),
        images: z.array(z.string()).default([]),
        featured: z.number().default(0),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return db.createProduct({
          name: input.name,
          category: input.category,
          price: input.price,
          description: input.description,
          images: input.images,
          featured: input.featured,
        });
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        category: z.string().optional(),
        price: z.string().optional(),
        description: z.string().optional(),
        images: z.array(z.string()).optional(),
        featured: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        const { id, ...data } = input;
        return db.updateProduct(id, data);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return db.deleteProduct(input.id);
      }),
  }),

  sales: router({
    getAll: publicProcedure.query(() => db.getAllSales()),
    getActive: publicProcedure.query(() => db.getActiveSales()),
    getFeatured: publicProcedure.query(() => db.getFeaturedSales()),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getSaleById(input.id)),
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        thumbnail: z.string().optional(),
        discountType: z.enum(['percentage', 'fixed']),
        discountValue: z.string(),
        applicableProducts: z.array(z.number()).optional(),
        startDate: z.date(),
        endDate: z.date(),
        active: z.number().default(1),
        featured: z.number().default(0),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return db.createSale(input);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        thumbnail: z.string().optional(),
        discountType: z.enum(['percentage', 'fixed']).optional(),
        discountValue: z.string().optional(),
        applicableProducts: z.array(z.number()).optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        active: z.number().optional(),
        featured: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        const { id, ...data } = input;
        return db.updateSale(id, data);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return db.deleteSale(input.id);
      }),
  }),

  testimonials: router({
    getAll: publicProcedure.query(() => db.getAllTestimonials()),
    getApproved: publicProcedure.query(() => db.getApprovedTestimonials()),
    getFeatured: publicProcedure.query(() => db.getFeaturedTestimonials()),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getTestimonialById(input.id)),
    create: publicProcedure
      .input(z.object({
        customerName: z.string().min(1),
        customerImage: z.string().optional(),
        rating: z.number().min(1).max(5),
        testimonial: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        return db.createTestimonial({
          ...input,
          approved: 0,
          featured: 0,
        });
      }),
    approve: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return db.approveTestimonial(input.id);
      }),
    reject: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return db.rejectTestimonial(input.id);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        customerName: z.string().optional(),
        customerImage: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        testimonial: z.string().optional(),
        featured: z.number().optional(),
        approved: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        const { id, ...data } = input;
        return db.updateTestimonial(id, data);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return db.deleteTestimonial(input.id);
      }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        return db.subscribeNewsletter(input.email);
      }),
    unsubscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        return db.unsubscribeNewsletter(input.email);
      }),
    getSubscribers: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return db.getSubscribers();
    }),
  }),
  adminAuth: router({
    login: publicProcedure
      .input(z.object({
        username: z.string().min(1),
        password: z.string().min(1),
      }))
      .mutation(async ({ ctx, input }) => {
        const admin = await db.getAdminByUsername(input.username);
        if (!admin) {
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentials' });
        }
        
        const isPasswordValid = await bcrypt.compare(input.password, admin.passwordHash);
        if (!isPasswordValid) {
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentials' });
        }

        // Create or update the admin user in the users table to satisfy protectedProcedure
        const openId = `admin-${admin.id}`;
        await db.upsertUser({
          openId: openId,
          name: admin.username,
          email: admin.email,
          role: 'admin',
          loginMethod: 'simple',
        });

        // Set session cookie
        const token = await sdk.createSessionToken(openId, {
          name: admin.username,
        });

        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, token, cookieOptions);

        return {
          id: admin.id,
          username: admin.username,
          email: admin.email,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
