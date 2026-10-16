import React, { useState } from 'react';
import { Eye, ShoppingBag, Heart, Star, Plus, Minus, Check } from 'lucide-react';
import type { Product } from './data';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  onQuickView: (product: Product) => void;
  cartQuantity: number;
  onUpdateCartQuantity: (productId: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  cartQuantity,
  onUpdateCartQuantity,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const fallbackUrl = `https://placehold.co/400x400/e2e8f0/475569?text=${encodeURIComponent(
    product.name
  )}`;

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedOriginalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.originalPrice);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <article
      className={`product-card ${cartQuantity > 0 ? 'in-cart' : ''}`}
      id={`product-${product.id}`}
    >
      {/* Product Image Area */}
      <div className="product-image-container">
        <img
          src={imageError ? fallbackUrl : product.imageUrl}
          alt={product.name}
          className="product-image"
          loading="lazy"
          onError={() => setImageError(true)}
        />

        {/* Badges */}
        <div className="product-badges-top">
          {discountPercent > 0 && (
            <span className="product-discount-pill">
              {discountPercent}% OFF
            </span>
          )}
          <span className="product-category-badge">{product.category}</span>
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
        >
          <Heart
            size={18}
            fill={isWishlisted ? '#ef4444' : 'none'}
            color={isWishlisted ? '#ef4444' : '#64748b'}
          />
        </button>

        {/* Floating Quick View Overlay Button */}
        <div className="image-overlay-actions">
          <button
            type="button"
            className="quick-view-overlay-btn"
            onClick={handleQuickViewClick}
            aria-label={`Quick view ${product.name}`}
          >
            <Eye size={16} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="product-details">
        {/* Rating and Category */}
        <div className="product-meta-row">
          <span className="product-category-label">{product.category}</span>
          <div className="product-rating-pill" title={`${product.rating} stars out of ${product.reviewsCount} reviews`}>
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span className="rating-value">{product.rating}</span>
            <span className="reviews-count">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="product-name"
          title={product.name}
          onClick={handleQuickViewClick}
        >
          {product.name}
        </h3>

        {/* Price Row */}
        <div className="product-price-row">
          <div className="price-group">
            <span className="product-price">{formattedPrice}</span>
            <span className="product-original-price">{formattedOriginalPrice}</span>
          </div>
          <span className="stock-indicator">In Stock</span>
        </div>

        {/* Card Actions: Add to Cart & Quick View */}
        <div className="card-actions-wrapper">
          {cartQuantity === 0 ? (
            <button
              type="button"
              className={`add-to-cart-btn ${justAdded ? 'just-added' : ''}`}
              onClick={handleAddClick}
              aria-label={`Add ${product.name} to cart`}
            >
              {justAdded ? (
                <>
                  <Check size={16} />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          ) : (
            <div className="card-cart-stepper">
              <button
                type="button"
                className="stepper-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateCartQuantity(product.id, cartQuantity - 1);
                }}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="stepper-current-qty">
                <strong>{cartQuantity}</strong> in bag
              </span>
              <button
                type="button"
                className="stepper-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateCartQuantity(product.id, cartQuantity + 1);
                }}
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          )}

          <button
            type="button"
            className="card-quick-view-icon-btn"
            onClick={handleQuickViewClick}
            title="Quick View"
            aria-label={`Quick View ${product.name}`}
          >
            <Eye size={18} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
