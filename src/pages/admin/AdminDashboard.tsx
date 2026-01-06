import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Package, 
  DollarSign, 
  TrendingUp,
  ArrowRight 
} from 'lucide-react';
import { mockOrders, products } from '@/data/mockData';

const AdminDashboard: React.FC = () => {
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = products.length;
  const pendingOrders = mockOrders.filter((o) => o.orderStatus === 'pending').length;

  const stats = [
    {
      name: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'bg-accent/10 text-accent',
    },
    {
      name: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-brand-olive/10 text-brand-olive',
    },
    {
      name: 'Products',
      value: totalProducts,
      icon: Package,
      color: 'bg-brand-gold/10 text-brand-gold',
    },
    {
      name: 'Pending Orders',
      value: pendingOrders,
      icon: TrendingUp,
      color: 'bg-destructive/10 text-destructive',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl mb-2">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your store performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="admin-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.name}</p>
                <p className="text-2xl font-medium">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="admin-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl">Recent Orders</h3>
          <Link 
            to="/admin/orders" 
            className="text-sm text-accent hover:underline flex items-center gap-1"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                  Invoice
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                  Customer
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                  Total
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockOrders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-muted/50">
                  <td className="py-4">
                    <Link 
                      to={`/admin/orders/${order.id}`}
                      className="font-mono text-sm hover:text-accent"
                    >
                      {order.invoiceNumber}
                    </Link>
                  </td>
                  <td className="py-4 text-sm">{order.customerName}</td>
                  <td className="py-4 text-sm font-medium">₹{order.total.toLocaleString()}</td>
                  <td className="py-4">
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
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-sm ${
                        order.paymentStatus === 'paid'
                          ? 'bg-brand-olive/10 text-brand-olive'
                          : order.paymentStatus === 'failed'
                          ? 'bg-destructive/10 text-destructive'
                          : 'bg-brand-gold/10 text-brand-gold'
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/products" className="admin-card hover:shadow-card transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
              <Package size={20} />
            </div>
            <div>
              <h4 className="font-medium">Manage Products</h4>
              <p className="text-sm text-muted-foreground">Add, edit, or remove products</p>
            </div>
          </div>
        </Link>

        <Link to="/admin/inventory" className="admin-card hover:shadow-card transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <div>
              <h4 className="font-medium">Check Inventory</h4>
              <p className="text-sm text-muted-foreground">View stock levels by size</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
