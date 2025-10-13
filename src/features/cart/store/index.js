import { create } from 'zustand'
import { cartInitState } from './state'

export const useCartState = create((setState) => ({
    ...cartInitState,
    setSelectedCartItem: (item) => setState((state) => ({
        ...state,
        selectedCartItem: item,
    })),
    
    setCartList: (response) => {
        setState((state) => {
            return {
                ...state,
                cartList: response,
            }
        })
    },
}))