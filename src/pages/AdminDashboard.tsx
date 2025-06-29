import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Settings,
  FileText,
  DollarSign,
  TrendingUp,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Save,
  X,
  Check,
  AlertTriangle,
  Star,
  Image as ImageIcon,
  Smartphone,
  Building,
  QrCode,
  Wallet,
  Banknote,
  CreditCard
} from 'lucide-react';
import { useProducts, useOrders, useBlogPosts, type ProductVariant } from '../hooks/useFirestore';
import { useWebsiteSettings, useInventorySettings } from '../hooks/useSettings';

// Define proper form data types
interface ProductFormData {
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  features: string[];
  variants: ProductVariant[];
  inventory: {
    stock: number;
    sold: number;
    status: 'active' | 'inactive' | 'draft' | 'archived';
  };
}

interface PaymentMethodSettings {
  dana: {
    enabled: boolean;
    number: string;
    name: string;
    instructions: string;
    image: string;
  };
  ovo: {
    enabled: boolean;
    number: string;
    name: string;
    instructions: string;
    image: string;
  };
  gopay: {
    enabled: boolean;
    number: string;
    name: string;
    instructions: string;
    image: string;
  };
  shopeepay: {
    enabled: boolean;
    number: string;
    name: string;
    instructions: string;
    image: string;
  };
  bankTransfer: {
    enabled: boolean;
    bankName: string;
    accountNumber: string;
    accountName: string;
    instructions: string;
    image: string;
  };
  qris: {
    enabled: boolean;
    qrImage: string;
    instructions: string;
    image: string;
  };
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { products, loading: productsLoading, addProduct, updateProduct, deleteProduct } = useProducts();
  const { orders, loading: ordersLoading } = useOrders();
  const { posts: blogPosts } = useBlogPosts();
  const { settings, updateSettings } = useWebsiteSettings();
  const { settings: inventorySettings } = useInventorySettings();

  // Product form state with proper typing
  const [productForm, setProductForm] = useState<ProductFormData>({
    name: '',
    category: '',
    price: 0,
    image: '',
    rating: 5,
    description: '',
    features: [''],
    variants: [],
    inventory: {
      stock: 0,
      sold: 0,
      status: 'active' as const
    }
  });

  // Payment settings state with proper typing
  const [paymentSettings, setPaymentSettings] = useState<PaymentMethodSettings>({
    dana: {
      enabled: false,
      number: '',
      name: '',
      instructions: '',
      image: ''
    },
    ovo: {
      enabled: false,
      number: '',
      name: '',
      instructions: '',
      image: ''
    },
    gopay: {
      enabled: false,
      number: '',
      name: '',
      instructions: '',
      image: ''
    },
    shopeepay: {
      enabled: false,
      number: '',
      name: '',
      instructions: '',
      image: ''
    },
    bankTransfer: {
      enabled: false,
      bankName: '',
      accountNumber: '',
      accountName: '',
      instructions: '',
      image: ''
    },
    qris: {
      enabled: false,
      qrImage: '',
      instructions: '',
      image: ''
    }
  });

  // Load payment settings when component mounts
  useEffect(() => {
    if (settings?.paymentMethods) {
      setPaymentSettings({
        dana: {
          enabled: settings.paymentMethods.dana?.enabled || false,
          number: settings.paymentMethods.dana?.number || '',
          name: settings.paymentMethods.dana?.name || '',
          instructions: settings.paymentMethods.dana?.instructions || '',
          image: settings.paymentMethods.dana?.image || ''
        },
        ovo: {
          enabled: settings.paymentMethods.ovo?.enabled || false,
          number: settings.paymentMethods.ovo?.number || '',
          name: settings.paymentMethods.ovo?.name || '',
          instructions: settings.paymentMethods.ovo?.instructions || '',
          image: settings.paymentMethods.ovo?.image || ''
        },
        gopay: {
          enabled: settings.paymentMethods.gopay?.enabled || false,
          number: settings.paymentMethods.gopay?.number || '',
          name: settings.paymentMethods.gopay?.name || '',
          instructions: settings.paymentMethods.gopay?.instructions || '',
          image: settings.paymentMethods.gopay?.image || ''
        },
        shopeepay: {
          enabled: settings.paymentMethods.shopeepay?.enabled || false,
          number: settings.paymentMethods.shopeepay?.number || '',
          name: settings.paymentMethods.shopeepay?.name || '',
          instructions: settings.paymentMethods.shopeepay?.instructions || '',
          image: settings.paymentMethods.shopeepay?.image || ''
        },
        bankTransfer: {
          enabled: settings.paymentMethods.bankTransfer?.enabled || false,
          bankName: settings.paymentMethods.bankTransfer?.bankName || '',
          accountNumber: settings.paymentMethods.bankTransfer?.accountNumber || '',
          accountName: settings.paymentMethods.bankTransfer?.accountName || '',
          instructions: settings.paymentMethods.bankTransfer?.instructions || '',
          image: settings.paymentMethods.bankTransfer?.image || ''
        },
        qris: {
          enabled: settings.paymentMethods.qris?.enabled || false,
          qrImage: settings.paymentMethods.qris?.qrImage || '',
          instructions: settings.paymentMethods.qris?.instructions || '',
          image: settings.paymentMethods.qris?.image || ''
        }
      });
    }
  }, [settings]);

