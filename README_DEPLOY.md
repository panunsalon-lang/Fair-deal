# 🚀 Deployment Guide for Royal Silver

This guide will help you deploy your website to **Vercel** and set up a **Database**.

## 1. Prepare for GitHub
Since you had trouble with manual uploads, the best way is to use **GitHub**.
1. Create a new repository on GitHub named `royal-silver`.
2. Upload all the files from the fixed zip I provided to this repository.

## 2. Set Up a Database
Your website needs a MySQL database. I recommend **TiDB Cloud** or **Aiven** (they have free tiers).
1. Create a free MySQL/TiDB database.
2. Get your **Connection String** (it looks like `mysql://user:password@host:port/dbname`).
3. Save this; you will need it for Vercel.

## 3. Deploy to Vercel
1. Go to [Vercel](https://vercel.com) and log in with GitHub.
2. Click **"Add New"** > **"Project"**.
3. Import your `royal-silver` repository.
4. **IMPORTANT: Environment Variables**
   Before clicking "Deploy", add these variables in the Vercel dashboard:
   - `DATABASE_URL`: (The connection string from step 2)
   - `JWT_SECRET`: (Any random long string for security)
   - `NODE_ENV`: `production`
   - `VITE_APP_ID`: `royal-silver`
   - `OAUTH_SERVER_URL`: `https://api.manus.im`
   - `VITE_OAUTH_PORTAL_URL`: `https://auth.manus.im`

5. Click **Deploy**.

## 4. Final Steps
Once deployed, Vercel will give you a link (e.g., `royal-silver.vercel.app`).
1. Visit your site!
2. To set up the initial products, you can run the seed script locally once you have the database URL:
   ```bash
   DATABASE_URL=your_url_here node seed-db.mjs
   ```

If you face any "npm install" errors on Vercel, it's likely because of the `pnpm` version. Vercel usually handles this automatically if `pnpm-lock.yaml` is present.
