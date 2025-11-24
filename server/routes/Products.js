import {
  getAllProducts,
  searchResults,
  addProduct,
} from "../controllers/ProductController.js";
import express from "express";

const router = express.Router();

router.post("/add", addProduct);
router.get("/products", getAllProducts);
router.get("/search", searchResults);

export default router;
