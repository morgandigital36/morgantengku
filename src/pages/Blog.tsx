import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load blog posts from localStorage or use default data
    const savedPosts = localStorage.getItem('blogPosts');
    const defaultPosts: BlogPost[] = [
      {
        id: '1',
        title: 'Tips Memilih Aplikasi Mobile yang Tepat untuk Bisnis Anda',
        excerpt: 'Panduan lengkap untuk memilih aplikasi mobile yang sesuai dengan kebutuhan bisnis digital Anda.',
        content: 'Dalam era digital saat ini, memiliki aplikasi mobile untuk bisnis bukan lagi pilihan, melainkan kebutuhan...',
        author: 'Morgan Digital Team',
        date: '2024-01-15',
        image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Mobile Development'
      },
      {
        id: '2',
        title: 'Tren Desain Website 2024: Minimalis dan User-Friendly',
        excerpt: 'Eksplorasi tren desain website terbaru yang fokus pada pengalaman pengguna yang optimal.',
        content: 'Desain website terus berkembang mengikuti perkembangan teknologi dan preferensi pengguna...',
        author: 'Morgan Digital Team',
        date: '2024-01-10',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Web Design'
      },
      {
        id: '3',
        title: 'Mengoptimalkan Source Code untuk Performa Maksimal',
        excerpt: 'Teknik-teknik optimasi source code yang dapat meningkatkan performa aplikasi secara signifikan.',
        content: 'Performa aplikasi yang optimal adalah kunci kepuasan pengguna. Berikut adalah beberapa teknik...',
        author: 'Morgan Digital Team',
        date: '2024-01-05',
        image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Programming'
      },
      {
        id: '4',
        title: 'Strategi Digital Marketing untuk Produk Digital',
        excerpt: 'Cara efektif memasarkan produk digital Anda di era kompetisi yang semakin ketat.',
        content: 'Digital marketing menjadi kunci sukses dalam menjual produk digital. Strategi yang tepat...',
        author: 'Morgan Digital Team',
        date: '2024-01-01',
        image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Digital Marketing'
      }
    ];

    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(defaultPosts);
      localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
    }
  }, []);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog & Artikel
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Tips, tutorial, dan insight terbaru seputar dunia digital dan teknologi
          </p>
        </div>

        {/* Featured Post */}
        {posts.length > 0 && (
          <div className="mb-12">
            <div className="card overflow-hidden lg:flex">
              <div className="lg:w-1/2">
                <img
                  src={posts[0].image}
                  alt={posts[0].title}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                    {posts[0].category}
                  </span>
                  <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">Featured</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {posts[0].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <User className="w-4 h-4 mr-2" />
                    <span className="mr-4">{posts[0].author}</span>
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(posts[0].date).toLocaleDateString('id-ID')}</span>
                  </div>
                  <Link
                    to={`/blog/${posts[0].id}`}
                    className="btn-primary flex items-center"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post) => (
            <article key={post.id} className="card overflow-hidden group">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
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
                <Link
                  to={`/blog/${post.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                >
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Dapatkan Update Terbaru
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Berlangganan newsletter kami untuk mendapatkan tips dan artikel terbaru
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;