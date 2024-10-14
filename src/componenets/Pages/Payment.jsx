import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = ({ eventPrice }) => {
  const [amount] = useState(eventPrice || 0);
  const navigate = useNavigate();

  useEffect(() => {
    if (amount === 0) {
      alert('This event is free! Registration complete.');
    }
  }, [amount, navigate]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert('Failed to load Razorpay SDK');
      return;
    }

    try {
      const orderResponse = await axios.post('https://event-managment-1l2o.onrender.com/payment/create-order', { amount });
      const { amount: orderAmount, id: orderId, currency } = orderResponse.data;

      const options = {
        key: 'rzp_test_NUXd7hr82kbcfF',
        amount: orderAmount,
        currency,
        name: 'Utsaav',
        description: 'Event Registration Payment',
        order_id: orderId,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post('https://event-managment-1l2o.onrender.com/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.data.message === 'Payment verified successfully') {
              alert('Payment successful! Registration complete.');
              navigate('/success');
            } else {
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment Verification Error:', error);
            alert('Payment verification failed.');
          }
        },
        prefill: {
          name: 'Ganesh',
          email: 'ganimaheshwari07@example.com',
          contact: '6374620670',
        },
        theme: {
          color: '#020200',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Order creation error:', error);
      alert('Failed to initiate payment.');
    }
  };

  if (amount === 0) {

    return null;
  }

  return (
    <div>
      <h2>Complete Your Payment</h2>
      <button className="register-btn" onClick={handlePayment}>
        Pay
      </button>
    </div>
  );
};

export default Payment;
