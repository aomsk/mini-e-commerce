import express from "express";
import { getAllProducts, getProductBySlug, createNewProduct, updateProductByID } from "../controllers/products.controller";
import { isAdmin } from "../middlewares/authorization";

const productsRouter = express.Router();

productsRouter.get("/api/products", getAllProducts); // GET all products
productsRouter.get("/api/product/:slug", getProductBySlug); // GET product by slug
productsRouter.post("/api/products", isAdmin, createNewProduct); // POST create new product
productsRouter.put("/api/products", isAdmin, updateProductByID); // PUT update product by ID

export default productsRouter;
