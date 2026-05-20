# Royal Silver - API Documentation

Complete API reference for Royal Silver jewelry e-commerce platform using tRPC.

---

## Base URL

```
Development: http://localhost:3000/api/trpc
Production: https://your-domain.manus.space/api/trpc
```

---

## Authentication

All protected endpoints require a valid session cookie. Use OAuth login at `/admin/login` to obtain a session.

**Headers:**
```
Cookie: app_session_id=<session_token>
Content-Type: application/json
```

---

## Products API

### Get All Products

```
GET /api/trpc/products.getAll
```

**Response:**
```json
{
  "result": {
    "data": [
      {
        "id": 1,
        "name": "Diamond Ring",
        "category": "Rings",
        "price": "15000",
        "description": "Elegant diamond ring",
        "images": ["url1", "url2"],
        "featured": 1,
        "createdAt": "2026-04-29T00:00:00Z",
        "updatedAt": "2026-04-29T00:00:00Z"
      }
    ]
  }
}
```

### Get Product by ID

```
GET /api/trpc/products.getById?input={"id":1}
```

**Parameters:**
- `id` (number, required) - Product ID

**Response:** Single product object

### Get Products by Category

```
GET /api/trpc/products.getByCategory?input={"category":"Rings"}
```

**Parameters:**
- `category` (string, required) - Category name

**Response:** Array of products in category

### Get Featured Products

```
GET /api/trpc/products.getFeatured
```

**Response:** Array of featured products

### Search Products

```
GET /api/trpc/products.search?input={"query":"diamond","minPrice":1000,"maxPrice":50000,"category":"Rings"}
```

**Parameters:**
- `query` (string, optional) - Search term
- `minPrice` (number, optional) - Minimum price
- `maxPrice` (number, optional) - Maximum price
- `category` (string, optional) - Category filter

**Response:** Filtered products array

### Create Product (Admin)

```
POST /api/trpc/products.create
```

**Body:**
```json
{
  "name": "Diamond Ring",
  "category": "Rings",
  "price": "15000",
  "description": "Elegant diamond ring",
  "images": ["url1", "url2"],
  "featured": 1
}
```

**Response:** Created product object

### Update Product (Admin)

```
POST /api/trpc/products.update
```

**Body:**
```json
{
  "id": 1,
  "name": "Updated Ring",
  "price": "16000"
}
```

**Response:** Updated product object

### Delete Product (Admin)

```
POST /api/trpc/products.delete
```

**Body:**
```json
{
  "id": 1
}
```

**Response:**
```json
{
  "result": {
    "data": true
  }
}
```

---

## Reviews API

### Get Product Reviews

```
GET /api/trpc/reviews.getByProduct?input={"productId":1}
```

**Parameters:**
- `productId` (number, required) - Product ID

**Response:** Array of approved reviews

```json
{
  "result": {
    "data": [
      {
        "id": 1,
        "productId": 1,
        "userId": 5,
        "rating": 5,
        "title": "Excellent quality",
        "comment": "Beautiful ring, highly recommended",
        "approved": 1,
        "createdAt": "2026-04-29T00:00:00Z"
      }
    ]
  }
}
```

### Get Average Rating

```
GET /api/trpc/reviews.getAverageRating?input={"productId":1}
```

**Parameters:**
- `productId` (number, required) - Product ID

**Response:**
```json
{
  "result": {
    "data": 4.5
  }
}
```

### Get All Reviews (Admin)

```
GET /api/trpc/reviews.getAll
```

**Response:** Array of all reviews (pending and approved)

### Create Review

```
POST /api/trpc/reviews.create
```

**Body:**
```json
{
  "productId": 1,
  "rating": 5,
  "title": "Excellent quality",
  "comment": "Beautiful ring, highly recommended"
}
```

**Response:** Created review object

### Approve Review (Admin)

```
POST /api/trpc/reviews.approve
```

**Body:**
```json
{
  "id": 1
}
```

**Response:** Approved review object

### Reject Review (Admin)

```
POST /api/trpc/reviews.reject
```

**Body:**
```json
{
  "id": 1
}
```

**Response:**
```json
{
  "result": {
    "data": true
  }
}
```

---

## Wishlist API

### Get My Wishlist

```
GET /api/trpc/wishlist.getMyWishlist
```

**Response:** Array of wishlist items (product objects)

### Check if Product in Wishlist

```
GET /api/trpc/wishlist.isInWishlist?input={"productId":1}
```

**Parameters:**
- `productId` (number, required) - Product ID

**Response:**
```json
{
  "result": {
    "data": true
  }
}
```

### Add to Wishlist

```
POST /api/trpc/wishlist.add
```

**Body:**
```json
{
  "productId": 1
}
```

**Response:**
```json
{
  "result": {
    "data": true
  }
}
```

### Remove from Wishlist

```
POST /api/trpc/wishlist.remove
```

**Body:**
```json
{
  "productId": 1
}
```

**Response:**
```json
{
  "result": {
    "data": true
  }
}
```

---

## Inventory API

### Get Inventory (Admin)

```
GET /api/trpc/inventory.getByProduct?input={"productId":1}
```

**Parameters:**
- `productId` (number, required) - Product ID

