import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
  } = useCart();

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  if (cartCount === 0) {
    return (
      <Layout>
        <div className="container py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag size={32} className="text-muted-foreground" />
            </div>
            <h1 className="font-display text-3xl mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button variant="hero" asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="font-display text-4xl mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-6 pb-6 border-b border-border"
              >
                {/* Product Image */}
                <Link
                  to={`/product/${item.product.id}`}
                  className="w-28 h-36 bg-muted flex-shrink-0 overflow-hidden"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      to={`/product/${item.product.id}`}
                      className="font-medium hover:text-accent transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      Size: {item.size}
                    </p>
                    <p className="font-medium mt-2">
                      ₹{item.product.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="inline-flex items-center border border-border">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.quantity - 1)
                        }
                        className="qty-btn"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.size, item.quantity + 1)
                        }
                        className="qty-btn"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Line Total */}
                <div className="text-right">
                  <p className="font-medium">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary/50 p-6 sticky top-24">
              <h2 className="font-display text-xl mb-6">Order Summary</h2>
              
              <div className="space-y-3 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({cartCount} items)</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{cartTotal >= 2000 ? 'Free' : '₹199'}</span>
                </div>
              </div>

              <div className="flex justify-between py-6 text-lg font-medium">
                <span>Total</span>
                <span>₹{(cartTotal + (cartTotal >= 2000 ? 0 : 199)).toLocaleString()}</span>
              </div>

              <Button
                variant="hero"
                className="w-full mb-4"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </Button>

              <Link
                to="/shop"
                className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Continue Shopping
              </Link>

              {cartTotal < 2000 && (
                <p className="mt-6 text-sm text-center text-muted-foreground">
                  Add ₹{(2000 - cartTotal).toLocaleString()} more for free shipping
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
