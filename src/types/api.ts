// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Admin User
export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: 'ADMIN';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: AdminUser;
}

// Product Types
export type ProductCategory = 
  | 'normal-tshirts'
  | 'oversize-tshirts'
  | 'collar-tshirts'
  | 'hoodies'
  | 'customized-tshirts'
  | 'customized-hoodies';

export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductSizeStock {
  S: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
}

export interface ApiProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  images: string[];
  sizes: ProductSizeStock;
  isActive: boolean;
  totalStock: number; // virtual field
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  images: string[];
  sizes: ProductSizeStock;
  isActive?: boolean;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {}

// Order Types
export type PaymentMethod = 'COD' | 'RAZORPAY';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED';
export type OrderStatus = 'PLACED' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderCustomer {
  name: string;
  phone: string;
  address: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  size: ProductSize;
  quantity: number;
  price: number;
}

export interface ApiOrder {
  _id: string;
  invoiceNumber: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  couponCode?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderInput {
  customer: OrderCustomer;
  items: Omit<OrderItem, 'name'>[];
  paymentMethod: PaymentMethod;
  couponCode?: string;
}

export interface UpdateOrderStatusInput {
  orderStatus: OrderStatus;
}

// Coupon Types
export type DiscountType = 'FLAT' | 'PERCENTAGE';

export interface ApiCoupon {
  _id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  expiryDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCouponInput {
  code: string;
  discountType: DiscountType;
  discountValue: number;
  expiryDate: string;
  isActive?: boolean;
}

export interface UpdateCouponInput extends Partial<CreateCouponInput> {}

export interface CouponValidationResult {
  valid: boolean;
  coupon?: ApiCoupon;
  discountAmount?: number;
  message: string;
}

// Home Content (CMS) Types
export interface HeroSlide {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  isActive: boolean;
  order: number;
}

export interface HomeContent {
  _id: string;
  heroSlides: HeroSlide[];
  featuredProducts: string[]; // Product IDs
  newArrivals: string[]; // Product IDs
  uspBadges: {
    icon: string;
    title: string;
    description: string;
  }[];
  updatedAt: string;
}

export interface UpdateHomeContentInput {
  heroSlides?: HeroSlide[];
  featuredProducts?: string[];
  newArrivals?: string[];
  uspBadges?: {
    icon: string;
    title: string;
    description: string;
  }[];
}

// Payment Types
export interface RazorpayKeyResponse {
  key: string;
}

export interface CreatePaymentOrderInput {
  amount: number;
  orderId: string;
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

export interface VerifyPaymentInput {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderId: string;
}

export interface PaymentVerificationResult {
  success: boolean;
  message: string;
  order?: ApiOrder;
}

// Stock Check
export interface StockCheckResult {
  productId: string;
  size: ProductSize;
  available: number;
  inStock: boolean;
}

// Upload Response
export interface UploadResponse {
  success: boolean;
  urls: string[];
}
