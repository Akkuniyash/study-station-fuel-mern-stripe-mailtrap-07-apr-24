import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, register } from "../../actions/userAction";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.authState
  );
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    year: 0,
    userId: "",
  });
  const departments = [
    "BSC CS",
    "BCA",
    "BBA",
    "BCOM",
    "BCOM CS",
    "MSC BT",
    "ECS",
    "MCOM",
  ];
  const years = [1, 2, 3];
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "images/defaultAvatar.png"
  );
  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("department", department);
    formData.append("year", year);
    formData.append("userId", userData.userId);
    formData.append("avatar", avatar);
    dispatch(register(formData));
  };
  useEffect(() => {
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
    if (isAuthenticated) {
      navigate("/");
      toast.success(`Welcome ${user.name}`,{
                      
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }
  }, [error, dispatch, isAuthenticated, navigate, user]);
  return (
    <>
      <MetaData title={`User Register`} />

      <motion.div className="container d-flex  justify-content-center align-items-center min-vh-100 mt-3 mb-3 "
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
                <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="Name"
                    name="name"
                    onChange={onChange}
                  />
                </div>
                <div className="input-group mb-2">
                  <input
                    type="email"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="Email Address"
                    name="email"
                    onChange={onChange}
                  />
                </div>
                <div className="input-group mb-2">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="Password"
                    name="password"
                    onChange={onChange}
                  />
                </div>
                <div className="input-group mb-2">
                  <select
                    onChange={(e) => setDepartment(e.target.value)}
                    className="form-control form-control-lg bg-light fs-6 form-select"
                    aria-label="Default select example"
                  >
                    <option selected className="color-dark" disabled >
                      Select Department
                    </option>
                    {departments.map((department) => (
                      <option id="opt-dept" key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-2">
                  <select
                    onChange={(e) => setYear(e.target.value)}
                    className="form-control form-control-lg bg-light fs-6 form-select"
                    aria-label="Default select example"
                  >
                    <option selected className="color-dark" disabled >
                      Select Year(only students)
                    </option>
                    {years.map((year) => (
                      <option id="opt-dept" key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6 "
                    placeholder="User Id Or Staff Id"
                    onChange={onChange}
                    name="userId"
                  />
                </div>
                {/* Avatar Input with choose a
                vatar place holder browse button for adding images and in the leftside a round circle preview */}
                {/* Avatar Input */}
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
                      onChange={onChange}
                      name="avatar"
                    />
                  </div>
                </div>

                {/* Avatar Preview */}

                <div className="mb-2 ">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="img-fluid rounded-circle shadow "
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>

                <div className="input-group mb-3 ">
                  <motion.button
                    className="btn btn-lg  w-100 fs-6 login-btn1"
                    disabled={loading}
                    whileTap={{ scale: 0.85 }}

                  >
                    Register
                  </motion.button>
                </div>
                <div className="row">
                  <small>
                    Already Having An Account ?
                    <Link className="ms-2" to="/login">
                      Login
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

export default Register;