  const resetProductForm = () => {
    setProductForm({
      name: '',
      category: '',
      price: 0,
      image: '',
      rating: 5,
      description: '',
      features: [''],
      variants: [],
      inventory: {
        stock: 0,
        sold: 0,
        status: 'active' as const
      }
    });
    setEditingProduct(null);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct, productForm);
      } else {
        await addProduct(productForm);
      }
      setShowProductForm(false);
      resetProductForm();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    }
  };

  const handleEditProduct = (product: any) => {
    setProductForm({
      name: product.name || '',
      category: product.category || '',
      price: product.price || 0,
      image: product.image || '',
      rating: product.rating || 5,
      description: product.description || '',
      features: product.features || [''],
      variants: product.variants || [],
      inventory: {
        stock: product.inventory?.stock || 0,
        sold: product.inventory?.sold || 0,
        status: product.inventory?.status || 'active' as const
      }
    });
    setEditingProduct(product.id);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  const addFeature = () => {
    setProductForm(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setProductForm(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const removeFeature = (index: number) => {
    setProductForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: Date.now().toString(),
      name: '',
      price: 0,
      description: '',
      duration: '',
      accountType: '',
      features: [],
      isPopular: false
    };
    setProductForm(prev => ({
      ...prev,
      variants: [...prev.variants, newVariant]
    }));
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: any) => {
    setProductForm(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) => 
        i === index ? { ...variant, [field]: value } : variant
      )
    }));
  };

  const removeVariant = (index: number) => {
    setProductForm(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleInventoryStatusChange = (status: 'active' | 'inactive' | 'draft' | 'archived') => {
    setProductForm(prev => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        status: status
      }
    }));
  };

  const savePaymentSettings = async () => {
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

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = inventorySettings?.categories || ['Aplikasi Premium', 'Desain Website', 'Source Code'];
  const statuses = inventorySettings?.statuses || [
    { value: 'active', label: 'Aktif', color: 'green' },
    { value: 'inactive', label: 'Tidak Aktif', color: 'red' },
    { value: 'draft', label: 'Draft', color: 'yellow' },
    { value: 'archived', label: 'Arsip', color: 'gray' }
  ];

  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalCustomers = new Set(orders.map(order => order.userId)).size;

  if (productsLoading || ordersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your digital products store
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
              { id: 'products', name: 'Products', icon: <Package className="w-5 h-5" /> },
              { id: 'orders', name: 'Orders', icon: <ShoppingCart className="w-5 h-5" /> },
              { id: 'blog', name: 'Blog', icon: <FileText className="w-5 h-5" /> },
              { id: 'payments', name: 'Payment Methods', icon: <CreditCard className="w-5 h-5" /> },
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
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl">
                    <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      Rp {totalRevenue.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                    <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalProducts}</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
                    <ShoppingCart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalOrders}</p>
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
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCustomers}</p>
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
                            {order.customerInfo?.name || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            Rp {order.total.toLocaleString('id-ID')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
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
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No orders yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Products Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Products Management</h2>
              <button
                onClick={() => setShowProductForm(true)}
                className="btn-primary flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </button>
            </div>

            {/* Filters */}
            <div className="card p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products List */}
            <div className="card p-6">
              {filteredProducts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredProducts.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img className="h-10 w-10 rounded-lg object-cover" src={product.image} alt={product.name} />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {product.variants?.length || 0} variants
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            Rp {product.price.toLocaleString('id-ID')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {product.inventory?.stock || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              product.inventory?.status === 'active' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : product.inventory?.status === 'inactive'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                : product.inventory?.status === 'draft'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                            }`}>
                              {statuses.find(s => s.value === product.inventory?.status)?.label || 'Unknown'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {products.length === 0 ? 'Get started by adding your first product.' : 'Try adjusting your search or filter criteria.'}
                  </p>
                  <button
                    onClick={() => setShowProductForm(true)}
                    className="btn-primary"
                  >
                    Add Product
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Methods</h2>
              <button
                onClick={savePaymentSettings}
                className="btn-primary flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                {paymentSettings.dana.enabled && (
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
                        Nama Akun
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Logo URL (Opsional)
                      </label>
                      <input
                        type="url"
                        value={paymentSettings.dana.image}
                        onChange={(e) => setPaymentSettings(prev => ({
                          ...prev,
                          dana: { ...prev.dana, image: e.target.value }
                        }))}
                        className="input-field"
                        placeholder="https://example.com/dana-logo.png"
                      />
                    </div>
                  </div>
                )}
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
                {paymentSettings.ovo.enabled && (
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
                        Nama Akun
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Logo URL (Opsional)
                      </label>
                      <input
                        type="url"
                        value={paymentSettings.ovo.image}
                        onChange={(e) => setPaymentSettings(prev => ({
                          ...prev,
                          ovo: { ...prev.ovo, image: e.target.value }
                        }))}
                        className="input-field"
                        placeholder="https://example.com/ovo-logo.png"
                      />
                    </div>
                  </div>
                )}
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
                {paymentSettings.gopay.enabled && (
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
                        Nama Akun
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Logo URL (Opsional)
                      </label>
                      <input
                        type="url"
                        value={paymentSettings.gopay.image}
                        onChange={(e) => setPaymentSettings(prev => ({
                          ...prev,
                          gopay: { ...prev.gopay, image: e.target.value }
                        }))}
                        className="input-field"
                        placeholder="https://example.com/gopay-logo.png"
                      />
                    </div>
                  </div>
                )}
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
                {paymentSettings.shopeepay.enabled && (
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
                        Nama Akun
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Logo URL (Opsional)
                      </label>
                      <input
                        type="url"
                        value={paymentSettings.shopeepay.image}
                        onChange={(e) => setPaymentSettings(prev => ({
                          ...prev,
                          shopeepay: { ...prev.shopeepay, image: e.target.value }
                        }))}
                        className="input-field"
                        placeholder="https://example.com/shopeepay-logo.png"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Bank Transfer */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Building className="w-6 h-6 text-blue-600 mr-3" />
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
                {paymentSettings.bankTransfer.enabled && (
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Logo Bank URL (Opsional)
                      </label>
                      <input
                        type="url"
                        value={paymentSettings.bankTransfer.image}
                        onChange={(e) => setPaymentSettings(prev => ({
                          ...prev,
                          bankTransfer: { ...prev.bankTransfer, image: e.target.value }
                        }))}
                        className="input-field"
                        placeholder="https://example.com/bank-logo.png"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* QRIS */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <QrCode className="w-6 h-6 text-gray-600 mr-3" />
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
                {paymentSettings.qris.enabled && (
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
                        placeholder="https://example.com/qris-code.png"
                      />
                    </div>
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Logo URL (Opsional)
                      </label>
                      <input
                        type="url"
                        value={paymentSettings.qris.image}
                        onChange={(e) => setPaymentSettings(prev => ({
                          ...prev,
                          qris: { ...prev.qris, image: e.target.value }
                        }))}
                        className="input-field"
                        placeholder="https://example.com/qris-logo.png"
                      />
                    </div>
                    {paymentSettings.qris.qrImage && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Preview QR Code
                        </label>
                        <img 
                          src={paymentSettings.qris.qrImage} 
                          alt="QR Code Preview" 
                          className="w-32 h-32 object-contain border border-gray-300 dark:border-gray-600 rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Orders Management</h2>
            
            <div className="card p-6">
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
                          Items
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
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
                                {order.customerInfo?.name || 'N/A'}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {order.customerInfo?.email || 'N/A'}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {order.items?.length || 0} items
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            Rp {order.total.toLocaleString('id-ID')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(order.date).toLocaleDateString('id-ID')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No orders yet</h3>
                  <p className="text-gray-600 dark:text-gray-400">Orders will appear here when customers make purchases.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Management</h2>
              <button className="btn-primary flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Post
              </button>
            </div>
            
            <div className="card p-6">
              {blogPosts.length > 0 ? (
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img src={post.image} alt={post.title} className="w-16 h-16 object-cover rounded-lg" />
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{post.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{post.category} • {post.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No blog posts yet</h3>
                  <p className="text-gray-600 dark:text-gray-400">Create your first blog post to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Website Settings</h2>
            
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">General Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings?.siteName || ''}
                    className="input-field"
                    placeholder="Morgan Digital"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Description
                  </label>
                  <textarea
                    value={settings?.siteDescription || ''}
                    className="input-field"
                    rows={3}
                    placeholder="Premium Digital Products for Your Business"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings?.contactEmail || ''}
                    className="input-field"
                    placeholder="info@morgandigital.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={settings?.whatsappNumber || ''}
                    className="input-field"
                    placeholder="6281234567890"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={() => {
                    setShowProductForm(false);
                    resetProductForm();
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                      className="input-field"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={productForm.category}
                      onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                      className="input-field"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={productForm.price}
                      onChange={(e) => setProductForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className="input-field"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rating
                    </label>
                    <select
                      value={productForm.rating}
                      onChange={(e) => setProductForm(prev => ({ ...prev, rating: Number(e.target.value) }))}
                      className="input-field"
                    >
                      {[1, 2, 3, 4, 5].map(rating => (
                        <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={productForm.image}
                    onChange={(e) => setProductForm(prev => ({ ...prev, image: e.target.value }))}
                    className="input-field"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    value={productForm.description}
                    onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                    className="input-field"
                    rows={4}
                    placeholder="Enter product description"
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Features
                  </label>
                  <div className="space-y-2">
                    {productForm.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          className="input-field flex-1"
                          placeholder="Enter feature"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFeature}
                      className="btn-secondary text-sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Feature
                    </button>
                  </div>
                </div>

                {/* Variants */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Variants
                  </label>
                  <div className="space-y-4">
                    {productForm.variants.map((variant, index) => (
                      <div key={variant.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-gray-900 dark:text-white">Variant {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeVariant(index)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Variant Name
                            </label>
                            <input
                              type="text"
                              value={variant.name}
                              onChange={(e) => updateVariant(index, 'name', e.target.value)}
                              className="input-field"
                              placeholder="e.g., Basic Plan"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Price
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={variant.price}
                              onChange={(e) => updateVariant(index, 'price', Number(e.target.value))}
                              className="input-field"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Duration (Optional)
                            </label>
                            <select
                              value={variant.duration || ''}
                              onChange={(e) => updateVariant(index, 'duration', e.target.value)}
                              className="input-field"
                            >
                              <option value="">Select duration</option>
                              <option value="1-month">1 Month</option>
                              <option value="6-months">6 Months</option>
                              <option value="1-year">1 Year</option>
                              <option value="lifetime">Lifetime</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Account Type (Optional)
                            </label>
                            <select
                              value={variant.accountType || ''}
                              onChange={(e) => updateVariant(index, 'accountType', e.target.value)}
                              className="input-field"
                            >
                              <option value="">Select account type</option>
                              <option value="personal">Personal</option>
                              <option value="business">Business</option>
                              <option value="enterprise">Enterprise</option>
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Description
                            </label>
                            <textarea
                              value={variant.description}
                              onChange={(e) => updateVariant(index, 'description', e.target.value)}
                              className="input-field"
                              rows={2}
                              placeholder="Variant description"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={variant.isPopular || false}
                                onChange={(e) => updateVariant(index, 'isPopular', e.target.checked)}
                                className="mr-2"
                              />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Mark as Popular
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addVariant}
                      className="btn-secondary text-sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Variant
                    </button>
                  </div>
                </div>

                {/* Inventory */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Inventory
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Stock
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={productForm.inventory.stock}
                        onChange={(e) => setProductForm(prev => ({
                          ...prev,
                          inventory: { ...prev.inventory, stock: Number(e.target.value) }
                        }))}
                        className="input-field"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Sold
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={productForm.inventory.sold}
                        onChange={(e) => setProductForm(prev => ({
                          ...prev,
                          inventory: { ...prev.inventory, sold: Number(e.target.value) }
                        }))}
                        className="input-field"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                      </label>
                      <select
                        value={productForm.inventory.status}
                        onChange={(e) => handleInventoryStatusChange(e.target.value as 'active' | 'inactive' | 'draft' | 'archived')}
                        className="input-field"
                      >
                        {statuses.map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => {
                      setShowProductForm(false);
                      resetProductForm();
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
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