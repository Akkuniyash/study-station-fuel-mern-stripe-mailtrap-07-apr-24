import React from "react";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DropdownButton, Dropdown, Image } from "react-bootstrap";
import { logout } from "../../actions/userAction";
const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout);
  };
  return (
    <nav className="navbar navbar-expand-lg shadow">
      <div className="container nv">
        <Link to="/" className="navbar-brand ">
          Study StationFuel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fa-solid fa-burger"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav m-auto my-2 my-lg-0 ">
            <li className="nav-item">
              <Link className="nav-link active" to='/' >
                Home
              </Link>
            </li>
            <li className="nav-item"> 
              <Link className="nav-link" to='/about'>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            {isAuthenticated ? (
              <Dropdown className="d-inline">
                <Dropdown.Toggle
                  variant="default text-white pr-5"
                  id="dropdown-basic"
                >
                  <figure className="avatar avatar-nav">
                    <Image
                      width="50px"
                      src={user.avatar ?? "./images/defaultAvatar.png"}
                      className="shadow"
                      style={{ "border-radius": "50%" }}
                    />
                  </figure>
                  <span>{user.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      navigate("/myprofile");
                    }}
                    className="text-dark"
                    id='profile'
                  >
                    Profile
                  </Dropdown.Item>
                  {user.role === "admin" && (
                    <Dropdown.Item
                      onClick={() => {
                        navigate("/admin/dashboard");
                      }}
                      className="text-dark"
                    >
                      Dashboard
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item
                    onClick={() => {
                      navigate("/orders");
                    }}
                    className="text-dark"
                  >
                    My Orders
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={logoutHandler}
                    className="text-danger"
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <li className="nav-item">
                <Link
                
                  to="/login"
                  id="login-btn"
                  className="nav-link rounded-3 headerLogin ps-2 "
                  
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
          <Search />
        </div>
      </div>
    </nav>
  );
};

export default Header;
