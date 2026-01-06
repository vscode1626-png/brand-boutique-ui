import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, collections } from '@/data/mockData';
import ProductCard from '@/components/products/ProductCard';
import Layout from '@/components/layout/Layout';
import heroBanner from '@/assets/hero-banner.jpg';

const Index: React.FC = () => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="New Season Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-xl animate-fade-in">
            <p className="text-primary-foreground/80 text-sm tracking-[0.3em] uppercase mb-4">
              New Season 2025
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-primary-foreground font-light leading-tight mb-6">
              Redefine Your Style
            </h1>
            <p className="text-primary-foreground/70 text-lg mb-8 max-w-md">
              Discover our latest collection of contemporary essentials crafted for the modern individual.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero-outline" asChild>
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/shop" className="flex items-center gap-2">
                  View Collection <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <p className="section-subtitle">Curated For You</p>
            <h2 className="section-title">Shop by Collection</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((collection, index) => (
              <Link
                key={collection.id}
                to="/shop"
                className="group relative aspect-[4/5] overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="font-display text-3xl text-primary-foreground mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm mb-4">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary-foreground text-sm font-medium tracking-wider uppercase group-hover:gap-4 transition-all">
                    Explore <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <p className="section-subtitle text-left">Handpicked Favorites</p>
              <h2 className="section-title text-left">Featured Products</h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase hover:gap-4 transition-all"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight Banner */}
      <section className="py-20">
        <div className="container">
          <div className="relative bg-primary overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
            </div>
            <div className="relative grid md:grid-cols-2 items-center gap-8 p-8 md:p-16">
              <div>
                <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-4">
                  Limited Time Offer
                </p>
                <h2 className="font-display text-4xl md:text-5xl text-primary-foreground font-light mb-4">
                  Get 20% Off Your First Order
                </h2>
                <p className="text-primary-foreground/70 mb-8">
                  Use code <span className="font-medium text-primary-foreground">WELCOME10</span> at checkout
                </p>
                <Button variant="hero-outline" asChild>
                  <Link to="/shop">Shop Now</Link>
                </Button>
              </div>
              <div className="hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600"
                  alt="Fashion promo"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <p className="section-subtitle text-left">Just Dropped</p>
              <h2 className="section-title text-left">New Arrivals</h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase hover:gap-4 transition-all"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-t border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="font-display text-xl mb-2">Free Shipping</h4>
              <p className="text-sm text-muted-foreground">On orders above ₹2,000</p>
            </div>
            <div>
              <h4 className="font-display text-xl mb-2">Easy Returns</h4>
              <p className="text-sm text-muted-foreground">7-day return policy</p>
            </div>
            <div>
              <h4 className="font-display text-xl mb-2">Secure Payment</h4>
              <p className="text-sm text-muted-foreground">100% secure checkout</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
