const Product = require("../models/product");

const listProducts = async (req, res) => {
  try {
    const { search = "", category = "" } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "All") {
      query.category = category;
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const payload = normalizeProductPayload(req.body);
    const product = await Product.create(payload);

    res.status(201).json({
      success: true,
      message: "Product created",
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const payload = normalizeProductPayload(req.body, true);
    const product = await Product.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

function normalizeProductPayload(body, partial = false) {
  const payload = { ...body };

  if (typeof payload.tags === "string") {
    payload.tags = payload.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  if (payload.price !== undefined) payload.price = Number(payload.price);
  if (payload.discount !== undefined) payload.discount = Number(payload.discount);
  if (payload.stock !== undefined) payload.stock = Number(payload.stock);
  if (payload.available !== undefined) payload.available = Boolean(payload.available);

  if (!partial) {
    ["title", "category", "price"].forEach((field) => {
      if (payload[field] === undefined || payload[field] === "") {
        throw new Error(`${field} is required`);
      }
    });
  }

  return payload;
}

module.exports = {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
