import express from "express";
import { getAllProducts, createNewProduct } from "../controllers/products.controller";
import { isAdmin } from "../middlewares/authorization";

const productsRouter = express.Router();

productsRouter.get("/api/products", getAllProducts); // GET all products
productsRouter.post("/api/products", isAdmin, createNewProduct); // POST create new product

export default productsRouter;
