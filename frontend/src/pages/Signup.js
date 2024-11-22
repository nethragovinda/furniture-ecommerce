import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const Signup = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsError(false);

    try {
      const response = await API.post("/signup", form);
      setMessage(response.data.message);
      setIsError(false);
      setForm({ email: "", password: "" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      if (err.response && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
      setIsError(true);
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Section */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            height: "100%",
            backgroundImage: 'url("/images/signup_1.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>
      </Grid>

      {/* Right Section */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            padding: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {/* Logo */}
          <img src="/logo_wbg.png" alt="Furniture Logo" style={{ width: 120, marginBottom: 20 }} />

          <Typography variant="h4" gutterBottom>
            Create Account With Us
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 400 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Sign Up
            </Button>
          </form>
          {message && (
            <Alert severity={isError ? "error" : "success"} sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Button variant="text" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
