import { useSelector } from 'react-redux';
import { Calendar, CheckCircle, AlertTriangle, Users, Clock, TrendingUp } from 'lucide-react';

const DashboardPage = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const { clients } = useSelector((state) => state.clients);

  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => task.dueDate === today);
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const overdueTasks = tasks.filter(task => task.dueDate < today && task.status !== 'completed');
  const activeTasks = tasks.filter(task => task.status === 'active');

  const stats = [
    {
      name: 'Today Tasks',
      value: todayTasks.length,
      icon: Calendar,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      name: 'Active Tasks',
      value: activeTasks.length,
      icon: Clock,
      color: 'text-yellow-600 bg-yellow-100',
    },
    {
      name: 'Completed Tasks',
      value: completedTasks.length,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100',
    },
    {
      name: 'Overdue Tasks',
      value: overdueTasks.length,
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-100',
    },
    {
      name: 'Total Clients',
      value: clients.length,
      icon: Users,
      color: 'text-purple-600 bg-purple-100',
    },
    {
      name: 'Completion Rate',
      value: `${Math.round((completedTasks.length / tasks.length) * 100)}%`,
      icon: TrendingUp,
      color: 'text-indigo-600 bg-indigo-100',
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className={`p-2 sm:p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Tasks</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {tasks.slice(0, 5).map((task) => (
            <div key={task.id} className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{task.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{task.description}</p>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
