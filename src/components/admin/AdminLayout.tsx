import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Image, 
  BarChart3,
  LogOut 
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Inventory', path: '/admin/inventory', icon: BarChart3 },
    { name: 'Banners', path: '/admin/banners', icon: Image },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-primary text-primary-foreground flex flex-col z-50">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-primary-foreground/10">
          <Link to="/" className="font-display text-xl font-medium tracking-tight">
            ATELIER
          </Link>
          <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5">Admin</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-foreground/10 text-primary-foreground'
                      : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5'
                  }`}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-primary-foreground/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <LogOut size={18} />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
          <h1 className="font-display text-xl">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Welcome, Admin</p>
        </header>

        {/* Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
