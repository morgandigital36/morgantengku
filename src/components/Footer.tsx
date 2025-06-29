import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 safe-area-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">MD</span>
              </div>
              <span className="text-2xl font-bold gradient-text">Morgan Digital</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
              Penyedia produk digital premium termasuk aplikasi, desain website, dan source code berkualitas tinggi untuk membantu bisnis Anda berkembang.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="btn-icon text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="btn-icon text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="btn-icon text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="btn-icon text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">info@morgandigital.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            © 2024 Morgan Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;