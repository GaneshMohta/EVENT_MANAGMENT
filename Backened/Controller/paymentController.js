const Razorpay = require('razorpay');
const dotenv = require('dotenv');
const crypto = require('crypto');
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const createOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).send({ message: 'Order creation failed' });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    console.log('Payment verification successful');
    res.json({ message: 'Payment verified successfully' });
  } else {
    console.log('Payment verification failed');
    res.status(400).json({ message: 'Payment verification failed' });
  }
};

module.exports = { createOrder, verifyPayment };
