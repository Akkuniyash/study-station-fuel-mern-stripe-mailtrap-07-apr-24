import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, forgotPassword } from "../../actions/userAction";
import { toast } from "react-hot-toast";
import {motion} from 'framer-motion'
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.authState);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    dispatch(forgotPassword(formData));
  };
  useEffect(() => {
    if (message) {
      toast.success(message,{
                      
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      setEmail("");
      return;
    }
    if (error) {
      toast.error(error,{
                      
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      dispatch(clearAuthError);
      setEmail("");
      return;
    }
  }, [error, message, dispatch]);
  return (
    <>
      <MetaData title={`Forgot Password`} />

      <motion.div className="container d-flex  justify-content-center align-items-center min-vh-100 "
       initial={{
        opacity: 0,
        // if odd index card,slide from right instead of left
        y:-50,
      }}
      whileInView={{
        opacity: 1,
        y: 0, // Slide in to its original position
        transition: {
          duration: 0.75, // Animation duration
        },
      }}
      viewport={{ once: true }}

      >
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div
            className="col-md-6 rounded-4 justify-content-center align-items-center flex-column left-box"
            style={{ backgroundColor: "#6ab04c" }}
          >
            <div className="featured-image">
              <img
                src="/images/forgotPassword.png"
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
              >
                Forgot Password
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
                  <h2>Forgot Your Password ? </h2>
                  <p>Don't worry we are here to help you</p>
                </div>

                {/* input fields */}

                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    name="email"
                  />
                </div>

                <div className="input-group mb-3 ">
                  <motion.button
                    id="forgotPasswordBtn"
                    className="btn btn-lg  w-100 fs-6 login-btn1"
                    disabled={loading}
                    whileTap={{ scale: 0.85 }}

                  >
                    Send Reset Link
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

export default ForgotPassword;
