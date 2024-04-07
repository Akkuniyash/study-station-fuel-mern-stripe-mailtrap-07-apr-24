import {  useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getFood, updateFood } from "../../actions/foodsAction";
import { clearError, clearFoodUpdated } from "../../slices/foodSlice";
import { toast } from "react-hot-toast";
import React from 'react'
import {motion} from 'framer-motion'
import MetaData from "../layouts/MetaData";

const UpdateFood = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  
  const { loading, isFoodUpdated, error,food } = useSelector(
    (state) => state.foodState
  );
  const {id:foodId}=useParams()

  const categories = [
    "Main Courses",
    "Side Dish",
    "Snacks",
    "Beverages",
    "Desserts",
    "Healthy Options",
    "Local Favorites",
  ];

  const dispatch = useDispatch();
  

  
  
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("foodName", name);
    formData.append("price", price);
    formData.append("availability", availability);
    formData.append("description", description);
    formData.append("category", category);
    
    dispatch(updateFood(foodId,formData));
  };
 
  useEffect(() => {
    if (isFoodUpdated) {
      toast.success("Food Item Updated Successfully!",{
                      
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      dispatch(clearFoodUpdated());
      return;
    }

    if (error) {
      toast.error(error,{
                      
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      dispatch(clearError());
      return;
    }
    dispatch(getFood(foodId))
  }, [isFoodUpdated, error, dispatch,foodId]);
  useEffect(() => {
    if(food._id)
    {
      setName(food.foodName)
      setPrice(food.price)
      setDescription(food.description)
      setCategory(food.category)
      setAvailability(food.availability)
     
    }
  }, [food]);

  return (
    <>
    <MetaData title='Admin Update Food' />
    <div className="row">
    <div className="col-md-2 col-12">
      <Sidebar />
    </div>
    <motion.div className="col-md-10 d-flex justify-content-center align-items-center mt-5 mb-5"
     initial={{
      opacity: 0,
      // if odd index card,slide from right instead of left
      x:-50,
    }}
    whileInView={{
      opacity: 1,
      x: 0, // Slide in to its original position
      transition: {
        duration: 0.75, // Animation duration
      },
    }}
    viewport={{ once: true }}
    >
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div
          className="col-md-6 rounded-4 justify-content-center align-items-center flex-column left-box"
          style={{ backgroundColor: "#feca57" }}
        >
          <div className="featured-image"> 
          <img
          src="/images/updateFood.png"
          className="img-fluid mt-3"
          alt=""/>

            <p
              className="text-white fs-2   "
              style={{
                fontFamily: "Courier New,Courier,monospace",
                fontWeight: "600",
              }}
            >
              Update Food
            </p>
            <small
              className="text-white text-wrap text-center"
              style={{
                width: "17rem",
                fontFamily: "Courier New,Courier,monospace",
              }}
            >
              Update the contents of yor food items
            </small>
          </div>
        </div>
        <div className="col-md-6 right-box">
          <div className="row align-items-center ">
            <form onSubmit={submitHandler}>
              <div className="header-text mb-4">
                <h2>Welcome Sir/Mam !!</h2>
                <p>New Food Item !!</p>
              </div>

              {/* input fields */}
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6 "
                  placeholder="Name"
                  name="name_field"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="input-group mb-2">
                <input
                  type="number"
                  className="form-control form-control-lg bg-light fs-6 "
                  placeholder="Price"
                  name="price_field"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>
              <div className="form-group mb-2">
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder="Description"
                ></textarea>
              </div>
              <div className="input-group mb-2">
                <select
                 value={category}
                  className="form-control form-control-lg bg-light fs-6 form-select"
                  aria-label="Default select example"
                  onChange={(e) => setCategory(e.target.value)
                 
                }
                >
                  <option selected className="color-dark" disabled >
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option id="opt-dept" key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-2">
                <select
                 value={availability}
                  className="form-control form-control-lg bg-light fs-6 form-select"
                  aria-label="Default select example"
                  onChange={(e) => setAvailability(e.target.value)}
                >
                  <option selected className="color-dark" disabled>
                    Select Availability
                  </option>

                  <option id="opt-dept" value="yes">
                    yes
                  </option>
                  <option id="opt-dept" value="no">
                    no
                  </option>
                </select>
              </div>

              {/* Avatar Input with choose a
              vatar place holder browse button for adding images and in the leftside a round circle preview */}

              <div className="input-group mb-3 ">
                <motion.button
                  className="btn btn-lg  w-100 fs-6 "
                  id="updateFood"
                  disabled={loading}
                  type="submit"
                  whileTap={{ scale: 0.85 }}
                >
                  Update
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
  </>
  )
}

export default UpdateFood
