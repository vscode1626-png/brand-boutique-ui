// Mock Products Data
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  collection: string;
  images: string[];
  sizes: {
    size: string;
    stock: number;
  }[];
  featured: boolean;
  isNew: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Order {
  id: string;
  invoiceNumber: string;
  customerName: string;
  mobile: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: 'cod' | 'online';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface Coupon {
  code: string;
  type: 'flat' | 'percentage';
  value: number;
  minOrder: number;
  maxDiscount?: number;
  isActive: boolean;
  expiresAt: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Oversized Cotton Tee',
    price: 1499,
    originalPrice: 1999,
    description: 'Premium heavyweight cotton oversized t-shirt with a relaxed fit. Perfect for everyday streetwear styling.',
    category: 'T-Shirts',
    collection: 'Essentials',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
    ],
    sizes: [
      { size: 'S', stock: 5 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 8 },
      { size: 'XL', stock: 0 },
    ],
    featured: true,
    isNew: true,
  },
  {
    id: '2',
    name: 'Minimal Logo Hoodie',
    price: 2999,
    description: 'Soft fleece hoodie with embroidered minimal logo. Features kangaroo pocket and adjustable hood.',
    category: 'Hoodies',
    collection: 'Essentials',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800',
    ],
    sizes: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 7 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 4 },
    ],
    featured: true,
    isNew: false,
  },
  {
    id: '3',
    name: 'Relaxed Cargo Pants',
    price: 3499,
    description: 'Wide-leg cargo pants with multiple utility pockets. Made from durable cotton twill.',
    category: 'Pants',
    collection: 'Street',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800',
    ],
    sizes: [
      { size: 'S', stock: 6 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 2 },
    ],
    featured: true,
    isNew: true,
  },
  {
    id: '4',
    name: 'Vintage Wash Denim Jacket',
    price: 4999,
    originalPrice: 5999,
    description: 'Classic denim jacket with vintage wash finish. Features button closure and chest pockets.',
    category: 'Jackets',
    collection: 'Heritage',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800',
    ],
    sizes: [
      { size: 'S', stock: 2 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 3 },
      { size: 'XL', stock: 1 },
    ],
    featured: false,
    isNew: false,
  },
  {
    id: '5',
    name: 'Structured Cap',
    price: 999,
    description: 'Six-panel structured cap with embroidered logo. Adjustable strap closure.',
    category: 'Accessories',
    collection: 'Essentials',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800',
    ],
    sizes: [
      { size: 'One Size', stock: 15 },
    ],
    featured: false,
    isNew: true,
  },
  {
    id: '6',
    name: 'Cropped Sweatshirt',
    price: 2299,
    description: 'Cropped boxy sweatshirt in soft french terry. Features ribbed cuffs and hem.',
    category: 'Sweatshirts',
    collection: 'Essentials',
    images: [
      'https://images.unsplash.com/photo-1572495532056-8583af1cbae0?w=800',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
    ],
    sizes: [
      { size: 'S', stock: 8 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 6 },
      { size: 'XL', stock: 0 },
    ],
    featured: true,
    isNew: false,
  },
  {
    id: '7',
    name: 'Graphic Print Tee',
    price: 1799,
    description: 'Statement graphic t-shirt with bold back print. Made from 100% organic cotton.',
    category: 'T-Shirts',
    collection: 'Street',
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800',
    ],
    sizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 9 },
      { size: 'L', stock: 7 },
      { size: 'XL', stock: 3 },
    ],
    featured: false,
    isNew: true,
  },
  {
    id: '8',
    name: 'Wool Blend Coat',
    price: 7999,
    description: 'Premium wool blend overcoat with notched lapels. Features two-button closure and side pockets.',
    category: 'Jackets',
    collection: 'Heritage',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800',
    ],
    sizes: [
      { size: 'S', stock: 2 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 3 },
      { size: 'XL', stock: 1 },
    ],
    featured: true,
    isNew: false,
  },
];

export const coupons: Coupon[] = [
  {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minOrder: 1000,
    maxDiscount: 500,
    isActive: true,
    expiresAt: '2025-12-31',
  },
  {
    code: 'FLAT200',
    type: 'flat',
    value: 200,
    minOrder: 1500,
    isActive: true,
    expiresAt: '2025-06-30',
  },
  {
    code: 'SUMMER25',
    type: 'percentage',
    value: 25,
    minOrder: 2000,
    maxDiscount: 1000,
    isActive: true,
    expiresAt: '2025-08-31',
  },
  {
    code: 'EXPIRED',
    type: 'flat',
    value: 100,
    minOrder: 500,
    isActive: false,
    expiresAt: '2024-01-01',
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2025-001',
    customerName: 'Rahul Sharma',
    mobile: '+91 98765 43210',
    address: '123, Park Street, Kolkata, West Bengal - 700016',
    items: [
      {
        product: products[0],
        size: 'M',
        quantity: 2,
      },
      {
        product: products[1],
        size: 'L',
        quantity: 1,
      },
    ],
    subtotal: 5997,
    discount: 500,
    couponCode: 'WELCOME10',
    total: 5497,
    paymentMethod: 'online',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    createdAt: '2025-01-05T10:30:00Z',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2025-002',
    customerName: 'Priya Patel',
    mobile: '+91 87654 32109',
    address: '456, MG Road, Bangalore, Karnataka - 560001',
    items: [
      {
        product: products[2],
        size: 'S',
        quantity: 1,
      },
    ],
    subtotal: 3499,
    discount: 0,
    total: 3499,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'confirmed',
    createdAt: '2025-01-05T14:15:00Z',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2025-003',
    customerName: 'Amit Kumar',
    mobile: '+91 76543 21098',
    address: '789, Linking Road, Mumbai, Maharashtra - 400050',
    items: [
      {
        product: products[3],
        size: 'M',
        quantity: 1,
      },
      {
        product: products[4],
        size: 'One Size',
        quantity: 2,
      },
    ],
    subtotal: 6997,
    discount: 200,
    couponCode: 'FLAT200',
    total: 6797,
    paymentMethod: 'online',
    paymentStatus: 'failed',
    orderStatus: 'pending',
    createdAt: '2025-01-06T09:00:00Z',
  },
];

export const collections = [
  {
    id: 'essentials',
    name: 'Essentials',
    description: 'Timeless basics for everyday wear',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800',
  },
  {
    id: 'street',
    name: 'Street',
    description: 'Bold streetwear with attitude',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800',
  },
  {
    id: 'heritage',
    name: 'Heritage',
    description: 'Classic pieces with modern cuts',
    image: 'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800',
  },
];

export const categories = [
  'All',
  'T-Shirts',
  'Hoodies',
  'Sweatshirts',
  'Pants',
  'Jackets',
  'Accessories',
];

export const banners = [
  {
    id: '1',
    title: 'New Season Arrivals',
    subtitle: 'Discover the latest collection',
    image: 'hero',
    link: '/shop',
    isActive: true,
  },
  {
    id: '2',
    title: 'Summer Sale',
    subtitle: 'Up to 40% off selected items',
    image: 'sale',
    link: '/shop',
    isActive: false,
  },
];
