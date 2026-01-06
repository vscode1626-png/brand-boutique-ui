import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { Tag, X, CreditCard, Truck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type PaymentMethod = 'cod' | 'online';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    getCartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getDiscount,
    getFinalTotal,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const cartTotal = getCartTotal();
  const discount = getDiscount();
  const finalTotal = getFinalTotal();
  const shipping = cartTotal >= 2000 ? 0 : 199;
  const grandTotal = finalTotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    const result = applyCoupon(couponCode);
    if (result.success) {
      toast({ title: result.message });
      setCouponCode('');
    } else {
      setCouponError(result.message);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponCode('');
    setCouponError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.mobile || !formData.address) {
      toast({
        title: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }

    // Generate mock invoice number
    const invoiceNumber = `INV-${Date.now().toString().slice(-8)}`;

    // Navigate to confirmation with order data
    navigate('/order-confirmation', {
      state: {
        invoiceNumber,
        customerName: formData.name,
        items,
        subtotal: cartTotal,
        discount,
        couponCode: appliedCoupon?.code,
        shipping,
        total: grandTotal,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      },
    });

    clearCart();
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="font-display text-4xl mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery Details */}
              <div>
                <h2 className="font-display text-xl mb-6">Delivery Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Delivery Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-input min-h-[100px]"
                      placeholder="Enter your complete delivery address with PIN code"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="font-display text-xl mb-6">Payment Method</h2>
                <div className="space-y-3">
                  <label
                    className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="w-4 h-4 accent-primary"
                    />
                    <Truck size={20} className="text-muted-foreground" />
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        Pay when your order arrives
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${
                      paymentMethod === 'online'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      className="w-4 h-4 accent-primary"
                    />
                    <CreditCard size={20} className="text-muted-foreground" />
                    <div>
                      <p className="font-medium">Online Payment</p>
                      <p className="text-sm text-muted-foreground">
                        Pay securely with Razorpay (Cards, UPI, Netbanking)
                      </p>
                    </div>
                  </label>

                  {paymentMethod === 'online' && (
                    <div className="p-4 bg-muted/50 border border-dashed border-border">
                      <p className="text-sm text-muted-foreground text-center">
                        Razorpay payment gateway will be triggered on order placement.
                        <br />
                        <span className="text-xs">(Simulated for demo)</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-secondary/50 p-6 sticky top-24">
                <h2 className="font-display text-xl mb-6">Order Summary</h2>

                {/* Cart Items Preview */}
                <div className="space-y-4 pb-6 border-b border-border">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-3"
                    >
                      <div className="w-16 h-20 bg-muted flex-shrink-0 overflow-hidden">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.size} × {item.quantity}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code */}
                <div className="py-6 border-b border-border">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-accent/10 border border-accent/30">
                      <div className="flex items-center gap-2">
                        <Tag size={16} className="text-accent" />
                        <span className="text-sm font-medium">{appliedCoupon.code}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          placeholder="Enter coupon code"
                          className="form-input flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleApplyCoupon}
                        >
                          Apply
                        </Button>
                      </div>
                      {couponError && (
                        <p className="text-sm text-destructive mt-2">{couponError}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Try: WELCOME10, FLAT200, SUMMER25
                      </p>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 py-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-accent">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                </div>

                <div className="flex justify-between py-6 text-lg font-medium">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>

                <Button variant="hero" className="w-full" type="submit">
                  {paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
