import React, { useEffect, useState } from "react";
import API from "../api/api";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // For animations
import "./Cart.css"; // Animation styles
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await API.get("/cart");
        setCart(data);
        setLoading(false);

        if (data.length === 0) {
          setMessage("Your cart is empty.");
        }
      } catch (err) {
        setMessage("Failed to load cart. Please try again.");
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      const response = await API.delete(`/cart/${productId}`);
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId)); // Remove from UI
      setMessage(response.data.message || "Item removed successfully.");
    } catch (err) {
      setMessage("Failed to remove item from cart.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login page
  };

  return (
    <Box>
      {/* Navigation Bar */}
      <AppBar position="sticky">
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate("/products")}> {/* Updated to "/products" */}
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Cart
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Cart Items */}
      <Box sx={{ width: "90%", margin: "auto", mt: 5 }}>
        <Typography variant="h4" gutterBottom align="center">
          Cart
        </Typography>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TransitionGroup component={Grid} container spacing={3}>
            {cart.map((item) => (
              <CSSTransition key={item.id} timeout={300} classNames="fade">
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ${item.price}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
        {message && (
          <CSSTransition
            in={!!message}
            timeout={300}
            classNames="slide"
            unmountOnExit
          >
            <Alert severity="success" sx={{ mt: 2 }}>
              {message}
            </Alert>
          </CSSTransition>
        )}
      </Box>
    </Box>
  );
};

export default Cart;
