import { useState, useMemo } from 'react';
import { products } from './data';
import { ProductCard } from './ProductCard';
import { FilterBar } from './FilterBar';
import './App.css';

function App() {
  // 1. State Management with sortPrice defaulting to false
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortPrice, setSortPrice] = useState<boolean>(false);

  // Dynamically extract unique categories from products
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, []);

  // 2. Derived state logic using useMemo: ONLY sorts if sortPrice is strictly true
  const filteredProducts = useMemo(() => {
    const filtered = products
      // Filter by searchQuery (case-insensitive)
      .filter((product) =>
        product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
      // Filter by selectedCategory (unless 'All')
      .filter((product) =>
        selectedCategory === 'All' ? true : product.category === selectedCategory
      );

    // ONLY sort if sortPrice is strictly true; otherwise maintain randomized order
    return sortPrice === true
      ? [...filtered].sort((a, b) => a.price - b.price)
      : filtered;
  }, [searchQuery, selectedCategory, sortPrice]);

  const handleToggleSort = () => {
    setSortPrice((prev) => !prev);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortPrice(false);
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <div className="header-badge">India Marketplace</div>
        <h1 className="app-title">Product Explorer</h1>
        <p className="app-subtitle">
          Discover handpicked Indian ethnic wear, smart electronics, home essentials &amp; groceries.
        </p>
      </header>

      {/* Filter and Search Bar */}
      <section className="filter-section">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          sortPrice={sortPrice}
          onToggleSort={handleToggleSort}
        />
        <div className="results-info">
          <span className="results-count">
            Showing <strong>{filteredProducts.length}</strong> of{' '}
            <strong>{products.length}</strong> products
          </span>
          {(searchQuery || selectedCategory !== 'All' || sortPrice) && (
            <button
              type="button"
              className="inline-reset-btn"
              onClick={handleResetFilters}
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {/* Main Product Grid or Empty State */}
      <main className="main-content">
        {filteredProducts.length === 0 ? (
          <div className="empty-state" role="status">
            <div className="empty-state-icon" aria-hidden="true">
              🔍
            </div>
            <p className="empty-state-message">
              No products match your search or filters.
            </p>
            <button
              type="button"
              className="empty-state-btn"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Product Explorer &copy; {new Date().getFullYear()} &bull; Built with React, TypeScript &amp; Pure CSS</p>
      </footer>
    </div>
  );
}

export default App;
