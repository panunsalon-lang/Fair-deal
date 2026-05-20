# Admin Access & Testing Credentials

## Authentication Method

Royal Silver uses **Custom Username/Password Authentication** for admin access. This provides a simple and secure way to manage admin credentials.

## Admin Login Credentials

**Username:** `royalsilver123`  
**Password:** `royaladmin@123321`

## How to Access the Admin Portal

### Step 1: Navigate to Admin Login
Go to `/admin/login-simple` on your Royal Silver website.

### Step 2: Enter Credentials
Enter the username and password provided above.

### Step 3: Login
Click "Login" to access the admin dashboard. Your session will be stored locally in the browser.

## Admin Dashboard Features

Once logged in, you have access to:

- **Dashboard** - View statistics and key metrics
  - Total products count
  - Total categories
  - Total sales
  - Recent activity

- **Products Management** - Manage your jewelry catalog
  - View all products
  - Add new products
  - Edit existing products
  - Delete products
  - Upload product images
  - Mark products as featured

- **Testimonials** - Manage customer reviews
  - View all testimonials
  - Approve/reject testimonials
  - Delete testimonials
  - Filter by status (All, Pending, Approved)

- **Sales & Promotions** - Manage sales campaigns
  - Create new sales
  - Edit existing sales
  - Delete sales
  - Upload sale thumbnails
  - Track sale performance

- **Inventory** - Track product stock
  - View stock levels
  - Update stock quantities
  - Low stock warnings
  - Stock status display

## Updating Admin Credentials

### Update via Script

To update admin credentials programmatically:

```bash
node update-admin-creds.mjs
```

This script will:
1. Connect to the database
2. Hash the password with bcrypt
3. Update or create the admin user
4. Display confirmation

### Update via Database SQL

If you need to update credentials directly in the database:

```sql
-- View existing admin credentials
SELECT id, username, email, active FROM adminCredentials;

-- Update admin email
UPDATE adminCredentials SET email = 'newemail@example.com' WHERE username = 'royalsilver123';
```

**Note:** Passwords must be hashed with bcrypt before storing in the database. Use the provided script for secure password updates.

## Session Management

- Sessions are stored locally in the browser's localStorage
- Sessions persist across page refreshes
- Click "Logout" to end your session
- For security, always logout when finished
- Sessions are user-specific and secure

## Database Schema

Admin credentials are stored in the `adminCredentials` table:

```sql
CREATE TABLE adminCredentials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  passwordHash VARCHAR(500) NOT NULL,
  email VARCHAR(320),
  active INT DEFAULT 1,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

- Passwords are hashed using bcrypt (10 salt rounds)
- Usernames are unique across the system
- The `active` field controls whether the account is enabled

## Testing Admin Features

### Sample Products

The database has been seeded with 6 sample products across all categories:

**Couple Bands**
- Couple Bands - Silver (₹12,000) - Featured
- Couple Bands - Gold Plated (₹15,000)

**Rings**
- Diamond Engagement Ring (₹45,000) - Featured
- Pearl Pendant Ring (₹18,000)

**Royal Silver Collection**
- Royal Silver Signature Ring (₹28,000) - Featured
- Royal Silver Heritage Collection (₹35,000)

### Test Scenarios

**Create Product**
1. Go to Admin Dashboard
2. Click "Add Product"
3. Fill in:
   - Name: "Test Emerald Ring"
   - Category: "Rings"
   - Price: "35000"
   - Description: "A beautiful test product"
   - Images: (leave empty or paste URLs)
   - Featured: (check to feature)
4. Click "Create Product"
5. Verify product appears in Products list

**Edit Product**
1. Go to Products list
2. Click "Edit" on any product
3. Change the name to "Updated - [Original Name]"
4. Click "Update Product"
5. Verify changes appear in list

**Delete Product**
1. Go to Products list
2. Click "Delete" on a product
3. Confirm deletion in popup
4. Verify product is removed from list

## Troubleshooting Admin Access

### "Invalid Credentials" Message
- Verify username and password are correct (case-sensitive)
- Check that caps lock is not on
- Ensure the admin account is active in the database

### Cannot See Admin Dashboard
- Ensure you're logged in (check the header for your name)
- Try clearing browser cookies and logging in again
- Check browser console for error messages

### Forgot Admin URL
- Admin login: `/admin/login-simple`
- Admin dashboard: `/admin/dashboard`
- Products list: `/admin/products`
- Add product: `/admin/products/add`
- Edit product: `/admin/products/edit/[product-id]`

## Security Notes

- Admin credentials are required for all admin operations
- Passwords are hashed using bcrypt for security
- Never share your admin credentials
- Always logout when using a shared computer
- Change your password regularly in production
- Sessions are stored locally and should be cleared on logout

## Support

For technical issues:
- Phone: +91 7006630873
- WhatsApp: https://wa.me/7006630873

Refer to README.md and SETUP_GUIDE.md for additional documentation.
