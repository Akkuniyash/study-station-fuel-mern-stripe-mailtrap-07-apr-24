import { Fragment, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { deleteReview, getReviews } from "../../actions/foodsAction"
import { clearError, clearReviewDeleted } from "../../slices/foodSlice"
import Loader from '../layouts/Loader';
import { MDBDataTable} from 'mdbreact';
import {toast } from 'react-hot-toast'
import Sidebar from "./Sidebar"
import MetaData from "../layouts/MetaData"

export default function ReviewList() {
    const { reviews = [], loading = true, error, isReviewDeleted }  = useSelector(state => state.foodState)
    const [foodId, setFoodId] = useState("");
    const dispatch = useDispatch();

    const setReviews = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }

        reviews.forEach( review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                user : review.user.name,
                comment: review.comment ,
                actions: (
                    <Fragment>
                        <Button onClick={e => deleteHandler(e, review._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteReview(foodId, id))
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(getReviews(foodId))
    }

    useEffect(() => {
        if(error) {
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
        if(isReviewDeleted) {
            toast.success('Review Deleted Succesfully!',{
                      
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              })
            dispatch(clearReviewDeleted())
            dispatch(getReviews(foodId))
            return;
        }

       
    },[dispatch, error, isReviewDeleted])


    return (
        <>
        <MetaData title='Admin ReviewList'/>
        <div className="row">
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
            <h1 className="my-4">Review List</h1>
            <div className="row justify-content-center mt-5">
                <div className="col-5">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label >food ID</label>
                            <input 
                                type="text"
                                onChange= {e => setFoodId(e.target.value)}
                                value={foodId}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn btn-primary btn-block py-2 mt-3">
                            Search
                        </button>
                    </form>
                </div>
            </div>
            <Fragment>
                {loading ? <Loader/> : 
                    <MDBDataTable
                        data={setReviews()}
                        bordered
                        striped
                        hover
                        className="px-3"
                    />
                }
            </Fragment>
        </div>
    </div>
    </>
    )
}