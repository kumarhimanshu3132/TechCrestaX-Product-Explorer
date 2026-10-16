import { useState, useMemo, useEffect } from 'react';
import { products, type Product } from './data';
import { ProductCard } from './ProductCard';
import { FilterBar } from './FilterBar';
import { Header } from './Header';
import { QuickViewModal } from './QuickViewModal';
import { CartDrawer } from './CartDrawer';
import { Toast } from './Toast';
import type { CartItem, ToastInfo } from './types';
import { Heart, Sparkles, ShoppingBag } from 'lucide-react';
import './App.css';

const CART_STORAGE_KEY = 'techcresta_cart_v1';
const WISHLIST_STORAGE_KEY = 'techcresta_wishlist_v1';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortPrice, setSortPrice] = useState<boolean>(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState<boolean>(false);

  // Cart State (initialized from localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (initialized from localStorage)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<ToastInfo | null>(null);

  // Save Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Save Wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  // Derived Categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, []);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by Wishlist if active
    if (showWishlistOnly) {
      result = result.filter((p) => wishlistIds.includes(p.id));
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort by Price (Low to High)
    if (sortPrice) {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    return result;
  }, [searchQuery, selectedCategory, sortPrice, showWishlistOnly, wishlistIds]);

  // Cart Metrics
  const totalCartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const totalCartPrice = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setToast({
      id: `${Date.now()}-${product.id}`,
      message: `${product.name} (x${quantity}) added to your bag.`,
      product,
      type: 'cart',
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setIsCartOpen(true);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    const isSaved = wishlistIds.includes(product.id);
    if (isSaved) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      setToast({
        id: `${Date.now()}-${product.id}`,
        message: `${product.name} removed from your wishlist.`,
        product,
        type: 'wishlist',
      });
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      setToast({
        id: `${Date.now()}-${product.id}`,
        message: `${product.name} saved to your wishlist! ❤️`,
        product,
        type: 'wishlist',
      });
    }
  };

  const handleToggleWishlistOnly = () => {
    setShowWishlistOnly((prev) => !prev);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortPrice(false);
    setShowWishlistOnly(false);
  };

  return (
    <div className="site-wrapper">
      {/* Achha Header */}
      <Header
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setShowWishlistOnly(false);
        }}
        cartCount={totalCartCount}
        cartTotal={totalCartPrice}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlistIds.length}
        showWishlistOnly={showWishlistOnly}
        onToggleWishlistOnly={handleToggleWishlistOnly}
      />

      <div className="app-container">
        {/* Wishlist Active Notification Banner */}
        {showWishlistOnly && (
          <div className="wishlist-banner">
            <div className="wishlist-banner-content">
              <Heart size={20} fill="#ef4444" color="#ef4444" />
              <span>
                Showing <strong>{filteredProducts.length}</strong> items in your Saved Wishlist
              </span>
            </div>
            <button
              type="button"
              className="wishlist-banner-btn"
              onClick={() => setShowWishlistOnly(false)}
            >
              Show All Products
            </button>
          </div>
        )}

        {/* Hero Section Banner */}
        {!showWishlistOnly && (
          <section className="hero-banner">
            <div className="hero-content">
              <div className="header-badge">
                <Sparkles size={14} className="badge-sparkle" />
                Handcrafted &bull; Authentic Indian Marketplace
              </div>
              <h1 className="hero-title">
                Explore Premium Products with Unmatched Quality
              </h1>
              <p className="hero-subtitle">
                Discover handpicked Indian ethnic wear, smart electronics, home essentials &amp; organic groceries — curated with care and guaranteed purity.
              </p>
            </div>
          </section>
        )}

        {/* Filter & Search Bar Section */}
        <section className="filter-section">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => {
              setSelectedCategory(cat);
              setShowWishlistOnly(false);
            }}
            categories={categories}
            sortPrice={sortPrice}
            onToggleSort={() => setSortPrice((prev) => !prev)}
          />
          <div className="results-info">
            <span className="results-count">
              Showing <strong>{filteredProducts.length}</strong> of{' '}
              <strong>{products.length}</strong> products
            </span>
            {(searchQuery || selectedCategory !== 'All' || sortPrice || showWishlistOnly) && (
              <button
                type="button"
                className="inline-reset-btn"
                onClick={handleResetFilters}
              >
                Clear all filters
              </button>
            )}
          </div>
        </section>

        {/* Product Grid / Empty State */}
        <main className="main-content">
          {filteredProducts.length === 0 ? (
            <div className="empty-state" role="status">
              <div className="empty-state-icon" aria-hidden="true">
                {showWishlistOnly ? '💔' : '🔍'}
              </div>
              <h3 className="empty-state-heading">
                {showWishlistOnly
                  ? 'Your Wishlist is Empty'
                  : 'No matching products found'}
              </h3>
              <p className="empty-state-message">
                {showWishlistOnly
                  ? 'Click the heart icon on any product to save it here for later.'
                  : 'Try adjusting your search query, selecting another category, or resetting filters.'}
              </p>
              <button
                type="button"
                className="empty-state-btn"
                onClick={handleResetFilters}
              >
                {showWishlistOnly ? 'Explore Products' : 'Reset Filters'}
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => {
                const cartItem = cart.find((item) => item.product.id === product.id);
                const quantity = cartItem ? cartItem.quantity : 0;
                const isWishlisted = wishlistIds.includes(product.id);

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    cartQuantity={quantity}
                    onUpdateCartQuantity={handleUpdateCartQuantity}
                    isWishlisted={isWishlisted}
                    onToggleWishlist={handleToggleWishlist}
                  />
                );
              })}
            </div>
          )}
        </main>

        {/* Modern Footer */}
        <footer className="app-footer">
          <div className="footer-top-row">
            <div className="footer-brand">
              <span className="footer-logo-title">TechCresta Bharat Explorer</span>
              <p className="footer-tagline">
                Curating the finest Indian crafts, home essentials, and modern electronics.
              </p>
            </div>
            <div className="footer-features">
              <span className="footer-feat-item">🚚 Express Delivery across India</span>
              <span className="footer-feat-item">🔒 100% Encrypted Payments</span>
              <span className="footer-feat-item">✨ Guaranteed Authentic</span>
            </div>
          </div>
          <div className="footer-bottom-row">
            <p>
              Product Explorer &copy; {new Date().getFullYear()} &bull; Built with React, TypeScript &amp; Pure CSS
            </p>
          </div>
        </footer>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        key={quickViewProduct?.id ?? 'quick-view-modal'}
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={
          quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false
        }
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Toast Notification */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Floating Cart Button for Quick Access on Mobile */}
      {totalCartCount > 0 && !isCartOpen && (
        <button
          type="button"
          className="floating-cart-fab"
          onClick={() => setIsCartOpen(true)}
          aria-label={`Open Cart (${totalCartCount} items)`}
        >
          <ShoppingBag size={22} />
          <span className="fab-count">{totalCartCount}</span>
        </button>
      )}
    </div>
  );
}

export default App;
