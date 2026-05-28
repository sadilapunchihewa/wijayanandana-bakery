const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  listBakeryProducts,
  createBakeryProduct,
  updateBakeryProduct,
  deleteBakeryProduct,
} = require("../controllers/bakeryProductController");

const router = express.Router();

router.get("/", listBakeryProducts);
router.post("/", protect, createBakeryProduct);
router.put("/:id", protect, updateBakeryProduct);
router.delete("/:id", protect, deleteBakeryProduct);

module.exports = router;
