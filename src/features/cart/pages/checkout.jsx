import React, { useState ,useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { billingFormSchemaValidation } from './config';
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from '../hooks/cart';
import { toast } from 'react-toastify';




export default function CheckoutPage() {
    const navigate = useNavigate();
  const [saveInfo, setSaveInfo] = useState(true);
  const [payment, setPayment] = useState("cod");
  const [coupon, setCoupon] = useState("");
  const [showCta, setShowCta] = useState(false);

  const {
      cartList,
      loadCart,
    } = useCart();
  
    useEffect(() => {
      loadCart();
    }, [loadCart]);
    const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(billingFormSchemaValidation)
  });
  
  
   const subtotal = cartList.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (!cartList || cartList.length === 0) {
      return (
        <Box sx={{ background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Typography fontWeight={600} fontSize={24} color="#222" mb={3}>
            No items added
          </Typography>
          <Button
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
            onClick={() => navigate("/")}
          >
            Shop Now
          </Button>
        </Box>
      );
    }




  const onSubmitBilling = handleSubmit(() => {
    navigate('/');
    setShowCta(true);
    toast.success('Order placed successfully!');
  });

  return (
    <Box sx={{ background: "#fff", minHeight: "100vh", py: 5, color: "#222" }}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: 2,
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
        }}
      >
        {/* Billing Details */}
        <Box sx={{ flex: 1.2, minWidth: 340 }}>
          <Typography fontWeight={700} fontSize={34} mb={3}>
            Billing Details
          </Typography>
          <form onSubmit={onSubmitBilling} noValidate>
            <TextField label="First Name" fullWidth sx={{ mb: 1 }} InputLabelProps={{ shrink: true }} {...register('firstName')} />
            {errors.firstName?.message ? (<div style={{ color: 'red', fontSize: 12, marginBottom: 12 }}>{errors.firstName.message}</div>) : null}
            <TextField label="Company Name" fullWidth sx={{ mb: 1 }} InputLabelProps={{ shrink: true }} {...register('company')} />
            <TextField label="Street Address" fullWidth sx={{ mb: 1 }} InputLabelProps={{ shrink: true }} {...register('street')} />
            {errors.street?.message ? (<div style={{ color: 'red', fontSize: 12, marginBottom: 12 }}>{errors.street.message}</div>) : null}
            <TextField label="Apartment, floor, etc. (optional)" fullWidth sx={{ mb: 1 }} InputLabelProps={{ shrink: true }} {...register('apartment')} />
            <TextField label="Town/City" fullWidth sx={{ mb: 1 }} InputLabelProps={{ shrink: true }} {...register('city')} />
            {errors.city?.message ? (<div style={{ color: 'red', fontSize: 12, marginBottom: 12 }}>{errors.city.message}</div>) : null}
            <TextField label="Phone Number" fullWidth sx={{ mb: 1 }} InputLabelProps={{ shrink: true }} {...register('phone')} />
            {errors.phone?.message ? (<div style={{ color: 'red', fontSize: 12, marginBottom: 12 }}>{errors.phone.message}</div>) : null}
            <TextField label="Email Address" fullWidth sx={{ mb: 1 }} InputLabelProps={{ shrink: true }} {...register('email')} />
            {errors.email?.message ? (<div style={{ color: 'red', fontSize: 12, marginBottom: 12 }}>{errors.email.message}</div>) : null}
            <FormControlLabel
              control={
                <Checkbox
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  sx={{
                    color: "#DB4444",
                    "&.Mui-checked": { color: "#DB4444" },
                  }}
                />
              }
              label={
                <Typography fontSize={15}>
                  Save this information for faster check-out next time
                </Typography>
              }
              sx={{ mt: 1 }}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2, background: "#DB4444" }}>Validate</Button>
          </form>
          {showCta ? (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-start' }}>
              <Button onClick={() => navigate('/')} variant="outlined">Go back to Home</Button>
            </Box>
          ) : null}
        </Box>
        {/* Order Summary */}
        <Box
          sx={{
            flex: 1,
            minWidth: 340,
            bgcolor: "#fff",
            color: "#222",
            borderRadius: 2,
            p: 3,
            boxShadow: "0 2px 12px #f3f3f3",
            height: "fit-content",
          }}
        >
          {/* Cart Items */}
          {cartList.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                gap: 2,
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: 48,
                  height: 48,
                  objectFit: "contain",
                  borderRadius: 8,
                  marginRight: 8,
                }}
              />
              <Typography sx={{ flex: 1 }}>{item.title}</Typography>
              <Typography fontWeight={500}>${item.price}</Typography>
            </Box>
          ))}
          {/* Totals */}
          <Box sx={{ mt: 2, mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Subtotal:</Typography>
              <Typography fontWeight={500}>${subtotal}</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
              <Typography>Shipping:</Typography>
              <Typography fontWeight={500}>Free</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Typography fontWeight={600}>Total:</Typography>
              <Typography fontWeight={700}>${subtotal}</Typography>
            </Box>
          </Box>
          {/* Payment Methods */}
          <FormControl component="fieldset" sx={{ mt: 3 }}>
            <RadioGroup
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            >
              <FormControlLabel
                value="bank"
                control={<Radio />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    Bank
                    <img
                      src="https://i.ibb.co/3y8qJwY/bkash.png"
                      alt="bkash"
                      style={{ height: 22 }}
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                      alt="visa"
                      style={{ height: 22 }}
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                      alt="mastercard"
                      style={{ height: 22 }}
                    />
                    <img
                      src="https://i.ibb.co/6bQ7QpT/nagad.png"
                      alt="nagad"
                      style={{ height: 22 }}
                    />
                  </Box>
                }
                sx={{ mb: 0.5 }}
              />
              <FormControlLabel
                value="cod"
                control={<Radio />}
                label="Cash on delivery"
              />
            </RadioGroup>
          </FormControl>
          {/* Coupon */}
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <TextField
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              variant="outlined"
              size="medium"
              sx={{
                bgcolor: "#fff",
                borderRadius: 1,
                flex: 1,
                "& .MuiOutlinedInput-root": { borderRadius: 1 },
              }}
            />
            <Button
              variant="contained"
              sx={{
                background: "#DB4444",
                color: "#fff",
                px: 5,
                borderRadius: 1,
                fontWeight: 500,
                textTransform: "none",
                fontSize: 16,
                "&:hover": { background: "#b83232" },
              }}
            >
              Apply Coupon
            </Button>
          </Box>
          {/* Place Order */}
          <Button
            onClick={onSubmitBilling}
            variant="contained"
            fullWidth
            sx={{
              background: "#DB4444",
              color: "#fff",
              borderRadius: 1,
              fontWeight: 500,
              fontSize: 16,
              py: 1.5,
              textTransform: "none",
              mt: 3,
              "&:hover": { background: "#b83232" },
            }}
          >
            Place Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
}