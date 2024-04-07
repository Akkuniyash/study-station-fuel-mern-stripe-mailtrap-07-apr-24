import React from "react";
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import MetaData from "../layouts/MetaData";
const OrderSuccess = () => {
  return (
    <>
    <MetaData title='Order Success' />
    <div className="container">
      <div className="row justify-content-center">
        <motion.div className="col-6 mt-5 text-center"
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
          <img
            className="my-5 img-fluid d-block mx-auto"
            src="/images/orderSuccess.png"
            alt="Order Success"
            width="300"
          />

          <h2>Your Order has been placed successfully.</h2>

          <Link to="/orders">Go to Orders</Link>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default OrderSuccess;
