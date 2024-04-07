import { createSlice } from "@reduxjs/toolkit";

const foodsSlice = createSlice({
  name: "foods",
  initialState: {
    loading: false,
  },
  reducers: {
    foodsRequest(state, action) {
      return {
        loading: true,
      };
    },
    foodsSuccess(state, action) {
      return {
        loading: false,
        foods: action.payload.foods,
        foodsCount: action.payload.count,
        resPerPage: action.payload.resPerPage,
      };
    },
    foodsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    adminFoodsRequest(state, action) {
      return {
        loading: true,
      };
    },
    adminFoodsSuccess(state, action) {
      return {
        loading: false,
        foods: action.payload.foods,
      };
    },
    adminFoodsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

const { actions, reducer } = foodsSlice;

export const {
  foodsRequest,
  foodsSuccess,
  foodsFail,
  adminFoodsFail,
  adminFoodsRequest,
  adminFoodsSuccess,
  clearError,
} = actions;

export default reducer;
