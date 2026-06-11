import React from "react";
import { Box, Typography, Button, Card, CardContent, CardMedia, IconButton, Chip, Rating } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Countdown from "react-countdown";
import { ProductsSection } from "../../products/components/products-section";
import { useQuery } from "@tanstack/react-query";
import ProductsService from "../../products/services/api";
import { useNavigate, useSearchParams } from 'react-router-dom';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import WatchOutlinedIcon from "@mui/icons-material/WatchOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";


const supportedCategories = ["Electronics", "Furniture", "Shoes", "Miscellaneous", "Clothes"];

function useAllProducts() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await ProductsService.getAll(),
  });
  return { products: data, isLoading };
}

const categories = [
  "Woman's Fashion",
  "Men's Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];




// Timer for music experience banner
const musicBannerEnd = Date.now() + 5 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 35 * 1000;

function MusicBannerTimer() {
  return (
    <Countdown
      date={musicBannerEnd}
      renderer={({ days, hours, minutes, seconds }) => (
        <Box sx={{ display: "flex", gap: 3 }}>
          <Box sx={{ textAlign: "center", color: "#fff" }}>
            <Typography fontWeight={700} fontSize={22}>{String(hours).padStart(2, "0")}</Typography>
            <Typography fontSize={13}>Hours</Typography>
          </Box>
          <Box sx={{ textAlign: "center", color: "#fff" }}>
            <Typography fontWeight={700} fontSize={22}>{String(days).padStart(2, "0")}</Typography>
            <Typography fontSize={13}>Days</Typography>
          </Box>
          <Box sx={{ textAlign: "center", color: "#fff" }}>
            <Typography fontWeight={700} fontSize={22}>{String(minutes).padStart(2, "0")}</Typography>
            <Typography fontSize={13}>Minutes</Typography>
          </Box>
          <Box sx={{ textAlign: "center", color: "#fff" }}>
            <Typography fontWeight={700} fontSize={22}>{String(seconds).padStart(2, "0")}</Typography>
            <Typography fontSize={13}>Seconds</Typography>
          </Box>
        </Box>
      )}
    />
  );
}

function BestSellingCard({ product }) {
  return (
    <Card sx={{ minWidth: 220, maxWidth: 240, borderRadius: 3, boxShadow: "0 2px 8px #eee", position: "relative" }}>
      <Box sx={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 1 }}>
        <IconButton size="small"><FavoriteBorderIcon fontSize="small" /></IconButton>
        <IconButton size="small"><VisibilityOutlinedIcon fontSize="small" /></IconButton>
      </Box>
      <CardMedia
        component="img"
        image={product.img}
        alt={product.name}
        sx={{ height: 140, objectFit: "contain", mt: 4 }}
      />
      <CardContent sx={{ pt: 1 }}>
        <Typography fontWeight={600} fontSize={15} gutterBottom>
          {product.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <Typography color="error" fontWeight={700} fontSize={16}>${product.price}</Typography>
          <Typography color="text.secondary" sx={{ textDecoration: "line-through", fontSize: 14 }}>${product.oldPrice}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Rating value={product.rating} precision={0.5} size="small" readOnly />
          <Typography color="text.secondary" fontSize={13}>({product.reviews})</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

function BrowseByCategory() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';
  return (
    <Box sx={{ mt: 8 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        <Box sx={{ width: 6, height: 28, bgcolor: "#DB4444", borderRadius: 2 }} />
        <Typography color="#DB4444" fontWeight={600} fontSize={16}>
          Categories
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          Browse By Category
        </Typography>
        <Box>
          <IconButton>
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {supportedCategories.map((label) => (
          <Box
            key={label}
            onClick={() => navigate(`/products?category=${encodeURIComponent(label)}`)}
            sx={{
              flex: "1 1 120px",
              minWidth: 120,
              maxWidth: 160,
              border: selectedCategory === label ? "none" : "1.5px solid #ddd",
              bgcolor: selectedCategory === label ? "#DB4444" : "#fff",
              color: selectedCategory === label ? "#fff" : "#222",
              borderRadius: 2,
              p: 3,
              textAlign: "center",
              cursor: "pointer",
              // boxShadow: selected === idx ? "0 2px 8px #db444422" : "none",
              transition: "all 0.2s",
              fontWeight: 500,
            }}
          >
            <Typography fontSize={15}>{label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function BestSellingProducts() {
  const navigate = useNavigate();
  const { products, isLoading } = useAllProducts();
  if (isLoading) {
    return (
      <Box sx={{ mt: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="loader"></div>
        </div>
      </Box>
    );
  }
  const bestSelling = products.slice(0, 8).map(p => ({
    id: p.id,
    img: p.images?.[0],
    name: p.title,
    price: p.price,
    oldPrice: p.price + 100,
    rating: 4.5,
    reviews: 65,
  }));
  return (
    <Box sx={{ mt: 8 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        <Box sx={{ width: 6, height: 28, bgcolor: "#DB4444", borderRadius: 2 }} />
        <Typography color="#DB4444" fontWeight={600} fontSize={16}>
          This Month
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          Best Selling Products
        </Typography>
        <Button
            onClick={() => {navigate('/products')}}
         
          variant="contained"
          sx={{
            background: "#DB4444",
            color: "#fff",
            fontWeight: 600,
            px: 4,
            borderRadius: 2,
            textTransform: "none",
            fontSize: 16,
            "&:hover": { background: "#b83232" },
          }}
        >
          View All
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {bestSelling.map((product) => (
          <BestSellingCard key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
}




function ExploreProductsSection() {
  const navigate = useNavigate();
  const { products, isLoading } = useAllProducts();
  if (isLoading) {
    return (
      <Box sx={{ mt: 8, mb: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="loader"></div>
        </div>
      </Box>
    );
  }
  const explore = products.slice(0, 8).map(p => ({
    id: p.id,
    img: p.images?.[0],
    name: p.title,
    price: p.price,
    rating: 4,
    reviews: 20,
    isNew: false,
    colors: [],
  }));
  return (
<Box sx={{ mt: 8, mb: 8 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        <Box sx={{ width: 6, height: 28, bgcolor: "#DB4444", borderRadius: 2 }} />
        <Typography color="#DB4444" fontWeight={600} fontSize={16}>
          Our Products
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4" fontWeight={700}>
          Explore Our Products
        </Typography>
        <Box>
          <IconButton>
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
      {/* Products Grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }, gap: 3 }}>
        {explore.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
      {/* View All Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          onClick={() => {navigate('/products')}}
          variant="contained"
          sx={{
            background: "#DB4444",
            color: "#fff",
            fontWeight: 600,
            px: 5,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontSize: 18,
            "&:hover": { background: "#b83232" },
          }}
        >
          View All Products
        </Button>
      </Box>
    </Box>
  );
}


function MusicExperienceBanner() {
  return (
    <Box sx={{ mt: 8, mb: 8 }}>
      <Box
        sx={{
          background: "linear-gradient(90deg, #111 60%, #222 100%)",
          borderRadius: 3,
          p: { xs: 3, md: 6 },
          display: "flex",
          alignItems: "center",
          gap: 6,
          minHeight: 320,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ flex: 1, zIndex: 2 }}>
          <Typography color="#25D366" fontWeight={600} fontSize={18} mb={1}>
            Categories
          </Typography>
          <Typography color="#fff" fontWeight={700} fontSize={32} mb={3}>
            Enhance Your<br />Music Experience
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <MusicBannerTimer />
          </Box>
          <Button
            variant="contained"
            sx={{
              background: "#25D366",
              color: "#fff",
              fontWeight: 600,
              px: 5,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: 18,
              "&:hover": { background: "#1da851" },
            }}
          >
            Buy Now!
          </Button>
        </Box>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2 }}>
          <img
            src="/images/jbl.png"
            alt="JBL Speaker"
            style={{ width: "100%", maxWidth: 380, borderRadius: 16 }}
          />
        </Box>
      </Box>
    </Box>
  );
}


// Timer: 3 days from now
const flashSaleEnd = Date.now() + 3 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 19 * 60 * 1000 + 56 * 1000;

function FlashSaleTimer() {
  return (
    <Countdown
      date={flashSaleEnd}
      renderer={({ days, hours, minutes, seconds }) => (
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" fontWeight={700}>{String(days).padStart(2, "0")}</Typography>
            <Typography variant="caption" color="text.secondary">Days</Typography>
          </Box>
          <Typography color="error" fontWeight={700} fontSize={22}>:</Typography>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" fontWeight={700}>{String(hours).padStart(2, "0")}</Typography>
            <Typography variant="caption" color="text.secondary">Hours</Typography>
          </Box>
          <Typography color="error" fontWeight={700} fontSize={22}>:</Typography>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" fontWeight={700}>{String(minutes).padStart(2, "0")}</Typography>
            <Typography variant="caption" color="text.secondary">Minutes</Typography>
          </Box>
          <Typography color="error" fontWeight={700} fontSize={22}>:</Typography>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" fontWeight={700}>{String(seconds).padStart(2, "0")}</Typography>
            <Typography variant="caption" color="text.secondary">Seconds</Typography>
          </Box>
        </Box>
      )}
    />
  );
}

function FlashSaleCard({ product }) {
  return (
    <Card sx={{ minWidth: 220, maxWidth: 240, borderRadius: 3, boxShadow: "0 2px 8px #eee", position: "relative" }}>
      <Box sx={{ position: "absolute", top: 12, left: 12 }}>
        <Chip label={`-${product.discount}%`} color="error" size="small" sx={{ fontWeight: 600 }} />
      </Box>
      <Box sx={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 1 }}>
        <IconButton size="small"><FavoriteBorderIcon fontSize="small" /></IconButton>
        <IconButton size="small"><VisibilityOutlinedIcon fontSize="small" /></IconButton>
      </Box>
      <CardMedia
        component="img"
        image={product.img}
        alt={product.name}
        sx={{ height: 140, objectFit: "contain", mt: 4 }}
      />
      <CardContent sx={{ pt: 1 }}>
        <Typography fontWeight={600} fontSize={15} gutterBottom>
          {product.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <Typography color="error" fontWeight={700} fontSize={16}>${product.price}</Typography>
          <Typography color="text.secondary" sx={{ textDecoration: "line-through", fontSize: 14 }}>${product.oldPrice}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Rating value={product.rating} precision={0.5} size="small" readOnly />
          <Typography color="text.secondary" fontSize={13}>({product.reviews})</Typography>
        </Box>
        {product.name === "AK-900 Wired Keyboard" && (
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              background: "#000",
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { background: "#222" },
            }}
          >
            Add To Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function ProductCard({ product }) {
  return (
    <Card sx={{ minWidth: 220, maxWidth: 240, borderRadius: 3, boxShadow: "0 2px 8px #eee", position: "relative", mb: 3 }}>
      {/* New Chip */}
      {product.isNew && (
        <Box sx={{ position: "absolute", top: 12, left: 12 }}>
          <Chip label="NEW" color="success" size="small" sx={{ fontWeight: 600 }} />
        </Box>
      )}
      {/* Icons */}
      <Box sx={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 1 }}>
        <IconButton size="small"><FavoriteBorderIcon fontSize="small" /></IconButton>
        <IconButton size="small"><VisibilityOutlinedIcon fontSize="small" /></IconButton>
      </Box>
      {/* Product Image */}
      <CardMedia
        component="img"
        image={product.img}
        alt={product.name}
        sx={{ height: 140, objectFit: "contain", mt: 4 }}
      />
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
      <CardContent sx={{ pt: 1 }}>
        <Typography fontWeight={600} fontSize={15} gutterBottom>
          {product.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <Typography color="#DB4444" fontWeight={700} fontSize={16}>${product.price}</Typography>
          <Rating value={product.rating} precision={1} size="small" readOnly />
          <Typography color="text.secondary" fontSize={13}>({product.reviews})</Typography>
        </Box>
        {/* Color Dots */}
        {product.colors && product.colors.length > 0 && (
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            {product.colors.map((color, idx) => (
              <span
                key={idx}
                style={{
                  display: "inline-block",
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: color,
                  border: "2px solid #fff",
                  boxShadow: "0 0 0 1px #ccc",
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

function NewArrivalSection() {
  return (
    <Box sx={{ mt: 10, mb: 8 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        <Box sx={{ width: 6, height: 28, bgcolor: "#DB4444", borderRadius: 2 }} />
        <Typography color="#DB4444" fontWeight={600} fontSize={16}>
          Featured
        </Typography>
      </Box>
      <Typography variant="h4" fontWeight={700} mb={3}>
        New Arrival
      </Typography>
      {/* Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gridTemplateRows: { xs: "auto", md: "repeat(2, 1fr)" },
          gap: 3,
        }}
      >
        {/* PlayStation 5 Large Card */}
        <Box
          sx={{
            gridRow: { md: "1 / span 2" },
            gridColumn: { md: "1 / 2" },
            bgcolor: "#111",
            borderRadius: 3,
            position: "relative",
            overflow: "hidden",
            minHeight: 340,
            display: "flex",
            alignItems: "flex-end",
            p: 4,
          }}
        >
          <img
            src="/images/playstation.png" // Replace with your PS5 image URL
            alt="PlayStation 5"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.7,
            }}
          />
          <Box sx={{ position: "relative", zIndex: 2, color: "#fff" }}>
            <Typography fontWeight={600} fontSize={24} mb={1}>
              PlayStation 5
            </Typography>
            <Typography fontSize={16} mb={2}>
              Black and White version of the PS5 coming out on sale.
            </Typography>
            <Button
              variant="contained"
              sx={{
                background: "#fff",
                color: "#111",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                py: 1,
                fontSize: 16,
                boxShadow: "none",
                "&:hover": { background: "#f3f3f3" },
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Box>
        {/* Women's Collections */}
        <Box
          sx={{
            bgcolor: "#222",
            borderRadius: 3,
            position: "relative",
            overflow: "hidden",
            minHeight: 160,
            p: 3,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <img
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=400"
            alt="Women's Collections"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.6,
            }}
          />
          <Box sx={{ position: "relative", zIndex: 2, color: "#fff" }}>
            <Typography fontWeight={600} fontSize={20}>
              Women’s Collections
            </Typography>
            <Typography fontSize={15} mb={1}>
              Featured woman collections that give you another vibe.
            </Typography>
            <Button
              variant="text"
              sx={{
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                px: 0,
                fontSize: 15,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Box>
        {/* Speakers */}
        <Box
          sx={{
            bgcolor: "#222",
            borderRadius: 3,
            position: "relative",
            overflow: "hidden",
            minHeight: 120,
            p: 3,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <img
            src="https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg?auto=compress&w=400"
            alt="Speakers"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.6,
            }}
          />
          <Box sx={{ position: "relative", zIndex: 2, color: "#fff" }}>
            <Typography fontWeight={600} fontSize={18}>
              Speakers
            </Typography>
            <Typography fontSize={15} mb={1}>
              Amazon wireless speakers
            </Typography>
            <Button
              variant="text"
              sx={{
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                px: 0,
                fontSize: 15,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Box>
        {/* Perfume */}
        <Box
          sx={{
            bgcolor: "#222",
            borderRadius: 3,
            position: "relative",
            overflow: "hidden",
            minHeight: 120,
            p: 3,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <img
            src="https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&w=400"
            alt="Perfume"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.6,
            }}
          />
          <Box sx={{ position: "relative", zIndex: 2, color: "#fff" }}>
            <Typography fontWeight={600} fontSize={18}>
              Perfume
            </Typography>
            <Typography fontSize={15} mb={1}>
              GUCCI INTENSE OUD EDP
            </Typography>
            <Button
              variant="text"
              sx={{
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                px: 0,
                fontSize: 15,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Box>
      </Box>
     
    </Box>
  );
}


function HomePage() {
      const navigate = useNavigate();
      const { products, isLoading } = useAllProducts();
      const flashSales = products.slice(0, 8).map(p => ({
        id: p.id,
        img: p.images?.[0],
        name: p.title,
        price: p.price,
        oldPrice: p.price + 50,
        discount: 10,
        rating: 4.5,
        reviews: 50,
      }));
  return (
    <Box sx={{ background: "#fff", minHeight: "100vh", py: 3 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        {/* Top Section */}
        <Box sx={{ display: "flex", gap: 3, mb: 5 }}>
          {/* Categories */}
          <Box sx={{ minWidth: 200, width: 220, bgcolor: "#fafafa", borderRadius: 2, p: 2, boxShadow: "0 2px 8px #eee", display: { xs: "none", md: "block" }, color: "#222" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {categories.map((cat) => (
                <li key={cat} style={{ padding: "10px 0", fontWeight: 500, fontSize: 16, cursor: "pointer", borderBottom: "1px solid #f0f0f0" }}>
                  {cat} <span style={{ float: "right" }}>{cat.includes("Fashion") ? "›" : ""}</span>
                </li>
              ))}
            </ul>
          </Box>
          {/* Swiper Banner */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Swiper slidesPerView={1} loop style={{ borderRadius: 12 }}>
              <SwiperSlide>
                <Box sx={{ bgcolor: "#000", borderRadius: 3, color: "#fff", p: 5, minHeight: 260, display: "flex", alignItems: "left", justifyContent: "left", position: "relative" }}>
                  <Box>
                    <Typography variant="h4" fontWeight={700} mb={2}>
                      <span style={{ fontSize: 32, verticalAlign: "middle" }}></span> iPhone 14 Series
                    </Typography>
                    <Typography fontSize={28} fontWeight={600} mb={2}>
                      Up to 10% off Voucher
                    </Typography>
                    <Button variant="contained" sx={{ background: "#fff", color: "#000", fontWeight: 600, px: 4, mt: 2, textTransform: "none" }}>
                      Shop Now &rarr;
                    </Button>
                  </Box>
                  {/* Dots */}
                  <Box sx={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#DB4444" }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#fff" }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#fff" }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#fff" }} />
                  </Box>
                  <img
                    src="/images/hero.png"
                    alt="iPhone 14"
                    style={{
                      position: "absolute",
                      right: 40,
                      top: 30,
                      height: 230,
                      borderRadius: 12,
                      boxShadow: "0 4px 24px #1118",
                    }}
                  />
                </Box>
              </SwiperSlide>
              {/* Add more SwiperSlide for more banners if needed */}
            </Swiper>
          </Box>
        </Box>
        {/* Flash Sales */}
        <Box sx={{ mt: 6 ,color: "#222"}}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Box sx={{ width: 6, height: 28, bgcolor: "#DB4444", borderRadius: 2 }} />
            <Typography color="#DB4444" fontWeight={600} fontSize={18}>
              Today's
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2 }}>
            <Typography variant="h4" fontWeight={700} mr={3}>
              Flash Sales
            </Typography>
            <FlashSaleTimer />
          </Box>
          {/* Flash Sale Products Swiper */}
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="loader"></div>
            </div>
          ) : (
          <Swiper
            slidesPerView={4}
            spaceBetween={24}
            navigation
            style={{ padding: "16px 0" }}
            breakpoints={{
              0: { slidesPerView: 1.2 },
              600: { slidesPerView: 2.2 },
              900: { slidesPerView: 3.2 },
              1200: { slidesPerView: 4 },
            }}
          >
            {flashSales.map((product) => (
              <SwiperSlide key={product.id}>
                <FlashSaleCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          )}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              onClick={() => {navigate('/products')}}
              variant="contained"
              sx={{
                background: "#DB4444",
                color: "#fff",
                fontWeight: 600,
                px: 5,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: 18,
                "&:hover": { background: "#b83232" },
              }}
            >
              View All Products
            </Button>
          </Box>
        </Box>
        {/* Browse By Category */}
        <BrowseByCategory />
        {/* Best Selling Products */}
        <BestSellingProducts />
        {/* Music Experience Banner */}
        <MusicExperienceBanner />
        <ExploreProductsSection />
        <NewArrivalSection />

         {/* Features Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          mt: 8,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ textAlign: "center", minWidth: 220 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              bgcolor: "#f3f3f3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <img src="/images/truck.png" alt="Truck" style={{ width: 60, height: 60 }} />
          </Box>
          <Typography fontWeight={700} fontSize={16} mb={0.5} color="#222">
            FREE AND FAST DELIVERY
          </Typography>
          <Typography fontSize={14} color="#555">
            Free delivery for all orders over $140
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center", minWidth: 220 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              bgcolor: "#f3f3f3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <img src="/images/headset.png" alt="Headset" style={{ width: 60, height: 60 }} />
          </Box>
          <Typography fontWeight={700} fontSize={16} mb={0.5} color="#222">
            24/7 CUSTOMER SERVICE
          </Typography>
          <Typography fontSize={14} color="#555">
            Friendly 24/7 customer support
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center", minWidth: 220 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              bgcolor: "#f3f3f3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
    
                <img src="/images/money.png" alt="Money" style={{ width: 60, height: 60 }} />

         
          </Box>
          <Typography fontWeight={700} fontSize={16} mb={0.5} color="#222">
            MONEY BACK GUARANTEE
          </Typography>
          <Typography fontSize={14} color="#555">
            We return money within 30 days
          </Typography>
        </Box>
      </Box>
      </Box>
    </Box>
  );
}

export default HomePage;


