const Food = require("../models/foodModel");
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");

exports.getFoods = catchAsyncError(async (req, res, next) => {
  const resPerPage = 3;

  let buildQuery = () => {
    return new APIFeatures(Food.find(), req.query).search().filter();
  };

  const filteredFoodsCount = await buildQuery().query.countDocuments({});
  const totalFoodsCount = await Food.countDocuments({});
  let foodsCount = totalFoodsCount;

  if (filteredFoodsCount !== totalFoodsCount) {
    foodsCount = filteredFoodsCount;
  }

  const foods = await buildQuery().paginate(resPerPage).query;

  res.status(200).json({
    success: true,
    count: foodsCount,
    resPerPage,
    foods,
  });
});
exports.newFood = catchAsyncError(async (req, res, next) => {
  let images = [];
  let BASE_URL = process.env.SERVER_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }
  if (req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/food/${file.originalname}`;
      images.push({ image: url });
    });
  }
  req.body.images = images;
  req.body.user = req.user.id;
  const food = await Food.create(req.body);

  res.status(201).json({
    success: true,
    food,
  });
});

exports.getSingleFood = catchAsyncError(async (req, res, next) => {
  const food = await Food.findById(req.params.id).populate(
    "reviews.user",
    "name email"
  );
  if (!food) {
    return next(new errorHandler("food item not found", 404));
  }
  res.status(200).json({
    success: true,
    food,
  });
});
exports.updateFood = catchAsyncError(async (req, res, next) => {
  let food = await Food.findById(req.params.id);
  
  if (!food) {
    return res.status(404).json({
      success: false,
      message: "Food Item Not Found",
    });
  }
  food = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    succes: true,
    message: "Food Item Updated Successfully",
    food,
  });
});

exports.deleteFood = catchAsyncError(async (req, res, next) => {
  const food = Food.findById(req.params.id);
  if (!food) {
    return res.status(404).json({
      succes: false,
      message: "Food Item Not found",
    });
  }
  await Food.deleteOne(food);
  res.status(200).json({
    succes: false,
    message: "Food Item Deleted",
  });
});

exports.createReview = catchAsyncError(async (req, res, next) => {
  const { foodId, rating, comment } = req.body;
  const review = {
    user: req.user.id,
    rating,
    comment,
  };
  const food = await Food.findById(foodId);

  const isReviewed = food.reviews.find((review) => {
    if (review.user.toString() == req.user.id.toString()) {
      return true;
    }
  });

  if (isReviewed) {
    food.reviews.find((review) => {
      if (review.user.toString() == req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    food.reviews.push(review);
    food.numOfReviews = food.reviews.length;
  }
  food.rating =
    food.reviews.reduce((acc, review) => {
      return acc + review.rating;
    }, 0) / food.reviews.length;

  food.rating = isNaN(food.rating) ? 0 : food.rating;

  await food.save({ validatorsBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

exports.getReviews = catchAsyncError(async (req, res, next) => {
  const food = await Food.findById(req.query.id).populate('reviews.user','name email');

  res.status(200).json({
    success: true,
    reviews: food.reviews,
  });
});
exports.deleteReviews = catchAsyncError(async (req, res, next) => {
  const food = await Food.findById(req.query.foodId);
  const reviews = food.reviews.filter((review) => {
    return review._id.toString() != req.query.id.toString();
  });
  const numOfReviews = reviews.length;
  let rating =
    reviews.reduce((acc, review) => {
      return acc + review.rating;
    }, 0) / food.reviews.length;

  rating = isNaN(rating) ? 0 : rating;

  await Food.findByIdAndUpdate(req.query.foodId, {
    reviews,
    numOfReviews,
    rating,
  });

  res.status(200).json({
    success: true,
  });
});
// get admin foods  - api/v1/admin/foods
exports.getAdminFoods = catchAsyncError(async (req, res, next) => {
  const foods = await Food.find();
  res.status(200).send({
    success: true,
    foods,
  });
});

//Delete Food - api/v1/admin/foods/:id
exports.deleteFood = catchAsyncError(async (req, res, next) => {
  const food = await Food.findById(req.params.id);

  if (!food) {
    return res.status(404).json({
      success: false,
      message: "food not found",
    });
  }

  await food.deleteOne();

  res.status(200).json({
    success: true,
    message: "food Deleted!",
  });
});
