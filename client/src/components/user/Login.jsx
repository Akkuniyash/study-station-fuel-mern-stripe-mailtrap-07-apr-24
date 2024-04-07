import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, login } from "../../actions/userAction";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (error) {
      toast.error(error,{
                      
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
      dispatch(clearAuthError);
      return;
    }
    if (isAuthenticated) {
      navigate(redirect);
      toast.success("Logged in successfully",{
                      
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  }, [error, isAuthenticated, dispatch, navigate]);
  return (
    <>
      <MetaData title={`User Login`} />

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
              viewport={{ once: true }}>
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div
            className="col-md-6 rounded-4 justify-content-center align-items-center flex-column left-box"
            style={{ backgroundColor: "#104cbe" }}
          >
            <div className="featured-image">
              <img
                src="images/1.png"
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
                Be Verified
              </p>
              <small
                className="text-white text-wrap text-center"
                style={{
                  width: "17rem",
                  fontFamily: "Courier New,Courier,monospace",
                }}
              >
                Join And Experience{" "}
              </small>
            </div>
          </div>
          <div className="col-md-6 right-box">
            <div className="row align-items-center ">
              <form onSubmit={submitHandler}>
                <div className="header-text mb-4">
                  <h2>Hello Again</h2>
                  <p>We are happy to have you back</p>
                </div>

                {/* input fields */}
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-group mb-1">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="input-group mb-5 d-flex justify-content-between ">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name=""
                      id="formCheck"
                      className="form-check-input "
                    />
                    <label
                      htmlFor="formCheck"
                      className="form-form-check-label text-secondary"
                    >
                      <small>Remember Me</small>
                    </label>
                  </div>
                  <div className="forgot">
                    <small>
                      <Link to="/password/forgot">Forgot Password ?</Link>
                    </small>
                  </div>
                </div>
                <div className="input-group mb-3 ">
                  <motion.button
                    className="btn btn-lg  w-100 fs-6 login-btn1"
                    disabled={loading}
                    whileTap={{ scale: 0.85 }}

                  >
                    Login
                  </motion.button>
                </div>
                <div className="row">
                  <small>
                    Don't Have Account ?
                    <Link to="/register" className="ms-2" href="#">
                      Sign Up
                    </Link>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Login;
