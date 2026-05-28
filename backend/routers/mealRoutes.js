const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  listMeals,
  createMeal,
  updateMeal,
  deleteMeal,
} = require("../controllers/mealController");

const router = express.Router();

router.get("/", listMeals);
router.post("/", protect, createMeal);
router.put("/:id", protect, updateMeal);
router.delete("/:id", protect, deleteMeal);

module.exports = router;
