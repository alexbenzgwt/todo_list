import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
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
  ],
  loading: false,
  error: null,
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
    },
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
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
