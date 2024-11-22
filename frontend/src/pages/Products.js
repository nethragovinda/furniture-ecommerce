import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        console.log("Products API response:", data); // Log the response
        setProducts(Array.isArray(data) ? data : []); //new
       // setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
        setLoading(false);
      }
    };

    // Fetch initial cart count
    const fetchCartCount = async () => {
      try {
        const { data } = await API.get("/cart");
        setCartCount(data.length);
      } catch (err) {
        console.error("Error fetching cart count:", err);
      }
    };

    fetchProducts();
    fetchCartCount();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await API.post("/cart", { productId });
      setCartCount((prevCount) => prevCount + 1);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <Box>
      {/* Navigation Bar */}
      <AppBar position="sticky">
        <Toolbar>
          <img src="/logo_wbg.png" alt="Furniture Logo" style={{ height: 40, marginRight: 16 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Furniture
          </Typography>
          <IconButton color="inherit" onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Banner Section */}
      <Box
        sx={{
          width: "100%",
          height: 300,
          backgroundImage: 'url("/images/products_banner.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
        }}
      >
        <Typography variant="h2">Beautiful Furniture for Your Home</Typography>
      </Box>

      {/* Product Listings */}
      <Box sx={{ width: "90%", margin: "auto", mt: 5 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Our Products
          </Typography>
        </Box>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  sx={{
                    height: 400, // Standardized height for all cards
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)", // Enlarge card on hover
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250" // Fixed height for images
                    image={`/images/${product.image}`}
                    alt={product.name}
                    sx={{
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)", // Zoom image slightly on hover
                      },
                    }}
                  />
                  <CardContent
                    sx={{
                      padding: "8px 16px", // Compact padding
                      flexGrow: 1, // Ensures details and button use remaining space
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between", // Distribute details evenly
                    }}
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {product.name} {/* Display product name */}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {product.description} {/* Display product description */}
                      </Typography>
                    </Box>
                    <Typography variant="h6" color="primary" sx={{ mt: "auto" }}>
                      ${Number(product.price).toFixed(2)} {/* Display product price */}
                    </Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Products;
