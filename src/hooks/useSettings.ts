import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface WebsiteSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  address: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    tiktok: string;
  };
  welcomePopup: {
    enabled: boolean;
    title: string;
    message: string;
    buttonText: string;
    buttonLink: string;
    showDelay: number;
    backgroundColor: string;
    textColor: string;
  };
  paymentMethods: {
    dana: {
      enabled: boolean;
      number: string;
      name: string;
      instructions: string;
    };
    ovo: {
      enabled: boolean;
      number: string;
      name: string;
      instructions: string;
    };
    gopay: {
      enabled: boolean;
      number: string;
      name: string;
      instructions: string;
    };
    shopeepay: {
      enabled: boolean;
      number: string;
      name: string;
      instructions: string;
    };
    bankTransfer: {
      enabled: boolean;
      bankName: string;
      accountNumber: string;
      accountName: string;
      instructions: string;
    };
    qris: {
      enabled: boolean;
      qrImage: string;
      instructions: string;
    };
  };
}

export interface InventorySettings {
  lowStockThreshold: number;
  autoRestock: boolean;
  trackSales: boolean;
  enableNotifications: boolean;
  categories: string[];
  statuses: Array<{
    value: string;
    label: string;
    color: string;
  }>;
}

export interface OrderSettings {
  statuses: Array<{
    value: string;
    label: string;
    color: string;
    description: string;
  }>;
  autoStatusUpdate: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  defaultStatus: string;
}

export const useWebsiteSettings = () => {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'website');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setSettings(docSnap.data() as WebsiteSettings);
        } else {
          // Initialize with default settings
          const defaultSettings: WebsiteSettings = {
            siteName: 'Morgan Digital',
            siteDescription: 'Premium Digital Products for Your Business',
            logo: '',
            favicon: '',
            primaryColor: '#3b82f6',
            secondaryColor: '#8b5cf6',
            contactEmail: 'info@morgandigital.com',
            contactPhone: '+62 812-3456-7890',
            whatsappNumber: '6281234567890',
            address: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta, Indonesia 10220',
            socialMedia: {
              facebook: '',
              twitter: '',
              instagram: '',
              linkedin: '',
              youtube: '',
              tiktok: ''
            },
            welcomePopup: {
              enabled: true,
              title: '🎉 Selamat Datang di Morgan Digital!',
              message: 'Dapatkan diskon hingga 50% untuk semua produk digital premium kami. Jangan lewatkan penawaran terbatas ini!',
              buttonText: 'Lihat Penawaran',
              buttonLink: '/products',
              showDelay: 3,
              backgroundColor: '#ffffff',
              textColor: '#1f2937'
            },
            paymentMethods: {
              dana: {
                enabled: true,
                number: '081234567890',
                name: 'Morgan Digital',
                instructions: 'Transfer ke nomor DANA di atas, lalu kirim bukti transfer via WhatsApp'
              },
              ovo: {
                enabled: true,
                number: '081234567890',
                name: 'Morgan Digital',
                instructions: 'Transfer ke nomor OVO di atas, lalu kirim bukti transfer via WhatsApp'
              },
              gopay: {
                enabled: true,
                number: '081234567890',
                name: 'Morgan Digital',
                instructions: 'Transfer ke nomor GoPay di atas, lalu kirim bukti transfer via WhatsApp'
              },
              shopeepay: {
                enabled: true,
                number: '081234567890',
                name: 'Morgan Digital',
                instructions: 'Transfer ke nomor ShopeePay di atas, lalu kirim bukti transfer via WhatsApp'
              },
              bankTransfer: {
                enabled: true,
                bankName: 'Bank BCA',
                accountNumber: '1234567890',
                accountName: 'Morgan Digital',
                instructions: 'Transfer ke rekening di atas, lalu kirim bukti transfer via WhatsApp'
              },
              qris: {
                enabled: true,
                qrImage: '',
                instructions: 'Scan QR Code di atas untuk pembayaran, lalu kirim bukti transfer via WhatsApp'
              }
            }
          };
          
          await setDoc(docRef, defaultSettings);
          setSettings(defaultSettings);
        }
      } catch (error) {
        console.error('Error fetching website settings:', error);
        setError('Failed to load website settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<WebsiteSettings>) => {
    try {
      const docRef = doc(db, 'settings', 'website');
      await setDoc(docRef, { ...settings, ...newSettings, updatedAt: new Date() }, { merge: true });
      setSettings(prev => prev ? { ...prev, ...newSettings } : null);
    } catch (error) {
      console.error('Error updating website settings:', error);
      throw error;
    }
  };

  return { settings, loading, error, updateSettings };
};

export const useInventorySettings = () => {
  const [settings, setSettings] = useState<InventorySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'inventory');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setSettings(docSnap.data() as InventorySettings);
        }
      } catch (error) {
        console.error('Error fetching inventory settings:', error);
        setError('Failed to load inventory settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<InventorySettings>) => {
    try {
      const docRef = doc(db, 'settings', 'inventory');
      await setDoc(docRef, { ...settings, ...newSettings, updatedAt: new Date() }, { merge: true });
      setSettings(prev => prev ? { ...prev, ...newSettings } : null);
    } catch (error) {
      console.error('Error updating inventory settings:', error);
      throw error;
    }
  };

  return { settings, loading, error, updateSettings };
};

export const useOrderSettings = () => {
  const [settings, setSettings] = useState<OrderSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'orders');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setSettings(docSnap.data() as OrderSettings);
        } else {
          // Initialize with default order settings
          const defaultSettings: OrderSettings = {
            statuses: [
              { value: 'pending', label: 'Belum Dibayar', color: 'yellow', description: 'Menunggu pembayaran dari customer' },
              { value: 'processing', label: 'Diproses', color: 'blue', description: 'Pembayaran diterima, pesanan sedang diproses' },
              { value: 'shipped', label: 'Dikirim', color: 'purple', description: 'Produk digital telah dikirim ke customer' },
              { value: 'delivered', label: 'Diterima', color: 'green', description: 'Produk telah diterima customer' },
              { value: 'cancelled', label: 'Dibatalkan', color: 'red', description: 'Pesanan dibatalkan' }
            ],
            autoStatusUpdate: false,
            emailNotifications: true,
            smsNotifications: false,
            defaultStatus: 'pending'
          };
          
          await setDoc(docRef, defaultSettings);
          setSettings(defaultSettings);
        }
      } catch (error) {
        console.error('Error fetching order settings:', error);
        setError('Failed to load order settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<OrderSettings>) => {
    try {
      const docRef = doc(db, 'settings', 'orders');
      await setDoc(docRef, { ...settings, ...newSettings, updatedAt: new Date() }, { merge: true });
      setSettings(prev => prev ? { ...prev, ...newSettings } : null);
    } catch (error) {
      console.error('Error updating order settings:', error);
      throw error;
    }
  };

  return { settings, loading, error, updateSettings };
};