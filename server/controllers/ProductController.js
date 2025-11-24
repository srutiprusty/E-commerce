import { Product } from "../models/Product.js";
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    //console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const searchResults = async (req, res) => {
  try {
    const { q } = req.query;
    const results = await Product.find({
      name: { $regex: q, $options: "i" },
    }).limit(5);
    // console.log(results);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, rating, image } = req.body;
    if (!name || !description || !price || !category) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      rating: rating || 0,
      image,
    });
    const savedProduct = await newProduct.save();

    return res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
};
