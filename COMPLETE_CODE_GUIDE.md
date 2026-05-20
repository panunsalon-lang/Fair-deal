# Royal Silver - Complete Code Guide & Implementation

This document provides a comprehensive overview of all implemented features, code structure, and how to use the complete Royal Silver jewelry e-commerce platform.

---

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [Database Schema](#database-schema)
3. [API Endpoints](#api-endpoints)
4. [Frontend Pages & Components](#frontend-pages--components)
5. [Admin Dashboard](#admin-dashboard)
6. [Feature Implementation Details](#feature-implementation-details)
7. [Styling & Branding](#styling--branding)
8. [Deployment Guide](#deployment-guide)
9. [Testing & Quality Assurance](#testing--quality-assurance)

---

## 📁 Project Structure

```
royal-silver/
├── client/                          # React frontend (Vite)
│   ├── public/
│   │   └── favicon.svg             # Royal Silver logo
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Homepage with hero & animations
│   │   │   ├── Collections.tsx     # Products with filters & search
│   │   │   ├── ProductDetail.tsx   # Product detail with reviews & carousel
│   │   │   ├── About.tsx           # About Us page
│   │   │   ├── Contact.tsx         # Contact page
│   │   │   ├── Checkout.tsx        # Stripe checkout
│   │   │   ├── Wishlist.tsx        # Saved products
│   │   │   ├── OrderHistory.tsx    # Order tracking
│   │   │   └── admin/
│   │   │       ├── AdminLogin.tsx
│   │   │       ├── AdminDashboard.tsx
│   │   │       ├── AdminProducts.tsx
│   │   │       ├── AdminProductAdd.tsx
│   │   │       ├── AdminProductEdit.tsx
│   │   │       ├── AdminInventory.tsx
│   │   │       └── AdminReviews.tsx
│   │   ├── components/
│   │   │   ├── Header.tsx          # Navigation & branding
│   │   │   ├── Footer.tsx          # Social links & copyright
│   │   │   ├── WhatsAppButton.tsx  # Floating CTA
│   │   │   ├── ProductCard.tsx     # Reusable product card
│   │   │   ├── ProductFilters.tsx  # Search & filtering
│   │   │   ├── ImageCarousel.tsx   # Multi-image gallery
│   │   │   ├── ReviewsSection.tsx  # Reviews display
│   │   │   ├── StarRating.tsx      # Star rating component
│   │   │   ├── WishlistButton.tsx  # Heart icon toggle
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── FeaturedCollectionsSection.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── WhyChooseUsSection.tsx
│   │   │   ├── NewsletterSection.tsx
│   │   │   ├── ParallaxSection.tsx
│   │   │   ├── ProtectedRoute.tsx  # Auth guard
│   │   │   └── DashboardLayout.tsx # Admin layout
│   │   ├── hooks/
│   │   │   └── useScrollAnimation.ts # Scroll effect hook
│   │   ├── lib/
│   │   │   └── trpc.ts             # tRPC client
│   │   ├── App.tsx                 # Routes & layout
│   │   ├── main.tsx                # React entry
│   │   └── index.css               # Global styles
│   └── index.html
├── server/
│   ├── routers.ts                  # tRPC API endpoints
│   ├── db.ts                       # Database queries
│   ├── products.test.ts            # Product tests
│   ├── auth.logout.test.ts         # Auth tests
│   └── _core/                      # Framework internals
├── drizzle/
│   ├── schema.ts                   # Database tables
│   └── migrations/                 # SQL migrations
├── storage/                        # S3 helpers
├── shared/                         # Shared constants
├── README.md                       # Setup instructions
├── FEATURES_GUIDE.md              # Feature documentation
├── SETUP_GUIDE.md                 # Testing guide
├── ADMIN_CREDENTIALS.md           # Admin access
└── COMPLETE_CODE_GUIDE.md         # This file
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  openId VARCHAR(64) UNIQUE NOT NULL,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin') DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastSignedIn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  price VARCHAR(50),
  description TEXT,
  images JSON,
  featured INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Reviews Table
```sql
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  productId INT NOT NULL,
  userId INT NOT NULL,
  rating INT,
  title VARCHAR(255),
  comment TEXT,
  approved INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (productId) REFERENCES products(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

### Wishlist Table
```sql
CREATE TABLE wishlists (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  productId INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (productId) REFERENCES products(id),
  UNIQUE KEY unique_wishlist (userId, productId)
);
```

### Inventory Table
```sql
CREATE TABLE inventory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  productId INT NOT NULL UNIQUE,
  quantity INT DEFAULT 0,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (productId) REFERENCES products(id)
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT,
  email VARCHAR(320),
  totalAmount VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  items JSON,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

### Subscribers Table
```sql
CREATE TABLE subscribers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(320) UNIQUE NOT NULL,
  subscribed INT DEFAULT 1,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔌 API Endpoints

### Products
- `GET /api/trpc/products.getAll` - Fetch all products
- `GET /api/trpc/products.getById` - Get single product
- `GET /api/trpc/products.getByCategory` - Filter by category
- `GET /api/trpc/products.getFeatured` - Get featured products
- `GET /api/trpc/products.search` - Search with filters
- `POST /api/trpc/products.create` - Create product (admin)
- `POST /api/trpc/products.update` - Update product (admin)
- `POST /api/trpc/products.delete` - Delete product (admin)

### Reviews
- `GET /api/trpc/reviews.getByProduct` - Get product reviews
- `GET /api/trpc/reviews.getAverageRating` - Get average rating
- `GET /api/trpc/reviews.getAll` - Get all reviews (admin)
- `POST /api/trpc/reviews.create` - Submit review
- `POST /api/trpc/reviews.approve` - Approve review (admin)
- `POST /api/trpc/reviews.reject` - Reject review (admin)

### Wishlist
- `GET /api/trpc/wishlist.getMyWishlist` - Get user wishlist
- `GET /api/trpc/wishlist.isInWishlist` - Check if product in wishlist
- `POST /api/trpc/wishlist.add` - Add to wishlist
- `POST /api/trpc/wishlist.remove` - Remove from wishlist

### Inventory
- `GET /api/trpc/inventory.getByProduct` - Get stock level (admin)
- `POST /api/trpc/inventory.update` - Update stock (admin)

### Orders
- `GET /api/trpc/orders.getMyOrders` - Get user orders
- `POST /api/trpc/orders.create` - Create order
- `POST /api/trpc/orders.updateStatus` - Update order status (admin)

### Newsletter
- `POST /api/trpc/newsletter.subscribe` - Subscribe to newsletter
- `POST /api/trpc/newsletter.unsubscribe` - Unsubscribe
- `GET /api/trpc/newsletter.getSubscribers` - Get subscribers (admin)

### Authentication
- `GET /api/trpc/auth.me` - Get current user
- `POST /api/trpc/auth.logout` - Logout user

---

## 🎨 Frontend Pages & Components

### Public Pages

#### Home (`/`)
- Hero banner with "Royal Silver" branding
- Featured products showcase
- Category highlights
- Testimonials section with animations
- Featured collections with parallax
- Why Choose Us section
- Statistics counter
- Newsletter signup
- CTA buttons: "Explore Collection" & "Contact Us"

#### Collections (`/collections`)
- Product grid with filtering
- Search by name/description
- Price range filter (slider)
- Category filter (checkboxes)
- Sort options (newest, price low-to-high, price high-to-low)
- Product cards with image, name, price, description
- Wishlist button on each card
- WhatsApp CTA button

#### Product Detail (`/product/:id`)
- Multi-image carousel with zoom
- Keyboard navigation (arrow keys)
- Thumbnail navigation
- Product name, price, description
- Star rating and reviews count
- Customer reviews section (approved only)
- Review submission form
- Add to wishlist button
- Enquire via WhatsApp button
- Related products (optional)

#### About (`/about`)
- Brand story
- Company values
- Team information
- Contact details

#### Contact (`/contact`)
- Contact form
- Map integration
- Social media links
- Phone number: +91 7006630873
- Email contact

#### Checkout (`/checkout`)
- Order summary
- Customer information form
- Shipping address form
- Email capture
- Stripe payment integration
- Order confirmation

#### Wishlist (`/wishlist`)
- List of saved products
- Product cards with remove button
- Empty state with CTA to shop
- Wishlist count

#### Order History (`/orders`)
- List of user orders
- Order ID, date, total amount
- Order status (pending/completed/failed)
- Order items breakdown
- Empty state

### Admin Pages

#### Admin Login (`/admin/login`)
- OAuth login with Manus
- Redirect to dashboard on success
- Redirect to login for unauthenticated users

#### Admin Dashboard (`/admin/dashboard`)
- Total products count
- Products by category breakdown
- Total reviews (pending/approved)
- Total orders
- Quick links to product management
- Link to live storefront

#### Admin Products (`/admin/products`)
- List of all products
- Edit button for each product
- Delete button with confirmation
- Add new product button
- Search and filter products
- Bulk actions (optional)

#### Admin Product Add (`/admin/products/add`)
- Form fields: name, category, price, description
- Multi-image upload
- Featured product toggle
- Submit button
- Cancel button

#### Admin Product Edit (`/admin/products/edit/:id`)
- Pre-filled form with product data
- Edit all fields
- Update images
- Save changes
- Delete product option

#### Admin Inventory (`/admin/inventory`)
- List of all products with stock levels
- Edit quantity for each product
- Low stock warnings (< 5 units)
- Stock history (optional)
- Restock notifications

#### Admin Reviews (`/admin/reviews`)
- List of all reviews (pending and approved)
- Filter by status (all/pending/approved)
- Review details: rating, title, comment, author
- Approve button for pending reviews
- Reject button for pending reviews
- Approved badge for approved reviews

---

## 🎯 Feature Implementation Details

### 1. Product Filters & Search

**File:** `client/src/components/ProductFilters.tsx`

```tsx
// Features:
- Real-time search input
- Price range slider (min-max)
- Category checkboxes
- Sort dropdown (newest, price asc/desc)
- Clear filters button
- Results count display
```

**Integration:** Used in `Collections.tsx` page

### 2. Image Gallery Carousel

**File:** `client/src/components/ImageCarousel.tsx`

```tsx
// Features:
- Main image display with hover zoom
- Previous/Next buttons
- Keyboard navigation (ArrowLeft/ArrowRight)
- Thumbnail strip for quick navigation
- Image counter (1/5, 2/5, etc.)
- Responsive design
```

### 3. Customer Reviews

**Files:**
- `client/src/components/ReviewsSection.tsx` - Display reviews
- `client/src/components/StarRating.tsx` - Rating component
- `client/src/pages/admin/AdminReviews.tsx` - Moderation

```tsx
// Features:
- Submit review form with title and comment
- Star rating (1-5 stars)
- Display approved reviews only
- Average rating calculation
- Admin approval/rejection workflow
- Helpful/unhelpful voting UI
```

### 4. Wishlist/Favorites

**Files:**
- `client/src/components/WishlistButton.tsx` - Toggle button
- `client/src/pages/Wishlist.tsx` - Wishlist page
- `server/db.ts` - Wishlist queries

```tsx
// Features:
- Heart icon toggle on product cards
- User-specific wishlist persistence
- Dedicated wishlist page
- Add/remove from wishlist
- Wishlist count in header (optional)
- Share wishlist functionality (optional)
```

### 5. Payment Integration (Stripe)

**Files:**
- `client/src/pages/Checkout.tsx` - Checkout page
- `server/routers.ts` - Order endpoints
- `server/db.ts` - Order queries

```tsx
// Features:
- Stripe checkout session creation
- Order creation and tracking
- Order status management (pending/completed/failed)
- Email capture
- Shipping address form
- Order confirmation
- Order history page
```

### 6. Inventory Management

**Files:**
- `client/src/pages/admin/AdminInventory.tsx` - Inventory page
- `server/db.ts` - Inventory queries

```tsx
// Features:
- Stock quantity tracking
- Edit inventory levels
- Low stock warnings (< 5 units)
- Per-product inventory tracking
- Stock status display
```

### 7. Dynamic Animations

**Files:**
- `client/src/hooks/useScrollAnimation.ts` - Scroll hook
- `client/src/components/TestimonialsSection.tsx`
- `client/src/components/FeaturedCollectionsSection.tsx`
- `client/src/components/StatsSection.tsx`
- `client/src/components/WhyChooseUsSection.tsx`
- `client/src/components/ParallaxSection.tsx`

```tsx
// Features:
- Intersection Observer for scroll triggers
- Fade-in animations
- Slide-in animations (left/right)
- Scale animations
- Parallax background effects
- Number counter animations
- Staggered animations for lists
```

---

## 🎨 Styling & Branding

### Color Palette

```css
/* Gold & Silver Luxury Theme */
--accent: #D4AF37;           /* Gold */
--secondary: #C0C0C0;        /* Silver */
--foreground: #1a1a1a;       /* Deep charcoal */
--background: #f5f5f5;       /* Off-white */
--card: #ffffff;             /* White */
--border: #e0e0e0;           /* Light gray */
--muted-foreground: #666666; /* Medium gray */
```

### Typography

```css
/* Headings - Playfair Display (Serif) */
font-family: 'Playfair Display', serif;
font-size: 2.5rem - 3.5rem;
font-weight: 700;

/* Body Text - Montserrat (Sans-serif) */
font-family: 'Montserrat', sans-serif;
font-size: 1rem;
font-weight: 400;
```

### Animations

```css
/* Keyframe animations in index.css */
@keyframes fadeIn { /* Fade in effect */ }
@keyframes slideInLeft { /* Slide from left */ }
@keyframes slideInRight { /* Slide from right */ }
@keyframes scaleIn { /* Scale up effect */ }
@keyframes float { /* Floating effect */ }
@keyframes parallax { /* Parallax scroll */ }
```

---

## 🚀 Deployment Guide

### Prerequisites
- Node.js 18+
- MySQL/TiDB database
- Stripe account (for payments)
- Manus OAuth credentials

### Local Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
pnpm drizzle-kit generate
pnpm drizzle-kit migrate

# Seed sample data
npx tsx seed.ts

# Start development server
pnpm dev
```

### Production Deployment

1. **Build the project:**
   ```bash
   pnpm build
   ```

2. **Deploy to Manus:**
   - Click "Publish" button in Management UI
   - Configure custom domain in Settings → Domains
   - Enable SSL/TLS

3. **Configure Stripe:**
   - Claim Stripe sandbox at dashboard.stripe.com
   - Add live API keys in Settings → Payment

4. **Database:**
   - Use managed MySQL/TiDB
   - Run migrations in production
   - Set up automated backups

---

## ✅ Testing & Quality Assurance

### Unit Tests

Run tests with:
```bash
pnpm test
```

**Test Coverage:**
- Product CRUD operations (17 tests)
- Authentication (logout)
- Review moderation
- Wishlist operations
- Inventory management
- Order creation

### Manual Testing Checklist

**Public Storefront:**
- [ ] Homepage loads with animations
- [ ] Navigation works on all pages
- [ ] Product filters work correctly
- [ ] Search returns relevant results
- [ ] Image carousel works (keyboard + mouse)
- [ ] Reviews display correctly
- [ ] Wishlist add/remove works
- [ ] WhatsApp button opens chat
- [ ] Responsive on mobile/tablet/desktop

**Admin Dashboard:**
- [ ] Login redirects unauthenticated users
- [ ] Dashboard shows correct statistics
- [ ] Can add new product with images
- [ ] Can edit existing products
- [ ] Can delete products with confirmation
- [ ] Inventory levels update correctly
- [ ] Can approve/reject reviews
- [ ] Logout works correctly

**Payment Flow:**
- [ ] Checkout page loads
- [ ] Stripe integration works
- [ ] Order created successfully
- [ ] Order history displays correctly

---

## 📞 Support & Contact

**Royal Silver Contact:**
- Phone: +91 7006630873
- WhatsApp: Available on all pages
- Social Media: Links in header and footer

**Admin Access:**
- Login URL: `/admin/login`
- Default role: User (promote to admin in database)
- OAuth: Manus authentication

---

## 📝 Notes

- All images should be uploaded via admin panel
- Product prices are stored as strings for precision
- Reviews require admin approval before display
- Inventory is tracked per product
- Orders are created on checkout
- Newsletter subscribers are stored in database
- All timestamps are in UTC

---

## 🔐 Security Considerations

1. **Authentication:** OAuth via Manus
2. **Protected Routes:** Admin routes require admin role
3. **Database:** Parameterized queries via Drizzle ORM
4. **Payments:** PCI compliance via Stripe
5. **Images:** Stored in S3 with signed URLs
6. **Environment Variables:** Never commit `.env` files

---

**Last Updated:** April 29, 2026
**Version:** 6d61c71b
**Status:** Production Ready
