// React hooks for component state management
import { useState } from 'react';
// Redux hooks for state management and dispatching actions
import { useSelector, useDispatch } from 'react-redux';
// Lucide React icons for UI elements (search, filter, add buttons, task status icons, etc.)
import { Search, Filter, Plus, ChevronRight, Clock, AlertTriangle, CheckSquare, Square, X } from 'lucide-react';
// Redux action creators for client management
import { addClient } from '../store/slices/clientsSlice';
// Redux action creators for task management (add, update, delete tasks)
import { addTask, updateTask, deleteTask } from '../store/slices/tasksSlice';

const ClientsPage = () => {
  // REDUX STATE MANAGEMENT
  // Get clients data from Redux store
  const { clients } = useSelector((state) => state.clients);
  // Get tasks data from Redux store
  const { tasks } = useSelector((state) => state.tasks);
  // Get dispatch function to send actions to Redux store
  const dispatch = useDispatch();
  
  // COMPONENT STATE VARIABLES
  // Search functionality - stores the search input text
  const [searchTerm, setSearchTerm] = useState('');
  // Client filter dropdown - stores selected client ID for filtering
  const [selectedClient, setSelectedClient] = useState('');
  // Controls visibility of "Add Client" modal
  const [isAdding, setIsAdding] = useState(false);
  // Form data for adding new clients (name, phone, email, note)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', note: '' });
  // Stores the ID of client for which we're adding a task
  const [selectedClientId, setSelectedClientId] = useState(null);
  // Tracks which clients have their task sections expanded (object with client IDs as keys)
  const [expandedClients, setExpandedClients] = useState({});
  // Controls visibility of "Add Task" modal
  const [showAddTask, setShowAddTask] = useState(false);
  // Form data for adding new tasks (title, description, due date, priority)
  const [taskFormData, setTaskFormData] = useState({ title: '', description: '', dueDate: '', priority: 'medium' });

  // DATA PROCESSING
  // Filter clients based on search term (case-insensitive search)
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // CLIENT MANAGEMENT FUNCTIONS
  // Opens the "Add Client" modal
  const openAddForm = () => setIsAdding(true);
  
  // Closes the "Add Client" modal and resets form data
  const closeAddForm = () => {
    setIsAdding(false);
    setFormData({ name: '', phone: '', email: '', note: '' });
  };
  
  // Handles input changes in the client form (updates formData state)
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // Handles client form submission with validation
  const onSubmit = (e) => {
    e.preventDefault();
    // Validate required fields (name, phone, email must be filled)
    if (!formData.name || !formData.phone || !formData.email) return;
    // Dispatch addClient action to Redux store
    dispatch(addClient(formData));
    // Close the form after successful submission
    closeAddForm();
  };

  // TASK DISPLAY FUNCTIONS
  // Toggles the expanded/collapsed state of a client's task section
  const toggleClientTasks = (clientId) => {
    setExpandedClients(prev => ({
      ...prev,
      [clientId]: !prev[clientId]
    }));
  };

  // Returns all tasks that belong to a specific client
  const getClientTasks = (clientId) => {
    return tasks.filter(task => task.clientId === clientId);
  };

  // Finds and returns the client object based on selected client ID
  const getSelectedClient = () => {
    return clients.find(client => client.id === selectedClientId);
  };

  // TASK MANAGEMENT FUNCTIONS
  // Toggles a task's status between 'completed' and 'active'
  const toggleTaskStatus = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const newStatus = task.status === 'completed' ? 'active' : 'completed';
      dispatch(updateTask({ id: taskId, updates: { status: newStatus } }));
    }
  };

  // Deletes a task by dispatching deleteTask action
  const deleteTaskHandler = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  // TASK CREATION FUNCTIONS
  // Opens the "Add Task" modal for a specific client
  const openAddTaskForm = (clientId) => {
    setSelectedClientId(clientId);
    setShowAddTask(true);
    setTaskFormData({ title: '', description: '', dueDate: '', priority: 'medium' });
  };

  // Closes the "Add Task" modal and resets all related state
  const closeAddTaskForm = () => {
    setShowAddTask(false);
    setSelectedClientId(null);
    setTaskFormData({ title: '', description: '', dueDate: '', priority: 'medium' });
  };

  // Handles input changes in the task form (updates taskFormData state)
  const onTaskFormChange = (e) => {
    setTaskFormData({ ...taskFormData, [e.target.name]: e.target.value });
  };

  // Handles task form submission with validation
  const onTaskSubmit = (e) => {
    e.preventDefault();
    // Validate required fields (title and client ID must be present)
    if (!taskFormData.title || !selectedClientId) return;
    
    // Create new task object with form data
    const newTask = {
      title: taskFormData.title,
      description: taskFormData.description,
      // Use current date if no due date is provided
      dueDate: taskFormData.dueDate || new Date().toISOString().split('T')[0],
      clientId: selectedClientId,
      priority: taskFormData.priority,
    };
    
    // Dispatch addTask action to Redux store
    dispatch(addTask(newTask));
    // Close the form after successful submission
    closeAddTaskForm();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* SEARCH AND FILTER SECTION */}
      {/* This section contains search input, client filter dropdown, and filter icon */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        {/* Search Input - allows users to search clients by name */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search Users Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        
        {/* Client Filter Dropdown - allows filtering by specific client */}
        <div className="relative">
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full sm:w-auto appearance-none bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Filter Icon - visual indicator for filter functionality */}
        <div className="flex flex-col items-center">
          <Filter className="h-6 w-6 text-gray-400 dark:text-gray-500" />
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Filter</span>
        </div>
      </div>

      {/* HEADER SECTION */}
      {/* Contains page title and "Add Client" button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
        {/* Page Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Clients</h1>
        {/* Add Client Button - opens the client creation modal */}
        <button onClick={openAddForm} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          <span>Add Client</span>
        </button>
      </div>

      {/* ADD CLIENT MODAL */}
      {/* Modal overlay that appears when isAdding is true */}
      {isAdding && (
        <div className="fixed inset-0 z-40" onClick={closeAddForm}>
          {/* Backdrop - clicking closes the modal */}
          <div className="absolute inset-0"></div>
          {/* Modal Content - positioned on the right side */}
          <div className="absolute right-6 top-28 w-[90%] sm:w-[480px]" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 ring-1 ring-black/5 p-5 sm:p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Add Client</h2>
                {/* Close Button */}
                <button type="button" onClick={closeAddForm} aria-label="Close" className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              {/* Client Form */}
              <form onSubmit={onSubmit} className="space-y-4">
                {/* Client Name Field - Required */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input name="name" value={formData.name} onChange={onChange} type="text" placeholder="Client Name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" required />
                </div>
                {/* Mobile Number Field - Required */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input name="phone" value={formData.phone} onChange={onChange} type="tel" placeholder="Mobile Number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" required />
                </div>
                {/* Email Field - Required */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input name="email" value={formData.email} onChange={onChange} type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" required />
                </div>
                {/* Note Field - Optional */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                  <textarea name="note" value={formData.note} onChange={onChange} rows={3} placeholder="Note" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                {/* Submit Button */}
                <div>
                  <button type="submit" className="w-full px-4 py-3 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors">ADD CLIENT</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CLIENTS LIST SECTION */}
      {/* Main container for displaying all clients */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* Map through filtered clients to display each client */}
          {filteredClients.map((client) => (
            <div key={client.id} className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              {/* Client Header - clickable to expand/collapse tasks */}
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleClientTasks(client.id)}>
                <div className="flex-1 min-w-0">
                  {/* Client Name */}
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white truncate">{client.name}</h3>
                  {/* Task Status Indicators */}
                  <div className="flex items-center mt-1">
                    {/* Show overdue tasks warning if any exist */}
                    {client.overdueTasks > 0 ? (
                      <>
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-red-600 dark:text-red-400">
                          {client.overdueTasks} Overdue Tasks
                        </span>
                      </>
                    ) : (
                      /* Show active tasks count if no overdue tasks */
                      <>
                        <Clock className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          {client.activeTasks} Active Tasks
                        </span>
                      </>
                    )}
                  </div>
                </div>
                {/* Expand/Collapse Arrow - rotates when expanded */}
                <ChevronRight className={`h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2 transition-transform ${expandedClients[client.id] ? 'rotate-90' : ''}`} />
              </div>

              {/* EXPANDED TASKS SECTION */}
              {/* Shows when client is expanded (expandedClients[client.id] is true) */}
              {expandedClients[client.id] && (
                <div className="mt-4 border-t pt-4">
                  {/* Task Section Header */}
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-900">{client.name}</h4>
                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      {/* Add Task Button - opens task creation modal for this client */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openAddTaskForm(client.id);
                        }}
                        className="text-xs text-green-600 hover:text-green-800"
                      >
                        + Add Task
                      </button>
                      {/* View All Tasks Button - placeholder for future functionality */}
                      <button className="text-xs text-blue-600 hover:text-blue-800">
                        View all tasks &gt;
                      </button>
                    </div>
                  </div>
                  
                  {/* Task List - shows up to 4 tasks */}
                  <div className="space-y-2">
                    {/* Map through first 4 tasks for this client */}
                    {getClientTasks(client.id).slice(0, 4).map((task) => (
                      <div key={task.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {/* Task Status Toggle Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTaskStatus(task.id);
                            }}
                            className="text-gray-400 hover:text-green-600"
                          >
                            {/* Show checkmark if completed, empty square if active */}
                            {task.status === 'completed' ? (
                              <CheckSquare className="h-4 w-4 text-green-600" />
                            ) : (
                              <Square className="h-4 w-4" />
                            )}
                          </button>
                          {/* Task Details */}
                          <div>
                            {/* Task Title - strikethrough if completed */}
                            <span className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {task.title}
                            </span>
                            {/* Due Date Display */}
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>Due {new Date(task.dueDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}</span>
                            </div>
                          </div>
                        </div>
                        {/* Task Actions Menu */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTaskHandler(task.id);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          ⋯
                        </button>
                      </div>
                    ))}
                    
                    {/* Show "more tasks" indicator if client has more than 4 tasks */}
                    {getClientTasks(client.id).length > 4 && (
                      <div className="text-xs text-gray-500 py-2">
                        +{getClientTasks(client.id).length - 4} more tasks
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ADD TASK MODAL */}
      {/* Modal overlay that appears when showAddTask is true */}
      {showAddTask && (
        <div className="fixed inset-0 z-50" onClick={closeAddTaskForm}>
          {/* Backdrop - clicking closes the modal */}
          <div className="absolute inset-0"></div>
          {/* Modal Content - positioned on the right side */}
          <div className="absolute right-6 top-28 w-[90%] sm:w-[480px]" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 ring-1 ring-black/5 p-5 sm:p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Add Task</h2>
                {/* Close Button */}
                <button type="button" onClick={closeAddTaskForm} aria-label="Close" className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {/* Task Form */}
              <form onSubmit={onTaskSubmit} className="space-y-4">
                {/* Task Title Field - Required */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                  <input 
                    name="title" 
                    value={taskFormData.title} 
                    onChange={onTaskFormChange} 
                    type="text" 
                    placeholder="Enter task title" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                    required 
                  />
                </div>
                {/* Task Description Field - Optional */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    name="description" 
                    value={taskFormData.description} 
                    onChange={onTaskFormChange} 
                    rows={3} 
                    placeholder="Enter task description" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                  />
                </div>
                {/* Due Date and Priority Section */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Due Date Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input 
                      name="dueDate" 
                      value={taskFormData.dueDate} 
                      onChange={onTaskFormChange} 
                      type="date" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                    />
                  </div>
                  {/* Priority Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <div className="flex space-x-3">
                      {/* Priority Buttons - High, Medium, Low */}
                      {['high', 'medium', 'low'].map((priority) => (
                        <button
                          key={priority}
                          type="button"
                          onClick={() => setTaskFormData({ ...taskFormData, priority })}
                          className={`px-4 py-2 text-sm font-medium rounded-md border-2 transition-all duration-200 ${
                            taskFormData.priority === priority
                              ? 'border-gray-300 text-gray-700'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                          style={{
                            backgroundColor: taskFormData.priority === priority ? '#F5C4BF' : '#ffffff'
                          }}
                        >
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Submit Button */}
                <div>
                  <button type="submit" className="w-full px-4 py-3 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors">ADD TASK</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;
