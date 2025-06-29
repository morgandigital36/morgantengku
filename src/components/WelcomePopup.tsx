import React, { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import { useWebsiteSettings } from '../hooks/useSettings';

const WelcomePopup = () => {
  const { settings } = useWebsiteSettings();
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup should be shown
    const popupShown = localStorage.getItem('welcomePopupShown');
    const lastShown = localStorage.getItem('welcomePopupLastShown');
    const now = new Date().getTime();
    const oneDayAgo = now - (24 * 60 * 60 * 1000); // 24 hours ago

    // Show popup if:
    // 1. Settings exist and popup is enabled
    // 2. Never shown before OR last shown more than 24 hours ago
    // 3. Not already shown in this session
    if (
      settings?.welcomePopup?.enabled && 
      (!popupShown || (lastShown && parseInt(lastShown) < oneDayAgo)) &&
      !hasShown
    ) {
      const delay = (settings.welcomePopup.showDelay || 3) * 1000;
      
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasShown(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [settings, hasShown]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('welcomePopupShown', 'true');
    localStorage.setItem('welcomePopupLastShown', new Date().getTime().toString());
  };

  const handleButtonClick = () => {
    if (settings?.welcomePopup?.buttonLink) {
      // If it's an internal link, use window.location
      if (settings.welcomePopup.buttonLink.startsWith('/')) {
        window.location.href = settings.welcomePopup.buttonLink;
      } else {
        window.open(settings.welcomePopup.buttonLink, '_blank');
      }
    }
    handleClose();
  };

  if (!isVisible || !settings?.welcomePopup?.enabled) {
    return null;
  }

  const popupStyle = {
    backgroundColor: settings.welcomePopup.backgroundColor || '#ffffff',
    color: settings.welcomePopup.textColor || '#1f2937'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div 
        className="relative max-w-md w-full rounded-xl shadow-2xl p-6 animate-scale-in"
        style={popupStyle}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Gift className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-3">
            {settings.welcomePopup.title || 'Selamat Datang!'}
          </h2>

          {/* Message */}
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {settings.welcomePopup.message || 'Terima kasih telah mengunjungi website kami. Dapatkan penawaran terbaik untuk produk digital premium!'}
          </p>

          {/* Button */}
          {settings.welcomePopup.buttonText && (
            <button
              onClick={handleButtonClick}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              {settings.welcomePopup.buttonText}
            </button>
          )}

          {/* Skip Button */}
          <button
            onClick={handleClose}
            className="mt-3 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;