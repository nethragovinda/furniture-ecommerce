const request = require("supertest");
const app = require("../src/index"); // Your Express app

describe("API Integration Tests", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/signup").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  it("should login a user", async () => {
    const response = await request(app).post("/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should fetch products", async () => {
    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should add a product to the cart", async () => {
    const token = "your-test-token"; // Mock a valid JWT token
    const response = await request(app)
      .post("/cart")
      .set("Authorization", `Bearer ${token}`)
      .send({ productId: 1 });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Product added to cart");
  });
});
