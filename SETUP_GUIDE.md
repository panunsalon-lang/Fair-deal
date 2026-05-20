# Royal Silver - Setup & Testing Guide

## Initial Setup

### 1. Database Setup

After deploying the project, the database schema is automatically created. To seed sample products:

```bash
# From the project root
node seed-db.mjs
```

This will add 6 sample products across all categories:
- Couple Bands (2 products)
- Rings (2 products)
- Royal Silver Collection (2 products)

### 2. Admin Access

The admin portal uses **Manus OAuth** for authentication. To access the admin panel:

1. Navigate to `/admin/login`
2. Click "Sign In with Royal Silver Account"
3. You'll be redirected to the Manus OAuth login
4. After successful login, you'll be redirected to `/admin/dashboard`

**Important**: Only users with the `admin` role can access the admin panel. To grant admin access to a user:

```sql
UPDATE users SET role = 'admin' WHERE email = 'user@example.com';
```

Alternatively, the project owner (identified by `OWNER_OPEN_ID`) is automatically promoted to admin on first login.

## Admin Panel Walkthrough

### Dashboard

The dashboard displays:
- **Total Products**: Count of all products in the catalog
- **Categories**: Number of product categories
- **Products by Category**: Breakdown of products per category
- Quick links to manage products and view the storefront

### Managing Products

#### Add a New Product

1. Click "Add Product" from the dashboard or products list
2. Fill in the required fields:
   - **Product Name**: e.g., "Diamond Engagement Ring"
   - **Category**: Choose from Couple Bands, Rings, or Royal Silver
   - **Price**: Enter in rupees (e.g., 25000)
   - **Description**: Detailed product description
   - **Images**: Paste image URLs (multiple images supported)
   - **Featured**: Check to display on homepage

3. Click "Create Product"

**Note on Images**: 
- Images must be uploaded to an external service (Cloudinary, S3, etc.)
- Paste the full image URL in the admin panel
- Multiple images per product are supported and will appear in the product detail gallery

#### Edit a Product

1. Go to Products list
2. Click "Edit" on any product
3. Modify any fields
4. Click "Update Product"

#### Delete a Product

1. Go to Products list
2. Click "Delete" on the product
3. Confirm deletion in the popup

**Warning**: Deletion is permanent and cannot be undone.

## Testing the Website

### Public Storefront

#### Home Page
- [ ] Hero banner displays correctly with "Royal Silver" branding
- [ ] Featured products section shows sample products
- [ ] Category highlights are clickable and filter correctly
- [ ] WhatsApp button appears in bottom-right corner
- [ ] CTA buttons work (Explore Collection, Contact Us)

#### Collections Page
- [ ] All products display in grid
- [ ] Category filter works (Couple Bands, Rings, Royal Silver, All)
- [ ] Product count updates when filtering
- [ ] Products are clickable and navigate to detail page

#### Product Detail Page
- [ ] Product images display correctly
- [ ] Image gallery navigation works (previous/next buttons)
- [ ] Product information displays (name, price, description, category)
- [ ] WhatsApp enquiry button works
- [ ] Phone call button works

#### About Us Page
- [ ] Brand story displays correctly
- [ ] Values section shows all three values
- [ ] Contact CTAs are functional

#### Contact Page
- [ ] Contact information displays (phone, WhatsApp)
- [ ] Social media links are present
- [ ] Contact form is visible (note: form submission requires backend integration)
- [ ] FAQ section displays

#### Navigation & Footer
- [ ] Header navigation works on all pages
- [ ] Header is sticky and visible while scrolling
- [ ] Mobile menu opens/closes correctly
- [ ] Footer displays on all pages
- [ ] Social media links in footer work
- [ ] Copyright notice is correct

### WhatsApp Integration

- [ ] Floating WhatsApp button appears on all pages
- [ ] Button is green and in bottom-right corner
- [ ] Clicking opens WhatsApp with pre-filled message
- [ ] Message includes product name when clicked from product detail page

### Admin Portal

#### Authentication
- [ ] Unauthenticated users cannot access `/admin/dashboard`
- [ ] Unauthenticated users are redirected to `/admin/login`
- [ ] Login page displays correctly
- [ ] Sign in button redirects to OAuth
- [ ] After login, user is redirected to dashboard

#### Dashboard
- [ ] Product statistics display correctly
- [ ] Category breakdown shows accurate counts
- [ ] Quick action buttons navigate correctly
- [ ] Logout button works

#### Product Management
- [ ] Add product form displays all fields
- [ ] Creating a product adds it to the database
- [ ] New product appears in products list
- [ ] Edit form pre-fills with existing data
- [ ] Updating a product saves changes
- [ ] Delete confirmation popup appears
- [ ] Deleting a product removes it from the database

## Responsive Design Testing

Test the website on different screen sizes:

### Mobile (320px - 480px)
- [ ] Navigation menu collapses into hamburger
- [ ] Product grid shows 1 column
- [ ] Images are properly sized
- [ ] Text is readable without zooming
- [ ] WhatsApp button is accessible

### Tablet (481px - 768px)
- [ ] Navigation is visible or accessible
- [ ] Product grid shows 2 columns
- [ ] Layout is balanced and readable

### Desktop (769px+)
- [ ] Navigation shows full menu
- [ ] Product grid shows 3 columns
- [ ] Sticky header works correctly
- [ ] All elements are properly spaced

## Branding Verification

- [ ] Brand name "Royal Silver" appears in header and footer
- [ ] Contact number 9906515680 is displayed in header, footer, and contact page
- [ ] Gold color (#D4AF37) is used for accents and primary buttons
- [ ] Playfair Display font is used for headings
- [ ] Montserrat font is used for body text
- [ ] Favicon displays in browser tab
- [ ] Page title is "Royal Silver - Premium Jewelry Retail"

## Performance Checklist

- [ ] Page loads within 3 seconds
- [ ] Images load efficiently
- [ ] Navigation is smooth and responsive
- [ ] Admin operations (add/edit/delete) complete quickly
- [ ] No console errors or warnings

## Common Issues & Solutions

### Admin Login Not Working
- Ensure your user account has the `admin` role
- Check that you're using the correct OAuth credentials
- Clear browser cookies and try again

### Products Not Displaying
- Verify products were created in admin panel
- Check database connection
- Ensure product images are valid URLs

### WhatsApp Links Not Working
- Verify phone number is correct: 9906515680
- Check that WhatsApp is installed on the device
- Ensure browser allows opening external links

### Images Not Showing
- Verify image URLs are accessible
- Check CORS settings if using external image service
- Ensure image URLs use HTTPS

## Next Steps

After testing:

1. **Customize Social Media Links**
   - Update Facebook and Instagram URLs in Header.tsx and Footer.tsx
   - Replace placeholder URLs with actual Royal Silver profiles

2. **Set Up Image Storage**
   - Choose an image hosting service (Cloudinary, S3, etc.)
   - Configure upload endpoint if needed
   - Update admin panel to support file uploads

3. **Integrate Payment Processing**
   - Add Stripe integration for online payments
   - Implement order management system
   - Set up email notifications

4. **Deploy to Production**
   - Create a checkpoint
   - Click "Publish" button in Management UI
   - Monitor for any issues

## Support

For technical issues or questions:
- Phone: +91 9906515680
- WhatsApp: https://wa.me/9906515680

Refer to the main README.md for additional documentation.
