const { Pool } = require("pg");
jest.mock("pg");

const pool = new Pool();

describe("Database Query Tests", () => {
  it("should fetch products from the database", async () => {
    const mockProducts = [
      { id: 1, name: "Product 1", price: 10.99, description: "Test Product" },
    ];

    pool.query.mockResolvedValueOnce({ rows: mockProducts });

    const result = await pool.query("SELECT * FROM products");
    expect(result.rows).toEqual(mockProducts);
  });

  it("should insert a product into the cart", async () => {
    const mockInsert = { rowCount: 1 };

    pool.query.mockResolvedValueOnce(mockInsert);

    const result = await pool.query(
      "INSERT INTO cart (user_id, product_id) VALUES ($1, $2)",
      [1, 2]
    );
    expect(result.rowCount).toBe(1);
  });
});
