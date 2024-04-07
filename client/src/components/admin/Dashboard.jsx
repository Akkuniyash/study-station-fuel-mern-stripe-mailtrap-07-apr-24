import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminFoods } from "../../actions/foodsAction";
import { getUsers } from "../../actions/userAction";
import { adminOrders as adminOrdersAction } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import MetaData from '../layouts/MetaData'

export default function Dashboard() {
  const { foods = [] } = useSelector((state) => state.foodsState);
  const { adminOrders = [] } = useSelector((state) => state.orderState);
  const { users = [] } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  let outOfStock = 0;

  if (foods.length > 0) {
    foods.forEach((product) => {
      if (product.stock === 0) {
        outOfStock = outOfStock + 1;
      }
    });
  }

  let totalAmount = 0;
  if (adminOrders.length > 0) {
    adminOrders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  }

  useEffect(() => {
    dispatch(getAdminFoods);
    dispatch(getUsers);
    dispatch(adminOrdersAction);
  }, []);

  return (
    <>
    <MetaData title='Admin DashBoard'/> 
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Dashboard</h1>
        <div className="row pr-4">
          <div className="col-xl-12 ms-lg-5  col-sm-12 mb-3 mb-lg-5">
            <div className="card text-white custom-bg-primary o-hidden h-100  ">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Total Amount
                  <br /> <b>&#8377; {totalAmount}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pr-4">
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white custom-bg-success o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  foods
                  <br /> <b>{foods.length}</b>
                </div>
              </div>
              <Link
                className="card-footer text-white clearfix small z-1 bg-gradient mb-3"
                to="/admin/foods"
              >
                <span className="float-left ">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white custom-bg-danger o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Orders
                  <br /> <b>{adminOrders.length}</b>
                </div>
              </div>
              <Link
                className="card-footer text-white clearfix small z-1 bg-gradient mb-3"
                to="/admin/order"
              >
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white custom-bg-info o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Users
                  <br /> <b>{users.length}</b>
                </div>
              </div>
              <Link
                className="card-footer text-white clearfix small z-1 bg-gradient mb-3"
                to="/admin/users"
              >
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
