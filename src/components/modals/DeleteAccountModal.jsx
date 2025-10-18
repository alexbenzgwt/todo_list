import { useState } from 'react';
import { X, AlertTriangle, Trash2, CheckCircle, ArrowLeft } from 'lucide-react';

const DeleteAccountModal = ({ isOpen, onClose, userName }) => {
  const [step, setStep] = useState(1); // 1: Warning, 2: Confirmation, 3: Final Confirmation
  const [confirmationText, setConfirmationText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const requiredText = "DELETE MY ACCOUNT";
  const isConfirmationValid = confirmationText === requiredText;

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleDeleteAccount = async () => {
    if (!isConfirmationValid) return;

    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleted(true);
      
      // Auto close after 3 seconds
      setTimeout(() => {
        onClose();
        // Here you would typically redirect to login or home page
        window.location.href = '/login';
      }, 3000);
    }, 2000);
  };

  const handleClose = () => {
    setStep(1);
    setConfirmationText('');
    setIsDeleting(false);
    setIsDeleted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4"
        onClick={handleClose}
      >
        {/* Modal Content */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md max-h-[95vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              )}
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isDeleted ? 'Account Deleted' : 'Delete Account'}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {!isDeleted ? (
              <>
                {step === 1 && (
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                      <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Are you sure you want to delete your account?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      This action cannot be undone. All your data, tasks, and client information will be permanently deleted.
                    </p>
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                      <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">What will be deleted:</h4>
                      <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
                        <li>• All your tasks and projects</li>
                        <li>• Client information and history</li>
                        <li>• Account settings and preferences</li>
                        <li>• Profile information</li>
                      </ul>
                    </div>
                    <button
                      onClick={handleNext}
                      className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Continue to Delete
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <div className="text-center mb-6">
                      <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                        <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Final Confirmation
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        To confirm account deletion, please type <strong>DELETE MY ACCOUNT</strong> in the box below.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Type confirmation text:
                        </label>
                        <input
                          type="text"
                          value={confirmationText}
                          onChange={(e) => setConfirmationText(e.target.value)}
                          placeholder="DELETE MY ACCOUNT"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Required text: <strong>DELETE MY ACCOUNT</strong>
                        </p>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={handleBack}
                          className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleNext}
                          disabled={!isConfirmationValid}
                          className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Proceed to Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                      <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Last Chance
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      This is your final opportunity to cancel. Once you click "Delete Account", your account will be permanently removed.
                    </p>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                      <p className="text-sm text-yellow-800 dark:text-yellow-300">
                        <strong>Warning:</strong> This action is irreversible. All your data will be lost forever.
                      </p>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={handleBack}
                        className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        disabled={isDeleting}
                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                      >
                        {isDeleting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Deleting...</span>
                          </>
                        ) : (
                          <>
                            <Trash2 className="h-4 w-4" />
                            <span>Delete Account</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Account Deleted Successfully
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your account has been permanently deleted. You will be redirected to the login page shortly.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Thank you for using our service. We're sorry to see you go.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccountModal;
