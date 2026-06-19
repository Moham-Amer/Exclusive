import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Favorite from '@mui/icons-material/Favorite';
import MoreIcon from '@mui/icons-material/MoreVert';
import { AppLogo } from '../../components/app-logo';
import { useNavigate } from "react-router-dom"
import { appRoutes } from "../../../routes"
import { useState } from 'react';
import { useCart } from '../../../features/cart/hooks/cart';
import { useWishlist } from '../../../features/wishlist/hooks';
import ProductsService from '../../../features/products/services/api';
import { useQuery } from "@tanstack/react-query";
import { toast } from 'react-toastify';




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#222',
  '& .MuiInputBase-input::placeholder': {
    color: '#666',
    opacity: 1,
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const isLoggedIn = Boolean(localStorage.getItem('access_token')); 

export function PrimarySearchAppBar() {
  const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => await ProductsService.getAll(),
    })
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('Home');
  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [profileActive, setProfileActive] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate();
  const {
    cartList,
    loadCart,
  } = useCart();
  const { wishlist, loadWishlist } = useWishlist();

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // Mobile overflow menu (currently not used; we rely on drawer)
  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };
  const toggleMobileDrawer = (open) => () => {
    setMobileDrawerOpen(open);
  };

  const handleProfileClick = (event) => {
    setProfileMenuAnchor(event.currentTarget);
    setProfileActive(true);
  };

  const handleProfileClose = () => {
    setProfileMenuAnchor(null);
    setProfileActive(false);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* Add menu items here if needed */}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit"  onClick={() => navigate('/cart')} >
          <Badge badgeContent={new Set(cartList.map(i => i.id)).size} color="error">
            <ShoppingCartIcon/>
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton  onClick={() => navigate('/wishlist')}
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <Favorite />
          </Badge>
        </IconButton>
        <p>Favorites</p>
      </MenuItem>
    </Menu>
  );

    // const appBarColor = "#fff"; 
  const iconColor = "#000";  


const tabNames = Object.keys(appRoutes); 
 const buttonStyle = (tabName) => ({
    color: 'black',
    background: 'none',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    font: 'inherit',
    textTransform: 'none',
    borderBottom: activeTab === tabName ? '2px solid black' : '2px solid transparent',
    borderRadius: 0,
    padding: '8px 16px',
    margin: '0 4px',
    fontWeight: activeTab === tabName ? 'bold' : 500,
    transition: 'border-bottom 0.2s',
    fontSize: '1.1rem',
  });
  
