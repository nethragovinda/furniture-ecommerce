import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsError(false);

    try {
      const { data } = await API.post("/login", form);
      localStorage.setItem("token", data.token);
      setMessage("Login successful!");
      setIsError(false);
      setTimeout(() => navigate("/products"), 1500);
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#F5F5F5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 400,
          padding: 3,
          textAlign: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* Logo */}
        <img src="/logo_wbg.png" alt="Furniture Logo" style={{ width: 120, marginBottom: 20 }} />

        <Typography variant="h4" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sign in to access your furniture dashboard.
        </Typography>
        <form onSubmit={handleSubmit}>
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
            Sign In
          </Button>
        </form>
        {message && (
          <Alert severity={isError ? "error" : "success"} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Button variant="text" onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
