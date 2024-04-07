import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewFood } from "../../actions/foodsAction";
import { clearError, clearFoodCreated } from "../../slices/foodSlice";
import { toast } from "react-hot-toast";
import {motion} from 'framer-motion'
import MetaData from "../layouts/MetaData"; 

export default function NewFood() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, isFoodCreated, error } = useSelector(
    (state) => state.foodState
  );

  const categories = [
    "Main Courses",
    "Side Dish",
    "Snacks",
    "Beverages",
    "Desserts",
    "Healthy Options",
    "Local Favorites",
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("foodName", name);
    formData.append("price", price);
    formData.append("availability", availability);
    formData.append("description", description);
    formData.append("category", category);
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(createNewFood(formData));
  };

  useEffect(() => {
    if (isFoodCreated) {
      toast.success("Food Item Created Successfully!",{
                      
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      dispatch(clearFoodCreated());
      navigate("/admin/foods");
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
  }, [isFoodCreated, error, dispatch]);

  return (
    <>
    <MetaData title='Admin  NewFood' />
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
          viewport={{ once: true }}>
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div
            className="col-md-6 rounded-4 justify-content-center align-items-center flex-column left-box"
            style={{ backgroundColor: "#16a085" }}
          >
            <div className="featured-image">
              <img
                src="/images/newFood.png"
                className="img-fluid"
                style={{ width: "350px" }}
                alt=""
              />
              <p
                className="text-white fs-2   "
                style={{
                  fontFamily: "Courier New,Courier,monospace",
                  fontWeight: "600",
                }}
              >
                New Food Item
              </p>
              <small
                className="text-white text-wrap text-center"
                style={{
                  width: "17rem",
                  fontFamily: "Courier New,Courier,monospace",
                }}
              >
                "Let the new food be the favorite of students."
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
                    className="form-control form-control-lg bg-light fs-6 form-select"
                    aria-label="Default select example"
                    onChange={(e) => setCategory(e.target.value)}
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
                {/* Avatar Input */}
                <div className="input-group mb-2 d-flex flex-column align-items-start flex-wrap">
                  <label htmlFor="avatar" className="form-label ms-1">
                    Select Food Pics
                  </label>

                  <div>
                    <input
                      type="file"
                      className="form-control form-control-lg bg-light fs-6"
                      id="avatar"
                      placeholder="Choose Profile Pic"
                      multiple
                      onChange={onImagesChange}
                      name="food_images"
                    />
                  </div>
                </div>

                {/* Avatar Preview */}

                <div className="mb-2 ">
                  {imagesPreview.map((image) => (
                    <img
                      src={image}
                      key={image}
                      alt="Foods Preview"
                      className="img-fluid rounded-circle shadow "
                      style={{ width: "50px", height: "50px" }}
                    />
                  ))}
                </div>

                <div className="input-group mb-3 ">
                  <motion.button
                  type='submit'
                    className="btn btn-lg  w-100 fs-6 login-btn1"
                    disabled={loading}
                    id='newFoodCreate'
                    whileTap={{ scale: 0.85 }}
                  >
                    Create
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    </>
  );
}
