const express = require("express");
const {
  getFoods,
  newFood,
  getSingleFood,
  updateFood,
  deleteFood,
  createReview,
  getReviews,
  deleteReviews,
  getAdminFoods,
} = require("../controllers/foodControllers");
const {
  isAuthenticatedUser,
  authorizeRole,
} = require("../middlewares/authenticate");

const router = express.Router();

const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/food"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

router.route("/foods").get(getFoods);
router.route("/food/:id").get(getSingleFood);
router.route("/food/:id").delete(deleteFood);
router.route("/reviews").put(isAuthenticatedUser, createReview);
router.route("/reviews").delete(deleteReviews);

// Admin
router
  .route("/admin/food/new")
  .post(
    isAuthenticatedUser,
    authorizeRole("admin"),
    upload.array("images"),
    newFood
  );
router
  .route("/admin/food/:id")
  .put(
    isAuthenticatedUser,
    authorizeRole("admin"),
    upload.array("images"),
    updateFood
  );
router
  .route("/admin/foods")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAdminFoods);
router
  .route("/admin/food/:id")
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteFood);

  router.route("/admin/reviews").get(isAuthenticatedUser, authorizeRole('admin'), getReviews);
  router.route('/admin/review').delete(isAuthenticatedUser, authorizeRole('admin'),deleteReviews);


module.exports = router;
