import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, Sun, Moon, User, LogOut, Settings, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <>
      {/* Status Bar */}
      <div className="status-bar"></div>
      
      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 safe-area-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">MD</span>
              </div>
              <span className="text-xl font-bold gradient-text mobile-hidden">Morgan Digital</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/" className="nav-item">
                Home
              </Link>
              <Link to="/products" className="nav-item">
                Products
              </Link>
              <Link to="/blog" className="nav-item">
                Blog
              </Link>
              <Link to="/contact" className="nav-item">
                Contact
              </Link>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="btn-icon"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Cart */}
              <Link to="/cart" className="btn-icon relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="btn-icon flex items-center space-x-2"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden md:block font-medium">{user?.name}</span>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 slide-up">
                      <div className="p-4">
                        <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {user?.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                              isAdmin 
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            }`}>
                              {isAdmin ? 'Admin' : 'User'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {isAdmin && (
                            <Link
                              to="/admin"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all duration-300"
                            >
                              <BarChart3 className="w-5 h-5" />
                              <span>Admin Dashboard</span>
                            </Link>
                          )}
                          <Link
                            to="/profile"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl transition-all duration-300"
                          >
                            <Settings className="w-5 h-5" />
                            <span>Profile Settings</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all duration-300"
                          >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link to="/login" className="btn-secondary">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary">
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden btn-icon"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 slide-up">
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/" 
                  className="nav-item mobile-full text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/products" 
                  className="nav-item mobile-full text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  to="/blog" 
                  className="nav-item mobile-full text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  to="/contact" 
                  className="nav-item mobile-full text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="nav-item mobile-full text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                {!isAuthenticated && (
                  <div className="flex flex-col space-y-2 px-4 pt-4">
                    <Link 
                      to="/login" 
                      className="btn-secondary text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      className="btn-primary text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;