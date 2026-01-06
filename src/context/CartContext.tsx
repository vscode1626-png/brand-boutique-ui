import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem, Coupon, coupons } from '@/data/mockData';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getDiscount: () => number;
  getFinalTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product, size: string, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { product, size, quantity }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId, size);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const coupon = coupons.find(
      (c) => c.code.toLowerCase() === code.toLowerCase()
    );

    if (!coupon) {
      return { success: false, message: 'Invalid coupon code' };
    }

    if (!coupon.isActive) {
      return { success: false, message: 'This coupon has expired' };
    }

    const currentDate = new Date();
    const expiryDate = new Date(coupon.expiresAt);
    if (currentDate > expiryDate) {
      return { success: false, message: 'This coupon has expired' };
    }

    const cartTotal = getCartTotal();
    if (cartTotal < coupon.minOrder) {
      return {
        success: false,
        message: `Minimum order of ₹${coupon.minOrder} required`,
      };
    }

    setAppliedCoupon(coupon);
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const getDiscount = () => {
    if (!appliedCoupon) return 0;

    const cartTotal = getCartTotal();

    if (appliedCoupon.type === 'flat') {
      return appliedCoupon.value;
    }

    let discount = (cartTotal * appliedCoupon.value) / 100;
    if (appliedCoupon.maxDiscount) {
      discount = Math.min(discount, appliedCoupon.maxDiscount);
    }
    return Math.round(discount);
  };

  const getFinalTotal = () => {
    return getCartTotal() - getDiscount();
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        getDiscount,
        getFinalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
