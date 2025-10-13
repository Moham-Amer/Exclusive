import { create } from 'zustand'
import { productInitState } from './state'

export const useProductsState = create((setState) => ({
    ...productInitState,
    setSelectedProduct: (product) => setState((state) => ({
        ...state,
        selectedProduct: product,
    })),
    setProducts: (response) => {
        setState((state) => {
            return {
                ...state,
                products: response,
            }
        })
    },
}))