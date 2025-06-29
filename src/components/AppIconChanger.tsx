import React, { useState, useEffect } from 'react';
import { Palette, Check, Download, Upload } from 'lucide-react';

interface AppIcon {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
}

const AppIconChanger = () => {
  const [selectedIcon, setSelectedIcon] = useState('default');
  const [customIcon, setCustomIcon] = useState<string | null>(null);

  const predefinedIcons: AppIcon[] = [
    {
      id: 'default',
      name: 'Default',
      icon: 'MD',
      color: '#3b82f6',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 'modern',
      name: 'Modern',
      icon: 'M',
      color: '#10b981',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      id: 'elegant',
      name: 'Elegant',
      icon: '◆',
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      icon: '●',
      color: '#f59e0b',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'tech',
      name: 'Tech',
      icon: '⚡',
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'creative',
      name: 'Creative',
      icon: '✦',
      color: '#ec4899',
      gradient: 'from-pink-500 to-rose-600'
    }
  ];

  useEffect(() => {
    const savedIcon = localStorage.getItem('morgan-digital-app-icon');
    if (savedIcon) {
      setSelectedIcon(savedIcon);
    }
  }, []);

  const handleIconChange = (iconId: string) => {
    setSelectedIcon(iconId);
    localStorage.setItem('morgan-digital-app-icon', iconId);
    
    // Update favicon
    const selectedIconData = predefinedIcons.find(icon => icon.id === iconId);
    if (selectedIconData) {
      updateFavicon(selectedIconData);
    }
  };

  const updateFavicon = (iconData: AppIcon) => {
    // Create canvas to generate favicon
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 32, 32);
      gradient.addColorStop(0, iconData.color);
      gradient.addColorStop(1, iconData.color + '80');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
      
      // Add icon text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(iconData.icon, 16, 16);
      
      // Update favicon
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = canvas.toDataURL();
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  };

  const handleCustomIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCustomIcon(result);
        
        // Update favicon with custom icon
        const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = result;
        document.getElementsByTagName('head')[0].appendChild(link);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center mb-6">
        <Palette className="w-6 h-6 text-blue-600 mr-3" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          App Icon Changer
        </h3>
      </div>

      <div className="space-y-6">
        {/* Predefined Icons */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Pilih Icon Aplikasi
          </h4>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {predefinedIcons.map((icon) => (
              <button
                key={icon.id}
                onClick={() => handleIconChange(icon.id)}
                className={`relative group p-4 rounded-2xl border-2 transition-all duration-300 ${
                  selectedIcon === icon.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${icon.gradient} rounded-xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {icon.icon}
                </div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
                  {icon.name}
                </p>
                {selectedIcon === icon.id && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Icon Upload */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Upload Icon Kustom
          </h4>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-6 text-center hover:border-blue-500 transition-colors duration-300">
            <input
              type="file"
              accept="image/*"
              onChange={handleCustomIconUpload}
              className="hidden"
              id="custom-icon-upload"
            />
            <label
              htmlFor="custom-icon-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Klik untuk upload icon
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, SVG (max 2MB)
              </p>
            </label>
          </div>
          
          {customIcon && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-center">
                <img src={customIcon} alt="Custom icon" className="w-8 h-8 rounded-lg mr-3" />
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    Icon kustom berhasil diupload
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    Favicon telah diperbarui
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Preview */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Preview
          </h4>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="flex items-center space-x-3">
              {customIcon ? (
                <img src={customIcon} alt="Custom icon" className="w-8 h-8 rounded-lg" />
              ) : (
                <div className={`w-8 h-8 bg-gradient-to-br ${predefinedIcons.find(icon => icon.id === selectedIcon)?.gradient || 'from-blue-500 to-purple-600'} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                  {predefinedIcons.find(icon => icon.id === selectedIcon)?.icon || 'MD'}
                </div>
              )}
              <span className="font-semibold text-gray-900 dark:text-white">
                Morgan Digital
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Browser tab preview
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppIconChanger;