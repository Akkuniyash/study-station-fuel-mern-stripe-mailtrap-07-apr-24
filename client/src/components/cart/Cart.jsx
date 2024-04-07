import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeItemFromCart,
} from "../../slices/cartSlice";
import { toast } from "react-hot-toast";
import {motion} from 'framer-motion'
import MetaData from "../layouts/MetaData";
const Cart = () => {
  const { items } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const increaseQty = (item) => {
    const count = item.quantity;
    if (item.availability === "no") return;
    if (item.quantity === 15) {
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
    dispatch(increaseCartQuantity(item.food));
  };
  const decreaseQty = (item) => {
    const count = item.quantity;
    if (count === 1) return;
    dispatch(decreaseCartQuantity(item.food));
  };
  const checkoutHandler = () => {
    navigate(`/login?redirect=userInfo`);
  };
  return (
    <>
    <MetaData title='Cart' />
      {items.length === 0 ? (
        <div className="container">
          <div className='d-flex justify-content-center align-items-center align-content-center '>
            <img src="/images/ec.png" alt="" width="650px" />
            
          </div>
          <div className='d-flex justify-content-center '>
            <h3 className="navbar-brand">Empty Cart</h3>
            
          </div>
          </div>
      ) : (
        <div className="container">
          <h2 className="mt-5">
            Your Cart: <b>{items.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 shadow col-lg-8 mb-2 ">
              {items.map((item) => (
                <>
                  <hr />
                  <motion.div className="cart-item "
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
                    <div className="row ">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/food/${item.food}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">&#8377; {item.price}</p>
                      </div>

                      <motion.div className="col-4 col-lg-3 mt-4 mt-lg-0"
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
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() => decreaseQty(item)}
                          >
                            -
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />
                          <span
                            className="btn btn-primary plus"
                            onClick={() => increaseQty(item)}
                          >
                            +
                          </span>
                        </div>
                      </motion.div>

                      <motion.div className="col-4 col-lg-1 mt-4 mt-lg-0"
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
                        <i
                          onClick={() =>
                            dispatch(removeItemFromCart(item.food))
                          }
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                        ></i>
                      </motion.div>
                    </div>
                  </motion.div>
                </>
              ))}

              <hr />
            </div>

            <h4 className="mt-3 ">Order Summary</h4>
            <motion.div className="col-12 col-lg-3 shadow mb-2 "
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
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    {items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    &#8377;{" "}
                    {items.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}
                  </span>
                </p>

                <hr />
                <motion.button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                  whileTap={{ scale: 0.85 }}

                >
                  Check out
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
