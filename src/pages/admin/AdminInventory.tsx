import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle } from 'lucide-react';
import { products, categories } from '@/data/mockData';

const AdminInventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('all');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    
    let matchesStock = true;
    if (stockFilter === 'low') {
      matchesStock = product.sizes.some((s) => s.stock > 0 && s.stock <= 3);
    } else if (stockFilter === 'out') {
      matchesStock = product.sizes.some((s) => s.stock === 0);
    }
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  // Calculate stats
  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.sizes.some((s) => s.stock > 0 && s.stock <= 3)).length;
  const outOfStockProducts = products.filter((p) => p.sizes.some((s) => s.stock === 0)).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl mb-2">Inventory</h2>
        <p className="text-muted-foreground">Track stock levels by size</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="admin-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-olive/10 rounded-full flex items-center justify-center">
              <CheckCircle size={18} className="text-brand-olive" />
            </div>
            <div>
              <p className="text-2xl font-medium">{totalProducts}</p>
              <p className="text-sm text-muted-foreground">Total Products</p>
            </div>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center">
              <AlertTriangle size={18} className="text-brand-gold" />
            </div>
            <div>
              <p className="text-2xl font-medium">{lowStockProducts}</p>
              <p className="text-sm text-muted-foreground">Low Stock</p>
            </div>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertTriangle size={18} className="text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-medium">{outOfStockProducts}</p>
              <p className="text-sm text-muted-foreground">Out of Stock Items</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="form-input w-full md:w-48"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="form-input w-full md:w-48"
          >
            <option value="all">All Stock</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="admin-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                  Category
                </th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                  S
                </th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                  M
                </th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                  L
                </th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                  XL
                </th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                  Total
                </th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((product) => {
                const totalStock = product.sizes.reduce((sum, s) => sum + s.stock, 0);
                const hasOutOfStock = product.sizes.some((s) => s.stock === 0);
                const hasLowStock = product.sizes.some((s) => s.stock > 0 && s.stock <= 3);

                const getStockForSize = (sizeName: string) => {
                  const size = product.sizes.find((s) => s.size === sizeName);
                  return size ? size.stock : '-';
                };

                const getStockClass = (stock: number | string) => {
                  if (stock === '-' || stock === 0) return 'text-destructive bg-destructive/5';
                  if (typeof stock === 'number' && stock <= 3) return 'text-brand-gold bg-brand-gold/5';
                  return '';
                };

                return (
                  <tr key={product.id} className="hover:bg-muted/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted overflow-hidden flex-shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium text-sm">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{product.category}</td>
                    {['S', 'M', 'L', 'XL'].map((size) => {
                      const stock = getStockForSize(size);
                      return (
                        <td key={size} className="p-4 text-center">
                          <span
                            className={`inline-flex items-center justify-center w-10 h-8 text-sm font-medium ${getStockClass(stock)}`}
                          >
                            {stock}
                          </span>
                        </td>
                      );
                    })}
                    <td className="p-4 text-center font-medium">{totalStock}</td>
                    <td className="p-4 text-center">
                      {hasOutOfStock ? (
                        <span className="badge-out-stock">Out of Stock</span>
                      ) : hasLowStock ? (
                        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-sm bg-brand-gold/10 text-brand-gold">
                          Low Stock
                        </span>
                      ) : (
                        <span className="badge-in-stock">In Stock</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInventory;
