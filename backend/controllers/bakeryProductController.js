const BakeryProduct = require("../models/bakeryProduct");

const listBakeryProducts = async (req, res) => {
  try {
    const { search = "", category = "" } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { productName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "All") {
      query.category = category;
    }

    const products = await BakeryProduct.find(query).sort({ createdAt: -1 });

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

const createBakeryProduct = async (req, res) => {
  try {
    const payload = normalizeBakeryProductPayload(req.body);
    const product = await BakeryProduct.create(payload);

    res.status(201).json({
      success: true,
      message: "Bakery product created",
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBakeryProduct = async (req, res) => {
  try {
    const payload = normalizeBakeryProductPayload(req.body, true);
    const product = await BakeryProduct.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Bakery product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Bakery product updated",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBakeryProduct = async (req, res) => {
  try {
    const product = await BakeryProduct.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Bakery product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Bakery product deleted",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

function normalizeBakeryProductPayload(body, partial = false) {
  const payload = { ...body };

  if (payload.price !== undefined) payload.price = Number(payload.price);
  if (payload.rating !== undefined) payload.rating = Number(payload.rating);
  if (payload.available !== undefined) payload.available = Boolean(payload.available);

  if (!partial) {
    ["productName", "category", "price"].forEach((field) => {
      if (payload[field] === undefined || payload[field] === "") {
        throw new Error(`${field} is required`);
      }
    });
  }

  return payload;
}

module.exports = {
  listBakeryProducts,
  createBakeryProduct,
  updateBakeryProduct,
  deleteBakeryProduct,
};
