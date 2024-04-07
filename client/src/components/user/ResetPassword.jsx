import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, resetPassword } from "../../actions/userAction";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {motion} from 'framer-motion'

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.authState
  );
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    dispatch(resetPassword(formData, token));
  };
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Password Reset Successfully",{
                      
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      navigate("/");
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
      return;
    }
  }, [isAuthenticated, error, dispatch, navigate]);
  return (
   

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
            style={{ backgroundColor: "#3498db" }}
          >
            <div className="featured-image">
              <img
                src="/images/resetPassword.png"
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
                Reset Password
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
                  <h2>New Password ? </h2>
                  <p>Don't worry we are here to help you</p>
                </div>

                {/* input fields */}

                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="Enter New Password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="Confirm New Password"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3 ">
                  <motion.button
                  type="submit"
                    id="resetPasswordBtn"
                    className="btn btn-lg  w-100 fs-6 login-btn1 "
                    disabled={loading}
                    whileTap={{ scale: 0.85 }}

                  >
                    Change Password
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    
  );
};

export default ResetPassword;
