import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import ClientsPage from './pages/ClientsPage';
import InvoicePage from './pages/InvoicePage';
import InvoicePreviewPage from './pages/InvoicePreviewPage';
import ReportsPage from './pages/ReportsPage';
import HelpPage from './pages/HelpPage';
import ForgotPass from './components/auth/ForgotPass';
import './App.css';
import SignUp from './components/auth/SignUp';
import Terms from './components/auth/Terms';
import Verification from './components/auth/Verification';
import ContactPage from './pages/ContactPage';
import FeedBackPage from './pages/FeedBackPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login/>} />
            <Route path="/forgotpass" element={<ForgotPass/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/terms" element={<Terms/>}/>
            <Route path = "/verification" element={<Verification/>}/>
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/today" element={
              <ProtectedRoute>
                <Layout>
                  <TasksPage filter="today" />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/upcoming" element={
              <ProtectedRoute>
                <Layout>
                  <TasksPage filter="upcoming" />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/completed" element={
              <ProtectedRoute>
                <Layout>
                  <TasksPage filter="completed" /> 
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/overdue" element={
              <ProtectedRoute>
                <Layout>
                  <TasksPage filter="overdue" />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/tasks" element={
              <ProtectedRoute>
                <Layout>
                  <TasksPage filter="all" />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/clients" element={
              <ProtectedRoute>
                <Layout>
                  <ClientsPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/invoice" element={
              <ProtectedRoute>
                <Layout>
                  <InvoicePage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/invoice/preview" element={
              <ProtectedRoute>
                <Layout>
                  <InvoicePreviewPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/reports" element={
              <ProtectedRoute>
                <Layout>
                  <ReportsPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/help" element={
              <ProtectedRoute>
                <Layout>
                  <HelpPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/contact" element={
              <ProtectedRoute>
                <Layout>
                  <ContactPage/>
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/feedback" element={
              <ProtectedRoute>
                <Layout>
                  <FeedBackPage />
                </Layout>
              </ProtectedRoute>
            } />

            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;