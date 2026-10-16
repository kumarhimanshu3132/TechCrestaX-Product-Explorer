import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Zap,
  CheckCircle2,
  Truck,
  RotateCcw,
  ShieldCheck,
  Heart,
  Plus,
  Minus,
} from 'lucide-react';
import type { Product } from './data';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

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

  const savings = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.originalPrice - product.price);

  const fallbackUrl = `https://placehold.co/600x600/e2e8f0/475569?text=${encodeURIComponent(
    product.name
  )}`;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      onClick={onClose}
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        <div className="modal-content-grid">
          {/* Left Column: Product Image Gallery */}
          <div className="modal-image-col">
            <div className="modal-image-frame">
              <img
                src={imageError ? fallbackUrl : product.imageUrl}
                alt={product.name}
                className="modal-image"
                onError={() => setImageError(true)}
              />
              <span className="modal-discount-tag">{discountPercent}% OFF</span>
              <button
                type="button"
                className={`modal-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist(product)}
                aria-label="Toggle Wishlist"
              >
                <Heart
                  size={20}
                  fill={isWishlisted ? '#ef4444' : 'none'}
                  color={isWishlisted ? '#ef4444' : '#64748b'}
                />
              </button>
            </div>
            <div className="modal-trust-pills">
              <span className="trust-pill">
                <Truck size={14} /> Free Delivery
              </span>
              <span className="trust-pill">
                <RotateCcw size={14} /> 7-Day Returns
              </span>
              <span className="trust-pill">
                <ShieldCheck size={14} /> Certified Genuine
              </span>
            </div>
          </div>

          {/* Right Column: Product Information & Actions */}
          <div className="modal-info-col">
            <div className="modal-category-badge">{product.category}</div>
            <h2 id="quick-view-title" className="modal-title">
              {product.name}
            </h2>

            {/* Rating & Reviews */}
            <div className="modal-rating-row">
              <div className="modal-star-pill">
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                <span>{product.rating}</span>
              </div>
              <span className="modal-reviews-count">
                ({product.reviewsCount} customer ratings)
              </span>
              <span className="modal-stock-badge">
                <span className="stock-dot"></span> In Stock
              </span>
            </div>

            {/* Price Section */}
            <div className="modal-price-box">
              <div className="modal-price-row">
                <span className="modal-current-price">{formattedPrice}</span>
                <span className="modal-original-price">{formattedOriginalPrice}</span>
                <span className="modal-savings-badge">Save {savings}</span>
              </div>
              <p className="modal-tax-note">Inclusive of all taxes &bull; Cash on Delivery Available</p>
            </div>

            {/* Description */}
            <p className="modal-description">{product.description}</p>

            {/* Feature Highlights */}
            {product.features && product.features.length > 0 && (
              <div className="modal-features-list">
                <h4 className="features-title">Highlights:</h4>
                <ul>
                  {product.features.map((feat, index) => (
                    <li key={index}>
                      <CheckCircle2 size={16} className="feature-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector & CTAs */}
            <div className="modal-cta-section">
              <div className="quantity-group">
                <label className="quantity-label">Quantity:</label>
                <div className="quantity-stepper">
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="stepper-value">{quantity}</span>
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              <div className="modal-buttons-row">
                <button
                  type="button"
                  id="modal-add-to-cart-btn"
                  className={`modal-btn primary-btn ${addedAnimation ? 'btn-success' : ''}`}
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={18} />
                  <span>{addedAnimation ? 'Added to Bag ✓' : 'Add to Bag'}</span>
                </button>

                <button
                  type="button"
                  id="modal-buy-now-btn"
                  className="modal-btn secondary-btn"
                  onClick={handleBuyNow}
                >
                  <Zap size={18} />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
