const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();


const { signupSchema, loginSchema, cartSchema } = require("./src/validators");

const app = express();
const port = process.env.PORT || 5000;

// Database pool setup
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Middleware to Authenticate User
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Expect "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: "Authentication token missing" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach decoded user info to the request
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

// API Routes
// Route: Signup
app.post("/signup", async (req, res) => {
    const { error } = signupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    try {
        await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
            email,
            password,
        ]);
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        if (err.code === "23505") {
            return res.status(400).json({ message: "Email is already registered" });
        }
        res.status(500).json({ error: err.message });
    }
});

// Route: Login
app.post("/login", async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];

        if (user && user.password === password) {
            const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
                expiresIn: "1h",
            });
            res.json({ token });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route: Products
app.get("/products", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, name, description, price, image FROM products");
        res.json(result.rows || []); // Return an empty array if no products are found
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Failed to fetch products" });
    }
});

// Route: Add to Cart
app.post("/cart", authenticate, async (req, res) => {
    const { error } = cartSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { productId } = req.body;
    const userId = req.user.userId;

    try {
        await pool.query("INSERT INTO cart (user_id, product_id) VALUES ($1, $2)", [
            userId,
            productId,
        ]);
        res.status(201).json({ message: "Product added to cart" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route: Get Cart
app.get("/cart", authenticate, async (req, res) => {
    const userId = req.user.userId;

    try {
        const result = await pool.query(
            `SELECT c.id, p.name, p.description, p.price 
             FROM cart c 
             JOIN products p ON c.product_id = p.id 
             WHERE c.user_id = $1`,
            [userId]
        );

        res.json(result.rows); // Return cart items
    } catch (err) {
        console.error("Error fetching cart:", err);
        res.status(500).json({ message: "Failed to fetch cart" });
    }
});

// Route: Remove from Cart
app.delete("/cart/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const result = await pool.query(
            "DELETE FROM cart WHERE id = $1 AND user_id = $2",
            [id, userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        res.status(200).json({ message: "Item removed successfully" });
    } catch (err) {
        console.error("Error removing item from cart:", err);
        res.status(500).json({ message: "Failed to remove item from cart" });
    }
});

// Test route to verify backend
app.get("/", (req, res) => {
    res.send("Backend is running!");
});



// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

// Verify database connection
pool.query("SELECT 1", (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Database connected successfully");
    }
});
