import express from "express";
import {getAllProducts,createProduct, updateProduct, deleteProduct, getProductById} from "../controllers/productController.js"; //importing the product controller

const router = express.Router();

  //get all products
router.get("/", getAllProducts);
router.get('/:id',getProductById);
router.post("/",createProduct);
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct);
export default router;

