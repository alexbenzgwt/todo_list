import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../store/slices/authSlice";
import { User, Lock } from "lucide-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [googleLoading, setGoogleLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleClick = () => setShow((prev) => !prev);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    if (!validateForm()) return;

    dispatch(loginStart());

    setTimeout(() => {
      if (
        formData.email === "admin@example.com" &&
        formData.password === "password"
      ) {
        const user = {
          id: 1,
          name: "Naresh",
          email: formData.email,
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        };
        dispatch(loginSuccess(user));
        navigate("/dashboard");
      } else {
        dispatch(loginFailure("Invalid email or password"));
      }
    }, 1000);
  };

  const handleGoogleLogin = async () => {
    if (googleLoading) return;

    setGoogleLoading(true);
    dispatch(loginStart());

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const googleUser = {
        id: 2,
        name: "Naresh (Google)",
        email: "naresh.google@example.com",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
        provider: "Google",
      };

      dispatch(loginSuccess(googleUser));
      navigate("/dashboard");
    } catch (err) {
      dispatch(loginFailure("Google login failed"));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-fit bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col items-center mb-4">
          <img
            src="./src/assets/TruedoitLogo.png"
            alt="Truedoit Logo"
            className="w-64 h-20"
          />
          <p className="text-gray-600 text-center">
            Your freelance journey, made effortless
          </p>
        </div>

        <div className="border border-[#F5C4BF] rounded-2xl bg-white shadow px-6 py-6">
          <h2 className="text-start text-3xl font-semibold text-[#444444]">
            Login
          </h2>
          <p className="mt-1 text-start text-medium text-[#444444] font-medium">
            Login to manage your freelance day
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 mt-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#444444]"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-md bg-[#d6d6d61e] placeholder-gray-500 focus:outline-none focus:ring-2 ${
                    fieldErrors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-red-500"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {fieldErrors.email && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#444444]"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={show ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-md bg-[#d6d6d61e] placeholder-gray-500 focus:outline-none focus:ring-2 ${
                    fieldErrors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-red-500"
                  }`}
                  placeholder="Enter your password"
                />
                <span
                  className="absolute right-3 top-3 text-xl cursor-pointer text-gray-600"
                  onClick={handleClick}
                >
                  {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              {fieldErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-[#1F1F1F] text-sm">
                <input type="checkbox" className="h-4 w-4" />
                Remember me
              </label>
              <Link to="/forgotpass" className="text-[#0094E4] underline text-sm">
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 text-white font-semibold bg-red-600 rounded-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Login"}
            </button>

            <div className="flex items-center justify-center">
              <img src="./src/assets/OR.png" alt="divider" />
            </div>

            <div
              onClick={handleGoogleLogin}
              className={`flex justify-center items-center gap-2 rounded-md py-2 cursor-pointer transition ${
                googleLoading
                  ? "bg-gray-100 opacity-60 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
            >
              <img
                src="./src/assets/GoogleLogo.png"
                alt="Google logo"
                className="w-14 h-14"
              />
              <p className="font-semibold text-gray-700">
                {googleLoading ? "Connecting with Google..." : "Continue with Google"}
              </p>
            </div>
          </form>
          </div>
          <div className="mt-4 text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-red-600 font-bold underline">
              Sign Up free
            </Link>
          </div>
        </div>
      </div>
    
  );
};

export default Login;
