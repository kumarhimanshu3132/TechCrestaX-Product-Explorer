import React from 'react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  sortPrice?: boolean;
  sortOrder?: boolean;
  onToggleSort: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  sortPrice,
  sortOrder,
  onToggleSort,
}) => {
  const isSorted = sortPrice ?? sortOrder ?? false;

  const categoryOptions = categories.includes('All')
    ? categories
    : ['All', ...categories];

  return (
    <div className="filter-bar" role="region" aria-label="Product Filters">
      <div className="filter-group search-group">
        <label htmlFor="search-input" className="filter-label">
          Search Products
        </label>
        <div className="search-input-wrapper">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="search-input"
            type="text"
            className="search-input"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="filter-group category-group">
        <label htmlFor="category-select" className="filter-label">
          Category
        </label>
        <div className="select-wrapper">
          <select
            id="category-select"
            className="category-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-group sort-group">
        <label className="filter-label">Price Sort</label>
        <button
          type="button"
          id="sort-price-button"
          className={`sort-button ${isSorted ? 'asc' : ''}`}
          onClick={onToggleSort}
          aria-label="Sort Price: Low to High"
        >
          Sort Price: Low to High
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
