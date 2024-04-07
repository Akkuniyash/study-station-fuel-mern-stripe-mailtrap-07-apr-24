const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: [true, "Please Provide Food Name"],
    trim: true,
    maxLength: [100, "Food Cannot Exceed 100 Characters"],
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {  
    type: String,
    required: [true, "Please Provide Proper Description"],
    maxLength: [67, "Food Cannot Exceed 100 Characters"],
  },
  rating: {
    type: Number,
default: 0, 
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    
    enum: {
      values: [
    "Main Courses",
    "Side Dish",
    "Snacks",
    "Beverages",
    "Desserts",
    "Healthy Options",
    "Local Favorites",
      ],
      message: "Please Select Correct Category",
    },
    required: [true, "Please enter Food Category"],
  },
  availability:{
    type:String,
    required:true,
    default:"no"
  },
 
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user:{
    type:mongoose.Schema.Types.ObjectId
  },
  createdAt: {
    type: Date,
    default: Date.now(), 
  },
});

// Create a model using the schema
const schema  = mongoose.model("Food", foodSchema);

// Export the model
module.exports = schema;
