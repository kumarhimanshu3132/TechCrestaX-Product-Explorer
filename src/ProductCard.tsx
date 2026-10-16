import React, { useState } from 'react';
import type { Product } from './data';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  const fallbackUrl = `https://placehold.co/300x300/e2e8f0/475569?text=${encodeURIComponent(
    product.name
  )}`;

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(product.price);

  return (
    <article className="product-card" id={`product-${product.id}`}>
      <div className="product-image-container">
        <img
          src={imageError ? fallbackUrl : product.imageUrl}
          alt={product.name}
          className="product-image"
          loading="lazy"
          onError={() => setImageError(true)}
        />
        <span className="product-category-badge">{product.category}</span>
      </div>
      <div className="product-details">
        <span className="product-category-label">{product.category}</span>
        <h3 className="product-name" title={product.name}>
          {product.name}
        </h3>
        <div className="product-price-row">
          <span className="product-price">{formattedPrice}</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
