import { useCallback } from 'react';
import { useWishlistState } from '../store';
import { dataStorage } from '../../../lib/storage';

const storage = dataStorage('wishlistItems');

export function useWishlist() {
  const { wishlist, setWishlist } = useWishlistState();

  const loadWishlist = useCallback(() => {
    const items = storage.get() || [];
    setWishlist(items);
    return items;
  }, [setWishlist]);

  const saveWishlist = useCallback((items) => {
    setWishlist(items);
    storage.set(items);
  }, [setWishlist]);

  const addToWishlist = useCallback((item) => {
    const exists = wishlist.some(w => w.id === item.id);
    if (exists) return;
    const updated = [...wishlist, item];
    saveWishlist(updated);
  }, [wishlist, saveWishlist]);

  const removeFromWishlist = useCallback((id) => {
    const updated = wishlist.filter(w => w.id !== id);
    saveWishlist(updated);
  }, [wishlist, saveWishlist]);

  return {
    wishlist,
    setWishlist,
    loadWishlist,
    addToWishlist,
    removeFromWishlist,
  }
}


