import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Grid, List, ShoppingBag, Plus, Package, Sparkles } from 'lucide-react';
import { useProducts } from '../hooks/useFirestore';
import { useAuth } from '../contexts/AuthContext';

const Products = () => {
  const { products, loading, error } = useProducts();
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = ['all', 'Aplikasi Premium', 'Desain Website', 'Source Code', 'Template Mobile', 'Plugin & Extension'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Error loading products
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-lg border border-white/20">
              <Package className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Premium Digital Products
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Temukan koleksi lengkap produk digital berkualitas tinggi untuk mengembangkan bisnis Anda
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>

            {/* View Mode & Admin Actions */}
            <div className="flex items-center space-x-2">
              {isAdmin && (
                <Link to="/admin" className="btn-primary flex items-center text-sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Product
                </Link>
              )}
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl">
                <ShoppingBag className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            
            {products.length === 0 ? (
              <>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Produk Segera Hadir!
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Produk digital premium sedang dalam persiapan. Silakan kembali lagi nanti atau hubungi kami untuk informasi lebih lanjut.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact" className="btn-primary">
                    Hubungi Kami
                  </Link>
                  <Link to="/blog" className="btn-secondary">
                    Baca Blog
                  </Link>
                </div>
                
                {isAdmin && (
                  <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl max-w-md mx-auto">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      Admin Panel
                    </h3>
                    <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
                      Anda dapat menambahkan produk melalui admin dashboard
                    </p>
                    <Link to="/admin" className="btn-primary text-sm">
                      Go to Admin Dashboard
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              {searchTerm && (
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Search results for "{searchTerm}"
                </p>
              )}
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <div key={product.id} className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${
                  viewMode === 'list' ? 'flex items-center p-6' : ''
                }`}>
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0 mr-6' : ''}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
                        viewMode === 'list' ? 'w-full h-full rounded-xl' : 'w-full h-48'
                      }`}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white shadow-lg">
                        {product.category}
                      </span>
                    </div>
                    {viewMode === 'grid' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </div>
                  
                  <div className={viewMode === 'list' ? 'flex-1' : 'p-6'}>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {product.rating}
                      </span>
                    </div>
                    
                    <h3 className={`font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 ${
                      viewMode === 'list' ? 'text-xl' : 'text-lg'
                    }`}>
                      {product.name}
                    </h3>
                    
                    <p className={`text-gray-600 dark:text-gray-400 mb-4 ${
                      viewMode === 'list' ? 'line-clamp-2' : 'line-clamp-2'
                    }`}>
                      {product.description}
                    </p>
                    
                    <div className={`flex items-center ${viewMode === 'list' ? 'justify-between' : 'justify-between'}`}>
                      <span className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${
                        viewMode === 'list' ? 'text-2xl' : 'text-xl'
                      }`}>
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                      <Link 
                        to={`/product/${product.id}`}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;