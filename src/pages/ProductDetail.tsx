import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useProduct } from '../hooks/useFirestore';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { product, loading, error } = useProduct(id || '');
  const [selectedVariant, setSelectedVariant] = useState(0);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (product) {
      const variant = product.variants && product.variants[selectedVariant];
      const price = variant ? variant.price : product.price;
      const name = variant ? `${product.name} - ${variant.name}` : product.name;

      addToCart({
        id: variant ? `${product.id}-${selectedVariant}` : product.id,
        name: name,
        price: price,
        image: product.image
      });
      alert('Produk berhasil ditambahkan ke keranjang!');
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (product) {
      const variant = product.variants && product.variants[selectedVariant];
      const price = variant ? variant.price : product.price;
      const name = variant ? `${product.name} - ${variant.name}` : product.name;

      addToCart({
        id: variant ? `${product.id}-${selectedVariant}` : product.id,
        name: name,
        price: price,
        image: product.image
      });
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Produk tidak ditemukan
          </h2>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Kembali ke Produk
          </button>
        </div>
      </div>
    );
  }

  // Add default features if not present
  const features = product.features || [
    'Source code lengkap',
    'Dokumentasi detail',
    'Support 30 hari',
    'Update gratis',
    'Commercial license'
  ];

  const support = product.support || [
    'Dokumentasi lengkap',
    'Video tutorial',
    'Support email 24/7',
    'Community forum',
    'Update gratis selamanya'
  ];

  const technicalSpecs = product.technicalSpecs || [
    'Format: Source Code',
    'Teknologi: React, Node.js',
    'Database: MongoDB',
    'Responsive: Ya',
    'Browser Support: Modern browsers'
  ];

  const currentPrice = product.variants && product.variants[selectedVariant] 
    ? product.variants[selectedVariant].price 
    : product.price;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={product.image}
                    alt={`Preview ${i + 1}`}
                    className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {product.rating} (128 reviews)
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Pilih Varian:
                </h3>
                <div className="space-y-3">
                  {product.variants.map((variant, index) => (
                    <label key={index} className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input
                        type="radio"
                        name="variant"
                        value={index}
                        checked={selectedVariant === index}
                        onChange={() => setSelectedVariant(index)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 dark:text-white">{variant.name}</span>
                          <span className="font-bold text-blue-600">Rp {variant.price.toLocaleString('id-ID')}</span>
                        </div>
                        {variant.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{variant.description}</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Yang Anda Dapatkan:
              </h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price and Actions */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-3xl font-bold text-blue-600">
                    Rp {currentPrice.toLocaleString('id-ID')}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 line-through ml-2">
                    Rp {(currentPrice * 1.5).toLocaleString('id-ID')}
                  </span>
                </div>
                <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm font-medium">
                  33% OFF
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="btn-secondary flex items-center justify-center flex-1"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Tambah ke Keranjang
                </button>
                <button
                  onClick={handleBuyNow}
                  className="btn-primary flex-1"
                >
                  Beli Sekarang
                </button>
              </div>

              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>✓ Download instan setelah pembayaran</p>
                <p>✓ Garansi uang kembali 30 hari</p>
                <p>✓ Support teknis gratis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Spesifikasi Teknis
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              {technicalSpecs.map((spec, index) => (
                <li key={index}>• {spec}</li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Dukungan
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              {support.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;