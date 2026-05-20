/**
 * Calculate the sale price based on discount type and value
 */
export function calculateSalePrice(
  originalPrice: number,
  discountType: 'percentage' | 'fixed',
  discountValue: number
): number {
  if (discountType === 'percentage') {
    return originalPrice * (1 - discountValue / 100);
  } else {
    return Math.max(0, originalPrice - discountValue);
  }
}

/**
 * Format price with rupee symbol
 */
export function formatPrice(price: number): string {
  return `₹${parseFloat(price.toFixed(2)).toLocaleString()}`;
}

/**
 * Get discount percentage for display
 */
export function getDiscountPercentage(
  originalPrice: number,
  salePrice: number
): number {
  if (originalPrice === 0) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}
