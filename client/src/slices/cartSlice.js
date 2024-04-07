import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    loading: false,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {},
  },
  reducers: {
    addCartItemRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },
    addCartItemSuccess(state, actions) {
      const item = actions.payload;
      const isItemExist = state.items.find((i) => i.food === item.food);
      if (isItemExist) {
        state = {
          ...state,
          loading: false,
        };
      } else {
        state = {
          items: [...state.items, item],
          loading: false,
        };
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
      return state;
    },
    increaseCartQuantity(state, action) {
      state.items = state.items.map((item) => {
        if (item.food === action.payload) {
          item.quantity = item.quantity + 1;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    decreaseCartQuantity(state, action) {
      state.items = state.items.map((item) => {
        if (item.food === action.payload) {
          item.quantity = item.quantity - 1;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeItemFromCart(state, action) {
      const filterItems = state.items.filter((item) => {
        return item.food !== action.payload;
      });
      localStorage.setItem("cartItems", JSON.stringify(filterItems));
      return {
        ...state,
        items: filterItems,
      };
    },
    saveUserInfo(state, action) {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return {
        ...state,
        userInfo: action.payload,
      };
    },
    orderCompleted(state, action) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cartItems");
      sessionStorage.removeItem("orderInfo");
      return {
        items: [],
        loading: false,
        userInfo: {},
      };
    },
  },
});
const { actions, reducer } = cartSlice;
export const {
  addCartItemRequest,
  addCartItemSuccess,
  decreaseCartQuantity,
  increaseCartQuantity,
  removeItemFromCart,
  saveUserInfo,
  orderCompleted,
} = actions;
export default reducer;
