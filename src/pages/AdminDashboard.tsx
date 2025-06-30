import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Upload,
  Eye,
  EyeOff,
  Star,
  TrendingUp,
  DollarSign,
  Calendar,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  CreditCard,
  Smartphone,
  Building,
  QrCode,
  Wallet,
  Banknote,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Check,
  AlertCircle
} from 'lucide-react';
import { useProducts, useOrders, useBlogPosts } from '../hooks/useFirestore';
import { useWebsiteSettings } from '../hooks/useSettings';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { products, loading: productsLoading, addProduct, updateProduct, deleteProduct } = useProducts();
  const { orders, loading: ordersLoading } = useOrders();
  const { posts: blogPosts, loading: blogLoading, addBlogPost, updateBlogPost, deleteBlogPost } = useBlogPosts();
  const { settings, loading: settingsLoading, updateSettings } = useWebsiteSettings();

  // Payment Methods State
  const [paymentSettings, setPaymentSettings] = useState({
    dana: {
      enabled: false,
      number: '',
      name: '',
      instructions: ''
    },
    ovo: {
      enabled: false,
      number: '',
      name: '',
      instructions: ''
    },
    gopay: {
      enabled: false,
      number: '',
      name: '',
      instructions: ''
    },
    shopeepay: {
      enabled: false,
      number: '',
      name: '',
      instructions: ''
    },
    bankTransfer: {
      enabled: false,
      bankName: '',
      accountNumber: '',
      accountName: '',
      instructions: ''
    },
    qris: {
      enabled: false,
      qrImage: '',
      instructions: ''
    }
  });

  // Contact Settings State
  const [contactSettings, setContactSettings] = useState({
    contactEmail: '',
    contactPhone: '',
    whatsappNumber: '',
    address: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      youtube: '',
      tiktok: ''
    }
  });

  // Website Settings State
  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: '',
    siteDescription: '',
    primaryColor: '',
    secondaryColor: ''
  });

  // Welcome Popup Settings State
  const [welcomePopupSettings, setWelcomePopupSettings] = useState({
    enabled: false,
    title: '',
    message: '',
    buttonText: '',
    buttonLink: '',
    showDelay: 3,
    backgroundColor: '#ffffff',
    textColor: '#1f2937'
  });

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: 0,
    image: '',
    rating: 5,
    description: '',
    features: [''],
    variants: []
  });

  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Morgan Digital Team',
    image: '',
    category: '',
    published: true
  });

  // Load settings when component mounts
  useEffect(() => {
    if (settings) {
      // Load payment methods
      if (settings.paymentMethods) {
        setPaymentSettings(settings.paymentMethods);
      }

      // Load contact settings
      setContactSettings({
        contactEmail: settings.contactEmail || '',
        contactPhone: settings.contactPhone || '',
        whatsappNumber: settings.whatsappNumber || '',
        address: settings.address || '',
        socialMedia: settings.socialMedia || {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: '',
          youtube: '',
          tiktok: ''
        }
      });

      // Load website settings
      setWebsiteSettings({
        siteName: settings.siteName || '',
        siteDescription: settings.siteDescription || '',
        primaryColor: settings.primaryColor || '',
        secondaryColor: settings.secondaryColor || ''
      });

      // Load welcome popup settings
      if (settings.welcomePopup) {
        setWelcomePopupSettings(settings.welcomePopup);
      }
    }
  }, [settings]);

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    totalCustomers: new Set(orders.map(order => order.userId)).size
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['Aplikasi Premium', 'Desain Website', 'Source Code', 'Template Mobile', 'Plugin & Extension'];

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        ...newProduct,
        price: Number(newProduct.price),
        features: newProduct.features.filter(f => f.trim() !== '')
      });
      setNewProduct({
        name: '',
        category: '',
        price: 0,
        image: '',
        rating: 5,
        description: '',
        features: [''],
        variants: []
      });
      setShowAddProduct(false);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(editingProduct.id, {
        ...editingProduct,
        price: Number(editingProduct.price),
        features: editingProduct.features.filter(f => f.trim() !== '')
      });
      setEditingProduct(null);
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  const handleAddBlogPost = async (e) => {
    e.preventDefault();
    try {
      await addBlogPost({
        ...newBlogPost,
        date: new Date().toISOString()
      });
      setNewBlogPost({
        title: '',
        excerpt: '',
        content: '',
        author: 'Morgan Digital Team',
        image: '',
        category: '',
        published: true
      });
      setShowAddBlog(false);
      alert('Blog post added successfully!');
    } catch (error) {
      console.error('Error adding blog post:', error);
      alert('Error adding blog post');
    }
  };

  const handleUpdateBlogPost = async (e) => {
    e.preventDefault();
    try {
      await updateBlogPost(editingBlog.id, editingBlog);
      setEditingBlog(null);
      alert('Blog post updated successfully!');
    } catch (error) {
      console.error('Error updating blog post:', error);
      alert('Error updating blog post');
    }
  };

  const handleDeleteBlogPost = async (id) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlogPost(id);
        alert('Blog post deleted successfully!');
      } catch (error) {
        console.error('Error deleting blog post:', error);
        alert('Error deleting blog post');
      }
    }
  };

  const handleSavePaymentSettings = async () => {
    try {
      await updateSettings({
        paymentMethods: paymentSettings
      });
      alert('Payment settings saved successfully!');
    } catch (error) {
      console.error('Error saving payment settings:', error);
      alert('Error saving payment settings');
    }
  };

  const handleSaveContactSettings = async () => {
    try {
      await updateSettings(contactSettings);
      alert('Contact settings saved successfully!');
    } catch (error) {
      console.error('Error saving contact settings:', error);
      alert('Error saving contact settings');
    }
  };

  const handleSaveWebsiteSettings = async () => {
    try {
      await updateSettings(websiteSettings);
      alert('Website settings saved successfully!');
    } catch (error) {
      console.error('Error saving website settings:', error);
      alert('Error saving website settings');
    }
  };

  const handleSaveWelcomePopupSettings = async () => {
    try {
      await updateSettings({
        welcomePopup: welcomePopupSettings
      });
      alert('Welcome popup settings saved successfully!');
    } catch (error) {
      console.error('Error saving welcome popup settings:', error);
      alert('Error saving welcome popup settings');
    }
  };

  const addFeature = (setter, features) => {
    setter(prev => ({
      ...prev,
      features: [...features, '']
    }));
  };

  const updateFeature = (setter, features, index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setter(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const removeFeature = (setter, features, index) => {
    setter(prev => ({
      ...prev,
      features: features.filter((_, i) => i !== index)
    }));
  };

  if (productsLoading || ordersLoading || blogLoading || settingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">MD</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Welcome, Administrator
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
              { id: 'products', name: 'Products', icon: <Package className="w-5 h-5" /> },
              { id: 'orders', name: 'Orders', icon: <ShoppingCart className="w-5 h-5" /> },
              { id: 'blog', name: 'Blog', icon: <Edit className="w-5 h-5" /> },
              { id: 'payments', name: 'Payment Methods', icon: <CreditCard className="w-5 h-5" /> },
              { id: 'contact', name: 'Contact Settings', icon: <Phone className="w-5 h-5" /> },
              { id: 'website', name: 'Website Settings', icon: <Settings className="w-5 h-5" /> }
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
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                    <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProducts}</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl">
                    <ShoppingCart className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalOrders}</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
                    <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      Rp {stats.totalRevenue.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-2xl">
                    <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Customers</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCustomers}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Orders</h2>
              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            #{order.id.slice(-8)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {order.customerInfo.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            Rp {order.total.toLocaleString('id-ID')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="badge badge-warning">
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(order.date).toLocaleDateString('id-ID')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No orders yet</p>
              )}
            </div>
          </div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === 'payments' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Methods</h2>
              <button
                onClick={handleSavePaymentSettings}
                className="btn-primary flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* DANA */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Wallet className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">DANA</h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentSettings.dana.enabled}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        dana: { ...prev.dana, enabled: e.target.checked }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nomor DANA
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.dana.number}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        dana: { ...prev.dana, number: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="081234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Pemilik
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.dana.name}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        dana: { ...prev.dana, name: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="Morgan Digital"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Instruksi Pembayaran
                    </label>
                    <textarea
                      value={paymentSettings.dana.instructions}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        dana: { ...prev.dana, instructions: e.target.value }
                      }))}
                      className="input-field"
                      rows={3}
                      placeholder="Transfer ke nomor DANA di atas, lalu kirim bukti transfer via WhatsApp"
                    />
                  </div>
                </div>
              </div>

              {/* OVO */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Smartphone className="w-6 h-6 text-purple-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">OVO</h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentSettings.ovo.enabled}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        ovo: { ...prev.ovo, enabled: e.target.checked }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nomor OVO
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.ovo.number}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        ovo: { ...prev.ovo, number: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="081234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Pemilik
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.ovo.name}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        ovo: { ...prev.ovo, name: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="Morgan Digital"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Instruksi Pembayaran
                    </label>
                    <textarea
                      value={paymentSettings.ovo.instructions}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        ovo: { ...prev.ovo, instructions: e.target.value }
                      }))}
                      className="input-field"
                      rows={3}
                      placeholder="Transfer ke nomor OVO di atas, lalu kirim bukti transfer via WhatsApp"
                    />
                  </div>
                </div>
              </div>

              {/* GoPay */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Smartphone className="w-6 h-6 text-green-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">GoPay</h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentSettings.gopay.enabled}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        gopay: { ...prev.gopay, enabled: e.target.checked }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nomor GoPay
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.gopay.number}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        gopay: { ...prev.gopay, number: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="081234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Pemilik
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.gopay.name}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        gopay: { ...prev.gopay, name: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="Morgan Digital"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Instruksi Pembayaran
                    </label>
                    <textarea
                      value={paymentSettings.gopay.instructions}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        gopay: { ...prev.gopay, instructions: e.target.value }
                      }))}
                      className="input-field"
                      rows={3}
                      placeholder="Transfer ke nomor GoPay di atas, lalu kirim bukti transfer via WhatsApp"
                    />
                  </div>
                </div>
              </div>

              {/* ShopeePay */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Banknote className="w-6 h-6 text-orange-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">ShopeePay</h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentSettings.shopeepay.enabled}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        shopeepay: { ...prev.shopeepay, enabled: e.target.checked }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nomor ShopeePay
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.shopeepay.number}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        shopeepay: { ...prev.shopeepay, number: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="081234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Pemilik
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.shopeepay.name}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        shopeepay: { ...prev.shopeepay, name: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="Morgan Digital"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Instruksi Pembayaran
                    </label>
                    <textarea
                      value={paymentSettings.shopeepay.instructions}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        shopeepay: { ...prev.shopeepay, instructions: e.target.value }
                      }))}
                      className="input-field"
                      rows={3}
                      placeholder="Transfer ke nomor ShopeePay di atas, lalu kirim bukti transfer via WhatsApp"
                    />
                  </div>
                </div>
              </div>

              {/* Bank Transfer */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Building className="w-6 h-6 text-blue-800 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bank Transfer</h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentSettings.bankTransfer.enabled}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        bankTransfer: { ...prev.bankTransfer, enabled: e.target.checked }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Bank
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.bankTransfer.bankName}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        bankTransfer: { ...prev.bankTransfer, bankName: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="Bank BCA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nomor Rekening
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.bankTransfer.accountNumber}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        bankTransfer: { ...prev.bankTransfer, accountNumber: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="1234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Pemilik Rekening
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.bankTransfer.accountName}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        bankTransfer: { ...prev.bankTransfer, accountName: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="Morgan Digital"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Instruksi Pembayaran
                    </label>
                    <textarea
                      value={paymentSettings.bankTransfer.instructions}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        bankTransfer: { ...prev.bankTransfer, instructions: e.target.value }
                      }))}
                      className="input-field"
                      rows={3}
                      placeholder="Transfer ke rekening di atas, lalu kirim bukti transfer via WhatsApp"
                    />
                  </div>
                </div>
              </div>

              {/* QRIS */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <QrCode className="w-6 h-6 text-indigo-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">QRIS</h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentSettings.qris.enabled}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        qris: { ...prev.qris, enabled: e.target.checked }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      QR Code Image URL
                    </label>
                    <input
                      type="url"
                      value={paymentSettings.qris.qrImage}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        qris: { ...prev.qris, qrImage: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="https://example.com/qr-code.png"
                    />
                  </div>
                  {paymentSettings.qris.qrImage && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preview
                      </label>
                      <img 
                        src={paymentSettings.qris.qrImage} 
                        alt="QR Code Preview" 
                        className="w-32 h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Instruksi Pembayaran
                    </label>
                    <textarea
                      value={paymentSettings.qris.instructions}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        qris: { ...prev.qris, instructions: e.target.value }
                      }))}
                      className="input-field"
                      rows={3}
                      placeholder="Scan QR Code di atas untuk pembayaran, lalu kirim bukti transfer via WhatsApp"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Settings Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Settings</h2>
              <button
                onClick={handleSaveContactSettings}
                className="btn-primary flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Contact Info */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Basic Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Kontak
                    </label>
                    <input
                      type="email"
                      value={contactSettings.contactEmail}
                      onChange={(e) => setContactSettings(prev => ({
                        ...prev,
                        contactEmail: e.target.value
                      }))}
                      className="input-field"
                      placeholder="info@morgandigital.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      value={contactSettings.contactPhone}
                      onChange={(e) => setContactSettings(prev => ({
                        ...prev,
                        contactPhone: e.target.value
                      }))}
                      className="input-field"
                      placeholder="+62 812-3456-7890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nomor WhatsApp Seller
                    </label>
                    <input
                      type="tel"
                      value={contactSettings.whatsappNumber}
                      onChange={(e) => setContactSettings(prev => ({
                        ...prev,
                        whatsappNumber: e.target.value
                      }))}
                      className="input-field"
                      placeholder="6281234567890"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Format: 6281234567890 (tanpa tanda + dan spasi)
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Alamat
                    </label>
                    <textarea
                      value={contactSettings.address}
                      onChange={(e) => setContactSettings(prev => ({
                        ...prev,
                        address: e.target.value
                      }))}
                      className="input-field"
                      rows={3}
                      placeholder="Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta, Indonesia 10220"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Social Media Links
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                      Facebook
                    </label>
                    <input
                      type="url"
                      value={contactSettings.socialMedia.facebook}
                      onChange={(e) => setContactSettings(prev => ({
                        ...prev,
                        socialMedia: { ...prev.socialMedia, facebook: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="https://facebook.com/morgandigital"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                      Twitter
                    </label>
                    <input
                      type="url"
                      value={contactSettings.socialMedia.twitter}
                      onChange={(e) => setContactSettings(prev => ({
                        ...prev,
                        socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="https://twitter.com/morgandigital"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <Instagram className="w-4 h-4 mr-2 text-pink-600" />
                      Instagram
                    </label>
                    <input
                      type="url"
                      value={contactSettings.socialMedia.instagram}
                      onChange={(e) => setContactSettings(prev => ({
                        ...prev,
                        socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="https://instagram.com/morgandigital"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={contactSettings.socialMedia.linkedin}
                      onChange={(e) => setContactSettings(prev => ({
                        ...prev,
                        socialMedia: { ...prev.socialMedia, linkedin: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="https://linkedin.com/company/morgandigital"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <Youtube className="w-4 h-4 mr-2 text-red-600" />
                      YouTube
                    </label>
                    <input
                      type="url"
                      value={contactSettings.socialMedia.youtube}
                      onChange={(e) => setContactSettings(prev => ({
                        ...prev,
                        socialMedia: { ...prev.socialMedia, youtube: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="https://youtube.com/channel/morgandigital"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      TikTok
                    </label>
                    <input
                      type="url"
                      value={contactSettings.socialMedia.tiktok}
                      onChange={(e) => setContactSettings(prev => ({
                        ...prev,
                        socialMedia: { ...prev.socialMedia, tiktok: e.target.value }
                      }))}
                      className="input-field"
                      placeholder="https://tiktok.com/@morgandigital"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Website Settings Tab */}
        {activeTab === 'website' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Website Settings</h2>
              <button
                onClick={handleSaveWebsiteSettings}
                className="btn-primary flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Website Info */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Basic Website Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={websiteSettings.siteName}
                      onChange={(e) => setWebsiteSettings(prev => ({
                        ...prev,
                        siteName: e.target.value
                      }))}
                      className="input-field"
                      placeholder="Morgan Digital"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Site Description
                    </label>
                    <textarea
                      value={websiteSettings.siteDescription}
                      onChange={(e) => setWebsiteSettings(prev => ({
                        ...prev,
                        siteDescription: e.target.value
                      }))}
                      className="input-field"
                      rows={3}
                      placeholder="Premium Digital Products for Your Business"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Primary Color
                    </label>
                    <input
                      type="color"
                      value={websiteSettings.primaryColor}
                      onChange={(e) => setWebsiteSettings(prev => ({
                        ...prev,
                        primaryColor: e.target.value
                      }))}
                      className="w-full h-12 rounded-lg border border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Secondary Color
                    </label>
                    <input
                      type="color"
                      value={websiteSettings.secondaryColor}
                      onChange={(e) => setWebsiteSettings(prev => ({
                        ...prev,
                        secondaryColor: e.target.value
                      }))}
                      className="w-full h-12 rounded-lg border border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Welcome Popup Settings */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Welcome Popup
                  </h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={welcomePopupSettings.enabled}
                      onChange={(e) => setWelcomePopupSettings(prev => ({
                        ...prev,
                        enabled: e.target.checked
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={welcomePopupSettings.title}
                      onChange={(e) => setWelcomePopupSettings(prev => ({
                        ...prev,
                        title: e.target.value
                      }))}
                      className="input-field"
                      placeholder="🎉 Selamat Datang di Morgan Digital!"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      value={welcomePopupSettings.message}
                      onChange={(e) => setWelcomePopupSettings(prev => ({
                        ...prev,
                        message: e.target.value
                      }))}
                      className="input-field"
                      rows={3}
                      placeholder="Dapatkan diskon hingga 50% untuk semua produk digital premium kami..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={welcomePopupSettings.buttonText}
                      onChange={(e) => setWelcomePopupSettings(prev => ({
                        ...prev,
                        buttonText: e.target.value
                      }))}
                      className="input-field"
                      placeholder="Lihat Penawaran"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Button Link
                    </label>
                    <input
                      type="text"
                      value={welcomePopupSettings.buttonLink}
                      onChange={(e) => setWelcomePopupSettings(prev => ({
                        ...prev,
                        buttonLink: e.target.value
                      }))}
                      className="input-field"
                      placeholder="/products"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Show Delay (seconds)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={welcomePopupSettings.showDelay}
                      onChange={(e) => setWelcomePopupSettings(prev => ({
                        ...prev,
                        showDelay: parseInt(e.target.value)
                      }))}
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={handleSaveWelcomePopupSettings}
                    className="btn-secondary w-full"
                  >
                    Save Popup Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Products Management</h2>
              <button
                onClick={() => setShowAddProduct(true)}
                className="btn-primary flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </button>
            </div>

            {/* Filters */}
            <div className="card p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    All
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="card overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="badge badge-primary">{product.category}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Orders Management</h2>
            
            {orders.length > 0 ? (
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Items
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Payment Method
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            #{order.id.slice(-8)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {order.customerInfo.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {order.customerInfo.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {order.items.length} items
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            Rp {order.total.toLocaleString('id-ID')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {order.customerInfo.paymentMethod}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="badge badge-warning">
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(order.date).toLocaleDateString('id-ID')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No orders yet</h3>
                <p className="text-gray-600 dark:text-gray-400">Orders will appear here when customers make purchases</p>
              </div>
            )}
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Management</h2>
              <button
                onClick={() => setShowAddBlog(true)}
                className="btn-primary flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Blog Post
              </button>
            </div>

            {/* Blog Posts List */}
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div key={post.id} className="card p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="badge badge-primary mr-2">{post.category}</span>
                        {post.published && <span className="badge badge-success">Published</span>}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>By {post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(post.date).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => setEditingBlog(post)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBlogPost(post.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {blogPosts.length === 0 && (
              <div className="text-center py-12">
                <Edit className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No blog posts yet</h3>
                <p className="text-gray-600 dark:text-gray-400">Create your first blog post to get started</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Product</h3>
                <button
                  onClick={() => setShowAddProduct(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="input-field"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    required
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: parseInt(e.target.value)})}
                    className="input-field"
                    placeholder="Enter price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    className="input-field"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    required
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="input-field"
                    rows={3}
                    placeholder="Enter product description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Features
                  </label>
                  {newProduct.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(setNewProduct, newProduct.features, index, e.target.value)}
                        className="input-field flex-1"
                        placeholder="Enter feature"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(setNewProduct, newProduct.features, index)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addFeature(setNewProduct, newProduct.features)}
                    className="btn-secondary text-sm"
                  >
                    Add Feature
                  </button>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddProduct(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary flex-1">
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Product</h3>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    required
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    className="input-field"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: parseInt(e.target.value)})}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    required
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                    className="input-field"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Features
                  </label>
                  {editingProduct.features?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(setEditingProduct, editingProduct.features, index, e.target.value)}
                        className="input-field flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(setEditingProduct, editingProduct.features, index)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addFeature(setEditingProduct, editingProduct.features || [])}
                    className="btn-secondary text-sm"
                  >
                    Add Feature
                  </button>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary flex-1">
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Blog Post Modal */}
      {showAddBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Blog Post</h3>
                <button
                  onClick={() => setShowAddBlog(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddBlogPost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newBlogPost.title}
                    onChange={(e) => setNewBlogPost({...newBlogPost, title: e.target.value})}
                    className="input-field"
                    placeholder="Enter blog post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={newBlogPost.category}
                    onChange={(e) => setNewBlogPost({...newBlogPost, category: e.target.value})}
                    className="input-field"
                    placeholder="e.g., Technology, Tutorial, Tips"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    required
                    value={newBlogPost.excerpt}
                    onChange={(e) => setNewBlogPost({...newBlogPost, excerpt: e.target.value})}
                    className="input-field"
                    rows={2}
                    placeholder="Brief description of the blog post"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content
                  </label>
                  <textarea
                    required
                    value={newBlogPost.content}
                    onChange={(e) => setNewBlogPost({...newBlogPost, content: e.target.value})}
                    className="input-field"
                    rows={6}
                    placeholder="Write your blog post content here..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={newBlogPost.image}
                    onChange={(e) => setNewBlogPost({...newBlogPost, image: e.target.value})}
                    className="input-field"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    required
                    value={newBlogPost.author}
                    onChange={(e) => setNewBlogPost({...newBlogPost, author: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    checked={newBlogPost.published}
                    onChange={(e) => setNewBlogPost({...newBlogPost, published: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="published" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Publish immediately
                  </label>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddBlog(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary flex-1">
                    Add Blog Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Blog Post Modal */}
      {editingBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Blog Post</h3>
                <button
                  onClick={() => setEditingBlog(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateBlogPost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBlog.title}
                    onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBlog.category}
                    onChange={(e) => setEditingBlog({...editingBlog, category: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    required
                    value={editingBlog.excerpt}
                    onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                    className="input-field"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content
                  </label>
                  <textarea
                    required
                    value={editingBlog.content}
                    onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                    className="input-field"
                    rows={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={editingBlog.image}
                    onChange={(e) => setEditingBlog({...editingBlog, image: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBlog.author}
                    onChange={(e) => setEditingBlog({...editingBlog, author: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="editPublished"
                    checked={editingBlog.published}
                    onChange={(e) => setEditingBlog({...editingBlog, published: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="editPublished" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Published
                  </label>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingBlog(null)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary flex-1">
                    Update Blog Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;