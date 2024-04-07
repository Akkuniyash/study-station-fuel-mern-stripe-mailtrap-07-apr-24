import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { createReview, getFood } from "../../actions/foodsAction";
import { useParams } from "react-router-dom";
import Loader from "../layouts/Loader";
import { Carousel, CarouselItem } from "react-bootstrap";
import MetaData from "../layouts/MetaData";
import { toast } from "react-hot-toast";
import { addCartItem } from "../../actions/cartAction";
import { Modal } from "react-bootstrap";

import {
  clearError,
  clearReviewSubmitted,
  clearFood,
} from "../../slices/foodSlice";
import FoodReview from "./FoodReview";
const FoodDetail = () => {
  const dispatch = useDispatch();
  const {
    food = {},
    loading,
    isReviewSubmitted,
    error,
  } = useSelector((state) => state.foodState);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.authState);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (food.availability !== "yes") {
      return;
    }
    if (count.valueAsNumber === 15) {
      toast.error(
        "Sorry Max Limit For A Item Is 15..You Can Order More On Offline",
        {
                      
                      style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                      },
                    }
      );
      return;
    }
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };
  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber === 1) {
      return;
    }
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };
  const reviewHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    formData.append("foodId", id);
    dispatch(createReview(formData));
  };
  useEffect(() => {
    if (isReviewSubmitted) {
      handleClose();
      toast.success("Review Submitted Successfully",{
                      
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      dispatch(clearReviewSubmitted());
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
    if (!food._id || isReviewSubmitted) {
      dispatch(getFood(id));
    }
    return () => {
      dispatch(clearFood());
    };
  }, [id, dispatch, isReviewSubmitted, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={food.foodName} />
          <div className="container">
            <div className="row f-flex justify-content-around">
              <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <Carousel pause="hover">
                  {food.images &&
                    food.images.map((image) => (
                      <CarouselItem key={image._id}>
                        <img
                          className="d-block w-100"
                          src={image.image}
                          alt="sdf"
                          height="500"
                          width="500"
                        />
                      </CarouselItem>
                    ))}
                </Carousel>
              </div>

              <motion.div className="col-12 col-lg-5 mt-5"  initial={{
                opacity: 0,
                // if odd index card,slide from right instead of left
                x:50, 
              }}
              whileInView={{
                opacity: 1,
                x: 0, // Slide in to its original position
                transition: {
                  duration: 0.75, // Animation duration
                },
              }}
              viewport={{ once: true }}>
                <h3>{food.foodName}</h3>
                <p id="product_id">Food Id : {food._id}</p>

                <hr />

                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(food.rating / 5) * 100}%` }}
                  ></div>
                </div>
                <span id="no_of_reviews">{food.numOfReviews} Reviews</span>

                <hr />

                <p id="product_price">&#8377; {food.price}.00</p>
                <div className="stockCounter d-inline">
                  <motion.span
                    className="btn btn-danger minus"
                    onClick={decreaseQty}
                    whileTap={{ scale: 0.85 }}
                  >
                    -
                  </motion.span>
                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={quantity}
                    readOnly
                  />
                  <motion.span
                    className="btn btn-primary plus"
                    onClick={increaseQty}
                    whileTap={{ scale: 0.85 }}
                  >
                    +
                  </motion.span>
                </div>
                <motion.button
                  type="button"
                  id="cart_btn"
                  className="btn btn-primary d-inline ms-4"
                  disabled={food.availability === "yes" ? false : true}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => {
                    dispatch(addCartItem(food._id, quantity))
                    toast.success("Cart Item Added Successfully", {
                      
                      style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                      },
                    })
                  }
                  
                  }
                >
                  Add to Cart
                </motion.button>

                <hr />

                <p>
                  Availability:{" "}
                  <span
                    className={
                      food.availability === "yes" ? "greenColor" : "redColor"
                    }
                    id="stock_status"
                  >
                    {food.availability === "yes" ? "yes" : "no"}
                  </span>
                </p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{food.description}</p>

                <motion.button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                  whileTap={{ scale: 0.85 }}
                  onClick={handleShow}
                >
                  Submit Your Review
                </motion.button>

                <div className="row mt-2 mb-5">
                  <div className="rating w-50">
                    <Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Submit Review</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <ul className="stars">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <li
                              value={star}
                              onClick={() => setRating(star)}
                              className={`star ${
                                star <= rating ? "orange" : ""
                              }`}
                              onMouseOver={(e) =>
                                e.target.classList.add("yellow")
                              }
                              onMouseOut={(e) =>
                                e.target.classList.remove("yellow")
                              }
                            >
                              <i className="fa fa-star"></i>
                            </li>
                          ))}
                        </ul>

                        <textarea
                          onChange={(e) => setComment(e.target.value)}
                          name="review"
                          id="review"
                          className="form-control mt-3"
                        ></textarea>
                        {user ? (
                          <motion.button
                            disabled={loading}
                            onClick={reviewHandler}
                            whileTap={{ scale: 0.85 }}
                            aria-label="close"
                            className="brn my-3 float-right review-btn px-4 text-white"
                          >
                            Submit
                          </motion.button>
                        ) : (
                          <div className="alert alert-danger mt-5">
                            Login To Post Review
                          </div>
                        )}
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          {food.reviews && food.reviews.length > 0 ? (
            <FoodReview reviews={food.reviews} />
          ) : null}
        </>
      )}
    </>
  );
};

export default FoodDetail;
