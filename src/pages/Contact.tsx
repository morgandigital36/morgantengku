import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Save to localStorage for demo
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push({
      ...formData,
      id: Date.now().toString(),
      date: new Date().toISOString()
    });
    localStorage.setItem('contacts', JSON.stringify(contacts));

    setSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setLoading(false);

    // Reset success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Hubungi Kami
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Punya pertanyaan atau butuh bantuan? Tim kami siap membantu Anda 24/7
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Informasi Kontak
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">info@morgandigital.com</p>
                    <p className="text-gray-600 dark:text-gray-400">support@morgandigital.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Telepon</h3>
                    <p className="text-gray-600 dark:text-gray-400">+62 812-3456-7890</p>
                    <p className="text-gray-600 dark:text-gray-400">+62 821-9876-5432</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Alamat</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Jl. Sudirman No. 123<br />
                      Jakarta Pusat, DKI Jakarta<br />
                      Indonesia 10220
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Kontak Cepat
              </h3>
              <div className="space-y-3">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    Chat WhatsApp
                  </span>
                </a>
                <a
                  href="mailto:info@morgandigital.com"
                  className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                  <span className="text-blue-700 dark:text-blue-300 font-medium">
                    Kirim Email
                  </span>
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Jam Operasional
              </h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Senin - Jumat</span>
                  <span>09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu</span>
                  <span>09:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu</span>
                  <span>Tutup</span>
                </div>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Support online 24/7 melalui email dan WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Kirim Pesan
              </h2>

              {success && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-700 dark:text-green-300">
                    Pesan Anda berhasil dikirim! Kami akan merespons dalam 24 jam.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Lengkap *
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
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Masukkan email Anda"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subjek *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Pilih subjek</option>
                    <option value="general">Pertanyaan Umum</option>
                    <option value="product">Pertanyaan Produk</option>
                    <option value="support">Dukungan Teknis</option>
                    <option value="partnership">Kerjasama</option>
                    <option value="complaint">Keluhan</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pesan *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="input-field"
                    placeholder="Tulis pesan Anda di sini..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    'Mengirim...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Temukan jawaban untuk pertanyaan umum tentang produk dan layanan kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Bagaimana cara download produk setelah pembelian?",
                answer: "Setelah pembayaran dikonfirmasi, Anda akan menerima email dengan link download dan instruksi lengkap."
              },
              {
                question: "Apakah ada garansi untuk produk digital?",
                answer: "Ya, kami memberikan garansi 30 hari uang kembali jika produk tidak sesuai dengan deskripsi."
              },
              {
                question: "Bisakah saya request custom development?",
                answer: "Tentu! Kami menyediakan layanan custom development. Hubungi tim kami untuk diskusi lebih lanjut."
              },
              {
                question: "Apakah tersedia support teknis?",
                answer: "Ya, kami menyediakan support teknis gratis selama 30 hari setelah pembelian melalui email dan WhatsApp."
              }
            ].map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;