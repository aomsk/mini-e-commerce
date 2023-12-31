import { Request, Response } from "express";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { pool } from "../config";
import slugify from "slugify";

// get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const [products] = await pool.query<RowDataPacket[]>("SELECT * FROM products");
    if (products.length === 0) {
      throw new Error("Product not found");
    }
    res.status(200).json({ message: "Get all products successfully", products });
  } catch (error: any) {
    return res.status(400).json({ status: "error", message: error.message });
  }
};

// get product by slug
export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const [product] = await pool.query<RowDataPacket[]>("SELECT * FROM products WHERE slug = ?", [slug]);
    if (product.length === 0) {
      throw new Error("Product not found");
    }
    return res.status(200).json({ message: "Get product by slug successfully", product: product[0] });
  } catch (error: any) {
    return res.status(400).json({ status: "error", message: error.message });
  }
};

// update product by product_id
export const updateProductByID = async (req: Request, res: Response) => {
  try {
    const { product_id, name, description, price, quantity } = req.body;
    if (!product_id || !name || !description || !price || !quantity) {
      throw new Error("Please provide a name, description, price and quantity");
    }
    const slug = slugify(name, { lower: true });

    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE products SET `name`=?, `description`=?, `price`=?, `quantity`=?, `slug`=? WHERE `product_id` = ?",
      [name, description, price, quantity, slug, product_id]
    );

    if (result.affectedRows === 0) {
      throw new Error("Can't update products");
    }

    const updateProduct = {
      product_id,
      name,
      description,
      price,
      quantity,
      slug,
    };
    return res.status(200).json({ message: "Updated products successfully", updateProduct });
  } catch (error: any) {
    return res.status(400).json({ status: "error", message: error.message });
  }
};

// delete product by product_id
export const deleteProductByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Please provide a product_id");
    }

    // check product is existing in db
    const [product] = await pool.query<RowDataPacket[]>("SELECT * FROM products WHERE product_id = ?", [id]);
    if (product.length === 0) {
      throw new Error("Product not found");
    }

    // delete product by product_id
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM products WHERE product_id = ?", [id]);
    if (result.affectedRows === 0) {
      throw new Error("Can't delete products");
    }

    return res.status(200).json({ message: "Delete products successfully" });
  } catch (error: any) {
    return res.status(400).json({ status: "error", message: error.message });
  }
};

// create a new product
export const createNewProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, quantity } = req.body;
    if (!name || !description || !price || !quantity) {
      throw new Error("Please provide a name, description, price and quantity");
    }
    // create slug
    const slug = slugify(name, { lower: true });

    // check product is already exists in db
    const [product] = await pool.query<RowDataPacket[]>("SELECT * FROM products WHERE slug = ?", [slug]);
    if (product.length > 0) {
      throw new Error("Product is already exists");
    }

    // insert product to db
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO `products` (name, description, price, quantity, slug) VALUES (?, ?, ?, ?, ?)",
      [name, description, price, quantity, slug]
    );

    if (result.affectedRows === 0) {
      throw new Error("Product created failed");
    }

    const newProduct = {
      product_id: result.insertId,
      name,
      description,
      price,
      quantity,
      slug,
    };
    return res.status(201).json({ message: "Product created successfully", newProduct });
  } catch (error: any) {
    return res.status(400).json({ status: "error", message: error.message });
  }
};
