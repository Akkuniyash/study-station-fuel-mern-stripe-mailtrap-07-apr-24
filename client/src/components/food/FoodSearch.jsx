import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { getFoods } from "../../actions/foodsAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import Food from "../food/Food";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Fragment } from "react";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
const FoodSearch = () => {
  const dispatch = useDispatch();
  const { foods, loading, error, foodsCount, resPerPage } = useSelector(
    (state) => state.foodsState
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setprice] = useState([1, 500]);
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);
  const categories = [
    "Main Courses",
    "Side Dish",
    "Snacks",
    "Beverages",
    "Desserts",
    "Healthy Options",
    "Local Favorites",
  ];
  const { keyword } = useParams();
  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };
  useEffect(() => {
    if (error) {
      return toast.error(error,
        {
                      
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
    }
    dispatch(getFoods(keyword, price, category, rating, currentPage));
  }, [error, dispatch, currentPage, keyword, price, category, rating]);
  return (
    <motion.Fragment
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Search Food Items"} />

          <motion.section
            id="foods"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="container m-2">
              <h1 className="">Search Food Items</h1>
              <div className="row">
                <div id="slider" className="col-6 col-md-3 mb-5 mt-5 ">
                  <div className="px-5 slider ">
                    <Slider
                      range={true}
                      marks={{
                        1: "₹ 1",
                        500: "₹ 500",
                      }}
                      min={1}
                      max={500}
                      defaultValue={price}
                      onChangeComplete={(price) => {
                        setprice(price);
                      }}
                      handleRender={(renderProps) => {
                        return (
                          <Tooltip
                            overlay={`₹${renderProps.props["aria-valuenow"]}`}
                          >
                            <div {...renderProps.props}></div>
                          </Tooltip>
                        );
                      }}
                    />
                  </div>
                  <hr className="my-5" />
                  <div className="mt-5">
                    <h3 className="mb-3">Categories</h3>
                    <ul className="pl-0">
                      {categories.map((category,index) => (
                        <motion.li
                          id="categorylists"
                          className="p-2 rounded-1 mb-2"
                          style={{ cursor: "pointer", listStyleType: "none" }}
                          key={category}
                          onClick={() => {
                            setCategory(category);
                          }}
                          initial={{
                            opacity: 0,
                            // if odd index card,slide from right instead of left
                            x: index % 2 === 0 ? 50 : -50,
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
                          {category}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <hr className="my-5" />
                  <div className="mt-5">
                    <h4 className="mb-3">Ratings</h4>
                    <ul className="pl-0">
                      {[5, 4, 3, 2, 1].map((star,index) => (
                        <motion.li
                          id="categorylists"
                          className="p-2 rounded-1 mb-2"
                          style={{ cursor: "pointer", listStyleType: "none" }}
                          key={star} 
                          onClick={() => {
                            setRating(star);
                          }}
                          initial={{
                            opacity: 0,
                            // if odd index card,slide from right instead of left
                            x: index % 2 === 0 ? 50 : -50,
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
                          <div className="rating-outer">
                            <div
                              className="rating-inner"
                              style={{
                                width: `${star * 20}%`,
                              }}
                            ></div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-12 col-md-9 col-lg-9 ">
                  <div className="row">
                    {foods && foodsCount !== 0 ? (
                      foods.map((food, i) => (
                        <Food col={4} food={food} key={i} index={i} />
                      ))
                    ) : (
                      <h2 className="text-center">No Food Items Matched</h2>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
          {foodsCount > 0 && foodsCount > resPerPage ? (
            <div id="pagination" className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={foodsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass={"page-item m-2 rounded "}
                linkClass={"page-link rounded"}
              />
            </div>
          ) : null}
        </>
      )}
    </motion.Fragment>
  );
};

export default FoodSearch;
