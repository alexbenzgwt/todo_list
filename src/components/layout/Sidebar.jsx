import { NavLink } from 'react-router-dom';
import { 
  Calendar, 
  CalendarDays, 
  CheckCircle, 
  AlertTriangle, 
  Grid3X3, 
  Users, 
  FileText, 
  BarChart3, 
  HelpCircle, 
  Headphones, 
  MessageSquare,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const navigationItems = [
    { name: 'Today Tasks', path: '/dashboard/today', icon: Calendar },
    { name: 'Upcoming Tasks', path: '/dashboard/upcoming', icon: CalendarDays },
    { name: 'Completed Tasks', path: '/dashboard/completed', icon: CheckCircle },
    { name: 'Overdue Tasks', path: '/dashboard/overdue', icon: AlertTriangle },
    { name: 'All Tasks', path: '/dashboard/tasks', icon: Grid3X3 },
    { name: 'Clients', path: '/dashboard/clients', icon: Users },
    { name: 'Invoice', path: '/dashboard/invoice', icon: FileText },
    { name: 'Reports', path: '/dashboard/reports', icon: BarChart3 },
    { name: 'Help', path: '/dashboard/help', icon: HelpCircle },
    { name: 'Contact us', path: '/dashboard/contact', icon: Headphones },
    { name: 'Feedback', path: '/dashboard/feedback', icon: MessageSquare },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-sm border-r border-gray-200 h-full
        transform transition-transform duration-300 ease-in-out overflow-scroll
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-4 lg:mt-8 px-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-red-50 text-red-700 border-r-2 border-red-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
