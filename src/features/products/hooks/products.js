import { useCallback, useMemo } from 'react';
import { useProductsState } from '../store'
import SearchProductsService from '../../search/services/api';

export function useProducts() {
    const { setProducts, selectedProduct, setSelectedProduct } = useProductsState()
    const isEditForm = useMemo(() => {
        return Boolean(selectedProduct.id)
    }, [selectedProduct.id])

    const search = useCallback(async (searchName) => {
        const response = await SearchProductsService.search(searchName);
        setProducts(response);
    }, [setProducts])

    return {
        fetch,
        search,
        isEditForm,
        selectedProduct,
        setSelectedProduct,
    }
}