import { createSlice } from "@reduxjs/toolkit";
const foodSlice = createSlice({
  name: "food",
  initialState: {
    loading: false,
    food: {},
    isReviewSubmitted: false,
    isFoodCreated: false,
    isFoodUpdated: false,
    isReviewDeleted:false,
    reviews:[]
  },
  reducers: {
    foodRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    foodSucess(state, action) {
      return {
        ...state,
        loading: false,
        food: action.payload.food,
      };
    },
    foodFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    createReviewRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    createReviewSuccess(state, action) {
      return {
        loading: false,
        isReviewSubmitted: true,
      };
    },
    createReviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearReviewSubmitted(state, action) {
      return {
        ...state,
        isReviewSubmitted: false,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    clearFood(state, action) {
      return {
        ...state,
        food: {},
      };
    },
    deleteFoodRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteFoodSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isFoodDeleted: true,
      };
    },
    deleteFoodFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearFoodDeleted(state, action) {
      return {
        ...state,
        isFoodDeleted: false,
      };
    },
    newFoodRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    newFoodSuccess(state, action) {
      return {
        ...state,
        loading: false,
        food: action.payload.food,
        isFoodCreated: true,
      };
    },
    newFoodFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearFoodCreated(state, action) {
      return {
        ...state,
        isFoodCreated: false,
      };
    },
    updateFoodRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateFoodSuccess(state, action) {
      return {
        ...state,
        loading: false,
        food: action.payload.food,
        isFoodUpdated:true
      
      };
    },
    updateFoodFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
     
      }; 
    },
    clearFoodUpdated(state,action)
    {
      return{
        ...state,
        isFoodUpdated:false
      }
    },
    reviewsRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    reviewsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        reviews: action.payload.reviews,
      
      };
    },
    reviewsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }; 
    },
    deleteReviewRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteReviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isReviewDeleted:true
      
      };
    },
    deleteReviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,

      }; 
    },
    clearReviewDeleted(state,action)
    {
      return{
        ...state,
        isReviewDeleted:false
      }
    },
  },
  reviewsRequest(state, action) {
    return {
      ...state,
      loading: true,
    };
  },
  reviewsSuccess(state, action) {
    return {
      ...state,
      loading: false,
      reviews: action.payload.reviews,
    
    };
  },
  reviewsFail(state, action) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    }; 
  },
  deleteReviewRequest(state, action) {
    return {
      ...state,
      loading: true,
    };
  },
  deleteReviewSuccess(state, action) {
    return {
      ...state,
      loading: false,
      isReviewDeleted:true
    
    };
  },
  deleteReviewFail(state, action) {
    return {
      ...state,
      loading: false,
      error: action.payload,

    }; 
  },
  clearReviewDeleted(state,action)
  {
    return{
      ...state,
      isReviewDeleted:false
    }
  },

});

const { actions, reducer } = foodSlice;
export const {
  foodRequest,
  foodSucess,
  foodFail,
  createReviewFail,
  createReviewRequest,
  createReviewSuccess,
  clearError,
  clearReviewSubmitted,
  clearFood,
  clearFoodDeleted,
  deleteFoodFail,
  deleteFoodRequest,
  deleteFoodSuccess,
  newFoodFail,
  newFoodRequest,
  newFoodSuccess,
  clearFoodCreated,
  updateFoodFail,
  updateFoodRequest,
  updateFoodSuccess,
  clearFoodUpdated
  ,reviewsRequest,reviewsSuccess,reviewsFail,clearReviewDeleted,deleteReviewFail,deleteReviewRequest,deleteReviewSuccess
} = actions;

export default reducer;