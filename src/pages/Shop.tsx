import React, { useState, useMemo } from 'react';
import { products, categories } from '@/data/mockData';
import ProductCard from '@/components/products/ProductCard';
import Layout from '@/components/layout/Layout';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    
    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    return result;
  }, [selectedCategory, sortBy]);

  return (
    <Layout>
      {/* Page Header */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="text-center">
            <p className="section-subtitle">Explore Our Collection</p>
            <h1 className="section-title">Shop All</h1>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-border">
            {/* Mobile Filter Toggle */}
            <button
              className="md:hidden flex items-center gap-2 text-sm font-medium"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={16} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {/* Categories - Desktop */}
            <div className="hidden md:flex items-center gap-4 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-sm font-medium tracking-wider uppercase transition-colors ${
                    selectedCategory === category
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm font-medium bg-transparent border-none focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mb-8 p-4 bg-secondary/50 animate-slide-down">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Categories</h4>
                <button onClick={() => setShowFilters(false)}>
                  <X size={18} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowFilters(false);
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
