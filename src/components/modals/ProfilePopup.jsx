import { useState } from 'react';
import { 
  Lock, 
  Moon, 
  Edit, 
  Trash2, 
  Share, 
  LogOut, 
  X,
  Save,
  XCircle,
  Eye,
  Camera,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import PhotoViewer from './PhotoViewer';
import ForgotPasswordModal from './ForgotPasswordModal';
import DeleteAccountModal from './DeleteAccountModal';

const ProfilePopup = ({ isOpen, onClose, user }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPhotoViewer, setShowPhotoViewer] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [originalData, setOriginalData] = useState({
    age: '23 Years',
    gender: 'Female',
    mobile: '7969575849',
    workingAs: 'Software Engineer'
  });
  const [profileData, setProfileData] = useState({
    age: '23 Years',
    gender: 'Female',
    mobile: '7969575849',
    workingAs: 'Software Engineer'
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDarkModeToggle = () => {
    toggleDarkMode();
  };

  const handleShareApp = () => {
    // Implement share functionality
    console.log('Share app clicked');
  };

  const handleLogout = () => {
    // Implement logout functionality
    console.log('Logout clicked');
    onClose();
  };

  const handleChangePassword = () => {
    setShowForgotPassword(true);
  };

  const handleEditProfile = () => {
    setIsEditMode(true);
    setOriginalData({ ...profileData });
  };

  const handleSaveProfile = () => {
    // Here you would typically save to backend
    console.log('Profile saved:', profileData);
    setIsEditMode(false);
    setOriginalData({ ...profileData });
  };

  const handleCancelEdit = () => {
    setProfileData({ ...originalData });
    setIsEditMode(false);
  };

  const handleViewPhoto = () => {
    setShowPhotoViewer(true);
  };

  const handleDeleteAccount = () => {
    setShowDeleteAccount(true);
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      // Create a preview URL for the uploaded image
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target.result);
        setIsUploading(false);
        // In a real app, you would upload to a server here
        console.log('Photo uploaded successfully:', file.name);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setUploadError('Failed to upload image. Please try again.');
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePhoto('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-200 animate-in fade-in"
        onClick={onClose}
      />
      
      {/* Profile Popup */}
      <div className="modal-container transform transition-all duration-300 ease-out animate-in slide-in-from-right-4 fade-in">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 ring-1 ring-black/5 dark:ring-gray-600/20 p-4 sm:p-6 modal-content">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">My Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="relative group">
              <img
                src={profilePhoto}
                alt={user?.name || 'Jai Chandra'}
                className="h-12 w-12 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleViewPhoto}
              />
              <button
                onClick={handleViewPhoto}
                className="absolute inset-0 bg-black/0 hover:bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                title="View full photo"
              >
                <Eye className="h-4 w-4 text-white" />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">{user?.name || 'Jai Chandra'}</h3>
              <p className="text-sm text-red-600 dark:text-red-400">Joined: Jan 2025</p>
              
              {/* Upload Controls */}
              <div className="flex items-center space-x-2 mt-2">
                <label className="cursor-pointer">
                  <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    <Upload className="h-3 w-3" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </div>
                </label>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <button
                  onClick={handleRemovePhoto}
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  Remove
                </button>
              </div>
              
              {/* Upload Status */}
              {isUploading && (
                <div className="flex items-center space-x-1 mt-1">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Uploading...</span>
                </div>
              )}
              
              {uploadError && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{uploadError}</p>
              )}
            </div>
          </div>

          {/* Profile Fields */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
                <input
                  type="text"
                  value={profileData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  readOnly={!isEditMode}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm ${
                    !isEditMode ? 'bg-gray-50 dark:bg-gray-800 cursor-not-allowed' : ''
                  }`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                <input
                  type="text"
                  value={profileData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  readOnly={!isEditMode}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm ${
                    !isEditMode ? 'bg-gray-50 dark:bg-gray-800 cursor-not-allowed' : ''
                  }`}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number</label>
              <input
                type="text"
                value={profileData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                readOnly={!isEditMode}
                className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm ${
                  !isEditMode ? 'bg-gray-50 dark:bg-gray-800 cursor-not-allowed' : ''
                }`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Working as</label>
              <input
                type="text"
                value={profileData.workingAs}
                onChange={(e) => handleInputChange('workingAs', e.target.value)}
                readOnly={!isEditMode}
                className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm ${
                  !isEditMode ? 'bg-gray-50 dark:bg-gray-800 cursor-not-allowed' : ''
                }`}
              />
              <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mt-1">
                + Add More
              </button>
            </div>
          </div>

          {/* Edit Mode Buttons */}
          {isEditMode && (
            <div className="flex space-x-3 mb-6">
              <button
                onClick={handleSaveProfile}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span className="text-sm font-medium">Save Changes</span>
              </button>
              
              <button
                onClick={handleCancelEdit}
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <XCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Cancel</span>
              </button>
            </div>
          )}

          {/* Settings Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Settings</h3>
            <div className="space-y-2">
              <button
                onClick={handleChangePassword}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Lock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Change Password</span>
                </div>
                <span className="text-gray-400 dark:text-gray-500">›</span>
              </button>
              
              <button
                onClick={handleDarkModeToggle}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Moon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-8 h-4 rounded-full transition-colors ${isDarkMode ? 'bg-red-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    <div className={`w-3 h-3 bg-white rounded-full transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-0.5'} mt-0.5`} />
                  </div>
                </div>
              </button>
              
              <button
                onClick={handleEditProfile}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Edit className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Edit Profile</span>
                </div>
                <span className="text-gray-400 dark:text-gray-500">›</span>
              </button>
              
              <label className="w-full flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <ImageIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Change Photo</span>
                </div>
                <span className="text-gray-400 dark:text-gray-500">›</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
              
              <button
                onClick={handleDeleteAccount}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Trash2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Delete Account</span>
                </div>
                <span className="text-gray-400 dark:text-gray-500">›</span>
              </button>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={handleShareApp}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Share className="h-4 w-4" />
              <span className="text-sm font-medium">Share App</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="flex-1 border border-red-600 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Photo Viewer Modal */}
    <PhotoViewer
      isOpen={showPhotoViewer}
      onClose={() => setShowPhotoViewer(false)}
      imageUrl={profilePhoto}
      userName={user?.name || 'Jai Chandra'}
    />

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={showDeleteAccount}
        onClose={() => setShowDeleteAccount(false)}
        userName={user?.name || 'Jai Chandra'}
      />
    </>
  );
};

export default ProfilePopup;
