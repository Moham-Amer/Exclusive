import React from "react";
import { useWishlist } from '../hooks';
import { onImageError } from '../../../shared/lib/image-fallback';
import { useCart } from '../../cart/hooks/cart';
import { Loader } from '../../../shared/components/loader';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  Rating,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

// Dummy Data
// loaded from local storage via hook

const justForYou = [
  {
    id: 5,
    img: "https://picsum.photos/seed/laptop/300/300",
    name: "ASUS FHD Gaming Laptop",
    price: 960,
    oldPrice: 1160,
    discount: 35,
    rating: 5,
    reviews: 65,
  },
  {
    id: 6,
    img: "https://picsum.photos/seed/monitor/300/300",
    name: "IPS LCD Gaming Monitor",
    price: 1160,
    rating: 5,
    reviews: 65,
  },
  {
    id: 7,
    img: "https://picsum.photos/seed/gamepad/300/300",
    name: "HAVIT HV-G92 Gamepad",
    price: 560,
    isNew: true,
    rating: 5,
    reviews: 65,
  },
  {
    id: 8,
    img: "https://picsum.photos/seed/keyboard/300/300",
    name: "AK-900 Wired Keyboard",
    price: 200,
    rating: 5,
    reviews: 65,
  },
];

function WishlistCard({ product }) {
  const { addToCart } = useCart();
  return (
    <Card
      sx={{
        minWidth: 220,
        maxWidth: 240,
        borderRadius: 3,
        boxShadow: "0 2px 8px #eee",
        position: "relative",
        mb: 3,
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
      {/* Delete Icon */}
      <Box sx={{ position: "absolute", top: 12, right: 12 }}>
        <IconButton size="small">
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Box>
      {/* Product Image */}
      <CardMedia
        component="img"
        image={product.img}
        alt={product.name}
        onError={onImageError}
        sx={{ height: 140, objectFit: "contain", mt: 4 }}
      />
      {/* Add To Cart Button */}
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
        startIcon={<ShoppingCartOutlinedIcon />}
        onClick={() => addToCart({ id: product.id, title: product.name, price: product.price, img: product.img })}
      >
        Add To Cart
      </Button>
      <CardContent sx={{ pt: 1 }}>
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
      </CardContent>
    </Card>
  );
}

function JustForYouCard({ product }) {
  const { addToCart } = useCart();
  return (
    <Card
      sx={{
        minWidth: 220,
        maxWidth: 240,
        borderRadius: 3,
        boxShadow: "0 2px 8px #eee",
        position: "relative",
        mb: 3,
      }}
    >
      {/* Discount/New Chip */}
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
      {product.isNew && (
        <Box sx={{ position: "absolute", top: 12, left: 12 }}>
          <Chip
            label="NEW"
            color="success"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>
      )}
      {/* Eye Icon */}
      <Box sx={{ position: "absolute", top: 12, right: 12 }}>
        <IconButton size="small">
          <VisibilityOutlinedIcon fontSize="small" />
        </IconButton>
      </Box>
      {/* Product Image */}
      <CardMedia
        component="img"
        image={product.img}
        alt={product.name}
        onError={onImageError}
        sx={{ height: 140, objectFit: "contain", mt: 4 }}
      />
      {/* Add To Cart Button */}
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
        startIcon={<ShoppingCartOutlinedIcon />}
        onClick={() => addToCart({ id: product.id, title: product.name, price: product.price, img: product.img })}
      >
        Add To Cart
      </Button>
      <CardContent sx={{ pt: 1 }}>
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
        {/* Rating */}
        {product.rating && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Rating
              value={product.rating}
              precision={1}
              size="small"
              readOnly
            />
            <Typography color="text.secondary" fontSize={13}>
              ({product.reviews})
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default function WishlistPage() {
  const { wishlist, loadWishlist } = useWishlist();
  React.useEffect(() => { loadWishlist(); }, [loadWishlist]);

  if (!wishlist) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Loader />
      </div>
    );
  }

  return (
    <Box sx={{ background: "#fff", minHeight: "100vh", py: 5, color: "#222" }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        {/* Wishlist Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography fontSize={20} fontWeight={500}>
            Wishlist ({wishlist.length})
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#222",
              color: "#222",
              px: 4,
              py: 1,
              borderRadius: 1,
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            Move All To Bag
          </Button>
        </Box>
        {/* Wishlist Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
            mb: 5,
          }}
        >
          {wishlist.map((product) => (
            <WishlistCard key={product.id} product={product} />
          ))}
        </Box>
        {/* Just For You Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
            mt: 4,
          }}
        >
          <Box sx={{ width: 6, height: 28, bgcolor: "#DB4444", borderRadius: 2 }} />
          <Typography color="#DB4444" fontWeight={600} fontSize={16}>
            Just For You
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Button
            variant="outlined"
            sx={{
              borderColor: "#222",
              color: "#222",
              px: 4,
              py: 1,
              borderRadius: 1,
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            See All
          </Button>
        </Box>
        {/* Just For You Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {justForYou.map((product) => (
            <JustForYouCard key={product.id} product={product} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}