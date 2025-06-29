import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Download, Shield, Sparkles, Zap, Award, Calendar, User, Heart, MessageCircle, ShoppingBag, Rocket, Globe, Code, Palette } from 'lucide-react';
import { useProducts, useBlogPosts } from '../hooks/useFirestore';

const Home = () => {
  const { products, loading } = useProducts();
  const { posts: blogPosts, loading: blogLoading } = useBlogPosts();

  const features = [
    {
      icon: <Award className="w-8 h-8 text-yellow-400" />,
      title: "Premium Quality",
      description: "Produk digital berkualitas tinggi yang telah teruji dan terpercaya",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: "Customer Support",
      description: "Tim support yang siap membantu Anda 24/7",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Zap className="w-8 h-8 text-green-400" />,
      title: "Instant Download",
      description: "Download langsung setelah pembelian tanpa menunggu",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-400" />,
      title: "Secure Payment",
      description: "Sistem pembayaran yang aman dan terpercaya",
      gradient: "from-purple-400 to-pink-500"
    }
  ];

  const categories = [
    {
      icon: <Code className="w-12 h-12 text-blue-400" />,
      title: "Source Code",
      description: "Kode sumber aplikasi siap pakai",
      count: "50+",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Palette className="w-12 h-12 text-pink-400" />,
      title: "Design Templates",
      description: "Template desain modern dan elegan",
      count: "100+",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      icon: <Globe className="w-12 h-12 text-green-400" />,
      title: "Web Applications",
      description: "Aplikasi web lengkap dan fungsional",
      count: "30+",
      gradient: "from-green-500 to-teal-600"
    },
    {
      icon: <Rocket className="w-12 h-12 text-purple-400" />,
      title: "Mobile Apps",
      description: "Aplikasi mobile cross-platform",
      count: "25+",
      gradient: "from-purple-500 to-violet-600"
    }
  ];

  // Show featured products (first 3)
  const featuredProducts = products.slice(0, 3);
  
  // Get latest 2 blog posts
  const latestBlogPosts = blogPosts.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-in">
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-white/10 rounded-3xl backdrop-blur-lg border border-white/20 shadow-2xl">
                <Sparkles className="w-16 h-16 text-yellow-300 animate-pulse" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Premium Digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Products Store
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-4xl mx-auto leading-relaxed">
              Dapatkan aplikasi premium, desain website modern, dan source code berkualitas tinggi untuk mengembangkan bisnis digital Anda dengan mudah dan cepat
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/products" className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <Download className="mr-3 w-6 h-6 group-hover:animate-bounce" />
                Jelajahi Produk
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 backdrop-blur-lg transition-all duration-300 transform hover:scale-105">
                <Users className="mr-3 w-6 h-6" />
                Mulai Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Kategori Produk
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Temukan berbagai kategori produk digital premium yang sesuai dengan kebutuhan Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 scale-in" style={{animationDelay: `${index * 150}ms`}}>
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 bg-gradient-to-br ${category.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {category.count} Produk
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Kami berkomitmen memberikan produk digital terbaik dengan layanan yang memuaskan
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 scale-in" style={{animationDelay: `${index * 100}ms`}}>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Produk Unggulan
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Koleksi produk digital terpopuler dan terlaris dari Morgan Digital
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <div key={product.id} className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 scale-in" style={{animationDelay: `${index * 150}ms`}}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white shadow-lg">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {product.rating}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                      <Link 
                        to={`/product/${product.id}`}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
                  <ShoppingBag className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Produk Segera Hadir!
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Produk digital premium sedang dalam persiapan. Silakan kembali lagi nanti atau hubungi kami untuk informasi lebih lanjut.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <Users className="mr-2 w-5 h-5" />
                  Hubungi Kami
                </Link>
                <Link to="/blog" className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <Calendar className="mr-2 w-5 h-5" />
                  Baca Blog
                </Link>
              </div>
            </div>
          )}
          
          {products.length > 0 && (
            <div className="text-center mt-16 fade-in">
              <Link to="/products" className="inline-flex items-center px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
                Lihat Semua Produk
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Blog Terbaru
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Tips, tutorial, dan insight terbaru seputar dunia digital dan teknologi
            </p>
          </div>

          {blogLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {latestBlogPosts.map((post, index) => (
                <article key={post.id} className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 scale-in" style={{animationDelay: `${index * 200}ms`}}>
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(post.date).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4 mr-1" />
                          <span>24</span>
                        </button>
                        <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          <span>8</span>
                        </button>
                      </div>
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        Baca Selengkapnya
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="text-center mt-16 fade-in">
            <Link to="/blog" className="inline-flex items-center px-8 py-4 text-lg font-semibold bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
              Lihat Semua Artikel
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="fade-in">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-lg border border-white/20 shadow-2xl">
                <Rocket className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Siap Mengembangkan Bisnis Digital Anda?
            </h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed">
              Bergabunglah dengan ribuan pelanggan yang telah mempercayai Morgan Digital untuk kebutuhan produk digital mereka dan rasakan perbedaannya
            </p>
            <Link to="/register" className="inline-flex items-center px-8 py-4 text-lg font-semibold bg-white text-purple-600 rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <Users className="mr-3 w-6 h-6" />
              Mulai Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;