import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";

const Profile = () => {
  const { user } = useSelector((state) => state.authState);
  return (
    <>
    <MetaData title='User Profile'/>
    <div className="row justify-content-around mt-5 user-info ms-3  ">
      <div className="col-12 col-md-3">
        <figure className="avatar avatar-profile">
          <img
            className="rounded-circle img-fluid shadow border-4 "
            src={user.avatar ?? "images/defaultAvatar.png"}
            alt=""
          />
        </figure>
        <div className='edit_profile'>
          <Link
            to="/updateprofile"
            id="edit_profile"
            className="btn btn-primary btn-block mt-5 ms-5 "
          >
            Edit Profile
          </Link>
          <div>
            <Link to='/orders' className="btn btn-danger btn-block mt-3 ms-5">
              My Orders
            </Link>    
          </div>

          <div className="changePwd">
            <Link
              to="/myprofile/update/password"
              className="btn btn-primary btn-block mt-3 ms-5"
            >
              Change Password
            </Link>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-5">
        <h4>Full Name</h4>
        <p>{user.name}</p>

        <h4>Email Address</h4>
        <p>{user.email}</p>

        <h4>Joined SS Fuel At</h4>
        <p>{String(user.createdAt).substring(0, 10)}</p>

        <h4>Year Of Studying</h4>
        <p>{user.year} year</p>

        <h4>Department</h4>
        <p>{user.department}</p>
      </div>
    </div>
    </>
  );
};

export default Profile;
