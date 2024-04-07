import React, { useEffect } from "react";
import MetaData from "../layouts/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateShipping } from "./UserInfo";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import axios from "axios";
import { orderCompleted } from "../../slices/cartSlice";
import { createOrder } from "../../actions/orderAction";
import { clearError as clearOrderError } from "../../slices/orderSlice";
import {motion} from 'framer-motion'
const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")) || {};
  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, userInfo: shippingInfo } = useSelector(
    (state) => state.cartState
  );
  const { error: orderError } = useSelector((state) => state.orderState);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: "AE",
        state: shippingInfo.state,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNo,
    },
  };

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
    if (orderInfo.halfPaid === false) {
      order.orderStatus = "Full Paid";
      console.log("Checking");
    }
    else
    {
      order.orderStatus ="Half Paid"
    }
  }

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
    if (orderError) {
      toast.error(orderError,{
                      
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      dispatch(clearOrderError());
      return;
    }
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#paybtn").disabled = true;
    try {
      const { data } = await axios.post("/api/v1/payment/process", paymentData);
      const clientSecret = data.client_secret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              city: shippingInfo.city,
              postal_code: shippingInfo.postalCode,
              country: "AU",
              state: shippingInfo.state,
              line1: shippingInfo.address,
            },
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message,{
                      
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        document.querySelector("#paybtn").disabled = false;
      } else {
        if ((await result).paymentIntent.status === "succeeded") {
          toast.success("Payment Success!",{
                      
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          dispatch(orderCompleted());
          navigate("/order/success");
        } else {
          toast.error("Please Try again!",{
                      
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
        }
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <>
      <MetaData title={`User Payment`} />

      <CheckoutSteps userInfo confirmOrder payment />
      <motion.div className="container d-flex  justify-content-center align-items-center min-vh-100 "
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
            style={{ backgroundColor: "#6c5ce7" }}
          >
            <div className="featured-image">
              <img
                src="images/payment.png"
                className="img-fluid"
                style={{ width: "250px" }}
                alt=""
              />
              <p
                className="text-white fs-2 "
                style={{
                  fontFamily: "Courier New,Courier,monospace",
                  fontWeight: "600",
                }}
              >Provide Card Details
              </p>
              <small
                className="text-white text-wrap text-center"
                style={{
                  width: "17rem",
                  fontFamily: "Courier New,Courier,monospace",
                }}
              >
                Your Privacy Is Our Priority{" "}
              </small>
            </div>
          </div>
          <div className="col-md-6 right-box">
            <div className="row align-items-center ">
              <form onSubmit={submitHandler}>
                <div className="header-text mb-4">
                  <h2>Hello</h2>
                  <p>Please Provide Following Info To Proceed Further</p>
                </div>

                {/* input fields */}
                <div className="input-group mb-3">
                  <label htmlFor="card_num_field" className="w-100 ms-1 ">
                    Card Number
                  </label>
                  <CardNumberElement
                    type="text"
                    className="form-control form-control-lg bg-light fs-6 "
                    id="card_num_field"
                    value=""
                  />
                </div>
                <div className="input-group mb-3">
                  <label htmlFor="card_exp_field" className="w-100 ms-1 ">
                    Expiry Date
                  </label>
                  <CardExpiryElement
                    type="text"
                    className="form-control form-control-lg bg-light fs-6 "
                    id="card_exp_field"
                    value=""
                  />
                </div>
                <div className="input-group mb-3">
                  <label htmlFor="card_cvc_field" className="w-100 ms-1 ">
                    Card CVC
                  </label>
                  <CardCvcElement
                    type="text"
                    className="form-control form-control-lg bg-light fs-6 "
                    id="card_cvc_field"
                    value=""
                  />
                </div>

                <div className="input-group mb-3 ">
                  <motion.button
                    type="submit"
                    className="btn btn-lg  w-100 fs-6 login-btn1"
                    id="paybtn"
                    whileTap={{ scale: 0.85 }}

                  >
                    Pay - &#8377;{`${orderInfo && orderInfo.totalPrice}`}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Payment;
