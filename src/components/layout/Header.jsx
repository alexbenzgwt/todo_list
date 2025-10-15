import { useSelector, useDispatch } from 'react-redux';
import { Plus, Bell, CheckSquare, Menu } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';

const Header = ({ onAddTask, onAddClient, onToggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Mobile menu button, Logo and greeting */}
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 mr-2"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="bg-red-600 p-2 rounded-lg mr-3">
              <CheckSquare className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Hi, {user?.name}
            </h1>
          </div>

          {/* Right side - Actions and profile */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={onAddTask}
              className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 transition-colors text-sm sm:text-base"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Task</span>
            </button>
            
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            
            <div className="relative group">
              <button className="flex items-center space-x-2">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                  alt={user?.name}
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover"
                />
              </button>
              
              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
