import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { products } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { toast } from '@/hooks/use-toast';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-medium mb-4">Product not found</h1>
          <Button variant="outline" onClick={() => navigate('/shop')}>
            Back to Shop
          </Button>
        </div>
      </Layout>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: 'Please select a size',
        variant: 'destructive',
      });
      return;
    }

    const sizeStock = product.sizes.find((s) => s.size === selectedSize);
    if (!sizeStock || sizeStock.stock === 0) {
      toast({
        title: 'This size is out of stock',
        variant: 'destructive',
      });
      return;
    }

    addToCart(product, selectedSize, quantity);
    toast({
      title: 'Added to cart',
      description: `${product.name} (${selectedSize}) x ${quantity}`,
    });
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-muted overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-24 overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-muted-foreground tracking-wider uppercase mb-2">
                {product.category} • {product.collection}
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-medium">
                  ₹{product.price.toLocaleString()}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.originalPrice?.toLocaleString()}
                    </span>
                    <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 tracking-wider uppercase">
                      Sale
                    </span>
                  </>
                )}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium uppercase tracking-wider">Select Size</h4>
                <button className="text-sm text-muted-foreground hover:text-foreground underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((sizeOption) => {
                  const isOutOfStock = sizeOption.stock === 0;
                  const isSelected = selectedSize === sizeOption.size;
                  
                  return (
                    <button
                      key={sizeOption.size}
                      onClick={() => !isOutOfStock && setSelectedSize(sizeOption.size)}
                      disabled={isOutOfStock}
                      className={`
                        ${isSelected ? 'size-btn-active' : isOutOfStock ? 'size-btn-disabled' : 'size-btn'}
                      `}
                    >
                      {sizeOption.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h4 className="text-sm font-medium uppercase tracking-wider mb-3">Quantity</h4>
              <div className="inline-flex items-center border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                >
                  <Minus size={16} />
                </button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              variant="hero"
              className="w-full"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} />
              Add to Cart
            </Button>

            {/* Additional Info */}
            <div className="pt-8 border-t border-border space-y-4 text-sm text-muted-foreground">
              <p>✓ Free shipping on orders above ₹2,000</p>
              <p>✓ Easy 7-day returns</p>
              <p>✓ 100% secure checkout</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-3xl">You May Also Like</h2>
              <Link
                to="/shop"
                className="text-sm font-medium tracking-wider uppercase hover:text-accent transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
