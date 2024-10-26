import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import './valid.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!role) {
      setError("Please select a role.");
      return;
    }

    const payload = {
      email: email,
      password: password,
      role: role
    };
    console.log(payload);
      try {
        const res = await axios.post("https://event-managment-1l2o.onrender.com/user/sign-up", payload);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem('userId', res.data.userId);
        localStorage.setItem("userRole", role);
        localStorage.setItem('userEmail', email);
        navigate('/');
      } catch (e) {
        setError(e.response?.data?.error || "An error occurred");
      }
  };

  return (
    <div className='signin-container'>
      <div className='signin-content'>
        <div className='image-section'>
          <img
            src='https://img.freepik.com/premium-vector/flat-vector-friendly-smiling-man-waving-hand-saying-hello-hi-hola-concept-illustration_939213-661.jpg?semt=ais_hybrid'
            alt='Signup Visual'
            className='signin-image'
          />
        </div>

        <div className='form-section'>
          <div className='flex justify-center'>
            <button className='google-login-btn '>Continue with Google</button>
          </div>
          <p className='text-center'>
            <span className='divider'>________</span> or <span className='divider'>________</span>
          </p>

          <div className='flex justify-center'>
            <form className='flex flex-col gap-3 w-80 rounded-md items-center' onSubmit={handleLogin}>
              <input
                className='input-field'
                type='email'
                name='email'
                id='email'
                placeholder='Ganesh@gmail.com'
                onChange={handleChangeEmail}
              />
              <input
                className='input-field'
                placeholder='Password'
                type='password'
                name='password'
                id='password'
                onChange={handleChangePassword}
              />
              <div className='role-selection'>
                <label>
                  <input
                    type='radio'
                    value='user'
                    name='role'
                    onChange={handleChangeRole}
                  /> User
                </label>
                <label>
                  <input
                    type='radio'
                    value='admin'
                    name='role'
                    onChange={handleChangeRole}
                  /> Admin
                </label>
              </div>
              {error && <p className='error-message'>{error}</p>}

              <button type='submit' className='submit-btn'>
                Sign Up
              </button>
              <p className='text-sm'>
                Already Registered?<Link to='/Login'><span className='text-blue-400 hover:text-blue-700 cursor-pointer'>Sign in</span></Link>
              </p>
              <div className='text-center text-blue-500 hover:text-blue-950'><Link to='/'>Exit</Link></div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
