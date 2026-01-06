import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { CartItem } from '@/data/mockData';

interface OrderData {
  invoiceNumber: string;
  customerName: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shipping: number;
  total: number;
  paymentMethod: 'cod' | 'online';
  paymentStatus: 'pending' | 'paid';
}

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const orderData = location.state as OrderData | null;

  if (!orderData) {
    return <Navigate to="/" replace />;
  }

  const generateWhatsAppMessage = () => {
    const itemsList = orderData.items
      .map((item) => `• ${item.product.name} (${item.size}) x ${item.quantity}`)
      .join('\n');

    const message = `🛍️ *New Order Placed!*

📋 *Invoice:* ${orderData.invoiceNumber}
👤 *Customer:* ${orderData.customerName}

*Order Details:*
${itemsList}

💰 *Subtotal:* ₹${orderData.subtotal.toLocaleString()}
${orderData.discount > 0 ? `🎟️ *Discount:* -₹${orderData.discount.toLocaleString()}` : ''}
🚚 *Shipping:* ${orderData.shipping === 0 ? 'Free' : `₹${orderData.shipping}`}
*Total:* ₹${orderData.total.toLocaleString()}

💳 *Payment:* ${orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
📊 *Status:* ${orderData.paymentStatus === 'paid' ? 'Paid' : 'Pending'}`;

    return encodeURIComponent(message);
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-olive/10 flex items-center justify-center">
            <CheckCircle size={40} className="text-brand-olive" />
          </div>

          <h1 className="font-display text-4xl mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your order. We've received your order and will process it shortly.
          </p>

          {/* Invoice Number */}
          <div className="bg-secondary/50 p-6 mb-8 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <h2 className="font-display text-xl">Order Details</h2>
              <span className="font-mono text-sm bg-primary text-primary-foreground px-3 py-1">
                {orderData.invoiceNumber}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-4 pb-4 border-b border-border">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.product.name} ({item.size}) × {item.quantity}
                  </span>
                  <span className="font-medium">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="space-y-2 py-4 border-b border-border text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{orderData.subtotal.toLocaleString()}</span>
              </div>
              {orderData.discount > 0 && (
                <div className="flex justify-between text-accent">
                  <span>Discount ({orderData.couponCode})</span>
                  <span>-₹{orderData.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{orderData.shipping === 0 ? 'Free' : `₹${orderData.shipping}`}</span>
              </div>
            </div>

            <div className="flex justify-between py-4 text-lg font-medium">
              <span>Total</span>
              <span>₹{orderData.total.toLocaleString()}</span>
            </div>

            {/* Payment Info */}
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium">
                  {orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <span
                  className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-sm ${
                    orderData.paymentStatus === 'paid'
                      ? 'bg-brand-olive/10 text-brand-olive'
                      : 'bg-brand-gold/10 text-brand-gold'
                  }`}
                >
                  {orderData.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" asChild>
              <Link to="/shop">
                Continue Shopping
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
            >
              <a
                href={`https://wa.me/?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={16} />
                Share on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
