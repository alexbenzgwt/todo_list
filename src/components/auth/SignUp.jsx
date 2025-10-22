import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginFailure, loginStart, loginSuccess } from '../../store/slices/authSlice';
import { Lock, User } from 'lucide-react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignUp = () => {
     const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [show,setShow] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // Redirect if already authenticated
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/dashboard', { replace: true });
  //   }
  // }, [isAuthenticated, navigate]);

  let handleClick = () => {
      // console.log("click")
      setShow(!show) 
  } 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return; // Prevent multiple submissions
    
    dispatch(loginStart());

    // Dummy authentication logic
    setTimeout(() => {
      if (formData.email === 'admin@example.com' && formData.password === 'password') {
        const user = {
          id: 1,
          name: 'Naresh',
          email: formData.email,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        };
        dispatch(loginSuccess(user));
        navigate('/dashboard');
      } else {
        dispatch(loginFailure('Invalid email or password'));
      }
    }, 1000);
  };

  return (
    <div className="min-h-lvh bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 -mt-9">
      <div className="sm:mx-auto sm:w-full sm:max-w-max">
        <div className="flex justify-center">
          <div className=" p-3 rounded-lg"> 
            <img src="./src/assets/TruedoitLogo.png" alt="" style={{width:"300px", height:"90px"}}/>
            <p className='text-gray-600'>Your freelance journey, made effortless</p>
          </div>
        </div>
        <div className='size-full mb-1 border-3 border-[#F5C4BF] rounded-2xl bg-white shadow sm:rounded-3xl px-4 py-4'>
        
        <p className=" text-center text-3xl font-semibold text-[#444444] flex justify-items-start">
          SignUp Free
        </p>
        <p className="mt-1 text-center text-medium text-[#444444] flex justify-items-start font-medium">
          Signup to get started today
        </p>
      
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-medium font-medium text-[#444444]">
                Full Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border bg-[#d6d6d61e] border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Enter your name" 
                />
              </div>
            </div>

            <div className='relative'>
              <label htmlFor="password" className="block text-medium font-medium text-gray-600">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={show ? "text":"password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border bg-[#d6d6d61e] border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
              <p className='absolute right-3 bottom-3 size-5 cursor-pointer' onClick={handleClick}>{show ? <AiOutlineEyeInvisible />:<AiOutlineEye />}</p>
            </div>
              <div className='flex justify-items-center gap-1'>
                <div className='flex gap-2'>
                  <input type="checkbox" id='checkbox' name='checkbox' className='size-4 relative top-1.5'/>
                <label htmlFor="Remind" className='text-[#1F1F1F] '>I agree to the</label>
                </div>
                <Link  to="/terms"><p className='text-[#0094E4] cursor-pointer'>Terms of Services</p></Link>
                
                
              </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? 'Signing in...' : 'Signup'}
              </button>
             
            </div>
          </form>
          
        </div>
      </div>
      </div>
      </div>
      <div className='mt-3'>
        <span className='flex justify-center'>Already have an account?
        <Link to="/login"><p className='text-red-600 font-bold underline' >Login</p></Link></span>
      </div> 
      <div>
        <div>

        </div>
      </div>
    </div> 
  )
}

export default SignUp