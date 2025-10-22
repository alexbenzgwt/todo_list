import { User } from 'lucide-react'
import React, { useState } from 'react'
import { loginFailure, loginStart, loginSuccess } from '../../store/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPass = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loading) return; // Prevent multiple submissions
            
            dispatch(loginStart());
        
            // Dummy authentication logic
            setTimeout(() => {
              if (formData.email === 'admin@example.com') {
                const user = {
                  id: 1,
                  name: 'Naresh',
                  email: formData.email,
                  avatar: '/default-avatar.png',
                };
                dispatch(loginSuccess(user));
                navigate('/dashboard');
              } else {
                dispatch(loginFailure('Invalid email'));
              }
            }, 1000);
          };
    
     const [formData, setFormData] = useState({
        email: '',
        
      });
    const handleChange = (e) => {
       
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
    
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 -mt-9">
        <div className="sm:mx-auto sm:w-full sm:max-w-max">
            <div className="flex justify-center">
                <div className=" p-3 rounded-lg"> 
                    <img src="/TruedoitLogo.png" alt="" style={{width:"300px", height:"90px"}}/>
                    <p className='text-gray-600'>Your freelance journey, made effortless</p>
                </div>
            </div>
        <div className='size-full mb-1 border-3 max-w-md border-[#F5C4BF] rounded-2xl bg-white shadow sm:rounded-3xl px-4 py-4'>
        
            <p className=" text-center text-2xl font-semibold text-[#444444] flex justify-items-start">
            Forgot Password
            </p>
            <p className="mt-1 text-start text-medium text-[#444444] flex justify-items-start font-medium">
            Enter your email for the verification proccess,we will send 4 digits code to your email.
            </p>
      
            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        
                <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                <label htmlFor="email" className="block text-medium font-medium mt-8 text-[#444444]">
                    Email address
                </label>
                <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border bg-[#d6d6d61e] border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    placeholder="Enter your email" 
                    />
                </div>
                <div>
                    <Link to="/verification"><button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-2xl font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-5 items-center"
                    >
                        {loading ? 'Signing in...' : 'Continue'}
                    </button></Link>

            </div>
              </div>
              </form></div>
            </div>
        </div>
        </div>
    
            
 ) 
}

export default ForgotPass