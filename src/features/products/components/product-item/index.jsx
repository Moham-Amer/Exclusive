import { useCart } from '../../../cart/hooks/cart';
import { useNavigate } from 'react-router-dom';
import './style.css';

export function ProductItem({
    title,
    price,
    img,
    id
}) {
    const { addToCart, cartList } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
     const existingItem = cartList.find(item => item.id === id);
        if (existingItem) {
            addToCart({ ...existingItem, quantity: (existingItem.quantity || 1) + 1 });
        } else {
            addToCart({ id, title, price, img, quantity: 1 });
        }
    };

    return (
        <div className="product-container" onClick={() => navigate(`/products/${id}`) }>
            <img className="product-container-img" src={img} alt={title} />
            <p className="product-container-title">
                {title}
            </p>
            <p className="product-container-actions-price">
                {price}
            </p>
            <div className="product-container-actions">
                <button
                    className="product-container-actions-button"
                    onClick={(event) => {
                        handleAddToCart();
                        // Prevent navigating to product details when clicking the button
                        event.stopPropagation();
                    }}
                >
                    Add to cart
                </button>
            </div>
        </div>
    )
}