import { X, Download, Share } from 'lucide-react';

const PhotoViewer = ({ isOpen, onClose, imageUrl, userName }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${userName || 'profile'}-photo.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${userName}'s Profile Photo`,
          text: `Check out ${userName}'s profile photo`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
      >
        {/* Photo Container */}
        <div 
          className="relative max-w-4xl max-h-[95vh] w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Action Buttons */}
          <div className="absolute top-4 left-4 z-10 flex space-x-2">
            <button
              onClick={handleDownload}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              title="Download photo"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={handleShare}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              title="Share photo"
            >
              <Share className="h-5 w-5" />
            </button>
          </div>

          {/* Photo */}
          <div className="relative">
            <img
              src={imageUrl}
              alt={`${userName}'s profile photo`}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* User Info */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold">{userName}</h3>
            <p className="text-sm text-gray-300">Profile Photo</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoViewer;
