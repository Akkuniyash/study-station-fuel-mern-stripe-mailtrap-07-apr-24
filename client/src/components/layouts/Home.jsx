import React, { useEffect, useState } from "react";
import MetaData from "./MetaData";
import HomePage from "./HomePage";
import About from "./About";
import Footer from "./Footer";
import { getFoods } from "../../actions/foodsAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Food from "../food/Food";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion"; 
import { Fragment } from "react";
import Pagination from "react-js-pagination";
const Home = () => {
  const dispatch = useDispatch();
  const { foods, loading, error, foodsCount, resPerPage } = useSelector(
    (state) => state.foodsState
  );
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };
  useEffect(() => {
    if (error) {
      return toast.error(error,{
                      
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
    dispatch(getFoods(null, null, null, null, currentPage));
  }, [error, dispatch, currentPage]);
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
          <MetaData title={"Order Food Items"} />
          <HomePage />

          <motion.section
            id="foods"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="container m-2">
              <h1 className="text-center my-5">Our Food Items</h1>
              <div className="row">
                {foods &&
                  foods.map((food, i) => (
                    <Food col={4} food={food} key={i} index={i} />
                  ))}
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
                itemClass={"page-item m-2 rounded transitionl"}
                linkClass={"page-link rounded"}
              />
            </div>
          ) : (
            null
          )}
          <About />
          <Footer />
        </>
      )}
    </motion.Fragment>
  );
};

export default Home;
