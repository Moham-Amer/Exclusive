import { Link, useNavigate } from "react-router-dom";
import { ProductList } from "../product-list";
import './style.css';

export function ProductsSection() {
    const navigate = useNavigate()

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="products-section-title">Products</h3>
                <button className="products-section-button" onClick={() => navigate('/products')}>see more</button>
            </div>
            <ProductList />
        </div>
    )
}