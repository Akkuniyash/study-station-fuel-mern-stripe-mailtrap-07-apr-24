const express=require('express')
const router=express.Router()
const {
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder

}=require("../controllers/orderControllers")
const{isAuthenticatedUser,authorizeRole}=require('../middlewares/authenticate')

router.route('/order/new').post(isAuthenticatedUser,newOrder);
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);
router.route('/myOrders').get(isAuthenticatedUser,myOrders);
router.route('/admin/orders').get(isAuthenticatedUser,authorizeRole('admin'),getAllOrders);
router.route('/admin/order/:id').put(isAuthenticatedUser,authorizeRole('admin'),updateOrder);
router.route('/admin/order/:id').delete(isAuthenticatedUser,authorizeRole('admin'),deleteOrder);

module.exports=router;