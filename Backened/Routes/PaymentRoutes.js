const express =  require('express');
const { createOrder, verifyPayment } =  require("../Controller/paymentController");


const router = express.Router();

router.post('/create-order',createOrder);
router.post('/verify-payment',verifyPayment);

module.exports=router;
