# Royal Silver - Quick Start Guide

Get up and running with Royal Silver jewelry e-commerce platform in minutes.

---

## 🚀 Installation

### 1. Clone and Install

```bash
# Navigate to project directory
cd /home/ubuntu/royal-silver

# Install dependencies
pnpm install
```

### 2. Environment Setup

Create `.env.local` file with required variables:

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/royal_silver

# OAuth
VITE_APP_ID=your_manus_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im

# JWT
JWT_SECRET=your_jwt_secret_key

# Owner Info
OWNER_OPEN_ID=your_owner_id
OWNER_NAME=Your Name

# Stripe (optional, for payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Storage
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your_api_key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=your_frontend_key

# Analytics (optional)
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_ANALYTICS_WEBSITE_ID=your_website_id
```

### 3. Database Setup

```bash
# Generate migrations
pnpm drizzle-kit generate

# Apply migrations
pnpm drizzle-kit migrate

# Seed sample data
npx tsx seed.ts
```

### 4. Start Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` in your browser.

---

## 📝 First Steps

### 1. View the Website

- **Home Page:** http://localhost:3000
- **Collections:** http://localhost:3000/collections
- **About:** http://localhost:3000/about
- **Contact:** http://localhost:3000/contact

### 2. Access Admin Dashboard

- **Admin Login:** http://localhost:3000/admin/login
- Click "Login with Manus OAuth"
- You'll be redirected to the admin dashboard

### 3. Add Your First Product

1. Go to `/admin/products`
2. Click "Add New Product"
3. Fill in details:
   - **Name:** "Diamond Ring"
   - **Category:** "Rings"
   - **Price:** "15000"
   - **Description:** "Beautiful diamond ring"
   - **Images:** Upload product images
4. Click "Create Product"

### 4. Manage Inventory

1. Go to `/admin/inventory`
2. Find your product
3. Update stock quantity
4. Save changes

### 5. Moderate Reviews

1. Go to `/admin/reviews`
2. View pending reviews
3. Click "Approve" or "Reject"

---

## 🧪 Testing

### Run Tests

```bash
pnpm test
```

### Manual Testing Checklist

**Public Features:**
- [ ] Search and filter products
- [ ] View product details and images
- [ ] Add products to wishlist
- [ ] Submit product reviews
- [ ] View order history
- [ ] Click WhatsApp button

**Admin Features:**
- [ ] Login with OAuth
- [ ] Add/edit/delete products
- [ ] Update inventory levels
- [ ] Approve/reject reviews
- [ ] View dashboard statistics

---

## 🎨 Customization

### Change Brand Name

Edit `client/src/components/Header.tsx`:
```tsx
<span className="text-2xl font-serif font-bold text-accent">
  Your Brand Name
</span>
```

### Change Colors

Edit `client/src/index.css`:
```css
@layer base {
  :root {
    --accent: #D4AF37;        /* Change gold color */
    --secondary: #C0C0C0;     /* Change silver color */
    /* ... other colors ... */
  }
}
```

### Change Contact Number

Search for `7006630873` and replace with your number in:
- `client/src/components/WhatsAppButton.tsx`
- `client/src/components/Header.tsx`
- `client/src/components/Footer.tsx`
- `client/src/pages/Contact.tsx`

### Add Social Media Links

Edit `client/src/components/Header.tsx` and `Footer.tsx`:
```tsx
<a href="https://instagram.com/yourprofile" target="_blank">
  <Instagram size={20} />
</a>
```

---

## 📦 Building for Production

### Build the Project

```bash
pnpm build
```

### Deploy to Manus

1. Open Management UI
2. Click "Publish" button
3. Configure custom domain
4. Enable SSL/TLS

### Configure Stripe (Optional)

1. Visit https://dashboard.stripe.com
2. Claim your test sandbox
3. Add API keys to Settings → Payment

---

## 🐛 Troubleshooting

### Database Connection Error

```
Error: Failed to connect to database
```

**Solution:**
- Check `DATABASE_URL` in `.env.local`
- Ensure MySQL/TiDB is running
- Verify credentials

### OAuth Login Not Working

```
Error: Invalid OAuth credentials
```

**Solution:**
- Check `VITE_APP_ID` is correct
- Verify `OAUTH_SERVER_URL` is set
- Clear browser cookies and try again

### Images Not Uploading

```
Error: Failed to upload image
```

**Solution:**
- Check file size (max 5MB)
- Verify file format (JPG, PNG, WebP)
- Check storage API keys

### Tests Failing

```
Error: Test failed
```

**Solution:**
- Run `pnpm test` to see detailed errors
- Check database is running
- Verify all migrations applied

---

## 📚 Documentation

- **[Complete Code Guide](./COMPLETE_CODE_GUIDE.md)** - Full architecture and implementation
- **[API Documentation](./API_DOCUMENTATION.md)** - Complete API reference
- **[Features Guide](./FEATURES_GUIDE.md)** - Feature overview
- **[Setup Guide](./SETUP_GUIDE.md)** - Detailed testing instructions
- **[Admin Credentials](./ADMIN_CREDENTIALS.md)** - Admin access info

---

## 🔗 Useful Links

- **Manus Dashboard:** https://dashboard.manus.im
- **Stripe Dashboard:** https://dashboard.stripe.com
- **tRPC Documentation:** https://trpc.io
- **Tailwind CSS:** https://tailwindcss.com
- **React Documentation:** https://react.dev

---

## 💡 Tips & Tricks

### Add More Products Quickly

Use the seed script as a template:
```bash
# Edit seed.ts with your products
# Run: npx tsx seed.ts
```

### Enable Debug Logging

```bash
# Set debug environment variable
DEBUG=* pnpm dev
```

### Reset Database

```bash
# Drop all tables and recreate
pnpm drizzle-kit drop
pnpm drizzle-kit migrate
```

### View Database Directly

Use any MySQL client:
```bash
mysql -h localhost -u user -p database_name
```

---

## 🆘 Getting Help

1. Check documentation files in project root
2. Review error messages in console
3. Check browser DevTools for errors
4. Review server logs in terminal
5. Contact support at help.manus.im

---

**Happy Selling! 🎉**

For more information, see the complete documentation files included in the project.
