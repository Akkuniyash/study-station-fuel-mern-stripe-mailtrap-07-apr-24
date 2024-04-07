import React, { useState } from "react";
import MetaData from "../layouts/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "countries-list";
import { saveUserInfo } from "../../slices/cartSlice";
import CheckoutSteps from "./CheckoutSteps";
import toast from "react-hot-toast";
import {motion} from 'framer-motion'
export const validateShipping = (userInfo, navigate) => {
  if (
    !userInfo.address ||
    !userInfo.city ||
    !userInfo.state ||
    !userInfo.country ||
    !userInfo.phoneNo ||
    !userInfo.postalCode
  ) {
    toast.error("Please Fill The User Information",{
                      
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
    navigate("/userInfo");
  }
};

const UserInfo = () => {
  const { user } = useSelector((state) => state.authState);
  const { userInfo = {} } = useSelector((state) => state.cartState);
  const [address, setAddress] = useState(userInfo.address);
  const [phoneNo, setPhoneNo] = useState(userInfo.phoneNo);
  const [postalCode, setPostalCode] = useState(userInfo.postalCode);
  const [city, setCity] = useState(userInfo.city);
  const [country, setCountry] = useState(userInfo.country);
  const [state, setState] = useState(userInfo.state);
  const countriesList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveUserInfo({ address, city, phoneNo, postalCode, country, state })
    );
    navigate("/order/confirm");
  };
  return (
    <>
      <MetaData title={`User Info`} />

      <CheckoutSteps userInfo />
      <motion.div className="container d-flex  justify-content-center align-items-center min-vh-100 "
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
                We Need Your Info
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
                  <h2>Hello {user.name}</h2>
                  <p>Please Provide Following Info To Proceed Further</p>
                </div>

                {/* input fields */}
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="Phone No"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <select
                    onChange={(e) => setCountry(e.target.value)}
                    className="form-control form-control-lg bg-light fs-6 form-select"
                    aria-label="Default select example"
                    value={country}
                  >
                    <option selected className="color-dark">
                      Select Country
                    </option>
                    {countriesList.map((country) => (
                      <option id="opt-dept" key={country} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3 ">
                  <motion.button className="btn btn-lg  w-100 fs-6 login-btn1"
                  whileTap={{ scale: 0.85 }}

                  >
                    Proceed
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

export default UserInfo;
