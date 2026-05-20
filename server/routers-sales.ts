// Sales/Promotions Router - Add this to appRouter in server/routers.ts
import { router, protectedProcedure, publicProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as db from "./db";

export const salesRouter = router({
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
      applicableProducts: z.array(z.number()).default([]),
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
});
