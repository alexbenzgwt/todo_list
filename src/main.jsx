import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Verification from './components/auth/verification.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import Login from './components/auth/Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
   </StrictMode>,
)
