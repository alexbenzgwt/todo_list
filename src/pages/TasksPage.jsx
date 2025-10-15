import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Search, Plus, Calendar, User, AlertCircle, CheckCircle } from 'lucide-react';

const TasksPage = ({ filter = 'all' }) => {
  const { tasks } = useSelector((state) => state.tasks);
  const { clients } = useSelector((state) => state.clients);
  const [searchTerm, setSearchTerm] = useState('');

  const getFilteredTasks = () => {
    let filtered = tasks;
    
    if (filter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      filtered = tasks.filter(task => task.dueDate === today);
    } else if (filter === 'upcoming') {
      const today = new Date().toISOString().split('T')[0];
      filtered = tasks.filter(task => task.dueDate > today && task.status === 'upcoming');
    } else if (filter === 'completed') {
      filtered = tasks.filter(task => task.status === 'completed');
    } else if (filter === 'overdue') {
      const today = new Date().toISOString().split('T')[0];
      filtered = tasks.filter(task => task.dueDate < today && task.status !== 'completed');
    }

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Unknown Client';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'overdue': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <Calendar className="h-5 w-5 text-blue-500" />;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search Section */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 capitalize">
          {filter === 'all' ? 'All Tasks' : `${filter} Tasks`}
        </h1>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {filteredTasks.length === 0 ? (
          <div className="p-6 sm:p-8 text-center text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-sm sm:text-base">No tasks found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <div key={task.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(task.status)}
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">{task.title}</h3>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full w-fit ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span className="truncate">{getClientName(task.clientId)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
