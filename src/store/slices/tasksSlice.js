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
  const today = new Date().toISOString().split('T')[0];
  return [
    {
      id: 1,
      title: 'Send Invoice',
      description: 'Send invoice to client for completed work',
      status: 'active',
      dueDate: today,
      clientId: 1,
      priority: 'high',
    },
    {
      id: 2,
      title: 'Reply to client',
      description: 'Respond to client inquiry about project status',
      status: 'active',
      dueDate: today,
      clientId: 1,
      priority: 'high',
    },
    {
      id: 3,
      title: 'Prepare Presentation',
      description: 'Create presentation slides for client meeting',
      status: 'active',
      dueDate: today,
      clientId: 1,
      priority: 'medium',
    },
    {
      id: 4,
      title: 'Submit Logo',
      description: 'Submit final logo design to client',
      status: 'active',
      dueDate: today,
      clientId: 1,
      priority: 'high',
    },
    {
      id: 5,
      title: 'Submit Logo',
      description: 'Submit alternative logo design to client',
      status: 'active',
      dueDate: today,
      clientId: 1,
      priority: 'medium',
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
