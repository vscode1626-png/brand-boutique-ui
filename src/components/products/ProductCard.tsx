import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/mockData';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const isOutOfStock = product.sizes.every((s) => s.stock === 0);

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block product-card"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover img-zoom"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 tracking-wider uppercase">
              New
            </span>
          )}
          {hasDiscount && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 tracking-wider uppercase">
              Sale
            </span>
          )}
        </div>

        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="text-sm font-medium tracking-wider uppercase">
              Sold Out
            </span>
          </div>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="text-xs text-muted-foreground tracking-wider uppercase">
          {product.category}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">₹{product.price.toLocaleString()}</span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice?.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
