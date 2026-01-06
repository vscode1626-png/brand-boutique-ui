import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, MessageCircle, Printer } from 'lucide-react';
import { mockOrders } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const AdminOrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const order = mockOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="font-display text-2xl mb-4">Order not found</h2>
        <Button variant="outline" onClick={() => navigate('/admin/orders')}>
          Back to Orders
        </Button>
      </div>
    );
  }

  const generateWhatsAppMessage = () => {
    const itemsList = order.items
      .map((item) => `• ${item.product.name} (${item.size}) x ${item.quantity} - ₹${(item.product.price * item.quantity).toLocaleString()}`)
      .join('\n');

    const message = `📦 *Order Notification*

📋 *Invoice:* ${order.invoiceNumber}
📅 *Date:* ${new Date(order.createdAt).toLocaleDateString()}

👤 *Customer Details:*
Name: ${order.customerName}
Mobile: ${order.mobile}
Address: ${order.address}

🛍️ *Order Items:*
${itemsList}

💰 *Payment Summary:*
Subtotal: ₹${order.subtotal.toLocaleString()}
${order.discount > 0 ? `Discount (${order.couponCode}): -₹${order.discount.toLocaleString()}` : ''}
Total: ₹${order.total.toLocaleString()}

💳 Payment: ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
📊 Status: ${order.paymentStatus}`;

    return encodeURIComponent(message);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/orders')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft size={16} />
            Back
          </button>
          <div>
            <h2 className="font-display text-2xl">Order Details</h2>
            <p className="font-mono text-sm text-muted-foreground">{order.invoiceNumber}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Printer size={16} />
            Print Invoice
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href={`https://wa.me/${order.mobile.replace(/\D/g, '')}?text=${generateWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={16} />
              Notify Customer
            </a>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="admin-card">
            <h3 className="font-medium mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="w-16 h-20 bg-muted overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size} • Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-medium mt-1">
                      ₹{item.product.price.toLocaleString()} each
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Info */}
          <div className="admin-card">
            <h3 className="font-medium mb-4">Customer Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Customer Name</p>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Mobile Number</p>
                <p className="font-medium">{order.mobile}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground mb-1">Delivery Address</p>
                <p className="font-medium">{order.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="admin-card">
            <h3 className="font-medium mb-4">Order Status</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Status</p>
                <select className="form-input" defaultValue={order.orderStatus}>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
                <span
                  className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-sm ${
                    order.paymentStatus === 'paid'
                      ? 'bg-brand-olive/10 text-brand-olive'
                      : order.paymentStatus === 'failed'
                      ? 'bg-destructive/10 text-destructive'
                      : 'bg-brand-gold/10 text-brand-gold'
                  }`}
                >
                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                <p className="font-medium">
                  {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="admin-card">
            <h3 className="font-medium mb-4">Payment Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{order.subtotal.toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-accent">
                  <span>Discount ({order.couponCode})</span>
                  <span>-₹{order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-border font-medium text-base">
                <span>Total</span>
                <span>₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="admin-card">
            <h3 className="font-medium mb-4">Order Timeline</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-brand-olive"></div>
                <div>
                  <p className="text-sm font-medium">Order Placed</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
