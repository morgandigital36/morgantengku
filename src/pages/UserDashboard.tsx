import React, { useState } from 'react';
import { User, ShoppingBag, Heart, Settings, Download, Star, Calendar, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../hooks/useFirestore';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();
  const { orders, loading } = useOrders(user?.id);

  const userStats = {
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, order) => sum + order.total, 0),
    favoriteProducts: 5,
    downloadCount: orders.reduce((sum, order) => sum + order.items.length, 0)
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 fade-in">
          <div className="card p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {user?.email}
                </p>
                <span className="badge badge-primary mt-2">
                  {user?.role === 'admin' ? 'Administrator' : 'Customer'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', name: 'Overview', icon: <User className="w-5 h-5" /> },
              { id: 'orders', name: 'My Orders', icon: <ShoppingBag className="w-5 h-5" /> },
              { id: 'downloads', name: 'Downloads', icon: <Download className="w-5 h-5" /> },
              { id: 'favorites', name: 'Favorites', icon: <Heart className="w-5 h-5" /> },
              { id: 'settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8 fade-in">
            {/* Stats Cards */}
            <div className="app-grid">
              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                    <ShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.totalOrders}</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl">
                    <CreditCard className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      Rp {userStats.totalSpent.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
                    <Download className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Downloads</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.downloadCount}</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-2xl">
                    <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Favorites</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.favoriteProducts}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="card p-6">
              <h2 className="section-title mb-6">Recent Orders</h2>
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="list-item">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            Order #{order.id.slice(-8)}
                          </h3>
                          <span className="badge badge-warning">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.items.length} items • Rp {order.total.toLocaleString('id-ID')}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {new Date(order.date).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No orders yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6 fade-in">
            <h2 className="section-title">My Orders</h2>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Order #{order.id.slice(-8)}
                      </h3>
                      <span className="badge badge-warning">
                        {order.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                        <p className="font-medium">{new Date(order.date).toLocaleDateString('id-ID')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Items</p>
                        <p className="font-medium">{order.items.length} products</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                        <p className="font-medium text-blue-600">Rp {order.total.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Items:</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-xl" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Qty: {item.quantity} • Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card p-12 text-center">
                <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No orders yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Start shopping to see your orders here</p>
                <a href="/products" className="btn-primary">
                  Browse Products
                </a>
              </div>
            )}
          </div>
        )}

        {/* Downloads Tab */}
        {activeTab === 'downloads' && (
          <div className="space-y-6 fade-in">
            <h2 className="section-title">My Downloads</h2>
            <div className="card p-12 text-center">
              <Download className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Download Center</h3>
              <p className="text-gray-600 dark:text-gray-400">Your purchased products will appear here for download</p>
            </div>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="space-y-6 fade-in">
            <h2 className="section-title">My Favorites</h2>
            <div className="card p-12 text-center">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No favorites yet</h3>
              <p className="text-gray-600 dark:text-gray-400">Save products you love to see them here</p>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6 fade-in">
            <h2 className="section-title">Account Settings</h2>
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    className="input-field"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="input-field"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Account Type
                  </label>
                  <input
                    type="text"
                    value={user?.role === 'admin' ? 'Administrator' : 'Customer'}
                    className="input-field"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;