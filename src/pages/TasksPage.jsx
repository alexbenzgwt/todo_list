import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Search, 
  Plus, 
  Calendar, 
  User, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Target,
  List,
  Trash2,
  Edit,
  Check,
  X,
  MoreVertical,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Grid3X3
} from 'lucide-react';
import AddTaskModal from '../components/modals/AddTaskModal';
import { updateTask, deleteTask } from '../store/slices/tasksSlice';

const TasksPage = ({ filter = 'all' }) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { clients } = useSelector((state) => state.clients);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [viewType, setViewType] = useState('list'); // 'list' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priority: 'all', // 'all', 'high', 'medium', 'low'
    status: 'all',   // 'all', 'active', 'completed', 'overdue', 'upcoming'
    client: 'all'    // 'all' or client ID
  });

  // Update task status based on due dates
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const tasksToUpdate = [];

    tasks.forEach(task => {
      let newStatus = task.status;
      
      if (task.status === 'completed') {
        return; // Don't change completed tasks
      }
      
      if (task.dueDate < today) {
        newStatus = 'overdue';
      } else if (task.dueDate === today) {
        newStatus = 'active';
      } else if (task.dueDate > today && task.status === 'active') {
        newStatus = 'upcoming';
      }

      if (newStatus !== task.status) {
        tasksToUpdate.push({ id: task.id, updates: { status: newStatus } });
      }
    });

    // Update tasks with new statuses
    tasksToUpdate.forEach(({ id, updates }) => {
      dispatch(updateTask({ id, updates }));
    });
  }, [dispatch, tasks]);

  const getFilteredTasks = () => {
    let filtered = tasks;
    const today = new Date().toISOString().split('T')[0];
    
    // If calendar view and all tasks, show tasks for selected date
    if (filter === 'all' && viewType === 'calendar') {
      const selectedDateString = selectedDate.toISOString().split('T')[0];
      filtered = tasks.filter(task => task.dueDate === selectedDateString);
    } else {
      switch (filter) {
        case 'today':
          filtered = tasks.filter(task => task.dueDate === today);
          break;
        case 'upcoming':
          filtered = tasks.filter(task => 
            task.dueDate > today && 
            (task.status === 'upcoming' || task.status === 'active')
          );
          break;
        case 'completed':
          filtered = tasks.filter(task => task.status === 'completed');
          break;
        case 'overdue':
          filtered = tasks.filter(task => 
            task.dueDate < today && 
            task.status !== 'completed'
          );
          break;
        case 'all':
        default:
          filtered = tasks;
          break;
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply additional filters
    if (filters.priority !== 'all') {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    if (filters.client !== 'all') {
      filtered = filtered.filter(task => task.clientId === parseInt(filters.client));
    }

    return filtered;
  };

  // Task management functions
  const handleCompleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const newStatus = task.status === 'completed' ? 'active' : 'completed';
      dispatch(updateTask({ id: taskId, updates: { status: newStatus } }));
    }
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
    setShowDeleteConfirm(null);
  };

  const handleCheckboxChange = (taskId, isChecked) => {
    const newStatus = isChecked ? 'completed' : 'active';
    dispatch(updateTask({ id: taskId, updates: { status: newStatus } }));
  };

  const handleTaskStatusToggle = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const newStatus = task.status === 'completed' ? 'active' : 'completed';
      dispatch(updateTask({ id: taskId, updates: { status: newStatus } }));
    }
  };

  const handleBulkComplete = () => {
    selectedTasks.forEach(taskId => {
      dispatch(updateTask({ id: taskId, updates: { status: 'completed' } }));
    });
    setSelectedTasks(new Set());
  };

  const handleBulkDelete = () => {
    selectedTasks.forEach(taskId => {
      dispatch(deleteTask(taskId));
    });
    setSelectedTasks(new Set());
  };

  // Filter management functions
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      priority: 'all',
      status: 'all',
      client: 'all'
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.priority !== 'all') count++;
    if (filters.status !== 'all') count++;
    if (filters.client !== 'all') count++;
    return count;
  };

  // Close filter panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilters && !event.target.closest('.filter-panel')) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters]);

  // Calendar utility functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getTasksForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === dateString);
  };

  const hasTasksOnDate = (date) => {
    return getTasksForDate(date).length > 0;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getClientName = (clientId) => {
    // Handle null/undefined clientId
    if (!clientId) {
      return 'No Client';
    }
    
    // Convert clientId to number for proper comparison
    const numericClientId = typeof clientId === 'string' ? parseInt(clientId) : clientId;
    
    // Check if clients array is loaded
    if (!clients || clients.length === 0) {
      console.log('Clients array is empty or not loaded');
      return 'Loading...';
    }
    
    const client = clients.find(c => c.id === numericClientId);
    
    // Debug logging to help identify issues
    if (!client) {
      console.log('Client not found for ID:', clientId, 'Numeric ID:', numericClientId, 'Available clients:', clients.map(c => ({ id: c.id, name: c.name })));
    }
    
    return client ? client.name : 'Unknown Client';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-white bg-red-500';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'overdue': return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'active': return <Clock className="h-5 w-5 text-orange-500" />;
      case 'upcoming': return <Clock className="h-5 w-5 text-orange-500" />;
      default: return <List className="h-5 w-5 text-gray-500" />;
    }
  };

  const getFilterIcon = () => {
    switch (filter) {
      case 'today': return <Clock className="h-6 w-6 text-orange-500" />;
      case 'upcoming': return <Clock className="h-6 w-6 text-orange-500" />;
      case 'completed': return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'overdue': return <AlertCircle className="h-6 w-6 text-red-500" />;
      case 'all': return <List className="h-6 w-6 text-gray-500" />;
      default: return <List className="h-6 w-6 text-gray-500" />;
    }
  };

  const getFilterTitle = () => {
    switch (filter) {
      case 'today': return 'Today\'s Tasks';
      case 'upcoming': return 'Upcoming Tasks';
      case 'completed': return 'Completed Tasks';
      case 'overdue': return 'Overdue Tasks';
      case 'all': return 'All Tasks';
      default: return 'All Tasks';
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
            placeholder="Search Users Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 relative"
          >
            <SlidersHorizontal className="h-5 w-5 text-red-600" />
            <span className="text-sm text-red-600 font-semibold">Filter</span>
            {getActiveFiltersCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getActiveFiltersCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="filter-panel bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>

            {/* Client Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client
              </label>
              <select
                value={filters.client}
                onChange={(e) => handleFilterChange('client', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Clients</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {getFilterTitle()}
          </h1>
          {getFilterIcon()}
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
            {filteredTasks.length} tasks
          </span>
        </div>
        
        {/* View Toggle - Only show for All Tasks, Add Task button for other views */}
        {filter === 'all' ? (
          <div className="flex items-center space-x-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewType('list')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewType === 'list' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="h-4 w-4" />
                <span>List</span>
              </button>
              <button
                onClick={() => setViewType('calendar')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewType === 'calendar' 
                    ? 'bg-red-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>Calendar</span>
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setIsAddTaskModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </button>
        )}
      </div>

      {/* Tasks List or Calendar View */}
      {filter === 'all' && viewType === 'calendar' ? (
        <CalendarView 
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          onMonthChange={navigateMonth}
          tasks={tasks}
          filteredTasks={filteredTasks}
          onCheckboxChange={handleCheckboxChange}
          onDeleteTask={setShowDeleteConfirm}
          getClientName={getClientName}
          getPriorityColor={getPriorityColor}
          getDaysInMonth={getDaysInMonth}
          hasTasksOnDate={hasTasksOnDate}
          formatMonthYear={formatMonthYear}
        />
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {filteredTasks.length === 0 ? (
            <div className="p-6 sm:p-8 text-center text-gray-500">
              <p className="text-sm sm:text-base flex items-center justify-center space-x-2">
                No {filter === 'all' ? '' : filter} tasks found
                {getFilterIcon()}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    {/* Checkbox */}
                    <div className="flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={task.status === 'completed'}
                        onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                        className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500 accent-red-600"
                        style={{
                          accentColor: '#dc2626'
                        }}
                      />
                    </div>
                    
                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-base font-medium truncate ${
                            task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
                          }`}>
                            {task.title}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {getClientName(task.clientId)}
                          </p>
                        </div>
                        
                        {/* Priority Tag */}
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          
                          {/* More Options Menu */}
                          <button
                            onClick={() => setShowDeleteConfirm(task.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                            title="More options"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Task Modal */}
      {isAddTaskModalOpen && (
        <AddTaskModal onClose={() => setIsAddTaskModalOpen(false)} />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Task</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTask(showDeleteConfirm)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Calendar View Component
const CalendarView = ({
  currentMonth,
  selectedDate,
  onDateSelect,
  onMonthChange,
  tasks,
  filteredTasks,
  onCheckboxChange,
  onDeleteTask,
  getClientName,
  getPriorityColor,
  getDaysInMonth,
  hasTasksOnDate,
  formatMonthYear
}) => {
  const days = getDaysInMonth(currentMonth);
  const today = new Date();
  const isToday = (date) => {
    return date && date.toDateString() === today.toDateString();
  };
  const isSelected = (date) => {
    return date && date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar Widget */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onMonthChange(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {formatMonthYear(currentMonth)}
          </h2>
          <button
            onClick={() => onMonthChange(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => (
            <button
              key={index}
              onClick={() => date && onDateSelect(date)}
              className={`relative p-2 text-sm rounded-lg transition-colors ${
                !date 
                  ? 'cursor-default' 
                  : isSelected(date)
                  ? 'bg-red-600 text-white'
                  : isToday(date)
                  ? 'bg-red-100 text-red-600 font-semibold'
                  : 'hover:bg-gray-100 text-gray-900'
              }`}
            >
              {date && date.getDate()}
              {date && hasTasksOnDate(date) && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks for Selected Date */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
        </div>
        
        {filteredTasks.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-sm">No tasks for this date</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  {/* Checkbox */}
                  <div className="flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      onChange={(e) => onCheckboxChange(task.id, e.target.checked)}
                      className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500 accent-red-600"
                      style={{
                        accentColor: '#dc2626'
                      }}
                    />
                  </div>
                  
                  {/* Task Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-base font-medium truncate ${
                          task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {getClientName(task.clientId)}
                        </p>
                      </div>
                      
                      {/* Priority Tag */}
                      <div className="flex items-center space-x-2 ml-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        
                        {/* More Options Menu */}
                        <button
                          onClick={() => onDeleteTask(task.id)}
                          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                          title="More options"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
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

