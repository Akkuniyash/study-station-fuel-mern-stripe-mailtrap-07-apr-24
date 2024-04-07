import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./layouts/Home";
import FoodDetail from "./food/FoodDetail";
import { AnimatePresence } from "framer-motion";
import FoodSearch from "./food/FoodSearch";
import Login from "./user/Login";
import Register from "./user/Register";
import Profile from "./user/Profile";
import ProtectedRoute from "./route/ProtectedRoute";
import UpdateProfile from "./user/UpdateProfile";
import UpdatePassword from "./user/UpdatePassword";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import Cart from "./cart/Cart";
import UserInfo from "./cart/UserInfo";
import ConfirmOrder from "./cart/ConfirmOrder";
import Payment from "./cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./cart/OrderSuccess";
import UserOrder from "./order/UserOrder";
import OrderDetail from "./order/OrderDetail";
import Dashboard from "./admin/Dashboard";
import FoodsList from "./admin/FoodsList";
import NewFood from "./admin/NewFood";
import UpdateFood from "./admin/UpdateFood";
import { useSelector } from "react-redux";
import OrderList from "./admin/OrderList";
import UpdateOrder from "./admin/UpdateOrder";
import UserList from "./admin/UserList";
import ReviewList from './admin/ReviewList'
import UpdateUser from "./admin/UpdateUser";
import About from "./layouts/About";
import Footer from "./layouts/Footer";
const AnimatedRoutes = () => {
  const location = useLocation();
  const [stripeApiKey, setStripeApiKey] = useState("");
  const {user}=useSelector(state=>state.authState)

  useEffect(() => {
    try
    {
      async function getStripeApiKey() {
        const { data } = await axios.get("/api/v1/stripeapi");
        console.log(data);
        setStripeApiKey(data.stripeApiKey);
      }
      if(user._id)
      {
        getStripeApiKey();
      }
    }
    catch(error)
    {
      console.log(error)   
    }
  }, [user]);
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/food/:id" element={<FoodDetail />} />
        <Route path="/search/:keyword" element={<FoodSearch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Footer />} />
        <Route
          path="/myprofile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateprofile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myprofile/update/password"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route
          path="/userInfo"
          element={
            <ProtectedRoute>
              <UserInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <UserOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          }
        />

        {stripeApiKey && (
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
        )}
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/foods"
          element={
            <ProtectedRoute isAdmin={true}>
              <FoodsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/food/new"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewFood />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/food/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateFood />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/order"
          element={
            <ProtectedRoute isAdmin={true}>
              <OrderList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <ReviewList />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
