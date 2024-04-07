import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../layouts/Loader";
import {motion} from 'framer-motion'
import { orderDetail as orderDetailAction } from "../../actions/orderAction";
import MetaData from '../layouts/MetaData'
export default function OrderDetail() {
  const { orderDetail, loading } = useSelector((state) => state.orderState);
  const {
    shippingInfo = {},
    user = {},
    orderStatus,
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;
  const isPaid = orderStatus && (orderStatus === "Full Paid" || orderStatus === "Served");

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(orderDetailAction(id));
  }, [id]);

  return (
    <Fragment>
      <MetaData title='Order Detail' />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container">
            <div className="row d-flex justify-content-between">
              <motion.div className="col-12 col-lg-8 mt-5 order-details"
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
                <h1 className="my-5">Order # {orderDetail._id}</h1>

                <h4 className="mb-4">Order Info</h4>
                <p>
                  <b>Name:</b> {user.name}
                </p>
                <p>
                  <b>Phone:</b> {shippingInfo.phoneNo}
                </p>
                <p className="mb-4">
                  <b>Address:</b>
                  {shippingInfo.address}, {shippingInfo.city},{" "}
                  {shippingInfo.postalCode}, {shippingInfo.state},{" "}
                  {shippingInfo.country}
                </p>
                <p>
                  <b>Amount:</b>&#8377; {totalPrice}
                </p>

                <hr />

                <h4 className="my-4">Payment</h4>
                <p style={{ color: isPaid ? "green" : "#f1c40f" }}>
                  <b>{isPaid ? "Completed" : "Half Paid"}</b>
                </p>

                <h4 className="my-4">Order Status:</h4>
                <p
                  style={{
                    color:
                      orderStatus && orderStatus.includes("Served")
                        ? "greenColor"
                        : "#f1c40f",
                  }}
                >
                  <b>{orderStatus}</b>
                </p>

                <h4 className="my-4">Order Items:</h4>

                <hr />
                <div className="cart-item my-1">
                  {orderItems &&
                    orderItems.map((item) => (
                      <motion.div className="row my-5"
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
                        <div className="col-4 col-lg-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            height="45"
                            width="65"
                          />
                        </div>

                        <div className="col-5 col-lg-5">
                          <Link to={`/food/${item.food}`}>{item.name}</Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>&#8377; {item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <p>{item.quantity} Piece(s)</p>
                        </div>
                      </motion.div>
                    ))}
                </div>
                <hr />
              </motion.div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
