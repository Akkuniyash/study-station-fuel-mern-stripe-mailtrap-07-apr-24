import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearError } from "../../slices/foodsSlice";
import { getAdminFoods } from "../../actions/foodsAction";
import Sidebar from "../admin/Sidebar";
import { MDBDataTable } from "mdbreact";
import Loader from "../layouts/Loader";
import { deleteFood } from "../../actions/foodsAction";
import { clearFoodDeleted } from "../../slices/foodSlice";
import MetaData from "../layouts/MetaData";
const FoodsList = () => {
  const {
    foods = [],
    loading = true,
    error,
  } = useSelector((state) => state.foodsState);
  const { isFoodDeleted, error: foodError } = useSelector(
    (state) => state.foodState
  );
  const dispatch = useDispatch();
  const setfoods = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Availability",
          field: "availability",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    foods.forEach((food) => {
      data.rows.push({
        id: food._id,
        name: food.foodName,
        price: `$${food.price}`,
        availability: food.availability,
        actions: (
          <>
            <Link
              to={`/admin/food/${food._id}`}
              className="btn btn-primary py-1 px-2 "
            >
              {" "}
              <i className="fa fa-pencil"></i>
            </Link> 
            <Button
              onClick={(e) => deleteHandler(e, food._id)}
              className="btn btn-danger py-1 px-2 ms-lg-3"
            >
              <i className="fa fa-trash"></i>
            </Button>
          </>
        ),
      });
    });

    return data;
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteFood(id));
  };

  useEffect(() => {
    if (error || foodError) {
      toast.error(error,{
                      
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      dispatch(clearError());
      return;
    }
    if (isFoodDeleted) {
      toast.success("Food Deleted Succesfully!",{
                      
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      dispatch(clearFoodDeleted());
      return;
    }

    dispatch(getAdminFoods);
  }, [dispatch, error, isFoodDeleted]);

  return (
    <>
    <MetaData title='Admin FoodsList' />
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Foods List</h1>
        <>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setfoods()}
              bordered
              striped
              hover
              className="px-3"
            />
          )}
        </>
      </div>
    </div>
    </>
  );
};

export default FoodsList;
