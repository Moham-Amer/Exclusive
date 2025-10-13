import { ProductItem } from "../product-item"
import { Loader } from '../../../../shared/components/loader';
import { useQuery } from "@tanstack/react-query";
import ProductsService from '../../services/api';
import { useSearchParams } from 'react-router-dom';
import './style.css'

export function ProductList() {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category') || '';

    const { isLoading, isError, error, data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => await ProductsService.getAll(),
    })

    const normalizedCategory = category.toLowerCase();
    const filtered = normalizedCategory
        ? products.filter(p => {
            const cat = (p.category?.name || '').toLowerCase();
            return cat.includes(normalizedCategory);
        })
        : products;

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Loader />
            </div>
        )
    }

    if (isError) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p style={{ color: 'red', fontSize: '2rem' }}>{error.message}</p>
            </div>
        )
    }

    if (filtered.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p style={{ color: '#eee', fontSize: '2rem' }}>
                    No data found
                </p>
            </div>
        )
    }

    return (
        <div className="product-list-container">
            {filtered.map(p => (
                <ProductItem
                    key={p.id}
                    title={p.title} 
                    price={p.price} 
                    img={p.images[0]}
                    id={p.id}
                />
            ))}
        </div>
    )
}