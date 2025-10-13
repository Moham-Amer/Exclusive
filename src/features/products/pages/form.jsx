import { UserProductGuard } from '../guards/user-product';
import { ProductForm } from '../components/product-form';

function ProductFormPage() {
    return (
        <UserProductGuard>
            <ProductForm />
        </UserProductGuard>
    )
}

export default ProductFormPage;