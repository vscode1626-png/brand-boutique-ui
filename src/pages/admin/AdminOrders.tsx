import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, MessageCircle } from 'lucide-react';
import { mockOrders } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const AdminOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const generateDailySummary = () => {
    const today = new Date().toLocaleDateString();
    const todayOrders = mockOrders.length;
    const todayRevenue = mockOrders.reduce((sum, o) => sum + o.total, 0);
    
    const message = `📊 *RICH CLUB Daily Summary*
📅 Date: ${today}

📦 *Orders Today:* ${todayOrders}
💰 *Total Revenue:* ₹${todayRevenue.toLocaleString()}

*Order Breakdown:*
• Pending: ${mockOrders.filter(o => o.orderStatus === 'pending').length}
• Confirmed: ${mockOrders.filter(o => o.orderStatus === 'confirmed').length}
• Shipped: ${mockOrders.filter(o => o.orderStatus === 'shipped').length}
• Delivered: ${mockOrders.filter(o => o.orderStatus === 'delivered').length}

*Payment Status:*
• Paid: ${mockOrders.filter(o => o.paymentStatus === 'paid').length}
• Pending: ${mockOrders.filter(o => o.paymentStatus === 'pending').length}
• Failed: ${mockOrders.filter(o => o.paymentStatus === 'failed').length}`;

    return encodeURIComponent(message);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl mb-2">Orders</h2>
          <p className="text-muted-foreground">Manage customer orders</p>
        </div>

        <Button variant="outline" asChild>
          <a
            href={`https://wa.me/?text=${generateDailySummary()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} />
            Send Daily Summary
          </a>
        </Button>
      </div>

      {/* Filters */}
      <div className="admin-card">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search by invoice or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-input w-full md:w-48"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                  Invoice
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                  Customer
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                  Items
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                  Total
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                  Order Status
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                  Payment
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/30">
                  <td className="p-4">
                    <span className="font-mono text-sm">{order.invoiceNumber}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-sm">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.mobile}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{order.items.length} items</td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-sm">₹{order.total.toLocaleString()}</p>
                      {order.discount > 0 && (
                        <p className="text-xs text-accent">-₹{order.discount} off</p>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-sm ${
                        order.orderStatus === 'delivered'
                          ? 'bg-brand-olive/10 text-brand-olive'
                          : order.orderStatus === 'shipped'
                          ? 'bg-accent/10 text-accent'
                          : order.orderStatus === 'confirmed'
                          ? 'bg-brand-gold/10 text-brand-gold'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">
                        {order.paymentMethod === 'cod' ? 'COD' : 'Online'}
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-sm w-fit ${
                          order.paymentStatus === 'paid'
                            ? 'bg-brand-olive/10 text-brand-olive'
                            : order.paymentStatus === 'failed'
                            ? 'bg-destructive/10 text-destructive'
                            : 'bg-brand-gold/10 text-brand-gold'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Link to={`/admin/orders/${order.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            No orders found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
