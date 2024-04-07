import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../../actions/userAction";
import { clearError, clearUserUpdated } from "../../slices/userSlice";
import { toast } from "react-hot-toast";
import {motion} from 'framer-motion'
import MetaData from "../layouts/MetaData";

export default function UpdateUser () {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
   
    const { id:userId } = useParams();
    
    const { loading, isUserUpdated, error, user } = useSelector( state => state.userState)
    const {  user:authUser } = useSelector( state => state.authState)

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email' , email);
        formData.append('role' , role);
        dispatch(updateUser(userId, formData))
    }

    useEffect(() => {
        if(isUserUpdated) {
            toast.success('User Updated Succesfully!',{
                      
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })
            dispatch(clearUserUpdated())
            return;
        }

        if(error)  {
            toast.error(error,{
                      
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })
            dispatch(clearError())
            return
        }

        dispatch(getUser(userId))
    }, [isUserUpdated, error, dispatch])


    useEffect(() => {
        if(user._id) {
            setEmail(user.email);
            setRole(user.role);
        }
    },[user])


    return (
      <>
      <MetaData title='Admin Update User'/>
        <div className="row">
      <div className="col-md-2 col-12">
        <Sidebar />
      </div>
      <motion.div className="col-md-10 d-flex justify-content-center align-items-center mt-1 mb-5"
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
      viewport={{ once: true }}
      >
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div
            className="col-md-6 rounded-4 justify-content-center align-items-center flex-column left-box"
            style={{ backgroundColor: "#104cbe" }}
          >
            <div className="featured-image">
              <img
                src="/images/1.png"
                className="img-fluid"
                style={{ width: "200px" }}
                alt=""
              />
              <p
                className="text-white fs-2  mt-5 "
                style={{
                  fontFamily: "Courier New,Courier,monospace",
                  fontWeight: "600",
             }}
              >
                Let's update users
              </p>
              <small
                className="text-white text-wrap text-center"
                style={{
                  width: "17rem",
                  fontFamily: "Courier New,Courier,monospace",
                }}
              >
                Be carefull with the role changes
              </small>
            </div>
          </div>
          <div className="col-md-6 right-box">
            <div className="row align-items-center ">
              <form onSubmit={submitHandler}>
                <div className="header-text mb-4">
                  <h2>Welcome Sir/Mam !!</h2>
                  <p>Update User !!</p>
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
                
                <div className="input-group mb-2">
                  <select
                    className="form-control form-control-lg bg-light fs-6 form-select"
                    aria-label="Default select example"
                    onChange={(e) => setRole(e.target.value)}
                    disabled={user._id === authUser._id } value={role}
                  >
                    <option selected className="color-dark" disabled >
                      Select Role
                    </option>
                    
                      <option id="opt-dept"  value="Admin">
                        Admin
                      </option>
                      <option id="opt-dept"  value="Admin">
                        User
                      </option>
                    
                  </select>
                </div>
              

              
                <div className="input-group mb-3 ">
                  <button
                    className="btn btn-lg  w-100 fs-6 login-btn1"
                    disabled={loading}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    </>
        
    )
}