console.log(products);
   const matchedProducts = searchValue
    ? products.filter(p =>
        p.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];
  const handleKeyDown = (e) => {
    if (!searchFocused || matchedProducts.length === 0) return;
    if (e.key === "ArrowDown") {
      setHighlightedIndex(i => Math.min(i + 1, matchedProducts.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex(i => Math.max(i - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      const product = matchedProducts[highlightedIndex];
      if (product) {
        navigate(`/products/${product.id}`);
        setSearchValue("");
        setSearchFocused(false);
        setHighlightedIndex(-1);
      }
      e.preventDefault();
    }
    else if (e.key === "Escape") {
      setSearchFocused(false);
      setHighlightedIndex(-1);
    }
  };

  React.useEffect(() => {
    loadCart();
    loadWishlist();
  }, [loadCart, loadWishlist]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#fff", boxShadow: "none", borderBottom: "1px solid #eee" }}>
        <Toolbar sx={{
          flexWrap: 'nowrap',
          gap: 0,
          minHeight: 64,
          px: { xs: 1, md: 4 },
          justifyContent: "space-between"
        }}>
          {/* Logo */}
          <AppLogo />
          <Box sx={{flexGrow: 1}} />
          {/* Tabs (desktop) */}
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 2,
            ml: 4
          }}>
            {tabNames.map((tab) => (
              <button
                key={tab}
                style={buttonStyle(tab)}
                onClick={() => {
                  setActiveTab(tab);
                  navigate(appRoutes[tab]);
                }}
              >
                {tab}
              </button>
            ))}
          </Box>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Search + Icons (desktop) */}
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 1
          }}>
            {/* Search Bar */}
            <Box sx={{ position: "relative", minWidth: 300, mr: 1 }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: iconColor }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="What are you looking for?"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchValue}
                  onChange={e => {
                    setSearchValue(e.target.value);
                    setHighlightedIndex(-1);
                  }}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                  onKeyDown={handleKeyDown}
                  sx={{
                    width: 140,
                    '& .MuiInputBase-input': {
                      width: '14ch'
                    }
                  }}
                  
                />
              </Search>
              {/* Popup for matched items */}
              {searchFocused && matchedProducts.length > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    bgcolor: "#fff",
                    color: "#000",
                    boxShadow: 3,
                    borderRadius: 2,
                    zIndex: 10,
                    mt: 1,
                    maxHeight: 300,
                    overflowY: "auto",
                  }}
                >
                  {matchedProducts.map((product, idx) => (
                    <Box
                      key={product.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        px: 2,
                        py: 1,
                        cursor: "pointer",
                        bgcolor: highlightedIndex === idx ? "#f5f5f5" : "#fff",
                        borderBottom: "1px solid #eee",
                      }}
                      onMouseDown={() => {
                        navigate(`/products/${product.id}`);
                        setSearchValue("");
                        setSearchFocused(false);
                        setHighlightedIndex(-1);
                      }}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        style={{ width: 40, height: 40, objectFit: "contain", marginRight: 12, borderRadius: 6 }}
                      />
                      <Box>
                        <Typography fontWeight={500} fontSize={15}>
                          {product.title}
                        </Typography>
                        <Typography color="#DB4444" fontSize={14}>
                          ${product.price}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
            {/* Favorite Icon */}
            <IconButton
              onClick={() => navigate('/wishlist')}
              size="large"
              aria-label="wishlist"
              color="inherit"
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={wishlist?.length || 0} color="error">
                <Favorite sx={{ color: iconColor }} />
              </Badge>
            </IconButton>
            {/* Cart Icon */}
            <IconButton
              size="large"
              aria-label="cart"
              color="inherit"
              onClick={() => navigate('/cart')}
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={new Set(cartList.map(i => i.id)).size} color="error">
                <ShoppingCartIcon sx={{ color: iconColor }} />
              </Badge>
            </IconButton>
            {/* Profile Icon */}
            {isLoggedIn && (
              <>
                <IconButton
                  onClick={handleProfileClick}
                  sx={{
                    ml: 2,
                    background: profileActive ? "#DB4444" : "#fff",
                    color: profileActive ? "#fff" : "#DB4444",
                    borderRadius: "50%",
                    transition: "background 0.2s",
                    boxShadow: profileActive ? "0 2px 8px #db444422" : "none",
                  }}
                >
                  <AccountCircle sx={{ fontSize: 32 }} />
                </IconButton>
                <Menu
                  anchorEl={profileMenuAnchor}
                  open={Boolean(profileMenuAnchor)}
                  onClose={handleProfileClose}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      minWidth: 240,
                      borderRadius: 3,
                      boxShadow: 8,
                      background: "linear-gradient(135deg, #e0e0e0 0%, #d1c4e9 100%)",
                    },
                  }}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem onClick={() => { handleProfileClose(); navigate('/account'); }}>
                    <AssignmentIndIcon sx={{ mr: 2 }} />
                    Manage My Account
                  </MenuItem>
                  <MenuItem onClick={() => { handleProfileClose(); navigate('/orders'); }}>
                    <MenuIcon sx={{ mr: 2 }} />
                    My Order
                  </MenuItem>
                  <MenuItem onClick={() => { handleProfileClose(); navigate('/cancellations'); }}>
                    <CancelIcon sx={{ mr: 2 }} />
                    My Cancellations
                  </MenuItem>
                  <MenuItem onClick={() => { handleProfileClose(); navigate('/reviews'); }}>
                    <StarBorderIcon sx={{ mr: 2 }} />
                    My Reviews
                  </MenuItem>
                  <MenuItem onClick={() => {
                    toast.info('Logged out successfully');
                    handleProfileClose(); 
                    // localStorage.removeItem('access_token');
                    localStorage.clear();
                    window.location.reload();
                   }}>
                    <LogoutIcon sx={{ mr: 2 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>

          {/* Mobile: Hamburger, Logo, Icons, Search */}
          <Box sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            px: 1,
          }}>
            {/* Hamburger */}
            <IconButton color="#000" onClick={toggleMobileDrawer(true)} aria-label="open navigation">
              <MenuIcon />
            </IconButton>
       
            {/* Right side icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Search Bar */}
              <Box sx={{ position: "relative", minWidth: 160, mr: 1 }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon sx={{ color: iconColor }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchValue}
                    onChange={e => {
                      setSearchValue(e.target.value);
                      setHighlightedIndex(-1);
                    }}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                    onKeyDown={handleKeyDown}
                    sx={{
                      width: 80,
                      '& .MuiInputBase-input': {
                        width: '8ch'
                      }
                    }}
                  />
                </Search>
                {/* Popup for matched items */}
                {searchFocused && matchedProducts.length > 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      bgcolor: "#fff",
                      color: "#000",
                      boxShadow: 3,
                      borderRadius: 2,
                      zIndex: 10,
                      mt: 1,
                      maxHeight: 200,
                      overflowY: "auto",
                    }}
                  >
                    {matchedProducts.map((product, idx) => (
                      <Box
                        key={product.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          px: 2,
                          py: 1,
                          cursor: "pointer",
                          bgcolor: highlightedIndex === idx ? "#f5f5f5" : "#fff",
                          borderBottom: "1px solid #eee",
                        }}
                        onMouseDown={() => {
                          navigate(`/products/${product.id}`);
                          setSearchValue("");
                          setSearchFocused(false);
                          setHighlightedIndex(-1);
                        }}
                        onMouseEnter={() => setHighlightedIndex(idx)}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          style={{ width: 32, height: 32, objectFit: "contain", marginRight: 8, borderRadius: 6 }}
                        />
                        <Box>
                          <Typography fontWeight={500} fontSize={13}>
                            {product.title}
                          </Typography>
                          <Typography color="#DB4444" fontSize={12}>
                            ${product.price}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
              {/* Favorite Icon */}
              <IconButton
                onClick={() => navigate('/wishlist')}
                size="large"
                aria-label="wishlist"
                color="inherit"
                sx={{ ml: 1 }}
              >
                <Badge badgeContent={wishlist?.length || 0} color="error">
                  <Favorite sx={{ color: iconColor }} />
                </Badge>
              </IconButton>
              {/* Cart Icon */}
              <IconButton
                size="large"
                aria-label="cart"
                color="inherit"
                onClick={() => navigate('/cart')}
                sx={{ ml: 1 }}
              >
                <Badge badgeContent={new Set(cartList.map(i => i.id)).size} color="error">
                  <ShoppingCartIcon sx={{ color: iconColor }} />
                </Badge>
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Mobile Drawer for main navigation */}
      <Drawer anchor="left" open={mobileDrawerOpen} onClose={toggleMobileDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { bgcolor: '#000', color: '#fff' } }}
      >
        <Box sx={{ width: 260 }} role="presentation" onClick={toggleMobileDrawer(false)} onKeyDown={toggleMobileDrawer(false)}>
          <List>
            {tabNames.map((tab) => (
              <ListItem key={tab} disablePadding>
                <ListItemButton onClick={() => navigate(appRoutes[tab])}>
                  <ListItemText primary={tab} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}