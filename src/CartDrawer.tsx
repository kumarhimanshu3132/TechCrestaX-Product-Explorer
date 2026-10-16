import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Truck,
  Sparkles,
} from 'lucide-react';
import type { CartItem } from './types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const FREE_SHIPPING_THRESHOLD = 499;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = subtotal === 0 || isFreeShipping ? 0 : 49;
  const grandTotal = subtotal + shippingFee;
  const progressPercent = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  const handleCheckout = () => {
    const randomId = 'CRX-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setCheckoutSuccess(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutSuccess(false);
      onClose();
    }, 2800);
  };

  return (
    <div
      className="cart-drawer-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      onClick={onClose}
    >
      <div
        className="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag className="cart-title-icon" size={22} />
            <h3>Your Shopping Bag</h3>
            <span className="cart-item-pill">{totalItems}</span>
          </div>

          <div className="cart-header-actions">
            {items.length > 0 && (
              <button
                type="button"
                className="cart-clear-btn"
                onClick={onClearCart}
                title="Clear all items"
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              className="cart-close-btn"
              onClick={onClose}
              aria-label="Close cart drawer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Free Shipping Meter */}
        {items.length > 0 && (
          <div className="shipping-meter-container">
            <div className="shipping-meter-header">
              <Truck size={16} className="truck-icon" />
              <span className="shipping-text">
                {isFreeShipping ? (
                  <>
                    <strong className="shipping-highlight">Congratulations!</strong> You unlocked{' '}
                    <strong>FREE Delivery</strong>! 🎉
                  </>
                ) : (
                  <>
                    Add{' '}
                    <strong className="shipping-highlight">
                      {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)}
                    </strong>{' '}
                    more for <strong>FREE Delivery</strong>
                  </>
                )}
              </span>
            </div>
            <div className="shipping-progress-track">
              <div
                className={`shipping-progress-bar ${isFreeShipping ? 'unlocked' : ''}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Drawer Body */}
        <div className="cart-body">
          {checkoutSuccess ? (
            <div className="checkout-success-view">
              <div className="success-icon-wrapper">
                <CheckCircle size={56} className="success-check" />
              </div>
              <h3>Order Placed Successfully!</h3>
              <p className="order-id-label">
                Order ID: <strong>#{orderId}</strong>
              </p>
              <p className="success-description">
                Thank you for shopping with us! A confirmation email and tracking link have been dispatched.
              </p>
              <div className="celebration-pill">
                <Sparkles size={16} /> Packaging your order with care
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-cart-icon-bg">
                <ShoppingBag size={48} className="empty-cart-icon" />
              </div>
              <h4>Your bag is feeling lonely!</h4>
              <p>Explore our curated Indian marketplace collection and add your favorite items.</p>
              <button
                type="button"
                className="empty-cart-shop-btn"
                onClick={onClose}
              >
                Start Shopping Now
              </button>
            </div>
          ) : (
            <ul className="cart-items-list">
              {items.map(({ product, quantity }) => {
                const itemTotalPrice = product.price * quantity;
                const fallbackUrl = `https://placehold.co/120x120/e2e8f0/475569?text=${encodeURIComponent(
                  product.name
                )}`;

                return (
                  <li key={product.id} className="cart-item-row">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="cart-item-image"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackUrl;
                      }}
                    />

                    <div className="cart-item-details">
                      <div className="cart-item-top">
                        <span className="cart-item-category">{product.category}</span>
                        <button
                          type="button"
                          className="cart-item-remove-btn"
                          onClick={() => onRemoveItem(product.id)}
                          aria-label={`Remove ${product.name}`}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <h4 className="cart-item-name" title={product.name}>
                        {product.name}
                      </h4>

                      <div className="cart-item-bottom">
                        <div className="cart-item-stepper">
                          <button
                            type="button"
                            className="cart-stepper-btn"
                            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="cart-stepper-val">{quantity}</span>
                          <button
                            type="button"
                            className="cart-stepper-btn"
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <div className="cart-item-prices">
                          <span className="cart-item-total">{formatCurrency(itemTotalPrice)}</span>
                          {quantity > 1 && (
                            <span className="cart-item-unit">
                              {formatCurrency(product.price)} each
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Drawer Footer */}
        {!checkoutSuccess && items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-card">
              <div className="summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span className={isFreeShipping ? 'text-free' : ''}>
                  {isFreeShipping ? 'FREE' : formatCurrency(shippingFee)}
                </span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row grand-total-row">
                <span>Estimated Total</span>
                <span className="grand-total-amount">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              id="cart-checkout-btn"
              className="cart-checkout-btn"
              onClick={handleCheckout}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div className="cart-security-badge">
              <ShieldCheck size={15} />
              <span>100% Safe &amp; Secure Payment &bull; Instant Delivery Updates</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
