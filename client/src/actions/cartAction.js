import { addCartItemRequest, addCartItemSuccess } from "../slices/cartSlice";
import axios from "axios";
export const addCartItem = (id, quantity) => async (dispatch) => {
  try {
    dispatch(addCartItemRequest());
    const { data } = await axios.get(`/api/v1/food/${id}`);
    dispatch(
      addCartItemSuccess({
        food: data.food._id,
        name: data.food.foodName,
        price: data.food.price,
        image: data.food.images[0].image,
        availability: data.food.availability,
        quantity,
      })
    );
  } catch (error) {}
};
