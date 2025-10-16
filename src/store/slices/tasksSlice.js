import { createSlice } from '@reduxjs/toolkit';

// Load tasks from localStorage or use default data
const loadTasksFromStorage = () => {
  try {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
  }
  
  // Default data if no localStorage
  return [
    {
      id: 1,
      title: 'Complete project proposal',
      description: 'Draft and finalize the project proposal for ABC Designs',
      status: 'active',
      dueDate: '2024-01-15',
      clientId: 1,
      priority: 'high',
    },
    {
      id: 2,
      title: 'Review design mockups',
      description: 'Review and provide feedback on the latest design mockups',
      status: 'overdue',
      dueDate: '2024-01-10',
      clientId: 1,
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Update website content',
      description: 'Update the homepage content with new product information',
      status: 'completed',
      dueDate: '2024-01-12',
      clientId: 2,
      priority: 'low',
    },
    {
      id: 4,
      title: 'Client meeting preparation',
      description: 'Prepare presentation materials for upcoming client meeting',
      status: 'upcoming',
      dueDate: '2024-01-20',
      clientId: 1,
      priority: 'high',
    },
  ];
};

const initialState = {
  tasks: loadTasksFromStorage(),
  loading: false,
  error: null,
};

// Helper function to save tasks to localStorage
const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        ...action.payload,
        status: 'active',
      };
      state.tasks.push(newTask);
      saveTasksToStorage(state.tasks);
    },
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
        saveTasksToStorage(state.tasks);
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, setLoading, setError } = tasksSlice.actions;
export default tasksSlice.reducer;
