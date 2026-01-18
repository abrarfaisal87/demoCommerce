// npm i express dotenv cors helmet morgan @arcjet/node

import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js"; //importing the product routes
import pool from "./config/db.js";

dotenv.config(); //load env variables from .env filw

const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(helmet()); //adds various http headers to protect the app
app.use(morgan("dev")); //log the requests to the console
app.use(express.json()); //parse json data
app.use(cors());

app.get("/test", (req, res) => {
  res.send("hello from the server");
  console.log(res.getHeaders());
});

app.use("/api/products", productRoutes);

async function initDB() {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        )
        `);
    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error initDB", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
