import React, { useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { validateShipping } from "./UserInfo";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import {motion} from 'framer-motion'
const ConfirmOrder = () => {
  const { userInfo: shippingInfo, items: cartItems } = useSelector(
    (state) => state.cartState
  );
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authState);
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  let taxPrice = Number(0.05 * itemsPrice);
  let totalPrice = Number(itemsPrice + taxPrice).toFixed(2);
  taxPrice = Number(taxPrice).toFixed(2);

  const processPayment = () => {
    const data = {
      itemsPrice,
      taxPrice,
      totalPrice,
      halfPaid: false,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };
  const processHalfPayment = () => {
    totalPrice = totalPrice / 2;
    const data = {
      itemsPrice,
      taxPrice,
      totalPrice,
      halfPaid: true,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
  }, []);
  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps userInfo confirmOrder />
      <div className="container">
        <div className="row d-flex justify-content-between">
          <motion.div className="col-12 col-lg-8 mt-5 order-confirm"
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
            <h4 className="mb-3">User Info</h4>
            <p>
              <b>Name:</b>
              {user.name}
            </p>
            <p>
              <b>Phone:</b>
              {shippingInfo.phoneNo}
            </p>
            <p className="mb-4">
              <b>Address:</b> {shippingInfo.address}, {shippingInfo.city}{" "}
              {shippingInfo.postalCode}, {shippingInfo.state},{" "}
              {shippingInfo.country}{" "}
            </p>

            <hr />
            <h4 className="mt-4">Your Cart Items:</h4>

            {cartItems.map((item) => (
              <>
                <div className="cart-item my-1">
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-6">
                      <Link to={`/food/${item.food}`}>{item.name}</Link>
                    </div>

                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p>
                        {item.quantity} x {item.price} ={" "}
                        <b>{item.quantity * item.price}</b>
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            ))}
          </motion.div>

          <motion.div className="col-12 col-lg-3 my-4"
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
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">{itemsPrice}</span>
              </p>
              <p>
                Tax: <span className="order-summary-values">{taxPrice}</span>
              </p>

              <hr />

              <p>
                Total:{" "}
                <span className="order-summary-values">{totalPrice}</span>
              </p>

              <hr />
              <motion.button
                onClick={processPayment}
                id="checkout_btn"
                className="btn btn-primary btn-block"
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
                whileTap={{ scale: 0.85 }}

              >
                Proceed to Payment
              </motion.button>
              <motion.button
                onClick={processHalfPayment}
                id="half_btn"
                className="btn  btn-secondary btn-block"
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
                whileTap={{ scale: 0.85 }}

              >
                Half Payment
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
