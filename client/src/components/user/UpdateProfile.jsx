import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, updateProfile } from "../../actions/userAction";
import { toast } from "react-hot-toast";
import { clearUpdateProfile } from "../../slices/authSlice";
import {motion} from 'framer-motion'
const UpdateProfile = () => {
  const { loading, error, isUpdated, user } = useSelector(
    (state) => state.authState
  );
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "images/defaultAvatar.png"
  );
  const dispatch = useDispatch();
  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }
    if (isUpdated) {
      toast.success(`wow your profile updated ${user.name}`,{
                      
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      dispatch(clearUpdateProfile);
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
  }, [user, isUpdated, error, dispatch]);
  return (
    <>
      <MetaData title={`Update Profile`} />

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
            style={{ backgroundColor: "#27ae60" }}
          >
            <div className="featured-image">
              <img
                src="images/updateProfile.png"
                className="img-fluid"
                style={{ width: "250px", height: "100%" }}
                alt=""
              />
              <p
                className="text-white fs-2 "
                style={{
                  fontFamily: "Courier New,Courier,monospace",
                  fontWeight: "600",
                }}
              >
                Update Profile
              </p>
              <small
                className="text-white text-wrap text-center"
                style={{
                  width: "17rem",
                  fontFamily: "Courier New,Courier,monospace",
                }}
              >
                Now change your lunchtime superhero avatar{" "}
              </small>
            </div>
          </div>
          <div className="col-md-6 right-box">
            <div className="row align-items-center ">
              <form onSubmit={submitHandler}>
                <div className="header-text mb-4">
                  <h2>Hello {user.name}</h2>
                  <p>you can able to change avatar and email here!!! </p>
                </div>

                {/* input fields */}
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="Enter Email Address To Change"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group mb-2 d-flex flex-column align-items-start flex-wrap">
                  <label htmlFor="avatar" className="form-label ms-1">
                    Choose Profile Pic
                  </label>

                  <div>
                    <input
                      type="file"
                      className="form-control form-control-lg bg-light fs-6"
                      id="avatar"
                      placeholder="Choose Profile Pic"
                      name="avatar"
                      onChange={onChangeAvatar}
                    />
                  </div>
                </div>
                <div className="mb-2 ">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="img-fluid rounded-circle shadow "
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>

                <div className="input-group mb-3 mt-3">
                  <motion.button className="btn btn-lg  w-100 fs-6 " id="updateBtn"
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

export default UpdateProfile;
