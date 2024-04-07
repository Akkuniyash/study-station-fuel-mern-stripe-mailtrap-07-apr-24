import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Food = ({ food, index, col }) => {
  return (
    <>

    <div className={`col-lg-${col} col-md-6 col-sm-6 col-12`}>
      <motion.div
        className={`card`}
        initial={{
          opacity: 0,
          // if odd index card,slide from right instead of left
          x: index % 2 === 0 ? 50 : -50,
        }}
        whileInView={{
          opacity: 1,
          x: 0, // Slide in to its original position
          transition: {
            duration: 1, // Animation duration
          },
        }}
        viewport={{ once: true }}
      >
        <img
          src={food.images[0].image}
          className="card-img-top pt-5"
          alt="food pic"
        />
        <div className="card-body text-center">
          <h5 className="card-title">
            <Link
              to={`/food/${food._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {food.foodName}
            </Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(food.rating / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">{food.numOfReviews}</span>
          </div>
          <p id="description" className="card-text">
            {food.description}
          </p>
          <p id="price" className="card-text">
            &#8377; {food.price}
          </p>
          <Link to={`/food/${food._id}`} className="btn view_btn">
            View Details
          </Link>
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default Food;
