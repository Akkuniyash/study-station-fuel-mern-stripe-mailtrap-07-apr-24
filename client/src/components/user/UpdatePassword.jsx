import React, { useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearAuthError,
  updatePassword as updatePasswordAction,
} from "../../actions/userAction";
import { toast } from "react-hot-toast";
import {motion} from 'framer-motion'

const UpdatePassword = () => {
  const { user, isUpdated, error } = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("password", newPassword);
    if (
      newPassword === confirmPassword &&
      (newPassword !== "" || confirmPassword !== "")
    ) {
      dispatch(updatePasswordAction(formData));
    } else {
      console.log(newPassword);
      console.log(confirmPassword);
      toast.error("Password Mismatched Please Try Again!!",{
                      
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };
  useEffect(() => {
    if (isUpdated) {
      toast.success("Password Updated Successfully",{
                      
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

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
  }, [isUpdated, error, user, dispatch]);

  return (
    <>
      <MetaData title={`Update Password`} />

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
            style={{ backgroundColor: "#1e2446" }}
          >
            <div className="featured-image">
              <img
                src="/images/updatePassword.png"
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
                Update Password
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
                  <h2>Welcome {user.name} </h2>
                  <p>We are happy to have you back</p>
                </div>

                {/* input fields */}
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="Old Password"
                    value={oldPassword}
                    name="oldPassword"
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="New Password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="input-group mb-1">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="Confirm New Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3 mt-3 ">
                  <motion.button
                    id="updatePasswordBtn"
                    className="btn btn-lg  w-100 fs-6 login-btn1"
                    whileTap={{ scale: 0.85 }}

                  >
                    Update
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

export default UpdatePassword;
