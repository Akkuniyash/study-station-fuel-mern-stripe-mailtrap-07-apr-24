import axios from "axios";
import {
  adminFoodsFail,
  adminFoodsRequest,
  adminFoodsSuccess,
  foodsFail,
  foodsRequest,
  foodsSuccess,
} from "../slices/foodsSlice";
import {
  createReviewFail,
  createReviewRequest,
  createReviewSuccess,
  foodFail,
  foodRequest,
  foodSucess,
  deleteFoodRequest,
  deleteFoodFail,
  deleteFoodSuccess,
  newFoodFail,
  newFoodSuccess,
  newFoodRequest,
  updateFoodRequest,
  updateFoodSuccess,
  updateFoodFail,
  reviewsRequest,
  reviewsSuccess,
  reviewsFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,
} from "../slices/foodSlice";

export const getFoods =
  (keyword, price, category, rating, currentPage) => async (dispatch) => {
    try {
      dispatch(foodsRequest());
      let link = `/api/v1/foods?page=${currentPage}`;
      if (keyword) {
        link += `&keyword=${keyword}`;
      }
      if (price) {
        link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }
      if (category) {
        link += `&category=${category}`;

        // Exclude keyword if both keyword and category are present
        if (keyword) {
          link = link.replace(`&keyword=${keyword}`, "");
        }
      }
      if (rating) {
        link += `&rating=${rating}`;
      }
      const { data } = await axios.get(link);
      dispatch(foodsSuccess(data));
    } catch (error) {
      dispatch(foodsFail(error.response.data.message));
    }
  };
export const getFood = (id) => async (dispatch) => {
  try {
    dispatch(foodRequest());
    const { data } = await axios.get(`/api/v1/food/${id}`);
    dispatch(foodSucess(data));
  } catch (error) {
    dispatch(foodFail(error.response.data.message));
  }
};
export const createReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(createReviewRequest());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/v1/reviews`, reviewData, config);
    dispatch(createReviewSuccess(data));
  } catch (error) {
    dispatch(createReviewFail(error.response.data.message));
  }
};
export const getAdminFoods = async (dispatch) => {
  try {
    dispatch(adminFoodsRequest());
    const { data } = await axios.get("/api/v1/admin/foods");
    dispatch(adminFoodsSuccess(data));
  } catch (error) {
    dispatch(adminFoodsFail(error.response.data.message));
  }
};
export const deleteFood = (id) => async (dispatch) => {
  try {
    dispatch(deleteFoodRequest());
    await axios.delete(`/api/v1/admin/food/${id}`);
    dispatch(deleteFoodSuccess());
  } catch (error) {
    dispatch(deleteFoodFail(error.response.data.message));
  }
};

export const createNewFood = (foodData) => async (dispatch) => {
  try {
    dispatch(newFoodRequest());
    const { data } = await axios.post("/api/v1/admin/food/new", foodData);
    dispatch(newFoodSuccess(data));
  } catch (error) {
    dispatch(newFoodFail(error.response.data.message));
  }
};

export const updateFood=(id,foodData)=>async(dispatch)=>{
  try {
      dispatch(updateFoodRequest())
      const {data}=await axios.put(`/api/v1/admin/food/${id}`,foodData)
      dispatch(updateFoodSuccess(data))
  } catch (error) {
      dispatch(updateFoodFail(error.response.data.message))
  }
}
export const getReviews =  id => async (dispatch) => {

  try {  
      dispatch(reviewsRequest()) 
      const { data }  =  await axios.get(`/api/v1/admin/reviews`,{params: {id}});
      dispatch(reviewsSuccess(data))
  } catch (error) {
      //handle error
      dispatch(reviewsFail(error.response.data.message))
  }
    
}

export const deleteReview =  (foodId, id) => async (dispatch) => {

  try {  
      dispatch(deleteReviewRequest()) 
      await axios.delete(`/api/v1/admin/review`,{params: {foodId, id}});
      dispatch(deleteReviewSuccess())
  } catch (error) {
      //handle error
      dispatch(deleteReviewFail(error.response.data.message))
  }
  
}