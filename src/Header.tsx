import React from 'react';
import { ShoppingBag, Heart, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface HeaderProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  wishlistCount: number;
  showWishlistOnly: boolean;
  onToggleWishlistOnly: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  cartCount,
  cartTotal,
  onOpenCart,
  wishlistCount,
  showWishlistOnly,
  onToggleWishlistOnly,
}) => {
  const formattedCartTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(cartTotal);

  return (
    <header className="site-header">
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <span className="announcement-pill">
            <Zap size={13} className="animate-pulse" /> FESTIVE DHAMAKA
          </span>
          <span className="announcement-text">
            Flat <strong>15% OFF</strong> on orders above ₹1,499 &bull; Use code{' '}
            <span className="coupon-code">FESTIVE15</span> &bull; Free Shipping across India!
          </span>
          <div className="announcement-badges">
            <span className="badge-item">
              <ShieldCheck size={13} /> 100% Genuine
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="main-navbar">
        <div className="navbar-container">
          {/* Logo & Brand */}
          <div className="brand-wrapper">
            <div className="brand-logo" role="img" aria-label="TechCresta Logo">
              <Sparkles className="brand-icon" size={22} />
            </div>
            <div className="brand-text-group">
              <div className="brand-title-row">
                <span className="brand-name">TechCresta</span>
                <span className="brand-tag">PRO</span>
              </div>
              <span className="brand-slogan">Product Explorer</span>
            </div>
          </div>

          {/* Category Navigation Pills */}
          <nav className="header-nav" aria-label="Category Navigation">
            <button
              type="button"
              className={`nav-pill ${selectedCategory === 'All' && !showWishlistOnly ? 'active' : ''}`}
              onClick={() => {
                if (showWishlistOnly) onToggleWishlistOnly();
                onSelectCategory('All');
              }}
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`nav-pill ${selectedCategory === cat && !showWishlistOnly ? 'active' : ''}`}
                onClick={() => {
                  if (showWishlistOnly) onToggleWishlistOnly();
                  onSelectCategory(cat);
                }}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="header-actions">
            {/* Wishlist Button */}
            <button
              type="button"
              className={`action-btn wishlist-btn ${showWishlistOnly ? 'active' : ''}`}
              onClick={onToggleWishlistOnly}
              title={showWishlistOnly ? 'Show all products' : 'View Wishlist'}
              aria-label="Wishlist"
            >
              <Heart
                size={20}
                className={wishlistCount > 0 ? 'heart-filled' : ''}
                fill={showWishlistOnly || wishlistCount > 0 ? '#ef4444' : 'none'}
                color={showWishlistOnly || wishlistCount > 0 ? '#ef4444' : 'currentColor'}
              />
              <span className="btn-label">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="counter-badge wishlist-badge">{wishlistCount}</span>
              )}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              id="header-cart-btn"
              className="action-btn cart-btn"
              onClick={onOpenCart}
              aria-label={`Open Cart (${cartCount} items)`}
            >
              <div className="cart-icon-wrapper">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="counter-badge cart-badge animate-bounce-subtle">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="cart-btn-info">
                <span className="cart-label">Bag</span>
                <span className="cart-price">{cartCount > 0 ? formattedCartTotal : '₹0'}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
