import React from "react";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'

const CheckoutSteps = ({ userInfo, confirmOrder, payment }) => {
  return (
    
    <motion.div className="checkout-progress d-flex justify-content-center mt-5"
    initial={{
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
    viewport={{ once: true }}
    >
      {userInfo ? (
        <Link to="/userInfo"
        
        >
          <div className="triangle2-active"></div>
          <div className="step active-step">User Info</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="/userInfo">
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">User Info</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
      {confirmOrder ? (
        <Link to="/order/confirm">
          <div className="triangle2-active"></div>
          <div className="step active-step">Confirm Order</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="/order/confirm">
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Confirm Order</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
      {payment ? (
        <Link to="/payment">
          <div className="triangle2-active"></div>
          <div className="step active-step">Payment</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="/paymentnfo">
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Payment</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
    </motion.div>
  );
};

export default CheckoutSteps;
