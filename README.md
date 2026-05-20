# Royal Silver - Premium Jewelry Retail Website

A full-stack luxury jewelry e-commerce platform featuring a public storefront and secure admin dashboard for product management.

## Overview

Royal Silver is a premium jewelry retail website built with modern web technologies. It provides customers with an elegant shopping experience and administrators with a comprehensive product management system.

### Key Features

**Public Storefront**
- Responsive home page with hero banner and featured products
- Collections page with category filtering (Couple Bands, Rings, Royal Silver)
- Product detail pages with multi-image galleries
- About Us page with brand story
- Contact page with inquiry form and WhatsApp integration
- Floating WhatsApp button on all pages
- Luxury design with gold and silver color palette

**Admin Dashboard**
- Secure login with JWT authentication
- Dashboard with product statistics
- Full CRUD operations for products
- Multi-image upload support
- Category management
- Featured product designation
- Product analytics

## Technology Stack

**Frontend**
- React 19 with TypeScript
- Tailwind CSS 4 for styling
- Wouter for routing
- tRPC for type-safe API calls
- Lucide React for icons

**Backend**
- Node.js with Express
- tRPC for RPC procedures
- Drizzle ORM for database management
- MySQL/TiDB for data persistence

**Authentication**
- Manus OAuth for user authentication
- JWT-based session management
- Role-based access control (admin/user)

**Styling**
- Playfair Display (serif) for headings
- Montserrat (sans-serif) for body text
- Gold (#D4AF37) and silver color palette
- Responsive design across all devices

## Project Structure

```
royal-silver/
├── client/                    # Frontend React application
│   ├── public/               # Static assets
│   │   └── favicon.svg       # Brand favicon
│   ├── src/
│   │   ├── pages/            # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Collections.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── admin/        # Admin pages
│   │   │       ├── AdminLogin.tsx
│   │   │       ├── AdminDashboard.tsx
│   │   │       ├── AdminProducts.tsx
│   │   │       ├── AdminProductAdd.tsx
│   │   │       └── AdminProductEdit.tsx
│   │   ├── components/       # Reusable components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── WhatsAppButton.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── App.tsx           # Main app with routing
│   │   ├── index.css         # Global styles
│   │   └── main.tsx          # Entry point
│   └── index.html            # HTML template
├── server/
│   ├── routers.ts            # tRPC procedure definitions
│   ├── db.ts                 # Database query helpers
│   └── _core/                # Framework internals
├── drizzle/
│   ├── schema.ts             # Database schema
│   └── migrations/           # Database migrations
├── package.json              # Dependencies
└── README.md                 # This file
```

## Database Schema

### Products Table
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  images JSON NOT NULL DEFAULT (JSON_ARRAY()),
  featured INT NOT NULL DEFAULT 0,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP
);
```

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  openId VARCHAR(64) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin') DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
  lastSignedIn TIMESTAMP DEFAULT NOW()
);
```

## Setup Instructions

### Prerequisites
- Node.js 22+
- pnpm package manager
- MySQL/TiDB database

### Installation

1. **Clone and install dependencies**
   ```bash
   cd royal-silver
   pnpm install
   ```

2. **Set up environment variables**
   - The platform automatically injects required environment variables
   - Key variables: `DATABASE_URL`, `JWT_SECRET`, `VITE_APP_ID`, `OAUTH_SERVER_URL`

3. **Initialize database**
   ```bash
   pnpm drizzle-kit generate
   pnpm drizzle-kit migrate
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`

## Running the Application

### Development
```bash
pnpm dev
```

### Build for Production
```bash
pnpm build
```

### Start Production Server
```bash
pnpm start
```

### Run Tests
```bash
pnpm test
```

## Admin Panel Usage

### Accessing the Admin Portal
1. Navigate to `/admin/login`
2. Sign in with your Royal Silver account (admin role required)
3. You'll be redirected to the dashboard

### Managing Products

**Add a New Product**
1. Click "Add Product" from the dashboard
2. Fill in product details:
   - Product Name
   - Category (Couple Bands, Rings, Royal Silver)
   - Price
   - Description
   - Product Images (paste URLs)
   - Mark as Featured (optional)
3. Click "Create Product"

**Edit a Product**
1. Go to Products list
2. Click "Edit" on the product you want to modify
3. Update any fields
4. Click "Update Product"

**Delete a Product**
1. Go to Products list
2. Click "Delete" on the product
3. Confirm deletion in the popup

**Product Images**
- Images must be uploaded to an external service (Cloudinary, S3, etc.)
- Paste the image URL in the admin panel
- Multiple images per product are supported
- Images appear in the product detail gallery

## API Endpoints

### Public Endpoints
- `GET /api/trpc/products.getAll` - Get all products
- `GET /api/trpc/products.getByCategory` - Get products by category
- `GET /api/trpc/products.getFeatured` - Get featured products
- `GET /api/trpc/products.getById` - Get single product
- `GET /api/trpc/products.getStats` - Get product statistics

### Admin Endpoints (Protected)
- `POST /api/trpc/products.create` - Create new product
- `POST /api/trpc/products.update` - Update product
- `POST /api/trpc/products.delete` - Delete product

## Contact Information

**Royal Silver**
- Phone: +91 7006630873
- WhatsApp: https://wa.me/7006630873
- Social Media: Instagram, Facebook

## Branding Guidelines

### Color Palette
- **Primary Gold**: #D4AF37 (oklch(0.65 0.15 70))
- **Silver**: #C0C0C0
- **Off-white**: #F5F1E8
- **Deep Charcoal**: #1A1A1A

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Montserrat (sans-serif)

### Brand Name
- Always use "Royal Silver" (not "Royal silver" or variations)
- Contact number: 7006630873 (always with country code +91 for international)

## Features Checklist

- [x] Database schema with products table
- [x] Product CRUD API endpoints
- [x] Public storefront pages
- [x] Admin authentication and dashboard
- [x] Product management interface
- [x] Multi-image gallery support
- [x] Category filtering
- [x] WhatsApp integration
- [x] Responsive design
- [x] Luxury branding and styling

## Deployment

The application is deployed on Manus platform and automatically handles:
- SSL/TLS encryption
- Database backups
- Auto-scaling
- CDN distribution
- Environment variable management

To deploy updates:
1. Create a checkpoint via the Management UI
2. Click "Publish" button
3. Changes will be live within minutes

## Support and Maintenance

### Common Tasks

**Add a new product category**
1. Update `CATEGORIES` array in admin pages
2. Update schema if needed
3. No database migration required (categories are stored as strings)

**Change contact number**
- Update `7006630873` in:
  - `Header.tsx`
  - `Footer.tsx`
  - `Contact.tsx`
  - `WhatsAppButton.tsx`
  - Environment variables if needed

**Update brand colors**
- Edit CSS variables in `client/src/index.css`
- Update `--primary`, `--accent`, `--background`, `--foreground`

## Troubleshooting

### Products not showing
- Check database connection
- Verify products are created in admin panel
- Check browser console for API errors

### Admin login not working
- Ensure user has admin role in database
- Check JWT_SECRET environment variable
- Clear browser cookies and try again

### Images not displaying
- Verify image URLs are accessible
- Check CORS settings if using external image service
- Ensure image URLs are HTTPS

## License

All rights reserved. Royal Silver © 2026.

## Contact

For technical support or inquiries, contact:
- Phone: +91 7006630873
- WhatsApp: https://wa.me/7006630873
