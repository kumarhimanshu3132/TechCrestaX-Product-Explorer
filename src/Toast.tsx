import React, { useEffect } from 'react';
import { ShoppingBag, X, CheckCircle2 } from 'lucide-react';
import type { ToastInfo } from './types';

interface ToastProps {
  toast: ToastInfo | null;
  onClose: () => void;
  onOpenCart: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose, onOpenCart }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="toast-notification-wrapper" role="status" aria-live="polite">
      <div className="toast-notification">
        <div className="toast-icon-wrap">
          <CheckCircle2 size={20} className="toast-success-icon" />
        </div>

        {toast.product && (
          <img
            src={toast.product.imageUrl}
            alt={toast.product.name}
            className="toast-product-thumb"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        )}

        <div className="toast-message-body">
          <span className="toast-title">Bag Updated</span>
          <span className="toast-text">{toast.message}</span>
        </div>

        <button
          type="button"
          className="toast-view-cart-btn"
          onClick={() => {
            onClose();
            onOpenCart();
          }}
        >
          <ShoppingBag size={14} />
          <span>View Bag</span>
        </button>

        <button
          type="button"
          className="toast-close-btn"
          onClick={onClose}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
