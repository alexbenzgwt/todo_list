import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../store/slices/authSlice";
import { User, Lock } from "lucide-react";
import TruedoitLogo from "../../assets/TruedoitLogo.png"; // ✅ Correct image import

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    dispatch(loginStart());

    // Mock login delay
    setTimeout(() => {
      if (
        formData.email === "admin@example.com" &&
        formData.password === "password"
      ) {
        const user = {
          id: 1,
          name: "Jai Chandra",
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

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4">
      {/* ✅ Logo and tagline */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={TruedoitLogo}
          alt="Truedoit Logo"
          className="w-36 mb-2"
        />
        <p className="text-gray-500 text-sm text-center">
          Your freelance journey, made effortless
        </p>
      </div>

      {/* ✅ Login Card */}
      <div className="w-full max-w-md bg-white border border-red-200 rounded-2xl shadow-sm px-8 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Login</h2>
        <p className="text-gray-500 text-sm mb-6">
          Login to manage your freelance day
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ✅ Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="ABC@email.com"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:ring-red-500 focus:border-red-500 text-sm"
              />
            </div>
          </div>

          {/* ✅ Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:ring-red-500 focus:border-red-500 text-sm"
              />
            </div>

            {/* ✅ Remember Me + Forgot Password */}
            <div className="flex justify-between items-center mt-2 text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <span>Remember me</span>
              </label>
              <Link
                to="/forgot"
                className="text-blue-500 hover:text-blue-600 text-sm font-medium underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* ✅ Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* ✅ Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
