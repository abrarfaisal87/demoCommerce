import pool from "../config/db.js";

//to get all the available products
export const getAllProducts = async (req, res) => {
  try {
    const { rows } = await pool.query(`
         SELECT * FROM products
         ORDER BY created_at DESC 
         `);
    console.log("fetched products", rows);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.log("Error in getAllProducts", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//to get product by id
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      `
      SELECT * FROM products where id=$1`,
      [id]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    console.log("Product fetched by id;", rows[0]);
    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    console.log("Error in getProductById", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//to create a new product
export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the required fields",
    });
  }
  try {
    const { rows } = await pool.query(
      `
            INSERT INTO products (name,price,image)
            VALUES ($1,$2,$3)
            RETURNING *
            `,
      [name, price, image]
    );
    console.log("Created new product:", rows);
    res.status(201).json({ success: true, data: rows[0] });
  } catch (error) {
    console.log("Error in createProduct", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  try {
    const { rows } = await pool.query(
      ` UPDATE products SET name=$1,price=$2,image=$3 WHERE id=$4 RETURNING *`,
      [name, price, image, id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    console.log("Error in updateProduct", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      `
      DELETE FROM products WHERE id=$1 RETURNING *`,
      [id]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//4Jv6mbn3JxF0CiCh
