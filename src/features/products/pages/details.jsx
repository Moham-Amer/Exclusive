import React, { useState } from "react";
import { useCart } from '../../cart/hooks/cart';
import { useWishlist } from '../../wishlist/hooks';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Rating,
  TextField,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import ProductsService from '../../products/services/api';
import { Loader } from "../../../shared/components/loader";
import { onImageError } from "../../../shared/lib/image-fallback";



function RelatedCard({ product }) {
  return (
    <Box
      sx={{
        minWidth: 220,
        maxWidth: 240,
        borderRadius: 3,
        boxShadow: "0 2px 8px #eee",
        position: "relative",
        mb: 3,
        bgcolor: "#fff",
      }}
    >
      {/* Discount Chip */}
      {product.discount && (
        <Box sx={{ position: "absolute", top: 12, left: 12 }}>
          <Chip
            label={`-${product.discount}%`}
            color="error"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>
      )}
      {/* Icons */}
      <Box sx={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 1 }}>
        <IconButton size="small"><FavoriteBorderIcon fontSize="small" /></IconButton>
        <IconButton size="small"><VisibilityOutlinedIcon fontSize="small" /></IconButton>
      </Box>
      {/* Product Image */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <img
          src={product.img}
          alt={product.name}
          onError={onImageError}
          style={{ height: 100, objectFit: "contain" }}
        />
      </Box>
      {/* Add To Cart Button */}
      {product.addToCart && (
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
            background: "#000",
            color: "#fff",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 0,
            "&:hover": { background: "#222" },
          }}
        >
          Add To Cart
        </Button>
      )}
      <Box sx={{ p: 2, pt: 1 }}>
        <Typography fontWeight={600} fontSize={15} gutterBottom>
          {product.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <Typography color="#DB4444" fontWeight={700} fontSize={16}>
            ${product.price}
          </Typography>
          {product.oldPrice && (
            <Typography
              color="text.secondary"
              sx={{ textDecoration: "line-through", fontSize: 14 }}
            >
              ${product.oldPrice}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Rating value={product.rating} precision={0.5} size="small" readOnly />
          <Typography color="text.secondary" fontSize={13}>
            ({product.reviews})
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function ProductDetailPage() {



  const { id } = useParams();
  console.log('this is the id from useParams');
  console.log(id);
  

  const { data: product, isLoading, isError } = useQuery({
        queryKey: ['products', id],
        queryFn: async () => await ProductsService.getById(id),
  })

  const { data: relatedProducts = [] } = useQuery({
        queryKey: ['products', 'related'],
        queryFn: async () => await ProductsService.getAll(),
  })


      const { addToCart } = useCart();

      // handled inline in button click
  // console.log('this is the product');
  // console.log(product);


// useEffect(() => {
//   const fetchProduct = async () => {
//     try {
//       const response = await fetch(`/api/products/${id}`);
//       // const data = await response.json();
//       // setProduct(data);
//     } catch (error) {
//       console.error("Error fetching product:", error);
//     }
//   };

//   fetchProduct();
// }, [id]);

  
  // const [selectedImg, setSelectedImg] = useState(0);
  // const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [qty, setQty] = useState(2);
  const { wishlist, addToWishlist, removeFromWishlist, loadWishlist } = useWishlist();
  React.useEffect(() => { loadWishlist(); }, [loadWishlist]);
  
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
 <Loader />
      </div>
     
    );
  }

  if (isError || !product) {
    return (
      <Box sx={{ background: "#fff", minHeight: "60vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="error">Failed to load product.</Typography>
      </Box>
    );
  }

  const productImages = Array.isArray(product?.images) ? product.images : [];
  const displayPrice = Number(product?.price || 0);
  const productTitle = product?.name || product?.title || "Product";
  const productDescription = product?.description || "";
  const productRating = Number(product?.rating || 0);
  const productReviews = Number(product?.reviews || 0);
  const productSizes = Array.isArray(product?.sizes) ? product.sizes : [];

  return (
    <Box sx={{ background: "#fff", minHeight: "100vh", py: 5, color: "#222" }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        {/* Product Main Section */}
        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {/* Images */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* {product.images.map((img, idx) => (
              <Box
                key={idx}
                onClick={() => setSelectedImg(idx)}
                sx={{
                  border:
                    selectedImg === idx
                      ? "2px solid #DB4444"
                      : "2px solid #eee",
                  borderRadius: 2,
                  p: 0.5,
                  cursor: "pointer",
                  bgcolor: "#fafafa",
                  width: 70,
                  height: 70,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={img}
                  alt={`thumb-${idx}`}
                  onError={onImageError}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </Box>
            ))} */}
          </Box>
          {/* Main Image */}
          <Box
            sx={{
              bgcolor: "#fafafa",
              borderRadius: 2,
              flex: "1 1 340px",
              minWidth: 320,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 340,
              mb: 2,
            }}
          >
            <img
              src={productImages[0] || "/images/hero-img.jpg"}
              // src={productImages[selectedImg]}
              alt="main"
              onError={onImageError}
              style={{ maxHeight: 320, maxWidth: "100%", objectFit: "contain" }}
            />
          </Box>
          {/* Product Info */}
          <Box sx={{ flex: "1 1 340px", minWidth: 320, pl: 2 }}>
            <Typography fontWeight={700} fontSize={24}>
              {productTitle}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Rating value={productRating} precision={0.5} size="small" readOnly />
              <Typography color="text.secondary" fontSize={15}>
                ({productReviews} Reviews)
              </Typography>
              <Box sx={{ width: 6, height: 6, bgcolor: "#ccc", borderRadius: "50%", mx: 1 }} />
              <Typography color="success.main" fontSize={15}>
                In Stock
              </Typography>
            </Box>
            <Typography fontWeight={700} fontSize={22} color="#222" mt={2}>
              ${displayPrice.toFixed(2)}
            </Typography>
            <Typography color="#555" fontSize={15} mt={1} mb={2}>
              {productDescription}
            </Typography>
            {/* <Divider sx={{ mb: 2 }} /> */}
            {/* Colours */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Typography fontWeight={500}>Colours:</Typography>
              {/* {product.colors.map((color) => (
                <span
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    display: "inline-block",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: color,
                    border:
                      selectedColor === color
                        ? "2px solid #DB4444"
                        : "2px solid #eee",
                    marginRight: 8,
                    cursor: "pointer",
                  }}
                />
              ))} */}
            </Box>
            {/* Sizes */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Typography fontWeight={500}>Size:</Typography>
              {productSizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "contained" : "outlined"}
                  size="small"
                  sx={{
                    minWidth: 36,
                    px: 1.5,
                    borderRadius: 1,
                    background: selectedSize === size ? "#DB4444" : "#fff",
                    color: selectedSize === size ? "#fff" : "#222",
                    borderColor: "#eee",
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </Box>
            {/* Quantity, Buy Now, Favorite */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1.5px solid #eee",
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  minWidth: 90,
                  justifyContent: "space-between",
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  sx={{ color: "#222" }}
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  value={qty}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setQty(val < 1 ? 1 : val);
                  }}
                  type="number"
                  inputProps={{
                    min: 1,
                    style: { textAlign: "center", width: 30 },
                  }}
                  variant="standard"
                  sx={{
                    mx: 1,
                    "& input": { textAlign: "center", fontWeight: 600 },
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => setQty(qty + 1)}
                  sx={{ color: "#222" }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Button onClick={() => addToCart({ id: product.id, title: productTitle, price: displayPrice, img: productImages[0] || "/images/hero-img.jpg", quantity: qty })}
                variant="contained"
                sx={{
                  background: "#DB4444",
                  color: "#fff",
                  fontWeight: 600,
                  px: 4,
                  borderRadius: 1,
                  textTransform: "none",
                  fontSize: 16,
                  "&:hover": { background: "#b83232" },
                }}
                startIcon={<ShoppingCartOutlinedIcon />}
              >
                Buy Now
              </Button>
              <IconButton
                sx={{
                  border: "1.5px solid #eee",
                  borderRadius: 1,
                  color: wishlist?.some(w => w.id === product.id) ? "#DB4444" : "#222",
                  ml: 1,
                }}
                onClick={() => {
                  if (wishlist?.some(w => w.id === product.id)) {
                    removeFromWishlist(product.id);
                  } else {
                    addToWishlist({ id: product.id, img: productImages[0] || "/images/hero-img.jpg", name: productTitle, price: displayPrice });
                  }
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>
            </Box>
            {/* Delivery Info */}
            <Box
              sx={{
                border: "1.5px solid #ccc",
                borderRadius: 2,
                mt: 2,
                bgcolor: "#fafafa",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  borderBottom: "1.5px solid #eee",
                }}
              >
                <LocalShippingOutlinedIcon sx={{ fontSize: 28 }} />
                <Box>
                  <Typography fontWeight={600} fontSize={15}>
                    Free Delivery
                  </Typography>
                  <Typography fontSize={14} color="#555">
                    <a href="#" style={{ color: "#222", textDecoration: "underline" }}>
                      Enter your postal code for Delivery Availability
                    </a>
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
                <AutorenewOutlinedIcon sx={{ fontSize: 28 }} />
                <Box>
                  <Typography fontWeight={600} fontSize={15}>
                    Return Delivery
                  </Typography>
                  <Typography fontSize={14} color="#555">
                    Free 30 Days Delivery Returns.{" "}
                    <a href="#" style={{ color: "#222", textDecoration: "underline" }}>
                      Details
                    </a>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Related Items */}
        <Box sx={{ mt: 8 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Box sx={{ width: 6, height: 28, bgcolor: "#DB4444", borderRadius: 2 }} />
            <Typography color="#DB4444" fontWeight={600} fontSize={16}>
              Related Item
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(4, 1fr)",
              },
              gap: 3,
              mt: 2,
            }}
          >
            {(Array.isArray(relatedProducts) ? relatedProducts.slice(0, 4) : []).map((item) => (
              <RelatedCard key={item.id} product={{ id: item.id, img: item.images?.[0], name: item.title, price: item.price, rating: item.rating || 0, reviews: item.reviews || 0 }} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}