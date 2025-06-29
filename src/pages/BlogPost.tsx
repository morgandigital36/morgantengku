import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2, Heart, MessageCircle, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  likes: number;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
}

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ content: '' });
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(24);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      const posts = JSON.parse(savedPosts);
      const foundPost = posts.find((p: BlogPost) => p.id === id);
      if (foundPost) {
        setPost(foundPost);
        // Expand content for demo
        foundPost.content = `
          <p>Dalam era digital saat ini, memiliki aplikasi mobile untuk bisnis bukan lagi pilihan, melainkan kebutuhan. Dengan semakin banyaknya pengguna smartphone dan tablet, bisnis yang tidak memiliki kehadiran mobile akan tertinggal dari kompetitor.</p>
          
          <h2>Mengapa Aplikasi Mobile Penting?</h2>
          <p>Aplikasi mobile memberikan akses langsung kepada pelanggan Anda. Mereka dapat berinteraksi dengan bisnis Anda kapan saja dan di mana saja. Ini menciptakan peluang untuk meningkatkan engagement dan loyalitas pelanggan.</p>
          
          <h2>Faktor-Faktor yang Perlu Dipertimbangkan</h2>
          <ul>
            <li><strong>Target Audience:</strong> Siapa pengguna utama aplikasi Anda?</li>
            <li><strong>Platform:</strong> iOS, Android, atau keduanya?</li>
            <li><strong>Budget:</strong> Berapa anggaran yang tersedia untuk pengembangan?</li>
            <li><strong>Fitur:</strong> Apa saja fitur yang benar-benar dibutuhkan?</li>
            <li><strong>Maintenance:</strong> Siapa yang akan mengelola aplikasi setelah launch?</li>
          </ul>
          
          <h2>Tips Memilih Developer yang Tepat</h2>
          <p>Memilih developer atau tim pengembang yang tepat adalah kunci sukses aplikasi Anda. Pastikan mereka memiliki portfolio yang solid, komunikasi yang baik, dan pemahaman yang mendalam tentang bisnis Anda.</p>
          
          <p>Dengan perencanaan yang matang dan eksekusi yang tepat, aplikasi mobile dapat menjadi aset berharga untuk pertumbuhan bisnis Anda.</p>
        `;
      }
    }

    // Load comments
    const savedComments = localStorage.getItem(`comments_${id}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      // Default comments for demo
      const defaultComments: Comment[] = [
        {
          id: '1',
          author: 'John Doe',
          content: 'Artikel yang sangat informatif! Terima kasih atas tipsnya.',
          date: '2024-01-16',
          likes: 5
        },
        {
          id: '2',
          author: 'Jane Smith',
          content: 'Saya setuju bahwa aplikasi mobile sangat penting di era digital ini.',
          date: '2024-01-17',
          likes: 3
        }
      ];
      setComments(defaultComments);
      localStorage.setItem(`comments_${id}`, JSON.stringify(defaultComments));
    }

    setLoading(false);
  }, [id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    if (!newComment.content.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: user?.name || 'Anonymous',
      content: newComment.content,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));

    setNewComment({ content: '' });
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleCommentLike = (commentId: string) => {
    const updatedComments = comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    );
    setComments(updatedComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Artikel tidak ditemukan
          </h2>
          <button
            onClick={() => navigate('/blog')}
            className="btn-primary"
          >
            Kembali ke Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali ke Blog
        </button>

        {/* Article Header */}
        <article className="card overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          
          <div className="p-8">
            <div className="flex items-center mb-6">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>

            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <User className="w-5 h-5 mr-2" />
                <span className="mr-6">{post.author}</span>
                <Calendar className="w-5 h-5 mr-2" />
                <span>{new Date(post.date).toLocaleDateString('id-ID')}</span>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLike}
                  className={`flex items-center transition-colors ${
                    liked ? 'text-red-500' : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 mr-1 ${liked ? 'fill-current' : ''}`} />
                  <span>{likes}</span>
                </button>
                <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  <Share2 className="w-5 h-5 mr-1" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* Comments Section */}
        <div className="mt-12 card p-8">
          <div className="flex items-center mb-6">
            <MessageCircle className="w-6 h-6 mr-2 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Komentar ({comments.length})
            </h2>
          </div>

          {/* Comment Form */}
          <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tinggalkan Komentar
            </h3>
            
            {!isAuthenticated ? (
              <div className="text-center py-8">
                <LogIn className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Anda harus login untuk dapat memberikan komentar
                </p>
                <Link to="/login" className="btn-primary">
                  Login Sekarang
                </Link>
              </div>
            ) : (
              <form onSubmit={handleCommentSubmit}>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Komentar sebagai: <strong>{user?.name}</strong>
                  </p>
                </div>
                <textarea
                  placeholder="Tulis komentar Anda..."
                  value={newComment.content}
                  onChange={(e) => setNewComment({content: e.target.value})}
                  className="input-field mb-4"
                  rows={4}
                  required
                />
                <button type="submit" className="btn-primary">
                  Kirim Komentar
                </button>
              </form>
            )}
          </div>

          {/* Login Prompt Modal */}
          {showLoginPrompt && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Login Diperlukan
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Anda harus login terlebih dahulu untuk dapat memberikan komentar pada artikel ini.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowLoginPrompt(false)}
                    className="btn-secondary flex-1"
                  >
                    Batal
                  </button>
                  <Link
                    to="/login"
                    className="btn-primary flex-1 text-center"
                    onClick={() => setShowLoginPrompt(false)}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {comment.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {comment.author}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(comment.date).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCommentLike(comment.id)}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    <span className="text-sm">{comment.likes}</span>
                  </button>
                </div>
                <p className="text-gray-700 dark:text-gray-300 ml-11">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;