**Response:**
```json
{
  "result": {
    "data": {
      "id": 1,
      "productId": 1,
      "quantity": 25,
      "updatedAt": "2026-04-29T00:00:00Z"
    }
  }
}
```

### Update Inventory (Admin)

```
POST /api/trpc/inventory.update
```

**Body:**
```json
{
  "productId": 1,
  "quantity": 30
}
```

**Response:** Updated inventory object

---

## Orders API

### Get My Orders

```
GET /api/trpc/orders.getMyOrders
```

**Response:**
```json
{
  "result": {
    "data": [
      {
        "id": 1,
        "userId": 5,
        "email": "customer@example.com",
        "totalAmount": "15000",
        "status": "completed",
        "items": [
          {
            "productId": 1,
            "quantity": 1,
            "price": "15000"
          }
        ],
        "createdAt": "2026-04-29T00:00:00Z",
        "updatedAt": "2026-04-29T00:00:00Z"
      }
    ]
  }
}
```

### Create Order

```
POST /api/trpc/orders.create
```

**Body:**
```json
{
  "email": "customer@example.com",
  "totalAmount": "15000",
  "items": [
    {
      "productId": 1,
      "quantity": 1,
      "price": "15000"
    }
  ]
}
```

**Response:** Created order object

### Update Order Status (Admin)

```
POST /api/trpc/orders.updateStatus
```

**Body:**
```json
{
  "orderId": 1,
  "status": "completed"
}
```

**Response:** Updated order object

---

## Newsletter API

### Subscribe to Newsletter

```
POST /api/trpc/newsletter.subscribe
```

**Body:**
```json
{
  "email": "customer@example.com"
}
```

**Response:**
```json
{
  "result": {
    "data": true
  }
}
```

### Unsubscribe from Newsletter

```
POST /api/trpc/newsletter.unsubscribe
```

**Body:**
```json
{
  "email": "customer@example.com"
}
```

**Response:**
```json
{
  "result": {
    "data": true
  }
}
```

### Get Subscribers (Admin)

```
GET /api/trpc/newsletter.getSubscribers
```

**Response:**
```json
{
  "result": {
    "data": [
      {
        "id": 1,
        "email": "customer@example.com",
        "subscribed": 1,
        "createdAt": "2026-04-29T00:00:00Z"
      }
    ]
  }
}
```

---

## Authentication API

### Get Current User

```
GET /api/trpc/auth.me
```

**Response:**
```json
{
  "result": {
    "data": {
      "id": 5,
      "openId": "user-123",
      "name": "John Doe",
      "email": "john@example.com",
      "loginMethod": "manus",
      "role": "user",
      "createdAt": "2026-04-29T00:00:00Z",
      "updatedAt": "2026-04-29T00:00:00Z",
      "lastSignedIn": "2026-04-29T00:00:00Z"
    }
  }
}
```

### Logout

```
POST /api/trpc/auth.logout
```

**Response:**
```json
{
  "result": {
    "data": {
      "success": true
    }
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "message": "Error description",
    "code": "UNAUTHORIZED|FORBIDDEN|NOT_FOUND|BAD_REQUEST|INTERNAL_SERVER_ERROR",
    "data": {
      "code": "error_code"
    }
  }
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| UNAUTHORIZED | 401 | User not authenticated |
| FORBIDDEN | 403 | User lacks required permissions |
| NOT_FOUND | 404 | Resource not found |
| BAD_REQUEST | 400 | Invalid input parameters |
| INTERNAL_SERVER_ERROR | 500 | Server error |

---

## Rate Limiting

No rate limiting implemented in development. Production deployment should implement:
- 100 requests per minute per IP
- 1000 requests per hour per user
- Exponential backoff for retries

---

## CORS

CORS is enabled for:
- `http://localhost:3000` (development)
- `https://*.manus.space` (production)

---

## Examples

### JavaScript/TypeScript (tRPC Client)

```typescript
import { trpc } from '@/lib/trpc';

// Get all products
const { data: products } = trpc.products.getAll.useQuery();

// Search products
const { data: results } = trpc.products.search.useQuery({
  query: 'diamond',
  minPrice: 1000,
  maxPrice: 50000
});

// Create review
const createReview = trpc.reviews.create.useMutation();
await createReview.mutateAsync({
  productId: 1,
  rating: 5,
  title: 'Excellent',
  comment: 'Beautiful ring'
});

// Add to wishlist
const addWishlist = trpc.wishlist.add.useMutation();
await addWishlist.mutateAsync({ productId: 1 });
```

### cURL

```bash
# Get all products
curl "http://localhost:3000/api/trpc/products.getAll"

# Search products
curl "http://localhost:3000/api/trpc/products.search?input=%7B%22query%22:%22diamond%22%7D"

# Create review (requires auth)
curl -X POST "http://localhost:3000/api/trpc/reviews.create" \
  -H "Content-Type: application/json" \
  -H "Cookie: app_session_id=<token>" \
  -d '{"productId":1,"rating":5,"title":"Excellent","comment":"Beautiful ring"}'
```

---

**Last Updated:** April 29, 2026
**Version:** 6d61c71b
**Status:** Production Ready
