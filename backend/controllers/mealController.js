const Meal = require("../models/meal");

const listMeals = async (req, res) => {
  try {
    const { search = "", category = "" } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { mealName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "All") {
      query.category = category;
    }

    const meals = await Meal.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      meals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createMeal = async (req, res) => {
  try {
    const payload = normalizeMealPayload(req.body);
    const meal = await Meal.create(payload);

    res.status(201).json({
      success: true,
      message: "Meal created",
      meal,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMeal = async (req, res) => {
  try {
    const payload = normalizeMealPayload(req.body, true);
    const meal = await Meal.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: "Meal not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Meal updated",
      meal,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: "Meal not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Meal deleted",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

function normalizeMealPayload(body, partial = false) {
  const payload = { ...body };

  if (payload.price !== undefined) payload.price = Number(payload.price);
  if (payload.rating !== undefined) payload.rating = Number(payload.rating);
  if (payload.available !== undefined) payload.available = Boolean(payload.available);

  if (!partial) {
    ["mealName", "category", "price"].forEach((field) => {
      if (payload[field] === undefined || payload[field] === "") {
        throw new Error(`${field} is required`);
      }
    });
  }

  return payload;
}

module.exports = {
  listMeals,
  createMeal,
  updateMeal,
  deleteMeal,
};
