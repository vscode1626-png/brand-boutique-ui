import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { products, categories } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const AdminProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (productId: string) => {
    toast({
      title: 'Product Deleted',
      description: 'This is a UI demo. No actual deletion occurred.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl mb-2">Products</h2>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>

        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          Add Product
        </Button>
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
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="admin-card p-0 overflow-hidden">
            <div className="aspect-[4/3] bg-muted">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <div className="flex gap-1">
                  {product.isNew && (
                    <span className="text-xs bg-accent/10 text-accent px-2 py-0.5">New</span>
                  )}
                  {product.featured && (
                    <span className="text-xs bg-brand-gold/10 text-brand-gold px-2 py-0.5">Featured</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="font-medium">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Stock Summary */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.sizes.map((s) => (
                  <span
                    key={s.size}
                    className={`text-xs px-2 py-1 border ${
                      s.stock === 0
                        ? 'border-destructive/30 text-destructive bg-destructive/5'
                        : s.stock <= 3
                        ? 'border-brand-gold/30 text-brand-gold bg-brand-gold/5'
                        : 'border-border text-muted-foreground'
                    }`}
                  >
                    {s.size}: {s.stock}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit size={14} />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="admin-card text-center py-12 text-muted-foreground">
          No products found matching your criteria.
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-primary/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl">Add New Product</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              toast({ title: 'Product Added', description: 'UI demo - no actual product created.' });
              setShowAddModal(false);
            }}>
              <div>
                <label className="block text-sm font-medium mb-2">Product Name</label>
                <input type="text" className="form-input" placeholder="Enter product name" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹)</label>
                  <input type="number" className="form-input" placeholder="1999" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Original Price (₹)</label>
                  <input type="number" className="form-input" placeholder="2499" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className="form-input">
                    {categories.filter(c => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Collection</label>
                  <select className="form-input">
                    <option value="Essentials">Essentials</option>
                    <option value="Street">Street</option>
                    <option value="Heritage">Heritage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea className="form-input min-h-[80px]" placeholder="Enter product description" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input type="url" className="form-input" placeholder="https://..." />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Stock by Size</label>
                <div className="grid grid-cols-4 gap-3">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <div key={size}>
                      <label className="text-xs text-muted-foreground">{size}</label>
                      <input type="number" className="form-input" placeholder="0" min="0" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">Add Product</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
