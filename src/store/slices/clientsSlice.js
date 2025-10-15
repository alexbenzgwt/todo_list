import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clients: [
    {
      id: 1,
      name: 'ABC Designs',
      email: 'contact@abcdesigns.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      activeTasks: 3,
      overdueTasks: 2,
      completedTasks: 5,
    },
    {
      id: 2,
      name: 'Tech Solutions Inc',
      email: 'info@techsolutions.com',
      phone: '+1 (555) 987-6543',
      status: 'active',
      activeTasks: 2,
      overdueTasks: 0,
      completedTasks: 8,
    },
    {
      id: 3,
      name: 'Creative Agency',
      email: 'hello@creativeagency.com',
      phone: '+1 (555) 456-7890',
      status: 'active',
      activeTasks: 1,
      overdueTasks: 1,
      completedTasks: 3,
    },
    {
      id: 4,
      name: 'Digital Marketing Co',
      email: 'contact@digitalmarketing.com',
      phone: '+1 (555) 321-0987',
      status: 'active',
      activeTasks: 4,
      overdueTasks: 0,
      completedTasks: 12,
    },
    {
      id: 5,
      name: 'Startup Ventures',
      email: 'team@startupventures.com',
      phone: '+1 (555) 654-3210',
      status: 'active',
      activeTasks: 2,
      overdueTasks: 1,
      completedTasks: 6,
    },
    {
      id: 6,
      name: 'E-commerce Store',
      email: 'support@ecommercestore.com',
      phone: '+1 (555) 789-0123',
      status: 'active',
      activeTasks: 3,
      overdueTasks: 0,
      completedTasks: 9,
    },
  ],
  loading: false,
  error: null,
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    addClient: (state, action) => {
      const newClient = {
        id: Date.now(),
        ...action.payload,
        status: 'active',
        activeTasks: 0,
        overdueTasks: 0,
        completedTasks: 0,
      };
      state.clients.push(newClient);
    },
    updateClient: (state, action) => {
      const { id, updates } = action.payload;
      const clientIndex = state.clients.findIndex(client => client.id === id);
      if (clientIndex !== -1) {
        state.clients[clientIndex] = { ...state.clients[clientIndex], ...updates };
      }
    },
    deleteClient: (state, action) => {
      state.clients = state.clients.filter(client => client.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addClient, updateClient, deleteClient, setLoading, setError } = clientsSlice.actions;
export default clientsSlice.reducer;
