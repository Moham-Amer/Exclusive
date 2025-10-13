import { useCallback } from 'react';
import { useCartState } from '../store';
import SearchProductsService from '../../search/services/api';

// Load cart items from localStorage
export function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem('cartItems');
  return storedCart ? JSON.parse(storedCart) : [];
}

// Save cart items to localStorage
export function saveCartToLocalStorage(cartList) {
  localStorage.setItem('cartItems', JSON.stringify(cartList));
}

// Get unique item count in cart
export function getUniqueCartItemCount(cartList) {
  return new Set(cartList.map(item => item.id)).size;
}

// Group cart items by id and count quantity
export function groupCartItems(cartList) {
  return cartList.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 0 };
    }
    acc[item.id].quantity++;
    return acc;
  }, {});
}

// Custom hook for cart logic
export function useCart() {
  const { cartList, setCartList, selectedCartItem, setSelectedCartItem } = useCartState();

  // Fetch product details for cart items (by ids)
  const fetchCartProducts = useCallback(async () => {
    const ids = cartList.map(item => item.id);
    if (ids.length === 0) return [];
    const response = await SearchProductsService.getProductsByIds(ids);
    setCartList(response);
    return response;
  }, [cartList, setCartList]);

  // Add item to cart (increment quantity if exists)
  const addToCart = useCallback((item) => {
    const existingIndex = cartList.findIndex(cartItem => cartItem.id === item.id);
    let updatedCart;
    if (existingIndex !== -1) {
      updatedCart = cartList.map((cartItem, idx) =>
        idx === existingIndex
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
          : cartItem
      );
    } else {
      const newItem = { ...item, quantity: item.quantity && item.quantity > 0 ? item.quantity : 1 };
      updatedCart = [...cartList, newItem];
    }
    setCartList(updatedCart);
    saveCartToLocalStorage(updatedCart);
  }, [cartList, setCartList]);

  // Remove item from cart
  const removeFromCart = useCallback((id) => {
    const updatedCart = cartList.filter(item => item.id !== id);
    setCartList(updatedCart);
    saveCartToLocalStorage(updatedCart);
  }, [cartList, setCartList]);

  // Update item quantity
  const updateCartItemQuantity = useCallback((id, quantity) => {
    const updatedCart = cartList.map(item =>
      item.id === id ? { ...item, quantity: quantity < 1 ? 1 : quantity } : item
    );
    setCartList(updatedCart);
    saveCartToLocalStorage(updatedCart);
  }, [cartList, setCartList]);

  // Load cart from localStorage on mount
  const loadCart = useCallback(() => {
    const storedCart = loadCartFromLocalStorage();
    setCartList(storedCart);
    return storedCart;
  }, [setCartList]);

  return {
    cartList,
    setCartList,
    selectedCartItem,
    setSelectedCartItem,
    fetchCartProducts,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    loadCart,
    groupCartItems,
    getUniqueCartItemCount,
    saveCartToLocalStorage,
    loadCartFromLocalStorage,
  };
}




