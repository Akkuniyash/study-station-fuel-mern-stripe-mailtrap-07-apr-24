import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/admin/dashboard">
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </Link>
          </li>

          <li>
            <NavDropdown
              title={
                <span className="nav-dropdown-title">
                  <i className="fa fa-utensils"></i> Foods
                </span>
              }
              className="custom-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => navigate("/admin/foods")}>
                <span className="nav-dropdown-item">
                  <i className="fa fa-shopping-basket"></i> All
                </span>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/admin/food/new")}>
                <span className="nav-dropdown-item">
                  <i className="fa fa-plus"></i> Create
                </span>
              </NavDropdown.Item>
            </NavDropdown>
          </li>

          <li>
            <Link to="/admin/order">
              <i className="fa fa-shopping-basket"></i> Orders
            </Link>
          </li>

          <li>
            <Link to="/admin/users">
              <i className="fa fa-users"></i> Users
            </Link>
          </li>
          <li>
            <Link to="/admin/reviews">
              <i className="fa fa-users"></i> Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
