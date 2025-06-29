import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, QrCode, Building, Banknote, Wallet } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../hooks/useFirestore';
import { useWebsiteSettings } from '../hooks/useSettings';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const { settings } = useWebsiteSettings();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    paymentMethod: 'dana'
  });

  const [loading, setLoading] = useState(false);

  const paymentMethods = [
    { 
      id: 'dana', 
      name: 'DANA', 
      icon: <Wallet className="w-5 h-5" />,
      enabled: settings?.paymentMethods?.dana?.enabled || false,
      number: settings?.paymentMethods?.dana?.number || '',
      accountName: settings?.paymentMethods?.dana?.name || '',
      instructions: settings?.paymentMethods?.dana?.instructions || ''
    },
    { 
      id: 'ovo', 
      name: 'OVO', 
      icon: <Smartphone className="w-5 h-5" />,
      enabled: settings?.paymentMethods?.ovo?.enabled || false,
      number: settings?.paymentMethods?.ovo?.number || '',
      accountName: settings?.paymentMethods?.ovo?.name || '',
      instructions: settings?.paymentMethods?.ovo?.instructions || ''
    },
    { 
      id: 'gopay', 
      name: 'GoPay', 
      icon: <Smartphone className="w-5 h-5" />,
      enabled: settings?.paymentMethods?.gopay?.enabled || false,
      number: settings?.paymentMethods?.gopay?.number || '',
      accountName: settings?.paymentMethods?.gopay?.name || '',
      instructions: settings?.paymentMethods?.gopay?.instructions || ''
    },
    { 
      id: 'shopeepay', 
      name: 'ShopeePay', 
      icon: <Banknote className="w-5 h-5" />,
      enabled: settings?.paymentMethods?.shopeepay?.enabled || false,
      number: settings?.paymentMethods?.shopeepay?.number || '',
      accountName: settings?.paymentMethods?.shopeepay?.name || '',
      instructions: settings?.paymentMethods?.shopeepay?.instructions || ''
    },
    { 
      id: 'bank', 
      name: 'Bank Transfer', 
      icon: <Building className="w-5 h-5" />,
      enabled: settings?.paymentMethods?.bankTransfer?.enabled || false,
      number: settings?.paymentMethods?.bankTransfer?.accountNumber || '',
      accountName: settings?.paymentMethods?.bankTransfer?.accountName || '',
      bankName: settings?.paymentMethods?.bankTransfer?.bankName || '',
      instructions: settings?.paymentMethods?.bankTransfer?.instructions || ''
    },
    { 
      id: 'qris', 
      name: 'QRIS', 
      icon: <QrCode className="w-5 h-5" />,
      enabled: settings?.paymentMethods?.qris?.enabled || false,
      qrImage: settings?.paymentMethods?.qris?.qrImage || '',
      instructions: settings?.paymentMethods?.qris?.instructions || ''
    }
  ];

  const enabledPaymentMethods = paymentMethods.filter(method => method.enabled);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const selectedPaymentMethod = paymentMethods.find(method => method.id === formData.paymentMethod);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order in Firestore
      const orderData = {
        items,
        total: totalPrice,
        customerInfo: formData,
        date: new Date().toISOString(),
        status: 'pending',
        userId: user?.id || ''
      };

      await addOrder(orderData);

      // Clear cart
      clearCart();

      // Create WhatsApp message with payment details
      const itemsList = items.map(item => 
        `• ${item.name} (${item.quantity}x) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`
      ).join('\n');

      let paymentDetails = '';
      if (selectedPaymentMethod) {
        if (selectedPaymentMethod.id === 'bank') {
          paymentDetails = `
💳 *DETAIL PEMBAYARAN:*
Bank: ${selectedPaymentMethod.bankName}
No. Rekening: ${selectedPaymentMethod.number}
Atas Nama: ${selectedPaymentMethod.accountName}

📝 *Instruksi:*
${selectedPaymentMethod.instructions}`;
        } else if (selectedPaymentMethod.id === 'qris') {
          paymentDetails = `
📱 *DETAIL PEMBAYARAN:*
Metode: QRIS
${selectedPaymentMethod.qrImage ? `QR Code: ${selectedPaymentMethod.qrImage}` : ''}

📝 *Instruksi:*
${selectedPaymentMethod.instructions}`;
        } else {
          paymentDetails = `
📱 *DETAIL PEMBAYARAN:*
${selectedPaymentMethod.name}: ${selectedPaymentMethod.number}
Atas Nama: ${selectedPaymentMethod.accountName}

📝 *Instruksi:*
${selectedPaymentMethod.instructions}`;
        }
      }

      const message = `🛒 *PESANAN BARU - Morgan Digital*

👤 *Data Pelanggan:*
Nama: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

📦 *Detail Pesanan:*
${itemsList}

💰 *Total: Rp ${totalPrice.toLocaleString('id-ID')}*
${paymentDetails}

Mohon konfirmasi pembayaran dan kirimkan bukti transfer. Terima kasih! 🙏`;

      // Get WhatsApp number from settings or use default
      const whatsappNumber = settings?.whatsappNumber || '6281234567890';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
      navigate('/');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Informasi Pembeli
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Masukkan email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Masukkan nomor WhatsApp"
                  />
                </div>
              </form>
            </div>

            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Metode Pembayaran
              </h2>
              {enabledPaymentMethods.length > 0 ? (
                <div className="space-y-3">
                  {enabledPaymentMethods.map((method) => (
                    <label key={method.id} className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleChange}
                        className="mt-1 mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          {method.icon}
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                            {method.name}
                          </span>
                        </div>
                        {method.id === 'bank' ? (
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <p>{method.bankName}</p>
                            <p>No. Rekening: {method.number}</p>
                            <p>Atas Nama: {method.accountName}</p>
                          </div>
                        ) : method.id === 'qris' ? (
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <p>Scan QR Code untuk pembayaran</p>
                            {method.qrImage && (
                              <img src={method.qrImage} alt="QR Code" className="w-32 h-32 mt-2 rounded-lg" />
                            )}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <p>Nomor: {method.number}</p>
                            <p>Atas Nama: {method.accountName}</p>
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Metode pembayaran belum dikonfigurasi. Silakan hubungi admin.
                  </p>
                </div>
              )}
            </div>

            {/* Payment Instructions */}
            {selectedPaymentMethod && (
              <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  Instruksi Pembayaran
                </h3>
                <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                  {selectedPaymentMethod.instructions}
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Ringkasan Pesanan
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium text-blue-600">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span className="text-blue-600">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || enabledPaymentMethods.length === 0}
              className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Memproses...' : 'Bayar via WhatsApp'}
            </button>

            <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
              <p>Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami</p>
              <p className="mt-2">Setelah klik "Bayar via WhatsApp", Anda akan diarahkan ke WhatsApp untuk konfirmasi pembayaran</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;