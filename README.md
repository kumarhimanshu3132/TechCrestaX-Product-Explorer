# Product Explorer - TechCrestaX Assessment

**Live Demo:** https://tech-cresta-x-product-explorer.vercel.app/

## Features Implemented

- **Responsive Product Grid**: Displays 20 handpicked Indian marketplace products with images, categories, discount badges, ratings, and reviews.
- **Indian Currency Formatting**: Proper INR (`₹`) formatting using standard `Intl.NumberFormat('en-IN')` with original prices and calculated discount percentages.
- **Real-Time Search & Filters**: Live search filtering by product name and category, category navigation pills, and dropdown selection.
- **Price Sorting**: Smooth sorting from lowest to highest price.
- **Slide-out Shopping Bag (Cart Drawer)**:
  - Live quantity adjustment stepper (+ / -) directly on cards and inside the drawer.
  - Free delivery milestone progress meter (unlocked at ₹499).
  - Subtotal and estimated total calculation.
  - One-click animated checkout simulation with generated Order ID.
- **Quick View Modal**:
  - Detailed product preview with high-res imagery, rating summaries, and bulleted product highlights.
  - Quantity selector, "Add to Bag", and "Buy Now" direct actions.
  - Keyboard accessible (closes on `Escape`) and backdrop click dismiss.
- **Wishlist System**:
  - Add / remove products to wishlist with heart button.
  - Persistent wishlist state saved in `localStorage`.
  - Dedicated "Saved Wishlist" view mode in the header with filter banner and empty state.
- **Toast Notifications**:
  - Floating confirmation toast with product thumbnail and quick "View Bag" link upon adding items.
- **Empty States & Reset**:
  - Thoughtful empty state handling for search queries and empty wishlist with one-click filter reset.
- **Modern Responsive Design**:
  - Built with pure Vanilla CSS, custom CSS tokens, glassmorphism, micro-animations, and responsive layout across mobile and desktop.
  - Mobile floating cart FAB for quick access on small screens.

## Technology Stack

- React 19
- TypeScript
- Pure CSS (Custom Design System with CSS variables)
- Lucide React (feather-light icons)
- Vite (v8)

## Local Setup Instructions

1. Clone the repository:
   `git clone https://github.com/kumarhimanshu3132/TechCrestaX-Product-Explorer.git`
2. Navigate to the project directory:
   `cd product-explorer`
3. Install the dependencies:
   `npm install`
4. Start the development server:
   `npm run dev`
