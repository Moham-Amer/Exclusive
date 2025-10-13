
import { ProductList } from "../components/product-list";
import { Box } from "@mui/material";
import { useNavigate, useSearchParams } from 'react-router-dom';

const supportedCategories = ["Electronics", "Furniture", "Shoes", "Miscellaneous", "Clothes"];

function ProductsPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const selectedCategory = searchParams.get('category') || '';

    return (
        <>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2,paddingLeft: '10%', paddingBottom: '1%' }}>
                {supportedCategories.map((label) => (
                    <button
                        key={label}
                        onClick={() => navigate(`/products?category=${encodeURIComponent(label)}`)}
                        style={{
                            padding: '8px 12px',
                            borderRadius: 6,
                            border: selectedCategory === label ? 'none' : '1.5px solid #ddd',
                            background: selectedCategory === label ? '#DB4444' : '#fff',
                            color: selectedCategory === label ? '#fff' : '#222',
                            cursor: 'pointer',
                            fontWeight: 600,
                        }}
                    >
                        {label}
                    </button>
                ))}
            </Box>
            <ProductList />
        </>
    )
}

export default ProductsPage;