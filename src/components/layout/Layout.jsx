import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import AddTaskModal from '../modals/AddTaskModal';
import AddClientModal from '../modals/AddClientModal';
import ProfilePopup from '../modals/ProfilePopup';
import { DarkModeProvider } from '../../contexts/DarkModeContext';

const Layout = ({ children }) => {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const handleAddTask = () => {
    setShowAddTaskModal(true);
  };

  const handleAddClient = () => {
    setShowAddClientModal(true);
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleToggleProfile = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  return (
    <DarkModeProvider>
      <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
        <Header 
          onAddTask={handleAddTask} 
          onAddClient={handleAddClient} 
          onToggleSidebar={handleToggleSidebar}
          onToggleProfile={handleToggleProfile}
        />
        <div className="flex flex-1 min-h-0">
          <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
          <main className="flex-1 p-4 sm:p-6 lg:ml-0 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      
      {showAddTaskModal && (
        <AddTaskModal onClose={() => setShowAddTaskModal(false)} />
      )}
      
      {showAddClientModal && (
        <AddClientModal onClose={() => setShowAddClientModal(false)} />
      )}
      
        {showProfilePopup && (
          <ProfilePopup 
            isOpen={showProfilePopup} 
            onClose={() => setShowProfilePopup(false)} 
          />
        )}
      </div>
    </DarkModeProvider>
  );
};

export default Layout;
