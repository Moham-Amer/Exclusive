import { create } from 'zustand'
import { wishlistInitState } from './state'

export const useWishlistState = create((setState) => ({
    ...wishlistInitState,
    setWishlist: (items) => setState((state) => ({
        ...state,
        wishlist: items,
    })),
}))


