import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { orderDetail as orderDetailAction, updateOrder } from "../../actions/orderAction";
import { toast } from "react-toastify";
import { clearOrderUpdated, clearError } from "../../slices/orderSlice";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'
import MetaData from '../layouts/MetaData'

export default function UpdateOrder () {
    
    
    const { loading, isOrderUpdated, error, orderDetail } = useSelector( state => state.orderState)
    const { user = {}, orderItems = [], shippingInfo = {}, totalPrice = 0, paymentInfo = {}} = orderDetail;
    const isPaid = paymentInfo.status === 'succeeded'? true: false;
    const [orderStatus, setOrderStatus] = useState("Half Paid");
    const { id:orderId } = useParams();


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const orderData = {};
        orderData.orderStatus = orderStatus;
        dispatch(updateOrder(orderId, orderData))
    }
    
    useEffect(() => {
        if(isOrderUpdated) {
            toast.success('Order Updated Succesfully!',{
                      
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              })
            dispatch(clearOrderUpdated())
           
            return;
        }

        if(error)  {
            toast.error(error,{
                      
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              })
            dispatch(clearError())
            return
        }

        dispatch(orderDetailAction(orderId))
    }, [isOrderUpdated, error, dispatch])


    useEffect(() => {
        if(orderDetail._id) {
            setOrderStatus(orderDetail.orderStatus);
        }
    },[orderDetail])


    return (
        <>
        <MetaData title='Admin Update Order' />
        <div className="row">
            <div className="col-12 col-md-2">
                    <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                <div className="row d-flex justify-content-around">
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
                            <p><b>Name:</b> {user.name}</p>
                            <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b>Address:</b>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</p>
                            <p><b>Amount:</b>&#8377; {totalPrice}</p>
    
                            <hr />
    
                            <h4 className="my-4">Payment</h4>
                            <p className={isPaid ? 'greenColor' : 'redColor' } ><b>{isPaid ? 'PAID' : 'NOT PAID' }</b></p>
    
    
                            <h4 className="my-4">Order Status:</h4>
                            <p className={orderStatus&&orderStatus.includes('Served') ? 'greenColor' : 'redColor' } ><b>{orderStatus}</b></p>
    
    
                            <h4 className="my-4">Order Items:</h4>
    
                            <hr />
                            <div className="cart-item my-1">
                                {orderItems && orderItems.map(item => (
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
                                            <img src={item.image} alt={item.name} height="45" width="65" />
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
                        <div className="col-12 col-lg-3 mt-5">
                            <h4 className="my-4">Order Status</h4>
                            <div className="form-group">
                                <select 
                                className="form-control"
                                onChange={e => setOrderStatus(e.target.value)}
                                value={orderStatus}
                                name="status"
                                >
                                    <option value="Half Paid">HalPaid</option>
                                    <option value="Full Paid">FullPaid</option>
                                    <option value="Served">Served</option>
                                </select>
                              
                            </div>
                            <motion.button
                                disabled={loading}
                                onClick={submitHandler}
                                className="btn btn-primary btn-block mt-3"
                                whileTap={{ scale: 0.85 }}
                                >
                                    Update Status
                            </motion.button>

                        </div>
                    </div>
                </Fragment>
            </div>
        </div>
        </>
        
    )
}