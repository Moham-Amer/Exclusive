import { useEffect, useState } from "react";
// import { useSearchState } from "../../store";
import SearchProductsService from '../../services/api'

export function DisplaySearchContent() {
    // const { value: inputString } = useSearchState();
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        (async () => {
            const _products = await SearchProductsService.getAll();
            setProducts(_products)
        })()
    }, [])

    return (
        <div>
            <h2>Search Results</h2>
            {products.map(product => {
                return <p key={product.id}>{product.name}</p>
            })}
        </div>
    );
}